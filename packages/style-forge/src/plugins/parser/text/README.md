# Text Parser Plugin

Is one of [Parser Plugins](../). This plugin will parse all font related properties from Figma element.

## Condition

Element must be of type `TEXT`.

## Workflow

Text parser will return these values, if relevant data is present:

- `fontFamily` - will be obtained by joining `element.style.fontFamily` with fallback fonts from Metadata Parser
- `fontWeight` - will be obtained from `element.style.fontWeight`
- `fontSize` - will be obtained from `element.style.fontSize`, result will be in format `Xpx`
- `lineHeight` - will be obtained from `element.style.lineHeightPx`, result will be in format `Xpx`
- `color` - will be obtained from `element.style.fills[0].color`, result will be in format `rgba(r, g, b, a)` for opacity or alpha value less than 1, or in format `#RRGGBB` for opacity or alpha value equal to 1
- `textTransform` - will be obtained from `element.style.textCase`
- `textDecoration` - will be obtained from `element.style.textDecoration`
