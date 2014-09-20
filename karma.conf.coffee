istanbul = require 'browserify-istanbul'

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
      # 'models/**/*.coffee'
      # 'views/**/*.coffee'
      'test/**/*.coffee'
    ]

    reporters: [
      'spec'
      'coverage'
      'growl'
    ]

    preprocessors:
      'test/**/*.coffee': ['browserify']
      # "/**/*.browserify": "browserify"

    browsers: [
      'PhantomJS'
    ]

    logLevel: 'LOG_DEBUG'

    singleRun: true
    autoWatch: false

    browserify:
      files: [
        # 'models/**/*.coffee'
        # 'views/**/*.coffee'
        'test/**/*.coffee'
      ]
      extensions: ['.coffee']
      transform: ['coffeeify', istanbul]
      debug: true
      # noParse: ['jquery', 'lodash']

    coverageReporter:
      # instrumenter:
      #   'models/**/*.coffee': 'istanbul'
    # coverageReporter:
      type: 'lcovonly'
      dir: 'coverage'
      subdir: (browser) ->
        browser.toLowerCase().split(/[ /-]/)[0]
