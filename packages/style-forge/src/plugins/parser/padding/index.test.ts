import { createNode } from '../../../utils';
import { paddingParserPlugin } from '.';

const mockPaddingNode = (
  hasPadding: boolean,
  paddingTop?: number,
  paddingRight?: number,
  paddingBottom?: number,
  paddingLeft?: number,
) => {
  const padding = hasPadding
    ? {
        paddingLeft,
        paddingRight,
        paddingTop,
        paddingBottom,
      }
    : {};
  return { ...createNode('frame', 'FRAME'), ...padding };
};

describe('Test Padding Parser Plugin', () => {
  it('will parse padding 4 diff values', () => {
    const parsedValue = paddingParserPlugin().runParser(
      mockPaddingNode(true, 1, 2, 3, 4),
    );

    expect(parsedValue.parserResult).toEqual({
      padding: '1px 2px 3px 4px',
    });
  });
  it('will parse padding 3 diff values', () => {
    const parsedValue = paddingParserPlugin().runParser(
      mockPaddingNode(true, 1, 2, 3, 2),
    );

    expect(parsedValue.parserResult).toEqual({
      padding: '1px 2px 3px',
    });
  });
  it('will parse padding 2 diff values', () => {
    const parsedValue = paddingParserPlugin().runParser(
      mockPaddingNode(true, 1, 2, 1, 2),
    );

    expect(parsedValue.parserResult).toEqual({
      padding: '1px 2px',
    });
  });
  it('will parse padding 1 diff values', () => {
    const parsedValue = paddingParserPlugin().runParser(
      mockPaddingNode(true, 1, 1, 1, 1),
    );

    expect(parsedValue.parserResult).toEqual({
      padding: '1px',
    });
  });
  it('will parse padding with top defined', () => {
    const parsedValue = paddingParserPlugin().runParser(
      mockPaddingNode(true, 1),
    );

    expect(parsedValue.parserResult).toEqual({
      padding: '1px 0px 0px',
    });
  });
  it('will parse padding with bottom defined', () => {
    const parsedValue = paddingParserPlugin().runParser(
      mockPaddingNode(true, undefined, undefined, 1),
    );

    expect(parsedValue.parserResult).toEqual({
      padding: '0px 0px 1px',
    });
  });
  it('will parse padding with negative values', () => {
    const parsedValue = paddingParserPlugin().runParser(
      mockPaddingNode(true, -1, -2, -3, -4),
    );

    expect(parsedValue.parserResult).toEqual({
      padding: '-1px -2px -3px -4px',
    });
  });
  it('will not parse empty padding value', () => {
    const parsedValue = paddingParserPlugin().runParser(
      mockPaddingNode(true, 0, 0, 0, 0),
    );

    expect(parsedValue.parserResult).toEqual({});
  });
  it('will not parse missing padding value', () => {
    const parsedValue = paddingParserPlugin().runParser(
      mockPaddingNode(false, 0, 0, 0, 0),
    );

    expect(parsedValue.parserResult).toEqual({});
  });
});
