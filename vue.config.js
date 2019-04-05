const PurgecssPlugin = require('purgecss-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const glob = require('glob-all');
const path = require('path');

module.exports = {
  devServer: {
    port: 3000,
    proxy: {
      ...['/api', '/static', '/media/', '/assets/', '/djangoadmin'].reduce(
          (acc, ctx) => ({
            ...acc,
            [ctx]: { target: process.env.VUE_APP_BACKEND },
          }),
          {}
      ),
    },
  },
  chainWebpack: (config) => {
    config.plugin('stylelint').use('stylelint-webpack-plugin');
  },
  runtimeCompiler: true,
  configureWebpack: {
    // Merged into the final Webpack config
    entry: path.join(__dirname, './src/app/main.js'),
    plugins: [
      new StylelintPlugin({
        files: [
          './**/*.vue',
          './**/*.scss',
        ],
        syntax: 'scss',
      }),
      new PurgecssPlugin({
        paths: glob.sync([
          path.join(__dirname, './**/*.vue'),
          path.join(__dirname, './src/**/*.js'),
        ]),
      }),
    ],
  },
  pluginOptions: {
    lintStyleOnBuild: true,
    stylelint: {
      fix: false,
    },
  },
  css: {
    sourceMap: true,
  },
};
