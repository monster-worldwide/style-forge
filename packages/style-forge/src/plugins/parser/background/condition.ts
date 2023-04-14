import { ICON_PREFIX } from '../../../utils';
import { Node, isElementType, FillNode } from '../../../types';

export const runCondition = (element: Partial<Node>): element is FillNode => {
  return (
    'fills' in element &&
    Array.isArray(element.fills) &&
    isElementType(element, [
      'ELLIPSE',
      'RECTANGLE',
      'VECTOR',
      'COMPONENT',
      'INSTANCE',
      'FRAME',
    ]) &&
    !element?.name?.startsWith(ICON_PREFIX)
  );
};
