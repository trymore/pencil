Point = require './point'
{isNumber, isString, isArray, isObject, isArguments} = require 'lodash'
{floor, ceil} = Math


###
範囲クラスです。
二次元の直交座標系を扱います。
###
module.exports =
class Rect

  @createWithCorner: (left, right, top, bottom) -> new Rect left, top, right - left, bottom - top

  @parseArguments: (args) ->
    switch args.length
      when 0
        x: 0
        y: 0
        width: 0
        height: 0
      when 1
        args[0]
      when 2
        x: args[0].x
        y: args[0].y
        width: args[0].x
        height: args[0].y
      when 4
        x: args[0]
        y: args[1]
        width: args[2]
        height: args[3]
      else
        x: args[0] ? 0
        y: args[1] ? 0
        width: args[2] ? 0
        height: args[3] ? 0

  @argumentsToRect: (args) ->
    {x, y, width, height} = Rect.parseArguments args
    new Rect x, y, width, height

  @createWithCenter: (centerX, centerY, width, height) ->
    rect = Rect.argumentsToRect arguments
    rect.x -= rect.width / 2
    rect.y -= rect.height / 2
    rect

  ###
  `Rect`のインスタンスを生成します。
  @param [Number] x 範囲の起点となるx座標です。
  @param [Number] y 範囲の起点となるy座標です。
  @param [Number] width 範囲のx座標方向の大きさです。
  @param [Number] height 範囲のx座標方向の大きさです。
  ###
  constructor: (x, y, width, height) ->
    isElem = (elem) -> isNumber(elem) or isString(elem)
    parse = (args) ->
      switch args.length
        when 0
          []
        when 1
          arg = args[0]
          if isArguments arg
            parse arg
          else if isArray arg
            arg
          else if (arg instanceof Rect) or isObject arg
            [arg.x, arg.y, arg.width, arg.height]
          else
            throw new TypeError 'Rect constructor requires `Rect`, `Object` or `Array`'
        when 2
          new Point(args[0]).toArray().concat new Point(args[1]).toArray()
        when 3
          if !isElem(args[0])
            new Point(args[0]).toArray().concat [args[1], args[2]]
          else if !isElem(args[2])
            [args[0], args[1]].concat new Point(args[2]).toArray()
          else
            throw new TypeError 'Rect constructor requires (origin: Point, width: Number|String, height: Number|String) or (x: Number|String, y: Number|String, size: Point)'
        when 4
          args
        else
          throw new TypeError 'Rect constructor requires 0 to 4 parameters'
    elems = parse arguments
    for i in [0...4]
      elems[i] = if elems[i]? then parseFloat(elems[i]) else 0
    [@x, @y, @width, @height] = elems
    @normalize()

  normalize: ->
    if @width < 0
      @x += @width
      @width *= -1
    if @height < 0
      @y += @height
      @height *= -1

  ###
  複製します。
  @return [Rect] 複製された`Rect`インスタンスです。
  ###
  clone: -> new Rect @x, @y, @width, @height

  getLeft: -> @x
  getRight: -> @x + @width
  getTop: -> @y
  getBottom: -> @y + @height
  getLeftTop: -> new Point @getLeft(), @getTop()
  getLeftBottom: -> new Point @getLeft(), @getBottom()
  getRightTop: -> new Point @getRight(), @getTop()
  getRightBottom: -> new Point @getRight(), @getBottom()

  containsPoint: (point) ->
    {x, y} = Point.parseArguments arguments
    @getLeft() <= x <= @getRight() and @getTop() <= y <= @getBottom()

  containsRect: (rect) ->
    {x, y, width, height} = Rect.parseArguments arguments
    rect = new Rect x, y, width, height
    @getLeft() <= rect.getLeft() and rect.getRight() <= @getRight() and
    @getTop() <= rect.getTop() and rect.getBottom() <= @getBottom()

  offset: (x, y) ->
    new Rect @x + x, @y + y, @width, @height

  ###
  指定された量大きくした新たな領域を生成します。
  @param [Number] width 大きくする幅です。
  @param [Number] height 大きくする高さです。
  @return [Rect] 新たな領域です。
  ###
  inflate: (width, height) ->
    new Rect @x, @y, @width + width, @height + height

  ###
  指定された量小さくした新たな領域を生成します。
  @param [Number] width 小さくする幅です。
  @param [Number] height 小さくする高さです。
  @return [Rect] 新たな領域です。
  ###
  deflate: (width, height) ->
    new Rect @x, @y, @width - width, @height - height

  #TODO implement me
  union: (rect) ->


  ###
  指定の領域内に収まる新たな領域を生成します。
  1. x,yを収まるように設定します。
  2. 収まらない場合はwidth,heightを設定します。
  ###
  fallWithin: (rect) ->
    r = @clone()
    left0 = r.getLeft()
    right0 = r.getRight()
    top0 = r.getTop()
    bottom0 = r.getBottom()
    left1 = rect.getLeft()
    right1 = rect.getRight()
    top1 = rect.getTop()
    bottom1 = rect.getBottom()

    if left0 < left1
      r.x = left1
      # if (over = r.getRight() - right1) > 0
      #   r.width -= over
    if right0 > right1
      r.x -= right0 - right1
    if (over = r.getRight() - right1) > 0
      r.width -= over
    if top0 < top1
      r.y = top1
      # if (over = r.getBottom() - bottom1) > 0
      #   r.height -= over
    if bottom0 > bottom1
      r.y -= bottom0 - bottom1
    if (over = r.getBottom() - bottom1) > 0
      r.height -= over

    r

  movableRectIn: (rect) ->
    new Rect rect.x, rect.y, rect.width - @width, rect.height - @height


  ###
  この領域に指定座標が含まれる新たな領域を生成します。
  @param [Number] x x座標です。
  @param [Number] y y座標です。
  @return [Rect] 新たな領域です。
  ###
  contain: (x, y) ->
    if x? and x.x? and x.y?
      {x, y} = x
    r = @clone()
    right = r.getRight()
    if x < r.x
      r.x = x
      r.width = right - r.x
    else if x > right
      r.width = x - r.x
    bottom = r.getBottom()
    if y < r.y
      r.y = y
      r.height = bottom - r.y
    else if y > bottom
      r.height = y - r.y
    r

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
