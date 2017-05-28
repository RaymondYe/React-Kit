import path from 'path';
import webpack from 'webpack';
import AssetsPlugin from 'assets-webpack-plugin';
import { vendor } from './config';

const isDebug = !process.argv.includes('--release');
const GLOBALS = {
	'process.env.NODE_ENV': isDebug ? '"development"' : '"production"',
	__DEV__: isDebug
};

const config = {
	entry: {
		vendor: vendor
	},
	output: {
		filename: isDebug ? '[name].[hash].js' : '[name].[hash].min.js',
		path: path.join(__dirname, '../assets/vendor'),
		library: '[name]'
	},
	plugins: [
		new webpack.DefinePlugin(GLOBALS),
		new webpack.DllPlugin({
			path: path.resolve(
				__dirname,
				`../assets/vendor/[name]-manifest${isDebug ? '' : '.min'}.json`
			),
			name: '[name]'
		}),
		new AssetsPlugin({
			filename: isDebug ? 'dll-config.json' : 'dll-config.min.json',
			path: path.join(__dirname, '../assets/vendor')
		}),
		...(isDebug ? [] : [new webpack.optimize.UglifyJsPlugin()])
	]
};

export default config;
