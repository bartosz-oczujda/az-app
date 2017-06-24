const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const output_directory = path.resolve(__dirname, 'client/dist');
const source_directory = path.resolve(__dirname, 'client/src');

const config = {
	entry: {
		app: `${source_directory}/index.jsx`
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
			}
		],
	},
	plugins: [
		new HtmlWebpackPlugin({ template: 'client/index.html' }),
		new CopyWebpackPlugin([
            { from: 'client/static' }
        ])
	],
	devtool: 'source-map'
};

module.exports = config;
