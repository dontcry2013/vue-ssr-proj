const { join, resolve } = require('path')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.config')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

module.exports = merge(baseWebpackConfig, {
	target: 'node',
	entry: {
		app: './src/entry-server.js'
	},
	output: {
	    filename: 'server.js',
	    libraryTarget: 'commonjs2'
	},
	plugins: [
		new VueSSRServerPlugin()
	],
})