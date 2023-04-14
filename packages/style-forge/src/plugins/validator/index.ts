import { emptyNamesValidatorPlugin } from './empty-names';
import { parsingValidatorPlugin } from './parsing';

const ValidatorPlugins = {
  EmptyNamesValidatorPlugin: 'empty-names',
  ParsingValidatorPlugin: 'parsing',
};

const validatorPluginSelector = (pluginId: string) => {
  switch (pluginId) {
    case ValidatorPlugins.EmptyNamesValidatorPlugin:
      return emptyNamesValidatorPlugin;
    case ValidatorPlugins.ParsingValidatorPlugin:
      return parsingValidatorPlugin;
    default:
      return null;
  }
};

export {
  ValidatorPlugins,
  validatorPluginSelector,
  emptyNamesValidatorPlugin,
  parsingValidatorPlugin,
};
