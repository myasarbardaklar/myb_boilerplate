const del = require('del');
const browserSync = require('browser-sync').create();
const paths = require('./config/paths');
const { developmentPort, productionPort } = require('./config/server');

const cleanFiles = async function () {
  return await del.sync([paths.server.distFolder, paths.server.buildFolder]);
};

const developmentServer = function (done) {
  browserSync.init({
    server: { baseDir: paths.server.distFolder },
    port: developmentPort,
    open: false,
    files: [
      // watch fonts
      {
        match: `${paths.fonts.compile.developmentDest}/**/*`,
        fn() {
          this.reload();
        }
      },

      // watch images
      {
        match: `${paths.images.compile.developmentDest}/**/*`,
        fn() {
          this.reload();
        }
      },

      // watch views
      `${paths.views.compile.developmentDest}/*.html`,

      // watch stylesheets
      `${paths.stylesheets.compile.developmentDest}/*.css`,

      // watch javascripts
      `${paths.javascripts.compile.developmentDest}/*.js`
    ]
  });

  done();
};

const productionServer = function (done) {
  browserSync.init({
    server: { baseDir: paths.server.buildFolder },
    port: productionPort,
    open: true
  });

  done();
};

module.exports = {
  cleanFiles,
  developmentServer,
  productionServer
};
