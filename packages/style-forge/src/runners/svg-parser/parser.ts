import {
  isTraversable,
  TraversableNode,
  Node,
  IconObject,
  GetFileResult,
} from '../../types';
import {
  IGNORE_PREFIX,
  getKebabCase,
  getPascalCase,
  getSnakeCase,
} from '../../utils';

// This whole file depends on Figma API https://www.figma.com/developers/api

/**
 * @param configuration a configuration settings for parser
 * @param file a Figma File object obtained from an API
 * This function will call a page parser function for each child in file.document and return data obtained by parsing.
 */
export const parser = (file: GetFileResult) => {
  return file.document.children
    .filter((childElement) => !childElement.name.startsWith(IGNORE_PREFIX))
    .map((page) => {
      return isTraversable(page) ? { ...childParser(page, page.name) } : {};
    })
    .reduce(
      (accumulated: IconObject, current: IconObject) => ({
        ...accumulated,
        ...current,
      }),
      {},
    );
};

/**
 * @param configuration a configuration settings for parser
 * @param element a Figma object
 * Recursive function. This function will call a componentSetParser function for each COMPONENT_SET child in element.children and return data obtained by parsing.
 * For each element which is not COMPONENT_SET, it will call itself again, trying to find all COMPONENT_SET elements.
 */
const childParser = (
  element: TraversableNode,
  pageName: string,
): IconObject => {
  return element.children
    ?.filter((childElement) => !childElement.name.startsWith(IGNORE_PREFIX))
    .map((childElement) => {
      if (childElement.type === 'COMPONENT') {
        return extractIconData(childElement as Node<'COMPONENT'>, pageName);
      } else {
        return isTraversable(childElement)
          ? { ...childParser(childElement, pageName) }
          : {};
      }
    })
    .reduce(
      (accumulated: IconObject, current: IconObject) => ({
        ...accumulated,
        ...current,
      }),
      {},
    );
};

/**
 * @param element a Figma Frame element
 * @param pageName name of current page
 * This method will extract useful information about icon component.
 */
const extractIconData = (element: Node<'COMPONENT'>, pageName: string) => {
  const combinedName = `${element.name}/${pageName}`;
  const callName = getSnakeCase(combinedName);
  return {
    [callName]: {
      callName: callName,
      componentName: `Icon${getPascalCase(combinedName)}`,
      fileName: `icon-${getKebabCase(combinedName)}`,
      key: element.id,
      data: '',
      downloadUrl: '',
    },
  };
};
