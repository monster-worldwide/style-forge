import { PostProcessorPlugin, ThemeParserObject } from '../../types';

export const postProcessor = (
  data: ThemeParserObject,
  plugins: PostProcessorPlugin[],
): ThemeParserObject => {
  return plugins.reduce((previousValue, plugin) => {
    return plugin.runPostProcessing(previousValue);
  }, data);
};
