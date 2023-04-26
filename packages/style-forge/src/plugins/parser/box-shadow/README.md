# Box Shadow Parser Plugin

Is one of [Parser Plugins](../). This plugin will parse `boxShadow` property from Figma element.

## Condition

Element must be one of these types `RECTANGLE` and `VECTOR`. Element must also contain `effects` property.

## Workflow

Box Shadow plugin will return this value:

- `boxShadow: 'Xpx Xpx Xpx XColor';`, where `X` is taken from `effects` property. For `XColor`, if this element has opacity or alpha value equal to 0, result will be `transparent`. If opacity or alpha value is greater than 0 and less than 1, the result will be in format `rgba(r, g, b, a)`. If opacity or alpha value is equal to 1, the result will be in format `#RRGGBB`.
