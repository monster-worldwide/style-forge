import { iconData } from '../../../utils';
import { iconsIndexPackagerPlugin } from '.';

const expectedResult = [
  {
    path: 'dist/index.js',
    content:
      "Object.defineProperty(module.exports, '__esModule', { value: true, configurable: true });\r\n" +
      "Object.defineProperty(module.exports, 'default', { get: () => switchFunction, enumerable: true, configurable: true });\r\n" +
      '\r\n' +
      "Object.defineProperty(module.exports, 'IconTest1', { get: () => IconTest1, enumerable: true, configurable: true });\r\n" +
      "Object.defineProperty(module.exports, 'IconTest2', { get: () => IconTest2, enumerable: true, configurable: true });\r\n" +
      "Object.defineProperty(module.exports, 'IconTest3', { get: () => IconTest3, enumerable: true, configurable: true });\r\n" +
      "const React = require('react');\r\n" +
      "const { IconTest1 } = require('./icons-cjs/icon-test-1');\r\n" +
      "const { IconTest2 } = require('./icons-cjs/icon-test-2');\r\n" +
      "const { IconTest3 } = require('./icons-cjs/icon-test-3');\r\n" +
      '\r\n' +
      'const switchFunction = function (name) {\r\n' +
      '  switch (name) {\r\n' +
      "    case 'test_1':\r\n" +
      '      return IconTest1;\r\n' +
      "    case 'test_2':\r\n" +
      '      return IconTest2;\r\n' +
      "    case 'test_3':\r\n" +
      '      return IconTest3;\r\n' +
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
      "import { IconTest2 } from './icons-module/icon-test-2';\r\n" +
      "import { IconTest3 } from './icons-module/icon-test-3';\r\n" +
      '\r\n' +
      'export { IconTest1, IconTest2, IconTest3};\r\n' +
      '\r\n' +
      'export default function (name) {\r\n' +
      '  switch (name) {\r\n' +
      "    case 'test_1':\r\n" +
      '      return IconTest1;\r\n' +
      "    case 'test_2':\r\n" +
      '      return IconTest2;\r\n' +
      "    case 'test_3':\r\n" +
      '      return IconTest3;\r\n' +
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
      'export const IconTest2: Icon;\r\n' +
      'export const IconTest3: Icon;\r\n' +
      '\r\n' +
      'export default function getIcon(name: string): Icon;\r\n',
  },
];

describe('Test Icons Index Packager Plugin', () => {
  it('produces expected data', () => {
    const result = iconsIndexPackagerPlugin().runFileCreation(iconData);
    expect(result).toEqual(expectedResult);
  });
});
