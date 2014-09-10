(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
require('../iota');

require('../point');



},{"../iota":2,"../point":3}],2:[function(require,module,exports){
var expect, factory;

expect = chai.expect;

factory = pencil.models.iota;

describe('Iota', function() {
  return describe('.', function() {
    return describe('factory', function() {
      it('should create new Iota method', function() {
        return expect(factory()).to.not.equal(factory());
      });
      return describe('iota', function() {
        return it('should return incremented int', function() {
          var iota;
          iota = factory();
          expect(iota()).equal(0);
          expect(iota()).equal(1);
          expect(iota()).equal(2);
          expect(iota()).equal(3);
          expect(iota()).equal(4);
          iota = factory();
          expect(iota()).equal(0);
          expect(iota()).equal(1);
          expect(iota()).equal(2);
          expect(iota()).equal(3);
          return expect(iota()).equal(4);
        });
      });
    });
  });
});



},{}],3:[function(require,module,exports){
var Point, expect;

expect = chai.expect;

Point = pencil.models.geom.point;

describe('Point', function() {
  describe('constructor', function() {
    it('should create zero Point without no parameter', function() {
      var x, y, _ref;
      _ref = new Point, x = _ref.x, y = _ref.y;
      expect(x).equals(0);
      return expect(y).equals(0);
    });
    it('should create point with 1 `Arguments`', function() {
      var func;
      func = function(x, y) {
        var _ref;
        _ref = new Point(arguments), x = _ref.x, y = _ref.y;
        expect(x).equals(5);
        return expect(y).equals(8);
      };
      return func(5, 8);
    });
    it('should create point with 1 `Array`', function() {
      var x, y, _ref;
      _ref = new Point([5, 8]), x = _ref.x, y = _ref.y;
      expect(x).equals(5);
      return expect(y).equals(8);
    });
    it('should create point with 1 `Object`', function() {
      var x, y, _ref;
      _ref = new Point({
        x: 5,
        y: 8
      }), x = _ref.x, y = _ref.y;
      expect(x).equals(5);
      return expect(y).equals(8);
    });
    it('should create point with 1 `Point`', function() {
      var x, y, _ref;
      _ref = new Point(new Point(5, 8)), x = _ref.x, y = _ref.y;
      expect(x).equals(5);
      return expect(y).equals(8);
    });
    return it('should create point with 2 `Number`s', function() {
      var x, y, _ref;
      _ref = new Point(5, 8), x = _ref.x, y = _ref.y;
      expect(x).equals(5);
      return expect(y).equals(8);
    });
  });
  return describe('.', function() {
    return describe('clone()', function() {
      it('should create same value Point', function() {
        var point;
        point = new Point(5, 8);
        expect(point.clone().x).equals(5);
        return expect(point.clone().y).equals(8);
      });
      return it('should create different instance', function() {
        var point;
        point = new Point(5, 8);
        return expect(point.clone()).not.to.equal(point);
      });
    });
  });
});



},{}]},{},[1]);
