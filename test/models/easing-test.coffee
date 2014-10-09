{factory, jquerize} = require '../../models/easing'
{flatten} = require 'lodash'

describe 'Easing', ->

  directions = [
    'In'
    'InOut'
    'Out'
    'OutIn'
  ]
  types = [
    'Back'
    'Bounce'
    'Circ'
    'Cubic'
    'Elastic'
    'Expo'
    'Quad'
    'Quart'
    'Quint'
    'Sine'
  ]
  funcNames = flatten(
    for type in types
      for direction in directions
        "ease#{direction}#{type}"
  )
  funcNames.unshift 'linear'

  describe 'factory', ->

    it 'should have all methods', ->
      for funcName in funcNames
        factory[funcName].should.exist

    it 'should create easing methods', ->
      for funcName in funcNames
        factory[funcName]().should.exist

    it 'should ', ->
      # x, t, b, c, d
      for funcName in funcNames
        factory[funcName]()(null, 0, 10, 100, 5).should.be.closeTo 10, 0.01
        factory[funcName]()(null, 5, 10, 100, 5).should.be.closeTo 110, 0.01
