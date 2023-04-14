import { ThemeParserObject } from '../../../types';
import isObject from 'lodash/isObject';

const capitalizeFirstLetter = (key: string) => {
  return key ? key[0].toUpperCase() + key.slice(1) : key;
};

/**
 * @param themeObject output of parser and previous optimisations
 * Recursive function. Will change name of any object that contains disallowed character into camelCase, removing those characters in the process.
 */
export const removeJSONInvalidCharacters = (
  themeObject: ThemeParserObject,
): ThemeParserObject => {
  const updatedThemeObject = { ...themeObject };
  for (const key of Object.keys(updatedThemeObject)) {
    const newKey = key
      .split(/[^a-zA-Z\d$]/g)
      .map((keySplit: string, index: number) =>
        index > 0
          ? capitalizeFirstLetter(keySplit)
          : keySplit.split(/\d+/).join(''),
      )
      .join('');

    if (newKey !== key) {
      updatedThemeObject[newKey] = {} as ThemeParserObject;
      for (const childKey of Object.keys(updatedThemeObject[key])) {
        const child = (updatedThemeObject[key] as ThemeParserObject)[childKey];
        (updatedThemeObject[newKey] as ThemeParserObject)[childKey] = child;
      }
      delete updatedThemeObject[key];
    }
  }

  for (const key of Object.keys(updatedThemeObject)) {
    const child = updatedThemeObject[key];
    if (isObject(child)) {
      updatedThemeObject[key] = removeJSONInvalidCharacters(child);
    }
  }
  return updatedThemeObject;
};
