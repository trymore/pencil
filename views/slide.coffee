View = require './view'
$ = require 'jquery'
Point = require '../models/geom/point'
require('../models/easing').jquerize $


module.exports =
class Slide extends View

  selectorViewport   : '.js-slide-viewport'
  selectorContent    : '.js-slide-content'
  selectorPrevButton : '.js-slide-prev-button'
  selectorNextButton : '.js-slide-next-button'
  selectorDotNav     : '.js-slide-dot-nav'

  classDotNavSelected: 'is-selected'

  constructor: ->
    super

    @$viewport = @$ @selectorViewport
      .css
        position: 'relative'
    @$content = @$ @selectorContent
      .css
        position: 'absolute'
        top: 0
        left: 0
    @$contentItems = @$content.children()
    @$prevButton = @$ @selectorPrevButton
      .on 'click', @onPrevButtonClicked
    @$nextButton = @$ @selectorNextButton
      .on 'click', @onNextButtonClicked
    @$dotNav = @$ @selectorDotNav
    @$dotNavItem = @$dotNav.children().eq(0).clone()

    @contentItemsLength = length = @$contentItems.length
    @minIndex = 0
    @maxIndex = if length is 0 then 0 else length - 1
    @unitWidth = 0
    for contentItem in @$contentItems
      @unitWidth += $(contentItem).outerWidth true

    @setupContentItems()
    @setupContent length
    @setupDotNav length
    @moveTo 0

  setupContentItems: ->

  setupContent: (length) ->
    @$content.width @unitWidth

  setupDotNav: (length) ->
    @$dotNav.empty()
    i = length
    while i-- > 0
      @$dotNav.append @$dotNavItem.clone()

  verifyIndex: (index) ->
    return @minIndex if index < @minIndex
    return @maxIndex if index > @maxIndex
    index

  onPrevButtonClicked: => @prev()

  onNextButtonClicked: => @next()

  prev: -> @move -1

  next: -> @move 1

  move: (delta) -> @moveTo @currentIndex + delta

  updateTo: (index) ->
    item = @$contentItems.eq index
    point = Point.createWithPosition item.position()
    @$content
      .stop true, false
      .css left: -point.x

  moveTo: (index) ->
    index = @verifyIndex index
    return if index is @currentIndex
    @currentIndex = index

    currentItem = @$contentItems.eq index
    point = Point.createWithPosition currentItem.position()
    @$content
      .stop true, false
      .animate
        left: -point.x
      ,
        duration: 800
        easing: 'easeOutQuad'
        complete: =>
          @onMoveToComplete()

    @updateDotNav()

  onMoveToComplete: ->

  updateDotNav: ->
    @$dotNav.children().removeClass @classDotNavSelected
      .eq(@currentIndex).addClass @classDotNavSelected
