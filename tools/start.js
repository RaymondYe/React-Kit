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
        app: ['webpack-hot-middleware/client', './src/app.js']
      };
      config.plugins.push(new webpack.HotModuleReplacementPlugin());
      config.plugins.push(new webpack.NoErrorsPlugin());
      // config.module.loaders
      //   .filter(x => x.loader === 'babel-loader')
      //   .forEach(x => x.query ={
      //     // Wraps all React components into arbitrary transforms
      //     // https://github.com/gaearon/babel-plugin-react-transform
      //     plugins: ['react-transform'],
      //     extra: {
      //       'react-transform': {
      //         transform: [{
      //           transform: 'react-transform-hmr',
      //           imports: ['react'],
      //           locals: ['module'],
      //         }, {
      //           transform: 'react-transform-catch-errors',
      //           imports: ['react', 'redbox-react'],
      //         }]
      //       }
      //     }
      //   });

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
    const hotMiddlewares = bundler.compilers
      .filter(compiler => compiler.options.target !== 'none')
      .map(compiler => webpackHotMiddleware(compiler));

    let handleServerBundleComplete = () => {
      console.log('Complete');
    };

    const defaultPath = "./build/html";
    const staticRoutes = {
      '/app.js': './build/public/app.js',
      '/img':'./build/public/img'
    };

    Browsersync({
      server: {
        baseDir: defaultPath,
        routes: staticRoutes,
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
