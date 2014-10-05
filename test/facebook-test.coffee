{createShareUrl, fetchShareCount} = require '../models/sns/facebook'

describe 'Facebook', ->

  describe '.createShareUrl()', ->

    it 'should create a url to share website', ->
      createShareUrl 'http://example.com'
        .should.equal 'http://www.facebook.com/share.php?u=http%3A%2F%2Fexample.com'

  describe '.fetchShareCount()', ->

    it 'should fetch shared count', ->
      fetchShareCount 'http://example.com', (err, shares) ->
        console.log err, shares

