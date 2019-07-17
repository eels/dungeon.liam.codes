const webpack = require('webpack');
const merge = require('webpack-merge');
const uglifyJSPlugin = require('uglifyjs-webpack-plugin');
const base = require('./webpack.config.base');

module.exports = merge(base, {
  mode: 'production',
  optimization: {
    minimizer: [
      new uglifyJSPlugin({
        cache: true,
        parallel: true,
        sourceMap: false,
        uglifyOptions: {
          compress: true,
          output: {
            comments: false
          },
          compress: {
            dead_code: true,
            drop_console: true
          }
        }
      })
    ],
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  }
});
