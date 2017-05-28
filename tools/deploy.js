import run from './run';
import cdn from './cdn';
import path from 'path';
import ncp from 'ncp';

async function deploy() {
	process.argv.push('--release');
	const build = require('./build');
	const serverPath = path.join(__dirname, '../assets');
	const contentPath = path.join(__dirname, '../dist/content');

	await run(build);
	await run(cdn);
	await ncp(contentPath, serverPath, function(err) {
		if (err) {
			return console.error(err);
		}
	});
}

export default deploy;
