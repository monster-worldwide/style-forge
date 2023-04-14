import { createFrame, createNode, createRectangle } from '../../../utils';
import { fontFallbackParserPlugin } from '.';

const mockMetaDataNode = () => {
  return createFrame('.ds-config-font-fallback', [
    createFrame('serif', [
      createNode('1-Times', 'GROUP'),
      createNode('2-Tahoma', 'GROUP'),
    ]),
    createRectangle('sans-serif', '', ''),
  ]);
};

describe('Test Font Fallback Parser Plugin', () => {
  it('will parse background value', () => {
    const parsedValue = fontFallbackParserPlugin().runParser(
      mockMetaDataNode(),
    );

    expect(parsedValue.parserResult).toEqual({
      'font-fallback': { serif: 'Times, Tahoma', 'sans-serif': '' },
    });
  });

  it('wont run', () => {
    const parsedValue = fontFallbackParserPlugin().runParser(
      createFrame('test'),
    );

    expect(parsedValue.parserResult).toEqual({});
  });
});
