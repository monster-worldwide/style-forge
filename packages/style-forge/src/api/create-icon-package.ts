import {
  iconsCjsPackagerPlugin,
  iconsIndexPackagerPlugin,
  iconsModulePackagerPlugin,
  iconsPackageJsonPackagerPlugin,
} from '../plugins';
import { directoryPackager } from '../runners/directory-packager';
import { zipPackager } from '../runners/zip-packager';
import { IconObject, PackageConfiguration } from '../types';

export const createIconPackage = (
  iconData: IconObject,
  config: PackageConfiguration,
) => {
  switch (config.outputType) {
    case 'directory':
      return defaultIconsDirectoryPackager(
        iconData,
        config.outputPath,
        config.packageName,
        config.version,
      );
    case 'zip':
      return defaultIconsZipPackager(
        iconData,
        config.packageName,
        config.version,
      );
  }
};

const defaultIconsDirectoryPackager = (
  data: IconObject,
  path: string,
  name: string,
  version: string,
) => {
  return directoryPackager(data, path, [
    iconsCjsPackagerPlugin(),
    iconsIndexPackagerPlugin(),
    iconsModulePackagerPlugin(),
    iconsPackageJsonPackagerPlugin(name, version),
  ]);
};

const defaultIconsZipPackager = (
  data: IconObject,
  name: string,
  version: string,
) => {
  return zipPackager(data, [
    iconsCjsPackagerPlugin(),
    iconsIndexPackagerPlugin(),
    iconsModulePackagerPlugin(),
    iconsPackageJsonPackagerPlugin(name, version),
  ]);
};
