const path = require('path');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new HtmlWebpackPlugin({
    title: 'production',
    template: path.join(__dirname, 'src/index.html'),
  }),
  new CleanWebpackPlugin({
    cleanOnceBeforeBuildPatterns: ['**/*', '!favicon.*'],
  }),
];
if (process.env.NODE_ENV === 'production') {
  plugins.push(new CompressionPlugin(
    {
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|css)$/,
      deleteOriginalAssets: true,
    },
  ));
}

module.exports = {
  entry: [
    './src/index.js',
  ],
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env', '@babel/preset-react'],
          plugins: ['babel-plugin-styled-components'],
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpg|png|gif)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
          },
        }],
      },
    ],
  },
  resolve: { extensions: ['*', '.js', '.jsx'] },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    publicPath: '/',
    filename: 'app_[hash].js',
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, 'src/'),
    publicPath: 'http://localhost:3000/',
    hot: true,
    proxy: [{
      context: ['/newPrompt', '/'],
      target: 'http://localhost:3000',
    }],
    disableHostCheck: true,
  },
  plugins,
};
