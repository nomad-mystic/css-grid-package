const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const babelConfig = require('../babel.config.json');
const { isUndefined } = require('lodash');


const buildPaths = {
  distPath: path.resolve(__dirname, '../dist'),
  buildPath: path.resolve(__dirname, '../public'),
  destinationFolder: isUndefined(process.env.NODE_ENV) ? 'dist' : 'public',
};

module.exports = {
  entry: {
    main: path.resolve(__dirname, '../src/js/main.js'),
  },
  output: {
    path: isUndefined(process.env.NODE_ENV) ? buildPaths.distPath : buildPaths.buildPath,
    filename: 'js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].css',
              outputPath: 'css',
              esModule: false,
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: 'postcss.config.js',
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              // Prefer `dart-sass`
              implementation: require('sass'),
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: 'css/[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
    new VueLoaderPlugin(),
  ],
};
