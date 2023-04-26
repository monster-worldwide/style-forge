# Size Parser Plugin

Is one of [Parser Plugins](../). This plugin will parse `width` and `height` property from Figma element.

## Condition

Element must be one of these types `ELLIPSE`, `RECTANGLE` and `VECTOR`. Element must also contain `absoluteBoundingBox` property.

## Workflow

Size plugin will return `width` and `height` properties from `absoluteBoundingBox` element property, if those properties are present. If both properties are present, plugin will return `width: 'Xpx';` and `height: 'Ypx';`.
