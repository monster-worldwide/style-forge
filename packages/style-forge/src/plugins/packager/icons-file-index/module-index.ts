import { indentedLine } from '../../../utils';
import { IconObject } from '../../../types';

/**
 * This function will generate the imports into the main file.
 */
const generateExports = (icons: IconObject) => {
  let content = '';
  Object.keys(icons).forEach((iconKey) => {
    content += indentedLine(
      `export { ${icons[iconKey].componentName} } from './icons/${icons[iconKey].fileName}';`,
    );
  });
  return content;
};

/**
 * @param icons  object containting information about all icons
 * This method will create the content for the aggregator export file. The goal is to export all icons as named exports and switch function as default export.
 */
export const createModuleIndex = (icons: IconObject) => {
  return generateExports(icons);
};
