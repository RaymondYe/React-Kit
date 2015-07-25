var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer-core');

const DEBUG = true;
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

const config = {

  //后缀名的自动补全 require('file.coffee') -> require('file')
  resolve: {
    extensions: ['', '.js', '.jsx', '.coffee', '.cjsx']
  },

  // 配置loader
  // 用 ! 来连接多个人 loader
  module: {
    loaders: [{
      test: /\.css$/,
      loader: 'style!css!postcss-loader'
    }, {
      test: /\.less$/,
      loader: 'style!css!postcss-loader!less'
        //loader: ExtractTextPlugin.extract("style", "css!less")
    }, {
      test: /\.gif/,
      loader: 'url-loader?limit=10000&mimetype=image/gif'
    }, {
      test: /\.jpg/,
      loader: 'url-loader?limit=10000&mimetype=image/jpg'
    }, {
      test: /\.png/,
      loader: 'url-loader?limit=10000&mimetype=image/png'
    }, {
      test: /\.svg/,
      loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
    }, {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.coffee$/,
      loader: 'coffee'
    }, { test: /\.cjsx$/, loader: "coffee-jsx-loader" }]
  },
  entry: './src/app.js', //演示单入口文件
  output: {
    publicPath: './', // 引用你的文件时考虑使用的地址
    sourcePrefix: '  ',
    path: './build/public', //指向 Webpack 编译能的资源位置
    filename: 'app.js' //打包后的名字
  },

  cache: DEBUG,
  debug: DEBUG,

  stats: {
    colors: true,
    reasons: DEBUG
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin('app.bundle.css'),
  ],
  devtool: 'eval-source-map',

  postcss: [autoprefixer(AUTOPREFIXER_BROWSERS)]
};


// new webpack.optimize.DedupePlugin(),
// new webpack.optimize.UglifyJsPlugin(),
// new webpack.optimize.AggressiveMergingPlugin()


module.exports = config;