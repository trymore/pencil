!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.pencil=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = {
  iota: require('./models/iota')
};



},{"./models/iota":2}],2:[function(require,module,exports){

/*
主にフラグを作る際に使用するユーティリティです。

@example 10進数のフラグを生成する
    iota = require('pencil/models/iota')()
    a = iota() # 0
    b = iota() # 1
    c = iota() # 2
    d = iota() # 3
    e = iota() # 4

@example 2進数のフラグを生成する
    iota = require('pencil/models/iota')()
    a = 1 << iota() # 0 (0000)
    b = 1 << iota() # 1 (0001)
    c = 1 << iota() # 2 (0010)
    d = 1 << iota() # 4 (0100)
    e = 1 << iota() # 8 (1000)
 */
var Iota;

Iota = (function() {
  function Iota() {}


  /*
  @return Function コールする毎に0からインクリメントされた整数を返す関数を返します。
   */

  Iota.factory = function() {
    var index;
    index = 0;
    return function() {
      return index++;
    };
  };

  return Iota;

})();

module.exports = Iota.factory;



},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9taW5vZGlzay93b3Jrc3BhY2UvZ2l0aHViL3RyeW1vcmUvcGVuY2lsL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbWlub2Rpc2svd29ya3NwYWNlL2dpdGh1Yi90cnltb3JlL3BlbmNpbC9wZW5jaWwuY29mZmVlIiwiL1VzZXJzL21pbm9kaXNrL3dvcmtzcGFjZS9naXRodWIvdHJ5bW9yZS9wZW5jaWwvbW9kZWxzL2lvdGEuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsTUFBTSxDQUFDLE9BQVAsR0FDRTtBQUFBLEVBQUEsSUFBQSxFQUFNLE9BQUEsQ0FBUSxlQUFSLENBQU47Q0FERixDQUFBOzs7OztBQ0FBO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQUFBO0FBQUEsSUFBQSxJQUFBOztBQUFBO29CQXFCRTs7QUFBQTtBQUFBOztLQUFBOztBQUFBLEVBR0EsSUFBQyxDQUFBLE9BQUQsR0FBVSxTQUFBLEdBQUE7QUFDUixRQUFBLEtBQUE7QUFBQSxJQUFBLEtBQUEsR0FBUSxDQUFSLENBQUE7V0FDQSxTQUFBLEdBQUE7YUFBRyxLQUFBLEdBQUg7SUFBQSxFQUZRO0VBQUEsQ0FIVixDQUFBOztjQUFBOztJQXJCRixDQUFBOztBQUFBLE1BNEJNLENBQUMsT0FBUCxHQUFpQixJQUFJLENBQUMsT0E1QnRCLENBQUEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibW9kdWxlLmV4cG9ydHMgPVxuICBpb3RhOiByZXF1aXJlICcuL21vZGVscy9pb3RhJ1xuIiwiIyMjXG7kuLvjgavjg5Xjg6njgrDjgpLkvZzjgovpmpvjgavkvb/nlKjjgZnjgovjg6bjg7zjg4bjgqPjg6rjg4bjgqPjgafjgZnjgIJcblxuQGV4YW1wbGUgMTDpgLLmlbDjga7jg5Xjg6njgrDjgpLnlJ/miJDjgZnjgotcbiAgICBpb3RhID0gcmVxdWlyZSgncGVuY2lsL21vZGVscy9pb3RhJykoKVxuICAgIGEgPSBpb3RhKCkgIyAwXG4gICAgYiA9IGlvdGEoKSAjIDFcbiAgICBjID0gaW90YSgpICMgMlxuICAgIGQgPSBpb3RhKCkgIyAzXG4gICAgZSA9IGlvdGEoKSAjIDRcblxuQGV4YW1wbGUgMumAsuaVsOOBruODleODqeOCsOOCkueUn+aIkOOBmeOCi1xuICAgIGlvdGEgPSByZXF1aXJlKCdwZW5jaWwvbW9kZWxzL2lvdGEnKSgpXG4gICAgYSA9IDEgPDwgaW90YSgpICMgMCAoMDAwMClcbiAgICBiID0gMSA8PCBpb3RhKCkgIyAxICgwMDAxKVxuICAgIGMgPSAxIDw8IGlvdGEoKSAjIDIgKDAwMTApXG4gICAgZCA9IDEgPDwgaW90YSgpICMgNCAoMDEwMClcbiAgICBlID0gMSA8PCBpb3RhKCkgIyA4ICgxMDAwKVxuIyMjXG5jbGFzcyBJb3RhXG5cbiAgIyMjXG4gIEByZXR1cm4gRnVuY3Rpb24g44Kz44O844Or44GZ44KL5q+O44GrMOOBi+OCieOCpOODs+OCr+ODquODoeODs+ODiOOBleOCjOOBn+aVtOaVsOOCkui/lOOBmemWouaVsOOCkui/lOOBl+OBvuOBmeOAglxuICAjIyNcbiAgQGZhY3Rvcnk6IC0+XG4gICAgaW5kZXggPSAwXG4gICAgLT4gaW5kZXgrK1xuXG5tb2R1bGUuZXhwb3J0cyA9IElvdGEuZmFjdG9yeVxuIl19
