// generator.js
module.exports = (api, options, rootOptions) => {
  api.extendPackage({
    // 命令
    scripts: {
      'serve': 'vue-cli-service serve',
      'build': 'vue-cli-service build',
      'lint': 'vue-cli-service lint --ext .js,.vue src',
      'lint:fix': 'eslint --fix --ext .js,.vue src',
      'report': 'node build/index.js --report'
    },
    dependencies: {
      'rock-admin': '^0.0.1-rc',
      'vue': '^3.0.0'
    },
    devDependencies: {
      '@vue/babel-plugin-jsx': '^1.0.0-rc.3',
      '@vue/cli-plugin-babel': '~4.5.9',
      '@vue/cli-service': '~4.5.9',
      '@vue/compiler-sfc': '^3.0.3',
      'chalk': '^4.1.0',
      'compression-webpack-plugin': '^6.1.1',
      'connect': '^3.7.0',
      'open': '^7.3.0',
      'runjs': '^4.4.2',
      'script-ext-html-webpack-plugin': '^2.1.5',
      'serve-static': '^1.14.1'
    }
  })
  // 删除 vue-cli3 默认目录
  api.render(files => {
    Object.keys(files)
      .filter(path => path.startsWith('src/') || path.startsWith('public/'))
      .forEach(path => delete files[path])
  })
  // 复制template模版
  api.render('./template')
}

