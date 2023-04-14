# Schema Packager Plugin

Is one of [Packager Plugins](../). This plugin will create file definition schema.json - a simplified schema of a theme, which will give a quick overview of the structure of theme, enabling change comparisons between different versions.

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
=> schema would be

{
    component: {
        "primary|secondary":{
            color: 'string'
        }
    }
}

=> plugin output would be
{
    path: 'theme/schema.json',
    content:
      "{\r\n" +
      "  "component": {,\r\n" +
      "    "primary|secondary": {,\r\n" +
      "      "color": "string",\r\n" +
      "    },\r\n" +
      "  },\r\n" +
      "}\r\n",
}
```
