import { REGEX_WORD } from '../regex';

/**
 * @param name a string to be adjusted
 * Returns the input string, changed into kebab case, e.g icon name => icon-name
 */
export const getKebabCase = (name: string) => {
  return name
    .match(REGEX_WORD)
    ?.map((x) => x.toLowerCase())
    .join('-');
};
