var gulp    = require('gulp'),
    opts = {
        dist: './public/'
    };

// 发布

gulp.task('deploy', function() {
    var pages = require('gulp-gh-pages');
    return gulp.src(opts.dist + "**/*")
        .pipe(pages());
});