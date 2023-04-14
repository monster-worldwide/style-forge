import { PostProcessorPlugin, ThemeParserObject } from '../../../types';
import { flattenDuplicates } from './flatten-duplicates';

export const flattenPostProcessorPlugin = () => {
  return {
    id: 'flatten',
    runPostProcessing: (data: ThemeParserObject) => flattenDuplicates(data, ''),
  } as PostProcessorPlugin;
};
