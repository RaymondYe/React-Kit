import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import AssetsPlugin from 'assets-webpack-plugin';
import extend from 'extend';

const DEBUG = !process.argv.includes('--release');
const VERBOSE = process.argv.includes('--verbose');
const GLOBALS = {
	'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
	__DEV__: DEBUG
};
const AUTOPREFIXER_BROWSERS = [
	'Android 2.3',
	'Android >= 4',
	'Chrome >= 20',
	'Firefox >= 24',
	'Explorer >= 8',
	'iOS >= 6',
	'Opera >= 12',
	'Safari >= 6'
];

const srcPath = path.resolve(__dirname, '../src');

/*
	Setting Resolve Alias Config
	You can import module like this: `import App from 'components/app';`
*/
const alias = {};
['action', 'components', 'reducers', 'styles', 'utils'].map((el, index) => {
	alias[el] = path.resolve(srcPath, el);
});

// Dll Config
let dllConfig = null;
let dllConfigUrl = DEBUG
	? '../assets/vendor/dll-config.json'
	: '../assets/vendor/dll-config.min.json';
dllConfig = require(path.resolve(__dirname, dllConfigUrl));

const config = {
	entry: {
		app: './src/app.js'
	},

	output: {
		publicPath: DEBUG ? '' : 'public/',
		// publicPath: DEBUG ? '' : '',
		path: path.join(__dirname, '../dist/public'),
		filename: DEBUG ? '[name].js?[hash]' : '[name].[hash].js',
		// This is used for require.ensure. The setup
		// will work without but this is useful to set.
		chunkFilename: '[id].[chunkHash].js'
	},

	cache: DEBUG,
	stats: {
		colors: true,
		reasons: DEBUG,
		hash: VERBOSE,
		version: VERBOSE,
		timings: true,
		chunks: VERBOSE,
		chunkModules: VERBOSE,
		cached: VERBOSE,
		cachedAssets: VERBOSE,
		children: false
	},

	// Choose a developer tool to enhance debugging
	// https://doc.webpack-china.org/configuration/devtool/
	devtool: DEBUG ? 'cheap-eval-source-map' : false,

	resolve: {
		alias: alias,
		modules: [srcPath, 'node_modules'],
		extensions: ['.js', '.jsx', '.json']
	},

	module: {
		rules: [
			{
				test: /\.less$/,
				use: DEBUG
					? [
							'style-loader',
							'css-loader',
							{
								loader: 'postcss-loader',
								options: {
									plugins: function(ctx) {
										return [
											require('postcss-import')({
												addDependencyTo: ctx.webpack
											}),
											require('precss')(),
											require('autoprefixer')({
												browsers: AUTOPREFIXER_BROWSERS
											})
										];
									}
								}
							},
							'less-loader'
						]
					: ExtractTextPlugin.extract({
							use: [
								{
									loader: 'css-loader',
									query: {
										minimize: true
									}
								},
								{
									loader: 'postcss-loader',
									options: {
										plugins: function(ctx) {
											return [
												require('postcss-import')({
													addDependencyTo: ctx.webpack
												}),
												require('precss')(),
												require('autoprefixer')({
													browsers: AUTOPREFIXER_BROWSERS
												})
											];
										}
									}
								},
								'less-loader'
							],
							publicPath: '../'
						})
			},
			{
				test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: DEBUG ? '[path][name].[ext]?[hash]' : 'img/[hash].[ext]'
						}
					}
				]
			},
			{
				test: /\.(eot|ttf|wav|mp3)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: DEBUG ? '[path][name].[ext]?[hash]' : '[hash].[ext]'
						}
					}
				]
			},
			{
				test: /\.jsx?$/,
				exclude: [path.resolve(__dirname, '../node_modules')],
				include: [srcPath],
				use: [
					{
						loader: 'babel-loader',
						options: {
							// https://github.com/babel/babel-loader#options
							cacheDirectory: DEBUG,
							// https://babeljs.io/docs/usage/options/
							babelrc: false,
							presets: ['react', 'es2015', 'stage-0'],
							// http://babeljs.io/docs/plugins/
							plugins: [
								'syntax-dynamic-import',
								'transform-async-to-generator',
								'transform-regenerator',
								'transform-runtime',
								...(DEBUG
									? []
									: [
											'transform-react-remove-prop-types',
											'transform-react-constant-elements'
											//http://lukecod.es/2016/03/14/react-invariant-violation-minified-exception-ios8-webpack-babel/
											// 'transform-react-inline-elements',
										])
							]
						}
					}
				]
			}
		]
	},

	// https://github.com/sporto/assets-webpack-plugin
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

		// CommonsChunkPlugin: 提取代码中的公共模块
		// https://doc.webpack-china.org/plugins/commons-chunk-plugin/
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common',
			filename: 'common.[hash].js',
			minChunks: 3
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
		new AssetsPlugin({
			path: path.join(__dirname, '../dist'),
			filename: 'assets.js',
			prettyPrint: true,
			processOutput: x => `module.exports = ${JSON.stringify(x)};`
		}),

		...(DEBUG
			? []
			: [
					// ExtractTextPlugin: 分离样式到CSS文件
					// https://doc.webpack-china.org/plugins/extract-text-webpack-plugin/
					new ExtractTextPlugin({
						filename: 'css/[name].[contenthash].css',
						allChunks: true
					}),

					// UglifyJsPlugin: Minimize all JavaScript output of chunks
					// https://doc.webpack-china.org/plugins/uglifyjs-webpack-plugin/
					new webpack.optimize.UglifyJsPlugin({
						compress: {
							warnings: VERBOSE
						}
					}),

					// A plugin for a more aggressive chunk merging strategy
					new webpack.optimize.AggressiveMergingPlugin()
				])
	]
};

export default config;
