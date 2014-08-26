###
Tab class.
###

View = require './view'

module.exports =
class Tab extends View

  constructor: ->
    super

    @$buttons = @$ '.js-tabButton'
    .on 'click', @toggle
    @$contents = @$ '.js-tabContent'

  toggle: (e) =>
    for button, i in @$buttons
      $button = @$buttons.eq i
      $content = @$contents.eq i
      if button is e.currentTarget
        $button.addClass 'is-selected'
        $content.addClass 'is-selected'
      else
        $button.removeClass 'is-selected'
        $content.removeClass 'is-selected'
