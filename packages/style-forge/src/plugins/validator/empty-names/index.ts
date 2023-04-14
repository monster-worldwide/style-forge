import { ValidatorPlugin, ThemeParserObject } from '../../../types';
import { validateEmptyNames } from './validate-empty-names';

export const emptyNamesValidatorPlugin = () => {
  return {
    id: 'empty-names',
    runValidation: (data: ThemeParserObject) => validateEmptyNames(data),
  } as ValidatorPlugin;
};
