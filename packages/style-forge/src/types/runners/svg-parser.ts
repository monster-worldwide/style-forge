/**
 * key: unique identifier of icon within Figma file
 * downloadUrl: url where we download the svg content of icon
 * data: svg content of icons
 * We generate multiple names for each icon, each of those used in different situations. E.g.
 * import { componentName } from './icons/fileName';
 * ...
 * switch (name):
 *   case 'callName': return componentName;
 */
export type IconDefinition = {
  callName: string;
  componentName: string;
  fileName: string;
  key: string;
  data: string;
  downloadUrl: string;
};

export type IconObject = {
  [key: string]: IconDefinition;
};
