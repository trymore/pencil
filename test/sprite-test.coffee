Sprite = require '../views/sprite'

describe 'Sprite', ->

  describe '.X', ->

    it 'should be 001', ->
      Sprite.X.should.equal parseInt '001', 2

  describe '.Y', ->

    it 'should be 010', ->
      Sprite.Y.should.equal parseInt '010', 2

  describe '.EVENT_LAST_FRAME', ->

    it 'should be sprite.lastframe', ->
      Sprite.EVENT_LAST_FRAME.should.equal 'sprite.lastframe'

  describe '.EVENT_LAST_FRAME', ->

    it 'should be sprite.complete', ->
      Sprite.EVENT_COMPLETE_REPEAT.should.equal 'sprite.complete'

  describe 'constructor', ->

    it 'should create instance without parameter', ->
      sprite = new Sprite
      sprite.fps.should.equal 30
      sprite.direction.should.equal Sprite.Y
      sprite.currentFrame.should.equal 0
      sprite.lastFrame.should.equal 0

    it 'should create instance with parameters', ->
      sprite = new Sprite null, 15, Sprite.X
      sprite.fps.should.equal 15
      sprite.direction.should.equal Sprite.X
      sprite.currentFrame.should.equal 0
      sprite.lastFrame.should.equal 0

  describe '#setRange()', ->

    it 'should update positions array', ->
      sprite = new Sprite
      sprite.setRange 5, 10
      sprite.positions.should.eql [5, 6, 7, 8, 9, 10]

  describe '#setPositions()', ->

    it 'should update positions array', ->
      sprite = new Sprite
      sprite.setPositions [5, 6, 7, 8, 9, 10]
      sprite.positions.should.eql [5, 6, 7, 8, 9, 10]

  describe '#gotoAndPlay()', ->

    it 'should play sprite animation', (done) ->
      sprite = new Sprite
      sprite.setRange 5, 10
      sprite.gotoAndPlay()
      sprite.on Sprite.EVENT_COMPLETE_REPEAT, ->
        sprite.currentFrame.should.equal 5
        done()

    it 'should play sprite animation', (done) ->
      sprite = new Sprite
      sprite.setRange 5, 10
      sprite.gotoAndPlay 3, 2
      count = 0
      sprite.on Sprite.EVENT_LAST_FRAME, ->
        count++
      sprite.on Sprite.EVENT_COMPLETE_REPEAT, ->
        sprite.currentFrame.should.equal 5
        count.should.equal 2
        done()
