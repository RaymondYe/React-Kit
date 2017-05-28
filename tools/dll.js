import del from 'del';
import path from 'path';
import webpack from 'webpack';
import webpackConfig from './webpack.dll';

// Build DLL bundles improving caching for webpack
async function dll() {
	// Create vendor DLL
	await del.sync(['assets/vendor/*']);

	// Create production DLL
	await buildDll(webpackConfig);

	// Creat development DLL
	process.argv.push('--release');
	delete require.cache[path.resolve(__dirname, './webpack.dll.js')];
	const config = require('./webpack.dll').default;
	await buildDll(config);
}

async function buildDll(config) {
	return new Promise((resolve, reject) => {
		webpack(config).run((err, stats) => {
			if (err) {
				return reject(err);
			}
			console.log(stats.toString(config.stats));
			resolve();
		});
	});
}

export default dll;
