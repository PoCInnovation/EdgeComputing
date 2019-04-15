const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  resolve: {
    extensions: ['.ts', '.js']
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
  plugins: [new HtmlWebpackPlugin()],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  }
}
