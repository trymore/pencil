{createTweetUrl} = require '../../models/sns/twitter'
View = require '../view'


class Twitter extends View

  attrText: 'data-twitter-text'
  attrUrl: 'data-twitter-url'
  attrHashTags: 'data-twitter-hashtags'
  attrDest: 'href'

  constructor: ->
    super
    url = createTweetUrl
      text: @attr @attrText
      url: @attr @attrUrl
      hashtags: @attr @attrHashTags
    @attr @attrDest, url


class TwitterManager extends View

  selector: '.js-twitter'

  constructor: ->
    super
    @twitters = for el in @
      new Twitter el


module.exports = {Twitter, TwitterManager}
