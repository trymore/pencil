{createChatUrl} = require '../models/sns/line'

describe 'Line', ->

  describe '.createChatUrl()', ->

    it 'should create a url to chat about website', ->
      createChatUrl text: 'テスト'
        .should.equal 'http://line.naver.jp/R/msg/text/?%E3%83%86%E3%82%B9%E3%83%88'
