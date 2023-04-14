import { REGEX_WORD } from '../regex';

/**
 * @param name a string to be adjusted
 * Returns the input string, changed into camel case, e.g icon name => iconName
 */
export const getCamelCase = (name: string) => {
  return name
    .match(REGEX_WORD)
    ?.map((x, index) => {
      const lower = x.toLowerCase();
      return index !== 0
        ? lower.charAt(0).toUpperCase() + lower.substr(1)
        : lower;
    })
    .join('');
};
