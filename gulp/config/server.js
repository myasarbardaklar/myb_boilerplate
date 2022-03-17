const gulpMode = require('gulp-mode');

const mode = gulpMode();
mode.verbose = true;

module.exports = {
  mode,
  developmentPort: 4747,
  productionPort: 3000
};
