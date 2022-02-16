import gulp from 'gulp';
import gulpIf from 'gulp-if';
import plumber from 'gulp-plumber';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import postcss from 'gulp-postcss';
import purgecss from 'gulp-purgecss';
import sourcemaps from 'gulp-sourcemaps';
import csso from 'gulp-csso';
import config from '../config';
import { SRC_PATHS, DEST_PATHS, BUILD_PATHS } from '../paths';

const sass = gulpSass(dartSass);
const sassConfig = { indentWidth: 4 };
const purgecssConfig = {
    content: [
        `${SRC_PATHS.views}/**/*.pug`,
        `${DEST_PATHS.views}/*.html`,
        `${BUILD_PATHS.views}/*.html`
    ]
};

export const buildStylesheetFrameworks = () => {
    return gulp
        .src(`${SRC_PATHS.stylesheetFrameworks}/*.{scss,sass}`)
        .pipe(plumber())
        .pipe(gulpIf(!config.isProduction, sourcemaps.init()))
        .pipe(sass(sassConfig).on('error', sass.logError))
        .pipe(postcss())
        .pipe(gulpIf(config.isProduction, purgecss(purgecssConfig)))
        .pipe(csso())
        .pipe(gulpIf(!config.isProduction, sourcemaps.write()))
        .pipe(
            gulpIf(
                !config.isProduction,
                gulp.dest(DEST_PATHS.stylesheetFrameworks)
            )
        )
        .pipe(
            gulpIf(
                config.isProduction,
                gulp.dest(BUILD_PATHS.stylesheetFrameworks)
            )
        );
};

export const watchStylesheetFrameworks = () => {
    return gulp.watch(
        `${SRC_PATHS.stylesheetFrameworks}/*.{scss,sass}`,
        buildStylesheetFrameworks
    );
};
