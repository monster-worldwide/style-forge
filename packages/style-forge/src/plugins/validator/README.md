# Validator Plugins

A collection of plugins for [Validator](../runners/validator).

## Signature

```
type ValidatorPlugin = {
  id: string;
  runValidation: (data: ThemeParserObject) => void;
};
```

## Usage

Plugins are intended to use in an array as a parameter for [Validator](../runners/validator).

Those plugins will then be running in sequence to validate the output of other runners, throwing error if necessary.

```
import { xValidatorPlugin } from '@monsterww/x-plugin-validator';
import { validator } from '@monsterww/validator';

validator(dataToValidate, [xValidatorPlugin()]);

```

## Plugins

- [Parsing](./parsing) - will make sure the output can be parsed as JSON
- [Empty Names](./empty-names) - will make sure there are no empty names in the output
