# Icons Package Json Packager Plugin

Is one of [Packager Plugins](../). This plugin will create file definition for package.json for icons.

## Workflow

This plugin will get `name` and `version` parameters when initiated, using those will then create a package.json definition.

```
{
    path: 'package.json',
    content:
      "{\r\n" +
      "  "name": "icon-package",\r\n" +
      "  "version": "0.1.0",\r\n" +
      "  "main": "dist/index.js",\r\n" +
      "  "module": "dist/index.modern.js",\r\n" +
      "  "typings": "dist/index.d.ts",\r\n" +
      "  "sideEffects": false,\r\n" +
      "  "peerDependencies": {,\r\n" +
      "    "react": ">=16.8.0",\r\n" +
      "  }\r\n" +
      "}\r\n",
}
```
