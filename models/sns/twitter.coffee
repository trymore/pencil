{ stringify } = require '../query-string'


###
Twitterの提供するサービスを利用するためのクラスです。
###
module.exports =
class Twitter

  ###
  ウェブサイトをツイートする為のURLを生成します。
  @param [Object] options オプションです。
  @option options [String] text 説明文です。
  @option options [String] url ウェブサイトのURLです。
  @option options [String] hashtags ハッシュタグです。
  @return [String] ツイートする為のURLです。
  ###
  @createTweetUrl: ({text, url, hashtags}) ->
    "http://twitter.com/share?#{stringify {text, url, hashtags}}"

  ###
  ウェブサイトのツイート数を取得します。
  @param [String] url ウェブサイトのURLです。
  @param [Function] callback コールバックです。
  ###
  @fetchTweetCount: (url, callback) ->
    $
    .ajax
      url: 'http://urls.api.twitter.com/1/urls/count.json'
      type: 'get'
      cache: false
      data: url: url
      dataType: 'jsonp'
      error: ({}, type) ->
        callback type
      success: ({ count }) ->
        unless count?
          callback 'no data'
          return
        callback null, count
