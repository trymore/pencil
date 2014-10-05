View = require './view'
$ = require 'jquery'


###
アンカーをスムーススクロールするViewです。
###
module.exports =
class Anchor extends View

  selector: 'a[href^=#]'

  ###
  アンカーインスタンスを生成します。
  ###
  constructor: ->
    super

    @on 'click', @onClick

  ###
  @private
  クリック時のコールバックです。
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
