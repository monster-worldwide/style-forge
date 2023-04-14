import { FileDescription } from '../../types';
import * as fs from 'fs';
import * as Path from 'path';

export const clearDirectory = (basePath: string) => {
  const dirContent = fs.readdirSync(basePath);
  dirContent.forEach((localPath) => {
    const path = Path.join(basePath, localPath);
    const stats = fs.lstatSync(path);
    if (stats.isFile()) {
      fs.rmSync(path);
    }
    if (stats.isDirectory()) {
      clearDirectory(path);
      fs.rmdirSync(path);
    }
  });
};

export const writeFile = (
  basePath: string,
  fileDescription: FileDescription,
) => {
  fs.mkdirSync(Path.dirname(Path.join(basePath, fileDescription.path)), {
    recursive: true,
  });
  fs.writeFileSync(
    Path.join(basePath, fileDescription.path),
    fileDescription.content,
  );
};
