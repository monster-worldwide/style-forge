import type { Node } from 'figma-api';
import {
  MetaData,
  FileDescription,
  IconObject,
  ThemeParserObject,
} from '../runners';

export type PluginData = {
  [key: string]: object;
};

export type ParserPlugin = {
  id: string;
  runParser: (
    element: Node,
    metaData?: MetaData,
    pluginData?: PluginData,
  ) => { parserResult: object; pluginData: object };
};

export type PostProcessorPlugin = {
  id: string;
  runPostProcessing: (data: ThemeParserObject) => ThemeParserObject;
};

export type ValidatorPlugin = {
  id: string;
  runValidation: (data: ThemeParserObject) => void;
};

export type PackagerPlugin = {
  id: string;
  runFileCreation: (data: ThemeParserObject | IconObject) => FileDescription[];
};
