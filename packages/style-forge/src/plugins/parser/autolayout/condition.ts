import { isElementType, Node } from '../../../types';

export const runCondition = (element: Node) =>
  isElementType(element, [
    'TEXT',
    'COMPONENT',
    'INSTANCE',
    'FRAME',
    'VECTOR',
    'RECTANGLE',
    'ELLIPSE',
  ]);
