{AdjusterManager} = require '../../../views/ui/adjuster'

describe 'view/ui/adjuster', ->

  describe 'AdjusterManager', ->

    describe '.DIRECTION_WIDTH', ->

      it 'should be 001', ->
        AdjusterManager.DIRECTION_WIDTH.should.equal parseInt '001', 2

    describe '.DIRECTION_HEIGHT', ->

      it 'should be 010', ->
        AdjusterManager.DIRECTION_HEIGHT.should.equal parseInt '010', 2

    describe '.DIRECTION_BOTH', ->

      it 'should be 011', ->
        AdjusterManager.DIRECTION_BOTH.should.equal parseInt '011', 2
