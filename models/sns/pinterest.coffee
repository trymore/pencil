{ stringify } = require '../query-string'


###
Pinterestの提供するサービスを利用するためのクラスです。
###
module.exports =
class Pinterest

  ###
  ウェブサイトをピンする為のURLを生成します。
  @param [Object] options オプションです。
  @option options [String] url ウェブサイトのURLです。
  @option options [String] media 画像等のメディアのURLです。
  @option options [String] description 説明文です。
  @return [String] シェアする為のURLです。
  ###
  @createPinItUrl: (options) ->
    "http://www.pinterest.com/pin/create/button/?#{stringify options}"
