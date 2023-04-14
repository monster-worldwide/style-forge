import * as os from 'os';

/**
 * @param level numeric representation of indentation
 * Helper function which will return the indentation of line in exported file.
 * Will add two spaces for each level.
 */
const tab = (level: number) => '  '.repeat(level);

/**
 * @param content string content of the line
 * @param tabs indentation before the line
 * Helper function which will add intentation before the content and end-of-line symbol after the content.
 */
export const indentedLine = (content: string, tabs: number = 0) => {
  tabs = tabs >= 0 ? tabs : 0;
  return `${tab(tabs)}${content}${os.EOL}`;
};
