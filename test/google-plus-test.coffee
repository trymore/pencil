{createShareUrl} = require '../models/sns/google-plus'

describe 'GooglePlus', ->

  describe '.createShareUrl()', ->

    it 'should create a url to plus website', ->
      createShareUrl 'http://example.com'
        .should.equal 'https://plus.google.com/share?url=http%3A%2F%2Fexample.com'

