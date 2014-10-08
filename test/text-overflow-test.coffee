TextOverflow = require '../views/text-overflow'

describe 'TextOverflow', ->

  describe 'constructor', ->

    it 'should create TextOverflow instance', ->
      textOverflow = new TextOverflow
      textOverflow.should.be.an.instanceof TextOverflow
