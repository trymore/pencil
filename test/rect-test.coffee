# chai.should()
Rect = require '../models/geom/rect'
Point = require '../models/geom/point'

describe 'Rect', ->

  describe 'constructor', ->

    it 'should create a zero `Rect` with no parameter', ->
      new Rect()
        .should.include {x: 0, y: 0, width: 0, height: 0}
    it 'should create a `Rect` with 1 `Array`', ->
      {x, y, width, height} = new Rect [2, 7, 10, 20]
        .should.include {x: 2, y: 7, width: 10, height: 20}
    it 'should create a `Rect` with 1 `Rect`', ->
      new Rect new Rect 2, 7, 10, 20
        .should.include {x: 2, y: 7, width: 10, height: 20}
    it 'should create a `Rect` with 1 `Object`', ->
      new Rect {x: 2, y: 7, width: 10, height: 20}
        .should.include {x: 2, y: 7, width: 10, height: 20}
    it 'should create a `Rect` with 2 `Point`s', ->
      new Rect new Point(2, 7), new Point(10, 20)
        .should.include {x: 2, y: 7, width: 10, height: 20}
    it 'should create a `Rect` with 1 `Point` and 2 `Number`s', ->
      new Rect new Point(2, 7), 10, 20
        .should.include {x: 2, y: 7, width: 10, height: 20}
    it 'should create a `Rect` with 2 `Number`s and 1 `Point`', ->
      new Rect 2, 7, new Point(10, 20)
        .should.include {x: 2, y: 7, width: 10, height: 20}
    it 'should create a `Rect` with 4 `Number`s', ->
      new Rect 2, 7, 10, 20
        .should.include {x: 2, y: 7, width: 10, height: 20}

    it 'should create a zero `Rect` with 1 `Arguments` contains no parameter', ->
      do ->
        new Rect arguments
          .should.include {x: 0, y: 0, width: 0, height: 0}
    it 'should create a `Rect` with 1 `Arguments` contains 1 `Array`', ->
      do ({} = [2, 7, 10, 20]) ->
        new Rect arguments
          .should.include {x: 2, y: 7, width: 10, height: 20}
    it 'should create a `Rect` with 1 `Arguments` contains 1 `Rect`', ->
      new Rect new Rect 2, 7, 10, 20
        .should.include {x: 2, y: 7, width: 10, height: 20}
    it 'should create a `Rect` with 1 `Arguments` contains 1 `Object`', ->
      new Rect {x: 2, y: 7, width: 10, height: 20}
        .should.include {x: 2, y: 7, width: 10, height: 20}
    it 'should create a `Rect` with 1 `Arguments` contains 2 `Point`s', ->
      new Rect new Point(2, 7), new Point(10, 20)
        .should.include {x: 2, y: 7, width: 10, height: 20}
    it 'should create a `Rect` with 1 `Arguments` contains 1 `Point` and 2 `Number`s', ->
      new Rect new Point(2, 7), 10, 20
        .should.include {x: 2, y: 7, width: 10, height: 20}
    it 'should create a `Rect` with 1 `Arguments` contains 2 `Number`s and 1 `Point`', ->
      new Rect 2, 7, new Point(10, 20)
        .should.include {x: 2, y: 7, width: 10, height: 20}
    it 'should create a `Rect` with 1 `Arguments` contains 4 `Number`s', ->
      new Rect 2, 7, 10, 20
        .should.include {x: 2, y: 7, width: 10, height: 20}

  describe '.createWithCorner', ->

    it 'should create with corner points', ->
      Rect.createWithCorner new Point(2, 7), new Point(12, 27)
        .should.include {x: 2, y: 7, width: 10, height: 20}

  describe '#normalize()', ->

    it 'should verify negative width and height', ->
      rect = new Rect 2, 7, -10, -20
      rect.normalize()
      rect.should.include {x: -8, y: -13, width: 10, height: 20}

  describe '#clone()', ->

    it 'should create new instance contains same value', ->
      rect = new Rect 2, 7, 10, 20
      rect.clone().should.not.equal rect
      rect.clone().should.eql rect

  describe '#getLeft()', ->
    it 'should be return left', ->
      new Rect 2, 7, 10, 20
        .getLeft().should.equal 2
  describe '#getRight()', ->
    it 'should be return right', ->
      new Rect 2, 7, 10, 20
        .getRight().should.equal 12
  describe '#getTop()', ->
    it 'should be return top', ->
      new Rect 2, 7, 10, 20
        .getTop().should.equal 7
  describe '#getBottom()', ->
    it 'should be return bottom', ->
      new Rect 2, 7, 10, 20
        .getBottom().should.equal 27
  describe '#getLeftTop()', ->
    it 'should be return left-top `Point`', ->
      new Rect 2, 7, 10, 20
        .getLeftTop().should.eql new Point 2, 7
  describe '#getLeftBottom()', ->
    it 'should be return left-bottom `Point`', ->
      new Rect 2, 7, 10, 20
        .getLeftBottom().should.eql new Point 2, 27
  describe '#getRightTop()', ->
    it 'should be return right-top `Point`', ->
      new Rect 2, 7, 10, 20
        .getRightTop().should.eql new Point 12, 7
  describe '#getRightBottom()', ->
    it 'should be return right-bottom `Point`', ->
      new Rect 2, 7, 10, 20
        .getRightBottom().should.eql new Point 12, 27

  describe '#containsPoint()', ->
    it "should return true with an inner `Point`", ->
      new Rect -2, -7, 10, 20
        .containsPoint new Point 5, 10
        .should.be.true
    it "should return true with an edge `Point`", ->
      new Rect -2, -7, 10, 20
        .containsPoint new Point -2, -7
        .should.be.true
      new Rect -2, -7, 10, 20
        .containsPoint new Point 5, -7
        .should.be.true
      new Rect -2, -7, 10, 20
        .containsPoint new Point 8, -7
        .should.be.true
      new Rect -2, -7, 10, 20
        .containsPoint new Point 8, 10
        .should.be.true
      new Rect -2, -7, 10, 20
        .containsPoint new Point 8, 13
        .should.be.true
      new Rect -2, -7, 10, 20
        .containsPoint new Point 5, 13
        .should.be.true
      new Rect -2, -7, 10, 20
        .containsPoint new Point -2, 13
        .should.be.true
      new Rect -2, -7, 10, 20
        .containsPoint new Point -2, 5
        .should.be.true
    it "should return false with an outer `Point`", ->
      new Rect -2, -7, 10, 20
        .containsPoint new Point -5, -10
        .should.be.false
      new Rect -2, -7, 10, 20
        .containsPoint new Point 5, -10
        .should.be.false
      new Rect -2, -7, 10, 20
        .containsPoint new Point 15, -10
        .should.be.false
      new Rect -2, -7, 10, 20
        .containsPoint new Point 15, 10
        .should.be.false
      new Rect -2, -7, 10, 20
        .containsPoint new Point 15, 30
        .should.be.false
      new Rect -2, -7, 10, 20
        .containsPoint new Point 5, 30
        .should.be.false
      new Rect -2, -7, 10, 20
        .containsPoint new Point -5, 30
        .should.be.false
      new Rect -2, -7, 10, 20
        .containsPoint new Point -5, 10
        .should.be.false

