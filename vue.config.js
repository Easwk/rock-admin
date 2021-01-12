'use strict'

module.exports = {
  css: { extract: true },
  configureWebpack: {
    externals: [
      {
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
        'xlsx': 'xlsx',
        'qs': 'qs'
      },
      /^codemirror*/,
      /^element-plus*/,
      /^core-js*/,
      /^path-to-regex*/,
      /^file-saver*/
    ]
  }
}
