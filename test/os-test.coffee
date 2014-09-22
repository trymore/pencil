os = require '../models/os'

describe "OS", ->
  describe "name", ->
    it "should have os name as true", ->
      ( os.mac or os.win or os.linux or os.ios ).should.be.true
    it "should have a version", ->
      os.version.should.be.exist
    it "should have a versionNumber", ->
      os.versionNumber.should.be.exist

