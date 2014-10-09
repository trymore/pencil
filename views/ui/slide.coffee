View = require '../view'
$ = require 'jquery'
{clone, assign} = require 'lodash'
Point = require '../../models/geom/point'
require('../../models/easing').jquerize $
{parse} = require '../../models/query-string'


module.exports =
class Slide extends View

  selectorViewport    : '.js-slide-viewport'
  selectorContent     : '.js-slide-content'
  selectorPrevButton  : '.js-slide-prev-button'
  selectorNextButton  : '.js-slide-next-button'
  selectorDotNav      : '.js-slide-dot-nav'
  classDotNavSelected : 'is-selected'
  attrOptions         : 'data-slide'
  defaultOptions:
    autoplay: false
    autoplayInterval: 8000
    duration: 1000
    easing: 'easeOutCubic'

  constructor: ->
    super

    optionsStr = @attr @attrOptions
    options = parse optionsStr, null, null, parseType: true
    @options = assign clone(@defaultOptions), options

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
    @updateTo 0

    @startAutoplay()

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

    @currentIndex = index

    @$content
      .stop true, false
      .css left: -point.x

  moveTo: (index) ->
    index = @verifyIndex index
    return if index is @currentIndex
    @currentIndex = index

    currentItem = @$contentItems.eq index
    point = Point.createWithPosition currentItem.position()

    @updateDotNav()
    @stopAutoplay()
    @$content
      .stop true, false
      .animate
        left: -point.x
      ,
        duration: @options.duration
        easing: @options.easing
        complete: @onMoveToComplete

  onMoveToComplete: => @startAutoplay()

  updateDotNav: ->
    @$dotNav.children().removeClass @classDotNavSelected
      .eq(@currentIndex).addClass @classDotNavSelected

  stopAutoplay: ->
    clearTimeout @autoplayTimeoutId

  startAutoplay: ->
    return unless @options.autoplay
    @stopAutoplay()
    @autoplayTimeoutId = setTimeout =>
      @next()
    , @options.autoplayInterval
