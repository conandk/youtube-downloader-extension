const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const webpack = require('webpack');
const srcDir = '../src';

const browser = process.env.BROWSER;

module.exports = {
  entry: {
    popup: path.join(__dirname, `${srcDir}/popup.ts`),
    background: path.join(__dirname, `${srcDir}/background/${browser}/background.ts`),
    contentScript: path.join(__dirname, `${srcDir}/contentScript.ts`),
    injectScript: path.join(__dirname, `${srcDir}/injectScript.ts`),
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].js',
  },
  optimization: {
    splitChunks: {
      name: 'vendor',
      chunks: 'initial',
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      url: path.resolve(__dirname, '../node_modules/core-js/web/url.js'),
    },
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: './images', to: '../dist/images', context: 'public' },
        { from: './background.html', to: '../dist/background.html', context: 'public' },
        { from: './popup.html', to: '../dist/popup.html', context: 'public' },
        { from: `${browser}_manifest.json`, to: '../dist/manifest.json', context: 'public' },
      ],
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: false,
      template: 'public/background.html',
      filename: '../dist/background.html',
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: false,
      template: 'public/popup.html',
      filename: '../dist/popup.html',
    }),
    new NodePolyfillPlugin({
      excludeAliases: ['console'],
    }),
  ],
};
