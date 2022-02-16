import gulp from 'gulp';
import gulpIf from 'gulp-if';
import plumber from 'gulp-plumber';
import pug from 'gulp-pug';
import posthtml from 'gulp-posthtml';
import ext_replace from 'gulp-ext-replace';
import config from '../config';
import { SRC_PATHS, DEST_PATHS, BUILD_PATHS } from '../paths';

export const buildViews = () => {
    return gulp
        .src(`${SRC_PATHS.views}/pages/*.page.pug`)
        .pipe(plumber())
        .pipe(pug({ pretty: false }))
        .pipe(posthtml())
        .pipe(ext_replace('.html', '.page.html'))
        .pipe(gulpIf(!config.isProduction, gulp.dest(DEST_PATHS.views)))
        .pipe(gulpIf(config.isProduction, gulp.dest(BUILD_PATHS.views)));
};

export const watchViews = () => {
    return gulp.watch(`${SRC_PATHS.views}/**/*.pug`, buildViews);
};
