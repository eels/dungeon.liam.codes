const ENV = process.env.NODE_ENV;
const gulp = require('gulp');
const path = require('path');
const file = require('file');
const watch = require('gulp-watch');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const gcmq = require('gulp-group-css-media-queries');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const imagemin = require('gulp-imagemin');
const replace = require('gulp-replace');
const rename = require('gulp-rename');
const conditional = require('gulp-if');
const dateFormat = require('date-fns/format');

// HTML Actions
// ------------------------------------------------------------
gulp.task('html:compile', () => {
  gulp.src('./src/html/*.html')
    .pipe(replace(/\*\*base\*\*/g, match => {
      return ENV === 'production' ? 'https://liam.codes/dungeon/' : 'https://deck.dev';
    })
    .pipe(replace(/\*\*cache\*\*/g, match => 'hello'))
    .pipe(gulp.dest('./public'));
});

gulp.task('html:watch', () => {
  watch('./src/html/**/*.html', () => {
    gulp.start('html:compile');
  });
});

// CSS Actions
// ------------------------------------------------------------
gulp.task('css:compile', () => {
  gulp.src('./src/css/*.scss')
    .pipe(sass())
    .pipe(gcmq())
    .pipe(cleanCSS({
      compatibility: '*',
      level: {
        1: {
          all: true
        },
        2: {
          all: true
        }
      }
    }))
    .pipe(autoprefixer({
      browsers: [
        '> 0.25%',
        'IE >= 9',
        'last 2 versions'
      ],
      cascade: false
    }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(conditional(file => {
      if (path.basename(file.path) === 'application.min.css') {
        return true;
      }
    }, rename('style.min.css')))
    .pipe(gulp.dest('./public/assets/css'));
});

gulp.task('css:watch', () => {
  watch('./src/css/**/*.scss', () => {
    gulp.start('css:compile');
  });
});

// JS Actions
// ------------------------------------------------------------
gulp.task('js:compile', () => {
  gulp.src('./src/js/index.js')
    .pipe(webpackStream(require(`./webpack.config.${ENV}.js`), webpack))
    .pipe(gulp.dest('./public/assets/js'));
});

gulp.task('js:watch', () => {
  watch(['./src/js/**/*.js', './src/data/**/*.json', './public/assets/**/*.svg'], () => {
    gulp.start('js:compile');
  });
});

// Image Actions
// ------------------------------------------------------------
gulp.task('img:compress', () => {
  file.walk('./public/assets/img/', (start, dirs, names) => {
    gulp.src(dirs + '/*')
      .pipe(imagemin())
      .pipe(gulp.dest(dirs));
  });
});

// SEO Actions
// ------------------------------------------------------------
gulp.task('seo:humans', () => {
  gulp.src('./public/humans.txt')
    .pipe(replace(/Last update\:.*\n/g, match => {
      return 'Last update: ' + dateFormat(new Date(), 'YYYY/MM/DD') + '\n';
    }))
    .pipe(gulp.dest('./public'));
});


gulp.task('watch', ['html:watch', 'css:watch', 'js:watch']);
gulp.task('build', ['html:compile', 'css:compile', 'js:compile', 'img:compress', 'seo:humans']);

gulp.task('default', ['html:compile', 'css:compile', 'js:compile']);
