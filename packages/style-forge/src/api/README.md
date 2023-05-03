# API Contract for Style Forge

Style Forge provides a number of utilities which, if used in correct order, will produce a npm package containing style or icon information from Figma.

## getThemeData

This function will return a theme object from a Figma file.

### Usage

```ts
import { StyleForge } from '@monsterww/style-forge';

const themeData = await StyleForge.getThemeData(figmaToken, figmaFileId)
```

### Parameters

| property | type | description |
| --- | --- | --- |
| figmaToken | string | Figma Personal Access Token, required for accessing Figma API. |
| figmaFileId | string | Figma File ID, required for accessing necessary data from Figma API. |
| config | object | (Optional) Configuration object for Style Forge. This allows user to specify which plugins should be executed and potentially add a new ones. |
| config.variantPlugins | _(string or [ParserPlugin](../plugins/parser))[]_ | List of plugins which will be executed on each variant. Can use pre-build ones or custom. |
| config.tokenPlugins | _(string or [ParserPlugin](../plugins/parser))[]_ | List of plugins which will be executed on each token. Can use pre-build ones or custom. |
| config.postProcessorPlugins | _(string or [PostProcessorPlugin](../plugins/post-processor))[]_ | List of plugins which will be executed during post processing. Can use pre-build ones or custom. **The order of plugins for PostProcessor matters!** |

Default configuration
```ts
{
    variantPlugins: ['autolayout', 'background', 'border', 'box-shadow', 'padding', 'size', 'text', 'variant-icon'],
    tokenPlugins: ['background', 'size', 'text'],
    postProcessorPlugins: ['split-objects', 'flatten', 'remove-invalid-characters'],
}
```

## getThemeSchema

This function will return a theme schema for a given theme data. This is a simplified version of theme data, which contains only information about the structure of the theme, rather than specific value. This is useful for getting a simple version of theme data for comparison purposes.

### Usage

```ts
import { StyleForge } from '@monsterww/style-forge';

const themeData = await StyleForge.getThemeData(figmaToken, figmaFileId);
const themeSchema = StyleForge.getThemeSchema(themeData);
```

### Parameters

| property | type | description |
| --- | --- | --- |
| themeData | ThemeDataObject | The output of getThemeData. |

## getIconData

This function will return an icon object from a Figma file. This object will contain SVG markup for all icons found in the Figma file.

### Usage

```ts
import { StyleForge } from '@monsterww/style-forge';

const iconData = await StyleForge.getIconData(figmaToken, figmaFileId)
```

### Parameters

| property | type | description |
| --- | --- | --- |
| figmaToken | string | Figma Personal Access Token, required for accessing Figma API. |
| figmaFileId | string | Figma File ID, required for accessing necessary data from Figma API. |


## getMetaData

This function will return a metadata object from a Figma file. This object will be used to provide configuration for other functions. This call is used for debugging purposes.

### Usage

```ts
import { StyleForge } from '@monsterww/style-forge';

const metaData = await StyleForge.getMetaData(figmaToken, figmaFileId)
```

### Parameters

| property | type | description |
| --- | --- | --- |
| figmaToken | string | Figma Personal Access Token, required for accessing Figma API. |
| figmaFileId | string | Figma File ID, required for accessing necessary data from Figma API. |

## createIconPackage

This function will create a npm package containing icon information from Figma. This package will contain React objects for each icon, and will be either stored in specified location or returned as archived package via [archiver](https://www.npmjs.com/package/archiver).

### Usage

```ts
import { StyleForge } from '@monsterww/style-forge';

const iconData = await StyleForge.getIconData(figmaToken, figmaFileId);
const iconPackage = await StyleForge.createIconPackage(iconData, {
    outputType: 'directory',
    outputPath: './npm_package',
    packageName: 'my-icons',
    version: '1.0.0',
});
```

### Parameters

| property | type | description |
| --- | --- | --- |
| iconData | IconDataObject | The output of getIconData call. |
| config | object | Configuration for the packager. |
| config.outputType | 'directory' or 'zip' | Specifies whether the package should be stored in a directory or returned as an archive. |
| config.outputPath | string (only for `outputType = directory`) | Specifies the path where the package should be stored. |
| config.packageName | string | Specifies the name of the package. |
| config.version | string | Specifies the version of the package. |

## createThemePackage

This function will create a npm package containing theme information from Figma. This package will contain theme object as well as token information in sass file, and will be either stored in specified location or returned as archived package via [archiver](https://www.npmjs.com/package/archiver).

### Usage

```ts
import { StyleForge } from '@monsterww/style-forge';

const themeData = await StyleForge.getThemeData(figmaToken, figmaFileId);
const themePackage = await StyleForge.createThemePackage(themeData, {
    outputType: 'directory',
    outputPath: './npm_package',
    packageName: 'my-theme',
    version: '1.0.0',
});
```

### Parameters

| property | type | description |
| --- | --- | --- |
| themeData | ThemeDataObject | The output of getThemeData call. |
| config | object | Configuration for the packager. |
| config.outputType | 'directory' or 'zip' | Specifies whether the package should be stored in a directory or returned as an archive. |
| config.outputPath | string (only for `outputType = directory`) | Specifies the path where the package should be stored. |
| config.packageName | string | Specifies the name of the package. |
| config.version | string | Specifies the version of the package. |