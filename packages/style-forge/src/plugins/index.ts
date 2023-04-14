import { PackagerPlugins } from './packager';
import { ParserPlugins } from './parser';
import { ValidatorPlugins } from './validator';
import { PostProcessorPlugins } from './post-processor';
export * from './packager';
export * from './post-processor';
export * from './validator';
export * from './parser';

export const StyleForgePlugins = {
  Packager: { ...PackagerPlugins },
  Parser: { ...ParserPlugins },
  Validator: { ...ValidatorPlugins },
  PostProcessor: { ...PostProcessorPlugins },
};
