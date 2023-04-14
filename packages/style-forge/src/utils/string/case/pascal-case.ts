import { REGEX_WORD } from '../regex';

/**
 * @param name a string to be adjusted
 * Returns the input string, changed into pascal case, e.g icon name => IconName
 */
export const getPascalCase = (name: string) => {
  return name
    .match(REGEX_WORD)
    ?.map((x) => {
      const lower = x.toLowerCase();
      return lower.charAt(0).toUpperCase() + lower.substr(1);
    })
    .join('');
};
