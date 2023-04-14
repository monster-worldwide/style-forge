import { themeData } from '../../../utils';
import { scssPackagerPlugin } from '.';

const expectedResult = [
  {
    path: 'theme/tokens.scss',
    content:
      '"$functional-color: #00a5ff;\\r\\n$functional-shades: rgba(242, 177, 39, 0.2);\\r\\n$functional-tint: #f2b127;\\r\\n$grid24px: 24px;\\r\\n$spacing-vertical-xxl: undefined;\\r\\n$spacing-horizontal-md: 16px;\\r\\n$link-md-semibold-font-family: Proxima Nova, Helvetica, Arial, sans-serif;\\r\\n$paragraph-sm-font-weight: 400;\\r\\n$heading-marketing-lg-font-size: 32px;"',
  },
];

describe('Test SCSS Packager Plugin', () => {
  it('produces expected data', () => {
    const result = scssPackagerPlugin().runFileCreation(themeData);
    expect(result).toEqual(expectedResult);
  });
});
