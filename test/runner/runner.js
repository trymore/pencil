(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
require('../iota');

require('../point');

require('../sns');



},{"../iota":12,"../point":13,"../sns":14}],2:[function(require,module,exports){

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



},{}],3:[function(require,module,exports){

/*
OS parses user agent and determines the OS type and version.
 */
var R_ANDROID, R_I_PAD, R_I_PHONE, R_I_POD, R_LINUX, R_MAC, R_WINDOWS, UA, name, number, os, version, _ref;

UA = window.navigator.userAgent.toLowerCase();

R_I_PHONE = /\((iphone).*?os ([\d_]+).*?\)/;

R_I_POD = /\((ipod).*?os ([\d_]+).*?\)/;

R_I_PAD = /\((ipad).*?os ([\d_]+).*?\)/;

R_ANDROID = /\(.*?(android) ([\d\.]+).*?\)/;

R_MAC = /\(.*?(mac) os x ([\d_\.]+).*?\)/;

R_LINUX = /\(.*?(linux) (\w+)v\)/;

R_WINDOWS = /\(.*?(windows) (\w+).*?\)/;

_ref = R_I_PHONE.exec(UA) || R_I_POD.exec(UA) || R_I_PAD.exec(UA) || R_ANDROID.exec(UA) || R_MAC.exec(UA) || R_WINDOWS.exec(UA) || R_LINUX.exec(UA) || [], _ref[0], name = _ref[1], version = _ref[2];

os = {};

if (name != null) {
  os[name] = true;
  os.version = version.split('_').join('.');
}

if (os.iphone || os.ipod || os.ipad) {
  os.ios = true;
}

if (os.ios || os.android) {
  os.mobile = true;
}

if (os.version != null) {
  number = parseInt(os.version, 10);
  if (!isNaN(number)) {
    os.versionNumber = number;
  }
}

module.exports = os;



},{}],4:[function(require,module,exports){
(function (global){
var Point, isArray, isObject, sqrt, _ref;

_ref = (typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null), isArray = _ref.isArray, isObject = _ref.isObject;

sqrt = Math.sqrt;


/*
ポイントクラスです。
二次元の直交座標系を扱います。
 */

module.exports = Point = (function() {
  Point.lerp = function(pt1, pt2, ratio) {
    var vector;
    vector = pt2.sub(pt1);
    return pt1.add(vector.mul(ratio));
  };

  Point.distance = function(pt1, pt2) {
    return pt2.sub(pt1).distance();
  };

  Point.positionToPoint = function(left, top) {
    var _ref1;
    if ((left != null) && (left.left != null) && (left.top != null)) {
      _ref1 = left, left = _ref1.left, top = _ref1.top;
    }
    return new Point(left, top);
  };

  Point.parseArguments = function(args) {
    var i, val, _i;
    args = (function() {
      switch (args.length) {
        case 0:
          return [];
        case 1:
          if (isArray(args[0])) {
            return args[0];
          } else if (isObject(args[0])) {
            return [args[0].x, args[0].y];
          } else {
            return [args[0]];
          }
          break;
        default:
          return args;
      }
    })();
    for (i = _i = 0; _i <= 1; i = ++_i) {
      args[i] = (val = args[i]) != null ? parseFloat(val) : args[i] = 0;
    }
    return args;
  };


  /*
  `left`,`top`から成るオブジェクトから`Point`インスタンスを生成します。
  @param [Object] position 座標オブジェクトです。
  @option position [Integer] left x座標です。
  @option position [Integer] top y座標です。
   */

  Point.createWithPosition = function(_arg) {
    var left, top;
    left = _arg.left, top = _arg.top;
    return new Point(left, top);
  };


  /*
  `clientX`,`clientY`から成るオブジェクトから`Point`インスタンスを生成します。
  @param [Object] position 座標オブジェクトです。
  @option position [Integer] clientX x座標です。
  @option position [Integer] clientY y座標です。
   */

  Point.createWithClient = function(_arg) {
    var clientX, clientY;
    clientX = _arg.clientX, clientY = _arg.clientY;
    return new Point(clientX, clientY);
  };

  function Point(x, y) {
    var _ref1;
    _ref1 = Point.parseArguments(arguments), this.x = _ref1[0], this.y = _ref1[1];
  }


  /*
  複製します。
  @return [Point] 複製された`Point`インスタンスです。
   */

  Point.prototype.clone = function() {
    return new Point(this.x, this.y);
  };

  Point.prototype.distance = function() {
    return sqrt(this.x * this.x + this.y * this.y);
  };

  Point.prototype.subtract = function(x, y) {
    var _ref1;
    if ((x != null) && (x.x != null) && (x.y != null)) {
      _ref1 = x, x = _ref1.x, y = _ref1.y;
    }
    return new Point(this.x - x, this.y - y);
  };

  Point.prototype.sub = Point.prototype.subtract;

  Point.prototype.add = function(x, y) {
    var _ref1;
    if ((x != null) && (x.x != null) && (x.y != null)) {
      _ref1 = x, x = _ref1.x, y = _ref1.y;
    }
    return new Point(this.x + x, this.y + y);
  };

  Point.prototype.multiply = function(n) {
    return new Point(this.x * n, this.y * n);
  };

  Point.prototype.mul = Point.prototype.multiply;

  return Point;

})();



}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],5:[function(require,module,exports){
(function (global){
var QueryString, isArray;

isArray = (typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null).isArray;


/*
クエリ文字列クラスです。
 */

module.exports = QueryString = (function() {
  function QueryString() {}

  QueryString.stringify = function(obj, sep, eq) {
    var key, queries, v, val;
    if (sep == null) {
      sep = '&';
    }
    if (eq == null) {
      eq = '=';
    }
    queries = (function() {
      var _results;
      _results = [];
      for (key in obj) {
        val = obj[key];
        if (isArray(val)) {
          _results.push((function() {
            var _i, _len, _results1;
            _results1 = [];
            for (_i = 0, _len = val.length; _i < _len; _i++) {
              v = val[_i];
              _results1.push("" + key + eq + (encodeURIComponent(v != null ? v : '')));
            }
            return _results1;
          })());
        } else {
          _results.push("" + key + eq + (encodeURIComponent(val != null ? val : '')));
        }
      }
      return _results;
    })();
    return queries.join(sep);
  };

  QueryString.parse = function(str, sep, eq, opts) {
    var i, key, kv, maxKeys, obj, tmp, val, _i, _len, _ref, _ref1;
    if (sep == null) {
      sep = '&';
    }
    if (eq == null) {
      eq = '=';
    }
    opts = assign(opts, {
      maxKeys: 1000
    });
    maxKeys = opts.maxKeys;
    obj = {};
    _ref = str.split(sep);
    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
      kv = _ref[i];
      if (!(maxKeys === 0 || i < maxKeys)) {
        continue;
      }
      _ref1 = kv.split(eq), key = _ref1[0], val = _ref1[1];
      if (obj[key] != null) {
        if (isArray(obj[key])) {
          obj[key].push(val);
        } else {
          tmp = obj[key];
          obj[key] = [tmp, val];
        }
      } else {
        obj[key] = val;
      }
    }
    return obj;
  };

  return QueryString;

})();



}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],6:[function(require,module,exports){
var Facebook, stringify;

stringify = require('../query-string').stringify;


/*
Facebookの提供するサービスを利用するためのクラスです。
 */

module.exports = Facebook = (function() {
  function Facebook() {}


  /*
  ウェブサイトをシェアする為のURLを生成します。
  @param [String] url ウェブサイトのURLです。
  @return [String] シェアする為のURLです。
   */

  Facebook.createShareUrl = function(url) {
    return "http://www.facebook.com/share.php?" + (stringify({
      u: url
    }));
  };


  /*
  ウェブサイトのシェア数を取得します。
  @param [String] url ウェブサイトのURLです。
  @param [Function] callback コールバックです。
  
  @example ウェブサイトのシェア数を取得をalertします。
      Facebook.fetchCount 'http://example.com', (err, shares) ->
        throw err if err?
        alert shares
   */

  Facebook.fetchShareCount = function(url, callback) {
    return $.ajax({
      url: 'https://graph.facebook.com/',
      type: 'get',
      cache: false,
      data: {
        url: url
      },
      dataType: 'jsonp',
      success: function(_arg) {
        var shares;
        shares = _arg.shares;
        if (shares == null) {
          callback('no data');
          return;
        }
        return callback(null, shares);
      },
      error: function(_arg, type) {
        _arg;
        return callback(type);
      }
    });
  };

  return Facebook;

})();



},{"../query-string":5}],7:[function(require,module,exports){
var Twitter, stringify;

stringify = require('../query-string').stringify;


/*
Google+の提供するサービスを利用するためのクラスです。
 */

module.exports = Twitter = (function() {
  function Twitter() {}


  /*
  ウェブサイトをシェアする為のURLを生成します。
  @param [String] url ウェブサイトのURLです。
  @return [String] シェアする為のURLです。
   */

  Twitter.createShareUrl = function(url) {
    return "https://plus.google.com/share?" + (stringify({
      url: url
    }));
  };


  /*
  ウェブサイトのシェア数を取得します。
  @param [String] url ウェブサイトのURLです。
  @param [Function] callback コールバックです。
   */

  Twitter.fetchShareCount = function(url, callback) {
    return $.ajax({
      url: "http://query.yahooapis.com/v1/public/yql?env=http://datatables.org/alltables.env&q=" + (encodeURIComponent("SELECT content FROM data.headers WHERE url='https://plusone.google.com/_/+1/fastbutton?hl=ja&url=" + url + "' and ua='" + ua + "'")),
      type: 'get',
      cache: false,
      dataType: 'xml',
      error: function(_arg, type) {
        _arg;
        return callback(type);
      },
      success: function(document) {
        var count, obj, str;
        str = $(document).find('content').text().match(/<script type="text\/javascript">window\.__SSR = ([\s\S]*?);/)[1];
        str = str.replace(/\r?\n/g, '');
        obj = null;
        eval("obj = " + str + ";");
        count = obj.ld[1][4];
        if (count == null) {
          callback('no data');
          return;
        }
        return callback(null, parseInt(count, 10));
      }
    });
  };

  return Twitter;

})();



},{"../query-string":5}],8:[function(require,module,exports){

/*
Hatenaの提供するサービスを利用するためのクラスです。
 */
var Hatena;

module.exports = Hatena = (function() {
  function Hatena() {}


  /*
  ウェブサイトをブックマークする為のURLを生成します。
  @param [String] url ウェブサイトのURLです。
  @return [String] ブックマークする為のURLです。
   */

  Hatena.createBookmarkUrl = function(url) {
    return "http://b.hatena.ne.jp/entry/add/" + url;
  };

  return Hatena;

})();



},{}],9:[function(require,module,exports){
var Line, mobile, stringify;

stringify = require('../query-string').stringify;

mobile = require('../../models/os').mobile;


/*
Lineの提供するサービスを利用するためのクラスです。
 */

module.exports = Line = (function() {
  function Line() {}


  /*
  テキストをチャットする為のURLを生成します。
  @param [String] text テキストです。
  @return [String] チャットする為のURLです。
   */

  Line.createChatUrl = function(text) {
    text = encodeURIComponent(text);
    if (mobile) {
      return "line://msg/text/" + text;
    } else {
      return "http://line.naver.jp/R/msg/text/?" + text;
    }
  };

  return Line;

})();



},{"../../models/os":3,"../query-string":5}],10:[function(require,module,exports){
var Pinterest, stringify;

stringify = require('../query-string').stringify;


/*
Pinterestの提供するサービスを利用するためのクラスです。
 */

module.exports = Pinterest = (function() {
  function Pinterest() {}


  /*
  ウェブサイトをピンする為のURLを生成します。
  @param [Object] options オプションです。
  @option options [String] url ウェブサイトのURLです。
  @option options [String] media 画像等のメディアのURLです。
  @option options [String] description 説明文です。
  @return [String] シェアする為のURLです。
   */

  Pinterest.createPinItUrl = function(options) {
    return "http://www.pinterest.com/pin/create/button/?" + (stringify(options));
  };

  return Pinterest;

})();



},{"../query-string":5}],11:[function(require,module,exports){
var Twitter, stringify;

stringify = require('../query-string').stringify;


/*
Twitterの提供するサービスを利用するためのクラスです。
 */

module.exports = Twitter = (function() {
  function Twitter() {}


  /*
  ウェブサイトをツイートする為のURLを生成します。
  @param [Object] options オプションです。
  @option options [String] text 説明文です。
  @option options [String] url ウェブサイトのURLです。
  @option options [String] hashtags ハッシュタグです。
  @return [String] ツイートする為のURLです。
   */

  Twitter.createTweetUrl = function(_arg) {
    var hashtags, text, url;
    text = _arg.text, url = _arg.url, hashtags = _arg.hashtags;
    return "http://twitter.com/share?" + (stringify({
      text: text,
      url: url,
      hashtags: hashtags
    }));
  };


  /*
  ウェブサイトのツイート数を取得します。
  @param [String] url ウェブサイトのURLです。
  @param [Function] callback コールバックです。
   */

  Twitter.fetchTweetCount = function(url, callback) {
    return $.ajax({
      url: 'http://urls.api.twitter.com/1/urls/count.json',
      type: 'get',
      cache: false,
      data: {
        url: url
      },
      dataType: 'jsonp',
      error: function(_arg, type) {
        _arg;
        return callback(type);
      },
      success: function(_arg) {
        var count;
        count = _arg.count;
        if (count == null) {
          callback('no data');
          return;
        }
        return callback(null, count);
      }
    });
  };

  return Twitter;

})();



},{"../query-string":5}],12:[function(require,module,exports){
var expect, factory;

expect = chai.expect;

factory = require('../models/iota');

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



},{"../models/iota":2}],13:[function(require,module,exports){
var Point, expect;

expect = chai.expect;

Point = require('../models/point');

describe('Point', function() {
  return describe('constructor', function() {
    it('should create zero point without no parameter', function() {
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
});



},{"../models/point":4}],14:[function(require,module,exports){
var googlePlus, hatena, line, pinterest, sns, twitter;

sns = require('../models/sns/facebook');

googlePlus = require('../models/sns/google-plus');

hatena = require('../models/sns/hatena');

line = require('../models/sns/line');

pinterest = require('../models/sns/pinterest');

twitter = require('../models/sns/twitter');



},{"../models/sns/facebook":6,"../models/sns/google-plus":7,"../models/sns/hatena":8,"../models/sns/line":9,"../models/sns/pinterest":10,"../models/sns/twitter":11}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9taW5vZGlzay93b3Jrc3BhY2UvZ2l0aHViL3RyeW1vcmUvcGVuY2lsL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbWlub2Rpc2svd29ya3NwYWNlL2dpdGh1Yi90cnltb3JlL3BlbmNpbC90ZXN0L3J1bm5lci9ydW5uZXIuY29mZmVlIiwiL1VzZXJzL21pbm9kaXNrL3dvcmtzcGFjZS9naXRodWIvdHJ5bW9yZS9wZW5jaWwvbW9kZWxzL2lvdGEuY29mZmVlIiwiL1VzZXJzL21pbm9kaXNrL3dvcmtzcGFjZS9naXRodWIvdHJ5bW9yZS9wZW5jaWwvbW9kZWxzL29zLmNvZmZlZSIsIi9Vc2Vycy9taW5vZGlzay93b3Jrc3BhY2UvZ2l0aHViL3RyeW1vcmUvcGVuY2lsL21vZGVscy9wb2ludC5jb2ZmZWUiLCIvVXNlcnMvbWlub2Rpc2svd29ya3NwYWNlL2dpdGh1Yi90cnltb3JlL3BlbmNpbC9tb2RlbHMvcXVlcnktc3RyaW5nLmNvZmZlZSIsIi9Vc2Vycy9taW5vZGlzay93b3Jrc3BhY2UvZ2l0aHViL3RyeW1vcmUvcGVuY2lsL21vZGVscy9zbnMvZmFjZWJvb2suY29mZmVlIiwiL1VzZXJzL21pbm9kaXNrL3dvcmtzcGFjZS9naXRodWIvdHJ5bW9yZS9wZW5jaWwvbW9kZWxzL3Nucy9nb29nbGUtcGx1cy5jb2ZmZWUiLCIvVXNlcnMvbWlub2Rpc2svd29ya3NwYWNlL2dpdGh1Yi90cnltb3JlL3BlbmNpbC9tb2RlbHMvc25zL2hhdGVuYS5jb2ZmZWUiLCIvVXNlcnMvbWlub2Rpc2svd29ya3NwYWNlL2dpdGh1Yi90cnltb3JlL3BlbmNpbC9tb2RlbHMvc25zL2xpbmUuY29mZmVlIiwiL1VzZXJzL21pbm9kaXNrL3dvcmtzcGFjZS9naXRodWIvdHJ5bW9yZS9wZW5jaWwvbW9kZWxzL3Nucy9waW50ZXJlc3QuY29mZmVlIiwiL1VzZXJzL21pbm9kaXNrL3dvcmtzcGFjZS9naXRodWIvdHJ5bW9yZS9wZW5jaWwvbW9kZWxzL3Nucy90d2l0dGVyLmNvZmZlZSIsIi9Vc2Vycy9taW5vZGlzay93b3Jrc3BhY2UvZ2l0aHViL3RyeW1vcmUvcGVuY2lsL3Rlc3QvaW90YS5jb2ZmZWUiLCIvVXNlcnMvbWlub2Rpc2svd29ya3NwYWNlL2dpdGh1Yi90cnltb3JlL3BlbmNpbC90ZXN0L3BvaW50LmNvZmZlZSIsIi9Vc2Vycy9taW5vZGlzay93b3Jrc3BhY2UvZ2l0aHViL3RyeW1vcmUvcGVuY2lsL3Rlc3Qvc25zLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLE9BQUEsQ0FBUSxTQUFSLENBQUEsQ0FBQTs7QUFBQSxPQUNBLENBQVEsVUFBUixDQURBLENBQUE7O0FBQUEsT0FFQSxDQUFRLFFBQVIsQ0FGQSxDQUFBOzs7OztBQ0FBO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQUFBO0FBQUEsSUFBQSxJQUFBOztBQUFBO29CQXFCRTs7QUFBQTtBQUFBOztLQUFBOztBQUFBLEVBR0EsSUFBQyxDQUFBLE9BQUQsR0FBVSxTQUFBLEdBQUE7QUFDUixRQUFBLEtBQUE7QUFBQSxJQUFBLEtBQUEsR0FBUSxDQUFSLENBQUE7V0FDQSxTQUFBLEdBQUE7YUFBRyxLQUFBLEdBQUg7SUFBQSxFQUZRO0VBQUEsQ0FIVixDQUFBOztjQUFBOztJQXJCRixDQUFBOztBQUFBLE1BNEJNLENBQUMsT0FBUCxHQUFpQixJQUFJLENBQUMsT0E1QnRCLENBQUE7Ozs7O0FDQUE7QUFBQTs7R0FBQTtBQUFBLElBQUEsc0dBQUE7O0FBQUEsRUFJQSxHQUFLLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFdBQTNCLENBQUEsQ0FKTCxDQUFBOztBQUFBLFNBS0EsR0FBWSwrQkFMWixDQUFBOztBQUFBLE9BTUEsR0FBVSw2QkFOVixDQUFBOztBQUFBLE9BT0EsR0FBVSw2QkFQVixDQUFBOztBQUFBLFNBUUEsR0FBWSwrQkFSWixDQUFBOztBQUFBLEtBU0EsR0FBUSxpQ0FUUixD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Q0FBUyxDQUFDLE1BQVYsQ0FBaUIsQ0FBakIsQ0FEQSxDQUFBO2FBRUEsTUFBQSxDQUFPLENBQVAsQ0FBUyxDQUFDLE1BQVYsQ0FBaUIsQ0FBakIsRUFIc0M7SUFBQSxDQUF4QyxDQVpBLENBQUE7V0FnQkEsRUFBQSxDQUFHLGtDQUFILEVBQXVDLFNBQUEsR0FBQTtBQUNyQyxVQUFBLFVBQUE7QUFBQSxNQUFBLE9BQWEsSUFBQSxLQUFBLENBQVUsSUFBQSxLQUFBLENBQU0sQ0FBTixFQUFTLENBQVQsQ0FBVixDQUFiLEVBQUMsU0FBQSxDQUFELEVBQUksU0FBQSxDQUFKLENBQUE7QUFBQSxNQUNBLE1BQUEsQ0FBTyxDQUFQLENBQVMsQ0FBQyxNQUFWLENBQWlCLENBQWpCLENBREEsQ0FBQTthQUVBLE1BQUEsQ0FBTyxDQUFQLENBQVMsQ0FBQyxNQUFWLENBQWlCLENBQWpCLEVBSHFDO0lBQUEsQ0FBdkMsRUFqQnNCO0VBQUEsQ0FBeEIsRUFEZ0I7QUFBQSxDQUFsQixDQUhBLENBQUE7Ozs7O0FDQUEsSUFBQSxpREFBQTs7QUFBQSxHQUFBLEdBQU0sT0FBQSxDQUFRLHdCQUFSLENBQU4sQ0FBQTs7QUFBQSxVQUNBLEdBQWEsT0FBQSxDQUFRLDJCQUFSLENBRGIsQ0FBQTs7QUFBQSxNQUVBLEdBQVMsT0FBQSxDQUFRLHNCQUFSLENBRlQsQ0FBQTs7QUFBQSxJQUdBLEdBQU8sT0FBQSxDQUFRLG9CQUFSLENBSFAsQ0FBQTs7QUFBQSxTQUlBLEdBQVksT0FBQSxDQUFRLHlCQUFSLENBSlosQ0FBQTs7QUFBQSxPQUtBLEdBQVUsT0FBQSxDQUFRLHVCQUFSLENBTFYsQ0FBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJyZXF1aXJlICcuLi9pb3RhJ1xucmVxdWlyZSAnLi4vcG9pbnQnXG5yZXF1aXJlICcuLi9zbnMnXG4iLCIjIyNcbuS4u+OBq+ODleODqeOCsOOCkuS9nOOCi+mam+OBq+S9v+eUqOOBmeOCi+ODpuODvOODhuOCo+ODquODhuOCo+OBp+OBmeOAglxuXG5AZXhhbXBsZSAxMOmAsuaVsOOBruODleODqeOCsOOCkueUn+aIkOOBmeOCi1xuICAgIGlvdGEgPSByZXF1aXJlKCdwZW5jaWwvbW9kZWxzL2lvdGEnKSgpXG4gICAgYSA9IGlvdGEoKSAjIDBcbiAgICBiID0gaW90YSgpICMgMVxuICAgIGMgPSBpb3RhKCkgIyAyXG4gICAgZCA9IGlvdGEoKSAjIDNcbiAgICBlID0gaW90YSgpICMgNFxuXG5AZXhhbXBsZSAy6YCy5pWw44Gu44OV44Op44Kw44KS55Sf5oiQ44GZ44KLXG4gICAgaW90YSA9IHJlcXVpcmUoJ3BlbmNpbC9tb2RlbHMvaW90YScpKClcbiAgICBhID0gMSA8PCBpb3RhKCkgIyAwICgwMDAwKVxuICAgIGIgPSAxIDw8IGlvdGEoKSAjIDEgKDAwMDEpXG4gICAgYyA9IDEgPDwgaW90YSgpICMgMiAoMDAxMClcbiAgICBkID0gMSA8PCBpb3RhKCkgIyA0ICgwMTAwKVxuICAgIGUgPSAxIDw8IGlvdGEoKSAjIDggKDEwMDApXG4jIyNcbmNsYXNzIElvdGFcblxuICAjIyNcbiAgQHJldHVybiBGdW5jdGlvbiDjgrPjg7zjg6vjgZnjgovmr47jgasw44GL44KJ44Kk44Oz44Kv44Oq44Oh44Oz44OI44GV44KM44Gf5pW05pWw44KS6L+U44GZ6Zai5pWw44KS6L+U44GX44G+44GZ44CCXG4gICMjI1xuICBAZmFjdG9yeTogLT5cbiAgICBpbmRleCA9IDBcbiAgICAtPiBpbmRleCsrXG5cbm1vZHVsZS5leHBvcnRzID0gSW90YS5mYWN0b3J5XG4iLCIjIyNcbk9TIHBhcnNlcyB1c2VyIGFnZW50IGFuZCBkZXRlcm1pbmVzIHRoZSBPUyB0eXBlIGFuZCB2ZXJzaW9uLlxuIyMjXG5cblVBID0gd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKVxuUl9JX1BIT05FID0gL1xcKChpcGhvbmUpLio/b3MgKFtcXGRfXSspLio/XFwpL1xuUl9JX1BPRCA9IC9cXCgoaXBvZCkuKj9vcyAoW1xcZF9dKykuKj9cXCkvXG5SX0lfUEFEID0gL1xcKChpcGFkKS4qP29zIChbXFxkX10rKS4qP1xcKS9cblJfQU5EUk9JRCA9IC9cXCguKj8oYW5kcm9pZCkgKFtcXGRcXC5dKykuKj9cXCkvXG5SX01BQyA9IC9cXCguKj8obWFjKSBvcyB4IChbXFxkX1xcLl0rKS4qP1xcKS9cblJfTElOVVggPSAvXFwoLio/KGxpbnV4KSAoXFx3Kyl2XFwpL1xuUl9XSU5ET1dTID0gL1xcKC4qPyh3aW5kb3dzKSAoXFx3KykuKj9cXCkvXG5cblsge30sIG5hbWUsIHZlcnNpb24gXSA9IFJfSV9QSE9ORS5leGVjKFVBKSBvclxuICAgICAgICAgICAgICAgICAgICAgICAgUl9JX1BPRC5leGVjKFVBKSBvclxuICAgICAgICAgICAgICAgICAgICAgICAgUl9JX1BBRC5leGVjKFVBKSBvclxuICAgICAgICAgICAgICAgICAgICAgICAgUl9BTkRST0lELmV4ZWMoVUEpIG9yXG4gICAgICAgICAgICAgICAgICAgICAgICBSX01BQy5leGVjKFVBKSBvclxuICAgICAgICAgICAgICAgICAgICAgICAgUl9XSU5ET1dTLmV4ZWMoVUEpIG9yXG4gICAgICAgICAgICAgICAgICAgICAgICBSX0xJTlVYLmV4ZWMoVUEpIG9yXG4gICAgICAgICAgICAgICAgICAgICAgICBbXVxuXG5vcyA9IHt9XG5pZiBuYW1lP1xuICBvc1tuYW1lXSA9IHRydWVcbiAgb3MudmVyc2lvbiA9IHZlcnNpb24uc3BsaXQoJ18nKS5qb2luKCcuJylcbmlmIG9zLmlwaG9uZSBvciBvcy5pcG9kIG9yIG9zLmlwYWRcbiAgb3MuaW9zID0gdHJ1ZVxuaWYgb3MuaW9zIG9yIG9zLmFuZHJvaWRcbiAgb3MubW9iaWxlID0gdHJ1ZVxuaWYgb3MudmVyc2lvbj9cbiAgbnVtYmVyID0gcGFyc2VJbnQgb3MudmVyc2lvbiwgMTBcbiAgdW5sZXNzIGlzTmFOIG51bWJlclxuICAgIG9zLnZlcnNpb25OdW1iZXIgPSBudW1iZXJcblxubW9kdWxlLmV4cG9ydHMgPSBvc1xuIiwie2lzQXJyYXksIGlzT2JqZWN0fSA9IHJlcXVpcmUgJ2xvZGFzaCdcbntzcXJ0fSA9IE1hdGhcblxuXG4jIyNcbuODneOCpOODs+ODiOOCr+ODqeOCueOBp+OBmeOAglxu5LqM5qyh5YWD44Gu55u05Lqk5bqn5qiZ57O744KS5omx44GE44G+44GZ44CCXG4jIyNcbm1vZHVsZS5leHBvcnRzID1cbmNsYXNzIFBvaW50XG5cbiAgQGxlcnA6IChwdDEsIHB0MiwgcmF0aW8pIC0+XG4gICAgdmVjdG9yID0gcHQyLnN1YiBwdDFcbiAgICBwdDEuYWRkIHZlY3Rvci5tdWwgcmF0aW9cblxuICBAZGlzdGFuY2U6IChwdDEsIHB0MikgLT5cbiAgICBwdDIuc3ViKHB0MSkuZGlzdGFuY2UoKVxuXG4gIEBwb3NpdGlvblRvUG9pbnQ6IChsZWZ0LCB0b3ApIC0+XG4gICAgaWYgbGVmdD8gYW5kIGxlZnQubGVmdD8gYW5kIGxlZnQudG9wP1xuICAgICAgeyBsZWZ0LCB0b3AgfSA9IGxlZnRcbiAgICBuZXcgUG9pbnQgbGVmdCwgdG9wXG5cbiAgQHBhcnNlQXJndW1lbnRzOiAoYXJncykgLT5cbiAgICBhcmdzID0gc3dpdGNoIGFyZ3MubGVuZ3RoXG4gICAgICB3aGVuIDBcbiAgICAgICAgW11cbiAgICAgIHdoZW4gMVxuICAgICAgICBpZiBpc0FycmF5IGFyZ3NbMF1cbiAgICAgICAgICBhcmdzWzBdXG4gICAgICAgIGVsc2UgaWYgaXNPYmplY3QgYXJnc1swXVxuICAgICAgICAgIFthcmdzWzBdLngsIGFyZ3NbMF0ueV1cbiAgICAgICAgZWxzZVxuICAgICAgICAgIFthcmdzWzBdXVxuICAgICAgZWxzZVxuICAgICAgICBhcmdzXG4gICAgZm9yIGkgaW4gWzAuLjFdXG4gICAgICBhcmdzW2ldID0gaWYgKHZhbCA9IGFyZ3NbaV0pP1xuICAgICAgICBwYXJzZUZsb2F0IHZhbFxuICAgICAgZWxzZVxuICAgICAgICBhcmdzW2ldID0gMFxuICAgIGFyZ3NcblxuXG4gICMjI1xuICBgbGVmdGAsYHRvcGDjgYvjgonmiJDjgovjgqrjg5bjgrjjgqfjgq/jg4jjgYvjgolgUG9pbnRg44Kk44Oz44K544K/44Oz44K544KS55Sf5oiQ44GX44G+44GZ44CCXG4gIEBwYXJhbSBbT2JqZWN0XSBwb3NpdGlvbiDluqfmqJnjgqrjg5bjgrjjgqfjgq/jg4jjgafjgZnjgIJcbiAgQG9wdGlvbiBwb3NpdGlvbiBbSW50ZWdlcl0gbGVmdCB45bqn5qiZ44Gn44GZ44CCXG4gIEBvcHRpb24gcG9zaXRpb24gW0ludGVnZXJdIHRvcCB55bqn5qiZ44Gn44GZ44CCXG4gICMjI1xuICBAY3JlYXRlV2l0aFBvc2l0aW9uOiAoeyBsZWZ0LCB0b3AgfSkgLT5cbiAgICBuZXcgUG9pbnQgbGVmdCwgdG9wXG5cbiAgIyMjXG4gIGBjbGllbnRYYCxgY2xpZW50WWDjgYvjgonmiJDjgovjgqrjg5bjgrjjgqfjgq/jg4jjgYvjgolgUG9pbnRg44Kk44Oz44K544K/44Oz44K544KS55Sf5oiQ44GX44G+44GZ44CCXG4gIEBwYXJhbSBbT2JqZWN0XSBwb3NpdGlvbiDluqfmqJnjgqrjg5bjgrjjgqfjgq/jg4jjgafjgZnjgIJcbiAgQG9wdGlvbiBwb3NpdGlvbiBbSW50ZWdlcl0gY2xpZW50WCB45bqn5qiZ44Gn44GZ44CCXG4gIEBvcHRpb24gcG9zaXRpb24gW0ludGVnZXJdIGNsaWVudFkgeeW6p+aomeOBp+OBmeOAglxuICAjIyNcbiAgQGNyZWF0ZVdpdGhDbGllbnQ6ICh7IGNsaWVudFgsIGNsaWVudFkgfSkgLT5cbiAgICBuZXcgUG9pbnQgY2xpZW50WCwgY2xpZW50WVxuXG5cbiAgY29uc3RydWN0b3I6ICh4LCB5KSAtPlxuICAgIFtAeCwgQHldID0gUG9pbnQucGFyc2VBcmd1bWVudHMgYXJndW1lbnRzXG5cbiAgIyMjXG4gIOikh+ijveOBl+OBvuOBmeOAglxuICBAcmV0dXJuIFtQb2ludF0g6KSH6KO944GV44KM44GfYFBvaW50YOOCpOODs+OCueOCv+ODs+OCueOBp+OBmeOAglxuICAjIyNcbiAgY2xvbmU6IC0+IG5ldyBQb2ludCBAeCwgQHlcblxuICBkaXN0YW5jZTogLT5cbiAgICBzcXJ0IEB4ICogQHggKyBAeSAqIEB5XG5cbiAgc3VidHJhY3Q6ICh4LCB5KSAtPlxuICAgIGlmIHg/IGFuZCB4Lng/IGFuZCB4Lnk/XG4gICAgICB7eCwgeX0gPSB4XG4gICAgbmV3IFBvaW50IEB4IC0geCwgQHkgLSB5XG4gIHN1YjogUG9pbnQ6OnN1YnRyYWN0XG5cbiAgYWRkOiAoeCwgeSkgLT5cbiAgICBpZiB4PyBhbmQgeC54PyBhbmQgeC55P1xuICAgICAge3gsIHl9ID0geFxuICAgIG5ldyBQb2ludCBAeCArIHgsIEB5ICsgeVxuXG4gIG11bHRpcGx5OiAobikgLT5cbiAgICBuZXcgUG9pbnQgQHggKiBuLCBAeSAqIG5cbiAgbXVsOiBQb2ludDo6bXVsdGlwbHlcbiIsInsgaXNBcnJheSB9ID0gcmVxdWlyZSAnbG9kYXNoJ1xuXG5cbiMjI1xu44Kv44Ko44Oq5paH5a2X5YiX44Kv44Op44K544Gn44GZ44CCXG4jIyNcbm1vZHVsZS5leHBvcnRzID1cbmNsYXNzIFF1ZXJ5U3RyaW5nXG5cbiAgQHN0cmluZ2lmeTogKG9iaiwgc2VwID0gJyYnLCBlcSA9ICc9JykgLT5cbiAgICBxdWVyaWVzID0gZm9yIGtleSwgdmFsIG9mIG9ialxuICAgICAgaWYgaXNBcnJheSB2YWxcbiAgICAgICAgZm9yIHYgaW4gdmFsXG4gICAgICAgICAgXCIje2tleX0je2VxfSN7ZW5jb2RlVVJJQ29tcG9uZW50IHYgPyAnJ31cIlxuICAgICAgZWxzZVxuICAgICAgICBcIiN7a2V5fSN7ZXF9I3tlbmNvZGVVUklDb21wb25lbnQgdmFsID8gJyd9XCJcbiAgICBxdWVyaWVzLmpvaW4gc2VwXG5cbiAgQHBhcnNlOiAoc3RyLCBzZXAgPSAnJicsIGVxID0gJz0nLCBvcHRzKSAtPlxuICAgIG9wdHMgPSBhc3NpZ24gb3B0cywgbWF4S2V5czogMTAwMFxuICAgIHttYXhLZXlzfSA9IG9wdHNcbiAgICBvYmogPSB7fVxuICAgIGZvciBrdiwgaSBpbiBzdHIuc3BsaXQgc2VwIHdoZW4gbWF4S2V5cyBpcyAwIG9yIGkgPCBtYXhLZXlzXG4gICAgICBba2V5LCB2YWxdID0ga3Yuc3BsaXQgZXFcbiAgICAgIGlmIG9ialtrZXldP1xuICAgICAgICBpZiBpc0FycmF5IG9ialtrZXldXG4gICAgICAgICAgb2JqW2tleV0ucHVzaCB2YWxcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHRtcCA9IG9ialtrZXldXG4gICAgICAgICAgb2JqW2tleV0gPSBbdG1wLCB2YWxdXG4gICAgICBlbHNlXG4gICAgICAgIG9ialtrZXldID0gdmFsXG4gICAgb2JqXG4iLCJ7IHN0cmluZ2lmeSB9ID0gcmVxdWlyZSAnLi4vcXVlcnktc3RyaW5nJ1xuXG5cbiMjI1xuRmFjZWJvb2vjga7mj5DkvpvjgZnjgovjgrXjg7zjg5PjgrnjgpLliKnnlKjjgZnjgovjgZ/jgoHjga7jgq/jg6njgrnjgafjgZnjgIJcbiMjI1xubW9kdWxlLmV4cG9ydHMgPVxuY2xhc3MgRmFjZWJvb2tcblxuICAjIyNcbiAg44Km44Kn44OW44K144Kk44OI44KS44K344Kn44Ki44GZ44KL54K644GuVVJM44KS55Sf5oiQ44GX44G+44GZ44CCXG4gIEBwYXJhbSBbU3RyaW5nXSB1cmwg44Km44Kn44OW44K144Kk44OI44GuVVJM44Gn44GZ44CCXG4gIEByZXR1cm4gW1N0cmluZ10g44K344Kn44Ki44GZ44KL54K644GuVVJM44Gn44GZ44CCXG4gICMjI1xuICBAY3JlYXRlU2hhcmVVcmw6ICh1cmwpIC0+IFwiaHR0cDovL3d3dy5mYWNlYm9vay5jb20vc2hhcmUucGhwPyN7c3RyaW5naWZ5IHU6IHVybH1cIlxuXG4gICMjI1xuICDjgqbjgqfjg5bjgrXjgqTjg4jjga7jgrfjgqfjgqLmlbDjgpLlj5blvpfjgZfjgb7jgZnjgIJcbiAgQHBhcmFtIFtTdHJpbmddIHVybCDjgqbjgqfjg5bjgrXjgqTjg4jjga5VUkzjgafjgZnjgIJcbiAgQHBhcmFtIFtGdW5jdGlvbl0gY2FsbGJhY2sg44Kz44O844Or44OQ44OD44Kv44Gn44GZ44CCXG5cbiAgQGV4YW1wbGUg44Km44Kn44OW44K144Kk44OI44Gu44K344Kn44Ki5pWw44KS5Y+W5b6X44KSYWxlcnTjgZfjgb7jgZnjgIJcbiAgICAgIEZhY2Vib29rLmZldGNoQ291bnQgJ2h0dHA6Ly9leGFtcGxlLmNvbScsIChlcnIsIHNoYXJlcykgLT5cbiAgICAgICAgdGhyb3cgZXJyIGlmIGVycj9cbiAgICAgICAgYWxlcnQgc2hhcmVzXG4gICMjI1xuICBAZmV0Y2hTaGFyZUNvdW50OiAodXJsLCBjYWxsYmFjaykgLT5cbiAgICAkXG4gICAgLmFqYXhcbiAgICAgIHVybDogJ2h0dHBzOi8vZ3JhcGguZmFjZWJvb2suY29tLydcbiAgICAgIHR5cGU6ICdnZXQnXG4gICAgICBjYWNoZTogZmFsc2VcbiAgICAgIGRhdGE6XG4gICAgICAgIHVybDogdXJsXG4gICAgICBkYXRhVHlwZTogJ2pzb25wJ1xuICAgICAgc3VjY2VzczogKHsgc2hhcmVzIH0pIC0+XG4gICAgICAgIHVubGVzcyBzaGFyZXM/XG4gICAgICAgICAgY2FsbGJhY2sgJ25vIGRhdGEnXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIGNhbGxiYWNrIG51bGwsIHNoYXJlc1xuICAgICAgZXJyb3I6ICh7fSwgdHlwZSkgLT5cbiAgICAgICAgY2FsbGJhY2sgdHlwZVxuIiwieyBzdHJpbmdpZnkgfSA9IHJlcXVpcmUgJy4uL3F1ZXJ5LXN0cmluZydcblxuXG4jIyNcbkdvb2dsZSvjga7mj5DkvpvjgZnjgovjgrXjg7zjg5PjgrnjgpLliKnnlKjjgZnjgovjgZ/jgoHjga7jgq/jg6njgrnjgafjgZnjgIJcbiMjI1xubW9kdWxlLmV4cG9ydHMgPVxuY2xhc3MgVHdpdHRlclxuXG4gICMjI1xuICDjgqbjgqfjg5bjgrXjgqTjg4jjgpLjgrfjgqfjgqLjgZnjgovngrrjga5VUkzjgpLnlJ/miJDjgZfjgb7jgZnjgIJcbiAgQHBhcmFtIFtTdHJpbmddIHVybCDjgqbjgqfjg5bjgrXjgqTjg4jjga5VUkzjgafjgZnjgIJcbiAgQHJldHVybiBbU3RyaW5nXSDjgrfjgqfjgqLjgZnjgovngrrjga5VUkzjgafjgZnjgIJcbiAgIyMjXG4gIEBjcmVhdGVTaGFyZVVybDogKHVybCkgLT4gXCJodHRwczovL3BsdXMuZ29vZ2xlLmNvbS9zaGFyZT8je3N0cmluZ2lmeSB7dXJsfX1cIlxuXG4gICMjI1xuICDjgqbjgqfjg5bjgrXjgqTjg4jjga7jgrfjgqfjgqLmlbDjgpLlj5blvpfjgZfjgb7jgZnjgIJcbiAgQHBhcmFtIFtTdHJpbmddIHVybCDjgqbjgqfjg5bjgrXjgqTjg4jjga5VUkzjgafjgZnjgIJcbiAgQHBhcmFtIFtGdW5jdGlvbl0gY2FsbGJhY2sg44Kz44O844Or44OQ44OD44Kv44Gn44GZ44CCXG4gICMjI1xuICBAZmV0Y2hTaGFyZUNvdW50OiAodXJsLCBjYWxsYmFjaykgLT5cbiAgICAkXG4gICAgLmFqYXhcbiAgICAgIHVybDogXCJodHRwOi8vcXVlcnkueWFob29hcGlzLmNvbS92MS9wdWJsaWMveXFsP2Vudj1odHRwOi8vZGF0YXRhYmxlcy5vcmcvYWxsdGFibGVzLmVudiZxPSN7ZW5jb2RlVVJJQ29tcG9uZW50IFwiU0VMRUNUIGNvbnRlbnQgRlJPTSBkYXRhLmhlYWRlcnMgV0hFUkUgdXJsPSdodHRwczovL3BsdXNvbmUuZ29vZ2xlLmNvbS9fLysxL2Zhc3RidXR0b24/aGw9amEmdXJsPSN7dXJsfScgYW5kIHVhPScje3VhfSdcIn1cIlxuICAgICAgdHlwZTogJ2dldCdcbiAgICAgIGNhY2hlOiBmYWxzZVxuICAgICAgZGF0YVR5cGU6ICd4bWwnXG4gICAgICBlcnJvcjogKHt9LCB0eXBlKSAtPlxuICAgICAgICBjYWxsYmFjayB0eXBlXG4gICAgICBzdWNjZXNzOiAoZG9jdW1lbnQpIC0+XG4gICAgICAgIHN0ciA9ICQoZG9jdW1lbnQpLmZpbmQoJ2NvbnRlbnQnKS50ZXh0KCkubWF0Y2goLzxzY3JpcHQgdHlwZT1cInRleHRcXC9qYXZhc2NyaXB0XCI+d2luZG93XFwuX19TU1IgPSAoW1xcc1xcU10qPyk7LylbMV1cbiAgICAgICAgc3RyID0gc3RyLnJlcGxhY2UgL1xccj9cXG4vZywgJydcbiAgICAgICAgb2JqID0gbnVsbFxuICAgICAgICBldmFsIFwib2JqID0gI3tzdHJ9O1wiXG4gICAgICAgIGNvdW50ID0gb2JqLmxkWzFdWzRdXG5cbiAgICAgICAgdW5sZXNzIGNvdW50P1xuICAgICAgICAgIGNhbGxiYWNrICdubyBkYXRhJ1xuICAgICAgICAgIHJldHVyblxuICAgICAgICBjYWxsYmFjayBudWxsLCBwYXJzZUludCBjb3VudCwgMTBcbiIsIiMjI1xuSGF0ZW5h44Gu5o+Q5L6b44GZ44KL44K144O844OT44K544KS5Yip55So44GZ44KL44Gf44KB44Gu44Kv44Op44K544Gn44GZ44CCXG4jIyNcbm1vZHVsZS5leHBvcnRzID1cbmNsYXNzIEhhdGVuYVxuXG4gICMjI1xuICDjgqbjgqfjg5bjgrXjgqTjg4jjgpLjg5bjg4Pjgq/jg57jg7zjgq/jgZnjgovngrrjga5VUkzjgpLnlJ/miJDjgZfjgb7jgZnjgIJcbiAgQHBhcmFtIFtTdHJpbmddIHVybCDjgqbjgqfjg5bjgrXjgqTjg4jjga5VUkzjgafjgZnjgIJcbiAgQHJldHVybiBbU3RyaW5nXSDjg5bjg4Pjgq/jg57jg7zjgq/jgZnjgovngrrjga5VUkzjgafjgZnjgIJcbiAgIyMjXG4gIEBjcmVhdGVCb29rbWFya1VybDogKHVybCkgLT5cbiAgICAjIERvbid0IGVuY29kZSB1cmwuXG4gICAgXCJodHRwOi8vYi5oYXRlbmEubmUuanAvZW50cnkvYWRkLyN7dXJsfVwiXG4iLCJ7IHN0cmluZ2lmeSB9ID0gcmVxdWlyZSAnLi4vcXVlcnktc3RyaW5nJ1xueyBtb2JpbGUgfSA9IHJlcXVpcmUgJy4uLy4uL21vZGVscy9vcydcblxuXG4jIyNcbkxpbmXjga7mj5DkvpvjgZnjgovjgrXjg7zjg5PjgrnjgpLliKnnlKjjgZnjgovjgZ/jgoHjga7jgq/jg6njgrnjgafjgZnjgIJcbiMjI1xubW9kdWxlLmV4cG9ydHMgPVxuY2xhc3MgTGluZVxuXG4gICMjI1xuICDjg4bjgq3jgrnjg4jjgpLjg4Hjg6Pjg4Pjg4jjgZnjgovngrrjga5VUkzjgpLnlJ/miJDjgZfjgb7jgZnjgIJcbiAgQHBhcmFtIFtTdHJpbmddIHRleHQg44OG44Kt44K544OI44Gn44GZ44CCXG4gIEByZXR1cm4gW1N0cmluZ10g44OB44Oj44OD44OI44GZ44KL54K644GuVVJM44Gn44GZ44CCXG4gICMjI1xuICBAY3JlYXRlQ2hhdFVybDogKHRleHQpIC0+XG4gICAgdGV4dCA9IGVuY29kZVVSSUNvbXBvbmVudCB0ZXh0XG4gICAgaWYgbW9iaWxlXG4gICAgICBcImxpbmU6Ly9tc2cvdGV4dC8je3RleHR9XCJcbiAgICBlbHNlXG4gICAgICBcImh0dHA6Ly9saW5lLm5hdmVyLmpwL1IvbXNnL3RleHQvPyN7dGV4dH1cIlxuIiwieyBzdHJpbmdpZnkgfSA9IHJlcXVpcmUgJy4uL3F1ZXJ5LXN0cmluZydcblxuXG4jIyNcblBpbnRlcmVzdOOBruaPkOS+m+OBmeOCi+OCteODvOODk+OCueOCkuWIqeeUqOOBmeOCi+OBn+OCgeOBruOCr+ODqeOCueOBp+OBmeOAglxuIyMjXG5tb2R1bGUuZXhwb3J0cyA9XG5jbGFzcyBQaW50ZXJlc3RcblxuICAjIyNcbiAg44Km44Kn44OW44K144Kk44OI44KS44OU44Oz44GZ44KL54K644GuVVJM44KS55Sf5oiQ44GX44G+44GZ44CCXG4gIEBwYXJhbSBbT2JqZWN0XSBvcHRpb25zIOOCquODl+OCt+ODp+ODs+OBp+OBmeOAglxuICBAb3B0aW9uIG9wdGlvbnMgW1N0cmluZ10gdXJsIOOCpuOCp+ODluOCteOCpOODiOOBrlVSTOOBp+OBmeOAglxuICBAb3B0aW9uIG9wdGlvbnMgW1N0cmluZ10gbWVkaWEg55S75YOP562J44Gu44Oh44OH44Kj44Ki44GuVVJM44Gn44GZ44CCXG4gIEBvcHRpb24gb3B0aW9ucyBbU3RyaW5nXSBkZXNjcmlwdGlvbiDoqqzmmI7mlofjgafjgZnjgIJcbiAgQHJldHVybiBbU3RyaW5nXSDjgrfjgqfjgqLjgZnjgovngrrjga5VUkzjgafjgZnjgIJcbiAgIyMjXG4gIEBjcmVhdGVQaW5JdFVybDogKG9wdGlvbnMpIC0+XG4gICAgXCJodHRwOi8vd3d3LnBpbnRlcmVzdC5jb20vcGluL2NyZWF0ZS9idXR0b24vPyN7c3RyaW5naWZ5IG9wdGlvbnN9XCJcbiIsInsgc3RyaW5naWZ5IH0gPSByZXF1aXJlICcuLi9xdWVyeS1zdHJpbmcnXG5cblxuIyMjXG5Ud2l0dGVy44Gu5o+Q5L6b44GZ44KL44K144O844OT44K544KS5Yip55So44GZ44KL44Gf44KB44Gu44Kv44Op44K544Gn44GZ44CCXG4jIyNcbm1vZHVsZS5leHBvcnRzID1cbmNsYXNzIFR3aXR0ZXJcblxuICAjIyNcbiAg44Km44Kn44OW44K144Kk44OI44KS44OE44Kk44O844OI44GZ44KL54K644GuVVJM44KS55Sf5oiQ44GX44G+44GZ44CCXG4gIEBwYXJhbSBbT2JqZWN0XSBvcHRpb25zIOOCquODl+OCt+ODp+ODs+OBp+OBmeOAglxuICBAb3B0aW9uIG9wdGlvbnMgW1N0cmluZ10gdGV4dCDoqqzmmI7mlofjgafjgZnjgIJcbiAgQG9wdGlvbiBvcHRpb25zIFtTdHJpbmddIHVybCDjgqbjgqfjg5bjgrXjgqTjg4jjga5VUkzjgafjgZnjgIJcbiAgQG9wdGlvbiBvcHRpb25zIFtTdHJpbmddIGhhc2h0YWdzIOODj+ODg+OCt+ODpeOCv+OCsOOBp+OBmeOAglxuICBAcmV0dXJuIFtTdHJpbmddIOODhOOCpOODvOODiOOBmeOCi+eCuuOBrlVSTOOBp+OBmeOAglxuICAjIyNcbiAgQGNyZWF0ZVR3ZWV0VXJsOiAoe3RleHQsIHVybCwgaGFzaHRhZ3N9KSAtPlxuICAgIFwiaHR0cDovL3R3aXR0ZXIuY29tL3NoYXJlPyN7c3RyaW5naWZ5IHt0ZXh0LCB1cmwsIGhhc2h0YWdzfX1cIlxuXG4gICMjI1xuICDjgqbjgqfjg5bjgrXjgqTjg4jjga7jg4TjgqTjg7zjg4jmlbDjgpLlj5blvpfjgZfjgb7jgZnjgIJcbiAgQHBhcmFtIFtTdHJpbmddIHVybCDjgqbjgqfjg5bjgrXjgqTjg4jjga5VUkzjgafjgZnjgIJcbiAgQHBhcmFtIFtGdW5jdGlvbl0gY2FsbGJhY2sg44Kz44O844Or44OQ44OD44Kv44Gn44GZ44CCXG4gICMjI1xuICBAZmV0Y2hUd2VldENvdW50OiAodXJsLCBjYWxsYmFjaykgLT5cbiAgICAkXG4gICAgLmFqYXhcbiAgICAgIHVybDogJ2h0dHA6Ly91cmxzLmFwaS50d2l0dGVyLmNvbS8xL3VybHMvY291bnQuanNvbidcbiAgICAgIHR5cGU6ICdnZXQnXG4gICAgICBjYWNoZTogZmFsc2VcbiAgICAgIGRhdGE6IHVybDogdXJsXG4gICAgICBkYXRhVHlwZTogJ2pzb25wJ1xuICAgICAgZXJyb3I6ICh7fSwgdHlwZSkgLT5cbiAgICAgICAgY2FsbGJhY2sgdHlwZVxuICAgICAgc3VjY2VzczogKHsgY291bnQgfSkgLT5cbiAgICAgICAgdW5sZXNzIGNvdW50P1xuICAgICAgICAgIGNhbGxiYWNrICdubyBkYXRhJ1xuICAgICAgICAgIHJldHVyblxuICAgICAgICBjYWxsYmFjayBudWxsLCBjb3VudFxuIiwie2V4cGVjdH0gPSBjaGFpXG5mYWN0b3J5ID0gcmVxdWlyZSAnLi4vbW9kZWxzL2lvdGEnXG5cbmRlc2NyaWJlICdJb3RhJywgLT5cbiAgZGVzY3JpYmUgJy4nLCAtPlxuICAgIGRlc2NyaWJlICdmYWN0b3J5JywgLT5cbiAgICAgIGl0ICdzaG91bGQgY3JlYXRlIG5ldyBJb3RhIG1ldGhvZCcsIC0+XG4gICAgICAgIGV4cGVjdChmYWN0b3J5KCkpLnRvLm5vdC5lcXVhbCBmYWN0b3J5KClcblxuICAgICAgZGVzY3JpYmUgJ2lvdGEnLCAtPlxuICAgICAgICBpdCAnc2hvdWxkIHJldHVybiBpbmNyZW1lbnRlZCBpbnQnLCAtPlxuICAgICAgICAgIGlvdGEgPSBmYWN0b3J5KClcbiAgICAgICAgICBleHBlY3QoaW90YSgpKS5lcXVhbCAwXG4gICAgICAgICAgZXhwZWN0KGlvdGEoKSkuZXF1YWwgMVxuICAgICAgICAgIGV4cGVjdChpb3RhKCkpLmVxdWFsIDJcbiAgICAgICAgICBleHBlY3QoaW90YSgpKS5lcXVhbCAzXG4gICAgICAgICAgZXhwZWN0KGlvdGEoKSkuZXF1YWwgNFxuICAgICAgICAgIGlvdGEgPSBmYWN0b3J5KClcbiAgICAgICAgICBleHBlY3QoaW90YSgpKS5lcXVhbCAwXG4gICAgICAgICAgZXhwZWN0KGlvdGEoKSkuZXF1YWwgMVxuICAgICAgICAgIGV4cGVjdChpb3RhKCkpLmVxdWFsIDJcbiAgICAgICAgICBleHBlY3QoaW90YSgpKS5lcXVhbCAzXG4gICAgICAgICAgZXhwZWN0KGlvdGEoKSkuZXF1YWwgNFxuIiwie2V4cGVjdH0gPSBjaGFpXG5Qb2ludCA9IHJlcXVpcmUgJy4uL21vZGVscy9wb2ludCdcblxuZGVzY3JpYmUgJ1BvaW50JywgLT5cbiAgZGVzY3JpYmUgJ2NvbnN0cnVjdG9yJywgLT5cbiAgICBpdCAnc2hvdWxkIGNyZWF0ZSB6ZXJvIHBvaW50IHdpdGhvdXQgbm8gcGFyYW1ldGVyJywgLT5cbiAgICAgIHt4LCB5fSA9IG5ldyBQb2ludFxuICAgICAgZXhwZWN0KHgpLmVxdWFscyAwXG4gICAgICBleHBlY3QoeSkuZXF1YWxzIDBcbiAgICBpdCAnc2hvdWxkIGNyZWF0ZSBwb2ludCB3aXRoIDIgbnVtYmVycycsIC0+XG4gICAgICB7eCwgeX0gPSBuZXcgUG9pbnQgNSwgOFxuICAgICAgZXhwZWN0KHgpLmVxdWFscyA1XG4gICAgICBleHBlY3QoeSkuZXF1YWxzIDhcbiAgICBpdCAnc2hvdWxkIGNyZWF0ZSBwb2ludCB3aXRoIDEgYXJyYXknLCAtPlxuICAgICAge3gsIHl9ID0gbmV3IFBvaW50IFs1LCA4XVxuICAgICAgZXhwZWN0KHgpLmVxdWFscyA1XG4gICAgICBleHBlY3QoeSkuZXF1YWxzIDhcbiAgICBpdCAnc2hvdWxkIGNyZWF0ZSBwb2ludCB3aXRoIDEgb2JqZWN0JywgLT5cbiAgICAgIHt4LCB5fSA9IG5ldyBQb2ludCB7eDogNSwgeTogOH1cbiAgICAgIGV4cGVjdCh4KS5lcXVhbHMgNVxuICAgICAgZXhwZWN0KHkpLmVxdWFscyA4XG4gICAgaXQgJ3Nob3VsZCBjcmVhdGUgcG9pbnQgd2l0aCAxIFBvaW50JywgLT5cbiAgICAgIHt4LCB5fSA9IG5ldyBQb2ludCBuZXcgUG9pbnQgNSwgOFxuICAgICAgZXhwZWN0KHgpLmVxdWFscyA1XG4gICAgICBleHBlY3QoeSkuZXF1YWxzIDhcbiIsInNucyA9IHJlcXVpcmUgJy4uL21vZGVscy9zbnMvZmFjZWJvb2snXG5nb29nbGVQbHVzID0gcmVxdWlyZSAnLi4vbW9kZWxzL3Nucy9nb29nbGUtcGx1cydcbmhhdGVuYSA9IHJlcXVpcmUgJy4uL21vZGVscy9zbnMvaGF0ZW5hJ1xubGluZSA9IHJlcXVpcmUgJy4uL21vZGVscy9zbnMvbGluZSdcbnBpbnRlcmVzdCA9IHJlcXVpcmUgJy4uL21vZGVscy9zbnMvcGludGVyZXN0J1xudHdpdHRlciA9IHJlcXVpcmUgJy4uL21vZGVscy9zbnMvdHdpdHRlcidcbiJdfQ==
