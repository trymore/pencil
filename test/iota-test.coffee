# chai.should()
factory = require '../models/iota'

describe 'Iota', ->
  describe '.', ->
    describe 'factory', ->
      it 'should create new Iota method', ->
        factory().should.not.equal factory()

      describe 'iota', ->
        it 'should return incremented int', ->
          iota = factory()
          iota().should.equal 0
          iota().should.equal 1
          iota().should.equal 2
          iota().should.equal 3
          iota().should.equal 4
          iota = factory()
          iota().should.equal 0
          iota().should.equal 1
          iota().should.equal 2
          iota().should.equal 3
          iota().should.equal 4
