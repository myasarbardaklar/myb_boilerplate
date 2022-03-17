const del = require('del');
const browserSync = require('browser-sync');
const cache = require('gulp-cache');
const paths = require('./config/paths');
const plugins = require('./config/plugins');

const server = browserSync.create();

const cleanFiles = async function () {
  return await del.sync([paths.server.distFolder, paths.server.buildFolder]);
};

const reloadBrowser = function (cb) {
  server.reload();
  cache.clearAll();
  cb();
};

const developmentServer = function (cb) {
  server.init(plugins.server.development);
  cb();
};

const productionServer = function (cb) {
  server.init(plugins.server.production);
  cb();
};

module.exports = {
  cleanFiles,
  reloadBrowser,
  developmentServer,
  productionServer
};
