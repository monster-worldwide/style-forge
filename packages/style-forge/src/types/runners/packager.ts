export type FileDescription = {
  path: string;
  content: string;
};

type ZipPackageConfiguration = {
  outputType: 'zip';
};
type DirectoryPackageConfiguration = {
  outputType: 'directory';
  outputPath: string;
};

export type PackageConfiguration = (
  | ZipPackageConfiguration
  | DirectoryPackageConfiguration
) & {
  version: string;
  packageName: string;
};
