import { IconObject, PackagerPlugin } from '../../../types';
import { createModuleIndex } from './module-index';
import { createTypedef } from './typedef';

export const iconsFileIndexPackagerPlugin = () => {
  return {
    id: 'icons-file-index',
    runFileCreation: (data: IconObject) => {
      return [
        { path: 'src/index.js', content: createModuleIndex(data) },
        { path: 'dist/index.d.ts', content: createTypedef(data) },
      ];
    },
  } as PackagerPlugin;
};
