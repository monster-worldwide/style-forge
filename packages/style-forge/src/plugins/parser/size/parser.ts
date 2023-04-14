import { BoundingBoxNodes, ThemeParserObject, Node } from '../../../types';

export const setSize = (element: Node<BoundingBoxNodes>): ThemeParserObject => {
  const { absoluteBoundingBox } = element;
  return {
    ...(absoluteBoundingBox.width
      ? { width: `${absoluteBoundingBox.width}px` }
      : {}),
    ...(absoluteBoundingBox.height
      ? { height: `${absoluteBoundingBox.height}px` }
      : {}),
  };
};
