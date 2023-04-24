import { GetFileResult } from 'figma-api/lib/api-types';
import {
  attachAutolayout,
  createComponent,
  createComponentSet,
  createEllipse,
  createFrame,
  createIcon,
  createNode,
  createRectangle,
  createText,
  createVector,
} from './node';

export const mockIconFileResult = () => {
  const result = {
    name: 'Test',
    version: '',
    lastModified: '',
    thumbnailUrl: '',
    components: {},
    schemaVersion: 0,
    styles: {},
    document: {
      ...createNode('document', 'DOCUMENT'),
      children: [
        createFrame('Icon Page', [
          createComponent('Icon Component', [createVector('icon', 'red')]),
          createFrame('Icon Frame', [
            createComponent('Next Icon Component', [
              createVector('icon', 'blue'),
            ]),
          ]),
        ]),
      ],
    },
  } as GetFileResult;
  return result;
};

export const mockFileResult = () => {
  const result = {
    name: 'Test',
    version: '',
    lastModified: '',
    thumbnailUrl: '',
    components: {},
    schemaVersion: 0,
    styles: {},
    document: {
      ...createNode('document', 'DOCUMENT'),
      children: [
        createEllipse('Page With No Children'),
        ...mockMetaData(),
        ...mockTokens(),
        ...mockVariants(),
      ],
    },
  } as GetFileResult;
  return result;
};
const mockMetaData = () => {
  return [
    createFrame('Configuration Page', [
      createEllipse('Non Children Node'),
      createFrame('.ds-config-ignored-pages'),
      createFrame('.ds-config-font-fallback', [
        createFrame('FontName', [
          createFrame('3-FallbackFont3'),
          createFrame('2-FallbackFont2'),
          createFrame('1-FallbackFont1'),
        ]),
      ]),
    ]),
    createFrame('Invalid Configuration Page', [
      createEllipse('.ds-config-font-fallback'),
      createFrame('.ds-config-font-fallback', [
        createEllipse('Invalid Path Font Name'),
      ]),
    ]),
  ];
};

const mockTokens = () => {
  return [
    createFrame('.ds-ignore-ignored-page', [
      createFrame('Ignored Descendant', [
        createRectangle('$token-not-parsed', 'white', 'no-stroke'),
      ]),
    ]),
    createFrame('Token Page', [
      createEllipse('$Section with no children'),
      createFrame('Tokens', [
        createRectangle('$token-rectangle-white', 'white', 'no-stroke'),
        createRectangle('$token-rectangle-blue', 'blue', 'no-stroke', 50, 25),
        createVector('$token-color-vector-red', 'red'),
        createVector('$token-color-vector-black', 'black'),
        createText('$token-link-green', 'green'),
        createEllipse('Non Token element'),
        createEllipse('$token-incorrect'),
        createFrame('Empty Frame'),
      ]),
      createFrame('Grid', [
        createRectangle('$spacing-horizontal/md', 'white', 'no-stroke', 8, 6),
        createRectangle('$spacing-vertical/md', 'white', 'no-stroke', 4, 10),
        createRectangle('$grid/md', 'white', 'no-stroke'),
      ]),
    ]),
  ];
};

const mockVariants = () => {
  return [
    createFrame('Component Page', [
      createFrame('Component Sub Page', [
        createComponentSet('Component1', [
          createComponent('Size=md, Shape=circle', [
            createRectangle('.ds-pin-rectangle', 'white', 'no-stroke'),
            createIcon('md-icon/star', 'white'),
            attachAutolayout(
              createComponent('.ds-pin-autolayout-parent', [
                attachAutolayout(
                  createEllipse('.ds-pin-autolayout-child'),
                  false,
                ),
              ]),
              true,
            ),
            createText('No pin', 'white'),
            createEllipse('.ds-pin-ellipse'),
          ]),
          createComponent('Size=sm, Shape=circle', [
            createRectangle('.ds-pin-rectangle', 'red', 'no-stroke'),
            createIcon('md-icon/star', 'red'),
            attachAutolayout(
              createComponent('.ds-pin-autolayout-parent', [
                attachAutolayout(
                  createEllipse('.ds-pin-autolayout-child'),
                  false,
                ),
              ]),
              true,
            ),
            createText('No pin', 'red'),
            createEllipse('.ds-pin-ellipse'),
          ]),
          createComponent('Size=md, Shape=square', [
            createRectangle('.ds-pin-rectangle', 'blue', 'no-stroke'),
            createIcon('md-icon/star', 'blue'),
            attachAutolayout(
              createComponent('.ds-pin-autolayout-parent', [
                attachAutolayout(
                  createEllipse('.ds-pin-autolayout-child'),
                  false,
                ),
              ]),
              true,
            ),
            createText('No pin', 'blue'),
            createEllipse('.ds-pin-ellipse'),
          ]),
          createComponent('Size=sm, Shape=square', [
            createRectangle('.ds-pin-rectangle', 'green', 'no-stroke'),
            createIcon('md-icon/star', 'green'),
            attachAutolayout(
              createComponent('.ds-pin-autolayout-parent', [
                attachAutolayout(
                  createEllipse('.ds-pin-autolayout-child'),
                  false,
                ),
              ]),
              true,
            ),
            createText('No pin', 'green'),
            createEllipse('.ds-pin-ellipse'),
          ]),
        ]),
      ]),
    ]),
  ];
};
