'use strict';

// include gulp
var gulp = require('gulp');
// include our plugins
var concat = require('gulp-concat'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    compass = require('gulp-compass'),
	  autoprefixer = require('gulp-autoprefixer'),


// Sass task
gulp.task('sass', function () {
  return gulp.src(['./app/css/*.scss'])
    .pipe(compass({
      css: 'dist/css',
      sass: 'app/css',
      image: 'dist/images'
    }))
    .pipe(concat('all.min.css'))
    .pipe(autoprefixer())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});







gulp.task('sass-watch', function () {
  gulp.watch('./app/css/*.scss', ['sass']);
});
//Watch task
gulp.task('css-watch', ['sass']);


// webserver and live reload
gulp.task('serve', ['sass'], function() {
    browserSync({
        //logConnections: false,
        //logFileChanges: false,
        notify: false,
        open: true,
        server: {
            baseDir: "app",
            routes: {
              "/dist" : "dist",
            }
        }
    });
    gulp.watch('app/css/*.scss', ['css-watch']);
    gulp.watch('app/**/*.html').on('change', browserSync.reload);
});


gulp.task('default', ['sass', 'serve']);
