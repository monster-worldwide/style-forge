import {
  hasBoundingBox,
  isNodeType,
  isTraversable,
  ThemeParserObject,
  Node,
} from '../../../types';
import { getPaintColor } from '../../../utils';

export const setIconProperties = (element: Node): ThemeParserObject => {
  return { ...setIconColor(element), ...setIconSize(element) };
};

const setIconSize = (element: Node): ThemeParserObject => {
  if (hasBoundingBox(element) && element.absoluteBoundingBox) {
    const { absoluteBoundingBox } = element;
    return {
      ...(absoluteBoundingBox.width
        ? { width: `${absoluteBoundingBox.width}px` }
        : {}),
      ...(absoluteBoundingBox.height
        ? { height: `${absoluteBoundingBox.height}px` }
        : {}),
    };
  }
  return {};
};

const setIconColor = (element: Node): ThemeParserObject => {
  if (!isTraversable(element)) {
    return {};
  }
  return element.children
    .map((child) => {
      if (isNodeType(child, 'VECTOR') && child.fills.length > 0) {
        const color = getPaintColor(child.fills[0]);
        return {
          color,
          fill: color,
        };
      }
      return setIconColor(child);
    })
    .reduce(
      (accumulated: ThemeParserObject, current: ThemeParserObject) => ({
        ...accumulated,
        ...current,
      }),
      {},
    );
};
