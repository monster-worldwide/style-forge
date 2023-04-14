import { ThemeParserObject } from '../../../types';
import isObject from 'lodash/isObject';
import set from 'lodash/set';

/**
 * @param themeObject output of parser and previous optimisations
 * Recursive function. Will split any object name containing / into multiple objects, like {"a/b": {}} => {a: {b: {}}}. Does not affect tokens.
 */
export const splitSlashObject = (
  themeObject: ThemeParserObject,
): ThemeParserObject => {
  let updatedThemeObject = { ...themeObject };
  const keys = Object.keys(updatedThemeObject).filter(
    (key) => !key.startsWith('$'),
  );
  for (const key of keys) {
    const path = key.split('/').map((key) => key.trim());
    const themeChildObject = updatedThemeObject[key];
    delete updatedThemeObject[key];
    updatedThemeObject = set(updatedThemeObject, path, themeChildObject);
  }
  for (const key of Object.keys(updatedThemeObject)) {
    const child = updatedThemeObject[key];
    if (isObject(child)) {
      updatedThemeObject[key] = splitSlashObject(child);
    }
  }
  return updatedThemeObject;
};
