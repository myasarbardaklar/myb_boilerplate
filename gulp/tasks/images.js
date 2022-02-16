import gulp from 'gulp';
import gulpIf from 'gulp-if';
import changed from 'gulp-changed';
import imagemin from 'gulp-imagemin';
import config from '../config';
import { SRC_PATHS, DEST_PATHS, BUILD_PATHS } from '../paths';

export const buildImages = () => {
    return gulp
        .src(`${SRC_PATHS.images}/**/*`)
        .pipe(changed(DEST_PATHS.images))
        .pipe(imagemin())
        .pipe(gulpIf(!config.isProduction, gulp.dest(DEST_PATHS.images)))
        .pipe(gulpIf(config.isProduction, gulp.dest(BUILD_PATHS.images)));
};

export const watchImages = () => {
    return gulp.watch(`${SRC_PATHS.images}/**/*`, buildImages);
};
