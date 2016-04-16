var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

//default task
gulp.task('default', ['scss', 'watch']);

//watch Files For Changes
gulp.task('watch', function() {
  gulp.watch('features/**/*.scss', ['scss']);
});

//SASS build process
gulp.task('scss', function() {
   gulp.src('features/**/*.scss')
      .pipe($.plumber())
      .pipe($.sourcemaps.init())
      .pipe($.sass({errLogToConsole: true, sourcemap: true, style: 'compact'}))
      .pipe($.autoprefixer({browsers: ['last 1 version', 'iOS 6'], cascade: false}))
      .pipe($.sourcemaps.write({includeContent: true, sourceRoot: '.'}))
      //.pipe(cssnano({discardDuplicates: false})) //optional minification
      .pipe(gulp.dest('features'))
});
