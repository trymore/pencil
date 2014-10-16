View = require '../view'

###
ボタンの押下で開閉でするUIです。
###
module.exports =
class Drawer extends View

  ###
  トグルのトリガとなるボタンのセレクタです。
  ###
  selectorButton: '.js-drawer-button'

  ###
  開閉するエリアのセレクタです。
  ###
  selectorContent: '.js-drawer-content'

  ###
  開いた際に自身に付けられるクラスです。
  ###
  classOpened: 'is-opened'

  ###
  Drawerのインスタンスを作ります。
  ###
  constructor: ->
    super
    @$ @selectorButton
      .on 'click', @toggle
    @$content = @$ @selectorContent

  ###
  表示状態をトグルする
  ###
  toggle: =>
    if @hasClass @classOpened
      @removeClass @classOpened
      @$content
        .stop true, false
        .slideUp()
    else
      @addClass @classOpened
      @$content
        .stop true, false
        .slideDown()
