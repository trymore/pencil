###
SNS creates a URL for service provided by SNS.
###

ua = navigator.userAgent
stringify = (obj) ->
  queries = []
  for name, value of obj
    queries.push "#{name}=#{encodeURIComponent value ? ''}"
  queries.join '&'

module.exports =

  ###
  Facebook
  ###
  facebook:
    createUrl: (url) ->
      "http://www.facebook.com/share.php?#{stringify u: url}"
    fetchCount: (url) ->
      $
      .ajax
        url: 'https://graph.facebook.com/'
        type: 'get'
        cache: false
        data:
          url: url
        dataType: 'jsonp'
      .then ({ error, shares }) ->
        d = $.Deferred()
        if error?
          d.reject error
        else
          d.resolve shares ? 0

  ###
  Twitter
  ###
  twitter:
    createUrl: (text, url, hashtags) ->
      "http://twitter.com/share?#{stringify {text, url, hashtags}}"
    fetchCount: (url) ->
      $
      .ajax
        url: 'http://urls.api.twitter.com/1/urls/count.json'
        type: 'get'
        cache: false
        data:
          url: url
        dataType: 'jsonp'
      .then ({ count }) ->
        count

  ###
  Google+
  ###
  googlePlus:
    createUrl: (url) ->
      "https://plus.google.com/share?#{stringify {url}}"
    fetchCount: (url) ->
      $
      .ajax
        url: "http://query.yahooapis.com/v1/public/yql?env=http://datatables.org/alltables.env&q=#{encodeURIComponent "SELECT content FROM data.headers WHERE url='https://plusone.google.com/_/+1/fastbutton?hl=ja&url=#{url}' and ua='#{ua}'"}"
        type: 'get'
        cache: false
        dataType: 'xml'
      .then (document) ->
        str = $(document).find('content').text().match(/<script type="text\/javascript">window\.__SSR = ([\s\S]*?);/)[1]
        str = str.replace /\r?\n/g, ''
        obj = null
        eval "obj = #{str};"
        obj.ld[1][4]

  ###
  Pinterest
  ###
  pinterest:
    createPinItUrl: ({ url, media, description }) ->
      "http://www.pinterest.com/pin/create/button/?#{stringify arguments[0]}"

  ###
  Hatena bookmark
  ###
  hatenaBookmark:
    createUrl: (url) ->
      # Don't encode url.
      "http://b.hatena.ne.jp/entry/add/#{url}"
    fetchCount: (url) ->

  ###
  Line
  ###
  line:
    createChatUrl: (text) ->
      text = encodeURIComponent text
      if $.os.mobile
        "line://msg/text/#{text}"
      else
        "http://line.naver.jp/R/msg/text/?#{text}"
