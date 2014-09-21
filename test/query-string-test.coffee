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
        a: [1, 'あ', 'a']
        b: [2, 'い', 'b']
        c: [3, 'う', 'c']
      .should.be.equal 'a=1&a=%E3%81%82&a=a&b=2&b=%E3%81%84&b=b&c=3&c=%E3%81%86&c=c'

  describe '.parse()', ->

    it 'should parse a query `String`', ->
      parse 'a=1&b=2&c=3'
      .should.be.eql
        a: '1'
        b: '2'
        c: '3'

    it 'should be replaced the separator and the equal character', ->
      parse 'a:1,b:2,c:3', ',', ':'
      .should.be.eql
        a: '1'
        b: '2'
        c: '3'

    it 'should parse a URI encoded query `String` when the value has muti-byte characters', ->
      parse 'a=%E3%81%82&b=%E3%81%84&c=%E3%81%86'
      .should.be.eql
        a: 'あ'
        b: 'い'
        c: 'う'

    it 'should parse a URI encoded query `String` when the value has muti-byte characters', ->
      parse 'a=1&a=%E3%81%82&a=a&b=2&b=%E3%81%84&b=b&c=3&c=%E3%81%86&c=c'
      .should.be.eql
        a: ['1', 'あ', 'a']
        b: ['2', 'い', 'b']
        c: ['3', 'う', 'c']

    it "shouldn't parse when key-value set is over maxKeys", ->
      parse 'a=1&b=2&c=3&d=4', null, null, maxKeys: 3
      .should.be.eql
        a: '1'
        b: '2'
        c: '3'

    it "should parse without limitation when the maxKeys is 0", ->
      parse 'a=1&b=2&c=3&d=4', null, null, maxKeys: 0
      .should.be.eql
        a: '1'
        b: '2'
        c: '3'
        d: '4'

