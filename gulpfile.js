var isProd = false;
var gulp = require('gulp'),
  bump = require('gulp-bump'),
  buffer = require('vinyl-buffer'),
  del = require('del'),
  gutil = require('gulp-util'),
  jshint = require('gulp-jshint'),
  license = require('gulp-license'),
  runSequence = require('run-sequence'),
  uglify = require('gulp-uglify'),
  zip = require('gulp-zip');

var jsSourcePath = './src/javascript/**/*';
var contentScriptEntryPath = './src/javascript/contentScript.js';

var jshintOptions = {
  curly: true,
  eqeqeq: true,
  laxbreak: true,
  laxcomma: true,
  eqnull: true,
  nonbsp: true,
  browser: true
};

gulp.task('jshint', function() {
  return gulp.src(jsSourcePath)
    .pipe(jshint(jshintOptions))
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('jshint-self', function() {
  return gulp.src('./gulpfile.js')
    .pipe(jshint(jshintOptions))
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('clean', function(done) {
  return del(['./target'], done);
});

gulp.task('scripts', function() {
  var b = gulp.src(contentScriptEntryPath)
    .pipe(buffer());

  // cannot minify es6 for now
  if (isProd && false) {
    b = b.pipe(uglify().on('error', gutil.log));
  }

  return b.pipe(license('MIT', {
    tiny: true
  })).pipe(gulp.dest('./target/scripts'));
});

gulp.task('copy-manifest', function() {
  return gulp.src('./src/manifest.json')
    .pipe(gulp.dest('./target'));
});

gulp.task('build', ['scripts', 'copy-manifest'], function() {
  gulp.src('./target/**')
    .pipe(zip('target.zip'))
    .pipe(gulp.dest('./target'));
});

gulp.task('bump', function() {
  gulp.src('./package.json')
    .pipe(bump({
      type: 'patch'
    }))
    .pipe(gulp.dest('./'));

  return gulp.src('./src/manifest.json')
    .pipe(bump({
      type: 'patch'
    }))
    .pipe(gulp.dest('./src'));
});

gulp.task('default', function() {
  return runSequence('clean', ['scripts', 'copy-manifest']);
});

gulp.task('prod', function() {
  isProd = true;
  return runSequence('clean', 'bump', 'build');
});
