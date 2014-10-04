Browser = require '../models/browser'

describe 'Browser', ->

  it 'should can create without new keyword', ->
    {version, versionNumber} = Browser()
    version.should.a 'string'
    versionNumber.should.a 'number'

  it 'should can create without parameter', ->
    {version, versionNumber} = new Browser
    version.should.a 'string'
    versionNumber.should.a 'number'

  it 'should determine Chrome', ->
    {chrome, webkit, version, versionNumber} = new Browser "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.124 Safari/537.36"
    chrome.should.be.true
    webkit.should.be.true
    version.should.equal '37.0.2062.124'
    versionNumber.should.equal 37

  # it 'should determine Safari', ->

