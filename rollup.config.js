// rollup.config.js

import resolve from '@rollup/plugin-node-resolve'

import { chromeExtension, simpleReloader } from 'rollup-plugin-chrome-extension'

export default {
  input: 'manifest.json',
  output: {
    dir: 'dist',
    format: 'esm',
  },
  plugins: [
    // always put chromeExtension() before other plugins
    chromeExtension(),
    simpleReloader(),
    resolve()
  ],
}