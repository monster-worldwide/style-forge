# Empty Names Validator Plugin

Is one of [Validator Plugins](../). This plugin makes sure the output of different runners does not contain objects with empty names.

## Workflow

This plugin will get [ThemeParserObject](../../dev-dependencies/types) as a parameter and will recursively go through all objects in the input, looking for any object with empty or `undefined` name.

If this step fails, an error gets thrown and the same message gets logged into `console.error`.
