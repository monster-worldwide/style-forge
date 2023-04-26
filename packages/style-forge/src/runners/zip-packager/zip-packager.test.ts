import { zipPackager } from './';

jest.mock('archiver', () => () => {
  const data: any[] = [];
  return {
    append: (content: any, meta: any) =>
      data.push({ content, name: meta.name }),
    finalize: () => {},
    getContent: () => data,
  };
});

describe('Test zip packager', () => {
  it('will run plugins', async () => {
    const runFileCreation = jest.fn(() => {
      return [
        { path: 'package.json', content: JSON.stringify({}) },
        { path: 'dist/test.txt', content: 'test' },
      ];
    });
    const plugin = { id: 'test', runFileCreation };
    const archive = zipPackager({ component: 'x' }, [plugin]);
    expect(runFileCreation).toBeCalledTimes(1);
    expect((archive as any).getContent()).toEqual([
      { content: '{}', name: 'package.json' },
      { content: 'test', name: 'dist/test.txt' },
    ]);
  });
});
