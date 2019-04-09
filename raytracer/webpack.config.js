const path = require('path');

module.exports = {
  entry: './src/index.ts',
  resolve: {
    extensions: ['.ts',]
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
  }
}