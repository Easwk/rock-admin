'use strict'

module.exports = {
  css: { extract: false },
  chainWebpack: config => {
    config.externals({
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
      'normalize.css': 'normalize.css'
    })
    config.alias = {
      'codemirror$': 'codemirror/lib/codemirror.js'
    }
  }
}
