import { iconsCjsPackagerPlugin } from './icons-cjs';
import { iconsFilePackagerPlugin } from './icons-file';
import { iconsFileIndexPackagerPlugin } from './icons-file-index';
import { iconsIndexPackagerPlugin } from './icons-index';
import { iconsModulePackagerPlugin } from './icons-module';
import { iconsPackageJsonPackagerPlugin } from './icons-package-json';
import { jsonPackagerPlugin } from './json';
import { packageJsonPackagerPlugin } from './package-json';
import { schemaPackagerPlugin } from './schema';
import { scssPackagerPlugin } from './scss';
import { themePackagerPlugin } from './theme';

const PackagerPlugins = {
  IconsCjsParserPlugin: 'icons-cjs',
  IconsIndexParserPlugin: 'icons-index',
  IconsModuleParserPlugin: 'icons-module',
  IconsPackageJsonParserPlugin: 'icons-package-json',
  IconsFilePlugin: 'icons-file',
  IconsFileIndexPlugin: 'icons-file-index',
  JsonParserPlugin: 'json',
  PackageJsonParserPlugin: 'package-json',
  SchemaParserPlugin: 'schema',
  ScssParserPlugin: 'scss',
  ThemeParserPlugin: 'theme',
};

const packagerPluginSelector = (pluginId: string) => {
  switch (pluginId) {
    case PackagerPlugins.IconsCjsParserPlugin:
      return iconsCjsPackagerPlugin;
    case PackagerPlugins.IconsFileIndexPlugin:
      return iconsFileIndexPackagerPlugin;
    case PackagerPlugins.IconsFilePlugin:
      return iconsFilePackagerPlugin;
    case PackagerPlugins.IconsIndexParserPlugin:
      return iconsIndexPackagerPlugin;
    case PackagerPlugins.IconsModuleParserPlugin:
      return iconsModulePackagerPlugin;
    case PackagerPlugins.IconsPackageJsonParserPlugin:
      return iconsPackageJsonPackagerPlugin;
    case PackagerPlugins.JsonParserPlugin:
      return jsonPackagerPlugin;
    case PackagerPlugins.PackageJsonParserPlugin:
      return packageJsonPackagerPlugin;
    case PackagerPlugins.SchemaParserPlugin:
      return schemaPackagerPlugin;
    case PackagerPlugins.ScssParserPlugin:
      return scssPackagerPlugin;
    case PackagerPlugins.ThemeParserPlugin:
      return themePackagerPlugin;
    default:
      return null;
  }
};

export {
  PackagerPlugins,
  packagerPluginSelector,
  iconsCjsPackagerPlugin,
  iconsFilePackagerPlugin,
  iconsFileIndexPackagerPlugin,
  iconsIndexPackagerPlugin,
  iconsModulePackagerPlugin,
  iconsPackageJsonPackagerPlugin,
  jsonPackagerPlugin,
  packageJsonPackagerPlugin,
  schemaPackagerPlugin,
  scssPackagerPlugin,
  themePackagerPlugin,
};
