chai.should()
{point: Point, rect: Rect} = pencil.models.geom
{PI, sqrt} = Math


describe 'Point', ->

  describe 'constructor', ->
    it 'should create zero Point with no parameter', ->
      {x, y} = new Point
      x.should.equals 0
      y.should.equals 0
    it 'should create point with 1 `Array`', ->
      {x, y} = new Point [5, 8]
      x.should.equals 5
      y.should.equals 8
    it 'should create point with 1 `Point`', ->
      {x, y} = new Point new Point 5, 8
      x.should.equals 5
      y.should.equals 8
    it 'should create point with 1 `Object`', ->
      {x, y} = new Point {x: 5, y: 8}
      x.should.equals 5
      y.should.equals 8
    it 'should create point with 2 `Number`s', ->
      {x, y} = new Point 5, 8
      x.should.equals 5
      y.should.equals 8
    it 'should create zero Point with 1 `Arguments` contains none', ->
      func = (arr) ->
        {x, y} = new Point arguments
        x.should.equals 0
        y.should.equals 0
      func()
    it 'should create point with 1 `Arguments` contains 1 `Array`', ->
      func = (arr) ->
        {x, y} = new Point arguments
        x.should.equals 5
        y.should.equals 8
      func [5, 8]
    it 'should create point with 1 `Arguments` contains 1 `Point`', ->
      func = (arr) ->
        {x, y} = new Point arguments
        x.should.equals 5
        y.should.equals 8
      func new Point 5, 8
    it 'should create point with 1 `Arguments` contains 1 `Object`', ->
      func = (arr) ->
        {x, y} = new Point arguments
        x.should.equals 5
        y.should.equals 8
      func {x: 5, y: 8}
    it 'should create point with 1 `Arguments` contains 2 `Number`s', ->
      func = (x, y) ->
        {x, y} = new Point arguments
        x.should.equals 5
        y.should.equals 8
      func 5, 8

  describe '.lerp()', ->
    it 'should calculate linear interpolated point', ->
      Point.lerp(new Point(2, 9), new Point(8, 8), 0.2).should.eql new Point 3.2, 8.8
      Point.lerp(new Point(2, 9), new Point(-8, 8), 0.2).should.eql new Point 0, 8.8
      Point.lerp(new Point(2, 9), new Point(8, -8), 0.2).should.eql new Point 3.2, 5.6
      Point.lerp(new Point(2, 9), new Point(-8, -8), 0.2).should.eql new Point 0, 5.6
      Point.lerp(new Point(-2, 9), new Point(8, 8), 0.2).should.eql new Point 0, 8.8
      Point.lerp(new Point(2, -9), new Point(8, 8), 0.2).should.eql new Point 3.2, -5.6
      Point.lerp(new Point(-2, -9), new Point(8, 8), 0.2).should.eql new Point 0, -5.6

  describe '.distance()', ->
    it 'should calculate distance between 2 points', ->
      Point.distance(new Point(2, 3), new Point(5, 8)).should.closeTo sqrt(34), 0.01
      Point.distance(new Point(2, 3), new Point(-5, 8)).should.closeTo sqrt(74), 0.01
      Point.distance(new Point(2, 3), new Point(5, -8)).should.closeTo sqrt(130), 0.01
      Point.distance(new Point(2, 3), new Point(-5, -8)).should.closeTo sqrt(170), 0.01
      Point.distance(new Point(-2, 3), new Point(5, 8)).should.closeTo sqrt(74), 0.01
      Point.distance(new Point(2, -3), new Point(5, 8)).should.closeTo sqrt(130), 0.01
      Point.distance(new Point(-2, -3), new Point(5, 8)).should.closeTo sqrt(170), 0.01

  describe '.createWithPosition()', ->
    it 'should create a Point instance', ->
      Point.createWithPosition({left: 5, top: 8}).should.be.an.instanceof Point
    it 'should create an instance with position object', ->
      Point.createWithPosition({left: 5, top: 8}).should.eql new Point 5, 8

  describe '#clone()', ->
    it 'should create same value Point', ->
      point = new Point 5, 8
      point.clone().x.should.equals 5
      point.clone().y.should.equals 8
    it 'should create different instance', ->
      point = new Point 5, 8
      point.clone().should.not.to.equal point

  describe '#distance()', ->
    it 'should calculate distance from (0, 0)', ->
      new Point(5, 3).distance().should.closeTo sqrt(34), 0.01
      new Point(5, -3).distance().should.closeTo sqrt(34), 0.01
      new Point(-5, 3).distance().should.closeTo sqrt(34), 0.01
      new Point(-5, -3).distance().should.closeTo sqrt(34), 0.01

  describe '#angle()', ->
    it 'should calculate angle from x-axis', ->
      new Point(1, sqrt 3).angle().should.closeTo PI / 180 * 60, 0.01

  describe '#add()',  ->
    it 'should return new instance', ->
      a = new Point 5, 8
      b = new Point 2, 3
      a.add(b).should.not.equal a
      a.add(b).should.not.equal b

    it 'should add elements', ->
      new Point(5, 8).add(new Point(2, 3)).should.eql new Point 7, 11
      new Point(5, 8).add(new Point(-2, 3)).should.eql new Point 3, 11
      new Point(5, 8).add(new Point(2, -3)).should.eql new Point 7, 5
      new Point(5, 8).add(new Point(-2, -3)).should.eql new Point 3, 5
      new Point(-5, 8).add(new Point(2, 3)).should.eql new Point -3, 11
      new Point(5, -8).add(new Point(2, 3)).should.eql new Point 7, -5
      new Point(-5, -8).add(new Point(2, 3)).should.eql new Point -3, -5

  describe '#subtract()', ->
    it 'should return new instance', ->
      a = new Point 5, 8
      b = new Point 2, 3
      a.subtract(b).should.not.equal a
      a.subtract(b).should.not.equal b

    it 'should subtract elements', ->
      new Point(5, 8).subtract(new Point(2, 3)).should.eql new Point 3, 5
      new Point(5, 8).subtract(new Point(-2, 3)).should.eql new Point 7, 5
      new Point(5, 8).subtract(new Point(2, -3)).should.eql new Point 3, 11
      new Point(5, 8).subtract(new Point(-2, -3)).should.eql new Point 7, 11
      new Point(-5, 8).subtract(new Point(2, 3)).should.eql new Point -7, 5
      new Point(5, -8).subtract(new Point(2, 3)).should.eql new Point 3, -11
      new Point(-5, -8).subtract(new Point(2, 3)).should.eql new Point -7, -11

  describe '#sub()', ->
    it 'should return new instance', ->
      a = new Point 5, 8
      b = new Point 2, 3
      a.sub(b).should.not.equal a
      a.sub(b).should.not.equal b

    it 'should subtract elements', ->
      new Point(5, 8).sub(new Point(2, 3)).should.eql new Point 3, 5
      new Point(5, 8).sub(new Point(-2, 3)).should.eql new Point 7, 5
      new Point(5, 8).sub(new Point(2, -3)).should.eql new Point 3, 11
      new Point(5, 8).sub(new Point(-2, -3)).should.eql new Point 7, 11
      new Point(-5, 8).sub(new Point(2, 3)).should.eql new Point -7, 5
      new Point(5, -8).sub(new Point(2, 3)).should.eql new Point 3, -11
      new Point(-5, -8).sub(new Point(2, 3)).should.eql new Point -7, -11

  describe '#multiply()',  ->
    it 'should return new instance', ->
      a = new Point 5, 8
      a.multiply(3).should.not.equal a

    it 'should multiply elements', ->
      new Point(5, 8).multiply(3).should.eql new Point 15, 24
      new Point(5, 8).multiply(-3).should.eql new Point -15, -24

  describe '#mul()',  ->
    it 'should return new instance', ->
      a = new Point 5, 8
      a.mul(3).should.not.equal a

    it 'should multiply elements', ->
      new Point(5, 8).mul(3).should.eql new Point 15, 24
      new Point(5, 8).mul(-3).should.eql new Point -15, -24

  describe '#devide()',  ->
    it 'should return new instance', ->
      a = new Point 5, 8
      a.devide(2).should.not.equal a

    it 'should devide elements', ->
      new Point(5, 8).devide(2).should.eql new Point 2.5, 4
      new Point(5, 8).devide(-2).should.eql new Point -2.5, -4

  describe '#dev()',  ->
    it 'should return new instance', ->
      a = new Point 5, 8
      a.dev(2).should.not.equal a

    it 'should devide elements', ->
      new Point(5, 8).dev(2).should.eql new Point 2.5, 4
      new Point(5, 8).dev(-2).should.eql new Point -2.5, -4

  describe '#dotProduct()', ->
    it 'should calculate dot product', ->
      new Point(-12, 16).dotProduct(new Point(12, 9)).should.equal 0
      new Point(-6, 8).dotProduct(new Point(5, 12)).should.equal 66

  describe '#containIn', ->
    it 'should return new instance', ->
      a = new Point 5, 8
      a.containIn(new Rect 0, 0, 100, 400).should.not.equal a

    it 'should calculate contained point in rect', ->
      rect = new Rect 3, 4, 10, 20
      new Point(-1, -5).containIn(new Rect 3, 4, 10, 20).should.eql new Point 3, 4
      new Point(-1, 5).containIn(new Rect 3, 4, 10, 20).should.eql new Point 3, 5
      new Point(-1, 30).containIn(new Rect 3, 4, 10, 20).should.eql new Point 3, 24
      new Point(8, -5).containIn(new Rect 3, 4, 10, 20).should.eql new Point 8, 4
      new Point(8, 5).containIn(new Rect 3, 4, 10, 20).should.eql new Point 8, 5
      new Point(8, 30).containIn(new Rect 3, 4, 10, 20).should.eql new Point 8, 24
      new Point(40, -5).containIn(new Rect 3, 4, 10, 20).should.eql new Point 13, 4
      new Point(40, 5).containIn(new Rect 3, 4, 10, 20).should.eql new Point 13, 5
