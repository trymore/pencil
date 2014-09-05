{ stringify } = require '../query-string'


###
Facebookの提供するサービスを利用するためのクラスです。
###
module.exports =
class Facebook

  ###
  ウェブサイトをシェアする為のURLを生成します。
  @param [String] url ウェブサイトのURLです。
  @return [String] シェアする為のURLです。
  ###
  @createShareUrl: (url) -> "http://www.facebook.com/share.php?#{stringify u: url}"

  ###
  ウェブサイトのシェア数を取得します。
  @param [String] url ウェブサイトのURLです。
  @param [Function] callback コールバックです。

  @example ウェブサイトのシェア数を取得をalertします。
      Facebook.fetchCount 'http://example.com', (err, shares) ->
        throw err if err?
        alert shares
  ###
  @fetchShareCount: (url, callback) ->
    $
    .ajax
      url: 'https://graph.facebook.com/'
      type: 'get'
      cache: false
      data:
        url: url
      dataType: 'jsonp'
      success: ({ shares }) ->
        unless shares?
          callback 'no data'
          return
        callback null, shares
      error: ({}, type) ->
        callback type
