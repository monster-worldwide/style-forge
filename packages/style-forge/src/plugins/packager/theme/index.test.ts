import { themeData } from '../../../utils';
import { themePackagerPlugin } from '.';
import * as os from 'os';

const expectedResult = [
  {
    path: 'theme/theme.ts',
    content: `export const theme = {${os.EOL}  button: {${os.EOL}    sm: {${os.EOL}      primary: {${os.EOL}        anotherContent: {},${os.EOL}        content: 'test',${os.EOL}        'different-key': 'testX',${os.EOL}        differentValue: 10,${os.EOL}      },${os.EOL}    },${os.EOL}  },${os.EOL}  color: {${os.EOL}    $functionalInfo20: {${os.EOL}      width: '48px',${os.EOL}      height: '48px',${os.EOL}      backgroundColor: 'rgba(0, 165, 255, 0.2)',${os.EOL}    },${os.EOL}    $functionalColor: {${os.EOL}      color: '#00a5ff',${os.EOL}    },${os.EOL}    $functionalShades: {${os.EOL}      backgroundColor: 'rgba(242, 177, 39, 0.2)',${os.EOL}    },${os.EOL}    $functionalTint: {${os.EOL}      backgroundColor: '#f2b127',${os.EOL}    },${os.EOL}  },${os.EOL}  tokens: {${os.EOL}    $grid24px: {${os.EOL}      width: '24px',${os.EOL}    },${os.EOL}    $spacingVerticalXxl: {${os.EOL}      height: '40px',${os.EOL}    },${os.EOL}    $spacingHorizontalMd: {${os.EOL}      width: '16px',${os.EOL}    },${os.EOL}    $linkMdSemibold: {${os.EOL}      fontFamily: 'Proxima Nova, Helvetica, Arial, sans-serif',${os.EOL}    },${os.EOL}    $paragraphSm: {${os.EOL}      fontWeight: 400,${os.EOL}    },${os.EOL}    $headingMarketingLg: {${os.EOL}      fontSize: '32px',${os.EOL}    },${os.EOL}    $fieldLabelSmBold: {${os.EOL}      fontFamily: 'Proxima Nova, Helvetica, Arial, sans-serif',${os.EOL}      fontWeight: 700,${os.EOL}      fontSize: '14px',${os.EOL}      color: '#212121',${os.EOL}      lineHeight: '18px',${os.EOL}    },${os.EOL}  },${os.EOL}  weirdComponent: 'testY',${os.EOL}};${os.EOL}`,
  },
  {
    path: 'dist/theme.ts',
    content: `export const theme = {button: {sm: {primary: {anotherContent: {},content: 'test','different-key': 'testX',differentValue: 10,},},},color: {$functionalInfo20: {width: '48px',height: '48px',backgroundColor: 'rgba(0, 165, 255, 0.2)',},$functionalColor: {color: '#00a5ff',},$functionalShades: {backgroundColor: 'rgba(242, 177, 39, 0.2)',},$functionalTint: {backgroundColor: '#f2b127',},},tokens: {$grid24px: {width: '24px',},$spacingVerticalXxl: {height: '40px',},$spacingHorizontalMd: {width: '16px',},$linkMdSemibold: {fontFamily: 'Proxima Nova, Helvetica, Arial, sans-serif',},$paragraphSm: {fontWeight: 400,},$headingMarketingLg: {fontSize: '32px',},$fieldLabelSmBold: {fontFamily: 'Proxima Nova, Helvetica, Arial, sans-serif',fontWeight: 700,fontSize: '14px',color: '#212121',lineHeight: '18px',},},weirdComponent: 'testY',};`,
  },
];

describe('Test Theme Packager Plugin', () => {
  it('produces expected data', () => {
    const result = themePackagerPlugin().runFileCreation(themeData);
    expect(result).toEqual(expectedResult);
  });
});
