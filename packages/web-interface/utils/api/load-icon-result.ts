import { StyleForgeLite } from '@monsterww/style-forge/dist/lite';

export const loadIconResult = async (token: string, key: string) => {
  try {
    const themeData = await StyleForgeLite.getIconData(token, key);
    return themeData;
  } catch (error) {
    return null;
  }
};
