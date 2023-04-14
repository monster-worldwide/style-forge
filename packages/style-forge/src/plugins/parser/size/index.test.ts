import { createNode, NodeContent } from '../../../utils';
import { sizeParserPlugin } from '.';

const mockSizeNode = (
  hasBoundingBox: NodeContent,
  width: number,
  height: number,
) => {
  const box =
    hasBoundingBox !== NodeContent.EMPTY
      ? {
          absoluteBoundingBox: {
            width,
            height,
            x: 0,
            y: 0,
          },
        }
      : {};
  if (hasBoundingBox === NodeContent.FALSE) {
    return {
      ...createNode('rectangle', 'CANVAS'),
      ...box,
    };
  }
  return {
    ...createNode('rectangle', 'RECTANGLE'),
    ...box,
  };
};

describe('Test Size Parser Plugin', () => {
  it('will parse both values', () => {
    const parsedValue = sizeParserPlugin().runParser(
      mockSizeNode(NodeContent.TRUE, 10, 20),
    );

    expect(parsedValue.parserResult).toEqual({
      width: '10px',
      height: '20px',
    });
  });

  it('will not parse missing values', () => {
    const parsedValue = sizeParserPlugin().runParser(
      mockSizeNode(NodeContent.EMPTY, 10, 20),
    );

    expect(parsedValue.parserResult).toEqual({});
  });
  it('will not parse wrong node', () => {
    const parsedValue = sizeParserPlugin().runParser(
      mockSizeNode(NodeContent.FALSE, 10, 20),
    );

    expect(parsedValue.parserResult).toEqual({});
  });
});
