import { waitFor } from '@testing-library/react';
import * as Figma from 'figma-api';
import { svgParser } from './';
import { GetImageResult } from 'figma-api/lib/api-types';
import { mockIconFileResult } from '../../utils';

jest.mock('figma-api', () => {
  return {
    ...jest.requireActual('figma-api'),
    Api: () => {
      return {
        getFile: async (_fileKey: string) => {
          return mockIconFileResult();
        },
        getImage: async (
          _fileKey: string,
          opts: { ids: string; scale: number; format: string },
        ) => {
          const idSplit = opts.ids.split(',');
          if (idSplit[0] === 'error') {
            throw Error('jest mock error');
          }
          if (idSplit[0] === 'syntaxerror') {
            // eslint-disable-next-line no-throw-literal
            throw 'jest mock error';
          }
          const images = {} as any;
          idSplit.forEach((x) =>
            x !== '5' ? (images[x] = `urlForImageId:${x}`) : '',
          );
          return {
            images,
          } as GetImageResult;
        },
      };
    },
  };
});

jest.mock('axios', () => ({
  get: (path: string) => {
    const split = path.split(':');
    if (split[1] === 'axioserror') {
      return Promise.reject(new Error('axios mock error'));
    }
    if (split[1] === 'runtimeerror') {
      throw Error('runtime mock error');
    }
    if (split[1] === 'errorliteral') {
      // eslint-disable-next-line no-throw-literal
      throw 'literal error';
    }
    return Promise.resolve({
      data: `<svg id="${split[1]}"></svg>`,
    });
  },
}));

describe('Test variant parser', () => {
  it('will run plugins', async () => {
    const api = new Figma.Api({ personalAccessToken: 'abc' });
    let result = {};
    await waitFor(async () => {
      result = await svgParser('abc', api);
    });
    expect(result).toEqual({
      icon_component_icon_page: {
        callName: 'icon_component_icon_page',
        componentName: 'IconIconComponentIconPage',
        fileName: 'icon-icon-component-icon-page',
        key: '',
        data: '<svg id=""></svg>',
        downloadUrl: 'urlForImageId:',
      },
      next_icon_component_icon_page: {
        callName: 'next_icon_component_icon_page',
        componentName: 'IconNextIconComponentIconPage',
        fileName: 'icon-next-icon-component-icon-page',
        key: '',
        data: '<svg id=""></svg>',
        downloadUrl: 'urlForImageId:',
      },
    });
  });
});
