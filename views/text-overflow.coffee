View = require './view'

###
行数オプションを付与したCSS3のtext-overflowエミュレーションです。
###
module.exports =
class TextOverflow extends View

  constructor: ({}, @rows, @replacer = '...') ->
    super
    @update()

  update: ->
    text = @text()
    i = 0
    len = text.length
    rows = 0

    # 文字数を1文字から増やしながら要素の高さを取得します。
    # 高さが増えると行数カウンタをインクリメントします。
    # 行数カウンタが指定行数を超えるまで試行します。
    while ++i < len && rows <= @rows
      @text text.substr 0, i
      h = @height()
      if !height? or h > height
        height = h
        rows++

    # 末尾に代替文字を付け文字数を減らしながら要素の高さを取得します。
    # 高さが減ると行数カウンタをデクリメントします。
    # 行数カウンタが指定行以下になるまで試行します。
    while --i >= 0 && rows > @rows
      @text text.substr(0, i) + @replacer
      h = @height()
      if !height? or h < height
        height = h
        rows--
