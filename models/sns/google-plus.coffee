{stringify} = require '../query-string'

UA = window.navigator.userAgent

###
Google+の提供するサービスを利用するためのクラスです。
###
module.exports =
class GooglePlus

  ###
  ウェブサイトをシェアする為のURLを生成します。
  @param [String] url ウェブサイトのURLです。
  @return [String] シェアする為のURLです。
  ###
  @createShareUrl: (url) -> "https://plus.google.com/share?#{stringify {url}}"

  ###
  ウェブサイトのシェア数を取得します。
  @param [String] url ウェブサイトのURLです。
  @param [Function] callback コールバックです。
  ###
  @fetchShareCount: (url, callback) ->
    $
    .ajax
      url: "http://query.yahooapis.com/v1/public/yql?env=http://datatables.org/alltables.env&q=#{encodeURIComponent "SELECT content FROM data.headers WHERE url='https://plusone.google.com/_/+1/fastbutton?hl=ja&url=#{url}' and ua='#{UA}'"}"
      type: 'get'
      cache: false
      dataType: 'xml'
      error: ({}, type) ->
        callback type
      success: (document) ->
        str = $(document).find('content').text().match(/<script type="text\/javascript">window\.__SSR = ([\s\S]*?);/)[1]
        str = str.replace /\r?\n/g, ''
        obj = null
        eval "obj = #{str};"
        count = obj.ld[1][4]

        unless count?
          callback 'no data'
          return
        callback null, parseInt count, 10
