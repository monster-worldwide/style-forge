import { IconObject, PackagerPlugin } from '../../../types';
import { createIconsFile } from './data-manipulation';

export const iconsFilePackagerPlugin = () => {
  return {
    id: 'icons-file',
    runFileCreation: (data: IconObject) => {
      return createIconsFile(data);
    },
  } as PackagerPlugin;
};
