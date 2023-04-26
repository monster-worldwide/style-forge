import { waitFor } from '@testing-library/react';
import { variantParser } from './';
import { mockFileResult } from '../../utils';

describe('Test variant parser', () => {
  it('will run plugins', () => {
    const runParser = jest.fn(() => {
      return { parserResult: {}, pluginData: {} };
    });
    const plugin = { id: 'test', runParser };
    const runAutolayoutParser = jest.fn(() => {
      return { parserResult: {}, pluginData: { autolayout: { order: 0 } } };
    });
    const autolayoutPlugin = { id: 'test', runParser: runAutolayoutParser };
    let result = {};
    waitFor(async () => {
      result = await variantParser(
        mockFileResult(),
        [plugin, autolayoutPlugin],
        {},
      );
    });
    expect(runParser).toBeCalledTimes(28);
    expect(result).toEqual({});
  });
});
