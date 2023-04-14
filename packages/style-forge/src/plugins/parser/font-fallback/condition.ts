import { CONFIG_PREFIX } from '../../../utils';
import { ChildrenNodes, isNodeWithChildren, Node } from '../../../types';

export const runCondition = (element: Node): element is Node<ChildrenNodes> => {
  return (
    element.name.startsWith(CONFIG_PREFIX) &&
    element.name.substring(CONFIG_PREFIX.length) === 'font-fallback' &&
    isNodeWithChildren(element)
  );
};
