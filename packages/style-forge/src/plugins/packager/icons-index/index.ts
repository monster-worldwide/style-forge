import { IconObject, PackagerPlugin } from '../../../types';
import { createCjsIndex } from './cjs-index';
import { createModuleIndex } from './module-index';
import { createTypedef } from './typedef';

export const iconsIndexPackagerPlugin = () => {
  return {
    id: 'icons-index',
    runFileCreation: (data: IconObject) => {
      return [
        { path: 'dist/index.js', content: createCjsIndex(data) },
        { path: 'dist/index.modern.js', content: createModuleIndex(data) },
        { path: 'dist/index.d.ts', content: createTypedef(data) },
      ];
    },
  } as PackagerPlugin;
};
