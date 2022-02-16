import gulpMode from 'gulp-mode';

const mode = gulpMode();

export default {
    mode,
    isProduction: mode.production(),
    developmentPort: 4747,
    productionPort: 3000
};
