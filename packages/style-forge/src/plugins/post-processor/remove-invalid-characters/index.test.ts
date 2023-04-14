import { removeInvalidCharactersPostProcessorPlugin } from '.';

describe('Test Remove Invalid Characters PostProcessor Plugin', () => {
  it('produces expected data', () => {
    const result =
      removeInvalidCharactersPostProcessorPlugin().runPostProcessing({
        'test#data1&': { result: 5 },
      });
    expect(result).toEqual({ testData1: { result: 5 } });
  });
});
