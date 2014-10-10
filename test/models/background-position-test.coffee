{jquerize} = require '../../models/background-position'
$ = require 'jquery'

describe 'models/background-position', ->

  describe 'BackgroundPosition', ->

    describe '.jquerize()', ->

      it 'should turn the jquerized flag to true', ->
        console.log $.jquerized['background-position']
        # $.jquerized['background-position'].should.be.undefined
        jquerize $
        $.jquerized['background-position'].should.be.true
        console.log $.jquerized

      it 'should implmement `background-position` parser', ->
        $el = $ '<div>'
        $el.css 'background-position', '50px 100px'
        console.log $el.css 'background-position'
        console.log $el.css 'background-position-x'
