import { MetaData, ThemeParserObject, Node } from '../../../types';
import { getPaintColor } from '../../../utils';

export const setText = (
  element: Node<'TEXT'>,
  metaData?: MetaData,
): ThemeParserObject => {
  const result = {} as ThemeParserObject;
  const {
    fontFamily,
    fontWeight,
    fontSize,
    lineHeightPx,
    textCase,
    textDecoration,
  } = element.style;
  const { fills } = element;
  if (fontFamily) {
    const fallbackFonts = metaData?.['font-fallback']?.[fontFamily];
    result.fontFamily = `${fontFamily}${
      fallbackFonts ? `, ${fallbackFonts}` : ''
    }`;
  }
  fontWeight && (result.fontWeight = fontWeight);
  fontSize && (result.fontSize = `${fontSize}px`);
  fills && fills.length > 0 && (result.color = getPaintColor(fills[0]));
  lineHeightPx && (result.lineHeight = `${lineHeightPx}px`);
  textCase &&
    (result.textTransform =
      textCase === 'UPPER'
        ? 'uppercase'
        : textCase === 'LOWER'
        ? 'lowercase'
        : 'none');
  textDecoration &&
    (result.textDecoration =
      textDecoration === 'UNDERLINE'
        ? 'underline'
        : textDecoration === 'STRIKETHROUGH'
        ? 'line-through'
        : 'none');
  return result;
};
