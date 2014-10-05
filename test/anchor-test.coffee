Anchor = require '../views/anchor'

describe 'Anchor', ->

  describe 'constructor', ->

    document.write '<a href="#"></a>'

    it 'should select an `a` node having `href` starting with `#` by default', ->
      anchor = new Anchor
      anchor.length.should.equal 1
      anchor.attr('href').should.equal '#'
