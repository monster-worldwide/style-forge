import { iconData } from '../../../utils';
import { iconsFileIndexPackagerPlugin } from '.';
import * as os from 'os';

const expectedResult = [
  {
    path: 'src/index.js',
    content:
      "export { IconTest1 } from './icons/icon-test-1';" +
      os.EOL +
      "export { IconTest2 } from './icons/icon-test-2';" +
      os.EOL +
      "export { IconTest3 } from './icons/icon-test-3';" +
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
      os.EOL,
  },
];

describe('Test Icons Index Packager Plugin', () => {
  it('produces expected data', () => {
    const result = iconsFileIndexPackagerPlugin().runFileCreation(iconData);
    expect(result).toEqual(expectedResult);
  });
});
