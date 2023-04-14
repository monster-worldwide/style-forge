import { CONFIG_PREFIX } from '../../../utils';
import { ChildrenNodes, isNodeWithChildren, Node } from '../../../types';

/**
 * @param element a Figma Frame object
 * This function will parse fallback font metadata from frame data. Will return method for each font name found in the frame.
 */
export const postscriptFontFallbackParser = (element: Node<ChildrenNodes>) => {
  return {
    [element.name.substring(CONFIG_PREFIX.length)]: {
      ...element.children.reduce((carry: Record<string, string>, child) => {
        carry[child.name] = fontFallbackParser(child);
        return carry;
      }, {}),
    },
  };
};

/**
 * @param element a Figma Frame object
 * This function will parse fallback fonts for specific font and create fallback font string.
 */
const fontFallbackParser = (element: Node) => {
  return isNodeWithChildren(element)
    ? element.children
        .map((child) => child.name)
        .sort()
        .map((fontName) => {
          const orderNumber = fontName.split('-')[0];
          return fontName.substring(orderNumber.length + 1);
        })
        .join(', ')
    : '';
};
