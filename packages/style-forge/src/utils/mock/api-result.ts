export const defaultMetaData = {
  'font-fallback': {
    FontName: 'FallbackFont1, FallbackFont2, FallbackFont3',
    'Invalid Path Font Name': '',
  },
};

export const defaultThemeData = {
  Component: {
    md: {
      circle: {
        autolayoutParent: {
          alignItems: 'flex-start',
          autolayoutChild: {
            alignSelf: 'stretch',
            flexGrow: 1,
          },
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
        },
        color: '#ffffff',
        ellipse: {},
        fontFamily: 'Arial',
        fontSize: '12px',
        fontWeight: 400,
        iconStar: {
          color: '#ffffff',
          fill: '#ffffff',
        },
        lineHeight: '20px',
        rectangle: {
          backgroundColor: '#ffffff',
          height: '10px',
          width: '20px',
        },
      },
      square: {
        autolayoutParent: {
          alignItems: 'flex-start',
          autolayoutChild: {
            alignSelf: 'stretch',
            flexGrow: 1,
          },
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
        },
        color: '#0000ff',
        ellipse: {},
        fontFamily: 'Arial',
        fontSize: '12px',
        fontWeight: 400,
        iconStar: {
          color: '#0000ff',
          fill: '#0000ff',
        },
        lineHeight: '20px',
        rectangle: {
          backgroundColor: '#0000ff',
          height: '10px',
          width: '20px',
        },
      },
    },
    sm: {
      circle: {
        autolayoutParent: {
          alignItems: 'flex-start',
          autolayoutChild: {
            alignSelf: 'stretch',
            flexGrow: 1,
          },
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
        },
        color: '#ff0000',
        ellipse: {},
        fontFamily: 'Arial',
        fontSize: '12px',
        fontWeight: 400,
        iconStar: {
          color: '#ff0000',
          fill: '#ff0000',
        },
        lineHeight: '20px',
        rectangle: {
          backgroundColor: '#ff0000',
          height: '10px',
          width: '20px',
        },
      },
      square: {
        autolayoutParent: {
          alignItems: 'flex-start',
          autolayoutChild: {
            alignSelf: 'stretch',
            flexGrow: 1,
          },
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
        },
        color: '#00ff00',
        ellipse: {},
        fontFamily: 'Arial',
        fontSize: '12px',
        fontWeight: 400,
        iconStar: {
          color: '#00ff00',
          fill: '#00ff00',
        },
        lineHeight: '20px',
        rectangle: {
          backgroundColor: '#00ff00',
          height: '10px',
          width: '20px',
        },
      },
    },
  },
  tokenPage: {
    grid: {
      $gridMd: {
        backgroundColor: '#ffffff',
        height: '10px',
        width: '20px',
      },
      $spacingHorizontalMd: {
        backgroundColor: '#ffffff',
        height: '6px',
        width: '8px',
      },
      $spacingVerticalMd: {
        backgroundColor: '#ffffff',
        height: '10px',
        width: '4px',
      },
    },
    tokens: {
      $tokenColorVectorBlack: {
        backgroundColor: '#000000',
        height: '10px',
        width: '20px',
      },
      $tokenColorVectorRed: {
        backgroundColor: '#ff0000',
        height: '10px',
        width: '20px',
      },
      $tokenIncorrect: {},
      $tokenLinkGreen: {
        color: '#00ff00',
        fontFamily: 'Arial',
        fontSize: '12px',
        fontWeight: 400,
        lineHeight: '20px',
      },
      $tokenRectangleBlue: {
        backgroundColor: '#0000ff',
        height: '25px',
        width: '50px',
      },
      $tokenRectangleWhite: {
        backgroundColor: '#ffffff',
        height: '10px',
        width: '20px',
      },
    },
  },
};

export const defaultThemeSchema = {
  Component: {
    'md|sm': {
      'circle|square': {
        autolayoutParent: {
          alignItems: 'string',
          autolayoutChild: {
            alignSelf: 'string',
            flexGrow: 'string',
          },
          display: 'string',
          flexDirection: 'string',
          justifyContent: 'string',
        },
        color: 'string',
        ellipse: {},
        fontFamily: 'string',
        fontSize: 'string',
        fontWeight: 'string',
        iconStar: {
          color: 'string',
          fill: 'string',
        },
        lineHeight: 'string',
        rectangle: {
          backgroundColor: 'string',
          height: 'string',
          width: 'string',
        },
      },
    },
  },
  tokenPage: {
    'grid|tokens': {
      '$gridMd|$spacingHorizontalMd|$spacingVerticalMd|$tokenColorVectorBlack|$tokenColorVectorRed|$tokenIncorrect|$tokenLinkGreen|$tokenRectangleBlue|$tokenRectangleWhite':
        {
          backgroundColor: 'string',
          color: 'string',
          fontFamily: 'string',
          fontSize: 'string',
          fontWeight: 'string',
          height: 'string',
          lineHeight: 'string',
          width: 'string',
        },
    },
  },
};

export const defaultIconData = {
  icon_component_icon_page: {
    callName: 'icon_component_icon_page',
    componentName: 'IconIconComponentIconPage',
    data: '<svg id=""></svg>',
    downloadUrl: 'urlForImageId:',
    fileName: 'icon-icon-component-icon-page',
    key: '',
  },
  next_icon_component_icon_page: {
    callName: 'next_icon_component_icon_page',
    componentName: 'IconNextIconComponentIconPage',
    data: '<svg id=""></svg>',
    downloadUrl: 'urlForImageId:',
    fileName: 'icon-next-icon-component-icon-page',
    key: '',
  },
};
