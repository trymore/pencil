Anchor = require '../../../views/ui/anchor'

describe 'Anchor', ->

  describe 'constructor', ->

    document.write """
      <a href="#target" style="display: block; height: 100px;">link</a>
    """

    it 'should select an `a` node having `href` starting with `#` by default', ->
      anchor = new Anchor 'a[href^=#]'
      anchor.length.should.equal 1
      anchor.attr('href').should.equal '#target'
