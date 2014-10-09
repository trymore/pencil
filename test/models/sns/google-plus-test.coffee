{createShareUrl, fetchShareCount} = require '../../../models/sns/google-plus'

describe 'GooglePlus', ->

  describe '.createShareUrl()', ->

    it 'should create a url to plus website', ->
      createShareUrl url: 'http://example.com'
        .should.equal 'https://plus.google.com/share?url=http%3A%2F%2Fexample.com'

  describe '.fetchShareCount()', ->

    it 'should fetch shared count', (done) ->
      fetchShareCount 'http://example.com', (err, shares) ->
        (err?).should.be.false
        shares.should.be.a.number
        done()
