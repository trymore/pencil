View = require './view'
{ msie, versionNumber } = require '../models/browser'
$ = require 'jquery'


###
Imageクラスです。
`<img>`要素の表示状態にかかわらず、画像をロードしサイズを取得することができます。
###
module.exports =
class Image extends View

  ###
  Imageインスタンスを生成します。
  ###
  constructor: ->
    super
    @src = @attr 'src'
    @loader = $ '<img>'
    @wrapper = $ '<div>'
    .attr
      width: 0
      height: 0
      overflow: 'hidden'
      visibility: 'hidden'
    .append @loader

  ###
  画像をロードします。
  @event 'image.complete'
  ###
  load: (src) ->
    if src?
      @src = src
    return if @src is ''

    @unload()
    @startListening()
    @loader.attr src: if msie and versionNumber < 9
      "#{@src}?#{new Date().getTime()}"
    else
      @src

  ###
  画像をアンロードします。
  ###
  unload: ->
    @stopListening()
    @loader.attr src: ''

  ###
  @private
  ###
  startListening: ->
    @loader.one 'load error', @onLoadComplete

  ###
  @private
  ###
  stopListening: ->
    @loader.off 'load error', @onLoadComplete

  ###
  @private
  ###
  onLoadComplete: =>
    @stopListening()
    @wrapper.appendTo 'body'
    @attr
      src: @src
      width: @loader.width()
      height: @loader.width()
    @wrapper.remove()
    @trigger 'image.loaded'
