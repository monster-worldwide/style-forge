import { ParserPlugin, Node } from '../../../types';
import { setBorder } from './parser';
import { runCondition } from './condition';

export const borderParserPlugin = () => {
  return {
    id: 'border',
    runParser: (element: Node) =>
      runCondition(element)
        ? { parserResult: setBorder(element), pluginData: {} }
        : { parserResult: {}, pluginData: {} },
  } as ParserPlugin;
};
