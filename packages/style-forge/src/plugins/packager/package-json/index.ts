import { PackagerPlugin } from '../../../types';
import { createPackageJson } from './data-manipulation';

export const packageJsonPackagerPlugin = (name: string, version = '0.1.0') => {
  return {
    id: 'package-json',
    runFileCreation: () => {
      return [
        { path: 'package.json', content: createPackageJson(name, version) },
      ];
    },
  } as PackagerPlugin;
};
