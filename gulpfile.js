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
 
function buildHTML(cb) {
  del([
    'public/components/**/*', 
    '!public/components', 
    '!public/components/input-group', 
    '!public/stylesheets', 
    '!public/javascripts', 
    '!public/assets',
    '!public/components/**/*.md',
  ]);
  src([ 
    'views/**/*.pug',
    '!views/components/input-group',
    '!views/**/_*/',
    '!views/**/_*/**/*',
  ])
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

function buldInputsGroupCp(cb) {
  del([
    'public/components/input-group/**', 
    '!public/components/input-group', 
    '!public/components/input-group/*.md',
  ]);
  src([ 
    'input-group/**/*.pug',
  ])
    .pipe(plumber())
    .pipe(data(function(file) {
      return JSON.parse(fs.readFileSync('./data/data.json'))
    }))
    .pipe(pug({
      doctype: 'html',
      pretty: true
    }))
    .pipe(dest('public/components/input-group'))
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

function copyAssets(cb) {
  del(['public/assets/**', '!public/assets/svg']);
  src('./assets/**/*')
    .pipe(dest('public/assets'))
  cb();
}

function copyReadme(cb) {
  del(['public/**/*.md']);
  src('views/**/*.md')
    .pipe(dest('public/'))
  cb();
}

function buldCoreJs(cb) {
  del(['public/javascripts/**/*', '!public/javascripts/']);
  src([
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/jquery/dist/jquery.min.map',
    'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
    'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js.map',
  ])
    // .pipe(babel()) 
    .pipe(dest('public/javascripts'))
    .pipe(sync.stream());
  cb();
};

function browserSync(cb) {
  buildHTML(cb); 
  buldInputsGroupCp(cb);
  generateCSS(cb);
  buldCoreJs(cb);
  copyAssets(cb);
  copyReadme(cb);

  sync.init({
      server: {
          baseDir: './public'
      }
  });
  
  watch('./assets/**/*', copyAssets);
  watch('./views/*.pug', buildHTML);
  watch('./views/**/*.md', copyReadme);
  watch('./views/**/*.pug', buildHTML);
  watch('./input-group/**/*.pug', buldInputsGroupCp);
  watch('./scss', generateCSS);
  watch('./public/**.html').on('change', sync.reload);
}

exports.default = parallel(buildHTML, copyReadme, generateCSS, buldCoreJs, copyAssets);
exports.html = buildHTML;
exports.sync = browserSync;
exports.css = generateCSS;
exports.corejs = buldCoreJs;
exports.buldinputgroup = buldInputsGroupCp;
