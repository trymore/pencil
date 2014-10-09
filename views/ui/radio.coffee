View = require '../view'

###
`<input type="radio">`をスタイリングするためのラッパです。
ラジオボタンの状態をクラスとして要素に付与することでCSSに状態を伝達します。

ラジオボタンが元々もっている下記の機能をサポートします。
- `selected`属性が付いている場合は初期化時に選択されているクラスを付与します。
- `name`属性によるグルーピングが有効です。
グループの中の1つがユーザにより選択されると既に選択されていたラジオボタンは選択状態ではなくなります。

@example ラジオボタンのマークアップ
    <span class="radio">
      <input type="radio">
    </span>
###
module.exports =
class Radio extends View

  ###
  @property String ラジオボタンが`checked`になった際に要素に付与されるクラス名です。
  ###
  checked: 'is-checked'

  ###
  インスタンスを生成します。
  ###
  constructor: ->
    super
    @radio = @$ 'input[type=radio]'
    .on 'change radioChange', @update
    @form = @radio.closest 'form'
    if (name = @radio.attr 'name') isnt ''
      @otherRadios = @form.find "input[type=radio][name=#{name}]"
      .not @radio
    @update()

  ###
  @private
  ラジオボタンの状態によりクラスを付与・除去します。
  ###
  update: =>
    if @radio.prop 'checked'
      @addClass @checked
      @otherRadios?.trigger 'radioChange'
    else
      @removeClass @checked
