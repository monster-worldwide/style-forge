import { PostProcessorPlugin, ThemeParserObject } from '../../../types';
import { removeJSONInvalidCharacters } from './remove-json-invalid-characters';

export const removeInvalidCharactersPostProcessorPlugin = () => {
  return {
    id: 'remove-invalid-characters',
    runPostProcessing: (data: ThemeParserObject) =>
      removeJSONInvalidCharacters(data),
  } as PostProcessorPlugin;
};
