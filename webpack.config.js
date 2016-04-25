var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var AssetsPlugin = require('assets-webpack-plugin');

var DEBUG = true;
var VERBOSE = true;

var AUTOPREFIXER_BROWSERS = [
  'Android 2.3',
  'Android >= 4',
  'Chrome >= 20',
  'Firefox >= 24',
  'Explorer >= 8',
  'iOS >= 6',
  'Opera >= 12',
  'Safari >= 6'
];

var GLOBALS = {
  'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
  '__DEV__': DEBUG
};

var config = {
	entry: {
    app: './src/app.js'
  },

  tagget: 'web',

  output: {
    publicPath: '/',
    sourcePrefix: '  ',
    path: path.join(__dirname, './build/public'),
    filename: DEBUG ? '[name].js?[hash]' : '[name].[hash].js'
  },
  
  devtool: DEBUG ? 'source-map' : false,

  cache: DEBUG,
  debug: DEBUG,
  stats: {
    colors: true,
    reasons: DEBUG,
    hash: VERBOSE,
    version: VERBOSE,
    timings: true,
    chunks: VERBOSE,
    chunkModules: VERBOSE,
    cached: VERBOSE,
    cachedAssets: VERBOSE
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    // Create index.html
    new HtmlWebpackPlugin({
      filename: './html/index.html',
      template: './src/html/index.html'
    }),

    // Define free variables

    // Emit a file with assets paths
    new AssetsPlugin({
      path: path.join(__dirname, './build'),
      filename: 'assets.js',
      prettyPrint: true,
    }),

    // Assign the module and chunk ids by occurrence count
    // Consistent ordering of modules required if using any hashing ([hash] or [chunkhash])
    new webpack.optimize.OccurenceOrderPlugin(true)
  ],

  resolve: {
    root: path.resolve(__dirname, './src'),
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.jsx', '.json']
  },

  module: {
    loaders: [{
      test: /\.less$/,
      loaders: [
        'style',
        'css-loader?' + (DEBUG ? 'sourceMap&' : 'minimize&'),
        'postcss-loader',
        'less',
      ],
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
      loader: 'url?limit=10000'
    }, {
      test: /\.jsx?$/,
      include: [
        path.resolve(__dirname, './src'),
      ],
      loader: 'babel-loader',
    }],
  },

  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'react-with-addons': 'ReactCSSTransitionGroup'
  },

  postcss: function plugins(bundler){
    return [
      require('postcss-import')({addDependencyTo: bundler}),
      require('precss')(),
      require('autoprefixer')({ browsers: AUTOPREFIXER_BROWSERS })
    ];
  },

};



module.exports = config;



