$ = require 'jquery'

flow =

  serial: (cbs) ->
    dfd = null
    for cb in cbs
      unless dfd?
        dfd = cb()
      else
        dfd = dfd.then cb
    dfd

  parallel: (cbs) ->
    d = $.Deferred()
    dfds = (cb() for cb in cbs)
    $.when.apply $, dfds
    .done if dfds.length <= 1
      (rets...) -> d.resolve [ rets ]
    else
      (rets...) -> d.resolve rets
    .fail d.reject
    d.promise()

  wait: (ms) ->
    dfd = $.Deferred()
    setTimeout ->
      dfd.resolve()
    , ms
    dfd.promise()


module.exports = $.extend flow,
  jqueryize: ($) ->
    $.extend flow
