import { indentedLine } from '../../../utils';
import { IconObject } from '../../../types';

/**
 * @param icons  object containting information about all icons
 * This method will create the content for the type definition file. It will define type for each icon as well as the defaultly exported switch function.
 */
export const createTypedef = (icons: IconObject) => {
  let content = indentedLine(`/// <reference types="react" />`);
  content += indentedLine(`import { FC, SVGAttributes } from 'react';`);
  content += indentedLine('');
  content += indentedLine(`export type Icon = FC<SVGAttributes<SVGElement>>;`);
  for (const iconKey of Object.keys(icons)) {
    const iconData = icons[iconKey];
    content += indentedLine(`export const ${iconData.componentName}: Icon;`);
  }
  content += indentedLine('');
  content += indentedLine(
    `export default function getIcon(name: string): Icon;`,
  );
  return content;
};
