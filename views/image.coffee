###
Image is a wrapper of <img>.
###

{ msie, version } = require '../models/browser'
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
  Reloads resource and emit complete event.
  ###
  reload: ->
    if msie
      @src = "#{@src}?#{new Date().getTime()}"
    $ '<img>'
    .one 'load error', =>
      @emit 'reload.complete'
    .attr 'src', @src
