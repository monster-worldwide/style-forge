# Icons Module Packager Plugin

Is one of [Packager Plugins](../). This plugin will create file definitions for each icon as module js.

## Workflow

This plugin will get [IconObject](../../dev-dependencies/types) as a parameter and will create a file definition for each icon represented in this object.

```
{
    'test 1': {
        callName: 'test_1',
        componentName: `IconTest1`,
        fileName: `icon-test-1`,
        key: 'abcd-efgh',
        data: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="XYZ" fill="black"/>
        </svg>
        `,
        downloadUrl: 'https://url',
    },
}

=>

{
    path: 'dist/icons-module/icon-test-1.js',
    content:
        "import React, { forwardRef } from 'react';\r\n" +
        '\r\n' +
        '\r\n' +
        'export const IconTest1 = forwardRef(function (_ref, ref) {\r\n' +
        '  const params = {};\r\n' +
        '  for (const key of Object.keys(_ref)) {\r\n' +
        '    params[key] = _ref[key];\r\n' +
        '  }\r\n' +
        '  params.ref = ref;\r\n' +
        "  params.viewBox = '0 0 24 24';\r\n" +
        "  params.xmlns = 'http://www.w3.org/2000/svg';\r\n" +
        "  params.fill = 'black';\r\n" +
        '  return /* #__PURE__ */ React.createElement(\r\n' +
        "    'svg',\r\n" +
        '    params,\r\n' +
        "    /* #__PURE__ */ React.createElement('path', {\r\n" +
        "      'd': 'XYZ',\r\n" +
        '    }),\r\n' +
        '  );\r\n' +
        '});\r\n' +
        "IconTest1.displayName = 'IconTest1';\r\n",
}
```
