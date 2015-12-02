import path from 'path';
import Promise from 'bluebird';
import watch from './lib/watch';
import ncp from 'ncp';

/**
 * Copies static files to the
 * output (build) folder.
 */
async function copy() {

  await ncp('src/public', 'build/public');
  await ncp('src/html', 'build/html');

  if (global.WATCH) {

    const watcher = await watch('src/html/**/*.*');

    watcher.on('changed', async (file) => {
      file = file.substr(path.join(__dirname, '../src/html/').length);
      await ncp(`src/html/${file}`, `build/html/${file}`);
    });

  }

}

export default copy;
