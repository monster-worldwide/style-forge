import { ParserPlugin, Node } from '../../../types';
import { setSize } from './parser';
import { runCondition } from './condition';

export const sizeParserPlugin = () => {
  return {
    id: 'size',
    runParser: (element: Node) =>
      runCondition(element)
        ? { parserResult: setSize(element), pluginData: {} }
        : { parserResult: {}, pluginData: {} },
  } as ParserPlugin;
};
