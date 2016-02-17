var gulp = require('gulp'),
	sass = require('gulp-sass');

var paths = {
  sass: 'theme/css/**.scss',
};

//DEFAULT GULP
gulp.task('default',['sass','sass-watch']);

///////////////////////////
// Bootstrap SASS
////////////////////////////
gulp.task('sass', function() {
    gulp.src('theme/css/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./theme/css/'));
});


gulp.task('sass-watch', function(){
    gulp.watch(paths.sass,['sass']);
    
});


