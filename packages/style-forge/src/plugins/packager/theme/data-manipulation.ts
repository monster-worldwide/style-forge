import { ThemeParserObject } from '../../../types';
import * as os from 'os';

const isObject = (value: unknown) => {
  const type = typeof value;
  return value != null && (type === 'object' || type === 'function');
};

const tab = (level: number) => {
  let tabString = '';
  for (let i = 0; i < level; i += 1) {
    tabString += '  ';
  }
  return tabString;
};

const formatKey = (key: string) =>
  key.indexOf('-') > 0 || key.indexOf(' ') > 0 ? `'${key}'` : key;

const formatValue = (key: unknown) =>
  typeof key === 'number' ? key : `'${key}'`;

/**
 * @param parsedObject is the JSON output of the parser
 *
 * This function will split an object into an array of child objects and child properties, in order to write first all objects and properties afterwards.
 */
const splitObject = (parsedObject: object) => {
  const objects = [];
  const properties = [];
  for (const key of Object.keys(parsedObject)) {
    const child = parsedObject[key];
    if (isObject(child)) {
      objects.push({ key, value: parsedObject[key] });
    } else {
      properties.push({ key, value: parsedObject[key] });
    }
  }
  return [objects, properties];
};
/**
 * @param parsedObject is the JSON output of the parser
 * @param isMinified specifies whether output should be minified
 * @param level indicates the tab count for this iteration
 *
 * Recursive function. Will return an array of strings obtained for each line in the output file and call itself in case the object has child objects.
 */
const getObjectLines = (
  parsedObject: ThemeParserObject,
  isMinified: boolean,
  level: number,
): string[] => {
  const writeTabs = () => {
    return !isMinified ? tab(level) : '';
  };

  const [objects, properties] = splitObject(parsedObject);
  const lines = [];
  for (const object of objects) {
    if (Object.keys(object.value).length === 0) {
      lines.push(`${writeTabs()}${formatKey(object.key)}: {},`);
      continue;
    }
    lines.push(
      `${writeTabs()}${formatKey(object.key)}: {`,
      ...getObjectLines(
        object.value as ThemeParserObject,
        isMinified,
        level + 1,
      ),
      `${writeTabs()}},`,
    );
  }

  for (const property of properties) {
    lines.push(
      `${writeTabs()}${formatKey(property.key)}: ${formatValue(
        property.value,
      )},`,
    );
  }

  return lines;
};

/**
 * @param parsedObject is the JSON output of the parser
 * @param isMinified specifies whether output should be minified
 *
 * This function will create a linted or minified version of JSON output for TS and JS file export.
 */

export const createTsObject = (
  parsedObject: ThemeParserObject,
  isMinified: boolean,
) => {
  const writeEol = () => {
    return !isMinified ? os.EOL : '';
  };

  const lines = ['{', ...getObjectLines(parsedObject, isMinified, 1), '};'];
  return `export const theme = ${lines.join(writeEol())}${writeEol()}`;
};
