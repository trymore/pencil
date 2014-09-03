View = require './view'


###
ユーザイベントの伝播を停止するViewです。
###
module.exports =
class Preventable extends View

  ###
  @private
  @property String 停止対象のイベントです。
  ###
  events: '
    blur focus focusin focusout load resize scroll unload click dblclick
    mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave
    change select submit keydown keypress keyup error
    '

  ###
  インスタンスを生成します。
  ###
  constructor: ->
    super

    @enabled = true
    @on @events, @onMouse

  ###
  @private
  イベント発生時に`enabled`が`false`ならイベントに関する全ての動作を停止します。

  1. デフォルト動作を停止します。
  2. イベントの伝播を停止します。
  3. このインスタンスのコンストラクタ以降に登録されたイベントのコールバックをコールしません。
  ###
  onMouse: (e) =>
    unless @enabled
      e.preventDefault()
      e.stopPropagation()
      e.stopImmediatePropagation()
