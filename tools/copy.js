import path from 'path';
import copy from './lib/copy';
import watch from './lib/watch';

/**
 * Copies static files such as robots.txt, favicon.ico to the
 * output (build) folder.
 */
export default async () => {
  console.log('copy');
  await Promise.all([
    // Static files
    copy('src/public', 'build/public'),

    // HTML
    copy('src/html', 'build/html')
  ]);

  if (global.WATCH) {
    const watcher = await watch('src/html/**/*.*');
    watcher.on('changed', async (file) => {
      file = file.substr(path.join(__dirname, '../src/html/').length);
      await copy(`src/html/${file}`, `build/html/${file}`);
    });
  }

};
