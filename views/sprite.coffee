$ = require 'jquery'
require('../models/backgrouns-position').jquerize $
View = require './view'
iota = require('../models/iota')()
{ Deferred } = require 'jquery'


module.exports =
class Sprite extends View

  @X: 1 << iota()
  @Y: 1 << iota()

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
    @maxFrame = @positions.length - 1

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
    if frame > @maxFrame
      frame = @maxFrame
    frame

  ###
  @private
  ###
  verifyFrame: (frame) ->
    if frame < 0
      frame = @maxFrame
    if frame > @maxFrame
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
    if frame > @maxFrame
      @trigger 'sprite.lastFrame'
      if @repeat > 0 and ++@currentRepeatCount >= @repeat
        @stopTick()
        @trigger 'sprite.completeRepeat'
        return
      frame = @verifyFrame frame
    @currentFrame = frame
    @updateView()
