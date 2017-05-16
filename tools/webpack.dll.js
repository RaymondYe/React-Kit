import webpack from 'webpack';
import path from 'path';

const DEBUG = !process.argv.includes('--release');
const vendor = [
  "react",
  "react-dom",
  "whatwg-fetch"
];
const GLOBALS = {
  'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
  '__DEV__': DEBUG
};
const isMin = DEBUG ? '' : '.min';

const config = {
  entry:{
    vendor: vendor
  },
  output:{
    filename: DEBUG ? '[name].dll.js' : '[name].dll.min.js',
    path: path.join(__dirname, '../dist/vendor'),
    library:"[name]"
  },
  plugins:[
    new webpack.DefinePlugin(GLOBALS),
    new webpack.DllPlugin({
      path: path.resolve( __dirname, '../dist/vendor/[name]-manifest'+isMin+'.json'),
      name: "[name]"
    }),
    ...(DEBUG ? [] : [new webpack.optimize.UglifyJsPlugin()])
  ]
}

export default config
