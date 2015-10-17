/**
 * @author  SonnY <andreasonny83@gmail.com>
 * @license MIT
 */
var gulp            = require('gulp'),
    $               = require('gulp-load-plugins')(),
    del             = require('del'),
    runSequence     = require('run-sequence'),
    browserSync     = require('browser-sync'),
    reload          = browserSync.reload,
    ftp             = require('vinyl-ftp'),
    minimist        = require('minimist'),
    gutil           = require('gulp-util');

var args       = minimist(process.argv.slice(2));
var remoteHost = 'remotehost.com';
var remotePath = '/public_html/test/';

// optimize images
gulp.task('images', function() {
  return gulp.src('./images/**/*')
    .pipe($.changed('./_build/images'))
    .pipe($.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('./_build/images'));
});

// browser-sync task, only cares about compiled CSS
gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: "./"
    }
  });
});

// minify JS
gulp.task('minify-js', function() {
  gulp.src('js/*.js')
    .pipe($.uglify())
    .pipe(gulp.dest('./_build/'));
});

// minify CSS
gulp.task('minify-css', function() {
  gulp.src(['./styles/**/*.css', '!./styles/**/*.min.css'])
    .pipe($.rename({suffix: '.min'}))
    .pipe($.minifyCss({keepBreaks:true}))
    .pipe(gulp.dest('./styles/'))
    .pipe(gulp.dest('./_build/css/'));
});

// minify HTML
gulp.task('minify-html', function() {
  var opts = {
    comments: true,
    spare: true,
    conditionals: true
  };

  gulp.src('./*.html')
    .pipe($.minifyHtml(opts))
    .pipe(gulp.dest('./_build/'));
});

// copy fonts from a module outside of our project (like Bower)
gulp.task('fonts', function() {
  gulp.src('./fonts/**/*.{ttf,woff,eof,eot,svg}')
    .pipe($.changed('./_build/fonts'))
    .pipe(gulp.dest('./_build/fonts'));
});

// start webserver
gulp.task('server', function(done) {
  return browserSync({
    server: {
      baseDir: './'
    }
  }, done);
});

// start webserver from _build folder to check how it will look in production
gulp.task('server-build', function(done) {
  return browserSync({
    server: {
      baseDir: './_build/'
    }
  }, done);
});

// delete build folder
gulp.task('clean:build', function (cb) {
  del([
    './_build/'
  ], cb);
});

// concat files
gulp.task('concat', function() {
  gulp.src('./js/*.js')
    .pipe($.concat('scripts.js'))
    .pipe(gulp.dest('./_build/'));
});

// SASS task, will run when any SCSS files change & BrowserSync
// will auto-update browsers
gulp.task('sass', function() {
  return gulp.src('styles/style.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      style: 'expanded'
    }))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('styles'))
    .pipe(reload({
      stream: true
    }))
    .pipe($.notify({
      message: 'Styles task complete'
    }));
});

// SASS Build task
gulp.task('sass:build', function() {
  return gulp.src('styles/style.scss')
    .pipe($.sass({
      style: 'compact'
    }))
    .pipe($.autoprefixer('last 3 version'))
    .pipe($.uncss({
      html: ['./index.html', './views/**/*.html', './components/**/*.html'],
      ignore: [
        '.index',
        '.slick'
      ]
    }))
    .pipe($.minifyCss({
      keepBreaks: true,
      aggressiveMerging: false,
      advanced: false
    }))
    .pipe($.rename({suffix: '.min'}))
    .pipe(gulp.dest('_build/css'));
});

// index.html build
// script/css concatenation
gulp.task('usemin', function() {
  return gulp.src('./index.html')
    // add templates path
    .pipe($.htmlReplace({
      'templates': '<script type="text/javascript" src="js/templates.js"></script>'
    }))
    .pipe($.usemin({
      css: [$.minifyCss(), 'concat'],
      libs: [$.uglify()],
      nonangularlibs: [$.uglify()],
      angularlibs: [$.uglify()],
      appcomponents: [$.uglify()],
      mainapp: [$.uglify()]
    }))
    .pipe(gulp.dest('./_build/'));
});

// make templateCache from all HTML files
gulp.task('templates', function() {
  return gulp.src([
      './**/*.html',
      '!bower_components/**/*.*',
      '!node_modules/**/*.*',
      '!_build/**/*.*'
    ])
    .pipe($.minifyHtml())
    .pipe($.angularTemplatecache({
      module: 'boilerplate'
    }))
    .pipe(gulp.dest('_build/js'));
});

// reload all Browsers
gulp.task('bs-reload', function() {
  browserSync.reload();
});

// default task to be run with `gulp` command
// this default task will run BrowserSync & then use Gulp to watch files.
// when a file is changed, an event is emitted to BrowserSync with the filepath.
gulp.task('default', ['browser-sync', 'sass', 'minify-css'], function() {
  gulp.watch('styles/*.css', function(file) {
    if (file.type === "changed") {
      reload(file.path);
    }
  });
  gulp.watch(['*.html', 'views/*.html'], ['bs-reload']);
  gulp.watch(['app/*.js', 'components/**/*.js', 'js/*.js'], ['bs-reload']);
  gulp.watch('styles/**/*.scss', ['sass', 'minify-css']);
});


/**
 * build task:
 * 1. clean /_build folder
 * 2. compile SASS files, minify and uncss compiled css
 * 3. copy and minimize images
 * 4. minify and copy all HTML files into $templateCache
 * 5. build index.html
 * 6. minify and copy all JS files
 * 7. copy fonts
 */
gulp.task('build', function(callback) {
  runSequence(
    'clean:build',
    'sass:build',
    'images',
    'templates',
    'usemin',
    'fonts',
    callback);
});

// gulp deploy --user username --password password
gulp.task('deploy', function(callback) {
  runSequence(
    'clean:build',
    'sass:build',
    'images',
    'templates',
    'usemin',
    'fonts',
    'send',
    callback);
});

gulp.task('send', function( cb ) {
  var conn = ftp.create({
      host: remoteHost,
      user: args.user,
      password: args.password,
      parallel: 10,
      debug: true,
      log: gutil.log
    });

  var globs = [
      '_build/**/*'
    ];

    conn.rmdir( remotePath, function ( err ) {
      if ( err ) {
        // If the remote directory doesn't exisits, do nothing and continue with the upload
        // return cb( err );
      }
      gulp.src(globs, { base: './_build', buffer: false } )
        .pipe( conn.newer( remotePath ) )
        .pipe( conn.dest( remotePath ) );
    });
});
