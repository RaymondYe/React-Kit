import del from 'del';
import mkdirp from 'mkdirp'

// Cleans up the output (build) directory.
async function clean() {
  await del.sync(['.tmp', 'build/*', '!build/.git'], { dot: true });
  await mkdirp('build/public');
  await mkdirp('build/html');
}

export default clean;
