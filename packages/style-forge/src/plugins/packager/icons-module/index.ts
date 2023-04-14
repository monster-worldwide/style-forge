import { IconObject, PackagerPlugin } from '../../../types';
import { createIconsModule } from './data-manipulation';

export const iconsModulePackagerPlugin = () => {
  return {
    id: 'icons-module',
    runFileCreation: (data: IconObject) => {
      return createIconsModule(data);
    },
  } as PackagerPlugin;
};
