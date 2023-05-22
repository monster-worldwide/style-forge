import { nodeResolve } from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json';
import typescript from '@rollup/plugin-typescript';

export default [
  {
    input: 'src/index.ts',
    inlineDynamicImports: true,
    external: ['archiver'],
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
        name: pkg.name,
      },
      {
        file: pkg.module,
        format: 'es',
        exports: 'named',
        sourcemap: true,
      },
    ],
    plugins: [
      typescript(),
      nodeResolve({ preferBuiltins: false }),
      commonjs(),
      json(),
    ],
  },
  {
    input: 'src/lite.ts',
    inlineDynamicImports: true,
    output: [
      {
        file: 'dist/lite.js',
        format: 'cjs',
        sourcemap: true,
        name: pkg.name,
      },
      {
        file: 'dist/lite.esm.js',
        format: 'es',
        exports: 'named',
        sourcemap: true,
      },
    ],
    plugins: [
      typescript(),
      nodeResolve({ preferBuiltins: false }),
      commonjs(),
      json(),
    ],
  },
];
