import { waitFor } from '@testing-library/react';
import { mockFileResult } from '../../utils';
import { metaDataParser } from './';

describe('Test metadata parser', () => {
  it('will run plugins', () => {
    const runParser = jest.fn(() => {
      return { parserResult: {}, pluginData: {} };
    });
    const plugin = { id: 'test', runParser };
    let result = {};
    waitFor(async () => {
      result = await metaDataParser(mockFileResult(), [plugin]);
    });
    expect(runParser).toBeCalledTimes(4);
    expect(result).toEqual({});
  });
});
