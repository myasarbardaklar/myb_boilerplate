import del from 'del';
import browserSync from 'browser-sync';
import config from '../config';
import { DEST_BASE, BUILD_BASE, DEST_PATHS, BUILD_PATHS } from '../paths';

export const cleanFiles = async () => {
    return await del.sync([DEST_BASE, BUILD_BASE]);
};

export const developmentServer = (done) => {
    browserSync.create().init({
        server: { baseDir: DEST_BASE },
        files: [
            {
                match: `${DEST_PATHS.fonts}/**/*`,
                fn() {
                    this.reload();
                }
            },
            {
                match: `${DEST_PATHS.images}/**/*`,
                fn() {
                    this.reload();
                }
            },
            `${DEST_PATHS.styles}/*.css`,
            `${DEST_PATHS.javascripts}/*.js`,
            `${DEST_PATHS.views}/*.html`
        ],
        port: config.developmentPort,
        open: false
    });

    done();
};

export const productionServer = (done) => {
    browserSync.create().init({
        server: { baseDir: BUILD_BASE },
        files: [
            {
                match: `${BUILD_PATHS.fonts}/**/*`,
                fn() {
                    this.reload();
                }
            },
            {
                match: `${BUILD_PATHS.images}/**/*`,
                fn() {
                    this.reload();
                }
            },
            `${BUILD_PATHS.styles}/*.css`,
            `${BUILD_PATHS.javascripts}/*.js`,
            `${BUILD_PATHS.views}/*.html`
        ],
        port: config.productionPort,
        open: true
    });

    done();
};
