###!
The code of `View#pushStack()` and `View#end()` are borrowed from space-pen.
@see https://github.com/atom/space-pen/blob/master/src/space-pen.coffee
@license https://github.com/atom/space-pen/blob/master/LICENSE
###

jQuery = require 'jquery'
{ template } = require 'lodash'
$window = jQuery window
$document = jQuery window.document

###
trigger()のエイリアスです。
###
jQuery.fn.emit = jQuery.fn.trigger

###
one()のエイリアスです。
###
jQuery.fn.once = jQuery.fn.one

###
Viewクラスはview-controllerの基底クラスです。
jQueryのラッパとして動作し、jQuery.fnに実装されているメソッドを委譲しています。
委譲されたメソッドの戻り値はjQuery.fnの戻りそのもので、
Viewインスタンスをコンテクストとしてメソッドチェーンを行うことはできません。
@dependsOn jquery
@dependsOn lodash
###
module.exports =
class View extends jQuery

  @$window: $window
  @$document: $document

  ###
  要素のテンプレートとなるStringです。
  ###
  @template: null

  ###
  要素のセレクタです。
  ###
  selector: null

  ###
  セレクタか生成する要素のHTMLを渡すと、新しいViewインスタンスを返します。
  次のような優先順位で継承元(jQuery)コンストラクタをコールします。
  1. `@constructor.template`が設定されている場合: テンプレートから要素を生成します
  2. `@selector`が設定されている場合: 第一引数をコンテクストとしてセレクタを検索します
  3. 第一引数が指定されている場合: 第一引数から要素を生成・検索します。
  4. 第一引数が指定されていない場合: `<div>`要素を生成します。
  ###
  constructor: (arg0) ->
    if @constructor.template?
      @constructor.templateFunc ?= template @constructor.template
      $el = super jQuery.parseHTML @constructor.templateFunc (data = arg0)
    else if @selector?
      $el = super @selector, (context = arg0)
    else
      $el = super (selector = arg0) or '<div>'

    # jQueryオブジェクトのプロパティをコピーします
    for prop, val of $el
      if $el.hasOwnProperty prop
        @[prop] = val

    # jQueryオブジェクトのdataに'view'としてインスタンスを登録します
    @data 'view', @

    @dfds = []

  defer: ->
    dfd = @constructor.Deferred()
    @dfds.push dfd
    dfd
  reject: ->
    for dfd in @dfds
      dfd.reject()
    @dfds = []

  ###
  findのショートハンドです。
  ###
  $: -> jQuery.fn.find.apply @, arguments
  # addListener: -> jQuery.fn.on.apply @, arguments

  ###
  ラッパを生成するjQueryメソッドをオーバーライドします。
  ここではViewインスタンスを生成するのではなく、jQueryオブジェクトを生成します。
  ###
  pushStack: (elems) ->
    ret = jQuery.merge(jQuery(), elems)
    ret.prevObject = this
    ret.context = @context
    ret

  ###
  ラッパを生成するjQueryメソッドをオーバーライドします。
  ここではViewインスタンスを生成するのではなく、jQueryオブジェクトを生成します。
  ###
  end: ->
    @prevObject ? jQuery(null)


###
viewのインスタンスを取得します。
メソッドチェーンを行う際に、jQueryオブジェクトに移ったコンテクストを
Viewインスタンスに戻すことができます。
```coffeescript
new View '.some' // Viewインスタンスを生成します
.appendTo 'body' // jQueryのメソッドをコールします
.view().some()   // Viewに実装されたメソッドをコールします
```
###
jQuery.fn.view = -> @data 'view'
