import webpack from 'webpack';
import webpackConfig from './webpack.dll';

function bundle() {
	return new Promise((resolve, reject) => {
		webpack(webpackConfig).run((err, stats) => {
			if (err) {
				return reject(err);
			}
			console.log(stats.toString(webpackConfig.stats));
			resolve();
		});
	});
}

export default bundle;
