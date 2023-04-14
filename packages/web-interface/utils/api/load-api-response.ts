import { Api } from 'figma-api';

export const loadApiResponse = async (token: string, key: string) => {
  try {
    const api = new Api({
      personalAccessToken: token,
    });

    const fileData = await api.getFile(key, { branch_data: true });
    return fileData;
  } catch (error) {
    return null;
  }
};
