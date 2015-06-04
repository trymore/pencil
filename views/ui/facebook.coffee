{createShareUrl} = require '../../models/sns/facebook'
View = require '../view'


class Facebook extends View

  attrUrl: 'data-facebook-url'
  attrDest: 'href'

  constructor: ->
    super

    attrUrl = @attr @attrUrl
    optUrl =
      if attrUrl then attrUrl else location.href

    url = createShareUrl
      url: optUrl
    @attr @attrDest, url


class FacebookManager extends View

  selector: '.js-facebook'

  constructor: ->
    super
    @facebooks = for el in @
      new Facebook el


module.exports = {Facebook, FacebookManager}
