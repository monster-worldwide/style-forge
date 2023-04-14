import { ThemeParserObject } from '../types';
import { createSchema } from '../utils';

export const getThemeSchema = (themeData: ThemeParserObject) => {
  return createSchema(themeData);
};
