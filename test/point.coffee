{expect} = chai
Point = require '../models/point'

describe 'Point', ->
  describe 'constructor', ->
    it 'should create zero point without no parameter', ->
      {x, y} = new Point
      expect(x).equals 0
      expect(y).equals 0
    it 'should create point with 2 numbers', ->
      {x, y} = new Point 5, 8
      expect(x).equals 5
      expect(y).equals 8
    it 'should create point with 1 array', ->
      {x, y} = new Point [5, 8]
      expect(x).equals 5
      expect(y).equals 8
    it 'should create point with 1 object', ->
      {x, y} = new Point {x: 5, y: 8}
      expect(x).equals 5
      expect(y).equals 8
    it 'should create point with 1 Point', ->
      {x, y} = new Point new Point 5, 8
      expect(x).equals 5
      expect(y).equals 8
