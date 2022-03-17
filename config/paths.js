const path = require('upath');

const ROOT_PATH = path.normalize(process.cwd());
const SRC_PATH = path.join(ROOT_PATH, 'src');
const DEST_PATH = path.join(ROOT_PATH, 'dist');
const BUILD_PATH = path.join(ROOT_PATH, 'build');

const SRC_PATHS = {
  fonts: path.join(SRC_PATH, 'fonts'),
  images: path.join(SRC_PATH, 'images'),
  icons: path.join(SRC_PATH, 'icons'),
  stylesheetLibs: path.join(SRC_PATH, 'stylesheetLibs'),
  stylesheets: path.join(SRC_PATH, 'stylesheets'),
  javascripts: path.join(SRC_PATH, 'javascripts'),
  views: path.join(SRC_PATH, 'views')
};

const DEST_PATHS = {
  fonts: path.join(DEST_PATH, 'fonts'),
  images: path.join(DEST_PATH, 'images'),
  stylesheetLibs: path.join(DEST_PATH, 'stylesheetLibs'),
  stylesheets: path.join(DEST_PATH, 'stylesheets'),
  javascripts: path.join(DEST_PATH, 'javascripts'),
  views: DEST_PATH
};

const BUILD_PATHS = {
  fonts: path.join(BUILD_PATH, 'fonts'),
  images: path.join(BUILD_PATH, 'images'),
  stylesheetLibs: path.join(BUILD_PATH, 'stylesheetLibs'),
  stylesheets: path.join(BUILD_PATH, 'stylesheets'),
  javascripts: path.join(BUILD_PATH, 'javascripts'),
  views: BUILD_PATH
};

module.exports = {
  ROOT_PATH,
  SRC_PATH,
  DEST_PATH,
  BUILD_PATH,
  SRC_PATHS,
  DEST_PATHS,
  BUILD_PATHS
};
