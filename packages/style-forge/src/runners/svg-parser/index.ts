import { Api } from '../../types';
import { parser } from './parser';
import { getSvgContent, getSvgUrls } from './url-download';

// TODO: should be changed to plugins
export const svgParser = async (fileKey: string, api: Api) => {
  const file = await api.getFile(fileKey);
  const svgDataObject = parser(file);
  const dataWithUrl = await getSvgUrls(fileKey, api, svgDataObject);
  const filledData = await getSvgContent(dataWithUrl);
  return filledData;
};
