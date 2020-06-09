const path = require('path');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');

const plugins = [
  new webpack.HotModuleReplacementPlugin(),
];
if (process.env.NODE_ENV === 'production') {
  plugins.push(new CompressionPlugin(
    {
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|css|html)$/,
      deleteOriginalAssets: true,
    },
  ));
}


module.exports = {
  entry: [
    // 'react-hot-loader/patch',
    './src/index.js',
  ],
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env', '@babel/preset-react'] },
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
    filename: 'bundle.js',
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, 'src/'),
    publicPath: 'http://localhost:3000/',
    hot: true,
    proxy: [{
      context: ['/newPrompt'],
      target: 'http://localhost:3000',
    }],
    disableHostCheck: true,
  },
  plugins,
};
