{createTweetUrl} = require '../models/sns/twitter'

describe 'Twitter', ->

  describe '.createTweetUrl()', ->

    it 'should create a url to tweet about website', ->
      createTweetUrl
          text: 'テスト'
          url: 'http://example.com'
          hashtags: 'foo,bar'
        .should.equal 'http://twitter.com/share?text=%E3%83%86%E3%82%B9%E3%83%88&url=http%3A%2F%2Fexample.com&hashtags=foo%2Cbar'
