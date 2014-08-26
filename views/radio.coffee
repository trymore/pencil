###
Radio is a wrapper of <input type="radio">.
###

View = require './view'
$ = require 'jquery'

module.exports =
class Radio extends View

  checked: 'is-checked'

  ###
  Creates a Radio instance.
  ###
  constructor: ->
    super
    @$radio = @$ 'input[type=radio]'
    .on 'change radio.change', @update
    if (name = @$radio.attr 'name') isnt ''
      @$otherRadios = $ "input[type=radio][name=#{name}]"
      .not @$radio
    @update()

  ###
  Reflects checked status of the raw element to myself.
  ###
  update: =>
    if @$radio.prop 'checked'
      @addClass @checked
      @$otherRadios?.trigger 'radio.change'
    else
      @removeClass @checked
