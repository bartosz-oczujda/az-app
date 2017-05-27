const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const output_directory = path.resolve(__dirname, 'client/dist');
const source_directory = path.resolve(__dirname, 'client/src');

const config = {
	entry: `${source_directory}/index.jsx`,
	output: {
		path: output_directory,
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				include: source_directory,
				loader: 'babel'
			}
		]
	},
	plugins: [
        new HtmlWebpackPlugin({template: 'client/index.html'})
    ],
	devtool: 'source-map',
	debug: true
};

module.exports = config;
