# Background Parser Plugin

Is one of [Parser Plugins](../). This plugin will parse `backgroundColor` property from Figma element.

## Condition

Element must be one of these types `ELLIPSE`, `RECTANGLE`, `VECTOR`, `COMPONENT`, `INSTANCE` and `FRAME`. Element must also contain `fills` property.

## Workflow

Background plugin will take the first element in `fills` array. If this element has opacity or alpha value equal to 0, result will be `transparent`. If opacity or alpha value is greater than 0 and less than 1, the result will be in format `rgba(r, g, b, a)`. If opacity or alpha value is equal to 1, the result will be in format `#RRGGBB`.
