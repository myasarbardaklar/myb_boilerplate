const path = require('upath');

const ROOT_PATH = path.normalize(process.cwd());
const SRC_PATH = path.join(ROOT_PATH, 'src');
const DEST_PATH = path.join(ROOT_PATH, 'dist');
const BUILD_PATH = path.join(ROOT_PATH, 'build');

const SRC_PATHS = {
  fonts: path.join(SRC_PATH, 'fonts'),
  images: path.join(SRC_PATH, 'images'),
  icons: path.join(SRC_PATH, 'icons'),
  stylesheets: path.join(SRC_PATH, 'stylesheets'),
  javascripts: path.join(SRC_PATH, 'javascripts'),
  views: path.join(SRC_PATH, 'views')
};

const DEST_PATHS = {
  fonts: path.join(DEST_PATH, 'fonts'),
  images: path.join(DEST_PATH, 'images'),
  stylesheets: path.join(DEST_PATH, 'stylesheets'),
  javascripts: path.join(DEST_PATH, 'javascripts'),
  views: DEST_PATH
};

const BUILD_PATHS = {
  fonts: path.join(BUILD_PATH, 'fonts'),
  images: path.join(BUILD_PATH, 'images'),
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
  BUILD_PATHS,

  server: {
    distFolder: DEST_PATH,
    buildFolder: BUILD_PATH
  },

  fonts: {
    compile: {
      src: path.join(SRC_PATHS.fonts, '**/*'),
      developmentDest: DEST_PATHS.fonts,
      productionDest: BUILD_PATHS.fonts
    },
    watch: {
      src: [path.join(SRC_PATHS.fonts, '**/*')]
    }
  },

  images: {
    compile: {
      src: path.join(SRC_PATHS.images, '**/*'),
      developmentDest: DEST_PATHS.images,
      productionDest: BUILD_PATHS.images
    },
    watch: {
      src: [path.join(SRC_PATHS.images, '**/*')]
    }
  },

  views: {
    compile: {
      src: path.join(SRC_PATHS.views, '*.pug'),
      data(file) {
        return path.join(SRC_PATHS.views, 'data', path.basename(file, '.pug'));
      },
      developmentDest: DEST_PATHS.views,
      productionDest: BUILD_PATHS.views
    },
    watch: {
      src: [
        path.join(SRC_PATHS.views, '**/*.{pug,js}'),
        path.join(ROOT_PATH, 'posthtml.config.js')
      ]
    }
  },

  stylesheets: {
    compile: {
      src: path.join(SRC_PATHS.stylesheets, '*.{scss,sass}'),
      developmentDest: DEST_PATHS.stylesheets,
      productionDest: BUILD_PATHS.stylesheets
    },
    watch: {
      src: [
        path.join(SRC_PATHS.stylesheets, '**/*.{scss,sass}'),
        path.join(ROOT_PATH, 'postcss.config.js'),
        path.join(ROOT_PATH, 'cssnano.config.js'),
        path.join(ROOT_PATH, 'tailwind.config.js'),
        path.join(ROOT_PATH, 'config/themes/**/*')
      ]
    }
  },

  javascripts: {
    compile: {
      src: path.join(SRC_PATHS.javascripts, 'index.js'),
      developmentDest: DEST_PATHS.javascripts,
      productionDest: BUILD_PATHS.javascripts
    },
    watch: {
      src: [
        path.join(SRC_PATHS.javascripts, '**/*.{js,ts}'),
        path.join(ROOT_PATH, 'babel.config.js')
      ]
    }
  }
};
