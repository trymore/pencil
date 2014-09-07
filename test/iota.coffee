{expect} = chai
factory = require '../models/iota'

describe 'Iota', ->
  describe '.', ->
    describe 'factory', ->
      it 'should create new Iota method', ->
        expect(factory()).to.not.equal factory()

      describe 'iota', ->
        it 'should return incremented int', ->
          iota = factory()
          expect(iota()).equal 0
          expect(iota()).equal 1
          expect(iota()).equal 2
          expect(iota()).equal 3
          expect(iota()).equal 4
          iota = factory()
          expect(iota()).equal 0
          expect(iota()).equal 1
          expect(iota()).equal 2
          expect(iota()).equal 3
          expect(iota()).equal 4
