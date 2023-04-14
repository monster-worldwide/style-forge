import { PackagerPlugin, ThemeParserObject } from '../../../types';
import { createTsObject } from './data-manipulation';

export const themePackagerPlugin = () => {
  return {
    id: 'theme',
    runFileCreation: (data: ThemeParserObject) => {
      return [
        {
          path: 'theme/theme.ts',
          content: JSON.stringify(createTsObject(data, false), null, 2),
        },
        {
          path: 'dist/theme.ts',
          content: JSON.stringify(createTsObject(data, true), null, 2),
        },
      ];
    },
  } as PackagerPlugin;
};
