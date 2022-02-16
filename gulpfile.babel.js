import gulp from 'gulp';
import {
    cleanFiles,
    developmentServer,
    productionServer
} from './gulp/tasks/serve';
import { buildFonts, watchFonts } from './gulp/tasks/fonts';
import { buildImages, watchImages } from './gulp/tasks/images';
import { buildViews, watchViews } from './gulp/tasks/views';
import { buildStylesheets, watchStylesheets } from './gulp/tasks/stylesheets';
import {
    buildStylesheetFrameworks,
    watchStylesheetFrameworks
} from './gulp/tasks/stylesheetFrameworks';
import { buildJavaScripts, watchJavaScripts } from './gulp/tasks/javascripts';

export const build = gulp.series(
    cleanFiles,
    gulp.series(
        buildFonts,
        buildImages,
        buildViews,
        buildStylesheets,
        buildStylesheetFrameworks,
        buildJavaScripts
    )
);

export const dev = gulp.series(
    build,
    developmentServer,
    gulp.parallel(
        watchFonts,
        watchImages,
        watchViews,
        watchStylesheets,
        watchStylesheetFrameworks,
        watchJavaScripts
    )
);

export const serve = gulp.series(productionServer);
