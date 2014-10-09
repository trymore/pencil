###
Drawer class.
###

View = require '../view'

module.exports =
class Drawer extends View

  selectorButton: '.js-button'
  selectorContent: '.js-content'
  classOpened: 'is-opened'

  constructor: ->
    super
    @$ @selectorButton
    .on 'click', @toggle
    @content = @$ @selectorContent

  toggle: ({}, index) =>
    if @hasClass @classOpened
      @removeClass @classOpened
      @content
      .stop true, false
      .slideUp()
    else
      @addClass @classOpened
      @content
      .stop true, false
      .slideDown()
