# Border Parser Plugin

Is one of [Parser Plugins](../). This plugin will parse `border` and `borderRadius` properties from Figma element.

## Condition

Element must be one of these types `ELLIPSE`, `RECTANGLE`, `VECTOR`, `COMPONENT`, `INSTANCE` and `FRAME`. Element must also contain `strokes` and `strokeWeight` properties.

## Workflow

Border plugin will return these values:

- `border: 'Xpx solid XColor';`, where `X` is taken from `strokeWeight` property and `XColor` is taken from the first element in `strokes` array. If this element has opacity or alpha value equal to 0, result will be `transparent`. If opacity or alpha value is greater than 0 and less than 1, the result will be in format `rgba(r, g, b, a)`. If opacity or alpha value is equal to 1, the result will be in format `#RRGGBB`.
- `borderRadius: 'Xpx';`, where `X` is taken from either `rectangleCornerRadii` or `cornerRadius` property.
