const packageJsonTemplate = {
  name: '',
  version: '',
  main: 'dist/index.js',
  module: 'dist/index.modern.js',
  typings: 'dist/index.d.ts',
  sideEffects: false,
  peerDependencies: {
    react: '>=16.8.0',
  },
};

export const createPackageJson = (name: string, version: string) => {
  const packageJson = { ...packageJsonTemplate } as { [key: string]: any };
  packageJson.name = name;
  packageJson.version = version;
  return JSON.stringify(packageJson, null, 2);
};
