import { ThemeParserObject, NodeWithPadding, Padding } from '../../../types';

export const setPadding = (element: NodeWithPadding): ThemeParserObject => {
  const {
    paddingLeft = 0,
    paddingRight = 0,
    paddingTop = 0,
    paddingBottom = 0,
  } = element;
  if (paddingLeft || paddingRight || paddingBottom || paddingTop) {
    return {
      padding: stringifyPadding({
        top: paddingTop,
        left: paddingLeft,
        bottom: paddingBottom,
        right: paddingRight,
      }),
    };
  }
  return {};
};

const stringifyPadding = (padding: Padding) => {
  const { top, right, bottom, left } = padding;
  if (left === right) {
    if (top === bottom) {
      if (top === right) {
        return `${top}px`;
      }
      return `${top}px ${right}px`;
    }
    return `${top}px ${right}px ${bottom}px`;
  }
  return `${top}px ${right}px ${bottom}px ${left}px`;
};
