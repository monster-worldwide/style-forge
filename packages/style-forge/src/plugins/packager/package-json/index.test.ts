import { createPackageJson } from './data-manipulation';

const packageJson = JSON.stringify(
  {
    main: 'theme/theme.ts',
    name: 'test-package',
    version: '0.1.0',
  },
  null,
  2,
);

describe('Test package.json Packager Plugin', () => {
  it('produces expected data', () => {
    const result = createPackageJson('test-package', '0.1.0');
    expect(result).toEqual(packageJson);
  });
});
