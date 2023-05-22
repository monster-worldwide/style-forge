import { iconData } from '../../../utils';
import { iconsIndexPackagerPlugin } from '.';
import * as os from 'os';

const expectedResult = [
  {
    path: 'dist/index.js',
    content:
      "Object.defineProperty(module.exports, '__esModule', { value: true, configurable: true });" +
      os.EOL +
      "Object.defineProperty(module.exports, 'default', { get: () => switchFunction, enumerable: true, configurable: true });" +
      os.EOL +
      '' +
      os.EOL +
      "Object.defineProperty(module.exports, 'IconTest1', { get: () => IconTest1, enumerable: true, configurable: true });" +
      os.EOL +
      "Object.defineProperty(module.exports, 'IconTest2', { get: () => IconTest2, enumerable: true, configurable: true });" +
      os.EOL +
      "Object.defineProperty(module.exports, 'IconTest3', { get: () => IconTest3, enumerable: true, configurable: true });" +
      os.EOL +
      "const React = require('react');" +
      os.EOL +
      "const { IconTest1 } = require('./icons-cjs/icon-test-1');" +
      os.EOL +
      "const { IconTest2 } = require('./icons-cjs/icon-test-2');" +
      os.EOL +
      "const { IconTest3 } = require('./icons-cjs/icon-test-3');" +
      os.EOL +
      '' +
      os.EOL +
      'const switchFunction = function (name) {' +
      os.EOL +
      '  switch (name) {' +
      os.EOL +
      "    case 'test_1':" +
      os.EOL +
      '      return IconTest1;' +
      os.EOL +
      "    case 'test_2':" +
      os.EOL +
      '      return IconTest2;' +
      os.EOL +
      "    case 'test_3':" +
      os.EOL +
      '      return IconTest3;' +
      os.EOL +
      '    default:' +
      os.EOL +
      '      return React.Fragment;' +
      os.EOL +
      '  }' +
      os.EOL +
      '}' +
      os.EOL,
  },
  {
    path: 'dist/index.modern.js',
    content:
      "import React from 'react';" +
      os.EOL +
      "import { IconTest1 } from './icons-module/icon-test-1';" +
      os.EOL +
      "import { IconTest2 } from './icons-module/icon-test-2';" +
      os.EOL +
      "import { IconTest3 } from './icons-module/icon-test-3';" +
      os.EOL +
      '' +
      os.EOL +
      'export { IconTest1, IconTest2, IconTest3};' +
      os.EOL +
      '' +
      os.EOL +
      'export default function (name) {' +
      os.EOL +
      '  switch (name) {' +
      os.EOL +
      "    case 'test_1':" +
      os.EOL +
      '      return IconTest1;' +
      os.EOL +
      "    case 'test_2':" +
      os.EOL +
      '      return IconTest2;' +
      os.EOL +
      "    case 'test_3':" +
      os.EOL +
      '      return IconTest3;' +
      os.EOL +
      '    default:' +
      os.EOL +
      '      return React.Fragment;' +
      os.EOL +
      '  }' +
      os.EOL +
      '}' +
      os.EOL,
  },
  {
    path: 'dist/index.d.ts',
    content:
      '/// <reference types="react" />' +
      os.EOL +
      "import { FC, SVGAttributes } from 'react';" +
      os.EOL +
      '' +
      os.EOL +
      'export type Icon = FC<SVGAttributes<SVGElement>>;' +
      os.EOL +
      'export const IconTest1: Icon;' +
      os.EOL +
      'export const IconTest2: Icon;' +
      os.EOL +
      'export const IconTest3: Icon;' +
      os.EOL +
      '' +
      os.EOL +
      'export default function getIcon(name: string): Icon;' +
      os.EOL,
  },
];

describe('Test Icons Index Packager Plugin', () => {
  it('produces expected data', () => {
    const result = iconsIndexPackagerPlugin().runFileCreation(iconData);
    expect(result).toEqual(expectedResult);
  });
});
