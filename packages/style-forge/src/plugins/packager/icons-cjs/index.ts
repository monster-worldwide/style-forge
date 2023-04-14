import { IconObject, PackagerPlugin } from '../../../types';
import { createIconsCjs } from './data-manipulation';

export const iconsCjsPackagerPlugin = () => {
  return {
    id: 'icons-cjs',
    runFileCreation: (data: IconObject) => {
      return createIconsCjs(data);
    },
  } as PackagerPlugin;
};
