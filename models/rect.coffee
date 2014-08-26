###
Every Rect function returns new Rect.
###

Point = require './point'
{floor, ceil} = Math

module.exports =
class Rect

  @createWithCorner: (left, right, top, bottom) -> new Rect left, top, right - left, bottom - top

  constructor: (x, y, width, height) ->
    if x? and x.x? and x.y? and x.width? and x.height?
      {x, y, width, height} = x
    @x = x ? 0
    @y = y ? 0
    @width = width ? 0
    @height = height ? 0

  clone: -> new Rect @x, @y, @width, @height

  getLeft: -> @x
  getRight: -> @x + @width
  getTop: -> @y
  getBottom: -> @y + @height
  getLeftTop: -> new Point @getLeft(), @getTop()
  getLeftBottom: -> new Point @getLeft(), @getBottom()
  getRightTop: -> new Point @getRight(), @getTop()
  getRightBottom: -> new Point @getRight(), @getBottom()

  contain: (x, y) ->
    if x? and x.x? and x.y?
      {x, y} = x
    rect = @clone()
    right = rect.getRight()
    if x < rect.x
      rect.x = x
      rect.width = right - rect.x
    else if x > right
      rect.width = x - rect.x
    bottom = rect.getBottom()
    if y < rect.y
      rect.y = y
      rect.height = bottom - rect.y
    else if y > bottom
      rect.height = y - rect.y
    rect

  ceil: ->
    left = floor @getLeft()
    right = ceil @getRight()
    top = floor @getTop()
    bottom = ceil @getBottom()
    Rect.createWithCorner left, right, top, bottom

  floor: ->
    left = ceil @getLeft()
    right = floor @getRight()
    top = ceil @getTop()
    bottom = floor @getBottom()
    Rect.createWithCorner left, right, top, bottom
