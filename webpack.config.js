'use strict';

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');

const path = require('path');

const appConfig = {
  entry: './src/frontend/app.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    chunkFilename: '[name].bundle.js',
    filename: 'bundle.js',
    publicPath: '/assets/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' },
      },
      {
        test: /\.(png|jpg|jpeg)$/,
        loader: 'url-loader',
      },
      {
        test: /\.s?[ac]ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: '../' },
          },
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
    ],
  },

  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      PORT: JSON.stringify(process.env.PORT),
    }),
    new LoadablePlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './src/shared/template.html'),
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
};

const serverSideRenderingConfig = {
  target: 'node',
  entry: './src/frontend/app.ssr.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.ssr.js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: 'css-loader/locals',
      },
    ],
  },

  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
};

module.exports = [appConfig, serverSideRenderingConfig];
