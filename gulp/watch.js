'use strict';

var gulp = require('gulp');

var paths = gulp.paths;

gulp.task('watch', ['markups', 'inject'], function () {
  gulp.watch([
    paths.src + '/*.html',
    paths.src + '/app/**/*.css',
    paths.src + '/app/**/*.js',
    'bower.json'
  ], ['inject']);
  gulp.watch(paths.src + '/app/**/*.jade', ['markups']);
});
