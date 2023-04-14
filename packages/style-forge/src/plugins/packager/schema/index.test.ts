import { themeData } from '../../../utils';
import { schemaPackagerPlugin } from '.';

const expectedResult = [
  {
    path: 'theme/schema.json',
    content:
      '{\n' +
      '  "button": {\n' +
      '    "sm": {\n' +
      '      "primary": {\n' +
      '        "content": "string",\n' +
      '        "anotherContent": {},\n' +
      '        "different-key": "string",\n' +
      '        "differentValue": "string"\n' +
      '      }\n' +
      '    }\n' +
      '  },\n' +
      '  "color": {\n' +
      '    "$functionalColor|$functionalInfo20|$functionalShades|$functionalTint": {\n' +
      '      "width": "string",\n' +
      '      "height": "string",\n' +
      '      "backgroundColor": "string",\n' +
      '      "color": "string"\n' +
      '    }\n' +
      '  },\n' +
      '  "tokens": {\n' +
      '    "$fieldLabelSmBold|$grid24px|$headingMarketingLg|$linkMdSemibold|$paragraphSm|$spacingHorizontalMd|$spacingVerticalXxl": {\n' +
      '      "width": "string",\n' +
      '      "height": "string",\n' +
      '      "fontFamily": "string",\n' +
      '      "fontWeight": "string",\n' +
      '      "fontSize": "string",\n' +
      '      "color": "string",\n' +
      '      "lineHeight": "string"\n' +
      '    }\n' +
      '  }\n' +
      '}',
  },
];

describe('Test Schema Packager Plugin', () => {
  it('produces expected data', () => {
    const result = schemaPackagerPlugin().runFileCreation(themeData);
    expect(result).toEqual(expectedResult);
  });
});
