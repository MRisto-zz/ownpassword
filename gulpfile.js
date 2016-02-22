var gulp = require('gulp'),
	sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    cssmin = require('gulp-cssmin'),
    uglify = require('gulp-uglify');
var paths = {
  sass: 'theme/css/**.scss',
};

//DEFAULT GULP
gulp.task('default',['sass','min-css','min-js','sass-watch']);

///////////////////////////
// Bootstrap SASS
////////////////////////////
gulp.task('sass', function() {
    gulp.src('theme/css/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./theme/css/'));
});


gulp.task('sass-watch', function(){
    gulp.watch(paths.sass,['sass','min-css']);
    
});


gulp.task('min-js', function(){
    return gulp.src(['js/authentication.js', 'js/password.js', 'js/ownpassword.js'])
        .pipe(concat('ownpasswordall.js'))
        .pipe(gulp.dest('js'))
        .pipe(rename('ownpasswordall.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('js'));
});

gulp.task('min-css', function () {
	gulp.src('theme/css/style.css')
		.pipe(cssmin())
		.pipe(rename('style.min.css'))
		.pipe(gulp.dest('theme/css/'));
});

