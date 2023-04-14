import { createText, createFrame } from '../../../utils';
import { textParserPlugin } from '.';

const mockTextNode = (
  fontFamily: string,
  fontWeight: number,
  fontSize: number,
  lineHeightPx: number,
  textCase: undefined | string,
  textDecoration: undefined | string,
  hasFills: boolean,
) => {
  return createText(
    'text',
    `${hasFills ? 'white' : 'no-fill'}`,
    fontFamily,
    fontWeight,
    fontSize,
    lineHeightPx,
    textCase,
    textDecoration,
  );
};

const metaData = {
  'font-fallback': {
    font: 'fallback',
  },
};

describe('Test Text Parser Plugin', () => {
  it('will parse all values', () => {
    const parsedValue = textParserPlugin().runParser(
      mockTextNode('font', 100, 10, 15, 'UPPER', 'UNDERLINE', true),
      metaData,
    );

    expect(parsedValue.parserResult).toEqual({
      fontFamily: 'font, fallback',
      fontWeight: 100,
      fontSize: '10px',
      lineHeight: '15px',
      textTransform: 'uppercase',
      textDecoration: 'underline',
      color: '#ffffff',
    });
  });
  it('will parse no fallback and different style values', () => {
    const parsedValue = textParserPlugin().runParser(
      mockTextNode('font', 100, 10, 15, 'LOWER', 'STRIKETHROUGH', true),
    );

    expect(parsedValue.parserResult).toEqual({
      fontFamily: 'font',
      fontWeight: 100,
      fontSize: '10px',
      lineHeight: '15px',
      textTransform: 'lowercase',
      textDecoration: 'line-through',
      color: '#ffffff',
    });
  });
  it('will parse no values', () => {
    const parsedValue = textParserPlugin().runParser(
      mockTextNode('', 0, 0, 0, undefined, undefined, false),
    );

    expect(parsedValue.parserResult).toEqual({});
  });
  it('will parse weird values', () => {
    const parsedValue = textParserPlugin().runParser(
      mockTextNode('', 0, 0, 0, 'a', 'b', false),
    );

    expect(parsedValue.parserResult).toEqual({
      textTransform: 'none',
      textDecoration: 'none',
    });
  });
  it('will not run', () => {
    const parsedValue = textParserPlugin().runParser(createFrame('test'));

    expect(parsedValue.parserResult).toEqual({});
  });
});
