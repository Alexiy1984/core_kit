const { src, dest, watch, parallel, series } = require('gulp');

const pug = require('gulp-pug'),
data = require('gulp-data'),
sync = require('browser-sync').create(),
fs = require('fs'),
sass = require('gulp-sass'),
concat = require('gulp-concat'),
autoprefixer = require('gulp-autoprefixer'),
plumber = require('gulp-plumber'),
del = require('del'),
babel = require("gulp-babel");

var sassOptions = {
  outputStyle: 'expanded',
};

var prefixerOptions = {
  browserlist: ['last 3 versions']
};
 
function  buildHTML(cb) {
  del(['public/**', '!public', '!public/stylesheets', '!public/javascripts']);
  src('views/**/*.pug')
    .pipe(plumber())
    .pipe(data(function(file) {
      return JSON.parse(fs.readFileSync('./data/data.json'))
    }))
    .pipe(pug({
      doctype: 'html',
      pretty: true
    }))
    .pipe(dest('public/'))
    .pipe(sync.stream());
  cb();
}

function generateCSS(cb) {
  del(['public/stylesheets/**', '!public/stylesheets']);
  src('./scss/*.scss')
      .pipe(sass(sassOptions).on('error', sass.logError))
      .pipe(autoprefixer(prefixerOptions))
      // .pipe(concat('index.css'))
      .pipe(dest('public/stylesheets'))
      .pipe(sync.stream());
  cb();
}

function buldJQuery(cb) {
  src('node_modules/jquery/dist/jquery.js')
    .pipe(babel()) 
    .pipe(dest('public/javascripts'))
    .pipe(sync.stream());
  cb();
};

function browserSync(cb) {
  buildHTML(cb); 
  generateCSS(cb);
  buldJQuery(cb);

  sync.init({
      server: {
          baseDir: './public'
      }
  });
  
  watch('./views/*.pug', buildHTML);
  watch('./views/**/*.pug', buildHTML);
  watch('./scss', generateCSS);
  watch('./public/**.html').on('change', sync.reload);
}

exports.default = parallel(buildHTML, generateCSS, buldJQuery);
exports.html = buildHTML;
exports.sync = browserSync;
exports.css = generateCSS;
exports.jquery = buldJQuery;
