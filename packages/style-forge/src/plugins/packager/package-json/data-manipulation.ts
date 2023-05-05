const packageJsonTemplate = {
  main: 'theme/theme.ts',
};

export const createPackageJson = (name: string, version: string) => {
  const packageJson = { ...packageJsonTemplate } as { [key: string]: any };
  packageJson.name = name;
  packageJson.version = version;
  return JSON.stringify(packageJson, null, 2);
};
