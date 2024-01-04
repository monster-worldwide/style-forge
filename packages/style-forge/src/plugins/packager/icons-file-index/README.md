# Icons File Index Packager Plugin

Is one of [Packager Plugins](../). This plugin will create file definitions for index files and type definitions for [Icons File Packager Plugin](../icons-file/).

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
    path: 'src/index.js',
    content:
      "export { IconTest1 } from './icons/icon-test-1';"
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
