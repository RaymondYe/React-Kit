import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack, { DefinePlugin, BannerPlugin } from 'webpack';
import merge from 'lodash.merge';

// Webpack plugin that emits a extraxt css.
import ExtractTextPlugin from 'extract-text-webpack-plugin';

// Webpack plugin that emits a json file with assets paths.
import AssetsPlugin from 'assets-webpack-plugin';

const DEBUG = !process.argv.includes('release');
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
    timings: true,
    chunks: VERBOSE,
    chunkModules: VERBOSE,
    cached: VERBOSE,
    cachedAssets: VERBOSE
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin()
  ],

  resolve: {
    root: path.resolve(__dirname, '../src'),
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.jsx', '.json']
  },

  module: {
    loaders: [{
      test: /\.less$/,
      loader: ExtractTextPlugin.extract([
        'css-loader?' + (DEBUG ? 'sourceMap&' : 'minimize&'),
        'postcss-loader',
        'less',
      ]),
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

  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  },

  postcss: function plugins(bundler){
    return [
      require('postcss-import')({addDependencyTo: bundler}),
      require('precss')(),
      require('autoprefixer')({ browsers: AUTOPREFIXER_BROWSERS })
    ];
  },

};


// Configuration for the client-side bundle (app.js)
const appConfig = merge({}, config, {
  entry: {
    app: './src/app.js'
  },

  output: {
    path: path.join(__dirname, '../build/public'),
    filename: DEBUG ? '[name].js?[hash]' : '[name].[hash].js'
  },

  // Choose a developer tool to enhance debugging
  // http://webpack.github.io/docs/configuration.html#devtool
  devtool: DEBUG ? 'source-map' : false,

  // https://github.com/sporto/assets-webpack-plugin
  plugins: [
    // Create index.html
    new HtmlWebpackPlugin({
      filename: '../index.html',
      template: 'src/html/index.html'
    }),
    
    //  Extraxt Css
    new ExtractTextPlugin("app.css"),

    // Define free variables
    new DefinePlugin(GLOBALS),

    // Emit a file with assets paths
    new AssetsPlugin({
      path: path.join(__dirname, '../build'),
      filename: 'assets.js',
      prettyPrint: true,
      processOutput: x => `module.exports = ${JSON.stringify(x)};`,
    }),

    // Assign the module and chunk ids by occurrence count
    // Consistent ordering of modules required if using any hashing ([hash] or [chunkhash])
    new webpack.optimize.OccurenceOrderPlugin(true),
    ...(DEBUG ? [] : [

      // Search for equal or similar files and deduplicate them in the output
      new webpack.optimize.DedupePlugin(),

      // Minimize all JavaScript output of chunks
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: VERBOSE
        }
      }),

      // A plugin for a more aggressive chunk merging strategy
      new webpack.optimize.AggressiveMergingPlugin()
    ])
  ]
});

export default [appConfig];
