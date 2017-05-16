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
import proxy from 'http-proxy-middleware';

const DEBUG = !process.argv.includes('--release');

function format(time) {
	return time.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
}

const proxyMiddleware = proxy('**', {
	target: 'http://localhost:8080',
	changeOrigin: true,
	logLevel: 'error'
});

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
		// webpackConfig.entry = {
		// 	spa: ['webpack-hot-middleware/client'].concat(webpackConfig.entry.spa),
		// };

		webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
		webpackConfig.plugins.push(new webpack.NoErrorsPlugin());

		webpackConfig
			.module
			.loaders
			.filter(x => x.loader === 'babel')
			.forEach(x => (x.query = {
				...x.query,

				// Wraps all React components into arbitrary transforms
				// https://github.com/gaearon/babel-plugin-react-transform
				plugins: [
					...(x.query ? x.query.plugins : []),
					// ['react-transform', {
					// 	transforms: [
					// 		{
					// 			transform: 'react-transform-hmr',
					// 			imports: ['react'],
					// 			locals: ['module'],
					// 		}, {
					// 			transform: 'react-transform-catch-errors',
					// 			imports: ['react', 'redbox-react'],
					// 		},
					// 	],
					// },
					// ],
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
				'/': 'spa'
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
			const middlewareArr = [wpMiddleware, hotMiddleware];
			// middlewareArr.push(routeMiddleware);
			middlewareArr.push(proxyMiddleware);

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
				port: 5003
			});
		};

		let createHtml = (cb)=> {
			var filename = path.join(bundler.outputPath, '../content/spa.html');
			bundler.outputFileSystem.readFile(filename, function(err, result){
				if (err) {
					return console.log(err);
				}
				let serverPath = path.join(__dirname, '../../../Rabbitpre2/RP-server/assets/dist/');
				let out = fs.createWriteStream(`${serverPath}/spa.html`, 'utf-8');
				out.write(result);
				out.end();
			});
		};

		let runed = false;
		bundler.plugin('done', () => {
			createHtml();
			if (runed) return;
			runed = true;
			handleServerBundleComplete();
		});

	});

}

export default start;
