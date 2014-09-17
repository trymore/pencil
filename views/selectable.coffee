###
Selectable class.
###

View = require './view'
$ = require 'jquery'

module.exports =
class Selectable extends View

  selectorExclude: '.js-selectableExclude'

  constructor: ->
    super
    @selectees = @children().not(@selectorExclude)
      .on 'click', @onSelecteeClicked

  onSelecteeClicked: (e) =>
    selectedIndex = @selectees.index e.currentTarget
    @selectAt selectedIndex
    @trigger 'selectable.changed', selectedIndex

  selectAt: (selectedIndex) ->
    @selectees
    .removeClass 'is-selected'
    .eq selectedIndex
    .addClass 'is-selected'
