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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9taW5vZGlzay93b3Jrc3BhY2UvZ2l0aHViL3RyeW1vcmUvcGVuY2lsL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbWlub2Rpc2svd29ya3NwYWNlL2dpdGh1Yi90cnltb3JlL3BlbmNpbC90ZXN0L3J1bm5lci90ZXN0LmNvZmZlZSIsIi9Vc2Vycy9taW5vZGlzay93b3Jrc3BhY2UvZ2l0aHViL3RyeW1vcmUvcGVuY2lsL21vZGVscy9pb3RhLmNvZmZlZSIsIi9Vc2Vycy9taW5vZGlzay93b3Jrc3BhY2UvZ2l0aHViL3RyeW1vcmUvcGVuY2lsL21vZGVscy9vcy5jb2ZmZWUiLCIvVXNlcnMvbWlub2Rpc2svd29ya3NwYWNlL2dpdGh1Yi90cnltb3JlL3BlbmNpbC9tb2RlbHMvcG9pbnQuY29mZmVlIiwiL1VzZXJzL21pbm9kaXNrL3dvcmtzcGFjZS9naXRodWIvdHJ5bW9yZS9wZW5jaWwvbW9kZWxzL3F1ZXJ5LXN0cmluZy5jb2ZmZWUiLCIvVXNlcnMvbWlub2Rpc2svd29ya3NwYWNlL2dpdGh1Yi90cnltb3JlL3BlbmNpbC9tb2RlbHMvc25zL2ZhY2Vib29rLmNvZmZlZSIsIi9Vc2Vycy9taW5vZGlzay93b3Jrc3BhY2UvZ2l0aHViL3RyeW1vcmUvcGVuY2lsL21vZGVscy9zbnMvZ29vZ2xlLXBsdXMuY29mZmVlIiwiL1VzZXJzL21pbm9kaXNrL3dvcmtzcGFjZS9naXRodWIvdHJ5bW9yZS9wZW5jaWwvbW9kZWxzL3Nucy9oYXRlbmEuY29mZmVlIiwiL1VzZXJzL21pbm9kaXNrL3dvcmtzcGFjZS9naXRodWIvdHJ5bW9yZS9wZW5jaWwvbW9kZWxzL3Nucy9saW5lLmNvZmZlZSIsIi9Vc2Vycy9taW5vZGlzay93b3Jrc3BhY2UvZ2l0aHViL3RyeW1vcmUvcGVuY2lsL21vZGVscy9zbnMvcGludGVyZXN0LmNvZmZlZSIsIi9Vc2Vycy9taW5vZGlzay93b3Jrc3BhY2UvZ2l0aHViL3RyeW1vcmUvcGVuY2lsL21vZGVscy9zbnMvdHdpdHRlci5jb2ZmZWUiLCIvVXNlcnMvbWlub2Rpc2svd29ya3NwYWNlL2dpdGh1Yi90cnltb3JlL3BlbmNpbC90ZXN0L2lvdGEuY29mZmVlIiwiL1VzZXJzL21pbm9kaXNrL3dvcmtzcGFjZS9naXRodWIvdHJ5bW9yZS9wZW5jaWwvdGVzdC9wb2ludC5jb2ZmZWUiLCIvVXNlcnMvbWlub2Rpc2svd29ya3NwYWNlL2dpdGh1Yi90cnltb3JlL3BlbmNpbC90ZXN0L3Nucy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxPQUFBLENBQVEsU0FBUixDQUFBLENBQUE7O0FBQUEsT0FDQSxDQUFRLFVBQVIsQ0FEQSxDQUFBOztBQUFBLE9BRUEsQ0FBUSxRQUFSLENBRkEsQ0FBQTs7Ozs7QUNBQTtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FBQTtBQUFBLElBQUEsSUFBQTs7QUFBQTtvQkFxQkU7O0FBQUE7QUFBQTs7S0FBQTs7QUFBQSxFQUdBLElBQUMsQ0FBQSxPQUFELEdBQVUsU0FBQSxHQUFBO0FBQ1IsUUFBQSxLQUFBO0FBQUEsSUFBQSxLQUFBLEdBQVEsQ0FBUixDQUFBO1dBQ0EsU0FBQSxHQUFBO2FBQUcsS0FBQSxHQUFIO0lBQUEsRUFGUTtFQUFBLENBSFYsQ0FBQTs7Y0FBQTs7SUFyQkYsQ0FBQTs7QUFBQSxNQTRCTSxDQUFDLE9BQVAsR0FBaUIsSUFBSSxDQUFDLE9BNUJ0QixDQUFBOzs7OztBQ0FBO0FBQUE7O0dBQUE7QUFBQSxJQUFBLHNHQUFBOztBQUFBLEVBSUEsR0FBSyxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxXQUEzQixDQUFBLENBSkwsQ0FBQTs7QUFBQSxTQUtBLEdBQVksK0JBTFosQ0FBQTs7QUFBQSxPQU1BLEdBQVUsNkJBTlYsQ0FBQTs7QUFBQSxPQU9BLEdBQVUsNkJBUFYsQ0FBQTs7QUFBQSxTQVFBLEdBQVksK0JBUlosQ0FBQTs7QUFBQSxLQVNBLEdBQVEsaUNBVFIsQ0FB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QVMsQ0FBQyxNQUFWLENBQWlCLENBQWpCLENBREEsQ0FBQTthQUVBLE1BQUEsQ0FBTyxDQUFQLENBQVMsQ0FBQyxNQUFWLENBQWlCLENBQWpCLEVBSHNDO0lBQUEsQ0FBeEMsQ0FaQSxDQUFBO1dBZ0JBLEVBQUEsQ0FBRyxrQ0FBSCxFQUF1QyxTQUFBLEdBQUE7QUFDckMsVUFBQSxVQUFBO0FBQUEsTUFBQSxPQUFhLElBQUEsS0FBQSxDQUFVLElBQUEsS0FBQSxDQUFNLENBQU4sRUFBUyxDQUFULENBQVYsQ0FBYixFQUFDLFNBQUEsQ0FBRCxFQUFJLFNBQUEsQ0FBSixDQUFBO0FBQUEsTUFDQSxNQUFBLENBQU8sQ0FBUCxDQUFTLENBQUMsTUFBVixDQUFpQixDQUFqQixDQURBLENBQUE7YUFFQSxNQUFBLENBQU8sQ0FBUCxDQUFTLENBQUMsTUFBVixDQUFpQixDQUFqQixFQUhxQztJQUFBLENBQXZDLEVBakJzQjtFQUFBLENBQXhCLEVBRGdCO0FBQUEsQ0FBbEIsQ0FIQSxDQUFBOzs7OztBQ0FBLElBQUEsaURBQUE7O0FBQUEsR0FBQSxHQUFNLE9BQUEsQ0FBUSx3QkFBUixDQUFOLENBQUE7O0FBQUEsVUFDQSxHQUFhLE9BQUEsQ0FBUSwyQkFBUixDQURiLENBQUE7O0FBQUEsTUFFQSxHQUFTLE9BQUEsQ0FBUSxzQkFBUixDQUZULENBQUE7O0FBQUEsSUFHQSxHQUFPLE9BQUEsQ0FBUSxvQkFBUixDQUhQLENBQUE7O0FBQUEsU0FJQSxHQUFZLE9BQUEsQ0FBUSx5QkFBUixDQUpaLENBQUE7O0FBQUEsT0FLQSxHQUFVLE9BQUEsQ0FBUSx1QkFBUixDQUxWLENBQUEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwicmVxdWlyZSAnLi4vaW90YSdcbnJlcXVpcmUgJy4uL3BvaW50J1xucmVxdWlyZSAnLi4vc25zJ1xuIiwiIyMjXG7kuLvjgavjg5Xjg6njgrDjgpLkvZzjgovpmpvjgavkvb/nlKjjgZnjgovjg6bjg7zjg4bjgqPjg6rjg4bjgqPjgafjgZnjgIJcblxuQGV4YW1wbGUgMTDpgLLmlbDjga7jg5Xjg6njgrDjgpLnlJ/miJDjgZnjgotcbiAgICBpb3RhID0gcmVxdWlyZSgncGVuY2lsL21vZGVscy9pb3RhJykoKVxuICAgIGEgPSBpb3RhKCkgIyAwXG4gICAgYiA9IGlvdGEoKSAjIDFcbiAgICBjID0gaW90YSgpICMgMlxuICAgIGQgPSBpb3RhKCkgIyAzXG4gICAgZSA9IGlvdGEoKSAjIDRcblxuQGV4YW1wbGUgMumAsuaVsOOBruODleODqeOCsOOCkueUn+aIkOOBmeOCi1xuICAgIGlvdGEgPSByZXF1aXJlKCdwZW5jaWwvbW9kZWxzL2lvdGEnKSgpXG4gICAgYSA9IDEgPDwgaW90YSgpICMgMCAoMDAwMClcbiAgICBiID0gMSA8PCBpb3RhKCkgIyAxICgwMDAxKVxuICAgIGMgPSAxIDw8IGlvdGEoKSAjIDIgKDAwMTApXG4gICAgZCA9IDEgPDwgaW90YSgpICMgNCAoMDEwMClcbiAgICBlID0gMSA8PCBpb3RhKCkgIyA4ICgxMDAwKVxuIyMjXG5jbGFzcyBJb3RhXG5cbiAgIyMjXG4gIEByZXR1cm4gRnVuY3Rpb24g44Kz44O844Or44GZ44KL5q+O44GrMOOBi+OCieOCpOODs+OCr+ODquODoeODs+ODiOOBleOCjOOBn+aVtOaVsOOCkui/lOOBmemWouaVsOOCkui/lOOBl+OBvuOBmeOAglxuICAjIyNcbiAgQGZhY3Rvcnk6IC0+XG4gICAgaW5kZXggPSAwXG4gICAgLT4gaW5kZXgrK1xuXG5tb2R1bGUuZXhwb3J0cyA9IElvdGEuZmFjdG9yeVxuIiwiIyMjXG5PUyBwYXJzZXMgdXNlciBhZ2VudCBhbmQgZGV0ZXJtaW5lcyB0aGUgT1MgdHlwZSBhbmQgdmVyc2lvbi5cbiMjI1xuXG5VQSA9IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKClcblJfSV9QSE9ORSA9IC9cXCgoaXBob25lKS4qP29zIChbXFxkX10rKS4qP1xcKS9cblJfSV9QT0QgPSAvXFwoKGlwb2QpLio/b3MgKFtcXGRfXSspLio/XFwpL1xuUl9JX1BBRCA9IC9cXCgoaXBhZCkuKj9vcyAoW1xcZF9dKykuKj9cXCkvXG5SX0FORFJPSUQgPSAvXFwoLio/KGFuZHJvaWQpIChbXFxkXFwuXSspLio/XFwpL1xuUl9NQUMgPSAvXFwoLio/KG1hYykgb3MgeCAoW1xcZF9cXC5dKykuKj9cXCkvXG5SX0xJTlVYID0gL1xcKC4qPyhsaW51eCkgKFxcdyspdlxcKS9cblJfV0lORE9XUyA9IC9cXCguKj8od2luZG93cykgKFxcdyspLio/XFwpL1xuXG5bIHt9LCBuYW1lLCB2ZXJzaW9uIF0gPSBSX0lfUEhPTkUuZXhlYyhVQSkgb3JcbiAgICAgICAgICAgICAgICAgICAgICAgIFJfSV9QT0QuZXhlYyhVQSkgb3JcbiAgICAgICAgICAgICAgICAgICAgICAgIFJfSV9QQUQuZXhlYyhVQSkgb3JcbiAgICAgICAgICAgICAgICAgICAgICAgIFJfQU5EUk9JRC5leGVjKFVBKSBvclxuICAgICAgICAgICAgICAgICAgICAgICAgUl9NQUMuZXhlYyhVQSkgb3JcbiAgICAgICAgICAgICAgICAgICAgICAgIFJfV0lORE9XUy5leGVjKFVBKSBvclxuICAgICAgICAgICAgICAgICAgICAgICAgUl9MSU5VWC5leGVjKFVBKSBvclxuICAgICAgICAgICAgICAgICAgICAgICAgW11cblxub3MgPSB7fVxuaWYgbmFtZT9cbiAgb3NbbmFtZV0gPSB0cnVlXG4gIG9zLnZlcnNpb24gPSB2ZXJzaW9uLnNwbGl0KCdfJykuam9pbignLicpXG5pZiBvcy5pcGhvbmUgb3Igb3MuaXBvZCBvciBvcy5pcGFkXG4gIG9zLmlvcyA9IHRydWVcbmlmIG9zLmlvcyBvciBvcy5hbmRyb2lkXG4gIG9zLm1vYmlsZSA9IHRydWVcbmlmIG9zLnZlcnNpb24/XG4gIG51bWJlciA9IHBhcnNlSW50IG9zLnZlcnNpb24sIDEwXG4gIHVubGVzcyBpc05hTiBudW1iZXJcbiAgICBvcy52ZXJzaW9uTnVtYmVyID0gbnVtYmVyXG5cbm1vZHVsZS5leHBvcnRzID0gb3NcbiIsIntpc0FycmF5LCBpc09iamVjdH0gPSByZXF1aXJlICdsb2Rhc2gnXG57c3FydH0gPSBNYXRoXG5cblxuIyMjXG7jg53jgqTjg7Pjg4jjgq/jg6njgrnjgafjgZnjgIJcbuS6jOasoeWFg+OBruebtOS6pOW6p+aomeezu+OCkuaJseOBhOOBvuOBmeOAglxuIyMjXG5tb2R1bGUuZXhwb3J0cyA9XG5jbGFzcyBQb2ludFxuXG4gIEBsZXJwOiAocHQxLCBwdDIsIHJhdGlvKSAtPlxuICAgIHZlY3RvciA9IHB0Mi5zdWIgcHQxXG4gICAgcHQxLmFkZCB2ZWN0b3IubXVsIHJhdGlvXG5cbiAgQGRpc3RhbmNlOiAocHQxLCBwdDIpIC0+XG4gICAgcHQyLnN1YihwdDEpLmRpc3RhbmNlKClcblxuICBAcG9zaXRpb25Ub1BvaW50OiAobGVmdCwgdG9wKSAtPlxuICAgIGlmIGxlZnQ/IGFuZCBsZWZ0LmxlZnQ/IGFuZCBsZWZ0LnRvcD9cbiAgICAgIHsgbGVmdCwgdG9wIH0gPSBsZWZ0XG4gICAgbmV3IFBvaW50IGxlZnQsIHRvcFxuXG4gIEBwYXJzZUFyZ3VtZW50czogKGFyZ3MpIC0+XG4gICAgYXJncyA9IHN3aXRjaCBhcmdzLmxlbmd0aFxuICAgICAgd2hlbiAwXG4gICAgICAgIFtdXG4gICAgICB3aGVuIDFcbiAgICAgICAgaWYgaXNBcnJheSBhcmdzWzBdXG4gICAgICAgICAgYXJnc1swXVxuICAgICAgICBlbHNlIGlmIGlzT2JqZWN0IGFyZ3NbMF1cbiAgICAgICAgICBbYXJnc1swXS54LCBhcmdzWzBdLnldXG4gICAgICAgIGVsc2VcbiAgICAgICAgICBbYXJnc1swXV1cbiAgICAgIGVsc2VcbiAgICAgICAgYXJnc1xuICAgIGZvciBpIGluIFswLi4xXVxuICAgICAgYXJnc1tpXSA9IGlmICh2YWwgPSBhcmdzW2ldKT9cbiAgICAgICAgcGFyc2VGbG9hdCB2YWxcbiAgICAgIGVsc2VcbiAgICAgICAgYXJnc1tpXSA9IDBcbiAgICBhcmdzXG5cblxuICAjIyNcbiAgYGxlZnRgLGB0b3Bg44GL44KJ5oiQ44KL44Kq44OW44K444Kn44Kv44OI44GL44KJYFBvaW50YOOCpOODs+OCueOCv+ODs+OCueOCkueUn+aIkOOBl+OBvuOBmeOAglxuICBAcGFyYW0gW09iamVjdF0gcG9zaXRpb24g5bqn5qiZ44Kq44OW44K444Kn44Kv44OI44Gn44GZ44CCXG4gIEBvcHRpb24gcG9zaXRpb24gW0ludGVnZXJdIGxlZnQgeOW6p+aomeOBp+OBmeOAglxuICBAb3B0aW9uIHBvc2l0aW9uIFtJbnRlZ2VyXSB0b3AgeeW6p+aomeOBp+OBmeOAglxuICAjIyNcbiAgQGNyZWF0ZVdpdGhQb3NpdGlvbjogKHsgbGVmdCwgdG9wIH0pIC0+XG4gICAgbmV3IFBvaW50IGxlZnQsIHRvcFxuXG4gICMjI1xuICBgY2xpZW50WGAsYGNsaWVudFlg44GL44KJ5oiQ44KL44Kq44OW44K444Kn44Kv44OI44GL44KJYFBvaW50YOOCpOODs+OCueOCv+ODs+OCueOCkueUn+aIkOOBl+OBvuOBmeOAglxuICBAcGFyYW0gW09iamVjdF0gcG9zaXRpb24g5bqn5qiZ44Kq44OW44K444Kn44Kv44OI44Gn44GZ44CCXG4gIEBvcHRpb24gcG9zaXRpb24gW0ludGVnZXJdIGNsaWVudFggeOW6p+aomeOBp+OBmeOAglxuICBAb3B0aW9uIHBvc2l0aW9uIFtJbnRlZ2VyXSBjbGllbnRZIHnluqfmqJnjgafjgZnjgIJcbiAgIyMjXG4gIEBjcmVhdGVXaXRoQ2xpZW50OiAoeyBjbGllbnRYLCBjbGllbnRZIH0pIC0+XG4gICAgbmV3IFBvaW50IGNsaWVudFgsIGNsaWVudFlcblxuXG4gIGNvbnN0cnVjdG9yOiAoeCwgeSkgLT5cbiAgICBbQHgsIEB5XSA9IFBvaW50LnBhcnNlQXJndW1lbnRzIGFyZ3VtZW50c1xuXG4gICMjI1xuICDopIfoo73jgZfjgb7jgZnjgIJcbiAgQHJldHVybiBbUG9pbnRdIOikh+ijveOBleOCjOOBn2BQb2ludGDjgqTjg7Pjgrnjgr/jg7PjgrnjgafjgZnjgIJcbiAgIyMjXG4gIGNsb25lOiAtPiBuZXcgUG9pbnQgQHgsIEB5XG5cbiAgZGlzdGFuY2U6IC0+XG4gICAgc3FydCBAeCAqIEB4ICsgQHkgKiBAeVxuXG4gIHN1YnRyYWN0OiAoeCwgeSkgLT5cbiAgICBpZiB4PyBhbmQgeC54PyBhbmQgeC55P1xuICAgICAge3gsIHl9ID0geFxuICAgIG5ldyBQb2ludCBAeCAtIHgsIEB5IC0geVxuICBzdWI6IFBvaW50OjpzdWJ0cmFjdFxuXG4gIGFkZDogKHgsIHkpIC0+XG4gICAgaWYgeD8gYW5kIHgueD8gYW5kIHgueT9cbiAgICAgIHt4LCB5fSA9IHhcbiAgICBuZXcgUG9pbnQgQHggKyB4LCBAeSArIHlcblxuICBtdWx0aXBseTogKG4pIC0+XG4gICAgbmV3IFBvaW50IEB4ICogbiwgQHkgKiBuXG4gIG11bDogUG9pbnQ6Om11bHRpcGx5XG4iLCJ7IGlzQXJyYXkgfSA9IHJlcXVpcmUgJ2xvZGFzaCdcblxuXG4jIyNcbuOCr+OCqOODquaWh+Wtl+WIl+OCr+ODqeOCueOBp+OBmeOAglxuIyMjXG5tb2R1bGUuZXhwb3J0cyA9XG5jbGFzcyBRdWVyeVN0cmluZ1xuXG4gIEBzdHJpbmdpZnk6IChvYmosIHNlcCA9ICcmJywgZXEgPSAnPScpIC0+XG4gICAgcXVlcmllcyA9IGZvciBrZXksIHZhbCBvZiBvYmpcbiAgICAgIGlmIGlzQXJyYXkgdmFsXG4gICAgICAgIGZvciB2IGluIHZhbFxuICAgICAgICAgIFwiI3trZXl9I3tlcX0je2VuY29kZVVSSUNvbXBvbmVudCB2ID8gJyd9XCJcbiAgICAgIGVsc2VcbiAgICAgICAgXCIje2tleX0je2VxfSN7ZW5jb2RlVVJJQ29tcG9uZW50IHZhbCA/ICcnfVwiXG4gICAgcXVlcmllcy5qb2luIHNlcFxuXG4gIEBwYXJzZTogKHN0ciwgc2VwID0gJyYnLCBlcSA9ICc9Jywgb3B0cykgLT5cbiAgICBvcHRzID0gYXNzaWduIG9wdHMsIG1heEtleXM6IDEwMDBcbiAgICB7bWF4S2V5c30gPSBvcHRzXG4gICAgb2JqID0ge31cbiAgICBmb3Iga3YsIGkgaW4gc3RyLnNwbGl0IHNlcCB3aGVuIG1heEtleXMgaXMgMCBvciBpIDwgbWF4S2V5c1xuICAgICAgW2tleSwgdmFsXSA9IGt2LnNwbGl0IGVxXG4gICAgICBpZiBvYmpba2V5XT9cbiAgICAgICAgaWYgaXNBcnJheSBvYmpba2V5XVxuICAgICAgICAgIG9ialtrZXldLnB1c2ggdmFsXG4gICAgICAgIGVsc2VcbiAgICAgICAgICB0bXAgPSBvYmpba2V5XVxuICAgICAgICAgIG9ialtrZXldID0gW3RtcCwgdmFsXVxuICAgICAgZWxzZVxuICAgICAgICBvYmpba2V5XSA9IHZhbFxuICAgIG9ialxuIiwieyBzdHJpbmdpZnkgfSA9IHJlcXVpcmUgJy4uL3F1ZXJ5LXN0cmluZydcblxuXG4jIyNcbkZhY2Vib29r44Gu5o+Q5L6b44GZ44KL44K144O844OT44K544KS5Yip55So44GZ44KL44Gf44KB44Gu44Kv44Op44K544Gn44GZ44CCXG4jIyNcbm1vZHVsZS5leHBvcnRzID1cbmNsYXNzIEZhY2Vib29rXG5cbiAgIyMjXG4gIOOCpuOCp+ODluOCteOCpOODiOOCkuOCt+OCp+OCouOBmeOCi+eCuuOBrlVSTOOCkueUn+aIkOOBl+OBvuOBmeOAglxuICBAcGFyYW0gW1N0cmluZ10gdXJsIOOCpuOCp+ODluOCteOCpOODiOOBrlVSTOOBp+OBmeOAglxuICBAcmV0dXJuIFtTdHJpbmddIOOCt+OCp+OCouOBmeOCi+eCuuOBrlVSTOOBp+OBmeOAglxuICAjIyNcbiAgQGNyZWF0ZVNoYXJlVXJsOiAodXJsKSAtPiBcImh0dHA6Ly93d3cuZmFjZWJvb2suY29tL3NoYXJlLnBocD8je3N0cmluZ2lmeSB1OiB1cmx9XCJcblxuICAjIyNcbiAg44Km44Kn44OW44K144Kk44OI44Gu44K344Kn44Ki5pWw44KS5Y+W5b6X44GX44G+44GZ44CCXG4gIEBwYXJhbSBbU3RyaW5nXSB1cmwg44Km44Kn44OW44K144Kk44OI44GuVVJM44Gn44GZ44CCXG4gIEBwYXJhbSBbRnVuY3Rpb25dIGNhbGxiYWNrIOOCs+ODvOODq+ODkOODg+OCr+OBp+OBmeOAglxuXG4gIEBleGFtcGxlIOOCpuOCp+ODluOCteOCpOODiOOBruOCt+OCp+OCouaVsOOCkuWPluW+l+OCkmFsZXJ044GX44G+44GZ44CCXG4gICAgICBGYWNlYm9vay5mZXRjaENvdW50ICdodHRwOi8vZXhhbXBsZS5jb20nLCAoZXJyLCBzaGFyZXMpIC0+XG4gICAgICAgIHRocm93IGVyciBpZiBlcnI/XG4gICAgICAgIGFsZXJ0IHNoYXJlc1xuICAjIyNcbiAgQGZldGNoU2hhcmVDb3VudDogKHVybCwgY2FsbGJhY2spIC0+XG4gICAgJFxuICAgIC5hamF4XG4gICAgICB1cmw6ICdodHRwczovL2dyYXBoLmZhY2Vib29rLmNvbS8nXG4gICAgICB0eXBlOiAnZ2V0J1xuICAgICAgY2FjaGU6IGZhbHNlXG4gICAgICBkYXRhOlxuICAgICAgICB1cmw6IHVybFxuICAgICAgZGF0YVR5cGU6ICdqc29ucCdcbiAgICAgIHN1Y2Nlc3M6ICh7IHNoYXJlcyB9KSAtPlxuICAgICAgICB1bmxlc3Mgc2hhcmVzP1xuICAgICAgICAgIGNhbGxiYWNrICdubyBkYXRhJ1xuICAgICAgICAgIHJldHVyblxuICAgICAgICBjYWxsYmFjayBudWxsLCBzaGFyZXNcbiAgICAgIGVycm9yOiAoe30sIHR5cGUpIC0+XG4gICAgICAgIGNhbGxiYWNrIHR5cGVcbiIsInsgc3RyaW5naWZ5IH0gPSByZXF1aXJlICcuLi9xdWVyeS1zdHJpbmcnXG5cblxuIyMjXG5Hb29nbGUr44Gu5o+Q5L6b44GZ44KL44K144O844OT44K544KS5Yip55So44GZ44KL44Gf44KB44Gu44Kv44Op44K544Gn44GZ44CCXG4jIyNcbm1vZHVsZS5leHBvcnRzID1cbmNsYXNzIFR3aXR0ZXJcblxuICAjIyNcbiAg44Km44Kn44OW44K144Kk44OI44KS44K344Kn44Ki44GZ44KL54K644GuVVJM44KS55Sf5oiQ44GX44G+44GZ44CCXG4gIEBwYXJhbSBbU3RyaW5nXSB1cmwg44Km44Kn44OW44K144Kk44OI44GuVVJM44Gn44GZ44CCXG4gIEByZXR1cm4gW1N0cmluZ10g44K344Kn44Ki44GZ44KL54K644GuVVJM44Gn44GZ44CCXG4gICMjI1xuICBAY3JlYXRlU2hhcmVVcmw6ICh1cmwpIC0+IFwiaHR0cHM6Ly9wbHVzLmdvb2dsZS5jb20vc2hhcmU/I3tzdHJpbmdpZnkge3VybH19XCJcblxuICAjIyNcbiAg44Km44Kn44OW44K144Kk44OI44Gu44K344Kn44Ki5pWw44KS5Y+W5b6X44GX44G+44GZ44CCXG4gIEBwYXJhbSBbU3RyaW5nXSB1cmwg44Km44Kn44OW44K144Kk44OI44GuVVJM44Gn44GZ44CCXG4gIEBwYXJhbSBbRnVuY3Rpb25dIGNhbGxiYWNrIOOCs+ODvOODq+ODkOODg+OCr+OBp+OBmeOAglxuICAjIyNcbiAgQGZldGNoU2hhcmVDb3VudDogKHVybCwgY2FsbGJhY2spIC0+XG4gICAgJFxuICAgIC5hamF4XG4gICAgICB1cmw6IFwiaHR0cDovL3F1ZXJ5LnlhaG9vYXBpcy5jb20vdjEvcHVibGljL3lxbD9lbnY9aHR0cDovL2RhdGF0YWJsZXMub3JnL2FsbHRhYmxlcy5lbnYmcT0je2VuY29kZVVSSUNvbXBvbmVudCBcIlNFTEVDVCBjb250ZW50IEZST00gZGF0YS5oZWFkZXJzIFdIRVJFIHVybD0naHR0cHM6Ly9wbHVzb25lLmdvb2dsZS5jb20vXy8rMS9mYXN0YnV0dG9uP2hsPWphJnVybD0je3VybH0nIGFuZCB1YT0nI3t1YX0nXCJ9XCJcbiAgICAgIHR5cGU6ICdnZXQnXG4gICAgICBjYWNoZTogZmFsc2VcbiAgICAgIGRhdGFUeXBlOiAneG1sJ1xuICAgICAgZXJyb3I6ICh7fSwgdHlwZSkgLT5cbiAgICAgICAgY2FsbGJhY2sgdHlwZVxuICAgICAgc3VjY2VzczogKGRvY3VtZW50KSAtPlxuICAgICAgICBzdHIgPSAkKGRvY3VtZW50KS5maW5kKCdjb250ZW50JykudGV4dCgpLm1hdGNoKC88c2NyaXB0IHR5cGU9XCJ0ZXh0XFwvamF2YXNjcmlwdFwiPndpbmRvd1xcLl9fU1NSID0gKFtcXHNcXFNdKj8pOy8pWzFdXG4gICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlIC9cXHI/XFxuL2csICcnXG4gICAgICAgIG9iaiA9IG51bGxcbiAgICAgICAgZXZhbCBcIm9iaiA9ICN7c3RyfTtcIlxuICAgICAgICBjb3VudCA9IG9iai5sZFsxXVs0XVxuXG4gICAgICAgIHVubGVzcyBjb3VudD9cbiAgICAgICAgICBjYWxsYmFjayAnbm8gZGF0YSdcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgY2FsbGJhY2sgbnVsbCwgcGFyc2VJbnQgY291bnQsIDEwXG4iLCIjIyNcbkhhdGVuYeOBruaPkOS+m+OBmeOCi+OCteODvOODk+OCueOCkuWIqeeUqOOBmeOCi+OBn+OCgeOBruOCr+ODqeOCueOBp+OBmeOAglxuIyMjXG5tb2R1bGUuZXhwb3J0cyA9XG5jbGFzcyBIYXRlbmFcblxuICAjIyNcbiAg44Km44Kn44OW44K144Kk44OI44KS44OW44OD44Kv44Oe44O844Kv44GZ44KL54K644GuVVJM44KS55Sf5oiQ44GX44G+44GZ44CCXG4gIEBwYXJhbSBbU3RyaW5nXSB1cmwg44Km44Kn44OW44K144Kk44OI44GuVVJM44Gn44GZ44CCXG4gIEByZXR1cm4gW1N0cmluZ10g44OW44OD44Kv44Oe44O844Kv44GZ44KL54K644GuVVJM44Gn44GZ44CCXG4gICMjI1xuICBAY3JlYXRlQm9va21hcmtVcmw6ICh1cmwpIC0+XG4gICAgIyBEb24ndCBlbmNvZGUgdXJsLlxuICAgIFwiaHR0cDovL2IuaGF0ZW5hLm5lLmpwL2VudHJ5L2FkZC8je3VybH1cIlxuIiwieyBzdHJpbmdpZnkgfSA9IHJlcXVpcmUgJy4uL3F1ZXJ5LXN0cmluZydcbnsgbW9iaWxlIH0gPSByZXF1aXJlICcuLi8uLi9tb2RlbHMvb3MnXG5cblxuIyMjXG5MaW5l44Gu5o+Q5L6b44GZ44KL44K144O844OT44K544KS5Yip55So44GZ44KL44Gf44KB44Gu44Kv44Op44K544Gn44GZ44CCXG4jIyNcbm1vZHVsZS5leHBvcnRzID1cbmNsYXNzIExpbmVcblxuICAjIyNcbiAg44OG44Kt44K544OI44KS44OB44Oj44OD44OI44GZ44KL54K644GuVVJM44KS55Sf5oiQ44GX44G+44GZ44CCXG4gIEBwYXJhbSBbU3RyaW5nXSB0ZXh0IOODhuOCreOCueODiOOBp+OBmeOAglxuICBAcmV0dXJuIFtTdHJpbmddIOODgeODo+ODg+ODiOOBmeOCi+eCuuOBrlVSTOOBp+OBmeOAglxuICAjIyNcbiAgQGNyZWF0ZUNoYXRVcmw6ICh0ZXh0KSAtPlxuICAgIHRleHQgPSBlbmNvZGVVUklDb21wb25lbnQgdGV4dFxuICAgIGlmIG1vYmlsZVxuICAgICAgXCJsaW5lOi8vbXNnL3RleHQvI3t0ZXh0fVwiXG4gICAgZWxzZVxuICAgICAgXCJodHRwOi8vbGluZS5uYXZlci5qcC9SL21zZy90ZXh0Lz8je3RleHR9XCJcbiIsInsgc3RyaW5naWZ5IH0gPSByZXF1aXJlICcuLi9xdWVyeS1zdHJpbmcnXG5cblxuIyMjXG5QaW50ZXJlc3Tjga7mj5DkvpvjgZnjgovjgrXjg7zjg5PjgrnjgpLliKnnlKjjgZnjgovjgZ/jgoHjga7jgq/jg6njgrnjgafjgZnjgIJcbiMjI1xubW9kdWxlLmV4cG9ydHMgPVxuY2xhc3MgUGludGVyZXN0XG5cbiAgIyMjXG4gIOOCpuOCp+ODluOCteOCpOODiOOCkuODlOODs+OBmeOCi+eCuuOBrlVSTOOCkueUn+aIkOOBl+OBvuOBmeOAglxuICBAcGFyYW0gW09iamVjdF0gb3B0aW9ucyDjgqrjg5fjgrfjg6fjg7PjgafjgZnjgIJcbiAgQG9wdGlvbiBvcHRpb25zIFtTdHJpbmddIHVybCDjgqbjgqfjg5bjgrXjgqTjg4jjga5VUkzjgafjgZnjgIJcbiAgQG9wdGlvbiBvcHRpb25zIFtTdHJpbmddIG1lZGlhIOeUu+WDj+etieOBruODoeODh+OCo+OCouOBrlVSTOOBp+OBmeOAglxuICBAb3B0aW9uIG9wdGlvbnMgW1N0cmluZ10gZGVzY3JpcHRpb24g6Kqs5piO5paH44Gn44GZ44CCXG4gIEByZXR1cm4gW1N0cmluZ10g44K344Kn44Ki44GZ44KL54K644GuVVJM44Gn44GZ44CCXG4gICMjI1xuICBAY3JlYXRlUGluSXRVcmw6IChvcHRpb25zKSAtPlxuICAgIFwiaHR0cDovL3d3dy5waW50ZXJlc3QuY29tL3Bpbi9jcmVhdGUvYnV0dG9uLz8je3N0cmluZ2lmeSBvcHRpb25zfVwiXG4iLCJ7IHN0cmluZ2lmeSB9ID0gcmVxdWlyZSAnLi4vcXVlcnktc3RyaW5nJ1xuXG5cbiMjI1xuVHdpdHRlcuOBruaPkOS+m+OBmeOCi+OCteODvOODk+OCueOCkuWIqeeUqOOBmeOCi+OBn+OCgeOBruOCr+ODqeOCueOBp+OBmeOAglxuIyMjXG5tb2R1bGUuZXhwb3J0cyA9XG5jbGFzcyBUd2l0dGVyXG5cbiAgIyMjXG4gIOOCpuOCp+ODluOCteOCpOODiOOCkuODhOOCpOODvOODiOOBmeOCi+eCuuOBrlVSTOOCkueUn+aIkOOBl+OBvuOBmeOAglxuICBAcGFyYW0gW09iamVjdF0gb3B0aW9ucyDjgqrjg5fjgrfjg6fjg7PjgafjgZnjgIJcbiAgQG9wdGlvbiBvcHRpb25zIFtTdHJpbmddIHRleHQg6Kqs5piO5paH44Gn44GZ44CCXG4gIEBvcHRpb24gb3B0aW9ucyBbU3RyaW5nXSB1cmwg44Km44Kn44OW44K144Kk44OI44GuVVJM44Gn44GZ44CCXG4gIEBvcHRpb24gb3B0aW9ucyBbU3RyaW5nXSBoYXNodGFncyDjg4/jg4Pjgrfjg6Xjgr/jgrDjgafjgZnjgIJcbiAgQHJldHVybiBbU3RyaW5nXSDjg4TjgqTjg7zjg4jjgZnjgovngrrjga5VUkzjgafjgZnjgIJcbiAgIyMjXG4gIEBjcmVhdGVUd2VldFVybDogKHt0ZXh0LCB1cmwsIGhhc2h0YWdzfSkgLT5cbiAgICBcImh0dHA6Ly90d2l0dGVyLmNvbS9zaGFyZT8je3N0cmluZ2lmeSB7dGV4dCwgdXJsLCBoYXNodGFnc319XCJcblxuICAjIyNcbiAg44Km44Kn44OW44K144Kk44OI44Gu44OE44Kk44O844OI5pWw44KS5Y+W5b6X44GX44G+44GZ44CCXG4gIEBwYXJhbSBbU3RyaW5nXSB1cmwg44Km44Kn44OW44K144Kk44OI44GuVVJM44Gn44GZ44CCXG4gIEBwYXJhbSBbRnVuY3Rpb25dIGNhbGxiYWNrIOOCs+ODvOODq+ODkOODg+OCr+OBp+OBmeOAglxuICAjIyNcbiAgQGZldGNoVHdlZXRDb3VudDogKHVybCwgY2FsbGJhY2spIC0+XG4gICAgJFxuICAgIC5hamF4XG4gICAgICB1cmw6ICdodHRwOi8vdXJscy5hcGkudHdpdHRlci5jb20vMS91cmxzL2NvdW50Lmpzb24nXG4gICAgICB0eXBlOiAnZ2V0J1xuICAgICAgY2FjaGU6IGZhbHNlXG4gICAgICBkYXRhOiB1cmw6IHVybFxuICAgICAgZGF0YVR5cGU6ICdqc29ucCdcbiAgICAgIGVycm9yOiAoe30sIHR5cGUpIC0+XG4gICAgICAgIGNhbGxiYWNrIHR5cGVcbiAgICAgIHN1Y2Nlc3M6ICh7IGNvdW50IH0pIC0+XG4gICAgICAgIHVubGVzcyBjb3VudD9cbiAgICAgICAgICBjYWxsYmFjayAnbm8gZGF0YSdcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgY2FsbGJhY2sgbnVsbCwgY291bnRcbiIsIntleHBlY3R9ID0gY2hhaVxuZmFjdG9yeSA9IHJlcXVpcmUgJy4uL21vZGVscy9pb3RhJ1xuXG5kZXNjcmliZSAnSW90YScsIC0+XG4gIGRlc2NyaWJlICcuJywgLT5cbiAgICBkZXNjcmliZSAnZmFjdG9yeScsIC0+XG4gICAgICBpdCAnc2hvdWxkIGNyZWF0ZSBuZXcgSW90YSBtZXRob2QnLCAtPlxuICAgICAgICBleHBlY3QoZmFjdG9yeSgpKS50by5ub3QuZXF1YWwgZmFjdG9yeSgpXG5cbiAgICAgIGRlc2NyaWJlICdpb3RhJywgLT5cbiAgICAgICAgaXQgJ3Nob3VsZCByZXR1cm4gaW5jcmVtZW50ZWQgaW50JywgLT5cbiAgICAgICAgICBpb3RhID0gZmFjdG9yeSgpXG4gICAgICAgICAgZXhwZWN0KGlvdGEoKSkuZXF1YWwgMFxuICAgICAgICAgIGV4cGVjdChpb3RhKCkpLmVxdWFsIDFcbiAgICAgICAgICBleHBlY3QoaW90YSgpKS5lcXVhbCAyXG4gICAgICAgICAgZXhwZWN0KGlvdGEoKSkuZXF1YWwgM1xuICAgICAgICAgIGV4cGVjdChpb3RhKCkpLmVxdWFsIDRcbiAgICAgICAgICBpb3RhID0gZmFjdG9yeSgpXG4gICAgICAgICAgZXhwZWN0KGlvdGEoKSkuZXF1YWwgMFxuICAgICAgICAgIGV4cGVjdChpb3RhKCkpLmVxdWFsIDFcbiAgICAgICAgICBleHBlY3QoaW90YSgpKS5lcXVhbCAyXG4gICAgICAgICAgZXhwZWN0KGlvdGEoKSkuZXF1YWwgM1xuICAgICAgICAgIGV4cGVjdChpb3RhKCkpLmVxdWFsIDRcbiIsIntleHBlY3R9ID0gY2hhaVxuUG9pbnQgPSByZXF1aXJlICcuLi9tb2RlbHMvcG9pbnQnXG5cbmRlc2NyaWJlICdQb2ludCcsIC0+XG4gIGRlc2NyaWJlICdjb25zdHJ1Y3RvcicsIC0+XG4gICAgaXQgJ3Nob3VsZCBjcmVhdGUgemVybyBwb2ludCB3aXRob3V0IG5vIHBhcmFtZXRlcicsIC0+XG4gICAgICB7eCwgeX0gPSBuZXcgUG9pbnRcbiAgICAgIGV4cGVjdCh4KS5lcXVhbHMgMFxuICAgICAgZXhwZWN0KHkpLmVxdWFscyAwXG4gICAgaXQgJ3Nob3VsZCBjcmVhdGUgcG9pbnQgd2l0aCAyIG51bWJlcnMnLCAtPlxuICAgICAge3gsIHl9ID0gbmV3IFBvaW50IDUsIDhcbiAgICAgIGV4cGVjdCh4KS5lcXVhbHMgNVxuICAgICAgZXhwZWN0KHkpLmVxdWFscyA4XG4gICAgaXQgJ3Nob3VsZCBjcmVhdGUgcG9pbnQgd2l0aCAxIGFycmF5JywgLT5cbiAgICAgIHt4LCB5fSA9IG5ldyBQb2ludCBbNSwgOF1cbiAgICAgIGV4cGVjdCh4KS5lcXVhbHMgNVxuICAgICAgZXhwZWN0KHkpLmVxdWFscyA4XG4gICAgaXQgJ3Nob3VsZCBjcmVhdGUgcG9pbnQgd2l0aCAxIG9iamVjdCcsIC0+XG4gICAgICB7eCwgeX0gPSBuZXcgUG9pbnQge3g6IDUsIHk6IDh9XG4gICAgICBleHBlY3QoeCkuZXF1YWxzIDVcbiAgICAgIGV4cGVjdCh5KS5lcXVhbHMgOFxuICAgIGl0ICdzaG91bGQgY3JlYXRlIHBvaW50IHdpdGggMSBQb2ludCcsIC0+XG4gICAgICB7eCwgeX0gPSBuZXcgUG9pbnQgbmV3IFBvaW50IDUsIDhcbiAgICAgIGV4cGVjdCh4KS5lcXVhbHMgNVxuICAgICAgZXhwZWN0KHkpLmVxdWFscyA4XG4iLCJzbnMgPSByZXF1aXJlICcuLi9tb2RlbHMvc25zL2ZhY2Vib29rJ1xuZ29vZ2xlUGx1cyA9IHJlcXVpcmUgJy4uL21vZGVscy9zbnMvZ29vZ2xlLXBsdXMnXG5oYXRlbmEgPSByZXF1aXJlICcuLi9tb2RlbHMvc25zL2hhdGVuYSdcbmxpbmUgPSByZXF1aXJlICcuLi9tb2RlbHMvc25zL2xpbmUnXG5waW50ZXJlc3QgPSByZXF1aXJlICcuLi9tb2RlbHMvc25zL3BpbnRlcmVzdCdcbnR3aXR0ZXIgPSByZXF1aXJlICcuLi9tb2RlbHMvc25zL3R3aXR0ZXInXG4iXX0=
