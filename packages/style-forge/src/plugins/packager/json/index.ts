import { PackagerPlugin, ThemeParserObject } from '../../../types';
import { createJson } from './data-manipulation';

export const jsonPackagerPlugin = () => {
  return {
    id: 'json',
    runFileCreation: (data: ThemeParserObject) => {
      return [{ path: 'theme/theme.json', content: createJson(data) }];
    },
  } as PackagerPlugin;
};
