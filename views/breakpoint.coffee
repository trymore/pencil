###
Breakpoint call registered callback when window width contains registered range.
###

View = require './view'

module.exports =
class Breakpoint extends View

  breakpoint: {
    #'0..640': 'onSmallerThan640'
  }

  ###
  Creates a Breakpoint instance.
  ###
  constructor: ->
    super

    @breakpoints = []
    for condition, callback of @breakpoint
      matched = condition.match /^(\d*)(\.{2,3})(\d*)$/
      throw new TypeError 'breakpoint should be written like 640..1080 or 640...1080' unless matched?
      @breakpoints.push
        start        : if matched[1] is '' then Number.MIN_VALUE else parseFloat matched[1]
        end          : if matched[3] is '' then Number.MAX_VALUE else parseFloat matched[3]
        isContainsEnd: matched[2].length is 2
        callback     : @[callback]
    @constructor.$window
    .on 'load', @onWindowLoad
    .on 'resize', @onWindowResized

  ###
  Stops listening events and deletes references.
  ###
  destruct: ->
    @constructor.$window.off 'load', @onWindowLoad
    @constructor.$window.off 'resize', @onWindowResized
    super

  onWindowLoad: =>
    @onWindowResized()

  ###
  Calls callbacks contains current window width.
  ###
  onWindowResized: =>
    windowWidth = window.innerWidth ? @constructor.$window.innerWidth()
    for { start, end, isContainsEnd, callback } in @breakpoints
      if isContainsEnd
        if start <= windowWidth <= end
          callback.call @, windowWidth
      else
        if start <= windowWidth < end
          callback.call @, windowWidth
    @onResized()

  ###
  Called after all callbacks are called.
  ###
  onResized: ->
