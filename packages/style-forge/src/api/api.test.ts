import * as fs from 'fs';
import {
  createIconPackage,
  createThemePackage,
  getIconData,
  getMetaData,
  getThemeData,
  getThemeSchema,
} from './';
import { mockFileResult, mockIconFileResult } from '../utils';
import { GetImageResult } from 'figma-api/lib/api-types';
import {
  defaultIconData,
  defaultMetaData,
  defaultThemeData,
  defaultThemeSchema,
} from '../utils/mock/api-result';

jest.mock('figma-api', () => {
  return {
    ...jest.requireActual('figma-api'),
    Api: () => {
      return {
        getFile: async (fileKey: string) => {
          if (fileKey === 'theme') {
            return mockFileResult();
          }
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

jest.mock('archiver', () => () => {
  const data: any[] = [];
  return {
    append: (content: any, meta: any) =>
      data.push({ content, name: meta.name }),
    finalize: () => {},
    getContent: () => data,
  };
});

global.fetch = jest.fn((path: string) => {
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
    text: () => Promise.resolve(`<svg id="${split[1]}"></svg>`),
  });
});

describe('Test api contract', () => {
  beforeEach(() => {
    if (fs.existsSync('./test-folder')) {
      fs.rmSync('./test-folder', { recursive: true, force: true });
    }
    fs.mkdirSync('./test-folder');
  });
  afterEach(() => {
    fs.rmSync('./test-folder', { recursive: true, force: true });
  });
  it('will get metadata', async () => {
    const metaData = await getMetaData('token', 'theme');
    expect(metaData).toEqual(defaultMetaData);
  });
  it('will get theme', async () => {
    const themeData = await getThemeData('token', 'theme');
    expect(themeData).toEqual(defaultThemeData);
  });
  it('will get schema', async () => {
    const themeData = await getThemeData('token', 'theme');
    const schema = getThemeSchema(themeData);
    expect(schema).toEqual(defaultThemeSchema);
  });
  it('will get icon data', async () => {
    const iconData = await getIconData('token', 'icon');
    expect(iconData).toEqual(defaultIconData);
  });
  it('will write theme data', async () => {
    const themeData = await getThemeData('token', 'theme');
    createThemePackage(themeData, {
      outputPath: './test-folder',
      outputType: 'directory',
      packageName: 'test',
      version: '0.1.0',
    });
    expect(fs.existsSync('./test-folder/package.json')).toBeTruthy();
    expect(fs.existsSync('./test-folder/theme/theme.json')).toBeTruthy();
    expect(fs.existsSync('./test-folder/theme/schema.json')).toBeTruthy();
    expect(fs.existsSync('./test-folder/theme/theme.ts')).toBeTruthy();
    expect(fs.existsSync('./test-folder/dist/theme.ts')).toBeTruthy();
    expect(fs.existsSync('./test-folder/theme/tokens.scss')).toBeTruthy();
  });
  it('will zip theme data', async () => {
    const themeData = await getThemeData('token', 'theme');
    const archive = createThemePackage(themeData, {
      outputType: 'zip',
      packageName: 'test',
      version: '0.1.0',
    });
    expect((archive as any).getContent().length).toEqual(6);
  });
  it('will write icon data', async () => {
    const iconData = await getIconData('token', 'icon');
    createIconPackage(iconData, {
      outputPath: './test-folder',
      outputType: 'directory',
      packageName: 'test',
      version: '0.1.0',
    });
    expect(fs.existsSync('./test-folder/package.json')).toBeTruthy();
    expect(fs.existsSync('./test-folder/dist/index.js')).toBeTruthy();
    expect(fs.existsSync('./test-folder/dist/index.modern.js')).toBeTruthy();
    expect(fs.existsSync('./test-folder/dist/index.d.ts')).toBeTruthy();
    expect(
      fs.existsSync(
        './test-folder/dist/icons-cjs/icon-icon-component-icon-page.js',
      ),
    ).toBeTruthy();
    expect(
      fs.existsSync(
        './test-folder/dist/icons-cjs/icon-next-icon-component-icon-page.js',
      ),
    ).toBeTruthy();
    expect(
      fs.existsSync(
        './test-folder/dist/icons-module/icon-icon-component-icon-page.js',
      ),
    ).toBeTruthy();
    expect(
      fs.existsSync(
        './test-folder/dist/icons-module/icon-next-icon-component-icon-page.js',
      ),
    ).toBeTruthy();
  });
  it('will zip icon data', async () => {
    const iconData = await getIconData('token', 'icon');
    const archive = createIconPackage(iconData, {
      outputType: 'zip',
      packageName: 'test',
      version: '0.1.0',
    });
    expect((archive as any).getContent().length).toEqual(8);
  });
});
