var gulp = require('gulp');
var concat = require('gulp-concat');
var minify = require('gulp-uglify');
var browserify = require('gulp-browserify');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var reporter= 'jshint-stylish';
var react = require('gulp-react');
var jshint = require('gulp-jshint');
var Concatcss = require('gulp-concat-css');


gulp.task("process-script", function(){
	return gulp.src('src/js/client.js')
			.pipe(browserify({transform:'reactify', extensions:['.jsx']}))
			.pipe(concat('main.js'))
			.pipe(gulp.dest('dest/'));
});

gulp.task('lintJs', function() { 
    return gulp.src([
            './src/**/*.js',
            '!server/server.js'
        ])
        .pipe(react())
        .on('error', function(e) {
            console.error(e.message + '\n  in ' + e.fileName);
        })
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter(reporter))
        .pipe(jshint.reporter('fail'));
});

gulp.task('process-css', function(){
	return gulp.src(['./src/css/*.css']).
			pipe(Concatcss('style.css'))
			.pipe(gulp.dest('dest/'));
});

gulp.task('lintJsserver',function(){
	return gulp.src([
		'./server.js'])
		.pipe(react())
		.on('error',function(e){
			console.error(e.message + '\n in '+ e.fileName);
		})
		.pipe(jshint('.jshintrc'))
		.pipe(jshint.reporter(reporter))
		.pipe(jshint.reporter('fail'));
});
