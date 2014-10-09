{isArray, assign} = require 'lodash'


###
クエリ文字列クラスです。
###
module.exports =
class QueryString

  @stringify: (obj, sep = '&', eq = '=') ->
    queries = []
    for key, val of obj
      if isArray val
        for v in val
          queries.push "#{key}#{eq}#{encodeURIComponent v ? ''}"
      else
        queries.push "#{key}#{eq}#{encodeURIComponent val ? ''}"
    queries.join sep

  @parse: (str, sep = '&', eq = '=', opts = {}) ->
    opts = assign maxKeys: 1000, opts
    {maxKeys, parseType} = opts
    obj = {}
    for kv, i in str.split sep when maxKeys is 0 or i < maxKeys
      [key, val] = kv.split eq
      val = decodeURIComponent val
      if parseType
        val = if val is 'null'
          null
        else if val is 'undefined'
          undefined
        else if val is 'true'
          true
        else if val is 'false'
          false
        else if val.test /^\d+(?:\.\d+)?$/
          val = parseFloat val

      if obj[key]?
        if isArray obj[key]
          obj[key].push val
        else
          tmp = obj[key]
          obj[key] = [tmp, val]
      else
        obj[key] = val
    obj
