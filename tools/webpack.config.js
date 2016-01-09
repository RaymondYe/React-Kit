import path from 'path';
import webpack, { DefinePlugin, BannerPlugin } from 'webpack';
import merge from 'lodash.merge';
// Webpack plugin that emits a json file with assets paths.
import AssetsPlugin from 'assets-webpack-plugin';

const DEBUG = !process.argv.includes('release');
console.log('debugger:'+DEBUG);
const VERBOSE = process.argv.includes('verbose');
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
const GLOBALS = {
  'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
  '__DEV__': DEBUG
};

const config = {
  output: {
    publicPath: '/',
    sourcePrefix: '  ',
  },

  cache: DEBUG,
  debug: DEBUG,
  stats: {
    colors: true,
    reasons: DEBUG,
    hash: VERBOSE,
    version: VERBOSE,
    timings: VERBOSE,
    chunks: VERBOSE,
    chunkModules: VERBOSE,
    cached: VERBOSE,
    cachedAssets: VERBOSE
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin()
  ],

  resolve: {
    root: [],
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx', '.coffee', '.json']
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
        path.resolve(__dirname, '../src'),
      ],
      loader: 'babel-loader',
    }],
  },

  postcss: function plugins(bundler){
    return [
      require('postcss-import')({addDependencyTo: bundler}),
      require('precss')(),
      require('autoprefixer')({ browsers: AUTOPREFIXER_BROWSERS })
    ];
  },

};

// Plugins Extract Css
// config.plugins push new ExtractTextPlugin("[name].css")
// Chnage Css Loader
// loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
// loader: ExtractTextPlugin.extract("style-loader", "css-loader")

// Configuration for the client-side bundle (app.js)
const appConfig = merge({}, config, {
  entry: {
    app: './src/app.js'
  },
  output: {
    path: path.join(__dirname, '../build/public'),
    filename: DEBUG ? '[name].js' : '[name].[hash].js'
  },
  devtool: DEBUG ? 'cheap-module-eval-source-map' : false,
  plugins: [
    new DefinePlugin(GLOBALS),
    new AssetsPlugin({
      path: path.join(__dirname, '../build'),
      filename: 'assets.js',
      prettyPrint: true,
      processOutput: x => `module.exports = ${JSON.stringify(x)};`,
    }),
    ...(DEBUG ? [] : [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: VERBOSE
        }
      }),
      new webpack.optimize.AggressiveMergingPlugin()
    ])
  ]
});

export default [appConfig];
