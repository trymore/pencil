$ = require 'jquery'
require('../models/backgrouns-position').jquerize $
View = require './view'
iota = require('../models/iota')()
{ Deferred } = require 'jquery'


module.exports =
class Sprite extends View

  @X: 1 << iota()
  @Y: 1 << iota()

  direction: Sprite.Y

  constructor: ->
    super

  #TODO implement me
  gotoAndStop: (frame) ->
    @stopSprite()
    css = {}
    css[prop] = -size * frames[frame]
    @css css

  ###
  スプライトをリピートします。
  from int 開始フレームです
  to int 終了フレームです
  count int 繰り返しの回数です（リピートし続ける場合は0）
  fps int 秒間フレーム数です
  callback Function コールバックです
  ###
  sprite: (from, to, count = 1, fps = 30, callback) ->
    if @direction is @constructor.X
      prop = 'backgroundPositionX'
      size = @width()
    else
      prop = 'backgroundPositionY'
      size = @height()

    frames = [from..to]
    length = frames.length
    i = 0

    tick = =>
      css = {}
      css[prop] = -size * frames[i++]
      @css css

      if i is length
        if --count is 0
          clearTimeout @timerId
          callback()
          return
        i = 0

      requestNextTick()

    requestNextTick = =>
      clearTimeout @timerId
      @timerId = setTimeout tick, 1000 / fps

    requestNextTick()
    setTimeout tick, 0

  ###
  スプライトを終了します。
  ###
  stopSprite: ->
    clearTimeout @timerId
