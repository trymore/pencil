###
OS parses user agent and determines the OS type and version.
###

UA = window.navigator.userAgent.toLowerCase()
R_I_PHONE = /\((iphone).*?os ([\d_]+).*?\)/
R_I_POD = /\((ipod).*?os ([\d_]+).*?\)/
R_I_PAD = /\((ipad).*?os ([\d_]+).*?\)/
R_ANDROID = /\(.*?(android) ([\d\.]+).*?\)/
R_MAC = /\(.*?(mac) os\s+([^)]+).*([\d_\.]+)?.*?\)/
R_LINUX = /\(.*?(linux) (\w+)v\)/
R_WINDOWS = /\(.*?(windows) (\w+).*?\)/

[ {}, name, version, exactVersion ] = R_I_PHONE.exec(UA) or
                                      R_I_POD.exec(UA) or
                                      R_I_PAD.exec(UA) or
                                      R_ANDROID.exec(UA) or
                                      R_MAC.exec(UA) or
                                      R_WINDOWS.exec(UA) or
                                      R_LINUX.exec(UA) or
                                      []

os = {}
if name?
  os[name] = true
  if name is 'mac' and exactVersion?
    version = exactVersion
  os.version = version.split('_').join('.')
if os.iphone or os.ipod or os.ipad
  os.ios = true
if os.ios or os.android
  os.mobile = true
if os.version?
  number = if os.version is 'x'
    10
  else
    parseInt os.version, 10
  os.versionNumber = if isNaN number
    -1
  else
    number

module.exports = os
