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
var PI, Point, sqrt;

chai.should();

Point = pencil.models.geom.point;

PI = Math.PI, sqrt = Math.sqrt;

describe('Point', function() {
  describe('constructor', function() {
    it('should create zero Point without no parameter', function() {
      var x, y, _ref;
      _ref = new Point, x = _ref.x, y = _ref.y;
      x.should.equals(0);
      return y.should.equals(0);
    });
    it('should create point with 1 `Arguments`', function() {
      var func;
      func = function(x, y) {
        var _ref;
        _ref = new Point(arguments), x = _ref.x, y = _ref.y;
        x.should.equals(5);
        return y.should.equals(8);
      };
      return func(5, 8);
    });
    it('should create point with 1 `Array`', function() {
      var x, y, _ref;
      _ref = new Point([5, 8]), x = _ref.x, y = _ref.y;
      x.should.equals(5);
      return y.should.equals(8);
    });
    it('should create point with 1 `Object`', function() {
      var x, y, _ref;
      _ref = new Point({
        x: 5,
        y: 8
      }), x = _ref.x, y = _ref.y;
      x.should.equals(5);
      return y.should.equals(8);
    });
    it('should create point with 1 `Point`', function() {
      var x, y, _ref;
      _ref = new Point(new Point(5, 8)), x = _ref.x, y = _ref.y;
      x.should.equals(5);
      return y.should.equals(8);
    });
    return it('should create point with 2 `Number`s', function() {
      var x, y, _ref;
      _ref = new Point(5, 8), x = _ref.x, y = _ref.y;
      x.should.equals(5);
      return y.should.equals(8);
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
  return describe('#add()', function() {
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
});



},{}]},{},[1]);
