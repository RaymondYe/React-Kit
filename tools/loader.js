import path from 'path';

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const DEBUG = !process.argv.includes('--release');
const srcPath = path.resolve(__dirname, '../src');

const cssLoader = [
	DEBUG ? 'style-loader' : {
		loader: MiniCssExtractPlugin.loader,
		options: {
			publicPath: '../'
		}
	},
	{
		loader: 'css-loader',
		options: {
			modules: {
				localIdentName: '[local]-[hash:base64:10]'
			}
		}
	},
	{
		loader: 'postcss-loader',
		options: {
			plugins: function (ctx) {
				let result = [
					require('postcss-import')({
						addDependencyTo: ctx.webpack
					}),
					require('precss')(),
					require('postcss-preset-env')(),
				];
				result.push(require('postcss-px2rem-exclude')({
					remUnit: 100,
					exclude: /node_modules|folder_name/i
				}))
				if (!DEBUG) result.push(require('cssnano')())
				return result
			}
		}
	},
	'less-loader'
];

export default [
	{
		test: /\.less$/,
		use: cssLoader
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
					presets: [
						[
							'@babel/preset-env',
							{
								targets: {
									browsers: ['last 4 versions', '>5%', 'not ie < 9'],
									uglify: true
								},
								modules: false,
								useBuiltIns: false,
								// 编译是否去掉 console.log
								debug: false
							}
						],
						'@babel/react'
					],
					// http://babeljs.io/docs/plugins/
					plugins: [
						...(DEBUG
							? ['@babel/transform-react-jsx-source', '@babel/transform-react-jsx-self']
							: ['lodash']),
						["react-css-modules", {
							generateScopedName: '[local]-[hash:base64:10]',
							webpackHotModuleReloading: DEBUG,
							filetypes: {
								".less": {
									"syntax": "postcss-less"
								}
							}
						}],
						['import', { libraryName: 'antd-mobile', style: true }],
						[
							'@babel/transform-runtime',
							{
								regenerator: true
							}
						]
					]
				}
			}
		]
	}
]
