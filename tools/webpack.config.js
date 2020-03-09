import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
// import AssetsPlugin from 'assets-webpack-plugin';
import loader from './loader';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const DEBUG = !process.argv.includes('--release');
const VERBOSE = process.argv.includes('--verbose');
const GLOBALS = {
	'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
	__DEV__: DEBUG
};

const srcPath = path.resolve(__dirname, '../src');

/*
	Setting Resolve Alias Config
	You can import module like this: `import App from 'components/app';`
*/
const alias = {};
['components', 'containers', 'styles', 'utils'].map((el, index) => {
	alias[el] = path.resolve(srcPath, el);
});

// Dll Config
let dllConfig = null;
let dllConfigUrl = DEBUG
	? '../assets/vendor/dll-config.json'
	: '../assets/vendor/dll-config.min.json';
dllConfig = require(path.resolve(__dirname, dllConfigUrl));

const config = {
	mode: DEBUG ? 'development' : 'production',
	entry: {
		app: './src/app.js'
	},

	output: {
		publicPath: DEBUG ? '' : '',
		// publicPath: DEBUG ? '' : '',
		path: path.join(__dirname, '../dist/public'),
		filename: DEBUG ? '[name].js?[hash]' : '[name].[hash].js',
		// This is used for require.ensure. The setup
		// will work without but this is useful to set.
		chunkFilename: '[id].[chunkHash].js'
	},
	bail: !DEBUG,
	cache: DEBUG,
	stats: {
		cached: VERBOSE,
		cachedAssets: VERBOSE,
		chunks: VERBOSE,
		chunkModules: VERBOSE,
		colors: true,
		hash: VERBOSE,
		modules: VERBOSE,
		reasons: DEBUG,
		timings: true,
		version: VERBOSE
	},

	// Choose a developer tool to enhance debugging
	// https://doc.webpack-china.org/configuration/devtool/
	devtool: DEBUG ? 'cheap-module-source-map' : 'source-map',

	// https://webpack.js.org/configuration/resolve/
	resolve: {
		alias: {
			...alias,
			'react-dom': '@hot-loader/react-dom'
		},
		modules: [srcPath, 'node_modules'],
		extensions: ['.js', '.jsx', '.json']
	},

	module: {
		// Make missing exports an error instead of warning
		strictExportPresence: true,
		rules: loader
	},

	plugins: [
		// HtmlWebpackPlugin: Create html
		// https://doc.webpack-china.org/plugins/html-webpack-plugin/
		new HtmlWebpackPlugin({
			filename: '../content/index.html',
			template: 'src/content/index.html',
			dllName: dllConfig.vendor.js,
			usemin: DEBUG ? '' : '.min',
			minify: DEBUG
				? false
				: {
					removeComments: true,
					collapseWhitespace: true
				}
		}),

		// ProvidePlugin: definitions 定义标识符，当遇到指定标识符的时候，自动加载模块。
		// https://doc.webpack-china.org/plugins/provide-plugin/
		new webpack.ProvidePlugin({
			React: 'react'
		}),

		// DllReferencePlugin: Use Dll Reference
		// https://doc.webpack-china.org/plugins/dll-plugin/
		new webpack.DllReferencePlugin({
			context: '.',
			manifest: require('../assets/vendor/vendor-manifest' +
				(DEBUG ? '' : '.min') +
				'.json')
		}),

		// DefinePlugin: 允许创建一个在编译时可以配置的全局常量。
		// https://doc.webpack-china.org/plugins/define-plugin/
		new webpack.DefinePlugin(GLOBALS),

		// AssetsPlugin: Emit a file with assets paths
		// new AssetsPlugin({
		// 	path: path.join(__dirname, '../dist'),
		// 	filename: 'assets.js',
		// 	prettyPrint: true,
		// 	processOutput: x => `module.exports = ${JSON.stringify(x)};`
		// }),

		...(DEBUG
			? []
			: [
				// MiniCssExtractPlugin: 分离样式到CSS文件
				// https://doc.webpack-china.org/plugins/extract-text-webpack-plugin/
				new MiniCssExtractPlugin({
					filename: 'css/[name].[contenthash].css',
					allChunks: true
				}),

				// A plugin for a more aggressive chunk merging strategy
				new webpack.optimize.AggressiveMergingPlugin()
			])
	],
	performance: {
		hints: DEBUG ? false : 'error'
	}
};

export default config;
