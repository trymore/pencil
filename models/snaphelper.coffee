Point = require './point'

module.exports =

  getTotalLength: (path) ->
    switch path.type
      when 'line'
        start = new Point parseFloat(path.attr('x1')), parseFloat(path.attr('y1'))
        end = new Point parseFloat(path.attr('x2')), parseFloat(path.attr('y2'))
        Point.distance start, end
      when 'polyline'
        length = 0
        points = path.attr 'points'
        i = points.length
        while i-- > 0
          if points[i] is ''
            points = points.splice i, 1
        for x, i in points by 2
          x = parseFloat x
          y = parseFloat points[i + 1]
          next = new Point x, y
          if prev?
            length += Point.distance prev, next
          prev = next
        length
      else
        path.getTotalLength()

  getPointAtLength: (path, len) ->
    switch path.type
      when 'line'
        start = new Point parseFloat(path.attr('x1')), parseFloat(path.attr('y1'))
        end = new Point parseFloat(path.attr('x2')), parseFloat(path.attr('y2'))
        Point.lerp start, end, len / Point.distance start, end
      when 'polyline'
        length = 0
        points = path.attr 'points'
        for x, i in points by 2
          x = parseFloat x
          y = parseFloat points[i + 1]
          end = new Point x, y
          if start?
            distance = Point.distance start, end
            if length <= len <= (length += distance)
              return Point.lerp start, end, len / Point.distance start, end
          start = end
        return
      else
        new Point path.getPointAtLength len
