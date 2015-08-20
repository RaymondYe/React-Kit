var gulp = require("gulp");
var path = require("path");
var cp = require("child_process");
var gulpLoadPlugins = require("gulp-load-plugins");
var del = require("del");
var minimist = require("minimist");
var mkdirp = require("mkdirp");
var runSequence = require("run-sequence");
var webpack = require("webpack");
var gutil = require("gulp-util");
var config = require('./webpack.config.js');

var $ = gulpLoadPlugins();
var argv = minimist(process.argv.slice(2));
var src = Object.create(null);


var watch = false;
var browserSync;

// The default task
gulp.task('default', ['sync', 'build:watch']);
gulp.task('release', ['sync', 'build:watch']);

// Clean output directory
gulp.task('clean', function(cb) {
  del(['.tmp', 'build/*', '!build/.git'], {
    dot: true
  }, function() {
    mkdirp('build/public', cb);
  });
});

// Static files
gulp.task('assets', function() {
  src.assets = 'src/public/**';
  return gulp.src(src.assets)
    .pipe($.changed('build/public'))
    .pipe(gulp.dest('build/public'))
    .pipe($.size({
      title: 'assets'
    }));
});

// Resource files
gulp.task('resources', function() {
  src.resources = [
    'src/html*/**'
  ];
  return gulp.src(src.resources)
    .pipe($.changed('build'))
    .pipe(gulp.dest('build'))
    .pipe($.size({
      title: 'resources'
    }));
});

// Bundle
gulp.task('bundle', function(cb) {

  var bundler = webpack(config);
  var verbose = !!argv.verbose;
  var bundlerRunCount = 0;

  function bundle(err, stats) {
    if (err) {
      throw new $.util.PluginError('webpack', err);
    }

    console.log(stats.toString({
      colors: $.util.colors.supportsColor,
      hash: verbose,
      version: verbose,
      timings: verbose,
      chunks: verbose,
      chunkModules: verbose,
      cached: verbose,
      cachedAssets: verbose
    }));

    if (++bundlerRunCount === (watch ? config.length : 1)) {
      return cb();
    }
  }

  if (watch) {
    bundler.watch(200, bundle);
  } else {
    bundler.run(bundle);
  }
});

// Build the app from source code
gulp.task('build', ['clean'], function(cb) {
  runSequence(['assets', 'resources'], ['bundle'], cb);
});

// Build and start watching 43 modifications
gulp.task('build:watch', function(cb) {

  watch = true;

  runSequence('build', function() {
    gulp.watch(src.assets, ['assets']);
    gulp.watch(src.resources, ['resources']);
    cb();
  });

});

gulp.watch(['src/html/index.html'], ['resources']);

// Launch BrowserSync development server
gulp.task('sync', function(cb) {

  browserSync = require('browser-sync');

  defaultPath = "./build/html";
  staticRoutes = {
    '/app.js': './build/public/app.js',
    '/img':'./build/public/img'
  };

  browserSync({
    server: {
      baseDir: defaultPath,
      routes: staticRoutes
    }
  }, cb);

  process.on('exit', function() {
    browserSync.exit();
  });

  gulp.watch(['build/**/*.*'], function(file) {
    browserSync.reload(path.relative(__dirname, file.path));
  });

});