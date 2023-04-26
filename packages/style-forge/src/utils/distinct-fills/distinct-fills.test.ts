import { getDistinctFills } from './';

describe('Test distinct-fills util', () => {
  it('will fail gracefully', () => {
    const singleFill = getDistinctFills(null);
    expect(singleFill).toEqual([]);
  });
});
