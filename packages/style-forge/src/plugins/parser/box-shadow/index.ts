import { ParserPlugin, Node } from '../../../types';
import { setBoxShadow } from './parser';
import { runCondition } from './condition';

export const boxShadowParserPlugin = () => {
  return {
    id: 'box-shadow',
    runParser: (element: Node) =>
      runCondition(element)
        ? { parserResult: setBoxShadow(element), pluginData: {} }
        : { parserResult: {}, pluginData: {} },
  } as ParserPlugin;
};
