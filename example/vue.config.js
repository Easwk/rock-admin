"use strict";
const path = require("path");
const CompressionPlugin = require('compression-webpack-plugin')
// const defaultSettings = require('./src/settings.js')
function resolve(dir) {
  return path.join(__dirname, dir);
}

// const name = defaultSettings.title || 'JRender Admin' // page title
const port = process.env.NODE_ENV_DEV_PORT || 9528; // dev port
const isDev = process.env.NODE_ENV === "development";
const enableMock = process.env.VUE_APP_ENABLE_MOCK === "true";
const hashType = isDev ? 'hash' : 'contenthash:8'

const devServer = {
  port: port,
  hot: true,
  open: "Google Chrome",
  disableHostCheck: true,
  proxy: {
    [process.env.VUE_APP_BASE_API]: {
      target: process.env.VUE_APP_PROXY_TARGET,
      changeOrigin: true,
      pathRewrite: {
        ["^" + process.env.VUE_APP_BASE_API]: ""
      },
      logLevel: "debug"
    }
  }
};

if (enableMock) {
  delete devServer["proxy"];
}

module.exports = {
  publicPath: "/",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: isDev,
  productionSourceMap: isDev,
  devServer,
  configureWebpack(config) {
    const baseConf = {
      name: 'rock-admin',
      resolve: {
        alias: {
          '@': resolve('src'),
          'rock-admin': resolve('../'),
          vue$: "vue/dist/vue.esm-bundler.js"
        }
      },
      output: {
        filename: `static/js/[name].[${hashType}].js`,
        publicPath: '/',
        chunkFilename: `static/js/[name].[${hashType}].js`
      },
      stats: 'none', // 屏蔽打包报警
      plugins: [],
      externals: {}
    }
    if (!isDev) {
      baseConf.plugins = [
        new CompressionPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i, // 匹配文件名
          threshold: 10240, // 对超过10k的数据压缩
          deleteOriginalAssets: false // false 不删除源文件 true 删除源文件
        }),
        ]
    }
    return baseConf;
  },
  chainWebpack(config) {
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')

    config
      .when(!isDev,
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 20000,
            cacheGroups: {
              vendor: {
                test: /[\\/]node_modules[\\/]/,
                name(module) {
                  const packageName = module.context.match(
                    /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                  )[1];
                  return `${packageName.replace("@", "")}`;
                }
              }
            }
          })
        })

    config.optimization.runtimeChunk('single')

    config.plugin('extract-css')
      .use(require('mini-css-extract-plugin'), [
        {
          filename: `static/css/[name].[${hashType}].css`,
          chunkFilename: `static/css/[name].[${hashType}].css`
        }
      ])
  }
};
