import { emptyNamesValidatorPlugin } from '.';

describe('Test Empty Names Validator Plugin', () => {
  it('will fail for empty names', () => {
    expect(() => {
      emptyNamesValidatorPlugin().runValidation({
        data: { '': { result: 5 } },
      });
    }).toThrowError(
      'There is an empty name present in name of object or attribute',
    );
  });
  it('will succeed with correct names', () => {
    expect(
      emptyNamesValidatorPlugin().runValidation({
        data: { test: { result: 5 } },
      }),
    ).toEqual({
      data: { test: { result: 5 } },
    });
  });
});
