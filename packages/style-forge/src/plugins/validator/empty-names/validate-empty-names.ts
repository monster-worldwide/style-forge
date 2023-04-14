import { ThemeParserObject } from '../../../types';
import isObject from 'lodash/isObject';

/**
 * @param themeObject output of parser and previous optimisations
 * Recursive function. Will throw error if there are attributes and objects with empty names.
 */
export const validateEmptyNames = (themeObject: ThemeParserObject) => {
  const updatedThemeObject = { ...themeObject };
  for (const key of Object.keys(updatedThemeObject)) {
    const child = updatedThemeObject[key];
    if (key === '' || key === undefined) {
      console.error(
        'There is an empty name present in name of object or attribute',
      );
      throw Error(
        'There is an empty name present in name of object or attribute',
      );
    } else if (isObject(child)) {
      updatedThemeObject[key] = validateEmptyNames(child);
    }
  }
  return updatedThemeObject;
};
