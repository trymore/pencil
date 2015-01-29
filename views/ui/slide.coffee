View              = require '../view'
$ = window.jQuery = require 'jquery'
{clone, assign}   = require 'lodash'
Point             = require '../../models/geom/point'
{parse}           = require '../../models/query-string'
require('../../models/easing').jquerize $
require 'velocity'


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
    autoplay         : false
    autoplayInterval : 8000
    duration         : 1000
    easing           : 'easeOutCubic'
    dotNavtype       : '<li></li>'

  constructor: ->
    super

    optionsStr = @attr @attrOptions
    if optionsStr?
      options  = parse optionsStr, null, null, parseType: true
      @options = assign clone(@defaultOptions), options
    else
      @options = clone @defaultOptions

    @$viewport = @$ @selectorViewport
      .css
        position: 'relative'

    @$content = @$ @selectorContent
      .css
        position: 'absolute'
        top: 0
        left: 0

    @$contentItems = @$content.children()
    @$prevButton   = @$ @selectorPrevButton
    @$nextButton   = @$ @selectorNextButton
    @$dotNav       = @$ @selectorDotNav
    @contentItemsLength = length = @$contentItems.length
    @minIndex  = 0
    @maxIndex  = if length is 0 then 0 else length - 1
    @unitWidth = 0

    for contentItem in @$contentItems
      @unitWidth += $(contentItem).outerWidth true

    @setupContentItems()
    @setupContent length
    @setupDotNav length
    @updateTo 0
    @startAutoplay()

    @$prevButton.on 'click', @onPrevButtonClicked
    @$nextButton.on 'click', @onNextButtonClicked
    @$dotNav.children().on 'click', @onDotNavClicked

  setupContentItems: ->

  setupContent: (length) ->
    @$content.width @unitWidth

  setupDotNav: (length) ->
    dotNavhtml = ''
    i = length
    while i-- > 0
      dotNavhtml += @options.dotNavtype
    @$dotNav.html dotNavhtml

  verifyIndex: (index) ->
    return @minIndex if index < @minIndex
    return @maxIndex if index > @maxIndex
    index

  onPrevButtonClicked: => @prev()

  onNextButtonClicked: => @next()

  onDotNavClicked: (event) =>
    $self = $ event.currentTarget
    index = $self.index()
    @moveTo index

  prev: -> @move -1

  next: -> @move 1

  move: (delta) -> @moveTo @currentIndex + delta

  updateTo: (index) ->
    item = @$contentItems.eq index
    point = Point.createWithPosition item.position()

    @currentIndex = index
    @updateDotNav()
    @$content
      .velocity 'stop', true
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
      .velocity 'stop', true
      .velocity
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
