###
Anchor is a wrapper of <a href="#*">.
###

View = require './view'
$ = require 'jquery'


module.exports =
class Anchor extends View

  ###
  Creates a Anchor instance.
  ###
  constructor: ->
    super

    @on 'click', @onClick

  ###
  Click event
  ###
  onClick: (e) =>
    href = @attr 'href'
    if href is '#'
      top = 0
    else
      $el = $ href
      return if $el.length is 0
      top = $el.offset().top

    e.preventDefault()

    $ 'html,body'
    .stop true, false
    .animate
      scrollTop: top
    , 600 #, 'easeOutQuad'
