import archiver from 'archiver';
import { IconObject, PackagerPlugin, ThemeParserObject } from '../../types';

export const zipPackager = (
  content: ThemeParserObject | IconObject,
  plugins: PackagerPlugin[],
) => {
  const archive = archiver('zip');
  plugins.forEach((plugin) => {
    const fileDescriptions = plugin.runFileCreation(content);
    fileDescriptions.forEach((fileDescription) =>
      archive.append(fileDescription.content, {
        name: fileDescription.path,
      }),
    );
  });
  archive.finalize();
  return archive;
};
