const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const browserSync = require('browser-sync').create();

// Rutas de los archivos
const paths = {
  scss: {
    src: 'assets/css/**/*.scss',
    dest: 'assets/css/',
    watch: 'assets/css/**/*.scss'
  },
  html: {
    watch: '*.html'
  }
};

// Configuración de errores
const onError = function(err) {
  notify.onError({
    title: "Error en Gulp",
    message: "Error: <%= error.message %>",
    sound: "Beep"
  })(err);
  this.emit('end');
};

// Tarea para compilar SCSS a CSS
function compileSass() {
  return gulp.src(paths.scss.src)
    .pipe(plumber({ errorHandler: onError }))
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded',
      includePaths: ['assets/css']
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 2 versions', '> 1%', 'IE 11'],
      cascade: false
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.scss.dest))
    .pipe(browserSync.stream())
    .pipe(notify({
      message: 'SCSS compilado exitosamente: <%= file.relative %>',
      onLast: true
    }));
}

// Tarea para compilar SCSS a CSS minificado
function compileSassMin() {
  return gulp.src(paths.scss.src)
    .pipe(plumber({ errorHandler: onError }))
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: ['assets/css']
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 2 versions', '> 1%', 'IE 11'],
      cascade: false
    }))
    .pipe(cleanCSS({
      compatibility: 'ie11',
      level: {
        1: {
          specialComments: 0
        }
      }
    }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.scss.dest))
    .pipe(notify({
      message: 'SCSS minificado exitosamente: <%= file.relative %>',
      onLast: true
    }));
}

// Tarea para iniciar BrowserSync
function browserSyncServe(done) {
  browserSync.init({
    server: {
      baseDir: './'
    },
    port: 3000,
    notify: {
      styles: {
        top: 'auto',
        bottom: '0',
        borderRadius: '5px 0 0 0'
      }
    }
  });
  done();
}

// Tarea para recargar el navegador
function browserSyncReload(done) {
  browserSync.reload();
  done();
}

// Tarea para observar cambios en archivos SCSS y HTML
function watchFiles() {
  gulp.watch(paths.scss.watch, compileSass);
  gulp.watch(paths.html.watch, browserSyncReload);
  console.log('\n🚀 Gulp está observando cambios en archivos SCSS y HTML...\n');
  console.log('📡 BrowserSync activo en http://localhost:3000\n');
}

// Tareas públicas
exports.sass = compileSass;
exports.sassMin = compileSassMin;
exports.build = gulp.series(compileSass, compileSassMin);
exports.watch = gulp.series(compileSass, gulp.parallel(browserSyncServe, watchFiles));
exports.default = gulp.series(compileSass, gulp.parallel(browserSyncServe, watchFiles));

