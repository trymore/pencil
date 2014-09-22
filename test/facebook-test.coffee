{createShareUrl} = require '../models/sns/facebook'

describe 'Facebook', ->

  describe '.createShareUrl()', ->

    it 'should create a url to share website', ->
      createShareUrl 'http://example.com'
        .should.equal 'http://www.facebook.com/share.php?u=http%3A%2F%2Fexample.com'
