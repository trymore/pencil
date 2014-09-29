###
OS parses user agent and determines the OS type and version.
###

R_I_PHONE = /\((iphone).*?os ([\d_]+).*?\)/
R_I_POD = /\((ipod).*?os ([\d_]+).*?\)/
R_I_PAD = /\((ipad).*?os ([\d_]+).*?\)/
R_ANDROID = /\(.*?(android) ([\d\.]+).*?\)/
R_MAC = /\(.*?(mac) os .*?([\d_\.]+).*?\)/
R_LINUX = /\(.*?(linux).*\)/
R_WINDOWS = /\(.*?(windows).*?([\d_\.]+).*?\)/

module.exports =
class OS

  @create: (ua) ->
    @cache ?= {}
    if @cache[ua]?
      @cache[ua]
    else
      @cache[ua] = new OS ua

  constructor: (ua = window.navigator.userAgent) ->
    return new OS ua unless @ instanceof OS

    ua = ua.toLowerCase()

    [ {}, name, version ] =
      R_I_PHONE.exec(ua) or
      R_I_POD.exec(ua) or
      R_I_PAD.exec(ua) or
      R_ANDROID.exec(ua) or
      R_MAC.exec(ua) or
      R_WINDOWS.exec(ua) or
      R_LINUX.exec(ua) or
      []

    if name?
      @[name] = true
      @version = version.split('_').join('.')
    if @iphone or @ipod or @ipad
      @ios = true
    if @ios or @android
      @mobile = true
    if @version?
      number = parseFloat @version
      unless isNaN number
        @versionNumber = number

  jquerize: (jQuery) ->
    jQuery.os = @
