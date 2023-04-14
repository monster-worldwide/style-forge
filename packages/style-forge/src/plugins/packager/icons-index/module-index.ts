import { indentedLine } from '../../../utils';
import { IconObject } from '../../../types';

/**
 * This function will generate the imports into the main file.
 */
const generateImports = (icons: IconObject) => {
  let content = indentedLine(`import React from 'react';`);
  for (const iconKey of Object.keys(icons)) {
    const iconData = icons[iconKey];
    content += indentedLine(
      `import { ${iconData.componentName} } from './icons-module/${iconData.fileName}';`,
    );
  }
  return content;
};

/**
 * This function will generate the named exports of the main file. It will allow us to import from package via `import { IconName } from '@icon/icon-package';`
 */
const generateNamedExports = (icons: IconObject) => {
  let content = `export { `;
  content += Object.keys(icons)
    .map((iconKey: string) => icons[iconKey].componentName)
    .join(', ');
  content += `};`;
  return indentedLine(content);
};

/**
 * This function will generate the default export of the main file. It's a function which will allow us to call getIcon('icon-name').
 */
const generateSwitchFunction = (icons: IconObject) => {
  let content = indentedLine(`export default function (name) {`);
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
export const createModuleIndex = (icons: IconObject) => {
  let content = generateImports(icons);
  content += indentedLine('');
  content += generateNamedExports(icons);
  content += indentedLine('');
  content += generateSwitchFunction(icons);
  return content;
};
