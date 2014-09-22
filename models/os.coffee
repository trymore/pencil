###
OS parses user agent and determines the OS type and version.
###

R_I_PHONE = /\((iphone).*?os ([\d_]+).*?\)/
R_I_POD = /\((ipod).*?os ([\d_]+).*?\)/
R_I_PAD = /\((ipad).*?os ([\d_]+).*?\)/
R_ANDROID = /\(.*?(android) ([\d\.]+).*?\)/
R_MAC = /\(.*?(mac) os\s+([^)]+).*([\d_\.]+)?.*?\)/
R_LINUX = /\(.*?(linux).*\)/
R_WINDOWS = /\(.*?(windows).*?([\d_\.]+).*?\)/

class OS

  @create: (ua) ->
    @cache ?= {}
    if @cache[ua]?
      @cache[ua]
    else
      @cache[ua] = new OS ua

  constructor: (ua = window.navigator.userAgent) ->
    ua = ua.toLowerCase()

    [ {}, name, version, exactVersion ] =
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
      if name is 'mac' and exactVersion?
        version = exactVersion
      @version = version.split('_').join('.')
    if @iphone or @ipod or @ipad
      @ios = true
    if @ios or @android
      @mobile = true
    if @version?
      number = if @version is 'x'
        10
      else
        parseInt @version, 10
      @versionNumber = if isNaN number
        -1
      else
        number

  jquerize: ->

module.exports = (ua) ->
  OS.create ua

