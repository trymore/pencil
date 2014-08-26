###
Selectable class.
###

View = require './view'


module.exports =
class Selectable extends View

  constructor: ->
    super
    @selectees = @children()
    .on 'click', @toggle

  toggle: (e) =>
    selectedIndex = @selectees.index e.currentTarget
    @selectAt selectedIndex
    @trigger 'selectable.changed', selectedIndex

  selectAt: (selectedIndex) ->
    @selectees
    .removeClass 'is-selected'
    .eq selectedIndex
    .addClass 'is-selected'
