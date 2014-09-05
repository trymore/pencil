###
Hatenaの提供するサービスを利用するためのクラスです。
###
module.exports =
class Hatena

  ###
  ウェブサイトをブックマークする為のURLを生成します。
  @param [String] url ウェブサイトのURLです。
  @return [String] ブックマークする為のURLです。
  ###
  @createBookmarkUrl: (url) ->
    # Don't encode url.
    "http://b.hatena.ne.jp/entry/add/#{url}"
