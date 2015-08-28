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

//
// Common configuration chunk to be used for both
// client-side (app.js) and server-side (server.js) bundles
// -----------------------------------------------------------------------------

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
  //后缀名的自动补全
  resolve: {
    root: [],
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx', '.coffee', '.cjsx']
  },
  // 配置loader
  // 用 ! 来连接多个人 loader
  module: {
    loaders: [{
      test: /\.txt/,
      loader: 'file?name=[path][name].[ext]'
    }, {
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
    }, {
      test: /\.coffee$/,
      loader: 'coffee'
    }, {
      test: /\.cjsx$/,
      include: [
        path.resolve(__dirname, '../src')
      ],
      loader: 'react-hot!coffee-jsx'
    }]
  },
  postcss: [
    require('postcss-nested')(),
    require('cssnext')(),
    require('autoprefixer-core')(AUTOPREFIXER_BROWSERS)
  ]
};

//
// Configuration for the client-side bundle (app.js)
// -----------------------------------------------------------------------------

const appConfig = merge({}, config, {
  entry: [...(WATCH ? [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client'] : []),
    './src/app.js'
  ],
  //指向 Webpack 编译能的资源位置
  output: {
    path: path.join(__dirname, '../build/public'),
    filename: 'app.js'
  },
  devtool: DEBUG ? 'source-map' : false,

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
  ],
  module: {
    loaders: [...config.module.loaders, {
      test: /\.css$/,
      loader: `${STYLE_LOADER}!${CSS_LOADER}!postcss-loader`
    }]
  }
});

export default [appConfig];
