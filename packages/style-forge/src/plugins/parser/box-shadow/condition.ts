import { ICON_PREFIX } from '../../../utils';
import { Node, isElementType, NodeWithEffects } from '../../../types';

export const runCondition = (
  element: Partial<Node>,
): element is NodeWithEffects => {
  return (
    'effects' in element &&
    isElementType(element, ['RECTANGLE', 'VECTOR']) &&
    !element?.name?.startsWith(ICON_PREFIX)
  );
};
