import {
  MetaData,
  ParserPlugin,
  Node,
  PluginData,
  AutolayoutData,
} from '../../../types';
import { runCondition } from './condition';
import { setAutolayoutPluginData } from './plugin-data';
import { setAutolayout } from './parser';

export const autolayoutParserPlugin = () => {
  return {
    id: 'autolayout',
    runParser: (element: Node, _metaData?: MetaData, pluginData?: PluginData) =>
      runCondition(element)
        ? {
            parserResult: setAutolayout(
              element,
              pluginData?.autolayout as AutolayoutData,
            ),
            pluginData: setAutolayoutPluginData(element),
          }
        : { parserResult: {}, pluginData: {} },
  } as ParserPlugin;
};
