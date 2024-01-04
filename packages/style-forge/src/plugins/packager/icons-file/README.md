# Icons File Packager Plugin

Is one of [Packager Plugins](../). This plugin will create file definitions for each icon as react component source code.

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
        "import React from 'react';\r\n" +
        '\r\n' +
        'export const IconTest1 = (props) => {' +
        '\r\n' +
        `  return <svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' fill='black' {...props}>` +
        `    <path d='M12.9375 20V6.396L17.2965 10.711C17.6895 11.1 18.3225 11.096 18.7105 10.703C19.0995 10.312 19.0955 9.677 18.7045 9.289L12.6415 3.289C12.4535 3.103 12.1985 2.999 11.9325 3C11.6665 3.001 11.4135 3.108 11.2265 3.297L5.28949 9.297C5.09649 9.491 5.00049 9.746 5.00049 10C5.00049 10.258 5.09949 10.516 5.29649 10.711C5.68949 11.1 6.32249 11.096 6.71049 10.703L10.9375 6.432V20C10.9375 20.553 11.3855 21 11.9375 21C12.4905 21 12.9375 20.553 12.9375 20Z' />` +
        '  </svg>' +
        '\r\n' +
      '};' +
}
```
