# Flatten Post Processor Plugin

Is one of [Post Processor Plugins](../). This plugin will remove redundant objects from the input.

## Workflow

This plugin will get [ThemeParserObject](../../dev-dependencies/types) as a parameter and will recursively go through all objects in the input, looking for any objects which contain only one object with the same name. This one will get then removed and its content merged into the parent object.

```
{
    component:{
        component:{
            ...
        }
    }
}

=>

{
    component:{
        ...
    }
}
```
