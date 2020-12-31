'use strict'
const webpack = require('webpack')

module.exports = {
  css: { extract: true },
  chainWebpack: config => {
    config.externals({
      ...config.get('externals'),
      'vue': 'vue',
      'lodash': 'lodash',
      'element-plus': 'element-plus',
      'codemirror': 'codemirror',
      'vue-router': 'vue-router',
      'vuex': 'vuex',
      'js-cookie': 'js-cookie',
      'nprogress': 'nprogress',
      'axios': 'axios',
      'inputmask': 'inputmask',
      'mockjs': 'mockjs',
      'js-beautify': 'js-beautify',
      'core-js': 'core-js',
      'system': 'system',
      'jsonlint': 'jsonlint',
      'normalize.css': 'normalize.css',
      'xlsx': 'xlsx'
    })
  },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
      })
    ]
  }
}
