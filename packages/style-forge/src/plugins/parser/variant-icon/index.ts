import { ParserPlugin, Node } from '../../../types';
import { setIconProperties } from './parser';
import { runCondition } from './condition';

export const variantIconParserPlugin = () => {
  return {
    id: 'variant-icon',
    runParser: (element: Node) =>
      runCondition(element)
        ? { parserResult: setIconProperties(element), pluginData: {} }
        : { parserResult: {}, pluginData: {} },
  } as ParserPlugin;
};
