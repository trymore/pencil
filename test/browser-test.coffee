browser = require '../models/browser'

describe 'Browser', ->

  describe '.safari', ->

    it 'should be true', ->
      browser.safari.should.be.true

  describe '.webkit', ->

    it 'should be true', ->
      browser.webkit.should.be.true

  describe '.version', ->

    it 'should be `String`', ->
      browser.version.should.be.a 'string'

  describe '.versionNumber', ->

    it 'should be `Number`', ->
      browser.versionNumber.should.be.a 'number'
