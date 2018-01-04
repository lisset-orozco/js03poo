import gulp from 'gulp';
import babel from 'gulp-babel';

gulp.task('prueba', () => {
  console.log('Hello Gulp!');
});

gulp.task('es6', () => {
  gulp.src('./es6/*.js')
    .pipe(babel())
    .pipe(gulp.dest('./es5'));
});

gulp.task('default', () => {
  gulp.watch('./es6/*.js', ['es6']); 
  // va a ejecutar la tarea 'es6' cuando haya algún cambio
  // en los archivos .js de la carpeta ./es6/
});