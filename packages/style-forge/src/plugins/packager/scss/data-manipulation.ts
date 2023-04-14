import { ThemeParserObject } from '../../../types';
import * as os from 'os';
import {
  colorTokens,
  typographyTokens,
  spacingHorizontalTokens,
  spacingVerticalTokens,
} from './helpers/tokens';

const isObject = (value: unknown) => {
  const type = typeof value;
  return value != null && (type === 'object' || type === 'function');
};

const getTokens = (parsedObject: object) => {
  let tokens = {};
  for (const key of Object.keys(parsedObject)) {
    const child = parsedObject[key];
    if (key.startsWith('$')) {
      tokens[key] = parsedObject[key];
    } else if (isObject(child)) {
      tokens = { ...tokens, ...getTokens(child) };
    }
  }
  return tokens;
};

const getScssValues = (key: string, properties: object) => {
  const lowerKey = key.toLowerCase();
  if (lowerKey.includes('spacing') && lowerKey.includes('horizontal')) {
    return spacingHorizontalTokens(key, properties);
  }
  if (lowerKey.includes('spacing') && lowerKey.includes('vertical')) {
    return spacingVerticalTokens(key, properties);
  }
  if (lowerKey.includes('grid')) {
    return spacingHorizontalTokens(key, properties);
  }
  if (
    lowerKey.includes('color') ||
    lowerKey.includes('shades') ||
    lowerKey.includes('tint')
  ) {
    return colorTokens(key, properties);
  }
  if (
    lowerKey.includes('link') ||
    lowerKey.includes('paragraph') ||
    lowerKey.includes('heading') ||
    lowerKey.includes('field-label')
  ) {
    return typographyTokens(key, properties);
  }
  return [];
};

/**
 * @param parsedObject is the JSON output of the parser
 *
 * This function will retrieve sass tokens from parser output and returns them as a string ready to be exported to .scss file.
 */

export const createScssObject = (parsedObject: ThemeParserObject) => {
  const tokens = getTokens(parsedObject);
  const scssLines = [];

  for (const key of Object.keys(tokens)) {
    const token = tokens[key] as { [key: string]: string | number };
    scssLines.push(...getScssValues(key, token));
  }
  return scssLines.join(os.EOL);
};
