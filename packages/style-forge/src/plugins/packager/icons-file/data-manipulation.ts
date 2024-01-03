import { DOMParser } from 'xmldom';
import { indentedLine, getDistinctFills, getCamelCase } from '../../../utils';
import { FileDescription, IconDefinition, IconObject } from '../../../types';

export const createIconsFile = (data: IconObject) => {
  const result: FileDescription[] = [];
  Object.keys(data).forEach((key) => {
    const icon = data[key];
    if (!icon.data) {
      console.log(`Error writing an icon: `);
      console.log(icon);
    } else {
      result.push({
        path: `src/icons/${icon.fileName}.js`,
        content: createIconFile(icon),
      });
    }
  });
  return result;
};

/**
 * @param icon object containing info about the icon
 * This method will create the content for icon specific file. It will parse the downloaded svg content via DOMParser to get to the content and include it in the exported content.
 */
const createIconFile = (icon: IconDefinition) => {
  let content = generateImports();
  content += indentedLine('');
  content += generateIconComponent(icon);
  return content;
};

/**
 * This function will generate the imports into the icon file.
 */
const generateImports = () => {
  let content = indentedLine(`import React from 'react';`);
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
    let attributes = [];
    const child = children.item(i);
    if (child && child.nodeName !== '#text') {
      const childAttrs = (child as Element).attributes;
      for (let j = 0; j < childAttrs.length; j++) {
        const childAttr = childAttrs.item(j);
        if (childAttr) {
          const attrName = childAttr.name;
          const attrValue = childAttr.value;
          if (!(attrName === 'fill' && ignoreFills)) {
            attributes.push({ key: getCamelCase(attrName), value: attrValue });
          }
        }
      }
      const hasChildren = child.childNodes && child.childNodes.length > 0;
      const attributesContent = attributes
        .map((x) => `${x.key}='${x.value}'`)
        .join(' ');
      content += indentedLine(
        `<${child.nodeName}${attributesContent ? ` ${attributesContent}` : ''}${
          !hasChildren ? ' /' : ''
        }>`,
        indent,
      );

      if (hasChildren) {
        content += generateChildren(child.childNodes, ignoreFills, indent + 1);
        content += indentedLine(`</${child.nodeName}>`, indent);
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
  const fill = distinctFills.length === 1 ? distinctFills[0] : undefined;
  let content = indentedLine(
    `export const ${icon.componentName} = (props) => {`,
  );
  const hasChildren = children && children.length > 0;
  const attributesContent = [
    Boolean(viewBox) ? `viewBox='${viewBox?.nodeValue}'` : undefined,
    Boolean(xmlns) ? `xmlns='${xmlns?.value}'` : undefined,
    Boolean(fill) ? `fill='${fill}'` : undefined,
    '{...props}',
  ];
  content += indentedLine(
    `return <svg ${attributesContent.filter((x) => x !== undefined).join(' ')}${
      !hasChildren ? ' /' : ''
    }>`,
    1,
  );
  if (hasChildren) {
    content += generateChildren(children, distinctFills.length === 1, 2);
    content += indentedLine(`</svg>`, 1);
  }
  content += indentedLine(`};`);
  return content;
};
