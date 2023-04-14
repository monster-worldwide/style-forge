import type { Paint, Effect } from '../../types';

const convertColor = (color: number) => Math.round(color * 255);

const convertToHex = (color: number) =>
  convertColor(color).toString(16).padStart(2, '0');

/**
 * @param data a Figma object with {color: {r: xx g: xx b: xx a: xx}}
 *
 * Returns #xxxxxx if the alpha value is 1, rgba(...) if not.
 */
export const getPaintColor = (data: Paint) => {
  const { r = 0, g = 0, b = 0, a = 1 } = data.color || {};
  const { opacity = 1 } = data;
  const computedOpacity = a === 1 ? opacity : a;
  return getColor(r, g, b, computedOpacity);
};

export const getEffectColor = (data: Effect) => {
  const { r = 0, g = 0, b = 0, a = 1 } = data.color || {};
  return getColor(r, g, b, a);
};

const getColor = (r: number, g: number, b: number, a: number) => {
  if (a === 0) {
    return 'transparent';
  }
  if (a === 1) {
    return `#${convertToHex(r)}${convertToHex(g)}${convertToHex(b)}`;
  }
  return `rgba(${convertColor(r)}, ${convertColor(g)}, ${convertColor(b)}, ${
    Math.round((a + Number.EPSILON) * 100) / 100
  })`;
};
