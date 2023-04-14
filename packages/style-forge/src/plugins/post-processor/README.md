# Post Processor Plugins

A collection of plugins for [Post Processor](../runners/post-processor).

## Signature

```
type PostProcessorPlugin = {
  id: string;
  runPostProcessing: (data: ThemeParserObject) => ThemeParserObject;
};
```

## Usage

Plugins are intended to use in an array as a parameter for [Post Processor](../runners/post-processor).

Those plugins will then be running in sequence to make changes the output of other runners, altering it as defined by each plugin.

!IMPORTANT - the order of plugins matter, due to the fact that post processing takes into account current state of the data

```
import { xPostProcessorPlugin } from '@monsterww/x-plugin-post-processor';
import { postProcessor } from '@monsterww/post-processor';

postProcessor(dataToPostProcess, [xPostProcessorPlugin()]);

```

## Plugins

- [Flatten](./flatten) - will remove redundant objects from the input
- [Remove Invalid Characters](./remove-invalid-characters) - will remove characters not supported by JSON from object names
- [Split Objects](./split-objects) - will split objects with names containing `/` into multiple
