import { ICON_PREFIX } from '../../../utils';
import {
  BoundingBoxNodes,
  hasBoundingBox,
  Node,
  isElementType,
} from '../../../types';

export const runCondition = (
  element: Node,
): element is Node<BoundingBoxNodes> => {
  return (
    hasBoundingBox(element) &&
    isElementType(element, ['RECTANGLE', 'VECTOR', 'ELLIPSE']) &&
    element.absoluteBoundingBox &&
    !element.name.startsWith(ICON_PREFIX)
  );
};
