import { createRectangle, NodeContent } from '../../../utils';
import { backgroundParserPlugin } from '.';

const mockBackgroundNode = (hasFills: NodeContent = NodeContent.TRUE) => {
  return createRectangle(
    'rectangle',
    hasFills === NodeContent.EMPTY
      ? 'none'
      : hasFills === NodeContent.FALSE
      ? 'no-fill'
      : 'white',
    'no-stroke',
  );
};

describe('Test Background Parser Plugin', () => {
  it('will parse background value', () => {
    const parsedValue = backgroundParserPlugin().runParser(
      mockBackgroundNode(),
    );

    expect(parsedValue.parserResult).toEqual({ backgroundColor: '#ffffff' });
  });

  it('will not parse background value when fills are missing', () => {
    const parsedValue = backgroundParserPlugin().runParser(
      mockBackgroundNode(NodeContent.FALSE),
    );

    expect(parsedValue.parserResult).toEqual({});
  });

  it('will not parse background value when fills are empty', () => {
    const parsedValue = backgroundParserPlugin().runParser(
      mockBackgroundNode(NodeContent.EMPTY),
    );

    expect(parsedValue.parserResult).toEqual({});
  });
});
