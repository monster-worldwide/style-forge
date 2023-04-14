import { StyleForgeLite } from '@monsterww/style-forge/dist/lite';

export const loadThemeSchema = async (token: string, key: string) => {
  try {
    const themeData = await StyleForgeLite.getThemeData(token, key);
    const themeSchema = StyleForgeLite.getThemeSchema(themeData);
    return themeSchema;
  } catch (error) {
    return null;
  }
};
