$ = window.jQuery = require 'jquery'
View              = require '../view'

module.exports =
class Check extends View

  selector: 'body'

  constructor: ->
    super

    @checkImg     = new Image()
    @imgPath      = location.href.split('/').reverse().slice(1).reverse().join('/') + '/demo.png'
    @checkImg.src = @imgPath

    @append "<div id=\"checkMask\"></div><input type=\"button\" id=\"btn-check\" value=\"Checkする\"><input id=\"opacity-level\" type=\"range\" min=\"0\" max=\"100\">"

    @$checkMask = $ '#checkMask'

    $ '#opacity-level'
      .css
        position : 'fixed'
        bottom   : 11
        right    : 10
        zIndex   : 100000
      .on 'change', @opacityChange

    $ '#btn-check'
      .css
        position : 'fixed'
        bottom   : 33
        right    : 10
        zIndex   : 100000
      .on 'click', @checkSet

    @constructor.$window.on 'load', @loadSet

  loadSet: =>
    @$checkMask.css
      height             : @checkImg.height
      width              : '100%'
      'background-image' : "url(#{@imgPath})"
      backgroundPosition : 'center top'
      backgroundRepeat   : 'no-repeat'
      position           : 'absolute'
      top                : 0
      left               : 0
      opacity            : 0.7
      zIndex             : 100000
      display            : 'none'

  checkSet: =>
    $self = $ event.currentTarget
    val   = if $self.val() is 'Checkする' then 'Maskを解除' else 'Checkする'
    $self.val val
    @$checkMask.toggle()

  opacityChange: (event) =>
    $self    = $ event.currentTarget
    opacity  = $self.val() / 100
    @$checkMask.css opacity: opacity
