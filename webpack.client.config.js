var path = require('path')
var webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.config')

var webpackClientConfig = merge(baseWebpackConfig, {
  entry: './src/entry-client.js',
  output: {
    filename: 'build.js'
  },
})

module.exports = webpackClientConfig
