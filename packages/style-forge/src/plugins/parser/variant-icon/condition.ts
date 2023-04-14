import { Node } from '../../../types';
import { ICON_PREFIX } from '../../../utils';

export const runCondition = (element: Node): element is Node => {
  return element.name.startsWith(ICON_PREFIX);
};
