import fs from 'fs';
import path from 'path';
import run from './run';
import clean from './clean';
import copy from './copy';
import Browsersync from 'browser-sync';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack.config';

const DEBUG = !process.argv.includes('--release');

function format(time) {
	return time.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
}

/**
 * Launches a development web server with "live reload" functionality -
 * synchronizing URLs, interactions and code changes across multiple devices.
 */
async function start() {
	await run(clean);
	await run(copy);

	let time = format(new Date());
	console.log(`[${time}] Starting 'build'...`);

	await new Promise(resolve => {

		// Patch the client-side bundler configurations
		// to enable Hot Module Replacement (HMR) and React Transform
		webpackConfig.entry = {
			app: ['webpack-hot-middleware/client'].concat(webpackConfig.entry.app)
		};

		webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
		// NoEmitOnErrorsPlugin: Use the NoEmitOnErrorsPlugin to skip the emitting phase whenever there are errors while compiling.
		// https://doc.webpack-china.org/plugins/no-emit-on-errors-plugin/
		webpackConfig.plugins.push(new webpack.NoEmitOnErrorsPlugin());

		webpackConfig
			.module
			.rules
			.filter(x => x.loader === 'babel')
			.forEach(x => (x.query = {
				...x.query,

				// Wraps all React components into arbitrary transforms
				// https://github.com/gaearon/babel-plugin-react-transform
				plugins: [
					...(x.query ? x.query.plugins : []),
					['react-transform', {
						transforms: [
							{
								transform: 'react-transform-hmr',
								imports: ['react'],
								locals: ['module'],
							}, {
								transform: 'react-transform-catch-errors',
								imports: ['react', 'redbox-react'],
							},
						],
					},
					],
				],
			}));

		// Bundler compiler
		const bundler = webpack(webpackConfig);
		const wpMiddleware = webpackMiddleware(bundler, {
			// IMPORTANT: webpack middleware can't access config,
			// so we should provide publicPath by ourselves
			publicPath: webpackConfig.output.publicPath,

			// Pretty colored output
			stats: webpackConfig.stats,

			// For other settings see
			// https://webpack.github.io/docs/webpack-dev-middleware
		});

		const hotMiddleware = webpackHotMiddleware(bundler);

		function routeMiddleware(req, res, next) {
			const url = req.url;
			const routerMap = {
				'/': 'index'
			};
			const filename = path.join(bundler.outputPath, `../content/${routerMap[url]}.html`);
			if (!routerMap[url]) {
				next();
				return;
			}

			bundler.outputFileSystem.readFile(filename, (err, result) => {
				if (err) {
					next(err);
					return;
				}
				res.setHeader('content-type', 'text/html');
				res.end(result);
			});
		}

		let handleServerBundleComplete = ()=>{
			const bs = Browsersync.create();
			const middlewareArr = [wpMiddleware, hotMiddleware, routeMiddleware];

			bs.init({
				...(DEBUG ? {} : { notify: false, ui: false }),
				server: {
					baseDir: '../dist/content',
					middleware: middlewareArr,
				},
				serveStatic: ['.', path.join(__dirname, '../dist/public/')],
				open: false,
				// no need to watch '*.js' here, webpack will take care of it for us,
				// including full page reloads if HMR won't work
				files: ['src/content/**/*.*'],
			});
		};

		bundler.plugin('done', () => {
			handleServerBundleComplete();
		});

	});

}

export default start;
