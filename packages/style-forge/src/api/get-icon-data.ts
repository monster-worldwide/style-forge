import { Api } from 'figma-api';
import { svgParser } from '../runners/svg-parser';

export const getIconData = async (figmaToken: string, figmaFileKey: string) => {
  const api = new Api({ personalAccessToken: figmaToken });
  return await svgParser(figmaFileKey, api);
};
