import { ICON_PREFIX } from '../../../utils';
import { Node, isElementType, NodeWithPadding } from '../../../types';

export const runCondition = (
  element: Partial<Node>,
): element is NodeWithPadding => {
  return (
    ('paddingLeft' in element ||
      'paddingRight' in element ||
      'paddingTop' in element ||
      'paddingBottom' in element) &&
    isElementType(element, ['FRAME', 'COMPONENT', 'INSTANCE']) &&
    !element?.name?.startsWith(ICON_PREFIX)
  );
};
