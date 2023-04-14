import { createFrame, createVector } from '../../../utils';
import { variantIconParserPlugin } from '.';

const mockIconNode = (
  hasBoundingBox: boolean,
  hasFrame: boolean,
  hasVector: boolean,
) => {
  const box = hasBoundingBox
    ? {
        absoluteBoundingBox: {
          width: 20,
          height: 10,
          y: 0,
          x: 0,
        },
      }
    : {};
  const children = hasFrame
    ? [
        {
          ...createFrame('frame'),
          children: hasVector ? [createVector('test', 'white')] : null,
        },
      ]
    : hasVector
    ? [createVector('test', 'white')]
    : undefined;
  return {
    ...createFrame('md-icon/close', children),
    ...box,
  };
};

describe('Test Variant Icon Parser Plugin', () => {
  it('will parse icon value', () => {
    const parsedValueNoChild = variantIconParserPlugin().runParser(
      mockIconNode(true, false, false),
    );
    const parsedValueOneChild = variantIconParserPlugin().runParser(
      mockIconNode(true, false, true),
    );
    const parsedValueNontraversable = variantIconParserPlugin().runParser(
      mockIconNode(true, true, false),
    );
    const parsedValueTwoChild = variantIconParserPlugin().runParser(
      mockIconNode(true, true, true),
    );

    expect(parsedValueNoChild.parserResult).toEqual({
      width: '20px',
      height: '10px',
    });
    expect(parsedValueOneChild.parserResult).toEqual({
      color: '#ffffff',
      fill: '#ffffff',
      width: '20px',
      height: '10px',
    });
    expect(parsedValueNontraversable.parserResult).toEqual({
      width: '20px',
      height: '10px',
    });
    expect(parsedValueTwoChild.parserResult).toEqual({
      color: '#ffffff',
      fill: '#ffffff',
      width: '20px',
      height: '10px',
    });
  });

  it('will not get size', () => {
    const parsedValue = variantIconParserPlugin().runParser(
      mockIconNode(false, false, true),
    );

    expect(parsedValue.parserResult).toEqual({
      color: '#ffffff',
      fill: '#ffffff',
    });
  });

  it('will not run', () => {
    const parsedValue = variantIconParserPlugin().runParser(
      createFrame('test'),
    );

    expect(parsedValue.parserResult).toEqual({});
  });
});
