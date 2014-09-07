gulp = require 'gulp'
# mocha = require 'gulp-mocha'

browserify = require 'browserify'
watchify     = require 'watchify'
# bundleLogger = require '../util/bundleLogger'
# handleErrors = require '../util/handleErrors'
source       = require 'vinyl-source-stream'

mochaPhantomJS = require 'gulp-mocha-phantomjs'
bump = require 'gulp-bump'
git = require 'gulp-git'
{ readFileSync } = require 'fs'

gulp.task 'watch', ->
  # gulp.watch [
  #   'views/**'
  #   'models/**'
  #   'test/**'
  # # ], [ 'mocha' ]
  # ], [ 'browserify' ]

# gulp.task 'mocha', ->
#   gulp
#   .src 'test/**/*.coffee', read: false
#   .pipe mocha reporter: 'nyan'

gulp.task 'browserify-lib', ->
  bundler = watchify browserify
    cache: {}, packageCache: {}
    entries: ['./pencil.coffee']
    extensions: ['.coffee']
    builtins: []
    standalone: 'pencil'
    debug: true
  bundle = ->
    bundler
    .bundle()
    .on 'error', ->
      console.log arguments
    .pipe source 'pencil.js'
    .pipe gulp.dest './'
    .on 'end', ->
      gulp.start 'browserify-test'
  bundler.on 'update', bundle

gulp.task 'browserify-test', ->
  bundler = watchify browserify
    cache: {}, packageCache: {}
    entries: ['./test/runner/runner.coffee']
    extensions: ['.coffee']
    builtins: []
    debug: true
  bundle = ->
    bundler
    .bundle()
    .on 'error', ->
      console.log arguments
    .pipe source 'runner.js'
    .pipe gulp.dest './test/runner'
    .on 'end', ->
      gulp.start 'mocha-phantomjs'
  bundler.on 'update', bundle

gulp.task 'mocha-phantomjs', ->
  gulp
  .src 'test/runner/index.html'
  .pipe mochaPhantomJS()

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
  'browserify-lib'
  'browserify-test'
  'watch'
]

# git subtree pull --prefix doc origin gh-pages --squash
# git subtree push --prefix doc origin gh-pages --squash
