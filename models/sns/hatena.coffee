###
Hatenaの提供するサービスを利用するためのクラスです。
###
module.exports =

  ###
  ウェブサイトをブックマークする為のURLを生成します。
  @param [Ojbect] options オプションです。
  @param options [String] url ウェブサイトのURLです。
  @return [String] ブックマークする為のURLです。
  ###
  createBookmarkUrl: ({url}) ->
    # Don't encode url.
    "http://b.hatena.ne.jp/entry/add/#{url}"
