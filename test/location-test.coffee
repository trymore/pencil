{parse} = require '../models/location'

describe 'Location', ->

  describe '.parse()', ->

    it 'should parse normal url', ->
      parse 'http://example.com?key=val#target'
        .should.eql
          hash: '#target'
          host: 'example.com'
          hostname: 'example.com'
          href: 'http://example.com/?key=val#target'
          origin: 'http://example.com'
          pathname: '/'
          port: ''
          protocol: 'http:'
          search: '?key=val'
