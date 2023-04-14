import { IGNORE_PREFIX } from '../../utils';
import {
  isNodeWithChildren,
  MetaData,
  Node,
  ParserPlugin,
  ThemeParserObject,
  GetFileResult,
} from '../../types';

const childContainsToken = (element: Node) =>
  isNodeWithChildren(element) &&
  !!element.children?.find((child) => child.name.startsWith('$'));

// This whole file depends on Figma API https://www.figma.com/developers/api

/**
 * @param file a Figma File object obtained from an API
 * This function will call a page parser function for each child in file.document and return token data obtained by parsing.
 */
export const tokenParser = async (
  file: GetFileResult,
  plugins: ParserPlugin[],
  metaData: MetaData,
): Promise<ThemeParserObject> => {
  return file.document.children
    .filter((childElement) => !childElement.name.startsWith(IGNORE_PREFIX))
    .map((page) => {
      return { ...tokenChildParser(metaData, page.name, page, plugins) };
    })
    .reduce(
      (accumulated: ThemeParserObject, current: ThemeParserObject) => ({
        ...accumulated,
        ...current,
      }),
      {},
    );
};

/**
 * @param path a path to current element
 * @param element a Figma object
 * Recursive function. Will create an object for children which contain tokens and save token data into it, will call itself on a child if the child does not contain tokens.
 */
const tokenChildParser = (
  metaData: MetaData,
  path: string,
  element: Node,
  plugins: ParserPlugin[],
): ThemeParserObject => {
  return isNodeWithChildren(element)
    ? element.children
        .filter((childElement) => !childElement.name.startsWith(IGNORE_PREFIX))
        .reduce((carry: ThemeParserObject, childElement: Node) => {
          const newPath = `${path}/${childElement.name}`;
          if (childContainsToken(childElement)) {
            carry[newPath.toLowerCase()] = tokenWalker(
              metaData,
              newPath,
              childElement,
              plugins,
            );
            return carry;
          } else {
            return {
              ...carry,
              ...tokenChildParser(metaData, newPath, childElement, plugins),
            };
          }
        }, {})
    : {};
};

/**
 * @param path a path to current element
 * @param element a Figma object
 * Recursive function. This function will call tokenElementParser for every child that is a token, will call tokenChildParser otherwise.
 */
const tokenWalker = (
  metaData: MetaData,
  path: string,
  element: Node,
  plugins: ParserPlugin[],
): ThemeParserObject => {
  return isNodeWithChildren(element)
    ? element.children
        .filter((child) => child.visible !== false)
        .reduce((carry: ThemeParserObject, child) => {
          if (child.name.startsWith('$')) {
            const { allParserResult } = plugins.reduce(
              (childCarry, plugin) => {
                const { parserResult, pluginData } = plugin.runParser(
                  child,
                  metaData,
                );
                return {
                  allParserResult: {
                    ...childCarry.allParserResult,
                    ...parserResult,
                  },
                  allPluginData: { ...childCarry.allPluginData, ...pluginData },
                };
              },
              { allParserResult: {}, allPluginData: {} },
            );
            carry[child.name] = allParserResult;
            return carry;
          } else {
            return {
              ...carry,
              ...tokenChildParser(
                metaData,
                `${path}/${child.name}`,
                child,
                plugins,
              ),
            };
          }
        }, {})
    : {};
};
