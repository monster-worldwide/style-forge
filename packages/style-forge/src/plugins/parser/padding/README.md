# Padding Parser Plugin

Is one of [Parser Plugins](../). This plugin will parse `padding` property from Figma element.

## Condition

Element must be one of these types `COMPONENT`, `INSTANCE` and `FRAME`. Element must also at least one of `paddingLeft`, `paddingRight`, `paddingTop` or `paddingBottom` properties.

## Workflow

Padding plugin will return one of these values:

- `padding: 'Xpx';`, if all four paddings are equal.
- `padding: 'Xpx Xpx';`, if `paddingLeft` and `paddingRight` are equal and `paddingTop` and `paddingBottom` are equal.
- `padding: 'Xpx Xpx Xpx';`, if `paddingLeft` and `paddingRight` are equal and `paddingTop` and `paddingBottom` are not equal.
- `padding: 'Xpx Xpx Xpx Xpx';`, if `paddingLeft`, `paddingRight`, `paddingTop` and `paddingBottom` are not equal.
