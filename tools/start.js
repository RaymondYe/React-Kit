import Browsersync from 'browser-sync';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack.config';

global.WATCH = true;

/**
 * Launches a development web server with "live reload" functionality -
 * synchronizing URLs, interactions and code changes across multiple devices.
 */
async function start() {
  await require('./build')();

  await new Promise(resolve => {

    // Patch the client-side bundler configurations
    // to enable Hot Module Replacement (HMR) and React Transform
    webpackConfig.filter(x => x.target !== 'none').forEach(config => {

      config.entry = {
        app: ['webpack-hot-middleware/client', './src/app.js', 'babel-polyfill']
      };
      config.plugins.push(new webpack.HotModuleReplacementPlugin());
      config.plugins.push(new webpack.NoErrorsPlugin());

    });

    const bundler = webpack(webpackConfig);
    const wpMiddleware = webpackMiddleware(bundler, {
      // IMPORTANT: webpack middleware can't access config,
      // so we should provide publicPath by ourselves
      publicPath: webpackConfig[0].output.publicPath,

      // Pretty colored output
      stats: webpackConfig[0].stats,

      // For other settings see
      // https://webpack.github.io/docs/webpack-dev-middleware
    });

    const hotMiddlewares = bundler
      .compilers
      .filter(compiler => compiler.options.target !== 'none')
      .map(compiler => webpackHotMiddleware(compiler));

    let handleServerBundleComplete = () => {

    };

    const bs = Browsersync.create();

    bs.init({
      server: {
        baseDir: "./build/html",
        routes: {
          '/': './build/public',
        },
        middleware: [wpMiddleware, ...hotMiddlewares]
      },
      // no need to watch '*.js' here, webpack will take care of it for us,
      // including full page reloads if HMR won't work
      files: [
        'build/public/**/*.css',
        'build/html/*.html',
      ]
    });

    bundler.plugin('done', () => handleServerBundleComplete());

  });

}

module.exports = start;
