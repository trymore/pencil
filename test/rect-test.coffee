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
