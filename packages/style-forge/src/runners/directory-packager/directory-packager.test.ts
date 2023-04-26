import * as fs from 'fs';
import { directoryPackager } from './';

describe('Test directory packager', () => {
  beforeAll(() => {
    fs.rmSync('./test-folder', { recursive: true, force: true });
  });
  afterAll(() => {
    fs.rmSync('./test-folder', { recursive: true, force: true });
  });
  it('will run plugins', () => {
    const runFileCreation = jest.fn(() => {
      return [
        { path: 'package.json', content: JSON.stringify({}) },
        { path: 'dist/test.txt', content: 'test' },
      ];
    });
    const plugin = { id: 'test', runFileCreation };
    expect(() =>
      directoryPackager({ component: 'x' }, './test-folder', [plugin]),
    ).toThrowError();
    // simulate previously existing content
    fs.mkdirSync('./test-folder');
    fs.writeFileSync('./test-folder/package.json', 'test', { flag: 'w' });
    fs.mkdirSync('./test-folder/dist');
    fs.writeFileSync('./test-folder/dist/test.txt', 'test', { flag: 'w' });
    directoryPackager({ component: 'x' }, './test-folder', [plugin]);
    expect(runFileCreation).toBeCalledTimes(1);
    expect(fs.existsSync('./test-folder/package.json')).toBeTruthy();
    expect(fs.existsSync('./test-folder/dist/test.txt')).toBeTruthy();
  });
});
