View = require './view'
iota = require('../models/iota')()
$ = require 'jquery'
{max} = Math


###
ボックスの幅や高さを揃えるマネージャです。
揃える対象をマークアップ形態に関わらずグルーピングすることができます。

@example fooグループとbarグループでそれぞれ高さを揃えるマークアップです。
    ul
      li.js-adjuster(data-adjuster-group="foo") //- この要素と
      li.js-adjuster(data-adjuster-group="foo") //- この要素と
    ul
      li.js-adjuster(data-adjuster-group="foo") //- この要素と
      li.js-adjuster(data-adjuster-group="foo") //- この要素の高さが揃います。
    ul
      li.js-adjuster(data-adjuster-group="bar") //- この要素と
      li.js-adjuster(data-adjuster-group="bar") //- この要素の高さが揃います。
###
module.exports =
class AdjusterManager extends View

  @DIRECTION_NONE: iota()
  @DIRECTION_WIDTH: iota()
  @DIRECTION_HEIGHT: iota()
  @DIRECTION_BOTH: @DIRECTION_WIDTH | @DIRECTION_HEIGHT

  selector: '.js-adjuster'
  attrGroup: 'data-adjuster-group'

  constructor: ({}, @direction = @constructor.DIRECTION_HEIGHT) ->
    super

    @groupMap = {}
    @each ({}, el) =>
      $el = $ el
      groupName = $el.attr @attrGroup
      @groupMap[groupName] ?= $()
      @groupMap[groupName] = @groupMap[groupName].add $el
    @update()

  update: ->
    if (@direction & @constructor.DIRECTION_WIDTH) is @constructor.DIRECTION_WIDTH
      @adjustWidth()
    if (@direction & @constructor.DIRECTION_HEIGHT) is @constructor.DIRECTION_HEIGHT
      @adjustHeight()

  adjustWidth: ->
    for groupName, $group of @groupMap
      width = 0
      $group.each ({}, el) ->
        $el = $ el
          .css width: ''
        width = max width, $el.width()
      $group.each ({}, el) ->
        $el = $ el
        $el.width width

  adjustHeight: ->
    for groupName, $group of @groupMap
      height = 0
      $group.each ({}, el) ->
        $el = $ el
          .css height: ''
        height = max height, $el.height()
      $group.each ({}, el) ->
        $el = $ el
        $el.height height
