###
Tab class.
###

View = require '../view'

module.exports =
class Tab extends View

  selectorButtons: '.js-button'
  selectorContents: '.js-content'

  constructor: ->
    super
    @$ @selectorButtons
    .on 'selectable.changed', @onSelectableChanged
    @contents = @$ @selectorContents

  onSelectableChanged: (e, index) =>
    e.preventDefault()
    @toggle index

  toggle: (index) =>
    @contents.data('view').selectAt index
