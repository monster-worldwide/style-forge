import {
  jsonPackagerPlugin,
  packageJsonPackagerPlugin,
  schemaPackagerPlugin,
  scssPackagerPlugin,
  themePackagerPlugin,
} from '../plugins';
import { directoryPackager } from '../runners/directory-packager';
import { zipPackager } from '../runners/zip-packager';
import { PackageConfiguration, ThemeParserObject } from '../types';

export const createThemePackage = (
  themeData: ThemeParserObject,
  config: PackageConfiguration,
) => {
  switch (config.outputType) {
    case 'directory':
      return defaultThemeDirectoryPackager(
        themeData,
        config.outputPath,
        config.packageName,
        config.version,
      );
    case 'zip':
      return defaultThemeZipPackager(
        themeData,
        config.packageName,
        config.version,
      );
  }
};

const defaultThemeDirectoryPackager = (
  data: ThemeParserObject,
  path: string,
  name: string,
  version: string,
) => {
  return directoryPackager(data, path, [
    jsonPackagerPlugin(),
    schemaPackagerPlugin(),
    scssPackagerPlugin(),
    themePackagerPlugin(),
    packageJsonPackagerPlugin(name, version),
  ]);
};

const defaultThemeZipPackager = (
  data: ThemeParserObject,
  name: string,
  version: string,
) => {
  return zipPackager(data, [
    jsonPackagerPlugin(),
    schemaPackagerPlugin(),
    scssPackagerPlugin(),
    themePackagerPlugin(),
    packageJsonPackagerPlugin(name, version),
  ]);
};
