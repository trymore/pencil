$ = require 'jquery'

props = """
hash
host
hostname
href
origin
pathname
port
protocol
""".split /\s+/

module.exports =
  parse: (url) ->
    location = {}
    el = $('<a>').attr(href: url)[0]
    for prop in props
      location[prop] = el[prop]
    location
