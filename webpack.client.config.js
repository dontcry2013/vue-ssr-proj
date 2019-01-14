const { join, resolve } = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.config')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

var webpackClientConfig = merge(baseWebpackConfig, {
  entry: './src/entry-client.js',
  output: {
    filename: 'client.js',
  },
  plugins: [
    // Important: this splits the webpack runtime into a leading chunk
    // so that async chunks can be injected right after it.
    // this also enables better caching for your app/vendor code.

    // new webpack.optimize.CommonsChunkPlugin({
    //   name: "manifest",
    //   minChunks: Infinity
    // }),
    
    // This plugins generates `vue-ssr-client-manifest.json` in the
    // output directory.
    new VueSSRClientPlugin()
  ]
})

module.exports = webpackClientConfig
