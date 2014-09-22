{ stringify } = require '../query-string'
{ mobile } = require '../../models/os'

###
Lineの提供するサービスを利用するためのクラスです。
###
module.exports =

  ###
  テキストをチャットする為のURLを生成します。
  @param [String] text テキストです。
  @return [String] チャットする為のURLです。
  ###
  createChatUrl: (text) ->
    text = encodeURIComponent text
    if mobile
      "line://msg/text/#{text}"
    else
      "http://line.naver.jp/R/msg/text/?#{text}"
