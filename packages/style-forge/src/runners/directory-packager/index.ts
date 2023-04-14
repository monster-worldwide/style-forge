import * as fs from 'fs';
import { IconObject, PackagerPlugin, ThemeParserObject } from '../../types';
import { clearDirectory, writeFile } from './utils';
export const directoryPackager = (
  content: ThemeParserObject | IconObject,
  path: string,
  plugins: PackagerPlugin[],
) => {
  if (!fs.existsSync(path)) {
    throw new Error('Incorrect path!');
  }
  clearDirectory(path);
  plugins.forEach((plugin) => {
    const fileDescriptions = plugin.runFileCreation(content);
    fileDescriptions.forEach((fileDescription) =>
      writeFile(path, fileDescription),
    );
  });
};
