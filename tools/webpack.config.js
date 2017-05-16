import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack, { DefinePlugin } from 'webpack';
import extend from 'extend';

// Webpack plugin that emits a extraxt css.
import ExtractTextPlugin from 'extract-text-webpack-plugin';

// Webpack plugin that emits a json file with assets paths.
import AssetsPlugin from 'assets-webpack-plugin';

const DEBUG = !process.argv.includes('--release');
const VERBOSE = process.argv.includes('--verbose');

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

const srcPath = path.resolve(__dirname, '../src');
const alias = {};
['action', 'components', 'reducers', 'styles', 'utils'].map((el, index)=>{
  alias[el] = path.resolve(srcPath, el);
});

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
  // http://webpack.github.io/docs/configuration.html#devtool
  devtool: DEBUG ? 'cheap-source-map' : false,

  resolve: {
    alias: alias,
    modules: [srcPath, 'node_modules'],
    extensions: ['.js', '.jsx', '.json']
  },

  module: {
    rules: [{
      test: /\.less$/,
      use: DEBUG ?
        [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: function(ctx) {
                return [
                  require('postcss-import')({addDependencyTo: ctx.webpack}),
                  require('precss')(),
                  require('autoprefixer')({ browsers: AUTOPREFIXER_BROWSERS })
                ]
              }
            }
          },
          'less-loader'
        ]
        : ExtractTextPlugin.extract({
          use: [{
            loader: 'css-loader',
            query: {
              minimize: true
            }
          }, {
            loader: 'postcss-loader',
            options: {
              plugins: function(ctx) {
                return [
                  require('postcss-import')({addDependencyTo: ctx.webpack}),
                  require('precss')(),
                  require('autoprefixer')({ browsers: AUTOPREFIXER_BROWSERS })
                ]
              }
            }
          },
          'less-loader'],
          publicPath: '../'
      }),
    }, {
      test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: DEBUG ? '[path][name].[ext]?[hash]' : 'img/[hash].[ext]'
        }
      }]
    }, {
      test: /\.(eot|ttf|wav|mp3)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: DEBUG ? '[path][name].[ext]?[hash]' : '[hash].[ext]',
        }
      }]
    }, {
      test: /\.jsx?$/,
      exclude: [
        path.resolve(__dirname, "../node_modules")
      ],
      include: [
        srcPath,
      ],
      use: [{
        loader: 'babel-loader',
        options: {
          // https://github.com/babel/babel-loader#options
          cacheDirectory: DEBUG,
          // https://babeljs.io/docs/usage/options/
          babelrc: false,
          presets: [
            'react',
            'es2015',
            'stage-0',
          ],
          // http://babeljs.io/docs/plugins/
          plugins: [
            'transform-runtime',
            ...DEBUG ? [] : [
              'transform-react-remove-prop-types',
              'transform-react-constant-elements'
              //http://lukecod.es/2016/03/14/react-invariant-violation-minified-exception-ios8-webpack-babel/
              // 'transform-react-inline-elements',
            ]
          ]
        }
      }],
    }],
  },

  // https://github.com/sporto/assets-webpack-plugin
  plugins: [
    // Create html
    new HtmlWebpackPlugin({
      filename: '../content/index.html',
      template: 'src/content/index.html',
      usemin: DEBUG ? '' : '.min',
      minify: DEBUG ? false : {
        removeComments: true,
        collapseWhitespace: true
      }
    }),

    new webpack.ProvidePlugin({
      React: 'react'
    }),

    // Use Dll Reference
    new webpack.DllReferencePlugin({
      context: '.',
      manifest: require( '../dist/vendor/vendor-manifest'+(DEBUG ? '' : '.min')+'.json' )
    }),

    // Define free variables
    new DefinePlugin(GLOBALS),

    // Emit a file with assets paths
    new AssetsPlugin({
      path: path.join(__dirname, '../dist'),
      filename: 'assets.js',
      prettyPrint: true,
      processOutput: x => `module.exports = ${JSON.stringify(x)};`,
    }),

    ...(DEBUG ? [] : [

      //  Extraxt Css
      new ExtractTextPlugin({
        filename: "css/[name].[contenthash].css",
        allChunks: true
      }),

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

};

export default config;
