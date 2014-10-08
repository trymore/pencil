View = require './view'

###
CSS3 の text-overflow に行数オプションを付与したエミュレーション実装です。
###
module.exports =
class TextOverflow extends View

  [instances] = []

  @register: (textOverflow) ->
    unless instances?
      instances = []
      @$window.on 'resize', @onWindowResized
    instances.push textOverflow

  @unregister: (textOverflow) ->
    return unless @instances
    @instances.splice instances.indexOf(textOverflow), 1
    if instances.length is 0
      instances = null
      @$window.off 'resize', @onWindowResized

  @onWindowResized: ->
    for instance in instances
      instance.update()

  ###
  TextOverflow インスタンスを生成します。
  TextOverflow#update() をコールします。
  @param element [String|jQueryObject|HTMLElement] 要素です
  @param rows [Integer] 置換処理を行う下限の行数です。この行数に収まるように置換処理が行われます。
  @param replacer [String] 置換文字列です。
  ###
  constructor: ({}, @rows = 1, @replacer = '...') ->
    super
    @defaultText = @text()
    @constructor.register @
    @update()

  remove: ->
    @constructor.unregister @
    super

  ###
  指定列数に収まっている場合、元の文字列を全て表示します。
  収まっていない場合、収まるように余分な文字列を置換文字列に置き換えます。
  ###
  update: ->
    i = 0
    len = @defaultText.length
    rows = 0

    # 文字数を1文字から増やしながら要素の高さを取得します。
    # 高さが増えると行数カウンタをインクリメントします。
    # 行数カウンタが指定行数を超えるまで試行します。
    while ++i <= len && rows <= @rows
      @text @defaultText.substr 0, i
      h = @height()
      if !height? or h > height
        height = h
        rows++

    # 指定行以下なら何もしません。
    return if rows <= @rows

    # 末尾に代替文字を付け文字数を減らしながら要素の高さを取得します。
    # 高さが減ると行数カウンタをデクリメントします。
    # 行数カウンタが指定行以下になるまで試行します。
    while --i >= 0 && rows > @rows
      @text @defaultText.substr(0, i) + @replacer
      h = @height()
      if !height? or h < height
        height = h
        rows--
