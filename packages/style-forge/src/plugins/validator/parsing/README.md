# Parsing Validator Plugin

Is one of [Validator Plugins](../). This plugin makes sure the output of different runners can be stringified and parsed again as JSON.

## Workflow

This plugin will get [ThemeParserObject](../../dev-dependencies/types) as a parameter and will try to run `JSON.stringify` followed by `JSON.parse` on this object, to ensure the output is a valid JSON.

If either of those steps fails, an error gets thrown and the same message gets logged into `console.error`.
