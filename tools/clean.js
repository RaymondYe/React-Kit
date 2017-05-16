import del from 'del';
import fs from './lib/fs';

// Cleans up the output (dist) directory.
async function clean() {
	await del.sync(['.tmp', 'dist/*', '!dist/vendor', '!dist/.git'], { dot: true });
	await fs.makeDir('dist/public');
	await fs.makeDir('dist/content');
}

export default clean;
