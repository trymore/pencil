###
Button turns mouse enabled
###

View = require './view'


module.exports =
class Preventable extends View

  events: '
    blur focus focusin focusout load resize scroll unload click dblclick
    mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave
    change select submit keydown keypress keyup error
    '

  ###
  Creates a Button instance.
  ###
  constructor: ->
    super

    @enabled = true
    @on @events, @onMouse

  ###
  Mouse event listener
  ###
  onMouse: (e) =>
    unless @enabled
      e.preventDefault()
      e.stopPropagation()
      e.stopImmediatePropagation()
