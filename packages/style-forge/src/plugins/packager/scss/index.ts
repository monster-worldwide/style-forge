import { PackagerPlugin, ThemeParserObject } from '../../../types';
import { createScssObject } from './data-manipulation';

export const scssPackagerPlugin = () => {
  return {
    id: 'scss',
    runFileCreation: (data: ThemeParserObject) => {
      return [
        {
          path: 'theme/tokens.scss',
          content: createScssObject(data),
        },
      ];
    },
  } as PackagerPlugin;
};
