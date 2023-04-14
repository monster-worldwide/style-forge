import { PostProcessorPlugin, ThemeParserObject } from '../../../types';
import { splitSlashObject } from './split-slash-object';

export const splitObjectsPostProcessorPlugin = () => {
  return {
    id: 'split-objects',
    runPostProcessing: (data: ThemeParserObject) => splitSlashObject(data),
  } as PostProcessorPlugin;
};
