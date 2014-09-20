gulp = require 'gulp'
gutil = require 'gulp-util'
{relative, dirname, basename, extname, join} = require 'path'
CSON = require 'cson'
{writeFile} = require 'fs'
browserify = require 'browserify'
watchify     = require 'watchify'
# bundleLogger = require '../util/bundleLogger'
# handleErrors = require '../util/handleErrors'
source       = require 'vinyl-source-stream'
# mochaPhantomJS = require 'gulp-mocha-phantomjs'
bump = require 'gulp-bump'
git = require 'gulp-git'
{readFileSync} = require 'fs'
karma = require 'gulp-karma'

gulp.task 'watch', ->
  # gulp.watch [
  #   'models/**'
  #   'views/**'
  # ], [ 'exports' ]
  gulp.watch [
    'pencil.js'
    'test/runner/runner.js'
  ], [ 'karma' ]

gulp.task 'exports', ->
  gulp.src [
    'models/**/*.coffee'
    'views/**/*.coffee'
  ]
  .pipe gutil.buffer (err, files) ->
    exports = {}
    for file in files
      path = relative '.', file.path
      path = path.replace /\.coffee$/, ''
      ns = path.replace(/^\.\.\//, '').split('/')
      e = exports
      for n, i in ns
        if i is ns.length - 1
          e[n] = path
        else
          e[n] ?= {}
          e = e[n]
    code = CSON.stringifySync exports, null, 2
    .replace /: "(.*?)"/g, ': require "../$1"'
    .replace /[{}]/g, ''
    writeFile './test/pencil.coffee', "module.exports = #{code}", ->
      gulp.start 'browserify-lib'

gulp.task 'browserify-lib', ->
  bundler = watchify browserify
    cache: {}, packageCache: {}
    entries: ['./test/pencil.coffee']
    extensions: ['.coffee']
    builtins: []
    standalone: 'pencil'
    debug: false
  bundle = ->
    bundler
      .bundle()
      .on 'error', ->
        console.log arguments
      .pipe source 'pencil.js'
      .pipe gulp.dest './'
  bundler.on 'update', bundle
  bundle

gulp.task 'browserify-test', ->
  bundler = watchify browserify
    cache: {}, packageCache: {}
    entries: ['./test/runner/runner.coffee']
    extensions: ['.coffee']
    builtins: []
    debug: false
  bundle = ->
    bundler
      .bundle()
      .on 'error', ->
        console.log arguments
      .pipe source 'runner.js'
      .pipe gulp.dest './test/runner'
  bundler.on 'update', bundle
  bundle()

# gulp.task 'mocha-phantomjs', ->
#   gulp
#   .src 'test/runner/index.html'
#   .pipe mochaPhantomJS()

gulp.task 'karma', ->
  gulp
    .src [
      # 'node_modules/chai/chai.js',
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/lodash/dist/lodash.min.js',
      'pencil.js',
      'test/runner/runner.js'
    ]
    .pipe karma
      action: 'start'
      configFile: 'karma.conf.coffee'

gulp.task 'publish', ->
  gulp
  .src 'bower.json'
  .pipe bump()
  .pipe gulp.dest '.'
  .on 'end', ->
    { version } = JSON.parse readFileSync 'bower.json', 'utf8'
    version = "v#{version}"
    git.tag version, "Bump to #{version}", (err) ->
      throw err if err
      console.log 'tagged'
      gulp.src '**/*'
      .pipe git.commit "Release #{version}"
      .on 'end', ->
        console.log 'commited'
      #   git.push 'origin', 'master', (err) ->
      #     if err?
      #       console.error err
      #       return
      #     git.push 'origin', 'master', args: '--tags', (err) ->
      #       if err?
      #         console.error err
      #         return
      #       notify "Released #{version}"

gulp.task 'default', [
  # 'exports'
  # 'browserify-test'
  'karma'
  'watch'
]

# mkdir doc
# git subtree pull --prefix doc origin gh-pages --squash
# codo models views
# git subtree push --prefix doc origin gh-pages --squash
