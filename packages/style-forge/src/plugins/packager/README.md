# Packager Plugins

A collection of plugins for [Directory Packager](../runners/directory-packager) and [Zip Packager](../runners/zip-packager).

## Signature

```
type PackagerPlugin = {
  id: string;
  runFileCreation: (data: ThemeParserObject | IconObject) => FileDescription[];
};

type FileDescription = {
  path: string;
  content: string;
};
```

## Usage

Plugins are intended to use in an array as a parameter for a packager.

Those plugins will then be running in sequence to make changes the output of other runners, creating file definitions which are then packaged using selected packager.

```
import { xPackagerPlugin } from '@monsterww/x-plugin-packager';
import { zipPackager } from '@monsterww/zip-packager';

zipPackager(dataToPackage, [xPackagerPlugin()]);

```

## Plugins

- [Icons Cjs](./icons-cjs) - will create file definitions for each icon in commonjs
- [Icons Index](./icons-index) - will create file definitons for index files and type definitions for icons
- [Icons Module](./icons-module) - will create file definitons for each icon as module
- [Icons Package Json](./icons-package-json) - will create file definiton for package.json for icons
- [Json](./json) - will create file definiton with theme as a json file
- [Package Json](./package-json) - will create file definiton for package.json for theme
- [Schema](./schema) - will create file definiton for schema of a theme
- [Scss](./scss) - will create file definiton for scss file containing tokens
- [Theme](./theme) - will create file definitons for theme.ts, normal and minified
