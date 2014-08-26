$ = require 'jquery'

module.exports =

  animate: (from, to, opts) ->
    $ '<div>'
    .css
      position: 'absolute'
      left: from
    .animate
      left: to
    , opts
