{isArguments, isArray, isObject} = require 'lodash'
{sqrt, cos, atan2} = Math


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

  # @positionToPoint: (left, top) ->
  #   if left? and left.left? and left.top?
  #     { left, top } = left
  #   new Point left, top

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

  ###
  `Point`インスタンスを生成します。
  @param [Number] x xの値です。
  @param [Number] y yの値です。

  @param [Array<Number>] elems x, yからなる配列です。

  @param [Point] point `Point`インスタンスです。

  @param [Object] obj x, yからなるオブジェクトです。
  @param obj [Number] x xの値です。
  @param obj [Number] y yの値です。
  ###
  constructor: (x, y) ->
    parse = (args) ->
      switch args.length
        when 0
          []
        when 1
          obj = args[0]
          if isArguments obj
            parse obj
          else if isArray obj
            obj
          else if (obj instanceof Point) or isObject(obj)
            [obj.x, obj.y]
          else
            args
        else
          args
    elems = parse arguments
    for i in [0..1]
      elems[i] = if (val = elems[i])?
        parseFloat val
      else
        0
    [@x, @y] = elems

  ###
  複製します。
  @return [Point] 複製された`Point`インスタンスです。
  ###
  clone: -> new Point @x, @y

  ###
  配列化します。
  @return [Array<Number>] x, yからなる配列です。
  ###
  toArray: -> [@x, @y]

  toPosition: -> {left: @x, top: @y}

  ###
  原点からの距離を求めます。
  @return [Number] 距離です。
  ###
  distance: -> sqrt @x * @x + @y * @y

  ###
  x軸正の向きからの偏角を求めます。
  @return [Number] 角度です。(rad)
  ###
  angle: -> atan2 @y, @x

  ###
  減算します。
  @param [Point] point 減算する`Point`です。
  @return [Point] 計算結果の新しい`Point`です。
  ###
  subtract: (x, y) ->
    if x? and x.x? and x.y?
      {x, y} = x
    new Point @x - x, @y - y

  ###
  Point#subtract のショートハンドです。
  @see Point#subtract
  ###
  sub: Point::subtract

  ###
  加算します。
  @param [Point] point 加算する`Point`です。
  @return [Point] 計算結果の新しい`Point`です。
  ###
  add: (x, y) ->
    if x? and x.x? and x.y?
      {x, y} = x
    new Point @x + x, @y + y

  ###
  各要素に乗算します。
  @param [Number] x x要素に乗算する数です。
  @param [Number] y y要素に乗算する数です。指定しない場合はxの値となります。
  @return [Point] 計算結果の新しい`Point`です。
  ###
  multiply: (x, y = x) -> new Point @x * x, @y * y

  ###
  Point#multiply のショートハンドです。
  @see Point#multiply
  ###
  mul: Point::multiply

  ###
  各要素を除算します。
  @param [Number] x x要素に除算する数です。
  @param [Number] y y要素に除算する数です。指定しない場合はxの値となります。
  @return [Point] 除算結果の新しい`Point`です。
  ###
  devide: (x, y = x) -> new Point @x / x, @y / y

  ###
  Point#devide のショートハンドです。
  @see Point#devide
  ###
  dev: Point::devide

  ###
  ベクトルの内積を求めます。
  a ・ b = |a||b|cos(θ)
  @param [Point] point 内積をする`Point`です。
  @return [Number] 内積の結果です。
  ###
  dotProduct: (point) ->
    # a = @
    # b = new Point arguments
    # theta = a.sub(b).angle()
    # a.distance() * b.distance() * cos theta
    a = @
    b = new Point arguments
    a.x * b.x + a.y * b.y

  ###
  ベクトルの外積を求めます。
  a x b = |a||b|sin(θ)
  @param [Point] point 外積をする`Point`です。
  @return [Number] 外積の結果です。
  ###
  # crossProduct: (point) ->
  #   a = @
  #   b = new Point arguments
  #   theta = b.sub(a).angle()
  #   a.distance() * b.distance() * sin theta

  ###
  指定領域内に収まる新しい`Point`を返します。
  @param [Rect] rect `Point`を収める領域です。
  @return [Point] 領域内に収まる新しい`Point`です。
  ###
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
