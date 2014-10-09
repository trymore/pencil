$ = require 'jquery'
Slide = require './slide'
Point = require '../../models/geom/point'


module.exports =
class SlideRepeat extends Slide

  setupContentItems: ->
    $contentItems = @$contentItems.clone()
    for i in [@maxIndex..0]
      $contentItems.eq(i).clone().prependTo @$content
    for i in [0..@maxIndex]
      $contentItems.eq(i).clone().appendTo @$content

  setupContent: ->
    @$content.width @unitWidth * 3

  verifyIndex: (index) ->
    while index < 0
      index += @contentItemsLength
    index %= @contentItemsLength
    index

  moveTo: (index) ->
    return if index is @currentIndex

    delta = index - @currentIndex
    @currentIndex = @verifyIndex index

    $currentItem = @$content.children().eq @contentItemsLength + index
    to = Point.createWithPosition $currentItem.position()

    current = Point.createWithPosition(@$content.position()).mul -1
    from = @verifyPoint current, to, delta

    @$content
      .stop true, false
      .css
        left: from.mul(-1).x
      .animate
        left: to.mul(-1).x
      ,
        duration: 800
        easing: 'easeOutQuad'

    @updateDotNav()

  onMoveToComplete: ->
    @updateTo @currentIndex

  verifyPoint: (current, to, delta) ->
    current = current.clone()
    while current.x < 0
      current.x += @unitWidth
    current.x %= @unitWidth
    current.x += @unitWidth
    if delta > 0 and current.x > to.x
      current.x -= @unitWidth
    if delta < 0 and current.x < to.x
      current.x += @unitWidth
    current
