###
Browser parses user agent and determines the browser type and version.
###

UA = window.navigator.userAgent.toLowerCase()
R_CHROME = /(chrome)[ \/]([\w.]+)/
R_WEBKIT = /(webkit)[ \/]([\w.]+)/
R_OPERA = /(opera)(?:.*version|)[ \/]([\w.]+)/
R_MSIE = /(msie) ([\w.]+)/
R_MOZILLA = /(mozilla)(?:.*? rv:([\w.]+)|)/

[ {}, name, version ] = R_CHROME.exec(UA) or
                        R_WEBKIT.exec(UA) or
                        R_OPERA.exec(UA) or
                        R_MSIE.exec(UA) or
                        UA.indexOf("compatible") < 0 and R_MOZILLA.exec(UA) or
                        []

browser = {}
if name
  browser[name] = true
  browser.version = version
  number = parseInt browser.version, 10
  unless isNaN number
    browser.versionNumber = number
if browser.chrome
  browser.webkit = true
else if browser.webkit
  browser.safari = true

module.exports = browser
