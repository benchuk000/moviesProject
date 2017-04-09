var gulp   = require('gulp');
var concat = require('gulp-concat');

gulp.task('html', function(){
    return gulp.src('./src/**/*.html')
        .pipe(gulp.dest('./dist/'));
});

gulp.task('libs', () =>
    gulp.src([
        './bower_components/angular/angular.min.js',
        './bower_components/angular-ui-router/release/angular-ui-router.min.js',
        './bower_components/angular-animate/angular-animate.min.js',
        './bower_components/angular-aria/angular-aria.min.js',
        './bower_components/angular-material/angular-material.min.js',
        './bower_components/ng-file-upload/ng-file-upload-all.min.js',
        './bower_components/angular-local-storage/dist/angular-local-storage.min.js',
        './bower_components/angular-cookies/angular-cookies.min.js',
        './bower_components/angular-ui-grid/ui-grid.min.js'
    ])
        .pipe(concat('libs.js'))
        .pipe(gulp.dest('./dist/'))
);

gulp.task('scripts', ['libs'], function(){
    return gulp.src([
        './src/app.js',
        './src/**/*.js'
    ])
        .pipe(concat('index.js'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('styles', function(){
    return gulp.src([
        './src/assets/css/reset.css',
        './bower_components/angular-material/angular-material.min.css',
        './bower_components/angular-ui-grid/ui-grid.css',
        './src/**/*.css'
    ])
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('img', function(){
    return gulp.src([
        './src/assets/img/**/*',
    ])
        .pipe(gulp.dest('./dist/assets/img'));
});

gulp.task('watch', function() {
    gulp.watch('./src/**/*.js', ['scripts']);
    gulp.watch('./src/**/*.css', ['styles']);
    gulp.watch('./src/**/*.html', ['html']);
    gulp.watch('./src/**/*.svg', ['svg']);
});

gulp.task('default', ['watch','styles', 'scripts', 'html', 'img']);
