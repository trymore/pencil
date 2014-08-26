$ = require 'jquery'
View = require './view'
iota = require('../models/iota')()

hasAlpha = ({ data }) ->
  for {}, i in data by 4
    if data[i + 3] isnt 0
      return true
  false

module.exports =
class Slicer extends View

  @X: 1 << iota()
  @Y: 1 << iota()

  @replace: (img, direction = Slicer.X, filter) ->
    $img = $ img
    width = $img.width()
    height = $img.height()
    $canvas = $ '<canvas>'
    .attr
      width: width
      height: height
    canvas = $canvas[0]
    context = canvas.getContext '2d'
    context.drawImage $img[0], 0, 0

    $container = $ '<div>'
    .css
      display: 'inline-block'
      position: 'relative'
      width: width
      height: height

    switch direction
      when Slicer.X
        x = 0
        maxX = width - 1
        hasAlphaPrev = false
        while x <= maxX
          hasAlphaCurrent = hasAlpha context.getImageData x, 0, 1, height
          if !hasAlphaPrev and hasAlphaCurrent
            startX = x
          else if hasAlphaPrev and !hasAlphaCurrent
            imageData = context.getImageData startX, 0, x - startX, height
            if filter?
              imageData = filter imageData
            char = new Slicer imageData, startX, 0
            $container.append char.$canvas
          else if x is maxX and hasAlphaCurrent
            imageData = context.getImageData startX, 0, width - startX, height
            if filter?
              imageData = filter imageData
            char = new Slicer imageData, startX, 0
            $container.append char.$canvas
          hasAlphaPrev = hasAlphaCurrent
          x++
      when Slicer.Y
        y = 0
        maxY = height - 1
        hasAlphaPrev = false
        while y <= maxY
          hasAlphaCurrent = hasAlpha context.getImageData 0, y, width, 1
          if !hasAlphaPrev and hasAlphaCurrent
            startY = y
          else if hasAlphaPrev and !hasAlphaCurrent
            imageData = prev = context.getImageData 0, startY, width, y - startY
            if filter?
              imageData = filter imageData
            char = new Slicer imageData, 0, startY
            $container.append char.$canvas
          else if y is maxY and hasAlphaCurrent
            imageData = prev = context.getImageData 0, startY, width, height - startY
            if filter?
              imageData = filter imageData
            char = new Slicer imageData, 0, startY
            $container.append char.$canvas
          hasAlphaPrev = hasAlphaCurrent
          y++
      else
        throw new TypeError "direction must be specified with `Slicer.X` or `Slicer.Y`"

    $img.replaceWith $container
    $container

  constructor: (imageData, left, top) ->
    super

    @$canvas = $ '<canvas>'
    .attr
      width: imageData.width
      height: imageData.height
    context = @$canvas[0].getContext '2d'
    context.putImageData imageData, 0, 0
    @$canvas
    .css
      position: 'absolute'
      left: left
      top: top
