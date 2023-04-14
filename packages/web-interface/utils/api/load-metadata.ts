import { StyleForgeLite } from '@monsterww/style-forge/dist/lite';

export const loadMetadata = async (token: string, key: string) => {
  try {
    const themeData = await StyleForgeLite.getMetaData(token, key);
    return themeData;
  } catch (error) {
    return null;
  }
};
