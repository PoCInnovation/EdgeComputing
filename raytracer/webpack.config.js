const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TSLintPlugin = require('tslint-webpack-plugin');

module.exports = {
  entry: './src/',
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      "@edge-computing": path.resolve(__dirname, '../edge-computing/')
    }
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'index.min.js'
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: 'ts-loader'
      }
    ]
  },
  plugins: [
    new TSLintPlugin({
      files: ['./src/**/*.ts']
    }),
    new HtmlWebpackPlugin({
      title: 'RayTracer'
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  }
}
