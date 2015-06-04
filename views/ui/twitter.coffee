$ = require 'jquery'
{createTweetUrl} = require '../../models/sns/twitter'
View = require '../view'


class Twitter extends View

  attrText: 'data-twitter-text'
  attrUrl: 'data-twitter-url'
  attrHashTags: 'data-twitter-hashtags'
  attrDest: 'href'

  constructor: ->
    super

    attrText = @attr @attrText
    optText =
      if attrText
        attrText
      else
        ogp = $('meta[property="og:description"]').attr 'content'
        if ogp then ogp else $('title').text()

    attrUrl = @attr @attrUrl
    optUrl =
      if attrUrl then attrUrl else location.href

    url = createTweetUrl
      text: optText
      url: optUrl
      hashtags: @attr @attrHashTags
    @attr @attrDest, url


class TwitterManager extends View

  selector: '.js-twitter'

  constructor: ->
    super
    @twitters = for el in @
      new Twitter el


module.exports = {Twitter, TwitterManager}
