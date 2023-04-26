import { waitFor } from '@testing-library/react';
import { tokenParser } from './';
import { mockFileResult } from '../../utils';

describe('Test token parser', () => {
  it('will run plugins', () => {
    const runParser = jest.fn(() => {
      return { parserResult: {}, pluginData: {} };
    });
    const plugin = { id: 'test', runParser };
    let result = {};
    waitFor(async () => {
      result = await tokenParser(mockFileResult(), [plugin], {});
    });
    expect(runParser).toBeCalledTimes(9);
    expect(result).toEqual({});
  });
});
