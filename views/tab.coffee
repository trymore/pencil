###
Tab class.
###

View = require './view'

module.exports =
class Tab extends View

  selectorButtons: '.js-button'
  selectorContents: '.js-content'

  constructor: ->
    super
    @$ @selectorButtons
    .on 'selectable.changed', @toggle
    @$contents = @$ @selectorContents

  toggle: ({}, index) =>
    @$contents.data('view').selectAt index
