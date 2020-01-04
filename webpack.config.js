const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
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
    ],
  },
  resolve: { extensions: ['*', '.js', '.jsx'] },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    publicPath: '/dist/',
    filename: 'bundle.js',
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, 'public/'),
    publicPath: 'http://localhost:3000/dist/',
    hot: true,
    proxy: {
      '/': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/newPrompt': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/dist/imgs/': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
    disableHostCheck: true,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
};
