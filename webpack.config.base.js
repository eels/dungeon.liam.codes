const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    polyfills: './src/js/polyfills.js',
    script: './src/js/index.js'
  },
  output: {
    chunkFilename: '[name].min.js',
    filename: '[name].min.js',
    path: path.join(__dirname, '/web/assets/js')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    alias: {},
    extensions: ['.js', '.json']
  }
};
