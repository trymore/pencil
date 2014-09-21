{stringify, parse} = require '../models/query-string'

describe 'QueryString', ->

  describe '.stringify()', ->

    it 'should create a query `String`', ->
      stringify
        a: 1
        b: 2
        c: 3
      .should.be.equal 'a=1&b=2&c=3'

    it 'should be replaced the separator and the equal character', ->
      stringify
        a: 1
        b: 2
        c: 3
      , ',', ':'
      .should.be.equal 'a:1,b:2,c:3'

    it 'should create a URI encoded query `String` when the value has muti-byte characters', ->
      stringify
        a: 'あ'
        b: 'い'
        c: 'う'
      .should.be.equal 'a=%E3%81%82&b=%E3%81%84&c=%E3%81%86'

    it 'should accept `Array` value', ->
      stringify
        a: [1, 'あ']
        b: [2, 'い']
        c: [3, 'う']
      .should.be.equal 'a=1&a=%E3%81%82&b=2&b=%E3%81%84&c=3&c=%E3%81%86'
