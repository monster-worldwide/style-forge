import merge from 'lodash/merge';
import { CONFIG_PREFIX } from '../../utils';
import {
  isNodeWithChildren,
  MetaData,
  Node,
  ParserPlugin,
  GetFileResult,
} from '../../types';
// This whole file depends on Figma API https://www.figma.com/developers/api

/**
 * @param file a Figma File object obtained from an API
 * This function will call a page parser function for each child in file.document and return config data from parsers.
 */
export const metaDataParser = async (
  file: GetFileResult,
  plugins: ParserPlugin[],
): Promise<MetaData> => {
  return file.document.children.reduce(
    (carry, page) => merge(carry, metaDataPageParser(page, plugins)),
    {},
  );
};

/**
 * @param page a Figma Page object
 * This function will call a frame parser function for each child in page.children which name starts with correct prefix, then calls correct parser for the result.
 */
const metaDataPageParser = (
  page: Node,
  plugins: ParserPlugin[],
): Partial<MetaData> => {
  return isNodeWithChildren(page)
    ? page.children.reduce((carry: Partial<MetaData>, frame) => {
        if (!frame.name.startsWith(CONFIG_PREFIX)) {
          return carry;
        }
        const { allParserResult } = plugins.reduce(
          (childCarry, plugin) => {
            const { parserResult, pluginData } = plugin.runParser(frame);
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
        carry = { ...carry, ...allParserResult };
        return carry;
      }, {})
    : {};
};
