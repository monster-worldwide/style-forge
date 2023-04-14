import { flattenPostProcessorPlugin } from './flatten';
import { removeInvalidCharactersPostProcessorPlugin } from './remove-invalid-characters';
import { splitObjectsPostProcessorPlugin } from './split-objects';

const PostProcessorPlugins = {
  FlattenPostProcessorPlugin: 'flatten',
  RemoveInvalidCharactersPostProcessorPlugin: 'remove-invalid-characters',
  SplitObjectsPostProcessorPlugin: 'split-objects',
};

const postProcessorPluginSelector = (pluginId: string) => {
  switch (pluginId) {
    case PostProcessorPlugins.FlattenPostProcessorPlugin:
      return flattenPostProcessorPlugin;
    case PostProcessorPlugins.RemoveInvalidCharactersPostProcessorPlugin:
      return removeInvalidCharactersPostProcessorPlugin;
    case PostProcessorPlugins.SplitObjectsPostProcessorPlugin:
      return splitObjectsPostProcessorPlugin;
    default:
      return null;
  }
};

export {
  PostProcessorPlugins,
  postProcessorPluginSelector,
  flattenPostProcessorPlugin,
  removeInvalidCharactersPostProcessorPlugin,
  splitObjectsPostProcessorPlugin,
};
