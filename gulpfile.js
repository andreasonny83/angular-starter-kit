 /**
  * angular-boilerplate
  *
  * @author Andrea SonnY <andreasonny83@gmail.com>
  * @copyright 2016 Andrea SonnY <andreasonny83@gmail.com>
  * @version v1.0.2
  * @license MIT http://andreasonny.mit-license.org
  */

'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence');
var openURL = require('open');
var stylish = require('jshint-stylish');
var wiredep = require('wiredep').stream;
var path = require('path');
var Server = require('karma').Server;

var args = require('minimist')(process.argv.slice(2));

// Replace '/' with your production base URL
//
// eg. setting baseUrl to '/subdomain/' will write your _build/index.html like this:
// <head><base href="/subdomain/">...
// The default value is set to '/'
//
// for more information: https://docs.angularjs.org/guide/$location
var baseUrl = args.base || '/';

var AUTOPREFIXER = [
  'last 2 versions',
  'safari >= 7',
  'ie >= 9',
  'ff >= 30',
  'ios 6',
  'android 4'
];

gulp.task('open', function() {
  openURL('http://localhost:9000/');
});

gulp.task('start:server', ['open'], function() {
  $.connect.server({
    root: ['src', '.tmp'],
    port: 9000,
    livereload: true,
    middleware: function(connect) {
      return [connect()
        .use('/bower_components', connect.static('bower_components'))
      ];
    }
  });
});

gulp.task('build:serve', function() {
  openURL('http://localhost:9001/');

  $.connect.server({
    root: ['_build'],
    port: 9001,
    livereload: true
  });
});

// reload all Browsers
gulp.task('reload', function() {
  gulp.src('src/index.html')
  .pipe($.connect.reload());
});

// optimize images
gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe($.changed('_build/images'))
    .pipe($.imagemin({
      optimizationLevel: 7,
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('_build/images'))
    .pipe($.size({title: 'images'}));
});

// copy fonts
gulp.task('fonts', function() {
  gulp.src(['src/fonts/**/*'])
    .pipe(gulp.dest('_build/fonts'))
    .pipe($.size({title: 'fonts'}));
});

// delete build folder
gulp.task('clean', function() {
  del([
    '_build/',
    '.tmp/'
  ], {
    dot: true
  });
});

// SASS task, will run when any SCSS files change & BrowserSync
// will auto-update browsers
gulp.task('sass', function() {
  return gulp.src('src/sass/main.scss')
    .pipe($.sass({
      outputStyle: 'expanded'
    }).on('error', $.sass.logError))
    .pipe(gulp.dest('.tmp/styles'))
    .pipe($.connect.reload({
      stream: true
    }))
    .pipe($.notify({
      message: 'Styles task complete'
    }))
    .pipe($.size({title: 'sass'}));
});

// SASS Build task
gulp.task('sass:build', function() {
  return gulp.src('src/sass/**/*.scss')
    // .pipe($.sourcemaps.init())
    .pipe($.sass({
      outputStyle: 'compressed'
    }).on('error', $.sass.logError))
    // uncomment to run gulp-uncss
    //
    // .pipe($.uncss({
    //   html: ['src/index.html']
    // }))
    .pipe($.cssnano({
      autoprefixer: {browsers: AUTOPREFIXER, add: true},
      safe: true
    }))
    // .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('.tmp/styles'))
    .pipe($.size({title: 'sass'}));
});

gulp.task('scripts', function() {
  return gulp.src([
    'src/app/**/*.js',
    '!**/test/**/*'
  ]).pipe($.jshint())
    .pipe($.jshint.reporter(stylish))
    .pipe($.connect.reload());
});

// Move all script files in the .temp is required by usemin
// in order to find all the source scripts in one place
gulp.task('copy:scripts', function() {
  gulp.src(['src/app/**/*'])
    .pipe(gulp.dest('.tmp/app'));
});

// Copy the root files from your src folder inside your _build one
gulp.task('copy:root', function() {
  gulp.src([
    'src/.htaccess',
    'src/404.html',
    'src/browserconfig.xml',
    'src/favicon.ico',
    'src/manifest.json',
    'src/manifest.webapp',
    'src/robots.txt'
  ], {
    dot: true
  }).pipe(gulp.dest('_build'))
    .pipe($.size({title: 'copy'}));
});

gulp.task('wiredep', function() {
  return gulp.src('src/index.html')
  .pipe(wiredep())
  .pipe(gulp.dest('src/'));
});

gulp.task('usemin', ['wiredep'], function() {
  return gulp.src('src/index.html')
    .pipe(gulp.dest('_build/'))
    .pipe($.htmlReplace({
      baseUrl: '<base href="' + baseUrl + '">',
      templates: '<script src="app/templates.js"></script>'
    }))
    .pipe(gulp.dest('_build/'))
    .pipe($.usemin({
      css: ['concat', $.cssnano({
        autoprefixer: {browsers: AUTOPREFIXER, add: true}
      })],
      main: [$.jshint(), $.jshint.reporter(stylish), $.uglify(), 'concat']
    }))
    .pipe(gulp.dest('_build/'));
});

// minify HTML
gulp.task('htmlmin', function() {
  return gulp.src('_build/index.html')
    .pipe($.htmlmin({
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      minifyJS: true,
      minifyCSS: true,
      removeTagWhitespace: true,
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('_build/'));
});

// make a templateCache module from all HTML files
gulp.task('templates', function() {
  return gulp.src('src/app/**/*.html')
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
 * This task will build your source project in a browser & then use Gulp to watch files.
 * When a file is changed, The browser page is automatically refreshed.
 */
gulp.task('serve', ['clean'], function() {
  runSequence(
    'start:server',
    'sass',
    'wiredep',
    function() {
      gulp.watch('src/**/*.html', ['reload']);
      gulp.watch('src/app/**/*.js', ['scripts']);
      gulp.watch('src/sass/**/*.scss', ['sass']);
    }
  );
});

/**
 * Build a production version
 *
 * @param  {Function} cb    Call back function
 * @param  {String}   base  Set a default base url.
 */
gulp.task('build', ['clean'], function(cb) {
  runSequence(
    ['images', 'templates', 'copy:scripts', 'copy:root'],
    'sass:build',
    'usemin',
    'htmlmin',
    cb
  );
});

gulp.task('default', ['build']);

/**
 * Run tests once and exit
 */
gulp.task('test', function(done) {
  new Server({
    configFile: path.join(__dirname, '/karma.conf.js'),
    singleRun: true
  }, done).start();
});
