###
OS parses user agent and determines the OS type and version.
###

UA = window.navigator.userAgent.toLowerCase()
R_I_PHONE = /\((iphone).*?os ([\d_]+).*?\)/
R_I_POD = /\((ipod).*?os ([\d_]+).*?\)/
R_I_PAD = /\((ipad).*?os ([\d_]+).*?\)/
R_ANDROID = /\(.*?(android) ([\d\.]+).*?\)/
R_MAC = /\(.*?(mac) os x ([\d_\.]+).*?\)/
R_LINUX = /\(.*?(linux) (\w+)v\)/
R_WINDOWS = /\(.*?(windows) (\w+).*?\)/

[ {}, name, version ] = R_I_PHONE.exec(UA) or
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
  os.version = version.split('_').join('.')
if os.iphone or os.ipod or os.ipad
  os.ios = true
if os.ios or os.android
  os.mobile = true
if os.version?
  number = parseInt os.version, 10
  unless isNaN number
    os.versionNumber = number

module.exports = os
