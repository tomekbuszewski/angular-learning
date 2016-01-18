var gulp					= require('gulp'),
		bs						= require('browser-sync'),
		browserSync 	= bs.create(),
		reload				= bs.reload,
		sass					= require('gulp-ruby-sass'),
		prefix				= require('gulp-autoprefixer'),
		concatjs			= require('gulp-concat'),
		concatcss			= require('gulp-concat-css'),
		browserify    = require('browserify'),
		babelify			= require('babelify'),
		source				= require('vinyl-source-stream');

// Sass task
//——————————————————————————————————————————————————
gulp.task('sass', function() {
	return sass('_scss/**')
		.pipe(gulp.dest('_dev/_css'));
});

// CSS minify and merging
//——————————————————————————————————————————————————
gulp.task('css', ['sass'], function() {
	return gulp.src('_dev/_css/**')
		.pipe(prefix('last 2 version'))
		.pipe(concatcss('main.css'))
		.pipe(gulp.dest('_site/css'))
		.pipe(browserSync.stream());
});

// Browserify
//---------------------------------------------------
gulp.task('browserify', function() {
	var bundler = browserify('_babel/script.js').transform(babelify);

	return bundler.bundle()
		.pipe(source('_babel/script.js'))
		.pipe(gulp.dest('_dev'));
});

// JavaScript moving and merging
//---------------------------------------------------
gulp.task('js-min', ['browserify'], function() {
	return gulp.src('_dev/_babel/script.js')
		.pipe(concatjs('all.js'))
		.pipe(gulp.dest('_js'))
		.pipe(browserSync.stream());
});

// Browser Sync
//---------------------------------------------------
gulp.task('browser-sync', ['js-min', 'css'], function() {
	browserSync.init({
		browser: [],
		server: {
			baseDir: './'
		}
	});

	gulp.watch('_scss/**', ['css']);
	gulp.watch('_babel/**', ['js-min']);
	gulp.watch("*.html").on("change", browserSync.reload);
});

gulp.task('default', ['browser-sync']);
