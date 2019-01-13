const merge = require('webpack-merge')
const path = require('path')
const webpack = require('webpack')
// const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

var baseWebpackConfig = require('./webpack.config')
var webpackConfig = merge(baseWebpackConfig, {
	target: 'node',
	entry: {
		app: './src/entry-server.js'
	},
	// devtool: 'source-map',
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'server.bundle.js',
		libraryTarget: 'commonjs2'
	},
	externals: {
		whitelist: /\.css$/
	},
	plugins: [
		// new VueSSRServerPlugin()
	],
})
module.exports = webpackConfig