import { StyleForgeLite } from '@monsterww/style-forge/dist/lite';

export const loadThemeResult = async (token: string, key: string) => {
  try {
    const themeData = await StyleForgeLite.getThemeData(token, key);
    return themeData;
  } catch (error) {
    return null;
  }
};
