var gulp = require('gulp'),
    gutil = require('gulp-util'),
    browserify = require('gulp-browserify'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    connect = require('gulp-connect'),
    minifyHTML = require('gulp-minify-html'),
	concat = require('gulp-concat');

var env,
    jsSources,
    htmlSources,
    outputDir;

env = process.env.NODE_ENV || 'development';

if (env === 'development') {
    outputDir = 'builds/development/';
} else {
    outputDir = 'builds/production/';
}

jsSources = [
    'components/js/hej.js',
    'components/js/hallo.js'
];

htmlSources = [
    outputDir + '*.html'
];

gulp.task('log', function() {
    gutil.log("workflows are awesome and cool!");
});

gulp.task('js', function() {
    gulp.src(jsSources)
        .pipe(concat("script.js"))
        .pipe(browserify())
        .pipe(gulpif(env === 'production', uglify()))
        .pipe(gulp.dest(outputDir + 'js'))
        .pipe(connect.reload())
});

gulp.task('html', function() {
    gulp.src('builds/development/*.html')
        .pipe(gulpif(env === 'production', minifyHTML()))
        .pipe(gulpif(env === 'production', gulp.dest(outputDir)))
        .pipe(connect.reload())
});

gulp.task('watch', function() {
    gulp.watch(jsSources, ['js']);
    gulp.watch('builds/development/*.html', ['html']);

});

gulp.task('connect', function() {
    connect.server({
        root: outputDir,
        livereload: true
    });
});



gulp.task('default', ['log', 'js', 'connect', 'html', 'watch']);
