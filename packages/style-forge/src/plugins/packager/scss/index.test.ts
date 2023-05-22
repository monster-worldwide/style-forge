import { themeData } from '../../../utils';
import { scssPackagerPlugin } from '.';
import * as os from 'os';

const expectedResult = [
  {
    path: 'theme/tokens.scss',
    content: JSON.stringify(
      `$functional-color: #00a5ff;${os.EOL}$functional-shades: rgba(242, 177, 39, 0.2);${os.EOL}$functional-tint: #f2b127;${os.EOL}$grid24px: 24px;${os.EOL}$spacing-vertical-xxl: undefined;${os.EOL}$spacing-horizontal-md: 16px;${os.EOL}$link-md-semibold-font-family: Proxima Nova, Helvetica, Arial, sans-serif;${os.EOL}$paragraph-sm-font-weight: 400;${os.EOL}$heading-marketing-lg-font-size: 32px;`,
      null,
      2,
    ),
  },
];

describe('Test SCSS Packager Plugin', () => {
  it('produces expected data', () => {
    const result = scssPackagerPlugin().runFileCreation(themeData);
    expect(result).toEqual(expectedResult);
  });
});
