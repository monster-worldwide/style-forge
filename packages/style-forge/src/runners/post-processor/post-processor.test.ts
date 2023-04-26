import { waitFor } from '@testing-library/react';
import { postProcessor } from './';

describe('Test post processor', () => {
  it('will run plugins', () => {
    const runPostProcessing = jest.fn(() => {
      return { parserResult: {}, pluginData: {} };
    });
    const plugin = { id: 'test', runPostProcessing };
    let result = {};
    waitFor(async () => {
      result = await postProcessor({}, [plugin]);
    });
    expect(runPostProcessing).toBeCalledTimes(1);
    expect(result).toEqual({});
  });
});
