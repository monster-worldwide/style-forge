import { ThemeParserObject } from '../../../types';
import isEqual from 'lodash/isEqual';

/**
 * @param themeObject output of parser and previous optimisations
 * Will throw an error if there is an issue with stringifying, parsing or there is a difference between original and re-parsed theme.
 */
export const validateParsing = (themeObject: ThemeParserObject): void => {
  let stringData = '';
  let parsedData = {};
  try {
    stringData = JSON.stringify(themeObject);
  } catch {
    console.error('Error during theme stringifying.');
    throw Error('Error during theme stringifying.');
  }

  parsedData = JSON.parse(stringData);

  if (!isEqual(themeObject, parsedData)) {
    console.error('There are differences after stringifying and parsing JSON.');
    throw Error('There are differences after stringifying and parsing JSON');
  }
};
