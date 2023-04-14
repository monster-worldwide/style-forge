import { ValidatorPlugin, ThemeParserObject } from '../../types';

export const validator = (
  data: ThemeParserObject,
  plugins: ValidatorPlugin[],
): void => {
  plugins.forEach((plugin) => {
    return plugin.runValidation(data);
  });
};
