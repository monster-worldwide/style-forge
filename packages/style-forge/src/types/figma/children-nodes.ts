import { isNodeType, Node, NodeType } from 'figma-api';

export type ChildrenNodes =
  | 'DOCUMENT'
  | 'CANVAS'
  | 'FRAME'
  | 'GROUP'
  | 'BOOLEAN'
  | 'BOOLEAN_OPERATION'
  | 'COMPONENT_SET'
  | 'COMPONENT';

export const nodesWithChildren: ChildrenNodes[] = [
  'DOCUMENT',
  'CANVAS',
  'FRAME',
  'GROUP',
  'BOOLEAN',
  'BOOLEAN_OPERATION',
  'COMPONENT_SET',
  'COMPONENT',
];

export const isNodeWithChildren = (node: Node): node is Node<ChildrenNodes> =>
  (nodesWithChildren as string[]).includes(node.type);

export type TraversableNode = Node<
  | 'FRAME'
  | 'DOCUMENT'
  | 'CANVAS'
  | 'GROUP'
  | 'BOOLEAN'
  | 'BOOLEAN_OPERATION'
  | 'COMPONENT'
  | 'COMPONENT_SET'
  | 'INSTANCE'
>;

export const isTraversable = (element: Node): element is TraversableNode => {
  if (
    isNodeType(element, 'FRAME') ||
    isNodeType(element, 'DOCUMENT') ||
    isNodeType(element, 'CANVAS') ||
    isNodeType(element, 'GROUP') ||
    isNodeType(element, 'BOOLEAN') ||
    isNodeType(element, 'BOOLEAN_OPERATION') ||
    isNodeType(element, 'COMPONENT') ||
    isNodeType(element, 'COMPONENT_SET') ||
    isNodeType(element, 'INSTANCE')
  ) {
    return Boolean(element.children);
  }
  return false;
};

export const isElementType = (element: Partial<Node>, types: NodeType[]) => {
  for (const type of types) {
    if (isNodeType(element, type)) {
      return true;
    }
  }
  return false;
};
