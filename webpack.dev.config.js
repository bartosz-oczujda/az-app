const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = function(env){
	const isDevEnv = env.dev === "true";
	const output_directory = getOutputDir(isDevEnv);
	const source_directory = path.resolve(__dirname, 'client/src');

	return {
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
			new ExtractTextPlugin("[name].css"),
			new webpack.DefinePlugin({
				'API_URL' : getApiUrl(isDevEnv)
			})
		],
		devtool: 'source-map'
	}
};

const getApiUrl = (isDevEnv) => {
	const url = isDevEnv ? 'http://localhost:8080' : 'http://ec2-52-57-207-38.eu-central-1.compute.amazonaws.com:3000'
	return JSON.stringify(url)
}

const getOutputDir = (isDevEnv) => {
	const dirPath = isDevEnv ? 'client/dist' : 'docs'
	return path.resolve(__dirname, dirPath);
}

module.exports = config;