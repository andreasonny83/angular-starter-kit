/**
* angular-starter-kit
*
* @author Andrea SonnY <andreasonny83@gmail.com>
* @copyright 2016 Andrea SonnY <andreasonny83@gmail.com>
*
* This code may only be used under the MIT style license.
*
* @license MIT  https://andreasonny.mit-license.org/@2016/
*/
'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence');
var wiredep = require('wiredep').stream;
var path = require('path');
var config = require('./gulp/config.js');
var Server = require('karma').Server;
var browserSync = require('browser-sync').create();
var fallback = require('connect-history-api-fallback');

var args = require('minimist')(process.argv.slice(2));

// Replace '/' with your production base URL
//
// eg. setting baseUrl to '/subdomain/' will write your dist/index.html like this:
// <head><base href="/subdomain/">...
// The default value is set to '/'
//
// for more information: https://docs.angularjs.org/guide/$location
var baseUrl = args.base || '/';

// delete build folder
gulp.task('clean', function(done) {
  del([
    config.tmp,
    config.dist
  ], {
    dot: true
  }).then(function(paths) {
    console.log('Files and folders that would be deleted:\n', paths.join('\n'));
    done();
  });
});

gulp.task('server:dev', function() {
  browserSync.init({
    port: 8000,
    open: false,
    server: {
      baseDir: [config.src, config.tmp],
      routes: {
        '/bower_components': 'bower_components'
      },
      middleware: [
        fallback({
          index: '/index.html',
          htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'] // systemjs workaround
        })
      ]
    }
  });
});

gulp.task('server:dist', function() {
  browserSync.init({
    port: 8000,
    open: false,
    server: {
      baseDir: config.dist,
      middleware: [
        fallback({
          index: '/index.html',
          htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'] // systemjs workaround
        })
      ]
    }
  });
});

// reload all Browsers
gulp.task('reload', function() {
  gulp
  .src(config.src + '/index.html')
  .pipe(browserSync.reload);
});

// optimize images
gulp.task('images', function() {
  return gulp
    .src(config.src + '/images/**/*')
    .pipe($.imagemin({
      optimizationLevel: 7,
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest(config.dist + '/images'))
    .pipe($.size({title: 'images'}));
});

// copy fonts
gulp.task('fonts', function() {
  gulp
    .src([config.src + '/fonts/**/*'])
    .pipe(gulp.dest(config.dist + '/fonts'))
    .pipe($.size({title: 'fonts'}));
});

// SASS task, will run when any SCSS files change & BrowserSync
// will auto-update browsers
gulp.task('sass', function() {
  return gulp
    .src(config.src + '/sass/main.scss')
    .pipe($.sass({
      outputStyle: 'expanded'
    }).on('error', $.sass.logError))
    .pipe(gulp.dest(config.tmp + '/styles'))
    .pipe($.size({title: 'sass'}))
    .pipe(browserSync.stream());
});

// SASS Build task
gulp.task('sass:build', function() {
  return gulp
    .src(config.src + '/sass/**/*.scss')
    // .pipe($.sourcemaps.init())
    .pipe($.sass({
      outputStyle: 'compressed'
    }).on('error', $.sass.logError))
    .pipe($.cssnano({
      autoprefixer: {browsers: config.autoprefixer, add: true},
      safe: true
    }))
    // .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(config.tmp + '/styles'))
    .pipe($.size({title: 'sass'}));
});

gulp.task('scripts', function() {
  return gulp
    .src([
      config.src + '/app/**/*.js',
      '!**/test/**/*'
    ]);
});

// Move all script files in the .temp is required by usemin
// in order to find all the source scripts in one place
gulp.task('copy:scripts', function() {
  gulp
    .src([config.src + '/app/**/*'])
    .pipe(gulp.dest(config.tmp + '/app'));
});

gulp.task('fonts', function() {
  gulp
    .src(['bower_components/font-awesome/fonts/**/*'])
    .pipe(gulp.dest(config.dist + '/fonts'));
});

// Copy the root files from your src folder inside your dist one
gulp.task('copy:root', function() {
  gulp
    .src([
      config.src + '/.htaccess',
      config.src + '/404.html',
      config.src + '/browserconfig.xml',
      config.src + '/favicon.ico',
      config.src + '/manifest.json',
      config.src + '/manifest.webapp',
      config.src + '/robots.txt'
    ], {
      dot: true
    })
    .pipe(gulp.dest(config.dist))
    .pipe($.size({title: 'copy'}));
});

gulp.task('wiredep', function() {
  return gulp
  .src(config.src + '/index.html')
  .pipe(wiredep())
  .pipe(gulp.dest(config.src));
});

gulp.task('usemin', ['wiredep'], function() {
  return gulp
    .src(config.src + '/index.html')
    .pipe(gulp.dest(config.dist))
    .pipe($.htmlReplace({
      baseUrl: '<base href="' + baseUrl + '">',
      templates: '<script src="app/templates.js"></script>'
    }))
    .pipe(gulp.dest(config.dist))
    .pipe($.usemin({
      css: ['concat', $.cssnano({
        autoprefixer: {browsers: config.autoprefixer, add: true}
      })],
      main: [$.uglify(), 'concat']
    }))
    .pipe(gulp.dest(config.dist));
});

// minify HTML
gulp.task('htmlmin', function() {
  return gulp
    .src(config.dist + '/index.html')
    .pipe($.htmlmin({
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      minifyJS: true,
      minifyCSS: true,
      removeTagWhitespace: true,
      collapseWhitespace: true
    }))
    .pipe(gulp.dest(config.dist));
});

// make a templateCache module from all HTML files
gulp.task('templates', function() {
  return gulp
    .src('src/app/**/*.html')
    .pipe($.htmlmin({
      collapseWhitespace: true
    }))
    .pipe($.angularTemplatecache({
      module: 'app',
      root: 'app'
    }))
    .pipe(gulp.dest('.tmp/app'));
});

/**
 * watch for file changes
 */
gulp.task('watch', function() {
  gulp.watch('src/**/*.html').on('change', browserSync.reload);
  gulp.watch('src/app/**/*.js').on('change', browserSync.reload);
  gulp.watch('src/sass/**/*.scss', ['sass']);
});

/**
 * This task will build your source project in a browser & then use Gulp to watch files.
 * When a file is changed, The browser page is automatically refreshed.
 */
gulp.task('serve', function() {
  runSequence(
    'clean',
    'sass',
    'wiredep',
    'server:dev',
    'watch'
  );
});

/**
 * This task will build your source project in a browser & then use Gulp to watch files.
 * When a file is changed, The browser page is automatically refreshed.
 */
gulp.task('serve:dist', function() {
  runSequence(
    'build',
    'server:dist'
  );
});

/**
 * Build a production version
 *
 * @param  {Function} cb    Call back function
 * @param  {String}   base  Set a default base url.
 */
gulp.task('build', function(cb) {
  runSequence(
    'clean',
    ['images', 'templates', 'copy:scripts', 'copy:root'],
    ['sass:build', 'fonts'],
    'usemin',
    'htmlmin',
    cb
  );
});

/**
 * Run tests once and exit
 */
gulp.task('test', function(done) {
  new Server({
    configFile: path.join(__dirname, '/karma.conf.js'),
    singleRun: true
  }, done).start();
});

gulp.task('default', ['build']);
