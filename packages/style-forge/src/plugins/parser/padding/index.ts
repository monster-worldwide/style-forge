import { ParserPlugin, Node } from '../../../types';
import { setPadding } from './parser';
import { runCondition } from './condition';

export const paddingParserPlugin = () => {
  return {
    id: 'padding',
    runParser: (element: Node) =>
      runCondition(element)
        ? { parserResult: setPadding(element), pluginData: {} }
        : { parserResult: {}, pluginData: {} },
  } as ParserPlugin;
};
