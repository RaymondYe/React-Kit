import path from 'path';
import watch from './lib/watch';
import ncp from 'ncp';

// Copies static files to the output (build) folder.
async function copy() {

  await ncp('src/public', 'build/public');

}

module.exports = copy;
