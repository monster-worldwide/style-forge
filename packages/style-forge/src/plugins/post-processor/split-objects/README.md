# Split Objects Post Processor Plugin

Is one of [Post Processor Plugins](../). This plugin will split objects with names containing `/` into multiple ones.

## Workflow

This plugin will get [ThemeParserObject](../../dev-dependencies/types) as a parameter and will recursively go through all objects in the input, looking for any object with `/` in name.

Those objects are then being split into multiple ones such as:

```
{
    component:{
        "param1/param2": {
            ...
        }
    }
}

=>

{
    component:{
        param1:{
            param2:{
                ...
            }
        }
    }
}
```

Objects starting with `$` ([Tokens](../../runners/token-parser)) are ignored.
