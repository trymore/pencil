OS = require '../models/os'

describe "OS", ->

  it "should parse the user agent of Mac OSX", ->
    os = new OS "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.124 Safari/537.36"
    os.mac.should.be.true
    os.version.should.be.equal '10.9.4'
    os.versionNumber.should.equal 10.9

