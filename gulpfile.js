var minifyInline = require('gulp-minify-inline');
var autoprefix = require('gulp-autoprefixer');
var htmlmin = require('gulp-minify-html');
var cssmin = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var gulp = require('gulp');

var config = {
  // copy: {
  //   src: ['app/js/common/lib/ion.rangeSlider.min.js'],
  //   dest: 'www/app/js/common/lib/'
  // },
  html: {
    src: ['index.htm', 'printReport.htm'],
    dest: 'www'
  },
  css: {
    src: 'app/**/*.css',
    dest: 'www/app'
  },
  js: {
    src: ['app/**/*.js'],
    dest: 'www/app'
  },
  jsResource: {
    src: ['resources/*.js'],
    dest: 'www/resources'
  },
  imagemin: {
    src: 'app/**/*.{png,PNG,jpg,svg,ico,gif}',
    dest: 'www/app',
    options: {
      progressive: true,
      optimizationLevel: 7
    }
  }
};

// gulp.task('copy', function () {
//   return gulp.src(config.copy.src)
//     .pipe(gulp.dest(config.copy.dest));
// });

gulp.task('uglify', function () {
  return gulp.src(config.js.src)
    .pipe(uglify())
    .pipe(gulp.dest(config.js.dest));
});

gulp.task('uglify-resource', function () {
  return gulp.src(config.jsResource.src)
    .pipe(uglify())
    .pipe(gulp.dest(config.jsResource.dest));
});

gulp.task('imagemin', function () {
  return gulp.src(config.imagemin.src)
    .pipe(imagemin(config.imagemin.options))
    .pipe(gulp.dest(config.imagemin.dest));
});

gulp.task('minify-html', function () {
  return gulp.src(config.html.src)
    .pipe(htmlmin({ comments: true }))
    .pipe(minifyInline())
    .pipe(gulp.dest(config.html.dest));
});

gulp.task('minify-css', function () {
  return gulp.src(config.css.src)
    .pipe(cssmin())
    .pipe(autoprefix())
    .pipe(gulp.dest(config.css.dest));
});

gulp.task('dist', ['uglify', 'uglify-resource', 'imagemin', 'minify-html', 'minify-css']);
