module.exports = function (config) {
  config.set({
    plugins: [
      'karma-phantomjs-launcher', 'karma-coverage', 'karma-mocha'
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
    reporters: ['progress', 'coverage'],
    preprocessors: {'*.js': ['coverage']},
    singleRun: true
  });
};