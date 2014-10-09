{createShareUrl, fetchShareCount} = require '../../../models/sns/facebook'

describe 'Facebook', ->

  describe '.createShareUrl()', ->

    it 'should create a url to share website', ->
      createShareUrl url: 'http://example.com'
        .should.equal 'http://www.facebook.com/share.php?u=http%3A%2F%2Fexample.com'

  describe '.fetchShareCount()', ->

    it 'should fetch shared count', (done) ->
      fetchShareCount 'http://example.com', (err, shares) ->
        done()
