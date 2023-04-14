import { ThemeParserObject, BorderElement } from '../../../types';
import { getPaintColor } from '../../../utils';

export const setBorder = (element: BorderElement): ThemeParserObject => {
  const style = {} as ThemeParserObject;
  const { cornerRadius, rectangleCornerRadii, strokes, strokeWeight } = element;
  if (strokeWeight && strokeWeight > 0 && strokes && strokes.length > 0) {
    style.border = `${strokeWeight}px solid ${getPaintColor(strokes[0])}`;
  }
  if (Boolean(rectangleCornerRadii) || Boolean(cornerRadius)) {
    if (rectangleCornerRadii && rectangleCornerRadii.length === 4) {
      // rename the corners for better clarity
      const [topLeft, topRight, bottomRight, bottomLeft] = rectangleCornerRadii;
      style.borderRadius = stringifyBorderRadius(
        topLeft,
        topRight,
        bottomRight,
        bottomLeft,
      );
    } else {
      // use only if there is no rectangleBorderRadii defining different values for each corner
      style.borderRadius = `${cornerRadius}px`;
    }
  }
  return style;
};

const stringifyBorderRadius = (
  topLeft: number,
  topRight: number,
  bottomRight: number,
  bottomLeft: number,
) => {
  if (topRight === bottomLeft) {
    if (topLeft === bottomRight) {
      if (topLeft === topRight) {
        return `${topLeft}px`;
      } else {
        return `${topLeft}px ${topRight}px`;
      }
    } else {
      return `${topLeft}px ${topRight}px ${bottomRight}px`;
    }
  } else {
    return `${topLeft}px ${topRight}px ${bottomRight}px ${bottomLeft}px`;
  }
};
