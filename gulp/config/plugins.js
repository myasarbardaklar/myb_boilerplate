const { SRC_PATHS, DEST_PATHS, BUILD_PATHS } = require('../../config/paths');
const { mode, developmentPort, productionPort } = require('./server');
const paths = require('./paths');

module.exports = {
  server: {
    development: {
      server: { baseDir: paths.server.distFolder },
      port: developmentPort,
      open: false
    },
    production: {
      server: { baseDir: paths.server.buildFolder },
      port: productionPort,
      open: true
    }
  },

  fonts: {},

  images: {
    srcset: {
      IPluginRule: [
        {
          match: '(min-width: 3000px)',
          width: [1920, 1280, 1024, 860, 540, 320],
          format: ['jpg', 'webp']
        }
      ],
      ICommonConfig: { skipOptimization: true }
    }
  },

  views: {
    pug: { pretty: false }
  },

  stylesheetLibs: {
    sass: {
      indentWidth: 2,
      includePaths: ['./node_modules']
    },
    purgecss: {
      content: [
        `${SRC_PATHS.views}/**/*.pug`,
        `${DEST_PATHS.views}/*.html`,
        `${BUILD_PATHS.views}/*.html`
      ]
    }
  },

  stylesheets: {
    sass: {
      indentWidth: 2,
      includePaths: ['./node_modules']
    },
    purgecss: {
      content: [
        `${SRC_PATHS.views}/**/*.pug`,
        `${DEST_PATHS.views}/*.html`,
        `${BUILD_PATHS.views}/*.html`
      ]
    }
  },

  javascripts: {
    sourcemaps: { loadMaps: true },
    webpack: {
      mode: mode.production() ? 'production' : 'development',
      module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          }
        ]
      }
    }
  }
};
