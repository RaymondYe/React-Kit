import browserSync from 'browser-sync';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

global.WATCH = true;
const webpackConfig = require('./webpack.config')[0];
const bundler = webpack(webpackConfig);

/**
 * Launches a development web server with "live reload" functionality -
 * synchronizing URLs, interactions and code changes across multiple devices.
 */

async function start() {

  await require('./build')();
  const defaultPath = "./build/html";
  const staticRoutes = {
    '/app.js': './build/public/app.js',
    '/img':'./build/public/img'
  };

  browserSync({
    server: {
      baseDir: defaultPath,
      routes: staticRoutes,
      middleware: [
        webpackDevMiddleware(bundler, {
          // IMPORTANT: dev middleware can't access config, so we should
          // provide publicPath by ourselves
          publicPath: webpackConfig.output.publicPath,

          // pretty colored output
          stats: webpackConfig.stats,

          hot: true,
          historyApiFallback: true

          // for other settings see
          // http://webpack.github.io/docs/webpack-dev-middleware.html
        }),

        // bundler should be the same as above
        webpackHotMiddleware(bundler)
      ]
    },

    // no need to watch '*.js' here, webpack will take care of it for us,
    // including full page reloads if HMR won't work
    files: [
      'build/public/**/*.css',
      'build/html/*.html',
    ]
  });
}

export default start;
