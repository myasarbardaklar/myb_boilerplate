const path = require('upath');

const {
  ROOT_PATH,
  DEST_PATH,
  BUILD_PATH,
  SRC_PATHS,
  DEST_PATHS,
  BUILD_PATHS
} = require('../../config/paths');

module.exports = {
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

  stylesheetLibs: {
    compile: {
      src: path.join(SRC_PATHS.stylesheetLibs, '*.{scss,sass}'),
      developmentDest: DEST_PATHS.stylesheetLibs,
      productionDest: BUILD_PATHS.stylesheetLibs
    },
    watch: {
      src: [
        path.join(SRC_PATHS.stylesheetLibs, '*.{scss,sass}'),
        path.join(ROOT_PATH, 'postcss.config.js'),
        path.join(ROOT_PATH, 'cssnano.config.js'),
        path.join(ROOT_PATH, 'tailwind.config.js'),
        path.join(ROOT_PATH, 'config/themes/**/*')
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
