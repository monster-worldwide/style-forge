import { Node } from 'figma-api';

export type BoundingBoxNodes =
  | 'SLICE'
  | 'FRAME'
  | 'VECTOR'
  | 'ELLIPSE'
  | 'RECTANGLE'
  | 'REGULAR_POLYGON'
  | 'STAR'
  | 'INSTANCE'
  | 'COMPONENT'
  | 'COMPONENT_SET'
  | 'BOOLEAN'
  | 'BOOLEAN_OPERATION'
  | 'TEXT'
  | 'GROUP'
  | 'LINE';

export const boundingBoxNodes: BoundingBoxNodes[] = [
  'SLICE',
  'FRAME',
  'VECTOR',
  'ELLIPSE',
  'RECTANGLE',
  'REGULAR_POLYGON',
  'STAR',
  'INSTANCE',
  'COMPONENT_SET',
  'COMPONENT',
  'BOOLEAN',
  'BOOLEAN_OPERATION',
  'TEXT',
  'GROUP',
  'LINE',
];

export const hasBoundingBox = (node: Node): node is Node<BoundingBoxNodes> =>
  (boundingBoxNodes as string[]).includes(node.type);
