/**
 * @author  SonnY <andreasonny83@gmail.com>
 * @license MIT
 */
var gulp        = require('gulp'),
    browserSync = require('browser-sync'),
    reload      = browserSync.reload,
    $           = require('gulp-load-plugins')(),
    del         = require('del'),
    runSequence = require('run-sequence'),
    ftp         = require('vinyl-ftp'),
    minimist    = require('minimist'),
    gutil       = require('gulp-util'),
    Server      = require('karma').Server,
    args        = minimist(process.argv.slice(2));

// optimize images
gulp.task('images', function() {
  return gulp.src('./src/images/**/*')
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
      baseDir: "./src/"
    }
  });
});

// minify CSS
gulp.task('minify-css', function() {
  gulp.src(['./src/styles/**/*.css', '!./src/styles/**/*.min.css'])
    .pipe($.rename({suffix: '.min'}))
    .pipe($.minifyCss({keepBreaks:true}))
    .pipe(gulp.dest('./src/styles/'))
    .pipe(gulp.dest('./_build/css/'));
});

// minify HTML
gulp.task('minify-html', function() {
  var opts = {
    comments: true,
    spare: true,
    conditionals: true
  };

  gulp.src('./src/*.html')
    .pipe($.minifyHtml(opts))
    .pipe(gulp.dest('./_build/'));
});

// copy fonts from a module outside of our project (like Bower)
gulp.task('fonts', function() {
  gulp.src([
    './src/bower_components/bootstrap/dist/fonts/**/*.{ttf,woff,woff2,eof,eot,svg}'
  ])
    .pipe($.changed('./_build/fonts'))
    .pipe(gulp.dest('./_build/fonts'));
});

// start webserver
gulp.task('server', function(done) {
  return browserSync({
    server: {
      baseDir: './src/'
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
gulp.task('clean:build', function () {
  del([
    './_build/'
  ]);
});

// SASS task, will run when any SCSS files change & BrowserSync
// will auto-update browsers
gulp.task('sass', function() {
  return gulp.src('./src/styles/style.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass({ style: 'expanded', errLogToConsole: true }))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('./src/styles'))
    .pipe(reload({
      stream: true
    }))
    .pipe($.notify({
      message: 'Styles task complete'
    }));
});

// SASS Build task
gulp.task('sass:build', function() {
  return gulp.src('./src/styles/style.scss')
    .pipe($.sass({
      style: 'compact'
    }))
    .pipe($.autoprefixer('last 2 versions',
      'safari 6',
      'ie 9',
      'opera 12.1',
      'ios 6',
      'android 4'
    ))
    .pipe($.uncss({
      html: ['./src/index.html'],
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
  var baseUrl = args.base_url ? args.base_url : '/';

  return gulp.src('./src/index.html')
    // add templates path
    .pipe($.htmlReplace({
        'templates': '<script type="text/javascript" src="js/templates.js"></script>',
        'base_url': '<base href="' + baseUrl + '">'
    }))
    .pipe($.usemin({
      css: [$.minifyCss()],
      libs: [$.uglify()],
      angularlibs: [$.uglify()],
      appcomponents: [$.uglify()],
      mainapp: [$.uglify()]
    }))
    .pipe(gulp.dest('./_build/'));
});

// make templateCache from all HTML files
gulp.task('templates', function() {
  return gulp.src([
      './src/**/*.html',
      '!./src/bower_components/**/*.*'
    ])
    .pipe($.minifyHtml())
    .pipe($.angularTemplatecache({
      module: 'app'
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
  gulp.watch('./src/styles/*.css', function(file) {
    if (file.type === "changed") {
      reload(file.path);
    }
  });
  gulp.watch(['./src/*.html', './src/views/*.html'], ['bs-reload']);
  gulp.watch(['./src/app/*.js', './src/components/**/*.js'], ['bs-reload']);
  gulp.watch('./src/styles/**/*.scss', ['sass', 'minify-css']);
});


/**
 * build task
 *
 * gulp build
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

/**
 * Deploy to Live
 *
 * use with the followinf syntax:
 * gulp deploy --remote www.app.com --remote_path /public_html/angular-boilerplate/ --base_url / --user username --password password
 *
 * where username and password are the ftp credentials
 */
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

gulp.task( 'send', function( cb ) {
  var remotePath = args.remote_path,
      conn = ftp.create({
      host: args.remote,
      user: args.user,
      password: args.password,
      log: gutil.log
      // parallel: 25,
      // debug: true,
      // idleTimeout: 200,
      // maxConnections: 30,
      // reload: true,
    });

  var globs = [
      '_build/**/*'
    ];

    return gulp.src( globs, {base: './_build/', buffer: false } )
      .pipe( conn.differentSize( remotePath ) )
      // .pipe( conn.newer( remotePath ) )
      .pipe( conn.dest( remotePath ) );
  //
  //   conn.rmdir( remotePath, function ( err ) {
  //     if ( err ) {
  //       // If the remote directory doesn't exisits, do nothing and continue with the upload
  //       // return cb( err );
  //     }
  //     gulp.src(globs, { base: './dist/', buffer: false } )
  //       .pipe( conn.newer( remotePath ) )
  //       .pipe( conn.dest( remotePath ) );
  // });
  //
});


/**
 * Run test once and exit
 */
gulp.task( 'test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});
