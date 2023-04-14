import { iconData } from '../../../utils';
import { iconsPackageJsonPackagerPlugin } from '.';

const iconsPackageJson = [
  {
    path: 'package.json',
    content: JSON.stringify(
      {
        name: 'test-package',
        version: '0.1.0',
        main: 'dist/index.js',
        module: 'dist/index.modern.js',
        typings: 'dist/index.d.ts',
        sideEffects: false,
        peerDependencies: {
          react: '>=16.8.0',
        },
      },
      null,
      2,
    ),
  },
];

describe('Test icons package.json Packager Plugin', () => {
  it('produces expected data', () => {
    const result =
      iconsPackageJsonPackagerPlugin('test-package').runFileCreation(iconData);
    expect(result).toEqual(iconsPackageJson);
  });
});
