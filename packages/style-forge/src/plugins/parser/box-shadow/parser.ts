import { ThemeParserObject, NodeWithEffects } from '../../../types';
import { getEffectColor } from '../../../utils';

export const setBoxShadow = (element: NodeWithEffects): ThemeParserObject => {
  const { effects } = element;
  if (effects && effects.length > 0) {
    const effect = effects[0];
    if (effect.visible !== false) {
      return {
        boxShadow: `${effect.offset?.x || 0}px ${effect.offset?.y || 0}px ${
          effect.radius
        }px ${getEffectColor(effect)}`,
      };
    }
  }
  return {};
};
