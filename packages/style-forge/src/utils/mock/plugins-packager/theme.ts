import { ThemeParserObject } from '../../../types';

export const themeData: ThemeParserObject = {
  button: {
    sm: {
      primary: {
        content: 'test',
        anotherContent: {},
        'different-key': 'testX',
        differentValue: 10,
      },
    },
  },
  weirdComponent: 'testY',
  color: {
    $functionalInfo20: {
      width: '48px',
      height: '48px',
      backgroundColor: 'rgba(0, 165, 255, 0.2)',
    },
    $functionalColor: {
      color: '#00a5ff',
    },
    $functionalShades: {
      backgroundColor: 'rgba(242, 177, 39, 0.2)',
    },
    $functionalTint: {
      backgroundColor: '#f2b127',
    },
  },
  tokens: {
    $grid24px: {
      width: '24px',
    },
    $spacingVerticalXxl: {
      height: '40px',
    },
    $spacingHorizontalMd: {
      width: '16px',
    },
    $linkMdSemibold: {
      fontFamily: 'Proxima Nova, Helvetica, Arial, sans-serif',
    },
    $paragraphSm: {
      fontWeight: 400,
    },
    $headingMarketingLg: {
      fontSize: '32px',
    },
    $fieldLabelSmBold: {
      fontFamily: 'Proxima Nova, Helvetica, Arial, sans-serif',
      fontWeight: 700,
      fontSize: '14px',
      color: '#212121',
      lineHeight: '18px',
    },
  },
};
