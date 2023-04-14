import { ParserPlugin, PostProcessorPlugin } from '../plugins';

export type ConfigParserPluginList = (string | ParserPlugin)[];

export type ConfigPostProcessorPluginList = (string | PostProcessorPlugin)[];

export type GetThemeDataConfig = {
  variantPlugins?: ConfigParserPluginList;
  tokenPlugins?: ConfigParserPluginList;
  postProcessorPlugins?: ConfigPostProcessorPluginList;
};
