{isArray, isObject} = require 'lodash'
{sqrt} = Math


###
ポイントクラスです。
二次元の直交座標系を扱います。
###
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

  @parseArguments: (args) ->
    args = switch args.length
      when 0
        []
      when 1
        if isArray args[0]
          args[0]
        else if isObject args[0]
          [args[0].x, args[0].y]
        else
          [args[0]]
      else
        args
    for i in [0..1]
      args[i] = if (val = args[i])?
        parseFloat val
      else
        args[i] = 0
    args


  ###
  `left`,`top`から成るオブジェクトから`Point`インスタンスを生成します。
  @param [Object] position 座標オブジェクトです。
  @option position [Integer] left x座標です。
  @option position [Integer] top y座標です。
  ###
  @createWithPosition: ({left, top}) -> new Point left, top

  ###
  `clientX`,`clientY`から成るオブジェクトから`Point`インスタンスを生成します。
  @param [Object] position 座標オブジェクトです。
  @option position [Integer] clientX x座標です。
  @option position [Integer] clientY y座標です。
  ###
  @createWithClient: ({clientX, clientY}) -> new Point clientX, clientY

  ###
  `pageX`,`pageY`から成るオブジェクトから`Point`インスタンスを生成します。
  @param [Object] position 座標オブジェクトです。
  @option position [Integer] pageX x座標です。
  @option position [Integer] pageY y座標です。
  ###
  @createWithPage: ({pageX, pageY}) -> new Point pageX, pageY


  constructor: (x, y) ->
    [@x, @y] = Point.parseArguments arguments

  ###
  複製します。
  @return [Point] 複製された`Point`インスタンスです。
  ###
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

  containIn: (rect) ->
    new Point (
      if @x < (x = rect.getLeft())
        x
      else if @x > (x = rect.getRight())
        x
      else
        @x
    ), (
      if @y < (y = rect.getTop())
        y
      else if @y > (y = rect.getBottom())
        y
      else
        @y
    )
