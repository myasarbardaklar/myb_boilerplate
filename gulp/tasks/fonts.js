import gulp from 'gulp';
import gulpIf from 'gulp-if';
import plumber from 'gulp-plumber';
import config from '../config';
import { SRC_PATHS, DEST_PATHS, BUILD_PATHS } from '../paths';

export const buildFonts = () => {
    return gulp
        .src(`${SRC_PATHS.fonts}/**/*`)
        .pipe(plumber())
        .pipe(gulpIf(!config.isProduction, gulp.dest(DEST_PATHS.fonts)))
        .pipe(gulpIf(config.isProduction, gulp.dest(BUILD_PATHS.fonts)));
};

export const watchFonts = () => {
    return gulp.watch(`${SRC_PATHS.fonts}/**/*`, buildFonts);
};
