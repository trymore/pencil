Browser = require './browser'

module.exports =

  jquerize: ($) ->
    return if $.jquerized?['background-position']

    browser = new Browser
    if browser.msie and browser.version.match /6.0|7.0|8.0/
      return

    replacer =
      left: '0px'
      right: '100%'
      top: '0px'
      bottom: '100%'
    normalize = (val) -> replacer[val] or val
    getBackgroundSizes = (el) ->
      $.css(el, 'background-position').split /\s+/, 2


    for direction, i in ['x', 'y']
      do (direction, i) ->
        $.cssHooks["background-position-#{direction}"] =
        $.cssHooks["backgroundPosition#{direction.toUpperCase()}"] =
          get: (el) -> getBackgroundSizes(el)[i]
          set: (el, val) ->
            sizes = getBackgroundSizes el
            sizes[i] = normalize val
            $.style el, 'background-position', sizes.join ' '
        $.fx.step["background-position-#{direction}"] =
        $.fx.step["backgroundPosition#{direction.toUpperCase()}"] = ({ elem, prop, now }) ->
          $.style elem, prop, now

    $.jquerized ?= {}
    $.jquerized['background-position'] = true
