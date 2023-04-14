import { colorSelection, createNode, NodeContent } from '../../../utils';
import { boxShadowParserPlugin } from '.';

const mockBoxShadowNode = (
  hasEffect: NodeContent,
  visible: boolean,
  hasOffset: boolean,
) => {
  const effects =
    hasEffect !== NodeContent.FALSE
      ? {
          effects:
            hasEffect !== NodeContent.EMPTY
              ? [
                  {
                    color: { ...colorSelection('white') },
                    visible,
                    offset: hasOffset
                      ? {
                          x: 0,
                          y: 1,
                        }
                      : {},
                    radius: 10,
                  },
                ]
              : [],
        }
      : {};
  return { ...createNode('rectangle', 'RECTANGLE'), ...effects };
};

describe('Test Box Shadow Parser Plugin', () => {
  it('will parse box shadow', () => {
    const parsedValue = boxShadowParserPlugin().runParser(
      mockBoxShadowNode(NodeContent.TRUE, true, true),
    );

    expect(parsedValue.parserResult).toEqual({
      boxShadow: '0px 1px 10px #ffffff',
    });
  });
  it('will not parse box shadow if empty', () => {
    const parsedValue = boxShadowParserPlugin().runParser(
      mockBoxShadowNode(NodeContent.EMPTY, true, true),
    );

    expect(parsedValue.parserResult).toEqual({});
  });
  it('will not parse box shadow if missing', () => {
    const parsedValue = boxShadowParserPlugin().runParser(
      mockBoxShadowNode(NodeContent.FALSE, true, true),
    );

    expect(parsedValue.parserResult).toEqual({});
  });
  it('will not parse box shadow if not visible', () => {
    const parsedValue = boxShadowParserPlugin().runParser(
      mockBoxShadowNode(NodeContent.TRUE, false, true),
    );

    expect(parsedValue.parserResult).toEqual({});
  });
  it('will put default values if offset is missing', () => {
    const parsedValue = boxShadowParserPlugin().runParser(
      mockBoxShadowNode(NodeContent.TRUE, true, false),
    );

    expect(parsedValue.parserResult).toEqual({
      boxShadow: '0px 0px 10px #ffffff',
    });
  });
});
