import { isElementType, Node } from '../../../types';

export const runCondition = (element: Node): element is Node<'TEXT'> => {
  return isElementType(element, ['TEXT']);
};
