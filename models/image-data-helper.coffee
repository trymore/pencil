iota = require('../models/iota')()

module.exports =
class ImageDataUtil

  @LEFT: 1 << iota()
  @RIGHT: 1 << iota()
  @TOP: 1 << iota()
  @BOTTOM: 1 << iota()

  @context: (width, height) ->
    canvas = document.createElement 'canvas'
    canvas.width = width
    canvas.height = height
    canvas.getContext '2d'

  @new: (width, height) ->
    context = ImageDataUtil.context width, height
    context.getImageData 0, 0, width, height

  @clone: (imageData) ->
    context = ImageDataUtil.context imageData.width, imageData.height
    context.putImageData imageData, 0, 0
    context.getImageData 0, 0, imageData.width, imageData.height

  @chop: (imageData, direction) ->
    { width, height, data } = imageData

    context = ImageDataUtil.context width, height
    context.putImageData imageData, 0, 0

    minX = 0
    maxX = width - 1
    minY = 0
    maxY = height - 1
    if (direction && ImageDataUtil.RIGHT) is ImageDataUtil.RIGHT
      right = do ->
        x = maxX
        while x >= minX
          y = maxY
          while y >= minY
            return x if data[3 + 4 * (height * x + y)] isnt 0
            y--
          x--
        return 0
      return context.getImageData 0, 0, right + 1, height
