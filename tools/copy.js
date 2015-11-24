import path from 'path';
import Promise from 'bluebird';
import watch from './lib/watch';

/**
 * Copies static files such as robots.txt, favicon.ico to the
 * output (build) folder.
 */
async function copy() {

  const ncp = Promise.promisify(require('ncp'));

  await Promise.all([
    // Static files
    ncp('src/public', 'build/public'),
    // HTML
    ncp('src/html', 'build/html')
  ]);

  if (global.WATCH) {
    const watcher = await watch('src/html/**/*.*');
    watcher.on('changed', async (file) => {
      file = file.substr(path.join(__dirname, '../src/html/').length);
      await ncp(`src/html/${file}`, `build/html/${file}`);
    });
  }

}

export default copy;
