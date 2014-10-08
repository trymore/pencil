View = require './view'
$ = require 'jquery'
require('../models/easing').jquerize $


###
アンカーをスムーススクロールするViewです。
###
module.exports =
class Anchor extends View

  ###
  アンカーインスタンスを生成します。
  ###
  constructor: ->
    super

    @on 'click', @onClicked

  ###
  @private
  クリック時のコールバックです。
  ###
  onClicked: (e) =>
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
      ,
        duration: 600
        easing: 'easeOutQuad'
        complete: =>
          @trigger 'anchor.animated'
