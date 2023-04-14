import { Api } from 'figma-api';
import {
  emptyNamesValidatorPlugin,
  fontFallbackParserPlugin,
  parserPluginSelector,
  parsingValidatorPlugin,
  postProcessorPluginSelector,
} from '../plugins';
import { metaDataParser } from '../runners/meta-data-parser';
import { postProcessor } from '../runners/post-processor';
import { tokenParser } from '../runners/token-parser';
import { validator } from '../runners/validator';
import { variantParser } from '../runners/variant-parser';
import {
  MetaData,
  GetFileResult,
  ThemeParserObject,
  GetThemeDataConfig,
  ConfigParserPluginList,
  ParserPlugin,
  ConfigPostProcessorPluginList,
  PostProcessorPlugin,
} from '../types';

const getParserPlugins = (plugins: ConfigParserPluginList) => {
  return plugins
    .map((plugin) => {
      if (typeof plugin === 'string') {
        return parserPluginSelector(plugin)?.();
      } else {
        return plugin;
      }
    })
    .filter((plugin) => Boolean(plugin)) as ParserPlugin[];
};

const getPostProcessorPlugins = (plugins: ConfigPostProcessorPluginList) => {
  return plugins
    .map((plugin) => {
      if (typeof plugin === 'string') {
        return postProcessorPluginSelector(plugin)?.();
      } else {
        return plugin;
      }
    })
    .filter((plugin) => Boolean(plugin)) as PostProcessorPlugin[];
};

export const getThemeData = async (
  figmaToken: string,
  figmaFileKey: string,
  config?: GetThemeDataConfig,
) => {
  const api = new Api({ personalAccessToken: figmaToken });
  const file = await api.getFile(figmaFileKey);
  const metaData = await defaultMetaDataParser(file);
  const parseResult = {
    ...(await defaultVariantParser(file, metaData, config?.variantPlugins)),
    ...(await defaultTokenParser(file, metaData, config?.tokenPlugins)),
  };
  const postProcessedResult = defaultPostProcessor(
    parseResult,
    config?.postProcessorPlugins,
  );
  let validation = false;
  try {
    defaultValidator(postProcessedResult);
    validation = true;
  } catch (e: unknown) {
    validation = false;
  }
  if (validation) {
    return postProcessedResult;
  } else {
    return {};
  }
};

const defaultVariantParser = async (
  file: GetFileResult,
  metaData: MetaData,
  plugins?: ConfigParserPluginList,
) => {
  const variantParserPlugins = getParserPlugins(
    plugins || [
      'autolayout',
      'background',
      'border',
      'box-shadow',
      'padding',
      'size',
      'text',
      'variant-icon',
    ],
  );
  return await variantParser(file, variantParserPlugins, metaData);
};

const defaultMetaDataParser = async (file: GetFileResult) => {
  return await metaDataParser(file, [fontFallbackParserPlugin()]);
};

const defaultTokenParser = async (
  file: GetFileResult,
  metaData: MetaData,
  plugins?: ConfigParserPluginList,
) => {
  const tokenParserPlugins = getParserPlugins(
    plugins || ['background', 'size', 'text'],
  );
  return await tokenParser(file, tokenParserPlugins, metaData);
};

const defaultValidator = (postProcessedResult: ThemeParserObject) =>
  validator(postProcessedResult, [
    emptyNamesValidatorPlugin(),
    parsingValidatorPlugin(),
  ]);

const defaultPostProcessor = (
  parseResult: ThemeParserObject,
  plugins?: ConfigPostProcessorPluginList,
) => {
  const postProcessorPlugins = getPostProcessorPlugins(
    plugins || ['split-objects', 'flatten', 'remove-invalid-characters'],
  );
  return postProcessor(parseResult, postProcessorPlugins);
};
