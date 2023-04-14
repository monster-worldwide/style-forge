/**
 *
 * @param name a string to be adjusted
 * Returns the input string with parsed variant properties, e.g Size=md,Shape=oval => md/oval
 */
export const getComponentName = (name: string) => {
  return name
    .toLowerCase()
    .split(',')
    .map((property: string) => property.split('=')[1])
    .join('/');
};
