import { Api } from 'figma-api';
import { fontFallbackParserPlugin } from '../plugins';
import { metaDataParser } from '../runners/meta-data-parser';

export const getMetaData = async (figmaToken: string, figmaFileKey: string) => {
  const api = new Api({ personalAccessToken: figmaToken });
  const file = await api.getFile(figmaFileKey);
  return await metaDataParser(file, [fontFallbackParserPlugin()]);
};
