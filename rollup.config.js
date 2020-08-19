import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import cleanup from 'rollup-plugin-cleanup';
import minify from 'rollup-plugin-babel-minify';
import copy from 'rollup-plugin-copy';
import replace from '@rollup/plugin-replace';

const copyFiles = [
  { src: 'public/*', dest: 'build/' },
];

const rollupPlugins = [
  babel({ babelHelpers: 'bundled' }),
  nodeResolve({
    extensions: ['.mjs', '.js', '.json', '.node', '.jsx'],
  }),
  replace({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  }),
  commonjs(),
  copy({ targets: copyFiles }),
];

if (process.env.NODE_ENV === 'production') {
  rollupPlugins.push(minify(), cleanup());
}

export default {
  input: 'src/index.jsx',
  output: {
    file: 'build/index.js',
    format: 'esm',
  },
  plugins: rollupPlugins,
};
