import { ThemeParserObject } from '../../../types';
import isObject from 'lodash/isObject';

/**
 * @param themeObject output of parser and previous optimisations
 * @param parentKey key of the parent node
 *
 * Recursive function. Will remove objects that has only one child with the same name. It will go in depth-first variant, in case there are multiple objects with the same name.
 */
export const flattenDuplicates = (
  themeObject: ThemeParserObject,
  parentKey: string,
): ThemeParserObject => {
  const updatedThemeObject = { ...themeObject };
  for (const key of Object.keys(updatedThemeObject)) {
    const child = updatedThemeObject[key];
    if (isObject(child)) {
      updatedThemeObject[key] = flattenDuplicates(child, key);
    }
  }
  const parent = updatedThemeObject[parentKey];
  if (isObject(parent)) {
    for (const childKey of Object.keys(parent)) {
      updatedThemeObject[childKey] = parent[childKey];
    }
    delete updatedThemeObject[parentKey];
  }

  return updatedThemeObject;
};
