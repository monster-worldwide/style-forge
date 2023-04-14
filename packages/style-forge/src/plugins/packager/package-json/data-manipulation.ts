const packageJsonTemplate = {
  main: 'theme/theme.ts',
};

export const createPackageJson = (name: string, version: string) => {
  const packageJson = { ...packageJsonTemplate } as { [key: string]: any };
  const themeName = String(name)
    .toLowerCase()
    .split(/[^a-zA-Z\d$]/g)
    .join('-');
  packageJson.name = themeName;
  packageJson.version = version;
  return JSON.stringify(packageJson, null, 2);
};
