import { Api, IconObject } from '../../types';
import { BATCH_SIZE } from './const';
import axios from 'axios';

/**
 *
 * @param fileKey a unique key to define which file we're accessing
 * @param api a Figma API object to help us call the getImage method
 * @param iconData an object containing multiple objects, one for each icon
 * This method will call api.getImage to get the download url for each icon. It will then store this url in the icon object.
 * For optimization purposes it works in a batches, so that we will be able to process all icons efficiently while not risking too large of a data set causing issues with GET request.
 */
export const getSvgUrls = async (
  fileKey: string,
  api: Api,
  iconData: IconObject,
) => {
  let index = 0;
  try {
    while (index < Object.keys(iconData).length) {
      const iconKeys = Object.keys(iconData).slice(index, index + BATCH_SIZE);
      const figmaIconUrls = await api.getImage(fileKey, {
        ids: iconKeys.map((x) => iconData[x].key).join(','),
        scale: 1,
        format: 'svg',
      });
      for (const iconKey of iconKeys) {
        const key = String(iconData[iconKey].key);
        const url = figmaIconUrls.images[key];
        if (!url) continue;
        iconData[iconKey].downloadUrl = url;
      }
      index += BATCH_SIZE;
    }
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(`Exception during icon url download: ${e.message}`);
    }
  }
  return iconData;
};

/**
 * @param iconData an object containing multiple objects, one for each icon
 * This method will call, in parallel, all download urls to get the svg values for each icon, and store them inside the icon object.
 */
export const getSvgContent = async (iconData: IconObject) => {
  let index = 0;
  try {
    while (index < Object.keys(iconData).length) {
      const promises = [];
      for (const iconKey of Object.keys(iconData).slice(
        index,
        index + BATCH_SIZE,
      )) {
        const { downloadUrl } = iconData[iconKey];
        promises.push(
          axios
            .get(downloadUrl)
            .then((result) => result.data)
            .then((result) => (iconData[iconKey].data = result))
            .catch((error) =>
              console.log(
                `Could not download an icon from ${downloadUrl}: ${error.message}`,
              ),
            ),
        );
      }
      await Promise.all(promises);
      index += BATCH_SIZE;
    }
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(`Exception during icon svg download: ${e.message}`);
    }
  }
  return iconData;
};
