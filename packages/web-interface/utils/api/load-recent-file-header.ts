import { Api } from 'figma-api';

export const loadRecentFileHeader = async (token: string, key: string) => {
  try {
    const api = new Api({
      personalAccessToken: token,
    });

    const fileData = await api.getFile(key, { branch_data: true });
    const result = {
      fileKey: key,
      name: fileData.name,
      branches:
        fileData.branches?.map((branch) => ({
          key: branch.key,
          name: branch.name,
        })) || [],
      selectedBranch: { key, name: 'main' },
    };
    return result;
  } catch (error) {
    return null;
  }
};
