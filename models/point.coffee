###
Every Point function returns new Point.
###

{ sqrt } = Math

module.exports =
class Point

  @lerp: (pt1, pt2, ratio) ->
    vector = pt2.sub pt1
    pt1.add vector.mul ratio

  @distance: (pt1, pt2) ->
    pt2.sub(pt1).distance()

  @positionToPoint: (left, top) ->
    if left? and left.left? and left.top?
      { left, top } = left
    new Point left, top

  constructor: (x, y) ->
    if x? and x.x? and x.y?
      {x, y} = x
    @x = x ? 0
    @y = y ? 0

  clone: -> new Point @x, @y

  distance: ->
    sqrt @x * @x + @y * @y

  subtract: (x, y) ->
    if x? and x.x? and x.y?
      {x, y} = x
    new Point @x - x, @y - y
  sub: Point::subtract

  add: (x, y) ->
    if x? and x.x? and x.y?
      {x, y} = x
    new Point @x + x, @y + y

  multiply: (n) ->
    new Point @x * n, @y * n
  mul: Point::multiply
