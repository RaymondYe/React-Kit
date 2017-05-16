import path from 'path';
import ncp from 'ncp';

// Copies static files to the output (dist) folder.
async function copy() {
	await ncp('src/public', 'dist/public');
	await ncp('dist/vendor', 'dist/public');
}

export default copy;
