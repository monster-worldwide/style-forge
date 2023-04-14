export const metaDataParserResult = {
  'ignored-pages': [],
  'font-fallback': {
    FontName: 'FallbackFont1, FallbackFont2, FallbackFont3',
    'Invalid Path Font Name': '',
  },
};

export const tokenParserResult = {
  'token page/tokens': {
    '$token-link-green': {
      color: '#00ff00',
      fontFamily: 'Arial',
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: '20px',
    },
    '$token-color-vector-red': {
      backgroundColor: '#ff0000',
      height: '10px',
      width: '20px',
    },
    '$token-color-vector-black': {
      backgroundColor: '#000000',
      height: '10px',
      width: '20px',
    },
    '$token-rectangle-blue': {
      backgroundColor: '#0000ff',
      height: '25px',
      width: '50px',
    },
    '$token-rectangle-white': {
      backgroundColor: '#ffffff',
      height: '10px',
      width: '20px',
    },
    '$token-incorrect': {},
  },
  'token page/grid': {
    '$spacing-horizontal/md': {
      backgroundColor: '#ffffff',
      height: '6px',
      width: '8px',
    },
    '$spacing-vertical/md': {
      backgroundColor: '#ffffff',
      height: '10px',
      width: '4px',
    },
    '$grid/md': {
      backgroundColor: '#ffffff',
      width: '20px',
      height: '10px',
    },
  },
};

export const variantParserResult = {
  Component1: {
    'md/circle': {
      rectangle: {
        backgroundColor: '#ffffff',
        height: '10px',
        width: '20px',
      },
      'icon-star': {
        color: '#ffffff',
        fill: '#ffffff',
      },
      'autolayout-parent': {
        alignItems: 'flex-start',
        'autolayout-child': {
          alignSelf: 'stretch',
          flexGrow: 1,
        },
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
      },
      fontFamily: 'Arial',
      fontWeight: 400,
      fontSize: '12px',
      color: '#ffffff',
      lineHeight: '20px',
      ellipse: {},
    },
    'sm/circle': {
      rectangle: {
        backgroundColor: '#ff0000',
        height: '10px',
        width: '20px',
      },
      'icon-star': {
        color: '#ff0000',
        fill: '#ff0000',
      },
      'autolayout-parent': {
        alignItems: 'flex-start',
        'autolayout-child': {
          alignSelf: 'stretch',
          flexGrow: 1,
        },
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
      },
      fontFamily: 'Arial',
      fontWeight: 400,
      fontSize: '12px',
      color: '#ff0000',
      lineHeight: '20px',
      ellipse: {},
    },
    'md/square': {
      rectangle: {
        backgroundColor: '#0000ff',
        height: '10px',
        width: '20px',
      },
      'icon-star': {
        color: '#0000ff',
        fill: '#0000ff',
      },
      'autolayout-parent': {
        alignItems: 'flex-start',
        'autolayout-child': {
          alignSelf: 'stretch',
          flexGrow: 1,
        },
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
      },
      fontFamily: 'Arial',
      fontWeight: 400,
      fontSize: '12px',
      color: '#0000ff',
      lineHeight: '20px',
      ellipse: {},
    },
    'sm/square': {
      rectangle: {
        backgroundColor: '#00ff00',
        height: '10px',
        width: '20px',
      },
      'icon-star': {
        color: '#00ff00',
        fill: '#00ff00',
      },
      'autolayout-parent': {
        alignItems: 'flex-start',
        'autolayout-child': {
          alignSelf: 'stretch',
          flexGrow: 1,
        },
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
      },
      fontFamily: 'Arial',
      fontWeight: 400,
      fontSize: '12px',
      color: '#00ff00',
      lineHeight: '20px',
      ellipse: {},
    },
  },
};

export const postprocessedParserResult = {
  tokenPage: {
    tokens: {
      $tokenRectangleWhite: {
        backgroundColor: '#ffffff',
        width: '20px',
        height: '10px',
      },
      $tokenRectangleBlue: {
        backgroundColor: '#0000ff',
        width: '50px',
        height: '25px',
      },
      $tokenColorVectorRed: {
        backgroundColor: '#ff0000',
        width: '20px',
        height: '10px',
      },
      $tokenColorVectorBlack: {
        backgroundColor: '#000000',
        width: '20px',
        height: '10px',
      },
      $tokenLinkGreen: {
        fontFamily: 'Arial',
        fontWeight: 400,
        fontSize: '12px',
        color: '#00ff00',
        lineHeight: '20px',
      },
      $tokenIncorrect: {},
    },
    grid: {
      $gridMd: {
        backgroundColor: '#ffffff',
        width: '20px',
        height: '10px',
      },
      $spacingHorizontalMd: {
        backgroundColor: '#ffffff',
        width: '8px',
        height: '6px',
      },
      $spacingVerticalMd: {
        backgroundColor: '#ffffff',
        width: '4px',
        height: '10px',
      },
    },
  },
  Component: {
    md: {
      circle: {
        rectangle: {
          backgroundColor: '#ffffff',
          width: '20px',
          height: '10px',
        },
        fontFamily: 'Arial',
        fontWeight: 400,
        fontSize: '12px',
        color: '#ffffff',
        lineHeight: '20px',
        ellipse: {},
        iconStar: { color: '#ffffff', fill: '#ffffff' },
        autolayoutParent: {
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          display: 'flex',
          flexDirection: 'row',
          autolayoutChild: { alignSelf: 'stretch', flexGrow: 1 },
        },
      },
      square: {
        rectangle: {
          backgroundColor: '#0000ff',
          width: '20px',
          height: '10px',
        },
        fontFamily: 'Arial',
        fontWeight: 400,
        fontSize: '12px',
        color: '#0000ff',
        lineHeight: '20px',
        ellipse: {},
        iconStar: { color: '#0000ff', fill: '#0000ff' },
        autolayoutParent: {
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          display: 'flex',
          flexDirection: 'row',
          autolayoutChild: { alignSelf: 'stretch', flexGrow: 1 },
        },
      },
    },
    sm: {
      circle: {
        rectangle: {
          backgroundColor: '#ff0000',
          width: '20px',
          height: '10px',
        },
        fontFamily: 'Arial',
        fontWeight: 400,
        fontSize: '12px',
        color: '#ff0000',
        lineHeight: '20px',
        ellipse: {},
        iconStar: { color: '#ff0000', fill: '#ff0000' },
        autolayoutParent: {
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          display: 'flex',
          flexDirection: 'row',
          autolayoutChild: { alignSelf: 'stretch', flexGrow: 1 },
        },
      },
      square: {
        rectangle: {
          backgroundColor: '#00ff00',
          width: '20px',
          height: '10px',
        },
        fontFamily: 'Arial',
        fontWeight: 400,
        fontSize: '12px',
        color: '#00ff00',
        lineHeight: '20px',
        ellipse: {},
        iconStar: { color: '#00ff00', fill: '#00ff00' },
        autolayoutParent: {
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          display: 'flex',
          flexDirection: 'row',
          autolayoutChild: { alignSelf: 'stretch', flexGrow: 1 },
        },
      },
    },
  },
};

export const schemaParserResult = {
  tokenPage: {
    'grid|tokens': {
      '$gridMd|$spacingHorizontalMd|$spacingVerticalMd|$tokenColorVectorBlack|$tokenColorVectorRed|$tokenIncorrect|$tokenLinkGreen|$tokenRectangleBlue|$tokenRectangleWhite':
        {
          backgroundColor: 'string',
          width: 'string',
          height: 'string',
          fontFamily: 'string',
          fontWeight: 'string',
          fontSize: 'string',
          color: 'string',
          lineHeight: 'string',
        },
    },
  },
  Component: {
    'md|sm': {
      'circle|square': {
        rectangle: {
          backgroundColor: 'string',
          width: 'string',
          height: 'string',
        },
        fontFamily: 'string',
        fontWeight: 'string',
        fontSize: 'string',
        color: 'string',
        lineHeight: 'string',
        ellipse: {},
        iconStar: { color: 'string', fill: 'string' },
        autolayoutParent: {
          alignItems: 'string',
          justifyContent: 'string',
          display: 'string',
          flexDirection: 'string',
          autolayoutChild: { alignSelf: 'string', flexGrow: 'string' },
        },
      },
    },
  },
};
