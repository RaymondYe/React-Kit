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
import {createProxyMiddleware} from 'http-proxy-middleware';

const proxyMiddleware = createProxyMiddleware('**', {
	target: 'https://www.douban.com',
	changeOrigin: true,
	logLevel: 'error'
});

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
			app: [
				'react-hot-loader/patch',
				'react-error-overlay',
				'webpack-hot-middleware/client?name=client&reload=true'
			].concat(webpackConfig.entry.app)
		};
		webpackConfig.module.rules.find(
			x => {
				let use = x.use[0];
				if (use.loader === 'babel-loader') {
					use.options.plugins = ['react-hot-loader/babel'].concat(use.options.plugins || []);
				}
		});

		webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

		// Bundler compiler
		const bundler = webpack(webpackConfig);
		const wpMiddleware = webpackMiddleware(bundler, {
			// IMPORTANT: webpack middleware can't access config,
			// so we should provide publicPath by ourselves
			publicPath: webpackConfig.output.publicPath,

			// Pretty colored output
			stats: webpackConfig.stats,

			// quiet: true
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

		let isBrowsersyncCreated = false;
		let handleServerBundleComplete = ()=>{
			const bs = Browsersync.create();
			const middlewareArr = [wpMiddleware, hotMiddleware, routeMiddleware];
			middlewareArr.push(proxyMiddleware);
			bs.init({
				...(DEBUG ? { notify: false } : { notify: false, ui: false }),
				server: {
					baseDir: '../dist/content',
					middleware: middlewareArr,
				},
				serveStatic: ['.', path.join(__dirname, '../dist/public/')],
				open: false,
				reload: false,
				// no need to watch '*.js' here, webpack will take care of it for us,
				// including full page reloads if HMR won't work
				files: ['src/content/**/*.*'],
			});
		};

		bundler.plugin('done', () => {
			if (isBrowsersyncCreated) return;
			handleServerBundleComplete();
			isBrowsersyncCreated = true;
		});

	});

}

export default start;
