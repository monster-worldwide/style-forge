import { waitFor } from '@testing-library/react';
import { validator } from './';

describe('Test variant parser', () => {
  it('will run plugins', () => {
    const runValidation = jest.fn(() => {
      return { parserResult: {}, pluginData: {} };
    });
    const plugin = { id: 'test', runValidation };
    waitFor(async () => {
      await validator({}, [plugin]);
    });
    expect(runValidation).toBeCalledTimes(1);
  });
});
