# Font Fallback Parser Plugin

Is one of [Parser Plugins](../). This plugin will parse `fontFallback` property from Figma element. This plugin is used in MetaData parser only.

## Condition

Element must be named `.ds-config-font-fallback`.

## Workflow

Font Fallback plugin works on two levels in the element tree in Figma. First level will decide the font family to which this fallback will be applied, the second level will then determine the order of those fallbacks.

Result will then look like this:

```
{
  'font-fallback': {
    'font-family-1': 'fallback-1, fallback-2',
    'font-family-2': 'fallback-3, fallback-4',
  },
}
```
