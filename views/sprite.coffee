$ = require 'jquery'
require('../models/background-position').jquerize $
View = require './view'
iota = require('../models/iota')()
{ Deferred } = require 'jquery'


###
スプライトアニメーションを管理するクラスです。

@example 同じViewに対して動き毎に別のSpriteを作ります。
    run = new Sprite '.foo'
    run.setRange 0, 10
    walk = new Sprite '.foo'
    walk.setRange 11, 20
    run.play()
    run.on Sprite.EVENT_LAST_FRAME, ->
      walk.play()
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

  ###
  スプライトインスタンスを生成します。

  @param [String, HTMLElement, jQueryObject, View] selector コントロールの対象の要素です
  @param [Integer] fps 1秒当たりのフレーム数です。
  @param [Integer] direction 背景画像が並んでいる方向です。
  ###
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

  ###
  このスプライトがフレームとして表示する背景の位置インデックスの範囲を設定します。

  @param [Integer] from 開始フレームの位置インデックスです。
  @param [Integer] to 最終フレームの位置インデックスです。
  ###
  setRange: (from, to) ->
    @setPositions [from..to]

  ###
  このスプライトがフレームとして表示する背景の位置インデックスの配列を設定します。

  @param [Array<Integer>] positions 位置インデックスの配列です。
  ###
  setPositions: (@positions) ->
    @lastFrame = @positions.length - 1

  ###
  指定されたフレームから再生します。

  @param [Integer] frame 再生を開始するフレームです。
  @param [Integer] repeat 再生回数です。
  ###
  gotoAndPlay: (frame = 0, repeat = 1) ->
    @currentFrame = @limitFrame frame
    @play repeat

  ###
  指定されたフレームで停止します。

  @param [Integer] frame 表示するフレームです。
  ###
  gotoAndPause: (frame = 0) ->
    @currentFrame = @limitFrame frame
    @updateView()
    @stop()

  ###
  次のフレームに移動します。
  ###
  nextFrame: ->
    @currentFrame = @verifyFrame @currentFrame + 1
    @updateView()

  ###
  前のフレームに移動します。
  ###
  prevFrame: ->
    @currentFrame = @verifyFrame @currentFrame - 1
    @updateView()

  ###
  再生します。

  @param [Integer] repeat 再生回数です。
  ###
  play: (@repeat = 1) ->
    @currentRepeatCount = 0
    @updateView()
    @startTick()

  ###
  停止します。
  ###
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
