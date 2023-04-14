/**
 * Regex to find out and separate alphanumeric words
 */
export const REGEX_WORD =
  /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g;
