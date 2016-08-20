const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const cssnano = require('gulp-cssnano');
const gulp = require('gulp');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');


gulp.task('css', () =>
    gulp.src('public/css/main.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cssnano())
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('public/css'))
);

gulp.task('js', () =>
    gulp.src([
        'public/js/animator.js',
        'public/js/exif.js',
        'public/js/preload.js',
        'public/js/selector.js',
        'public/js/step-1.js',
        'public/js/step-2.js',
        'public/js/step-3.js',
        'public/js/step-4.js',
        'public/js/privacy.js',
        'public/js/wall.js',
        'public/js/fireworks.js'
    ])
    .pipe(concat('built.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/js'))
);

gulp.task('watch', () =>
    gulp.watch('public/**/*', ['css', 'js'])
);

gulp.task('default', ['watch', 'css', 'js']);