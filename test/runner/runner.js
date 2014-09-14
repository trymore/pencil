(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
require('../iota');

require('../point');



},{"../iota":2,"../point":3}],2:[function(require,module,exports){
var factory;

chai.should();

factory = pencil.models.iota;

describe('Iota', function() {
  return describe('.', function() {
    return describe('factory', function() {
      it('should create new Iota method', function() {
        return factory().should.not.equal(factory());
      });
      return describe('iota', function() {
        return it('should return incremented int', function() {
          var iota;
          iota = factory();
          iota().should.equal(0);
          iota().should.equal(1);
          iota().should.equal(2);
          iota().should.equal(3);
          iota().should.equal(4);
          iota = factory();
          iota().should.equal(0);
          iota().should.equal(1);
          iota().should.equal(2);
          iota().should.equal(3);
          return iota().should.equal(4);
        });
      });
    });
  });
});



},{}],3:[function(require,module,exports){
var PI, Point, Rect, sqrt, _ref;

chai.should();

_ref = pencil.models.geom, Point = _ref.point, Rect = _ref.rect;

PI = Math.PI, sqrt = Math.sqrt;

describe('Point', function() {
  describe('constructor', function() {
    it('should create zero Point with no parameter', function() {
      var x, y, _ref1;
      _ref1 = new Point, x = _ref1.x, y = _ref1.y;
      x.should.equals(0);
      return y.should.equals(0);
    });
    it('should create point with 1 `Array`', function() {
      var x, y, _ref1;
      _ref1 = new Point([5, 8]), x = _ref1.x, y = _ref1.y;
      x.should.equals(5);
      return y.should.equals(8);
    });
    it('should create point with 1 `Point`', function() {
      var x, y, _ref1;
      _ref1 = new Point(new Point(5, 8)), x = _ref1.x, y = _ref1.y;
      x.should.equals(5);
      return y.should.equals(8);
    });
    it('should create point with 1 `Object`', function() {
      var x, y, _ref1;
      _ref1 = new Point({
        x: 5,
        y: 8
      }), x = _ref1.x, y = _ref1.y;
      x.should.equals(5);
      return y.should.equals(8);
    });
    it('should create point with 2 `Number`s', function() {
      var x, y, _ref1;
      _ref1 = new Point(5, 8), x = _ref1.x, y = _ref1.y;
      x.should.equals(5);
      return y.should.equals(8);
    });
    it('should create zero Point with 1 `Arguments` contains none', function() {
      var func;
      func = function(arr) {
        var x, y, _ref1;
        _ref1 = new Point(arguments), x = _ref1.x, y = _ref1.y;
        x.should.equals(0);
        return y.should.equals(0);
      };
      return func();
    });
    it('should create point with 1 `Arguments` contains 1 `Array`', function() {
      var func;
      func = function(arr) {
        var x, y, _ref1;
        _ref1 = new Point(arguments), x = _ref1.x, y = _ref1.y;
        x.should.equals(5);
        return y.should.equals(8);
      };
      return func([5, 8]);
    });
    it('should create point with 1 `Arguments` contains 1 `Point`', function() {
      var func;
      func = function(arr) {
        var x, y, _ref1;
        _ref1 = new Point(arguments), x = _ref1.x, y = _ref1.y;
        x.should.equals(5);
        return y.should.equals(8);
      };
      return func(new Point(5, 8));
    });
    it('should create point with 1 `Arguments` contains 1 `Object`', function() {
      var func;
      func = function(arr) {
        var x, y, _ref1;
        _ref1 = new Point(arguments), x = _ref1.x, y = _ref1.y;
        x.should.equals(5);
        return y.should.equals(8);
      };
      return func({
        x: 5,
        y: 8
      });
    });
    return it('should create point with 1 `Arguments` contains 2 `Number`s', function() {
      var func;
      func = function(x, y) {
        var _ref1;
        _ref1 = new Point(arguments), x = _ref1.x, y = _ref1.y;
        x.should.equals(5);
        return y.should.equals(8);
      };
      return func(5, 8);
    });
  });
  describe('.lerp()', function() {
    return it('should calculate linear interpolated point', function() {
      Point.lerp(new Point(2, 9), new Point(8, 8), 0.2).should.eql(new Point(3.2, 8.8));
      Point.lerp(new Point(2, 9), new Point(-8, 8), 0.2).should.eql(new Point(0, 8.8));
      Point.lerp(new Point(2, 9), new Point(8, -8), 0.2).should.eql(new Point(3.2, 5.6));
      Point.lerp(new Point(2, 9), new Point(-8, -8), 0.2).should.eql(new Point(0, 5.6));
      Point.lerp(new Point(-2, 9), new Point(8, 8), 0.2).should.eql(new Point(0, 8.8));
      Point.lerp(new Point(2, -9), new Point(8, 8), 0.2).should.eql(new Point(3.2, -5.6));
      return Point.lerp(new Point(-2, -9), new Point(8, 8), 0.2).should.eql(new Point(0, -5.6));
    });
  });
  describe('.distance()', function() {
    return it('should calculate distance between 2 points', function() {
      Point.distance(new Point(2, 3), new Point(5, 8)).should.closeTo(sqrt(34), 0.01);
      Point.distance(new Point(2, 3), new Point(-5, 8)).should.closeTo(sqrt(74), 0.01);
      Point.distance(new Point(2, 3), new Point(5, -8)).should.closeTo(sqrt(130), 0.01);
      Point.distance(new Point(2, 3), new Point(-5, -8)).should.closeTo(sqrt(170), 0.01);
      Point.distance(new Point(-2, 3), new Point(5, 8)).should.closeTo(sqrt(74), 0.01);
      Point.distance(new Point(2, -3), new Point(5, 8)).should.closeTo(sqrt(130), 0.01);
      return Point.distance(new Point(-2, -3), new Point(5, 8)).should.closeTo(sqrt(170), 0.01);
    });
  });
  describe('.createWithPosition()', function() {
    it('should create a Point instance', function() {
      return Point.createWithPosition({
        left: 5,
        top: 8
      }).should.be.an["instanceof"](Point);
    });
    return it('should create an instance with position object', function() {
      return Point.createWithPosition({
        left: 5,
        top: 8
      }).should.eql(new Point(5, 8));
    });
  });
  describe('#clone()', function() {
    it('should create same value Point', function() {
      var point;
      point = new Point(5, 8);
      point.clone().x.should.equals(5);
      return point.clone().y.should.equals(8);
    });
    return it('should create different instance', function() {
      var point;
      point = new Point(5, 8);
      return point.clone().should.not.to.equal(point);
    });
  });
  describe('#distance()', function() {
    return it('should calculate distance from (0, 0)', function() {
      new Point(5, 3).distance().should.closeTo(sqrt(34), 0.01);
      new Point(5, -3).distance().should.closeTo(sqrt(34), 0.01);
      new Point(-5, 3).distance().should.closeTo(sqrt(34), 0.01);
      return new Point(-5, -3).distance().should.closeTo(sqrt(34), 0.01);
    });
  });
  describe('#angle()', function() {
    return it('should calculate angle from x-axis', function() {
      return new Point(1, sqrt(3)).angle().should.closeTo(PI / 180 * 60, 0.01);
    });
  });
  describe('#add()', function() {
    it('should return new instance', function() {
      var a, b;
      a = new Point(5, 8);
      b = new Point(2, 3);
      a.add(b).should.not.equal(a);
      return a.add(b).should.not.equal(b);
    });
    return it('should add elements', function() {
      new Point(5, 8).add(new Point(2, 3)).should.eql(new Point(7, 11));
      new Point(5, 8).add(new Point(-2, 3)).should.eql(new Point(3, 11));
      new Point(5, 8).add(new Point(2, -3)).should.eql(new Point(7, 5));
      new Point(5, 8).add(new Point(-2, -3)).should.eql(new Point(3, 5));
      new Point(-5, 8).add(new Point(2, 3)).should.eql(new Point(-3, 11));
      new Point(5, -8).add(new Point(2, 3)).should.eql(new Point(7, -5));
      return new Point(-5, -8).add(new Point(2, 3)).should.eql(new Point(-3, -5));
    });
  });
  describe('#subtract()', function() {
    it('should return new instance', function() {
      var a, b;
      a = new Point(5, 8);
      b = new Point(2, 3);
      a.subtract(b).should.not.equal(a);
      return a.subtract(b).should.not.equal(b);
    });
    return it('should subtract elements', function() {
      new Point(5, 8).subtract(new Point(2, 3)).should.eql(new Point(3, 5));
      new Point(5, 8).subtract(new Point(-2, 3)).should.eql(new Point(7, 5));
      new Point(5, 8).subtract(new Point(2, -3)).should.eql(new Point(3, 11));
      new Point(5, 8).subtract(new Point(-2, -3)).should.eql(new Point(7, 11));
      new Point(-5, 8).subtract(new Point(2, 3)).should.eql(new Point(-7, 5));
      new Point(5, -8).subtract(new Point(2, 3)).should.eql(new Point(3, -11));
      return new Point(-5, -8).subtract(new Point(2, 3)).should.eql(new Point(-7, -11));
    });
  });
  describe('#sub()', function() {
    it('should return new instance', function() {
      var a, b;
      a = new Point(5, 8);
      b = new Point(2, 3);
      a.sub(b).should.not.equal(a);
      return a.sub(b).should.not.equal(b);
    });
    return it('should subtract elements', function() {
      new Point(5, 8).sub(new Point(2, 3)).should.eql(new Point(3, 5));
      new Point(5, 8).sub(new Point(-2, 3)).should.eql(new Point(7, 5));
      new Point(5, 8).sub(new Point(2, -3)).should.eql(new Point(3, 11));
      new Point(5, 8).sub(new Point(-2, -3)).should.eql(new Point(7, 11));
      new Point(-5, 8).sub(new Point(2, 3)).should.eql(new Point(-7, 5));
      new Point(5, -8).sub(new Point(2, 3)).should.eql(new Point(3, -11));
      return new Point(-5, -8).sub(new Point(2, 3)).should.eql(new Point(-7, -11));
    });
  });
  describe('#multiply()', function() {
    it('should return new instance', function() {
      var a;
      a = new Point(5, 8);
      return a.multiply(3).should.not.equal(a);
    });
    return it('should multiply elements', function() {
      new Point(5, 8).multiply(3).should.eql(new Point(15, 24));
      return new Point(5, 8).multiply(-3).should.eql(new Point(-15, -24));
    });
  });
  describe('#mul()', function() {
    it('should return new instance', function() {
      var a;
      a = new Point(5, 8);
      return a.mul(3).should.not.equal(a);
    });
    return it('should multiply elements', function() {
      new Point(5, 8).mul(3).should.eql(new Point(15, 24));
      return new Point(5, 8).mul(-3).should.eql(new Point(-15, -24));
    });
  });
  describe('#devide()', function() {
    it('should return new instance', function() {
      var a;
      a = new Point(5, 8);
      return a.devide(2).should.not.equal(a);
    });
    return it('should devide elements', function() {
      new Point(5, 8).devide(2).should.eql(new Point(2.5, 4));
      return new Point(5, 8).devide(-2).should.eql(new Point(-2.5, -4));
    });
  });
  describe('#dev()', function() {
    it('should return new instance', function() {
      var a;
      a = new Point(5, 8);
      return a.dev(2).should.not.equal(a);
    });
    return it('should devide elements', function() {
      new Point(5, 8).dev(2).should.eql(new Point(2.5, 4));
      return new Point(5, 8).dev(-2).should.eql(new Point(-2.5, -4));
    });
  });
  describe('#dotProduct()', function() {
    return it('should calculate dot product', function() {
      new Point(-12, 16).dotProduct(new Point(12, 9)).should.equal(0);
      return new Point(-6, 8).dotProduct(new Point(5, 12)).should.equal(66);
    });
  });
  return describe('#containIn', function() {
    it('should return new instance', function() {
      var a;
      a = new Point(5, 8);
      return a.containIn(new Rect(0, 0, 100, 400)).should.not.equal(a);
    });
    return it('should calculate contained point in rect', function() {
      var rect;
      rect = new Rect(3, 4, 10, 20);
      new Point(-1, -5).containIn(new Rect(3, 4, 10, 20)).should.eql(new Point(3, 4));
      new Point(-1, 5).containIn(new Rect(3, 4, 10, 20)).should.eql(new Point(3, 5));
      new Point(-1, 30).containIn(new Rect(3, 4, 10, 20)).should.eql(new Point(3, 24));
      new Point(8, -5).containIn(new Rect(3, 4, 10, 20)).should.eql(new Point(8, 4));
      new Point(8, 5).containIn(new Rect(3, 4, 10, 20)).should.eql(new Point(8, 5));
      new Point(8, 30).containIn(new Rect(3, 4, 10, 20)).should.eql(new Point(8, 24));
      new Point(40, -5).containIn(new Rect(3, 4, 10, 20)).should.eql(new Point(13, 4));
      return new Point(40, 5).containIn(new Rect(3, 4, 10, 20)).should.eql(new Point(13, 5));
    });
  });
});



},{}]},{},[1]);
