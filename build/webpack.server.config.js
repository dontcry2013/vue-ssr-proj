const { join, resolve } = require('path')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.config')
const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

module.exports = merge(baseWebpackConfig, {
	target: 'node',
	entry: {
		app: './src/entry-server.js'
	},
	output: {
	    libraryTarget: 'commonjs2'
	},
	externals: nodeExternals({
	    // do not externalize CSS files in case we need to import it from a dep
	    whitelist: /\.css$/
	}),
	plugins: [
		new VueSSRServerPlugin()
	],
})