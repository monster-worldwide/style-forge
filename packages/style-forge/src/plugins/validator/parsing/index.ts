import { ValidatorPlugin, ThemeParserObject } from '../../../types';
import { validateParsing } from './validate-parsing';

export const parsingValidatorPlugin = () => {
  return {
    id: 'parsing',
    runValidation: (data: ThemeParserObject) => validateParsing(data),
  } as ValidatorPlugin;
};
