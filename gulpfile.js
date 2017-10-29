var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    cssnano = require('gulp-cssnano'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    clean = require('gulp-clean'),
    fileinclude = require('gulp-file-include')
    gulpCopy = require('gulp-copy');


var sourceFilesFonts = 'src/assets/fonts/*',
    destinationFonts = 'dist/fonts/',
    sourceFilesHtml = ['src/html/pages/*.html','src/html/includes/*.html'],
    destinationHtml = 'dist/',
    sourceFilesJs = 'src/assets/scripts/*.js',
    destinationJs = 'dist/scripts',
    sourceFilesCSS = 'src/assets/sass/main.scss',
    destinationCSS = 'dist/styles';


// HTML Partials
gulp.task('htmlbuild', () =>
  gulp.src('src/html/pages/*.html')
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest(destinationHtml))
    .pipe(notify({ message: 'HTML task complete' }))
);

//Styles
gulp.task('styles', () =>
  sass(sourceFilesCSS)
    .on('error', sass.logError)
    .pipe(cssnano())
    .pipe(gulp.dest(destinationCSS))
    .pipe(notify({ message: 'Styles task complete' }))
);

gulp.task('scripts', () =>
  gulp.src(sourceFilesJs)
    .pipe(concat('main.js'))
    .pipe(gulp.dest(destinationJs))
    .pipe(notify({ message: 'Scripts task complete' }))
);

//Fonts copy
gulp.task('fonts', () =>
  gulp.src(sourceFilesFonts)
    .pipe(gulp.dest(destinationFonts))
    .pipe(notify({ message: 'Fonts task complete' }))
);

//Clean
gulp.task('clean', () =>
  gulp.src([destinationCSS, destinationJs, 'dist/images' , destinationFonts ], {read: false})
    .pipe(clean())
);

gulp.task('default', ['clean'], function() {
    gulp.start(['htmlbuild','styles','scripts','fonts']);
});

gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch('src/assets/sass/**/*.scss', ['styles'])
  gulp.watch('src/assets/sass/*.scss', ['styles'])

  // Watch .js files
  gulp.watch(sourceFilesJs, ['scripts'])

  //Watch Html files
  gulp.watch(sourceFilesHtml, ['htmlbuild'])

  //Watch Font files
  gulp.watch(sourceFilesFonts, ['fonts'])

  // Watch image files
  // gulp.watch('src/assetsimages/**/*', ['images']);
});