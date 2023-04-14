import { MetaData, ParserPlugin, Node } from '../../../types';
import { setText } from './parser';
import { runCondition } from './condition';

export const textParserPlugin = () => {
  return {
    id: 'text',
    runParser: (element: Node, metaData?: MetaData) =>
      runCondition(element)
        ? { parserResult: setText(element, metaData), pluginData: {} }
        : { parserResult: {}, pluginData: {} },
  } as ParserPlugin;
};
