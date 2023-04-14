import { ThemeParserObject } from '../../types';

const isObject = (value: unknown) => {
  const type = typeof value;
  return value != null && (type === 'object' || type === 'function');
};

/**
 * @param parsedData output of the parser
 *
 * This method aims to provide a simplified, abstract schema of the parsed theme.
 * Each component will contain all it's factors merged into one and all parameters will be described by their type - string, number.
 * Example: {buttons: {"small/medium/large": { "primary/secondary/tertiary":{"padding": "string", "margin": "string"}}}}
 * This serves for quick overview of consistency within the schema, and to check whether design changes have some unintended consequences in regards to theme file schema between releases.
 * For better description on how to read schema, detailed documentation is in the confluence.
 */

export const createSchema = (parsedData: ThemeParserObject) => {
  const schema = {};
  for (const componentKey of Object.keys(parsedData)) {
    const component = parsedData[componentKey];
    if (isObject(component)) {
      schema[componentKey] = getObjectSchema(component as ThemeParserObject);
    }
  }
  return schema;
};

/**
 * @param themeObject partial output of the parser
 *
 * Recursive method. Will unify all object children into one field and add non-object properties into the output, then merge all object children's properties into one object so that nothing is missing from schema.
 */

const getObjectSchema = (themeObject: object) => {
  const keysPresent = [] as string[];
  const value = {};
  const extractedProperties = [];
  const simplePropertiesPresent = objectHasSimpleProps(themeObject);
  for (const key of Object.keys(themeObject)) {
    const child = themeObject[key];
    if (isObject(child)) {
      if (simplePropertiesPresent) {
        value[key] = getObjectSchema(child);
      } else {
        keysPresent.push(key);
        extractedProperties.push(getObjectSchema(child));
      }
    } else {
      value[key] = typeof child;
    }
  }
  if (keysPresent.length > 0) {
    value[getKeyFromArray(keysPresent)] = mergeProperties(extractedProperties);
  }

  return value;
};

/**
 * @param extractedProperties an array of extracted properties of children objects
 *
 * Recursive method. Will merge extracted properties from object children into one object, unifying them.
 */

const mergeProperties = (extractedProperties: object[]) => {
  const mergedObject = {};
  let mergedComplexObject = {};
  const mergedComplexKeys = [] as string[];
  for (const propertyObject of extractedProperties) {
    const simplePropertiesPresent = objectHasSimpleProps(propertyObject);
    for (const propertyKey of Object.keys(propertyObject)) {
      const propertyChild = propertyObject[propertyKey];
      if (isObject(propertyChild)) {
        if (simplePropertiesPresent) {
          mergedObject[propertyKey] = mergeProperties([propertyChild]);
        } else {
          mergedComplexKeys.push(...propertyKey.split('|'));
          mergedComplexObject = {
            ...mergedComplexObject,
            ...mergeProperties([propertyChild]),
          };
        }
      } else {
        mergedObject[propertyKey] = typeof propertyChild;
      }
    }
  }
  if (mergedComplexKeys.length > 0) {
    mergedObject[getKeyFromArray(mergedComplexKeys)] = mergedComplexObject;
  }
  return mergedObject;
};

/**
 * @param keyArray an array of strings
 *
 * Will return a string consisting of unique entries in keyArray, joined with a pipe, ordered alphabetically.
 */
const getKeyFromArray = (keyArray: string[]) => {
  return keyArray
    .filter((value, index, array) => array.indexOf(value) === index)
    .sort()
    .join('|');
};

/**
 * @param object a JSON object
 *
 * Will return true if there is at least one non-object property in this object's children.
 */

const objectHasSimpleProps = (object: object) => {
  for (const key of Object.keys(object)) {
    if (!isObject(object[key])) {
      return true;
    }
  }
  return false;
};
