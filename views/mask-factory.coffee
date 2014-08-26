View = require './view'
{ assign } = require 'lodash'
iota = require('../models/iota')()


module.exports =
class MaskFactory extends View

  @LEFT: 1 << iota()
  @RIGHT: 1 << iota()
  @TOP: 1 << iota()
  @BOTTOM: 1 << iota()

  classOuter: 'js-maskfactory-outer'
  classMask: 'js-maskfactory-mask'
  classInner: 'js-maskfactory-inner'

  constructor: ({}, @origin = @constructor.LEFT) ->
    super

    @outer = @wrapInner '<div>'
    .children()
    .addClass @classOuter

    @mask = @outer.wrapInner '<div>'
    .children()
    .addClass @classMask
    .css
      width: '100%'
      height: '100%'

    @inner = @mask.wrapInner '<div>'
    .children()
    .addClass @classInner

    if (@origin & @constructor.LEFT) is @constructor.LEFT
      @mask.css left: 0
      @inner.css left: 0
    if (@origin & @constructor.RIGHT) is @constructor.RIGHT
      @mask.css right: 0
      @inner.css right: 0
    if (@origin & @constructor.TOP) is @constructor.TOP
      @mask.css top: 0
      @inner.css top: 0
    if (@origin & @constructor.BOTTOM) is @constructor.BOTTOM
      @mask.css bottom: 0
      @inner.css bottom: 0

    @constructor.$window.on 'load resize', @onWindowResized
    @onWindowResized()

  getMask: -> @mask

  onWindowResized: =>
    maskCss =
      width: @mask[0].style.width
      height: @mask[0].style.height

    @outer
    .css
      position: ''
    @mask
    .css
      position: ''
      overflow: ''
      width: ''
      height: ''
    @inner
    .css
      position: ''

    sizeCss =
      width: @width()
      height: @height()

    @outer
    .css assign sizeCss,
      position: 'relative'
    @mask
    .css assign maskCss,
      position: 'absolute'
      overflow: 'hidden'
    @inner
    .css assign sizeCss,
      position: 'absolute'
