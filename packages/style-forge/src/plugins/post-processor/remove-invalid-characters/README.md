# Remove Invalid Characters Post Processor Plugin

Is one of [Post Processor Plugins](../). This plugin will remove characters from object names, keeping only alphabet, numeric and `$` ([Token](../../runners/token-parser)) characters.

## Workflow

This plugin will get [ThemeParserObject](../../dev-dependencies/types) as a parameter and will recursively go through all objects in the input, removing selected characters from their names.

```
{
    component#1:{
        ...
    }
}

=>

{
    component1:{
        ...
    }
}
```
