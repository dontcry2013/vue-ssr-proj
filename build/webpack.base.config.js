const path = require('path')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
	devtool: isProd ? false : '#cheap-module-source-map',
	output: {
		path: path.resolve(__dirname, '../dist'),
	    publicPath: '/dist/',
	    filename: '[name].js'
	},
	entry: "./src/entry-server.js",
	module: {
		rules: [
			{
		        test: /\.vue$/,
		        loader: 'vue-loader',
		        options: {
		          compilerOptions: {
		            preserveWhitespace: false
		          }
		        }
		     },
		]
	},
	plugins: [
		new VueLoaderPlugin()
	]
}	