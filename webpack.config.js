const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const output_directory = path.resolve(__dirname, 'docs');
const source_directory = path.resolve(__dirname, 'client/src');

const config = {
	entry: {
		app: `${source_directory}/index.jsx`,
		vendor: `${source_directory}/vendor.js`
	},
	output: {
		path: output_directory,
		filename: '[name].js'
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				include: source_directory,
				loader: 'babel-loader'
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: "css-loader"
				})
			}
		],
	},
	plugins: [
		new HtmlWebpackPlugin({ template: 'client/index.html' }),
		new ExtractTextPlugin("[name].css")
	],
	devtool: 'source-map'
};

module.exports = config;
