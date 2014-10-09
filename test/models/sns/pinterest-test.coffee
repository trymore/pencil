{createPinItUrl} = require '../../../models/sns/pinterest'

describe 'Pinterest', ->

  describe '.createPinItUrl()', ->

    it 'should create a url to pin it website', ->
      createPinItUrl
          url: 'http://example.com'
          media: 'test.jpg'
          description: 'テスト'
        .should.equal 'http://www.pinterest.com/pin/create/button/?url=http%3A%2F%2Fexample.com&media=test.jpg&description=%E3%83%86%E3%82%B9%E3%83%88'
