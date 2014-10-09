{createShareUrl} = require '../../models/sns/facebook'
View = require '../view'


class Facebook extends View

  attrUrl: 'data-facebook-url'
  attrDest: 'href'

  constructor: ->
    super
    url = createShareUrl
      url: @attr @attrUrl
    @attr @attrDest, url


class FacebookManager extends View

  selector: '.js-facebook'

  constructor: ->
    super
    @facebooks = for el in @
      new Facebook el


module.exports = {Facebook, FacebookManager}
