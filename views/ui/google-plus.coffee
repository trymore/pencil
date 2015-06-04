{createShareUrl} = require '../../models/sns/google-plus'
View = require '../view'


class GooglePlus extends View

  attrUrl: 'data-google-plus-url'
  attrDest: 'href'

  constructor: ->
    super

    attrUrl = @attr @attrUrl
    optUrl =
      if attrUrl then attrUrl else location.href

    url = createShareUrl
      url: optUrl
    @attr @attrDest, url


class GooglePlusManager extends View

  selector: '.js-google-plus'

  constructor: ->
    super
    @googlePluses = for el in @
      new GooglePlus el


module.exports = {GooglePlus, GooglePlusManager}
