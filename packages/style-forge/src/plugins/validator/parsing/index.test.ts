import { parsingValidatorPlugin } from '.';

describe('Test Parsing Validator Plugin', () => {
  it('will work correctly', () => {
    const obj = {} as any;
    expect(() => {
      parsingValidatorPlugin().runValidation(obj);
    }).not.toThrowError();
  });

  it('will fail to stringify', () => {
    const obj = {} as any;
    obj.a = obj;
    expect(() => {
      parsingValidatorPlugin().runValidation(obj);
    }).toThrowError('Error during theme stringifying.');
  });

  it('will contain different value after JSON validation', () => {
    const obj = {
      func: () => {},
    } as any;
    expect(() => {
      parsingValidatorPlugin().runValidation(obj);
    }).toThrowError(
      'There are differences after stringifying and parsing JSON',
    );
  });
});
