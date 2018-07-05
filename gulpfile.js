var gulp = require('gulp')
var $ = require('gulp-load-plugins')({lazy: true})
var config = require('./gulp.config')()
var del = require('del')

gulp.task('lint', () => {
    return gulp.src(config.alljs)
        .pipe($.eslint(config.exclude))
        .pipe($.eslint.format())
})

gulp.task('clean', (done) => {
    del(config.build).then((paths) => {
        console.log('Deleted files and folders:\n', paths.join('\n'))
    })
	done()
})

gulp.task('build', () => {
    return gulp.src(config.list)
        .pipe($.uglify())
        .pipe($.concat('min.js'))
        .pipe(gulp.dest(config.build))
})

gulp.task('copy', () => {
    return gulp.src(config.pkg, { base: "." })
        .pipe(gulp.dest(config.build))
})

gulp.task('default', gulp.series('clean', 'build', 'copy', () => {
    return gulp.src('build/**/*')
        .pipe($.zip('build.zip'))
        .pipe(gulp.dest(config.build))
}))