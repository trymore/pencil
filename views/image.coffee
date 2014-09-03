###
Image is a wrapper of <img>.
###

{ msie, versionNumber } = require '../models/browser'
View = require './view'

module.exports =
class Image extends View

  ###
  Creates a Image instance.
  ###
  constructor: ->
    super
    @src = @attr 'src'

  ###
  画像をロードします。
  @event
  ###
  load: ->
    if msie and versionNumber < 9
      src = "#{@src}?#{new Date().getTime()}"
    $ '<img>'
    .one 'load error', =>
      @emit 'load.complete'
    .attr 'src', src
