import { DOMParser } from 'xmldom';
import { indentedLine, getDistinctFills } from '../../../utils';
import { FileDescription, IconDefinition, IconObject } from '../../../types';

export const createIconsModule = (data: IconObject) => {
  const result: FileDescription[] = [];
  Object.keys(data).forEach((key) => {
    const icon = data[key];
    if (!icon.data) {
      console.log(`Error writing an icon: `);
      console.log(icon);
    } else {
      result.push({
        path: `dist/icons-module/${icon.fileName}.js`,
        content: createIconModule(icon),
      });
    }
  });
  return result;
};

/**
 * @param icon object containing info about the icon
 * This method will create the content for icon specific file. It will parse the downloaded svg content via DOMParser to get to the content and include it in the exported content.
 */
const createIconModule = (icon: IconDefinition) => {
  let content = generateImports();
  content += indentedLine('');
  content += generateIconComponent(icon);
  content += indentedLine(
    `${icon.componentName}.displayName = '${icon.componentName}';`,
  );
  return content;
};

/**
 * This function will generate the imports into the icon file.
 */
const generateImports = () => {
  let content = indentedLine(`import React, { forwardRef } from 'react';`);
  content += indentedLine('');
  return content;
};

/**
 * This function will generate the params which will be passed into the return of the icon component.
 */
const generateFunctionParams = (
  {
    viewBox,
    xmlns,
  }: {
    [key: string]: Attr | null;
  },
  fill?: string,
) => {
  let content = indentedLine('const params = {};', 1);
  content += indentedLine('for (const key of Object.keys(_ref)) {', 1);
  content += indentedLine('params[key] = _ref[key];', 2);
  content += indentedLine('}', 1);
  content += indentedLine('params.ref = ref;', 1);
  if (viewBox) {
    content += indentedLine(`params.viewBox = '${viewBox.value}';`, 1);
  }
  if (xmlns) {
    content += indentedLine(`params.xmlns = '${xmlns.value}';`, 1);
  }
  if (fill) {
    content += indentedLine(`params.fill = '${fill}';`, 1);
  }
  return content;
};

/**
 * This function will generate the children which will be passed into the return of the icon component.
 */
const generateChildren = (
  children: NodeListOf<ChildNode>,
  ignoreFills: boolean,
  indent: number,
) => {
  let content = ``;
  for (let i = 0; i < children.length; i++) {
    const child = children.item(i);
    if (child && child.nodeName !== '#text') {
      content += indentedLine(
        `/* #__PURE__ */ React.createElement('${child.nodeName}', {`,
        indent,
      );
      const childAttrs = (child as Element).attributes;
      for (let j = 0; j < childAttrs.length; j++) {
        const childAttr = childAttrs.item(j);
        if (childAttr) {
          const attrName = childAttr.name;
          const attrValue = childAttr.value;
          if (!(attrName === 'fill' && ignoreFills)) {
            content += indentedLine(
              `'${attrName}': '${attrValue}',`,
              indent + 1,
            );
          }
        }
      }
      if (child.childNodes && child.childNodes.length > 0) {
        content += indentedLine(`},`, indent);
        content += generateChildren(child.childNodes, ignoreFills, indent + 1);
        content += indentedLine(`),`, indent);
      } else {
        content += indentedLine(`}),`, indent);
      }
    }
  }
  return content;
};

/**
 * This function will generate the body of the icon component.
 */
const generateIconComponent = (icon: IconDefinition) => {
  const document = new DOMParser().parseFromString(icon.data, 'image/svg+xml');
  const svg = document.getElementsByTagName('svg').item(0);
  const children = svg && svg.childNodes;
  const attrs = svg && svg.attributes;
  const viewBox = attrs && attrs.getNamedItem('viewBox');
  const xmlns = attrs && attrs.getNamedItem('xmlns');
  const distinctFills = getDistinctFills(children);
  let content = indentedLine(
    `export const ${icon.componentName} = forwardRef(function (_ref, ref) {`,
  );
  content += generateFunctionParams(
    { viewBox, xmlns },
    distinctFills.length === 1 ? distinctFills[0] : undefined,
  );
  content += indentedLine(`return /* #__PURE__ */ React.createElement(`, 1);
  content += indentedLine(`'svg',`, 2);
  content += indentedLine(`params,`, 2);
  if (children && children.length !== 0) {
    content += generateChildren(children, distinctFills.length === 1, 2);
  }
  content += indentedLine(`);`, 1);
  content += indentedLine(`});`);
  return content;
};
