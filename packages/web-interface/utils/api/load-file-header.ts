import { Api } from 'figma-api';
import { parseFileKey } from '../url-parser';

export const loadFileHeader = async (token: string, fileUrl: string) => {
  const fileKey = parseFileKey(fileUrl);
  if (!fileKey) {
    return null;
  }
  try {
    const api = new Api({
      personalAccessToken: token,
    });

    const fileData = await api.getFile(fileKey, { branch_data: true });
    const result = {
      fileKey,
      name: fileData.name,
      branches:
        fileData.branches?.map((branch) => ({
          key: branch.key,
          name: branch.name,
        })) || [],
      selectedBranch: { key: fileKey, name: 'main' },
    };
    return result;
  } catch (error) {
    return null;
  }
};
