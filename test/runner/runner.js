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

Point = pencil.models.point;

describe('Point', function() {
  describe('constructor', function() {
    it('should create zero Point without no parameter', function() {
      var x, y, _ref;
      _ref = new Point, x = _ref.x, y = _ref.y;
      expect(x).equals(0);
      return expect(y).equals(0);
    });
    it('should create point with 2 numbers', function() {
      var x, y, _ref;
      _ref = new Point(5, 8), x = _ref.x, y = _ref.y;
      expect(x).equals(5);
      return expect(y).equals(8);
    });
    it('should create point with 1 array', function() {
      var x, y, _ref;
      _ref = new Point([5, 8]), x = _ref.x, y = _ref.y;
      expect(x).equals(5);
      return expect(y).equals(8);
    });
    it('should create point with 1 object', function() {
      var x, y, _ref;
      _ref = new Point({
        x: 5,
        y: 8
      }), x = _ref.x, y = _ref.y;
      expect(x).equals(5);
      return expect(y).equals(8);
    });
    return it('should create point with 1 Point', function() {
      var x, y, _ref;
      _ref = new Point(new Point(5, 8)), x = _ref.x, y = _ref.y;
      expect(x).equals(5);
      return expect(y).equals(8);
    });
  });
  return describe('.', function() {
    return describe('clone()', function() {
      return it('should create same value Point', function() {
        var point;
        point = new Point(5, 8);
        expect(point.clone().x).equals(5);
        return expect(point.clone().y).equals(8);
      });
    });
  });
});



},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9taW5vZGlzay93b3Jrc3BhY2UvZ2l0aHViL3RyeW1vcmUvcGVuY2lsL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbWlub2Rpc2svd29ya3NwYWNlL2dpdGh1Yi90cnltb3JlL3BlbmNpbC90ZXN0L3J1bm5lci9ydW5uZXIuY29mZmVlIiwiL1VzZXJzL21pbm9kaXNrL3dvcmtzcGFjZS9naXRodWIvdHJ5bW9yZS9wZW5jaWwvdGVzdC9pb3RhLmNvZmZlZSIsIi9Vc2Vycy9taW5vZGlzay93b3Jrc3BhY2UvZ2l0aHViL3RyeW1vcmUvcGVuY2lsL3Rlc3QvcG9pbnQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsT0FBQSxDQUFRLFNBQVIsQ0FBQSxDQUFBOztBQUFBLE9BQ0EsQ0FBUSxVQUFSLENBREEsQ0FBQTs7Ozs7QUNBQSxJQUFBLGVBQUE7O0FBQUEsU0FBVyxLQUFWLE1BQUQsQ0FBQTs7QUFBQSxPQUVBLEdBQVUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUZ4QixDQUFBOztBQUFBLFFBSUEsQ0FBUyxNQUFULEVBQWlCLFNBQUEsR0FBQTtTQUNmLFFBQUEsQ0FBUyxHQUFULEVBQWMsU0FBQSxHQUFBO1dBQ1osUUFBQSxDQUFTLFNBQVQsRUFBb0IsU0FBQSxHQUFBO0FBQ2xCLE1BQUEsRUFBQSxDQUFHLCtCQUFILEVBQW9DLFNBQUEsR0FBQTtlQUNsQyxNQUFBLENBQU8sT0FBQSxDQUFBLENBQVAsQ0FBaUIsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEtBQXpCLENBQStCLE9BQUEsQ0FBQSxDQUEvQixFQURrQztNQUFBLENBQXBDLENBQUEsQ0FBQTthQUdBLFFBQUEsQ0FBUyxNQUFULEVBQWlCLFNBQUEsR0FBQTtlQUNmLEVBQUEsQ0FBRywrQkFBSCxFQUFvQyxTQUFBLEdBQUE7QUFDbEMsY0FBQSxJQUFBO0FBQUEsVUFBQSxJQUFB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S0FBSyxDQUFDLEtBQU4sQ0FBQSxDQUFhLENBQUMsQ0FBckIsQ0FBdUIsQ0FBQyxNQUF4QixDQUErQixDQUEvQixDQURBLENBQUE7ZUFFQSxNQUFBLENBQU8sS0FBSyxDQUFDLEtBQU4sQ0FBQSxDQUFhLENBQUMsQ0FBckIsQ0FBdUIsQ0FBQyxNQUF4QixDQUErQixDQUEvQixFQUhtQztNQUFBLENBQXJDLEVBRGtCO0lBQUEsQ0FBcEIsRUFEWTtFQUFBLENBQWQsRUF2QmdCO0FBQUEsQ0FBbEIsQ0FKQSxDQUFBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInJlcXVpcmUgJy4uL2lvdGEnXG5yZXF1aXJlICcuLi9wb2ludCdcbiIsIntleHBlY3R9ID0gY2hhaVxuIyBmYWN0b3J5ID0gcmVxdWlyZSAnLi4vbW9kZWxzL2lvdGEnXG5mYWN0b3J5ID0gcGVuY2lsLm1vZGVscy5pb3RhXG5cbmRlc2NyaWJlICdJb3RhJywgLT5cbiAgZGVzY3JpYmUgJy4nLCAtPlxuICAgIGRlc2NyaWJlICdmYWN0b3J5JywgLT5cbiAgICAgIGl0ICdzaG91bGQgY3JlYXRlIG5ldyBJb3RhIG1ldGhvZCcsIC0+XG4gICAgICAgIGV4cGVjdChmYWN0b3J5KCkpLnRvLm5vdC5lcXVhbCBmYWN0b3J5KClcblxuICAgICAgZGVzY3JpYmUgJ2lvdGEnLCAtPlxuICAgICAgICBpdCAnc2hvdWxkIHJldHVybiBpbmNyZW1lbnRlZCBpbnQnLCAtPlxuICAgICAgICAgIGlvdGEgPSBmYWN0b3J5KClcbiAgICAgICAgICBleHBlY3QoaW90YSgpKS5lcXVhbCAwXG4gICAgICAgICAgZXhwZWN0KGlvdGEoKSkuZXF1YWwgMVxuICAgICAgICAgIGV4cGVjdChpb3RhKCkpLmVxdWFsIDJcbiAgICAgICAgICBleHBlY3QoaW90YSgpKS5lcXVhbCAzXG4gICAgICAgICAgZXhwZWN0KGlvdGEoKSkuZXF1YWwgNFxuICAgICAgICAgIGlvdGEgPSBmYWN0b3J5KClcbiAgICAgICAgICBleHBlY3QoaW90YSgpKS5lcXVhbCAwXG4gICAgICAgICAgZXhwZWN0KGlvdGEoKSkuZXF1YWwgMVxuICAgICAgICAgIGV4cGVjdChpb3RhKCkpLmVxdWFsIDJcbiAgICAgICAgICBleHBlY3QoaW90YSgpKS5lcXVhbCAzXG4gICAgICAgICAgZXhwZWN0KGlvdGEoKSkuZXF1YWwgNFxuIiwie2V4cGVjdH0gPSBjaGFpXG4jIFBvaW50ID0gcmVxdWlyZSAnLi4vbW9kZWxzL3BvaW50J1xuUG9pbnQgPSBwZW5jaWwubW9kZWxzLnBvaW50XG5cbmRlc2NyaWJlICdQb2ludCcsIC0+XG4gIGRlc2NyaWJlICdjb25zdHJ1Y3RvcicsIC0+XG4gICAgaXQgJ3Nob3VsZCBjcmVhdGUgemVybyBQb2ludCB3aXRob3V0IG5vIHBhcmFtZXRlcicsIC0+XG4gICAgICB7eCwgeX0gPSBuZXcgUG9pbnRcbiAgICAgIGV4cGVjdCh4KS5lcXVhbHMgMFxuICAgICAgZXhwZWN0KHkpLmVxdWFscyAwXG4gICAgaXQgJ3Nob3VsZCBjcmVhdGUgcG9pbnQgd2l0aCAyIG51bWJlcnMnLCAtPlxuICAgICAge3gsIHl9ID0gbmV3IFBvaW50IDUsIDhcbiAgICAgIGV4cGVjdCh4KS5lcXVhbHMgNVxuICAgICAgZXhwZWN0KHkpLmVxdWFscyA4XG4gICAgaXQgJ3Nob3VsZCBjcmVhdGUgcG9pbnQgd2l0aCAxIGFycmF5JywgLT5cbiAgICAgIHt4LCB5fSA9IG5ldyBQb2ludCBbNSwgOF1cbiAgICAgIGV4cGVjdCh4KS5lcXVhbHMgNVxuICAgICAgZXhwZWN0KHkpLmVxdWFscyA4XG4gICAgaXQgJ3Nob3VsZCBjcmVhdGUgcG9pbnQgd2l0aCAxIG9iamVjdCcsIC0+XG4gICAgICB7eCwgeX0gPSBuZXcgUG9pbnQge3g6IDUsIHk6IDh9XG4gICAgICBleHBlY3QoeCkuZXF1YWxzIDVcbiAgICAgIGV4cGVjdCh5KS5lcXVhbHMgOFxuICAgIGl0ICdzaG91bGQgY3JlYXRlIHBvaW50IHdpdGggMSBQb2ludCcsIC0+XG4gICAgICB7eCwgeX0gPSBuZXcgUG9pbnQgbmV3IFBvaW50IDUsIDhcbiAgICAgIGV4cGVjdCh4KS5lcXVhbHMgNVxuICAgICAgZXhwZWN0KHkpLmVxdWFscyA4XG5cbiAgZGVzY3JpYmUgJy4nLCAtPlxuICAgIGRlc2NyaWJlICdjbG9uZSgpJywgLT5cbiAgICAgIGl0ICdzaG91bGQgY3JlYXRlIHNhbWUgdmFsdWUgUG9pbnQnLCAtPlxuICAgICAgICBwb2ludCA9IG5ldyBQb2ludCA1LCA4XG4gICAgICAgIGV4cGVjdChwb2ludC5jbG9uZSgpLngpLmVxdWFscyA1XG4gICAgICAgIGV4cGVjdChwb2ludC5jbG9uZSgpLnkpLmVxdWFscyA4XG4iXX0=