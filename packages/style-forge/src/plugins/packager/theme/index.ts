import { PackagerPlugin, ThemeParserObject } from '../../../types';
import { createTsObject } from './data-manipulation';

export const themePackagerPlugin = () => {
  return {
    id: 'theme',
    runFileCreation: (data: ThemeParserObject) => {
      return [
        {
          path: 'theme/theme.ts',
          content: createTsObject(data, false),
        },
        {
          path: 'dist/theme.ts',
          content: createTsObject(data, true),
        },
      ];
    },
  } as PackagerPlugin;
};
