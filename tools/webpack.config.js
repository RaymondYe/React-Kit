import path from 'path';
import webpack, { DefinePlugin, BannerPlugin } from 'webpack';
import merge from 'lodash/object/merge';

const DEBUG = !process.argv.includes('release');
const WATCH = global.WATCH === undefined ? false : global.WATCH;
const VERBOSE = process.argv.includes('verbose');

const STYLE_LOADER = 'style-loader/useable';
const CSS_LOADER = DEBUG ? 'css-loader' : 'css-loader?minimize';
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
    sourcePrefix: '  '
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
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx', '.coffee', '.cjsx']
  },

  module: {
    loaders: [{
      test: /\.less$/,
      loader: 'style!css!postcss-loader!less'
    }, {
      test: /\.gif/,
      loader: 'url?limit=10000&mimetype=image/gif'
    }, {
      test: /\.jpg/,
      loader: 'url?limit=10000&mimetype=image/jpg'
    }, {
      test: /\.png/,
      loader: 'url?limit=10000&mimetype=image/png'
    }, {
      test: /\.svg/,
      loader: 'url?limit=10000&mimetype=image/svg+xml'
    }, {
      test: /\.jsx?$/,
      include: [
        path.resolve(__dirname, '../src')
      ],
      loaders: [...(WATCH ? ['react-hot'] : []), 'babel']
    },{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel"}]
  },
  postcss: [
    require('postcss-nested')(),
    require('cssnext')(),
    require('autoprefixer-core')(AUTOPREFIXER_BROWSERS)
  ]
};

// Plugins Extract Css
// config.plugins push new ExtractTextPlugin("[name].css")
// Chnage Css Loader
// loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
// loader: ExtractTextPlugin.extract("style-loader", "css-loader")

// Configuration for the client-side bundle (app.js)
const appConfig = merge({}, config, {
  entry: {
    app: [
      ...(WATCH ? ['webpack/hot/dev-server', 'webpack-hot-middleware/client'] : []),
      './src/app.js',
    ],
  },
  output: {
    path: path.join(__dirname, '../build/public'),
    filename: DEBUG ? '[name].js' : '[name].[hash].js'
  },
  devtool: DEBUG ? 'cheap-module-eval-source-map' : false,
  plugins: [
    ...config.plugins,
    new DefinePlugin(merge({}, GLOBALS, {'__SERVER__': false})),
    ...(DEBUG ? [] : [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({compress: {warnings: VERBOSE}}),
      new webpack.optimize.AggressiveMergingPlugin()
    ]),
    ...(WATCH ? [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ] : [])
  ]
});

export default [appConfig];
