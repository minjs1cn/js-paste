import path from 'path'
import ts from 'rollup-plugin-typescript2'
import replace from '@rollup/plugin-replace'
import json from '@rollup/plugin-json'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'

const resolve = p => path.resolve(__dirname, p)
const pkg = require(resolve('./package.json'))
const version = pkg.version
const entryFile = resolve('src/index.ts')
const name = 'paste'
const format = process.env.FORMAT

const outputConfigs = {
  es: {
    file: resolve(`lib/${name}.es.js`),
    format: `es`
  },
  umd: {
    file: resolve(`lib/${name}.umd.js`),
    format: `umd`
  },
  global: {
    file: resolve(`dist/${name}.global.js`),
    format: `iife`
  }
}

/**
 * @returns {import('rollup').RollupOptions}
 */
function createConfig(format, plugins = []) {
  return {
    input: resolve(entryFile),
    plugins: [
      json(),
      ts(),
      nodeResolve(),
      commonjs(),
      createReplacePlugin(),
      ...plugins
    ],
    output: {
      sourcemap: true,
      name: 'paste',
      ...outputConfigs[format]
    }
  }
}

function createReplacePlugin() {
  const replacements = {
    __DEV__: true,
    __VERSION__: `'${pkg.version}'`
  }

  Object.keys(replacements).forEach(key => {
    if (key in process.env) {
      replacements[key] = process.env[key]
    }
  })

  return replace(replacements)
}

const rollupOptions = createConfig(format)

export default rollupOptions
