import { PackagerPlugin, ThemeParserObject } from '../../../types';
import { createSchema } from '../../../utils';

export const schemaPackagerPlugin = () => {
  return {
    id: 'schema',
    runFileCreation: (data: ThemeParserObject) => {
      return [
        {
          path: 'theme/schema.json',
          content: JSON.stringify(createSchema(data), null, 2),
        },
      ];
    },
  } as PackagerPlugin;
};
