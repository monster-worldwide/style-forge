# Json Packager Plugin

Is one of [Packager Plugins](../). This plugin will create file definition theme.json - a complete json output of theme, ready for non-javascript application usage.

## Workflow

This plugin will get [ThemeParserObject](../../dev-dependencies/types) as a parameter and will create a file and type definition.

```
{
    component: {
        primary: {
            color: 'red',
        },
        secondary: {
            color: 'green',
        },
    },
}
,
{
    path: 'theme/theme.json',
    content:
      "{\r\n" +
      "  "component": {,\r\n" +
      "    "primary": {,\r\n" +
      "      "color": "red",\r\n" +
      "    },\r\n" +
      "    "secondary": {,\r\n" +
      "      "color": "green",\r\n" +
      "    },\r\n" +
      "  },\r\n" +
      "}\r\n",
}
```
