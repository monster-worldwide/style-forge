/**
 * Util to get the fileKey from a Figma url
 * @param url Figma url in the format https://www.figma.com/file/{fileKey}/{...other parts}
 * @returns fileKey parsed from the url
 */

export const parseFileKey = (url: string) => {
  const urlParts = url.split('/');
  let fileInUrl = false;
  for (let i = 0; i < urlParts.length; i++) {
    if (fileInUrl) {
      return urlParts[i];
    }
    if (urlParts[i] === 'file') {
      fileInUrl = true;
    }
  }
  return null;
};
