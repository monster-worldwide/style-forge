import { splitObjectsPostProcessorPlugin } from '.';

describe('Test Split Objects PostProcessor Plugin', () => {
  it('produces expected data', () => {
    const result = splitObjectsPostProcessorPlugin().runPostProcessing({
      'test/data': { result: 5 },
    });
    expect(result).toEqual({ test: { data: { result: 5 } } });
  });
});
