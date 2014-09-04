gulp = require 'gulp'
# bower = require 'gulp-bower'
# sequence = require 'run-sequence'
# gulpif = require 'gulp-if'
# debug = require 'gulp-debug'
# plumber = require 'gulp-plumber'
# cached = require 'gulp-cached'
# notify = require 'gulp-notify'
# browserify = require 'gulp-browserify'
# uglify = require 'gulp-uglify'
# replaceExt = require 'gulp-ext-replace'
# rename = require 'gulp-rename'
{ readFileSync } = require 'fs'
bump = require 'gulp-bump'
git = require 'gulp-git'

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



# gulp.task 'bower', ->
#   bower()

# gulp.task 'browserify', ->
#   gulp
#   .src 'src/**/exports.coffee', read: false
#   .pipe plumber errorHandler: notify.onError '<%= error.message %>'
#   .pipe browserify
#     standalone: true
#     ignoreMissing: true
#     transform: [ 'coffeeify', 'debowerify' ]
#     extensions: [ '.coffee', '.js' ]
#   .pipe cached 'browserify'
#   .pipe rename main
#   .pipe gulp.dest '.'

# gulp.task 'watch', ->
  # gulp.watch 'src/**/*.coffee', [ 'browserify' ]

gulp.task 'default', [
  # 'bower'
  # 'browserify'
  'watch'
]

# git subtree pull --prefix doc origin gh-pages --squash
# git subtree push --prefix doc origin gh-pages --squash
