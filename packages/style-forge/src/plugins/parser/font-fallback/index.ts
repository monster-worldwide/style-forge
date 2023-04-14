import { ParserPlugin, Node } from '../../../types';
import { runCondition } from './condition';
import { postscriptFontFallbackParser } from './parser';

export const fontFallbackParserPlugin = () => {
  return {
    id: 'font-fallback',
    runParser: (element: Node) =>
      runCondition(element)
        ? {
            parserResult: postscriptFontFallbackParser(element),
            pluginData: {},
          }
        : { parserResult: {}, pluginData: {} },
  } as ParserPlugin;
};
