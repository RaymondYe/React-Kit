import webpack from 'webpack';
import webpackConfig from './webpack.config';

/**
 * Bundles JavaScript, CSS and images into one or more packages
 * ready to be used in a browser.
 */

function bundle() {
	return new Promise((resolve, reject) => {
		webpack(webpackConfig).run((err, stats) => {
			if (err) {
				return reject(err);
			}
			// Output analyse file
			// require('fs').writeFileSync(webpackConfig.output.path + '/stats.json', JSON.stringify(stats.toJson()))
			console.log(stats.toString(webpackConfig.stats));
			resolve();
		});
	});
}

export default bundle;
