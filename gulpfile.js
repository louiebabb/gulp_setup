var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    cssnano = require('gulp-cssnano'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    clean = require('gulp-clean'),
    fileinclude = require('gulp-file-include');


// HTML Partials
gulp.task('fileinclude', () =>
  gulp.src(['src/html/pages/index.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('dist/'))
    .pipe(notify({ message: 'HTML task complete' }))
);

//Styles
gulp.task('styles', () =>
  sass('src/assets/sass/main.scss')
    .on('error', sass.logError)
    .pipe(cssnano())
    .pipe(gulp.dest('dist/assets/styles'))
    .pipe(notify({ message: 'Styles task complete' }))
);

gulp.task('scripts', () =>
  gulp.src('src/assets/scripts/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./dist/assets/js'))
    .pipe(notify({ message: 'Scripts task complete' }))
);

//Clean
gulp.task('clean', () =>
  gulp.src('dist/assets/styles/*.css', {read: false})
    .pipe(clean())
);

gulp.task('default', ['clean'], function() {
    gulp.start('styles');
});

gulp.task('watch', () =>

  // Watch .scss files
  gulp.watch('src/assets/sass/**/*.scss', ['styles'])
  gulp.watch('src/assets/sass/*.scss', ['styles'])

  // Watch .js files
  gulp.watch('src/assets/scripts/*.js', ['scripts'])

  //Watch Html files
  gulp.watch('src/html/pages/*.html', ['fileinclude'])
  gulp.watch('src/html/includes/*.html', ['fileinclude'])

  // Watch image files
  // gulp.watch('src/assetsimages/**/*', ['images']);
);