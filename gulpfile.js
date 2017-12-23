var gulp = require('gulp')
var $ = require('gulp-load-plugins')({lazy: true})
var config = require('./gulp.config')()
var del = require('del')

gulp.task('lint', function() {
    return gulp
        .src(config.alljs)
        .pipe($.eslint(config.exclude))
        .pipe($.eslint.format())
})

gulp.task('clean', function() {
    del(config.build)
})

gulp.task('build', ['clean'], function() {
    return gulp
        .src(config.list)
        .pipe($.uglify())
        .pipe($.concat('min.js'))
        .pipe(gulp.dest(config.build))
})

gulp.task('pkg', ['build'], function() {
    return gulp
        .src(config.pkg, { base: "." })
        .pipe(gulp.dest(config.build))
})