import { themeData } from '../../../utils';
import { jsonPackagerPlugin } from '.';

const expectedResult = [
  {
    path: 'theme/theme.json',
    content:
      '{\n' +
      '  "button": {\n' +
      '    "sm": {\n' +
      '      "primary": {\n' +
      '        "content": "test",\n' +
      '        "anotherContent": {},\n' +
      '        "different-key": "testX",\n' +
      '        "differentValue": 10\n' +
      '      }\n' +
      '    }\n' +
      '  },\n' +
      '  "weirdComponent": "testY",\n' +
      '  "color": {\n' +
      '    "$functionalInfo20": {\n' +
      '      "width": "48px",\n' +
      '      "height": "48px",\n' +
      '      "backgroundColor": "rgba(0, 165, 255, 0.2)"\n' +
      '    },\n' +
      '    "$functionalColor": {\n' +
      '      "color": "#00a5ff"\n' +
      '    },\n' +
      '    "$functionalShades": {\n' +
      '      "backgroundColor": "rgba(242, 177, 39, 0.2)"\n' +
      '    },\n' +
      '    "$functionalTint": {\n' +
      '      "backgroundColor": "#f2b127"\n' +
      '    }\n' +
      '  },\n' +
      '  "tokens": {\n' +
      '    "$grid24px": {\n' +
      '      "width": "24px"\n' +
      '    },\n' +
      '    "$spacingVerticalXxl": {\n' +
      '      "height": "40px"\n' +
      '    },\n' +
      '    "$spacingHorizontalMd": {\n' +
      '      "width": "16px"\n' +
      '    },\n' +
      '    "$linkMdSemibold": {\n' +
      '      "fontFamily": "Proxima Nova, Helvetica, Arial, sans-serif"\n' +
      '    },\n' +
      '    "$paragraphSm": {\n' +
      '      "fontWeight": 400\n' +
      '    },\n' +
      '    "$headingMarketingLg": {\n' +
      '      "fontSize": "32px"\n' +
      '    },\n' +
      '    "$fieldLabelSmBold": {\n' +
      '      "fontFamily": "Proxima Nova, Helvetica, Arial, sans-serif",\n' +
      '      "fontWeight": 700,\n' +
      '      "fontSize": "14px",\n' +
      '      "color": "#212121",\n' +
      '      "lineHeight": "18px"\n' +
      '    }\n' +
      '  }\n' +
      '}',
  },
];

describe('Test JSON Packager Plugin', () => {
  it('produces expected data', () => {
    const result = jsonPackagerPlugin().runFileCreation(themeData);
    expect(result).toEqual(expectedResult);
  });
});
