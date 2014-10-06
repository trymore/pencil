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
