gulp = require 'gulp'
mocha = require 'gulp-mocha'
bump = require 'gulp-bump'
git = require 'gulp-git'
{ readFileSync } = require 'fs'

gulp.task 'watch', ->
  gulp.watch [
    'views/**'
    'models/**'
    'test/**'
  ], [ 'mocha' ]

gulp.task 'mocha', ->
  gulp
  .src 'test/**/*.coffee', read: false
  .pipe mocha reporter: 'nyan'

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
  'watch'
]

# git subtree pull --prefix doc origin gh-pages --squash
# git subtree push --prefix doc origin gh-pages --squash
