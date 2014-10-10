istanbul = require 'browserify-istanbul'
subdir = (browser) ->
  browser.toLowerCase().split(/[ /-]/)[0]

module.exports = (config) ->
  config.set

    frameworks: [
      'browserify'
      'mocha'
      'chai'
    ]

    files: [
      'node_modules/jquery/dist/jquery.min.js'
      'node_modules/lodash/dist/lodash.min.js'
      'test/**/*.coffee'
    ]

    reporters: [
      'spec'
      'coverage'
      'growl'
    ]

    preprocessors:
      'test/**/*.coffee': ['browserify']

    browsers: [
      'PhantomJS'
    ]

    logLevel: 'LOG_DEBUG'

    singleRun: false
    autoWatch: true
    browserNoActivityTimeout: 120000

    browserify:
      files: [
        'test/**/*.coffee'
      ]
      extensions: ['.coffee']
      transform: ['coffeeify', istanbul]
      # debug: true
      # noParse: ['jquery', 'lodash']

    coverageReporter:
      reporters: [
      #   type: 'text'
      #   dir: 'coverage'
      #   subdir: subdir
      # ,
        type: 'lcov'
        dir: 'coverage'
        subdir: subdir
      ]
