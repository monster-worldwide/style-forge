import { REGEX_WORD } from '../regex';

/**
 *
 * @param name a string to be adjusted
 * Returns the input string changed into snake case, e.g icon name => icon_name
 */
export const getSnakeCase = (name: string) => {
  return String(
    name
      .match(REGEX_WORD)
      ?.map((x) => x.toLowerCase())
      .join('_'),
  );
};
