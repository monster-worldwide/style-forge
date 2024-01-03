# Icons Index Packager Plugin

Is one of [Packager Plugins](../). This plugin will create file definitions for index files and type definitions.

## Workflow

This plugin will get [IconObject](../../dev-dependencies/types) as a parameter and will create a file and type definitions.

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
    path: 'dist/index.js',
    content:
      "Object.defineProperty(module.exports, '__esModule', { value: true, configurable: true });\r\n" +
      "Object.defineProperty(module.exports, 'default', { get: () => switchFunction, enumerable: true, configurable: true });\r\n" +
      '\r\n' +
      "Object.defineProperty(module.exports, 'IconTest1', { get: () => IconTest1, enumerable: true, configurable: true });\r\n" +
      "const React = require('react');\r\n" +
      "const { IconTest1 } = require('./icons-cjs/icon-test-1');\r\n" +
      '\r\n' +
      'const switchFunction = function (name) {\r\n' +
      '  switch (name) {\r\n' +
      "    case 'test_1':\r\n" +
      '      return IconTest1;\r\n' +
      '    default:\r\n' +
      '      return React.Fragment;\r\n' +
      '  }\r\n' +
      '}\r\n',
  },
  {
    path: 'dist/index.modern.js',
    content:
      "import React from 'react';\r\n" +
      "import { IconTest1 } from './icons-module/icon-test-1';\r\n" +
      '\r\n' +
      'export { IconTest1 };\r\n' +
      '\r\n' +
      'export default function (name) {\r\n' +
      '  switch (name) {\r\n' +
      "    case 'test_1':\r\n" +
      '      return IconTest1;\r\n' +
      '    default:\r\n' +
      '      return React.Fragment;\r\n' +
      '  }\r\n' +
      '}\r\n',
  },
  {
    path: 'dist/index.d.ts',
    content:
      '/// <reference types="react" />\r\n' +
      "import { FC, SVGAttributes } from 'react';\r\n" +
      '\r\n' +
      'export type Icon = FC<SVGAttributes<SVGElement>>;\r\n' +
      'export const IconTest1: Icon;\r\n' +
      '\r\n' +
      'export default function getIcon(name: string): Icon;\r\n',
  },
```
