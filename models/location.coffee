$ = require 'jquery'

props = [
  'hash'
  'host'
  'hostname'
  'href'
  'origin'
  'pathname'
  'port'
  'protocol'
  'search'
]

module.exports =

  parse: (url) ->
    location = {}
    el = $('<a>').attr(href: url)[0]
    for prop in props
      location[prop] = el[prop]
    if location.port is '0'
      location.port = ''
    location
