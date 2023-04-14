import { Node, isElementType, BorderElement } from '../../../types';

const isBorderElement = (element: Partial<Node>): element is BorderElement => {
  return (
    'strokes' in element &&
    Array.isArray(element.strokes) &&
    'strokeWeight' in element &&
    typeof element.strokeWeight === 'number'
  );
};
export const runCondition = (
  element: Partial<Node>,
): element is BorderElement => {
  return (
    isBorderElement(element) &&
    isElementType(element, [
      'RECTANGLE',
      'VECTOR',
      'ELLIPSE',
      'COMPONENT',
      'INSTANCE',
      'FRAME',
    ])
  );
};
