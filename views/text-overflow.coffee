View = require './view'

###
行数オプションを付与したCSS3のtext-overflowエミュレーションです。
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

  constructor: ({}, @rows, @replacer = '...') ->
    super
    @defaultText = @text()
    @constructor.register @
    @update()

  remove: ->
    @constructor.unregister @
    super

  update: ->
    i = 0
    len = @defaultText.length
    rows = 0

    # 文字数を1文字から増やしながら要素の高さを取得します。
    # 高さが増えると行数カウンタをインクリメントします。
    # 行数カウンタが指定行数を超えるまで試行します。
    while ++i < len && rows <= @rows
      @text @defaultText.substr 0, i
      h = @height()
      if !height? or h > height
        height = h
        rows++

    # 末尾に代替文字を付け文字数を減らしながら要素の高さを取得します。
    # 高さが減ると行数カウンタをデクリメントします。
    # 行数カウンタが指定行以下になるまで試行します。
    while --i >= 0 && rows > @rows
      @text @defaultText.substr(0, i) + @replacer
      h = @height()
      if !height? or h < height
        height = h
        rows--
