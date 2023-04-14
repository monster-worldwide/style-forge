import { PackagerPlugin } from '../../../types';
import { createPackageJson } from './data-manipulation';

export const iconsPackageJsonPackagerPlugin = (
  name: string,
  version = '0.1.0',
) => {
  return {
    id: 'icons-package-json',
    runFileCreation: () => {
      return [
        { path: 'package.json', content: createPackageJson(name, version) },
      ];
    },
  } as PackagerPlugin;
};
