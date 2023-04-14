import { ThemeParserObject, FillNode } from '../../../types';
import { getPaintColor } from '../../../utils';

export const setBackground = (element: FillNode): ThemeParserObject => {
  const { fills } = element;
  if (
    fills &&
    fills.length > 0 &&
    fills[0].color &&
    fills[0].visible !== false
  ) {
    return { backgroundColor: getPaintColor(fills[0]) };
  }
  return {};
};
