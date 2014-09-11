{expect} = chai
Point = pencil.models.geom.point
{PI, sqrt} = Math


describe 'Point', ->
  describe 'constructor', ->
    it 'should create zero Point without no parameter', ->
      {x, y} = new Point
      expect(x).equals 0
      expect(y).equals 0
    it 'should create point with 1 `Arguments`', ->
      func = (x, y) ->
        {x, y} = new Point arguments
        expect(x).equals 5
        expect(y).equals 8
      func 5, 8
    it 'should create point with 1 `Array`', ->
      {x, y} = new Point [5, 8]
      expect(x).equals 5
      expect(y).equals 8
    it 'should create point with 1 `Object`', ->
      {x, y} = new Point {x: 5, y: 8}
      expect(x).equals 5
      expect(y).equals 8
    it 'should create point with 1 `Point`', ->
      {x, y} = new Point new Point 5, 8
      expect(x).equals 5
      expect(y).equals 8
    it 'should create point with 2 `Number`s', ->
      {x, y} = new Point 5, 8
      expect(x).equals 5
      expect(y).equals 8

  describe '#', ->
    describe 'clone()', ->
      it 'should create same value Point', ->
        point = new Point 5, 8
        expect(point.clone().x).equals 5
        expect(point.clone().y).equals 8
      it 'should create different instance', ->
        point = new Point 5, 8
        expect(point.clone()).not.to.equal point

    describe 'distance()', ->
      it 'should calculate distance from (0, 0)', ->
        expect(new Point(5, 3).distance()).closeTo sqrt(34), 0.01
        expect(new Point(5, -3).distance()).closeTo sqrt(34), 0.01
        expect(new Point(-5, 3).distance()).closeTo sqrt(34), 0.01
        expect(new Point(-5, -3).distance()).closeTo sqrt(34), 0.01

    describe 'angle()', ->
      it 'should calculate angle from x-axis', ->
        expect(new Point(1, sqrt 3).angle()).closeTo PI / 180 * 60, 0.01
