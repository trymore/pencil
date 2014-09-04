$ = require 'jquery'
require('../models/backgrouns-position').jquerize $
View = require './view'
iota = require('../models/iota')()
{ Deferred } = require 'jquery'


###
スプライトアニメーションを管理するクラスです。
###
module.exports =
class Sprite extends View

  ###
  スプライト画像が並びがx方向であることを表すフラグです。
  ###
  @X: 1 << iota()

  ###
  スプライト画像が並びがy方向であることを表すフラグです。
  ###
  @Y: 1 << iota()

  ###
  最終フレームの終了時に発火するイベントです。
  ###
  @EVENT_LAST_FRAME: 'sprite.lastFrame'

  ###
  指定のリピート回数が完了した時に発火するイベントです。
  永久にリピートする場合は発火しません。
  ###
  @EVENT_COMPLETE_REPEAT: 'sprite.completeRepeat'

  constructor: ({}, @fps = 30, @direction = Sprite.Y) ->
    super
    if @direction is @constructor.X
      @prop = 'backgroundPositionX'
      @size = @width()
    else
      @prop = 'backgroundPositionY'
      @size = @height()
    @currentFrame = 0
    @setRange 0, 0

  setRange: (from, to) ->
    @setPositions [from..to]

  setPositions: (@positions) ->
    @lastFrame = @positions.length - 1

  gotoAndPlay: (frame = 0, repeat = 1) ->
    @currentFrame = @limitFrame frame
    @play repeat

  gotoAndStop: (frame = 0) ->
    @currentFrame = @limitFrame frame
    @updateView()
    @stop()

  nextFrame: ->
    @currentFrame = @verifyFrame @currentFrame + 1
    @updateView()

  prevFrame: ->
    @currentFrame = @verifyFrame @currentFrame - 1
    @updateView()

  play: (@repeat = 1) ->
    @currentRepeatCount = 0
    @updateView()
    @startTick()

  pause: ->
    @stopTick()

  ###
  @private
  ###
  limitFrame: (frame) ->
    if frame < 0
      frame = 0
    if frame > @lastFrame
      frame = @lastFrame
    frame

  ###
  @private
  ###
  verifyFrame: (frame) ->
    if frame < 0
      frame = @lastFrame
    if frame > @lastFrame
      frame = 0
    frame

  ###
  @private
  ###
  updateView: ->
    pos = @positions[@currentFrame]
    css = {}
    css[@prop] = -@size * pos
    @css css

  ###
  @private
  ###
  startTick: ->
    @stopTick()
    @data 'spriteIntervalId', setInterval @tick, 1000 / @fps

  ###
  @private
  ###
  stopTick: ->
    clearInterval @data 'spriteIntervalId'

  ###
  @private
  ###
  tick: =>
    frame = @currentFrame + 1
    if (isLastFrame = frame > @lastFrame)
      if @repeat > 0 and ++@currentRepeatCount >= @repeat
        @stopTick()
        @trigger @constructor.EVENT_LAST_FRAME
        @trigger @constructor.EVENT_COMPLETE_REPEAT
        return
      frame = @verifyFrame frame
    @currentFrame = frame
    @updateView()
    if isLastFrame
      @trigger @constructor.EVENT_LAST_FRAME
