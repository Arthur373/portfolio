const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  entry: {
    'polyfills': './src/polyfills.ts',
    'app': './src/main.ts'
  },
  module: {
     rules: [
        {
          test: /\.svg$/,
          use: 'svg-inline-loader'
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.(js)$/,
          use: 'babel-loader'
        }
     ]
  },
  output: {
     path: path.resolve(__dirname, 'dist'),
     filename: "build/[name].js",
  },
  plugins: [
    new HtmlWebpackPlugin()
  ],
  mode: 'production'
}
