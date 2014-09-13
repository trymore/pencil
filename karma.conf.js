module.exports = function (config) {
  config.set({
    plugins: [
      'karma-phantomjs-launcher', 'karma-chrome-launcher', 'karma-mocha', 'karma-mocha-reporter', 'karma-coverage', 'karma-coveralls'
    ],
    basePath: '',
    autoWatch: true,
    frameworks: ['mocha'],
    files: [
      'node_modules/chai/chai.js',
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/lodash/dist/lodash.min.js',
      'pencil.js',
      'test/runner/runner.js'
    ],
    browsers: ['PhantomJS'],
    reporters: ['mocha', 'progress', 'coverage', 'coveralls'],
    preprocessors: {
      'pencil.js': ['coverage']
    },
    coverageReporter: {
      type: 'lcov'
    },
    logLevel: config.LOG_INFO,
    singleRun: true
  });
};
