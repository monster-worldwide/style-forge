import { flattenPostProcessorPlugin } from '.';

describe('Test PostProcessor Plugin', () => {
  it('produces expected data', () => {
    const result = flattenPostProcessorPlugin().runPostProcessing({
      value: {
        value: {
          test: 'data',
        },
      },
    });
    expect(result).toEqual({
      value: {
        test: 'data',
      },
    });
  });
});
