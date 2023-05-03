# Variant Icon Parser Plugin

Is one of [Parser Plugins](../). This plugin will parse `icon` property from Figma element.

## Condition

Element must be prefixed with `md-icon/`.

## Workflow

Variant Icon plugin will return these values:

- `width: 'Xpx';` - if `absoluteBoundingBox.width` exists within this element or any of its children.
- `height: 'Xpx';` - if `absoluteBoundingBox.height` exists within this element or any of its children.
- `color: 'X';` and `fill: 'X';` - if `fills` property exists within this element or any of its children. This will take the first element in `fills` array. If this element has opacity or alpha value equal to 0, result will be `transparent`. If opacity or alpha value is greater than 0 and less than 1, the result will be in format `rgba(r, g, b, a)`. If opacity or alpha value is equal to 1, the result will be in format `#RRGGBB`.
