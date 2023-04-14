import { createRectangle, NodeContent } from '../../../utils';
import { borderParserPlugin } from '.';

const mockBorderNode = (
  hasStrokes: NodeContent,
  strokeWeight: number,
  cornerRadius: number | undefined,
  rectangleCornerRadii: number[] | undefined,
) => {
  return {
    ...createRectangle(
      'rectangle',
      'no-fill',
      hasStrokes === NodeContent.FALSE ? 'no-stroke' : 'white',
    ),
    strokeWeight,
    cornerRadius,
    rectangleCornerRadii,
  };
};

describe('Test Border Parser Plugin', () => {
  it('will parse border and borderradius value', () => {
    const parsedValue = borderParserPlugin().runParser(
      mockBorderNode(NodeContent.TRUE, 1, 8, []),
    );

    expect(parsedValue.parserResult).toEqual({
      border: '1px solid #ffffff',
      borderRadius: '8px',
    });
  });
  it('will not parse border value if strokeWeight is 0', () => {
    const parsedValue = borderParserPlugin().runParser(
      mockBorderNode(NodeContent.TRUE, 0, 8, []),
    );

    expect(parsedValue.parserResult).toEqual({
      borderRadius: '8px',
    });
  });
  it('will parse correctly 4-sided border radius', () => {
    const parsedValue = borderParserPlugin().runParser(
      mockBorderNode(NodeContent.TRUE, 0, 0, [1, 2, 3, 4]),
    );

    expect(parsedValue.parserResult).toEqual({
      borderRadius: '1px 2px 3px 4px',
    });
  });
  it('will parse correctly 3-sided border radius', () => {
    const parsedValue = borderParserPlugin().runParser(
      mockBorderNode(NodeContent.TRUE, 0, 0, [1, 2, 3, 2]),
    );

    expect(parsedValue.parserResult).toEqual({
      borderRadius: '1px 2px 3px',
    });
  });
  it('will parse correctly 2-sided border radius', () => {
    const parsedValue = borderParserPlugin().runParser(
      mockBorderNode(NodeContent.TRUE, 0, 0, [1, 2, 1, 2]),
    );

    expect(parsedValue.parserResult).toEqual({
      borderRadius: '1px 2px',
    });
  });
  it('will parse correctly 1-sided border radius', () => {
    const parsedValue = borderParserPlugin().runParser(
      mockBorderNode(NodeContent.TRUE, 0, 0, [1, 1, 1, 1]),
    );

    expect(parsedValue.parserResult).toEqual({
      borderRadius: '1px',
    });
  });
  it('will not parse anything if not border element', () => {
    const parsedValue = borderParserPlugin().runParser(
      mockBorderNode(NodeContent.FALSE, 0, 0, []),
    );

    expect(parsedValue.parserResult).toEqual({});
  });
  it('will not parse borderradius if undefined', () => {
    const parsedValueBothUndefined = borderParserPlugin().runParser(
      mockBorderNode(NodeContent.TRUE, 1, undefined, undefined),
    );
    expect(parsedValueBothUndefined.parserResult).toEqual({
      border: '1px solid #ffffff',
    });
  });
});
