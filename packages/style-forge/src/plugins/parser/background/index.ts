import { ParserPlugin, Node } from '../../../types';
import { setBackground } from './parser';
import { runCondition } from './condition';

export const backgroundParserPlugin = () => {
  return {
    id: 'background',
    runParser: (element: Node) =>
      runCondition(element)
        ? { parserResult: setBackground(element), pluginData: {} }
        : { parserResult: {}, pluginData: {} },
  } as ParserPlugin;
};
