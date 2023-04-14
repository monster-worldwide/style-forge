import { iconData } from '../../../utils';
import { iconsCjsPackagerPlugin } from '.';

const iconCjsResult = [
  {
    path: 'dist/icons-cjs/icon-test-1.js',
    content:
      "Object.defineProperty(module.exports, '__esModule', { value: true, configurable: true });\r\n" +
      "Object.defineProperty(module.exports, 'IconTest1', { get: () => IconTest1, enumerable: true, configurable: true });\r\n" +
      "const React = require('react');\r\n" +
      '\r\n' +
      '\r\n' +
      'const IconTest1 = React.forwardRef(function (_ref, ref) {\r\n' +
      '  const params = {};\r\n' +
      '  for (const key of Object.keys(_ref)) {\r\n' +
      '    params[key] = _ref[key];\r\n' +
      '  }\r\n' +
      '  params.ref = ref;\r\n' +
      "  params.viewBox = '0 0 24 24';\r\n" +
      "  params.xmlns = 'http://www.w3.org/2000/svg';\r\n" +
      "  params.fill = 'black';\r\n" +
      '  return /* #__PURE__ */ React.createElement(\r\n' +
      "    'svg',\r\n" +
      '    params,\r\n' +
      "    /* #__PURE__ */ React.createElement('path', {\r\n" +
      "      'd': 'M12.9375 20V6.396L17.2965 10.711C17.6895 11.1 18.3225 11.096 18.7105 10.703C19.0995 10.312 19.0955 9.677 18.7045 9.289L12.6415 3.289C12.4535 3.103 12.1985 2.999 11.9325 3C11.6665 3.001 11.4135 3.108 11.2265 3.297L5.28949 9.297C5.09649 9.491 5.00049 9.746 5.00049 10C5.00049 10.258 5.09949 10.516 5.29649 10.711C5.68949 11.1 6.32249 11.096 6.71049 10.703L10.9375 6.432V20C10.9375 20.553 11.3855 21 11.9375 21C12.4905 21 12.9375 20.553 12.9375 20Z',\r\n" +
      '    }),\r\n' +
      '  );\r\n' +
      '});\r\n' +
      "IconTest1.displayName = 'IconTest1';\r\n",
  },
  {
    path: 'dist/icons-cjs/icon-test-2.js',
    content:
      "Object.defineProperty(module.exports, '__esModule', { value: true, configurable: true });\r\n" +
      "Object.defineProperty(module.exports, 'IconTest2', { get: () => IconTest2, enumerable: true, configurable: true });\r\n" +
      "const React = require('react');\r\n" +
      '\r\n' +
      '\r\n' +
      'const IconTest2 = React.forwardRef(function (_ref, ref) {\r\n' +
      '  const params = {};\r\n' +
      '  for (const key of Object.keys(_ref)) {\r\n' +
      '    params[key] = _ref[key];\r\n' +
      '  }\r\n' +
      '  params.ref = ref;\r\n' +
      '  return /* #__PURE__ */ React.createElement(\r\n' +
      "    'svg',\r\n" +
      '    params,\r\n' +
      "    /* #__PURE__ */ React.createElement('g', {\r\n" +
      "      'clipPath': 'url(#clip0_8102_4924)',\r\n" +
      '    },\r\n' +
      "      /* #__PURE__ */ React.createElement('path', {\r\n" +
      "        'd': 'M0 0H30V20H0V0Z',\r\n" +
      "        'fill': 'white',\r\n" +
      '      }),\r\n' +
      "      /* #__PURE__ */ React.createElement('path', {\r\n" +
      "        'd': 'M0 0H30V1.53801H0V0ZM0 3.07602H30V4.61404H0V3.07602ZM0 6.15205H30V7.69006H0V6.15205ZM0 9.22807H30V10.7661H0V9.22807ZM0 12.3099H30V13.848H0V12.3099ZM0 15.386H30V16.924H0V15.386ZM0 18.462H30V20H0V18.462Z',\r\n" +
      "        'fill': '#D80027',\r\n" +
      '      }),\r\n' +
      "      /* #__PURE__ */ React.createElement('path', {\r\n" +
      "        'd': 'M0 0H15V10.7661H0V0Z',\r\n" +
      "        'fill': '#2E52B2',\r\n" +
      '      }),\r\n' +
      "      /* #__PURE__ */ React.createElement('path', {\r\n" +
      "        'd': 'M2.79532 8.12282L2.56141 7.37428L2.3041 8.12282H1.53217L2.1579 8.57312L1.92398 9.32165L2.56141 8.85967L3.18129 9.32165L2.94152 8.57312L3.57895 8.12282H2.79532ZM6.08772 8.12282L5.84796 7.37428L5.60234 8.12282H4.83041L5.45614 8.57312L5.22223 9.32165L5.84796 8.85967L6.47954 9.32165L6.24562 8.57312L6.87135 8.12282H6.08772ZM9.39182 8.12282L9.14036 7.37428L8.90644 8.12282H8.11696L8.76024 8.57312L8.51462 9.32165L9.14036 8.85967L9.78363 9.32165L9.53802 8.57312L10.1637 8.12282H9.39182ZM12.6784 8.12282L12.4445 7.37428L12.1988 8.12282H11.4211L12.0526 8.57312L11.8187 9.32165L12.4445 8.85967L13.076 9.32165L12.8246 8.57312L13.4678 8.12282H12.6784ZM5.84796 4.40352L5.60234 5.15206H4.83041L5.45614 5.61405L5.22223 6.35089L5.84796 5.89475L6.47954 6.35089L6.24562 5.61405L6.87135 5.15206H6.08772L5.84796 4.40352ZM2.56141 4.40352L2.3041 5.15206H1.53217L2.1579 5.61405L1.92398 6.35089L2.56141 5.89475L3.18129 6.35089L2.94152 5.61405L3.57895 5.15206H2.79532L2.56141 4.40352ZM9.14036 4.40352L8.90644 5.15206H8.11696L8.76024 5.61405L8.51462 6.35089L9.14036 5.89475L9.78363 6.35089L9.53802 5.61405L10.1637 5.15206H9.39182L9.14036 4.40352ZM12.4445 4.40352L12.1988 5.15206H11.4211L12.0526 5.61405L11.8187 6.35089L12.4445 5.89475L13.076 6.35089L12.8246 5.61405L13.4678 5.15206H12.6784L12.4445 4.40352ZM2.56141 1.44446L2.3041 2.1813H1.53217L2.1579 2.64329L1.92398 3.38598L2.56141 2.92399L3.18129 3.38598L2.94152 2.64329L3.57895 2.1813H2.79532L2.56141 1.44446ZM5.84796 1.44446L5.60234 2.1813H4.83041L5.45614 2.64329L5.22223 3.38598L5.84796 2.92399L6.47954 3.38598L6.24562 2.64329L6.87135 2.1813H6.08772L5.84796 1.44446ZM9.14036 1.44446L8.90644 2.1813H8.11696L8.76024 2.64329L8.51462 3.38598L9.14036 2.92399L9.78363 3.38598L9.53802 2.64329L10.1637 2.1813H9.39182L9.14036 1.44446ZM12.4445 1.44446L12.1988 2.1813H11.4211L12.0526 2.64329L11.8187 3.38598L12.4445 2.92399L13.076 3.38598L12.8246 2.64329L13.4678 2.1813H12.6784L12.4445 1.44446Z',\r\n" +
      "        'fill': 'white',\r\n" +
      '      }),\r\n' +
      '    ),\r\n' +
      "    /* #__PURE__ */ React.createElement('defs', {\r\n" +
      '    },\r\n' +
      "      /* #__PURE__ */ React.createElement('clipPath', {\r\n" +
      "        'id': 'clip0_8102_4924',\r\n" +
      '      },\r\n' +
      "        /* #__PURE__ */ React.createElement('rect', {\r\n" +
      "          'width': '30',\r\n" +
      "          'height': '20',\r\n" +
      "          'fill': 'white',\r\n" +
      '        }),\r\n' +
      '      ),\r\n' +
      '    ),\r\n' +
      '  );\r\n' +
      '});\r\n' +
      "IconTest2.displayName = 'IconTest2';\r\n",
  },
];

describe('Test Icon CJS  Packager Plugin', () => {
  it('produces expected data', () => {
    const result = iconsCjsPackagerPlugin().runFileCreation(iconData);
    expect(result).toEqual(iconCjsResult);
  });
});
