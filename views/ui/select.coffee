###
Select is a wrapper of <input type="radio">.
###

View = require '../view'

module.exports =
class Select extends View

  labelSelector: '.js-label'

  ###
  Creates a Select instance.
  ###
  constructor: ->
    super
    @$label = @$ @labelSelector
    @$select = @$ 'select'
    .on 'change', @update
    @update()

  ###
  Reflects selected text of the raw element to the label element.
  ###
  update: =>
    @$label.text @$select.find('option:selected').text()
