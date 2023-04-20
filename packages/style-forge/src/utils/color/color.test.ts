import { EffectType, PaintType } from 'figma-api';
import { getEffectColor, getPaintColor } from './';

describe('Test color util', () => {
  it('will validate effect color', () => {
    const color = getEffectColor({
      type: EffectType.INNER_SHADOW,
      visible: true,
      color: { r: 0.5, g: 0.5, b: 0.5, a: 1 },
      radius: 0,
    });
    const transparentColor = getEffectColor({
      type: EffectType.INNER_SHADOW,
      visible: true,
      color: { r: 0.5, g: 0.5, b: 0.5, a: 0 },
      radius: 0,
    });
    const rgbaColor = getEffectColor({
      type: EffectType.INNER_SHADOW,
      visible: true,
      color: { r: 0.5, g: 0.5, b: 0.5, a: 0.5 },
      radius: 0,
    });
    const defaultColor = getEffectColor({
      type: EffectType.INNER_SHADOW,
      visible: true,
      radius: 0,
    });

    expect(defaultColor).toEqual('#000000');
    expect(color).toEqual('#808080');
    expect(transparentColor).toEqual('transparent');
    expect(rgbaColor).toEqual('rgba(128, 128, 128, 0.5)');
  });
  it('will validate paint color', () => {
    const defaultColor = getPaintColor({ type: PaintType.SOLID });
    const opaqueColor = getPaintColor({ type: PaintType.SOLID, opacity: 0.5 });
    const fullColor = getPaintColor({
      type: PaintType.SOLID,
      opacity: 0.5,
      color: { r: 0.5, g: 0.5, b: 0.5, a: 0.5 },
    });
    expect(defaultColor).toEqual('#000000');
    expect(opaqueColor).toEqual('rgba(0, 0, 0, 0.5)');
    expect(fullColor).toEqual('rgba(128, 128, 128, 0.5)');
  });
});
