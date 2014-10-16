###
Checkbox is a wrapper of <input type="checkbox">.
###

View = require '../view'

module.exports =
class Checkbox extends View

  classChecked: 'is-checked'

  ###
  Creates a Checkbox instance.
  ###
  constructor: ->
    super
    @$checkbox = @$ 'input[type=checkbox]'
    .on 'change', @update
    @update()

  ###
  Reflects checked status of the raw element to myself.
  ###
  update: =>
    if @$checkbox.prop 'checked'
      @addClass @classChecked
    else
      @removeClass @classChecked
