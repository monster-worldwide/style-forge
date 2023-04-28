# Parser Plugins

A collection of plugins for [MetaData Parser](../runners/metadata-parser), [Token Parser](../runners/token-parser) and [Variant Parser](../runners/variant-parser).

## Signature

```
type ParserPlugin = {
  id: string;
  runParser: (
    element: Node,
    metaData?: MetaData,
    pluginData?: PluginData,
  ) => { parserResult: object; pluginData: object };
};
```

Plugin data is used when a plugin needs to send additional data for parsing children of current element. This is used in [Autolayout Plugin](./autolayout) for example.

## Usage

Plugins are intended to use in an array as a parameter for any of mentioned parsers.

Those plugins will then be running in parallel to obtain the style information for currently processed element.

## Plugins

- [Autolayout](./autolayout) - will parse properties related to `autolayout` from Figma element.
- [Background](./background) - will parse `backgroundColor` property from Figma element.
- [Border](./border) - will parse `border` and `borderRadius` properties from Figma element.
- [Box Shadow](./box-shadow) - will parse `boxShadow` property from Figma element.
- [Font Fallback](./font-fallback) - will parse `fontFallback` property from Figma element. This plugin is used in MetaData parser only.
- [Padding](./padding) - will parse `padding` property from Figma element.
- [Size](./size) - will parse `width` and `height` properties from Figma element.
- [Text](./text) - will parse font related properties from Figma element.
- [Variant Icon](./variant-icon) - will parse `icon` property from Figma element prefixed with `md-icon/`.
