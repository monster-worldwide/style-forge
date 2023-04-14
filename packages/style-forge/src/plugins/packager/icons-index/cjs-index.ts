import { indentedLine } from '../../../utils';
import { IconObject } from '../../../types';

const generateInteropFlag = () => {
  return indentedLine(
    `Object.defineProperty(module.exports, '__esModule', { value: true, configurable: true });`,
  );
};

const generateDefaultExport = () => {
  return indentedLine(
    `Object.defineProperty(module.exports, 'default', { get: () => switchFunction, enumerable: true, configurable: true });`,
  );
};

/**
 * This function will generate the imports into the main file.
 */
const generateImports = (icons: IconObject) => {
  let content = indentedLine(`const React = require('react');`);
  for (const iconKey of Object.keys(icons)) {
    const iconData = icons[iconKey];
    content += indentedLine(
      `const { ${iconData.componentName} } = require('./icons-cjs/${iconData.fileName}');`,
    );
  }
  return content;
};

/**
 * This function will generate the named exports of the main file. It will allow us to import from package via `import { IconName } from '@icon/icon-package';`
 */
const generateNamedExports = (icons: IconObject) => {
  const content = Object.keys(icons)
    .map((iconKey: string) =>
      indentedLine(
        `Object.defineProperty(module.exports, '${icons[iconKey].componentName}', { get: () => ${icons[iconKey].componentName}, enumerable: true, configurable: true });`,
      ),
    )
    .join('');
  return content;
};

/**
 * This function will generate the default export of the main file. It's a function which will allow us to call getIcon('icon-name').
 */
const generateSwitchFunction = (icons: IconObject) => {
  let content = indentedLine(`const switchFunction = function (name) {`);
  content += indentedLine(`switch (name) {`, 1);
  for (const iconKey of Object.keys(icons)) {
    const iconData = icons[iconKey];
    content += indentedLine(`case '${iconData.callName}':`, 2);
    content += indentedLine(`return ${iconData.componentName};`, 3);
  }
  content += indentedLine(`default:`, 2);
  content += indentedLine(`return React.Fragment;`, 3);
  content += indentedLine('}', 1);
  content += indentedLine('}');
  return content;
};

/**
 * @param icons  object containting information about all icons
 * This method will create the content for the aggregator export file. The goal is to export all icons as named exports and switch function as default export.
 */
export const createCjsIndex = (icons: IconObject) => {
  let content = generateInteropFlag();
  content += generateDefaultExport();
  content += indentedLine('');
  content += generateNamedExports(icons);
  content += generateImports(icons);
  content += indentedLine('');
  content += generateSwitchFunction(icons);

  return content;
};
