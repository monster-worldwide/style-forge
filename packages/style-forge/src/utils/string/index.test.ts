import {
  getCamelCase,
  getComponentName,
  getKebabCase,
  getPascalCase,
  getSnakeCase,
  indentedLine,
} from './';
import * as os from 'os';

describe('Test string util', () => {
  it('will get camel case', () => {
    expect(getCamelCase('test data')).toEqual('testData');
  });

  it('will get kebab case', () => {
    expect(getKebabCase('test data')).toEqual('test-data');
  });

  it('will get pascal case', () => {
    expect(getPascalCase('test data')).toEqual('TestData');
  });

  it('will get snake case', () => {
    expect(getSnakeCase('test data')).toEqual('test_data');
  });

  it('will get component name', () => {
    expect(getComponentName('Property=test,Property=data')).toEqual(
      'test/data',
    );
  });

  it('will get indented line', () => {
    expect(indentedLine('test data', 2)).toEqual(`    test data${os.EOL}`);
    expect(indentedLine('test data')).toEqual(`test data${os.EOL}`);
    expect(indentedLine('test data', -1)).toEqual(`test data${os.EOL}`);
  });
});
