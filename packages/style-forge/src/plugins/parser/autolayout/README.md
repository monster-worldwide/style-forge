# Autolayout Parser Plugin

Is one of [Parser Plugins](../). This plugin will parse properties related to `autolayout` from Figma element.

## Condition

Element must be one of these types `TEXT`, `ELLIPSE`, `RECTANGLE`, `VECTOR`, `COMPONENT`, `INSTANCE` and `FRAME`. Element must also contain `fills` property.

## Workflow

Autolayout plugin is split into two parts, part of this plugin will parse data for the parent element, which is determined by the presence of `layoutMode` property. If `layoutMode` property is present, plugin will return plugin data, which will be then passed to the child elements. It will also return style data:

- `display: 'flex';`
- `flexDirection: 'X';`, where `X` is taken from `layoutMode` property.
- `justifyContent: 'X';`, where `X` is taken from `primaryAxisAlignItems` property.
- `alignItems: 'X';`, where `X` is taken from `counterAxisAlignItems` property.

For the child elements it will return style data:

- `order: 'X';`, where `X` is taken from the index of the element in the `children` array.
- `alignSelf: 'stretch';`, if `layoutAlign` property is present and `layoutAlign` property is equal to `STRETCH`.
- `flexGrow: 'X';`, where `X` is taken from `layoutGrow` property.
- `margin: 'Xpx';`, where `X` is computed based on parent properties `itemSpacing` and `layoutMode` and child property `order`.

Note: Element may be both parent and child element, in which case all values will be returned.
