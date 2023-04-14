import { themeData } from '../../../utils';
import { themePackagerPlugin } from '.';

const expectedResult = [
  {
    path: 'theme/theme.ts',
    content: `"export const theme = {\\r\\n  button: {\\r\\n    sm: {\\r\\n      primary: {\\r\\n        anotherContent: {},\\r\\n        content: 'test',\\r\\n        'different-key': 'testX',\\r\\n        differentValue: 10,\\r\\n      },\\r\\n    },\\r\\n  },\\r\\n  color: {\\r\\n    $functionalInfo20: {\\r\\n      width: '48px',\\r\\n      height: '48px',\\r\\n      backgroundColor: 'rgba(0, 165, 255, 0.2)',\\r\\n    },\\r\\n    $functionalColor: {\\r\\n      color: '#00a5ff',\\r\\n    },\\r\\n    $functionalShades: {\\r\\n      backgroundColor: 'rgba(242, 177, 39, 0.2)',\\r\\n    },\\r\\n    $functionalTint: {\\r\\n      backgroundColor: '#f2b127',\\r\\n    },\\r\\n  },\\r\\n  tokens: {\\r\\n    $grid24px: {\\r\\n      width: '24px',\\r\\n    },\\r\\n    $spacingVerticalXxl: {\\r\\n      height: '40px',\\r\\n    },\\r\\n    $spacingHorizontalMd: {\\r\\n      width: '16px',\\r\\n    },\\r\\n    $linkMdSemibold: {\\r\\n      fontFamily: 'Proxima Nova, Helvetica, Arial, sans-serif',\\r\\n    },\\r\\n    $paragraphSm: {\\r\\n      fontWeight: 400,\\r\\n    },\\r\\n    $headingMarketingLg: {\\r\\n      fontSize: '32px',\\r\\n    },\\r\\n    $fieldLabelSmBold: {\\r\\n      fontFamily: 'Proxima Nova, Helvetica, Arial, sans-serif',\\r\\n      fontWeight: 700,\\r\\n      fontSize: '14px',\\r\\n      color: '#212121',\\r\\n      lineHeight: '18px',\\r\\n    },\\r\\n  },\\r\\n  weirdComponent: 'testY',\\r\\n};\\r\\n"`,
  },
  {
    path: 'dist/theme.ts',
    content: `"export const theme = {button: {sm: {primary: {anotherContent: {},content: 'test','different-key': 'testX',differentValue: 10,},},},color: {$functionalInfo20: {width: '48px',height: '48px',backgroundColor: 'rgba(0, 165, 255, 0.2)',},$functionalColor: {color: '#00a5ff',},$functionalShades: {backgroundColor: 'rgba(242, 177, 39, 0.2)',},$functionalTint: {backgroundColor: '#f2b127',},},tokens: {$grid24px: {width: '24px',},$spacingVerticalXxl: {height: '40px',},$spacingHorizontalMd: {width: '16px',},$linkMdSemibold: {fontFamily: 'Proxima Nova, Helvetica, Arial, sans-serif',},$paragraphSm: {fontWeight: 400,},$headingMarketingLg: {fontSize: '32px',},$fieldLabelSmBold: {fontFamily: 'Proxima Nova, Helvetica, Arial, sans-serif',fontWeight: 700,fontSize: '14px',color: '#212121',lineHeight: '18px',},},weirdComponent: 'testY',};"`,
  },
];

describe('Test Theme Packager Plugin', () => {
  it('produces expected data', () => {
    const result = themePackagerPlugin().runFileCreation(themeData);
    expect(result).toEqual(expectedResult);
  });
});
