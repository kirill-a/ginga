var gulp = require('gulp')
var $ = require('gulp-load-plugins')({lazy: true})
var config = require('./gulp.config')()
var del = require('del')

gulp.task('lint', () => {
    return gulp.src(config.alljs)
        .pipe($.eslint(config.exclude))
        .pipe($.eslint.format())
})

gulp.task('clean', () => {
    del(config.build).then((paths) => {
        console.log('Deleted files and folders:\n', paths.join('\n'))
    })
})

gulp.task('build', ['clean'], () => {
    return gulp.src(config.list)
        .pipe($.uglify())
        .pipe($.concat('min.js'))
        .pipe(gulp.dest(config.build))
        
})

gulp.task('copy', ['build', 'clean'], () => {
    return gulp.src(config.pkg, { base: "." })
        .pipe(gulp.dest(config.build))
})

gulp.task('default', ['clean', 'build', 'copy'], () => {
    return gulp.src('build/*')
        .pipe($.zip('build.zip'))
        .pipe(gulp.dest(config.build))
})