import {
  MetaData,
  ThemeParserObject,
  isTraversable,
  TraversableNode,
  ParserPlugin,
  PluginData,
  GetFileResult,
} from '../../types';
import {
  IGNORE_PREFIX,
  ICON_PREFIX,
  PIN_PREFIX,
  getComponentName,
} from '../../utils';

// This whole file depends on Figma API https://www.figma.com/developers/api

/**
 * @param configuration a configuration settings for parser
 * @param file a Figma File object obtained from an API
 * This function will call a page parser function for each child in file.document and return data obtained by parsing.
 */
export const variantParser = async (
  file: GetFileResult,
  plugins: ParserPlugin[],
  metaData: MetaData,
) => {
  return file.document.children
    .filter((childElement) => !childElement.name.startsWith(IGNORE_PREFIX))
    .map((page) => {
      // if (page.name.indexOf('Breadcrumb') > -1) {
      return isTraversable(page)
        ? { ...variantChildParser(page, plugins, metaData) }
        : {};
      // }
      // return {};
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
 * @param configuration a configuration settings for parser
 * @param element a Figma object
 * Recursive function. This function will call a componentSetParser function for each COMPONENT_SET child in element.children and return data obtained by parsing.
 * For each element which is not COMPONENT_SET, it will call itself again, trying to find all COMPONENT_SET elements.
 */
const variantChildParser = (
  element: TraversableNode,
  plugins: ParserPlugin[],
  metaData: MetaData,
): ThemeParserObject => {
  return element.children
    ?.filter((childElement) => !childElement.name.startsWith(IGNORE_PREFIX))
    .map((childElement) => {
      if (childElement.type === 'COMPONENT_SET') {
        return {
          [childElement.name]: {
            ...(isTraversable(childElement)
              ? componentSetParser(childElement, plugins, metaData)
              : {}),
          },
        };
      } else {
        return isTraversable(childElement)
          ? { ...variantChildParser(childElement, plugins, metaData) }
          : {};
      }
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
 * @param configuration a configuration settings for parser
 * @param componentSet a Figma COMPONENT_SET object
 * This function will call a walker function for each component in componentSet.children and return data obtained by parsing.
 */
const componentSetParser = (
  componentSet: TraversableNode,
  plugins: ParserPlugin[],
  metaData: MetaData,
) => {
  return componentSet.children
    ?.map((component) => {
      const { allParserResult, allPluginData } = plugins.reduce(
        (childCarry, plugin) => {
          const { parserResult, pluginData } = plugin.runParser(
            component,
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
      return {
        [getComponentName(component.name)]: {
          ...allParserResult,
          ...(isTraversable(component)
            ? componentWalker(component, plugins, metaData, allPluginData)
            : {}),
        },
      };
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
 * @param configuration a configuration settings for parser
 * @param element a Figma object
 * @param autolayoutData a configuration for autolayout parser
 * Recursive function. This function will call itself for each child in element.children, parse current object and return data obtained by parsing.
 * Returned data from parsed children will overwrite, if necessary, parsed data from this element.
 * Elements highlighted as a pin will get their own object in returned data.
 * Node types described here https://www.figma.com/plugin-docs/api/nodes/
 */
const componentWalker = (
  element: TraversableNode,
  plugins: ParserPlugin[],
  metaData: MetaData,
  prevPluginData: PluginData,
): ThemeParserObject => {
  return element.children
    ?.filter(
      (child) =>
        !child.name.startsWith(IGNORE_PREFIX) && child.visible !== false,
    )
    .map((child, index) => {
      if ((prevPluginData as any).autolayout) {
        (prevPluginData as any).autolayout.order = index;
      }
      const { allParserResult, allPluginData } = plugins.reduce(
        (childCarry, plugin) => {
          const { parserResult, pluginData } = plugin.runParser(
            child,
            metaData,
            prevPluginData,
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
      if (child.name.startsWith(ICON_PREFIX)) {
        return {
          [`icon-${child.name.substring(ICON_PREFIX.length)}`]: {
            ...allParserResult,
          },
        } as ThemeParserObject;
      }
      if (child.name.startsWith(PIN_PREFIX)) {
        return {
          [child.name.substring(PIN_PREFIX.length)]: {
            ...allParserResult,
            ...(isTraversable(child)
              ? componentWalker(child, plugins, metaData, allPluginData)
              : {}),
          },
        };
      }
      return {
        ...allParserResult,
        ...(isTraversable(child)
          ? componentWalker(child, plugins, metaData, allPluginData)
          : {}),
      };
    })
    .reduce(
      (accumulated: ThemeParserObject, current: ThemeParserObject) => ({
        ...accumulated,
        ...current,
      }),
      {},
    );
};
