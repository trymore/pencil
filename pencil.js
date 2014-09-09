!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.pencil=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = {
  models: {
    animate: require("./models/animate"),
    "backgrouns-position": require("./models/backgrouns-position"),
    browser: require("./models/browser"),
    easing: require("./models/easing"),
    flow: require("./models/flow"),
    "image-data-helper": require("./models/image-data-helper"),
    iota: require("./models/iota"),
    location: require("./models/location"),
    os: require("./models/os"),
    "query-string": require("./models/query-string"),
    snaphelper: require("./models/snaphelper"),
    geom: {
      point: require("./models/geom/point"),
      rect: require("./models/geom/rect")
    },
    sns: {
      facebook: require("./models/sns/facebook"),
      "google-plus": require("./models/sns/google-plus"),
      hatena: require("./models/sns/hatena"),
      line: require("./models/sns/line"),
      pinterest: require("./models/sns/pinterest"),
      twitter: require("./models/sns/twitter")
    }
  },
  views: {
    anchor: require("./views/anchor"),
    breakpoint: require("./views/breakpoint"),
    checkbox: require("./views/checkbox"),
    drawer: require("./views/drawer"),
    image: require("./views/image"),
    "mask-factory": require("./views/mask-factory"),
    preventable: require("./views/preventable"),
    radio: require("./views/radio"),
    select: require("./views/select"),
    selectable: require("./views/selectable"),
    slicer: require("./views/slicer"),
    sprite: require("./views/sprite"),
    tab: require("./views/tab"),
    "text-overflow": require("./views/text-overflow"),
    view: require("./views/view")
  }
};



},{"./models/animate":2,"./models/backgrouns-position":3,"./models/browser":4,"./models/easing":5,"./models/flow":6,"./models/geom/point":7,"./models/geom/rect":8,"./models/image-data-helper":9,"./models/iota":10,"./models/location":11,"./models/os":12,"./models/query-string":13,"./models/snaphelper":14,"./models/sns/facebook":15,"./models/sns/google-plus":16,"./models/sns/hatena":17,"./models/sns/line":18,"./models/sns/pinterest":19,"./models/sns/twitter":20,"./views/anchor":21,"./views/breakpoint":22,"./views/checkbox":23,"./views/drawer":24,"./views/image":25,"./views/mask-factory":26,"./views/preventable":27,"./views/radio":28,"./views/select":29,"./views/selectable":30,"./views/slicer":31,"./views/sprite":32,"./views/tab":33,"./views/text-overflow":34,"./views/view":35}],2:[function(require,module,exports){
(function (global){
var $;

$ = (typeof window !== "undefined" ? window.$ : typeof global !== "undefined" ? global.$ : null);

module.exports = {
  animate: function(from, to, opts) {
    return $('<div>').css({
      position: 'absolute',
      left: from
    }).animate({
      left: to
    }, opts);
  }
};



}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],3:[function(require,module,exports){
module.exports = {
  jquerize: function($) {
    var direction, getBackgroundSizes, i, normalize, replacer, _fn, _i, _len, _ref, _ref1;
    if ((_ref = $.jquerized) != null ? _ref['background-size'] : void 0) {
      return;
    }
    replacer = {
      left: '0px',
      right: '100%',
      top: '0px',
      bottom: '100%'
    };
    normalize = function(val) {
      return replacer[val] || val;
    };
    getBackgroundSizes = function(el) {
      return $.css(el, 'background-position').split(/\s+/, 2);
    };
    _ref1 = ['x', 'y'];
    _fn = function(direction, i) {
      $.cssHooks["background-position-" + direction] = $.cssHooks["backgroundPosition" + (direction.toUpperCase())] = {
        get: function(el) {
          return getBackgroundSizes(el)[i];
        },
        set: function(el, val) {
          var sizes;
          sizes = getBackgroundSizes(el);
          sizes[i] = normalize(val);
          return $.style(el, 'background-position', sizes.join(' '));
        }
      };
      return $.fx.step["background-position-" + direction] = $.fx.step["backgroundPosition" + (direction.toUpperCase())] = function(_arg) {
        var elem, now, prop;
        elem = _arg.elem, prop = _arg.prop, now = _arg.now;
        return $.style(elem, prop, now);
      };
    };
    for (i = _i = 0, _len = _ref1.length; _i < _len; i = ++_i) {
      direction = _ref1[i];
      _fn(direction, i);
    }
    if ($.jquerized == null) {
      $.jquerized = {};
    }
    return $.jquerized['background-size'] = true;
  }
};



},{}],4:[function(require,module,exports){

/*
Browser parses user agent and determines the browser type and version.
 */
var R_CHROME, R_MOZILLA, R_MSIE, R_OPERA, R_WEBKIT, UA, browser, name, number, version, _ref;

UA = window.navigator.userAgent.toLowerCase();

R_CHROME = /(chrome)[ \/]([\w.]+)/;

R_WEBKIT = /(webkit)[ \/]([\w.]+)/;

R_OPERA = /(opera)(?:.*version|)[ \/]([\w.]+)/;

R_MSIE = /(msie) ([\w.]+)/;

R_MOZILLA = /(mozilla)(?:.*? rv:([\w.]+)|)/;

_ref = R_CHROME.exec(UA) || R_WEBKIT.exec(UA) || R_OPERA.exec(UA) || R_MSIE.exec(UA) || UA.indexOf("compatible") < 0 && R_MOZILLA.exec(UA) || [], _ref[0], name = _ref[1], version = _ref[2];

browser = {};

if (name) {
  browser[name] = true;
  browser.version = version;
  number = parseInt(browser.version, 10);
  if (!isNaN(number)) {
    browser.versionNumber = number;
  }
}

if (browser.chrome) {
  browser.webkit = true;
} else if (browser.webkit) {
  browser.safari = true;
}

module.exports = browser;



},{}],5:[function(require,module,exports){
var PI, PI_2, abs, asin, cos, factory, pow, round, roundSmall, sin, sqrt;

PI = Math.PI, abs = Math.abs, pow = Math.pow, sqrt = Math.sqrt, sin = Math.sin, cos = Math.cos, asin = Math.asin, round = Math.round;

PI_2 = PI / 2;

roundSmall = function(val) {
  if (val >= 1e-6) {
    return val;
  }
  return round(val * 1000000) / 1000000;
};

factory = {
  linear: function() {
    return function(x, t, b, c, d) {
      return c * t / d + b;
    };
  },
  easeInBack: function(s) {
    s = s || 1.70158;
    return function(x, t, b, c, d) {
      return c * (t /= d) * t * ((s + 1) * t - s) + b;
    };
  },
  easeInOutBack: function(s) {
    s = s || 1.70158;
    return function(x, t, b, c, d) {
      if ((t /= d / 2) < 1) {
        return c / 2 * (t * t * (((s * 1.525) + 1) * t - s * 1.525)) + b;
      }
      return c / 2 * ((t -= 2) * t * (((s * 1.525) + 1) * t + s * 1.525) + 2) + b;
    };
  },
  easeOutBack: function(s) {
    s = s || 1.70158;
    return function(x, t, b, c, d) {
      return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    };
  },
  easeOutInBack: function(s) {
    s = s || 1.70158;
    return function(x, t, b, c, d) {
      if (t < d / 2) {
        return (c / 2) * ((t = (t * 2) / d - 1) * t * ((s + 1) * t + s) + 1) + b;
      }
      return (c / 2) * (t = (t * 2 - d) / d) * t * ((s + 1) * t - s) + (b + c / 2);
    };
  },
  easeInBounce: function() {
    return function(x, t, b, c, d) {
      if ((t = (d - t) / d) < 0.36363636363636365) {
        return c - (c * (7.5625 * t * t)) + b;
      }
      if (t < 0.7272727272727273) {
        return c - (c * (7.5625 * (t -= 0.5454545454545454) * t + 0.75)) + b;
      }
      if (t < 0.9090909090909091) {
        return c - (c * (7.5625 * (t -= 0.8181818181818182) * t + 0.9375)) + b;
      }
      return c - (c * (7.5625 * (t -= 0.9545454545454546) * t + 0.984375)) + b;
    };
  },
  easeInOutBounce: function() {
    return function(x, t, b, c, d) {
      if (t < d / 2) {
        if ((t = (d - t * 2) / d) < 0.36363636363636365) {
          return (c - (c * (7.5625 * t * t))) * 0.5 + b;
        }
        if (t < 0.7272727272727273) {
          return (c - (c * (7.5625 * (t -= 0.5454545454545454) * t + 0.75))) * 0.5 + b;
        }
        if (t < 0.9090909090909091) {
          return (c - (c * (7.5625 * (t -= 0.8181818181818182) * t + 0.9375))) * 0.5 + b;
        }
        return (c - (c * (7.5625 * (t -= 0.9545454545454546) * t + 0.984375))) * 0.5 + b;
      } else {
        if ((t = (t * 2 - d) / d) < 0.36363636363636365) {
          return (c * (7.5625 * t * t)) * 0.5 + c * 0.5 + b;
        }
        if (t < 0.7272727272727273) {
          return (c * (7.5625 * (t -= 0.5454545454545454) * t + 0.75)) * 0.5 + c * 0.5 + b;
        }
        if (t < 0.9090909090909091) {
          return (c * (7.5625 * (t -= 0.8181818181818182) * t + 0.9375)) * 0.5 + c * 0.5 + b;
        }
        return (c * (7.5625 * (t -= 0.9545454545454546) * t + 0.984375)) * 0.5 + c * 0.5 + b;
      }
    };
  },
  easeOutBounce: function() {
    return function(x, t, b, c, d) {
      if ((t /= d) < 0.36363636363636365) {
        return c * (7.5625 * t * t) + b;
      }
      if (t < 0.7272727272727273) {
        return c * (7.5625 * (t -= 0.5454545454545454) * t + 0.75) + b;
      }
      if (t < 0.9090909090909091) {
        return c * (7.5625 * (t -= 0.8181818181818182) * t + 0.9375) + b;
      }
      return c * (7.5625 * (t -= 0.9545454545454546) * t + 0.984375) + b;
    };
  },
  easeOutInBounce: function() {
    return function(x, t, b, c, d) {
      if (t < d / 2) {
        if ((t = (t * 2) / d) < 0.36363636363636365) {
          return (c / 2) * (7.5625 * t * t) + b;
        }
        if (t < 0.7272727272727273) {
          return (c / 2) * (7.5625 * (t -= 0.5454545454545454) * t + 0.75) + b;
        }
        if (t < 0.9090909090909091) {
          return (c / 2) * (7.5625 * (t -= 0.8181818181818182) * t + 0.9375) + b;
        }
        return (c / 2) * (7.5625 * (t -= 0.9545454545454546) * t + 0.984375) + b;
      } else {
        if ((t = (d - (t * 2 - d)) / d) < 0.36363636363636365) {
          return (c / 2) - ((c / 2) * (7.5625 * t * t)) + (b + c / 2);
        }
        if (t < 0.7272727272727273) {
          return (c / 2) - ((c / 2) * (7.5625 * (t -= 0.5454545454545454) * t + 0.75)) + (b + c / 2);
        }
        if (t < 0.9090909090909091) {
          return (c / 2) - ((c / 2) * (7.5625 * (t -= 0.8181818181818182) * t + 0.9375)) + (b + c / 2);
        }
        return (c / 2) - ((c / 2) * (7.5625 * (t -= 0.9545454545454546) * t + 0.984375)) + (b + c / 2);
      }
    };
  },
  easeInCirc: function() {
    return function(x, t, b, c, d) {
      return -c * (sqrt(1 - (t /= d) * t) - 1) + b;
    };
  },
  easeInOutCirc: function() {
    return function(x, t, b, c, d) {
      if ((t /= d / 2) < 1) {
        return -c / 2 * (sqrt(1 - t * t) - 1) + b;
      }
      return c / 2 * (sqrt(1 - (t -= 2) * t) + 1) + b;
    };
  },
  easeOutCirc: function() {
    return function(x, t, b, c, d) {
      return c * sqrt(1 - (t = t / d - 1) * t) + b;
    };
  },
  easeOutInCirc: function() {
    return function(x, t, b, c, d) {
      if (t < d / 2) {
        return (c / 2) * sqrt(1 - (t = (t * 2) / d - 1) * t) + b;
      }
      return -(c / 2) * (sqrt(1 - (t = (t * 2 - d) / d) * t) - 1) + (b + c / 2);
    };
  },
  easeInCubic: function() {
    return function(x, t, b, c, d) {
      return c * (t /= d) * t * t + b;
    };
  },
  easeInOutCubic: function() {
    return function(x, t, b, c, d) {
      if ((t /= d / 2) < 1) {
        return c / 2 * t * t * t + b;
      } else {
        return c / 2 * ((t -= 2) * t * t + 2) + b;
      }
    };
  },
  easeOutCubic: function() {
    return function(x, t, b, c, d) {
      return c * ((t = t / d - 1) * t * t + 1) + b;
    };
  },
  easeOutInCubic: function() {
    return function(x, t, b, c, d) {
      if (t < d / 2) {
        return c / 2 * ((t = t * 2 / d - 1) * t * t + 1) + b;
      } else {
        return c / 2 * (t = (t * 2 - d) / d) * t * t + b + c / 2;
      }
    };
  },
  easeInElastic: function(a, p) {
    a = a || 0;
    p = p || 0;
    return function(x, t, b, c, d) {
      var s;
      s = void 0;
      if (t === 0) {
        return b;
      }
      if ((t /= d) === 1) {
        return b + c;
      }
      if (!p) {
        p = d * 0.3;
      }
      if (!a || a < abs(c)) {
        a = c;
        s = p / 4;
      } else {
        s = p / (2 * PI) * asin(c / a);
      }
      return -(a * pow(2, 10 * (t -= 1)) * sin((t * d - s) * (2 * PI) / p)) + b;
    };
  },
  easeInOutElastic: function(a, p) {
    a = a || 0;
    p = p || 0;
    return function(x, t, b, c, d) {
      var s;
      s = void 0;
      if (t === 0) {
        return b;
      }
      if ((t /= d / 2) === 2) {
        return b + c;
      }
      if (!p) {
        p = d * (0.3 * 1.5);
      }
      if (!a || a < abs(c)) {
        a = c;
        s = p / 4;
      } else {
        s = p / (2 * PI) * asin(c / a);
      }
      if (t < 1) {
        return -0.5 * (a * pow(2, 10 * (t -= 1)) * sin((t * d - s) * (2 * PI) / p)) + b;
      }
      return a * pow(2, -10 * (t -= 1)) * sin((t * d - s) * (2 * PI) / p) * 0.5 + c + b;
    };
  },
  easeOutElastic: function(a, p) {
    a = a || 0;
    p = p || 0;
    return function(x, t, b, c, d) {
      var s;
      s = void 0;
      if (t === 0) {
        return b;
      }
      if ((t /= d) === 1) {
        return b + c;
      }
      if (!p) {
        p = d * 0.3;
      }
      if (!a || a < abs(c)) {
        a = c;
        s = p / 4;
      } else {
        s = p / (2 * PI) * asin(c / a);
      }
      return a * pow(2, -10 * t) * sin((t * d - s) * (2 * PI) / p) + c + b;
    };
  },
  easeOutInElastic: function(a, p) {
    a = a || 0;
    p = p || 0;
    return function(x, t, b, c, d) {
      var s;
      s = void 0;
      c /= 2;
      if (t < d / 2) {
        if ((t *= 2) === 0) {
          return b;
        }
        if ((t /= d) === 1) {
          return b + c;
        }
        if (!p) {
          p = d * 0.3;
        }
        if (!a || a < abs(c)) {
          a = c;
          s = p / 4;
        } else {
          s = p / (2 * PI) * asin(c / a);
        }
        return a * pow(2, -10 * t) * sin((t * d - s) * (2 * PI) / p) + c + b;
      } else {
        if ((t = t * 2 - d) === 0) {
          return b + c;
        }
        if ((t /= d) === 1) {
          return (b + c) + c;
        }
        if (!p) {
          p = d * 0.3;
        }
        if (!a || a < abs(c)) {
          a = c;
          s = p / 4;
        } else {
          s = p / (2 * PI) * asin(c / a);
        }
        return -(a * pow(2, 10 * (t -= 1)) * sin((t * d - s) * (2 * PI) / p)) + (b + c);
      }
    };
  },
  easeInExpo: function() {
    return function(x, t, b, c, d) {
      if (t === 0) {
        return b;
      } else {
        return c * pow(2, 10 * (t / d - 1)) + b;
      }
    };
  },
  easeInOutExpo: function() {
    return function(x, t, b, c, d) {
      if (t === 0) {
        return b;
      }
      if (t === d) {
        return b + c;
      }
      if ((t /= d / 2) < 1) {
        return c / 2 * pow(2, 10 * (t - 1)) + b;
      }
      return c / 2 * (2 - pow(2, -10 * --t)) + b;
    };
  },
  easeOutExpo: function() {
    return function(x, t, b, c, d) {
      if (t === d) {
        return b + c;
      }
      return c * (1 - pow(2, -10 * t / d)) + b;
    };
  },
  easeOutInExpo: function() {
    return function(x, t, b, c, d) {
      if (t < d / 2) {
        return (t * 2 === d ? b + c / 2 : c / 2 * (1 - pow(2, -10 * t * 2 / d)) + b);
      }
      if ((t * 2 - d) === 0) {
        return b + c / 2;
      } else {
        return c / 2 * pow(2, 10 * ((t * 2 - d) / d - 1)) + b + c / 2;
      }
    };
  },
  easeInQuad: function() {
    return function(x, t, b, c, d) {
      return c * (t /= d) * t + b;
    };
  },
  easeInOutQuad: function() {
    return function(x, t, b, c, d) {
      if ((t /= d / 2) < 1) {
        return c / 2 * t * t + b;
      }
      return -c / 2 * ((--t) * (t - 2) - 1) + b;
    };
  },
  easeOutQuad: function() {
    return function(x, t, b, c, d) {
      return -c * (t /= d) * (t - 2) + b;
    };
  },
  easeOutInQuad: function() {
    return function(x, t, b, c, d) {
      if (t < d / 2) {
        return -(c / 2) * (t = t * 2 / d) * (t - 2) + b;
      }
      return (c / 2) * (t = (t * 2 - d) / d) * t + (b + c / 2);
    };
  },
  easeInQuart: function() {
    return function(x, t, b, c, d) {
      return c * (t /= d) * t * t * t + b;
    };
  },
  easeInOutQuart: function() {
    return function(x, t, b, c, d) {
      if ((t /= d / 2) < 1) {
        return c / 2 * t * t * t * t + b;
      }
      return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    };
  },
  easeOutQuart: function() {
    return function(x, t, b, c, d) {
      return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    };
  },
  easeOutInQuart: function() {
    return function(x, t, b, c, d) {
      if (t < d / 2) {
        return -(c / 2) * ((t = (t * 2) / d - 1) * t * t * t - 1) + b;
      }
      return (c / 2) * (t = (t * 2 - d) / d) * t * t * t + (b + c / 2);
    };
  },
  easeInQuint: function() {
    return function(x, t, b, c, d) {
      return c * (t /= d) * t * t * t * t + b;
    };
  },
  easeInOutQuint: function() {
    return function(x, t, b, c, d) {
      if ((t /= d / 2) < 1) {
        return c / 2 * t * t * t * t * t + b;
      }
      return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    };
  },
  easeOutQuint: function() {
    return function(x, t, b, c, d) {
      return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    };
  },
  easeOutInQuint: function() {
    return function(x, t, b, c, d) {
      if (t < d / 2) {
        return (c / 2) * ((t = (t * 2) / d - 1) * t * t * t * t + 1) + b;
      }
      return (c / 2) * (t = (t * 2 - d) / d) * t * t * t * t + (b + c / 2);
    };
  },
  easeInSine: function() {
    return function(x, t, b, c, d) {
      return -c * cos(t / d * PI_2) + c + b;
    };
  },
  easeInOutSine: function() {
    return function(x, t, b, c, d) {
      return -c / 2 * (cos(PI * t / d) - 1) + b;
    };
  },
  easeOutSine: function() {
    return function(x, t, b, c, d) {
      return c * sin(t / d * PI_2) + b;
    };
  },
  easeOutInSine: function() {
    return function(x, t, b, c, d) {
      if (t < d / 2) {
        return (c / 2) * sin((t * 2) / d * PI_2) + b;
      }
      return -(c / 2) * cos((t * 2 - d) / d * PI_2) + (c / 2) + (b + c / 2);
    };
  }
};

module.exports = {
  factory: factory,
  jquerize: function($) {
    var _ref;
    if ((_ref = $.jquerized) != null ? _ref['easing'] : void 0) {
      return;
    }
    $.extend($.easing, (function() {
      var ease, easing, func, name, _fn;
      easing = {};
      _fn = function(ease) {
        return easing[name] = function() {
          return roundSmall(ease.apply(this, arguments));
        };
      };
      for (name in factory) {
        func = factory[name];
        ease = func();
        _fn(ease);
      }
      easing.ease = easing.easeOutQuad;
      return easing;
    })());
    if ($.jquerized == null) {
      $.jquerized = {};
    }
    return $.jquerized['easing'] = true;
  }
};



},{}],6:[function(require,module,exports){
(function (global){
var $, flow,
  __slice = [].slice;

$ = (typeof window !== "undefined" ? window.$ : typeof global !== "undefined" ? global.$ : null);

flow = {
  serial: function(cbs) {
    var cb, dfd, _i, _len;
    dfd = null;
    for (_i = 0, _len = cbs.length; _i < _len; _i++) {
      cb = cbs[_i];
      if (dfd == null) {
        dfd = cb();
      } else {
        dfd = dfd.then(cb);
      }
    }
    return dfd;
  },
  parallel: function(cbs) {
    var cb, d, dfds;
    d = $.Deferred();
    dfds = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = cbs.length; _i < _len; _i++) {
        cb = cbs[_i];
        _results.push(cb());
      }
      return _results;
    })();
    $.when.apply($, dfds).done(dfds.length <= 1 ? function() {
      var rets;
      rets = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return d.resolve([rets]);
    } : function() {
      var rets;
      rets = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return d.resolve(rets);
    }).fail(d.reject);
    return d.promise();
  },
  wait: function(ms) {
    var dfd;
    dfd = $.Deferred();
    setTimeout(function() {
      return dfd.resolve();
    }, ms);
    return dfd.promise();
  }
};

module.exports = $.extend(flow, {
  jqueryize: function($) {
    return $.extend(flow);
  }
});



}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],7:[function(require,module,exports){
(function (global){
var Point, atan2, cos, isArguments, isArray, isObject, sqrt, _ref;

_ref = (typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null), isArguments = _ref.isArguments, isArray = _ref.isArray, isObject = _ref.isObject;

sqrt = Math.sqrt, cos = Math.cos, atan2 = Math.atan2;


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

  Point.argumentsToArray = function(args) {
    var elems, i, val, _i;
    elems = (function() {
      switch (args.length) {
        case 0:
          return [];
        case 1:
          if (isArguments(args[0] || isArray(args[0]))) {
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
      elems[i] = (val = elems[i]) != null ? parseFloat(val) : 0;
    }
    return elems;
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


  /*
  `pageX`,`pageY`から成るオブジェクトから`Point`インスタンスを生成します。
  @param [Object] position 座標オブジェクトです。
  @option position [Integer] pageX x座標です。
  @option position [Integer] pageY y座標です。
   */

  Point.createWithPage = function(_arg) {
    var pageX, pageY;
    pageX = _arg.pageX, pageY = _arg.pageY;
    return new Point(pageX, pageY);
  };

  function Point(x, y) {
    var _ref1;
    _ref1 = Point.argumentsToArray(arguments), this.x = _ref1[0], this.y = _ref1[1];
  }


  /*
  複製します。
  @return [Point] 複製された`Point`インスタンスです。
   */

  Point.prototype.clone = function() {
    return new Point(this.x, this.y);
  };


  /*
  原点からの距離を求めます。
  @return [Number] 距離です。
   */

  Point.prototype.distance = function() {
    return sqrt(this.x * this.x + this.y * this.y);
  };


  /*
  x軸正の向きからの偏角を求めます。
  @return [Number] 角度です。(rad)
   */

  Point.prototype.angle = function() {
    return atan2(y, x);
  };


  /*
  減算します。
  @param [Point] point 減算する`Point`です。
  @return [Point] 計算結果の新しい`Point`です。
   */

  Point.prototype.subtract = function(x, y) {
    var _ref1;
    if ((x != null) && (x.x != null) && (x.y != null)) {
      _ref1 = x, x = _ref1.x, y = _ref1.y;
    }
    return new Point(this.x - x, this.y - y);
  };


  /*
  Point#subtractのショートハンドです。
  @see Point#subtract
   */

  Point.prototype.sub = Point.prototype.subtract;


  /*
  加算します。
  @param [Point] point 加算する`Point`です。
  @return [Point] 計算結果の新しい`Point`です。
   */

  Point.prototype.add = function(x, y) {
    var _ref1;
    if ((x != null) && (x.x != null) && (x.y != null)) {
      _ref1 = x, x = _ref1.x, y = _ref1.y;
    }
    return new Point(this.x + x, this.y + y);
  };


  /*
  各要素に乗算します。
  @param [Number] n 乗算する数です。
  @return [Point] 計算結果の新しい`Point`です。
   */

  Point.prototype.multiply = function(n) {
    return new Point(this.x * n, this.y * n);
  };


  /*
  Point#multiplyのショートハンドです。
  @see Point#multiply
   */

  Point.prototype.mul = Point.prototype.multiply;


  /*
  ベクトルの内積を求めます。
  a ・ b = |a||b|cos(θ)
  @param [Point] point 内積をする`Point`です。
  @return [Number] 内積の結果です。
   */

  Point.prototype.dotProduct = function(point) {
    var a, b, theta;
    a = this;
    b = new Point(arguments);
    theta = a.sub(b).angle();
    return a.distance() * b.distance() * cos(theta);
  };


  /*
  ベクトルの外積を求めます。
  a x b = |a||b|sin(θ)
  @param [Point] point 外積をする`Point`です。
  @return [Number] 外積の結果です。
   */

  Point.prototype.crossProduct = function(point) {
    var a, b, theta;
    a = this;
    b = new Point(arguments);
    theta = a.sub(b).angle();
    return a.distance() * b.distance() * sin(theta);
  };


  /*
  指定領域内に収まる新しい`Point`を返します。
  @param [Rect] rect `Point`を収める領域です。
  @return [Point] 領域内に収まる新しい`Point`です。
   */

  Point.prototype.containIn = function(rect) {
    var x, y;
    return new Point((this.x < (x = rect.getLeft()) ? x : this.x > (x = rect.getRight()) ? x : this.x), (this.y < (y = rect.getTop()) ? y : this.y > (y = rect.getBottom()) ? y : this.y));
  };

  return Point;

})();



}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],8:[function(require,module,exports){
var Point, Rect, ceil, floor;

Point = require('./point');

floor = Math.floor, ceil = Math.ceil;


/*
範囲クラスです。
二次元の直交座標系を扱います。
 */

module.exports = Rect = (function() {
  Rect.createWithCorner = function(left, right, top, bottom) {
    return new Rect(left, top, right - left, bottom - top);
  };

  Rect.parseArguments = function(args) {
    var _ref, _ref1, _ref2, _ref3;
    switch (args.length) {
      case 0:
        return {
          x: 0,
          y: 0,
          width: 0,
          height: 0
        };
      case 1:
        return args[0];
      case 2:
        return {
          x: args[0].x,
          y: args[0].y,
          width: args[0].x,
          height: args[0].y
        };
      case 4:
        return {
          x: args[0],
          y: args[1],
          width: args[2],
          height: args[3]
        };
      default:
        return {
          x: (_ref = args[0]) != null ? _ref : 0,
          y: (_ref1 = args[1]) != null ? _ref1 : 0,
          width: (_ref2 = args[2]) != null ? _ref2 : 0,
          height: (_ref3 = args[3]) != null ? _ref3 : 0
        };
    }
  };

  Rect.argumentsToRect = function(args) {
    var height, width, x, y, _ref;
    _ref = Rect.parseArguments(args), x = _ref.x, y = _ref.y, width = _ref.width, height = _ref.height;
    return new Rect(x, y, width, height);
  };

  Rect.createWithCenter = function(centerX, centerY, width, height) {
    var rect;
    rect = Rect.argumentsToRect(arguments);
    rect.x -= rect.width / 2;
    rect.y -= rect.height / 2;
    return rect;
  };

  function Rect(x, y, width, height) {
    var _ref;
    if ((x != null) && (x.x != null) && (x.y != null) && (x.width != null) && (x.height != null)) {
      _ref = x, x = _ref.x, y = _ref.y, width = _ref.width, height = _ref.height;
    }
    this.x = x != null ? x : 0;
    this.y = y != null ? y : 0;
    this.width = width != null ? width : 0;
    this.height = height != null ? height : 0;
    this.normalize();
  }

  Rect.prototype.normalize = function() {
    if (this.width < 0) {
      this.x += this.width;
      this.width *= -1;
    }
    if (this.height < 0) {
      this.y += this.height;
      return this.height *= -1;
    }
  };


  /*
  複製します。
  @return [Rect] 複製された`Rect`インスタンスです。
   */

  Rect.prototype.clone = function() {
    return new Rect(this.x, this.y, this.width, this.height);
  };

  Rect.prototype.getLeft = function() {
    return this.x;
  };

  Rect.prototype.getRight = function() {
    return this.x + this.width;
  };

  Rect.prototype.getTop = function() {
    return this.y;
  };

  Rect.prototype.getBottom = function() {
    return this.y + this.height;
  };

  Rect.prototype.getLeftTop = function() {
    return new Point(this.getLeft(), this.getTop());
  };

  Rect.prototype.getLeftBottom = function() {
    return new Point(this.getLeft(), this.getBottom());
  };

  Rect.prototype.getRightTop = function() {
    return new Point(this.getRight(), this.getTop());
  };

  Rect.prototype.getRightBottom = function() {
    return new Point(this.getRight(), this.getBottom());
  };

  Rect.prototype.containsPoint = function(point) {
    var x, y, _ref;
    _ref = Point.parseArguments(arguments), x = _ref.x, y = _ref.y;
    return (this.getLeft() <= x && x <= this.getRight()) && (this.getTop() <= y && y <= this.getBottom());
  };

  Rect.prototype.containsRect = function(rect) {
    var height, width, x, y, _ref;
    _ref = Rect.parseArguments(arguments), x = _ref.x, y = _ref.y, width = _ref.width, height = _ref.height;
    rect = new Rect(x, y, width, height);
    return this.getLeft() <= rect.getLeft() && rect.getRight() <= this.getRight() && this.getTop() <= rect.getTop() && rect.getBottom() <= this.getBottom();
  };

  Rect.prototype.offset = function(x, y) {
    return new Rect(this.x + x, this.y + y, this.width, this.height);
  };


  /*
  指定された量大きくした新たな領域を生成します。
  @param [Number] width 大きくする幅です。
  @param [Number] height 大きくする高さです。
  @return [Rect] 新たな領域です。
   */

  Rect.prototype.inflate = function(width, height) {
    return new Rect(this.x, this.y, this.width + width, this.height + height);
  };


  /*
  指定された量小さくした新たな領域を生成します。
  @param [Number] width 小さくする幅です。
  @param [Number] height 小さくする高さです。
  @return [Rect] 新たな領域です。
   */

  Rect.prototype.deflate = function(width, height) {
    return new Rect(this.x, this.y, this.width - width, this.height - height);
  };

  Rect.prototype.union = function(rect) {};


  /*
  指定の領域内に収まる新たな領域を生成します。
  1. x,yを収まるように設定します。
  2. 収まらない場合はwidth,heightを設定します。
   */

  Rect.prototype.fallWithin = function(rect) {
    var bottom0, bottom1, left0, left1, over, r, right0, right1, top0, top1;
    r = this.clone();
    left0 = r.getLeft();
    right0 = r.getRight();
    top0 = r.getTop();
    bottom0 = r.getBottom();
    left1 = rect.getLeft();
    right1 = rect.getRight();
    top1 = rect.getTop();
    bottom1 = rect.getBottom();
    if (left0 < left1) {
      r.x = left1;
    }
    if (right0 > right1) {
      r.x -= right0 - right1;
    }
    if ((over = r.getRight() - right1) > 0) {
      r.width -= over;
    }
    if (top0 < top1) {
      r.y = top1;
    }
    if (bottom0 > bottom1) {
      r.y -= bottom0 - bottom1;
    }
    if ((over = r.getBottom() - bottom1) > 0) {
      r.height -= over;
    }
    return r;
  };

  Rect.prototype.movableRectIn = function(rect) {
    return new Rect(rect.x, rect.y, rect.width - this.width, rect.height - this.height);
  };


  /*
  この領域に指定座標が含まれる新たな領域を生成します。
  @param [Number] x x座標です。
  @param [Number] y y座標です。
  @return [Rect] 新たな領域です。
   */

  Rect.prototype.contain = function(x, y) {
    var bottom, r, right, _ref;
    if ((x != null) && (x.x != null) && (x.y != null)) {
      _ref = x, x = _ref.x, y = _ref.y;
    }
    r = this.clone();
    right = r.getRight();
    if (x < r.x) {
      r.x = x;
      r.width = right - r.x;
    } else if (x > right) {
      r.width = x - r.x;
    }
    bottom = r.getBottom();
    if (y < r.y) {
      r.y = y;
      r.height = bottom - r.y;
    } else if (y > bottom) {
      r.height = y - r.y;
    }
    return r;
  };

  Rect.prototype.ceil = function() {
    var bottom, left, right, top;
    left = floor(this.getLeft());
    right = ceil(this.getRight());
    top = floor(this.getTop());
    bottom = ceil(this.getBottom());
    return Rect.createWithCorner(left, right, top, bottom);
  };

  Rect.prototype.floor = function() {
    var bottom, left, right, top;
    left = ceil(this.getLeft());
    right = floor(this.getRight());
    top = ceil(this.getTop());
    bottom = floor(this.getBottom());
    return Rect.createWithCorner(left, right, top, bottom);
  };

  return Rect;

})();



},{"./point":7}],9:[function(require,module,exports){
var ImageDataUtil, iota;

iota = require('../models/iota')();

module.exports = ImageDataUtil = (function() {
  function ImageDataUtil() {}

  ImageDataUtil.LEFT = 1 << iota();

  ImageDataUtil.RIGHT = 1 << iota();

  ImageDataUtil.TOP = 1 << iota();

  ImageDataUtil.BOTTOM = 1 << iota();

  ImageDataUtil.context = function(width, height) {
    var canvas;
    canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    return canvas.getContext('2d');
  };

  ImageDataUtil["new"] = function(width, height) {
    var context;
    context = ImageDataUtil.context(width, height);
    return context.getImageData(0, 0, width, height);
  };

  ImageDataUtil.clone = function(imageData) {
    var context;
    context = ImageDataUtil.context(imageData.width, imageData.height);
    context.putImageData(imageData, 0, 0);
    return context.getImageData(0, 0, imageData.width, imageData.height);
  };

  ImageDataUtil.chop = function(imageData, direction) {
    var context, data, height, maxX, maxY, minX, minY, right, width;
    width = imageData.width, height = imageData.height, data = imageData.data;
    context = ImageDataUtil.context(width, height);
    context.putImageData(imageData, 0, 0);
    minX = 0;
    maxX = width - 1;
    minY = 0;
    maxY = height - 1;
    if ((direction && ImageDataUtil.RIGHT) === ImageDataUtil.RIGHT) {
      right = (function() {
        var x, y;
        x = maxX;
        while (x >= minX) {
          y = maxY;
          while (y >= minY) {
            if (data[3 + 4 * (height * x + y)] !== 0) {
              return x;
            }
            y--;
          }
          x--;
        }
        return 0;
      })();
      return context.getImageData(0, 0, right + 1, height);
    }
  };

  return ImageDataUtil;

})();



},{"../models/iota":10}],10:[function(require,module,exports){

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



},{}],11:[function(require,module,exports){
(function (global){
var $, props;

$ = (typeof window !== "undefined" ? window.$ : typeof global !== "undefined" ? global.$ : null);

props = "hash\nhost\nhostname\nhref\norigin\npathname\nport\nprotocol".split(/\s+/);

module.exports = {
  parse: function(url) {
    var el, location, prop, _i, _len;
    location = {};
    el = $('<a>').attr({
      href: url
    })[0];
    for (_i = 0, _len = props.length; _i < _len; _i++) {
      prop = props[_i];
      location[prop] = el[prop];
    }
    return location;
  }
};



}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],12:[function(require,module,exports){

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



},{}],13:[function(require,module,exports){
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
},{}],14:[function(require,module,exports){
var Point;

Point = require('./geom/point');

module.exports = {
  getTotalLength: function(path) {
    var end, i, length, next, points, prev, start, x, y, _i, _len;
    switch (path.type) {
      case 'line':
        start = new Point(parseFloat(path.attr('x1')), parseFloat(path.attr('y1')));
        end = new Point(parseFloat(path.attr('x2')), parseFloat(path.attr('y2')));
        return Point.distance(start, end);
      case 'polyline':
        length = 0;
        points = path.attr('points');
        i = points.length;
        while (i-- > 0) {
          if (points[i] === '') {
            points = points.splice(i, 1);
          }
        }
        for (i = _i = 0, _len = points.length; _i < _len; i = _i += 2) {
          x = points[i];
          x = parseFloat(x);
          y = parseFloat(points[i + 1]);
          next = new Point(x, y);
          if (typeof prev !== "undefined" && prev !== null) {
            length += Point.distance(prev, next);
          }
          prev = next;
        }
        return length;
      default:
        return path.getTotalLength();
    }
  },
  getPointAtLength: function(path, len) {
    var distance, end, i, length, points, start, x, y, _i, _len;
    switch (path.type) {
      case 'line':
        start = new Point(parseFloat(path.attr('x1')), parseFloat(path.attr('y1')));
        end = new Point(parseFloat(path.attr('x2')), parseFloat(path.attr('y2')));
        return Point.lerp(start, end, len / Point.distance(start, end));
      case 'polyline':
        length = 0;
        points = path.attr('points');
        for (i = _i = 0, _len = points.length; _i < _len; i = _i += 2) {
          x = points[i];
          x = parseFloat(x);
          y = parseFloat(points[i + 1]);
          end = new Point(x, y);
          if (start != null) {
            distance = Point.distance(start, end);
            if ((length <= len && len <= (length += distance))) {
              return Point.lerp(start, end, len / Point.distance(start, end));
            }
          }
          start = end;
        }
        break;
      default:
        return new Point(path.getPointAtLength(len));
    }
  }
};



},{"./geom/point":7}],15:[function(require,module,exports){
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



},{"../query-string":13}],16:[function(require,module,exports){
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



},{"../query-string":13}],17:[function(require,module,exports){

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



},{}],18:[function(require,module,exports){
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



},{"../../models/os":12,"../query-string":13}],19:[function(require,module,exports){
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



},{"../query-string":13}],20:[function(require,module,exports){
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



},{"../query-string":13}],21:[function(require,module,exports){
(function (global){

/*
Anchor is a wrapper of <a href="#*">.
 */
var $, Anchor, View,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('./view');

$ = (typeof window !== "undefined" ? window.$ : typeof global !== "undefined" ? global.$ : null);

module.exports = Anchor = (function(_super) {
  __extends(Anchor, _super);


  /*
  Creates a Anchor instance.
   */

  function Anchor() {
    this.onClick = __bind(this.onClick, this);
    Anchor.__super__.constructor.apply(this, arguments);
    this.on('click', this.onClick);
  }


  /*
  Click event
   */

  Anchor.prototype.onClick = function(e) {
    var $el, href, top;
    href = this.attr('href');
    if (href === '#') {
      top = 0;
    } else {
      $el = $(href);
      if ($el.length === 0) {
        return;
      }
      top = $el.offset().top;
    }
    e.preventDefault();
    return $('html,body').stop(true, false).animate({
      scrollTop: top
    }, 600);
  };

  return Anchor;

})(View);



}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./view":35}],22:[function(require,module,exports){

/*
Breakpoint call registered callback when window width contains registered range.
 */
var Breakpoint, View,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('./view');

module.exports = Breakpoint = (function(_super) {
  __extends(Breakpoint, _super);

  Breakpoint.prototype.breakpoint = {};


  /*
  Creates a Breakpoint instance.
   */

  function Breakpoint() {
    this.onWindowResized = __bind(this.onWindowResized, this);
    this.onWindowLoad = __bind(this.onWindowLoad, this);
    var callback, condition, matched, _ref;
    Breakpoint.__super__.constructor.apply(this, arguments);
    this.breakpoints = [];
    _ref = this.breakpoint;
    for (condition in _ref) {
      callback = _ref[condition];
      matched = condition.match(/^(\d*)(\.{2,3})(\d*)$/);
      if (matched == null) {
        throw new TypeError('breakpoint should be written like 640..1080 or 640...1080');
      }
      this.breakpoints.push({
        start: matched[1] === '' ? Number.MIN_VALUE : parseFloat(matched[1]),
        end: matched[3] === '' ? Number.MAX_VALUE : parseFloat(matched[3]),
        isContainsEnd: matched[2].length === 2,
        callback: this[callback]
      });
    }
    this.constructor.$window.on('load', this.onWindowLoad).on('resize', this.onWindowResized);
  }


  /*
  Stops listening events and deletes references.
   */

  Breakpoint.prototype.destruct = function() {
    this.constructor.$window.off('load', this.onWindowLoad);
    this.constructor.$window.off('resize', this.onWindowResized);
    return Breakpoint.__super__.destruct.apply(this, arguments);
  };

  Breakpoint.prototype.onWindowLoad = function() {
    return this.onWindowResized();
  };


  /*
  Calls callbacks contains current window width.
   */

  Breakpoint.prototype.onWindowResized = function() {
    var callback, end, isContainsEnd, start, windowWidth, _i, _len, _ref, _ref1, _ref2;
    windowWidth = (_ref = window.innerWidth) != null ? _ref : this.constructor.$window.innerWidth();
    _ref1 = this.breakpoints;
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      _ref2 = _ref1[_i], start = _ref2.start, end = _ref2.end, isContainsEnd = _ref2.isContainsEnd, callback = _ref2.callback;
      if (isContainsEnd) {
        if ((start <= windowWidth && windowWidth <= end)) {
          callback.call(this, windowWidth);
        }
      } else {
        if ((start <= windowWidth && windowWidth < end)) {
          callback.call(this, windowWidth);
        }
      }
    }
    return this.onResized();
  };


  /*
  Called after all callbacks are called.
   */

  Breakpoint.prototype.onResized = function() {};

  return Breakpoint;

})(View);



},{"./view":35}],23:[function(require,module,exports){

/*
Checkbox is a wrapper of <input type="checkbox">.
 */
var Checkbox, View,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('./view');

module.exports = Checkbox = (function(_super) {
  __extends(Checkbox, _super);

  Checkbox.prototype.checked = 'is-checked';


  /*
  Creates a Checkbox instance.
   */

  function Checkbox() {
    this.update = __bind(this.update, this);
    Checkbox.__super__.constructor.apply(this, arguments);
    this.$checkbox = this.$('input[type=checkbox]').on('change', this.update);
    this.update();
  }


  /*
  Reflects checked status of the raw element to myself.
   */

  Checkbox.prototype.update = function() {
    if (this.$checkbox.prop('checked')) {
      return this.addClass(this.checked);
    } else {
      return this.removeClass(this.checked);
    }
  };

  return Checkbox;

})(View);



},{"./view":35}],24:[function(require,module,exports){

/*
Drawer class.
 */
var Drawer, View,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('./view');

module.exports = Drawer = (function(_super) {
  __extends(Drawer, _super);

  Drawer.prototype.selectorButton = '.js-button';

  Drawer.prototype.selectorContent = '.js-content';

  Drawer.prototype.classOpened = 'is-opened';

  function Drawer() {
    this.toggle = __bind(this.toggle, this);
    Drawer.__super__.constructor.apply(this, arguments);
    this.$(this.selectorButton).on('click', this.toggle);
    this.content = this.$(this.selectorContent);
  }

  Drawer.prototype.toggle = function(_arg, index) {
    _arg;
    if (this.hasClass(this.classOpened)) {
      this.removeClass(this.classOpened);
      return this.content.stop(true, false).slideUp();
    } else {
      this.addClass(this.classOpened);
      return this.content.stop(true, false).slideDown();
    }
  };

  return Drawer;

})(View);



},{"./view":35}],25:[function(require,module,exports){
(function (global){
var $, Image, View, msie, versionNumber, _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('./view');

_ref = require('../models/browser'), msie = _ref.msie, versionNumber = _ref.versionNumber;

$ = (typeof window !== "undefined" ? window.$ : typeof global !== "undefined" ? global.$ : null);


/*
Imageクラスです。
`<img>`要素の表示状態にかかわらず、画像をロードしサイズを取得することができます。
 */

module.exports = Image = (function(_super) {
  __extends(Image, _super);


  /*
  Imageインスタンスを生成します。
   */

  function Image() {
    this.onLoadComplete = __bind(this.onLoadComplete, this);
    Image.__super__.constructor.apply(this, arguments);
    this.src = this.attr('src');
    this.loader = $('<img>');
    this.wrapper = $('<div>').attr({
      width: 0,
      height: 0,
      overflow: 'hidden',
      visibility: 'hidden'
    }).append(this.loader);
  }


  /*
  画像をロードします。
  @event 'image.complete'
   */

  Image.prototype.load = function(src) {
    if (src != null) {
      this.src = src;
    }
    if (this.src === '') {
      return;
    }
    this.unload();
    this.startListening();
    return this.loader.attr({
      src: msie && versionNumber < 9 ? "" + this.src + "?" + (new Date().getTime()) : this.src
    });
  };


  /*
  画像をアンロードします。
   */

  Image.prototype.unload = function() {
    this.stopListening();
    return this.loader.attr({
      src: ''
    });
  };


  /*
  @private
   */

  Image.prototype.startListening = function() {
    return this.loader.one('load error', this.onLoadComplete);
  };


  /*
  @private
   */

  Image.prototype.stopListening = function() {
    return this.loader.off('load error', this.onLoadComplete);
  };


  /*
  @private
   */

  Image.prototype.onLoadComplete = function() {
    this.stopListening();
    this.wrapper.appendTo('body');
    this.attr({
      src: this.src,
      width: this.loader.width(),
      height: this.loader.width()
    });
    this.wrapper.remove();
    return this.trigger('image.loaded');
  };

  return Image;

})(View);



}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../models/browser":4,"./view":35}],26:[function(require,module,exports){
(function (global){
var MaskFactory, View, assign, iota,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('./view');

assign = (typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null).assign;

iota = require('../models/iota')();

module.exports = MaskFactory = (function(_super) {
  __extends(MaskFactory, _super);

  MaskFactory.LEFT = 1 << iota();

  MaskFactory.RIGHT = 1 << iota();

  MaskFactory.TOP = 1 << iota();

  MaskFactory.BOTTOM = 1 << iota();

  MaskFactory.prototype.classOuter = 'js-maskfactory-outer';

  MaskFactory.prototype.classMask = 'js-maskfactory-mask';

  MaskFactory.prototype.classInner = 'js-maskfactory-inner';

  function MaskFactory(_arg, origin) {
    _arg;
    this.origin = origin != null ? origin : this.constructor.LEFT;
    this.onWindowResized = __bind(this.onWindowResized, this);
    MaskFactory.__super__.constructor.apply(this, arguments);
    this.outer = this.wrapInner('<div>').children().addClass(this.classOuter);
    this.mask = this.outer.wrapInner('<div>').children().addClass(this.classMask).css({
      width: '100%',
      height: '100%'
    });
    this.inner = this.mask.wrapInner('<div>').children().addClass(this.classInner);
    if ((this.origin & this.constructor.LEFT) === this.constructor.LEFT) {
      this.mask.css({
        left: 0
      });
      this.inner.css({
        left: 0
      });
    }
    if ((this.origin & this.constructor.RIGHT) === this.constructor.RIGHT) {
      this.mask.css({
        right: 0
      });
      this.inner.css({
        right: 0
      });
    }
    if ((this.origin & this.constructor.TOP) === this.constructor.TOP) {
      this.mask.css({
        top: 0
      });
      this.inner.css({
        top: 0
      });
    }
    if ((this.origin & this.constructor.BOTTOM) === this.constructor.BOTTOM) {
      this.mask.css({
        bottom: 0
      });
      this.inner.css({
        bottom: 0
      });
    }
    this.constructor.$window.on('load resize', this.onWindowResized);
    this.onWindowResized();
  }

  MaskFactory.prototype.getMask = function() {
    return this.mask;
  };

  MaskFactory.prototype.onWindowResized = function() {
    var maskCss, sizeCss;
    maskCss = {
      width: this.mask[0].style.width,
      height: this.mask[0].style.height
    };
    this.outer.css({
      position: ''
    });
    this.mask.css({
      position: '',
      overflow: '',
      width: '',
      height: ''
    });
    this.inner.css({
      position: ''
    });
    sizeCss = {
      width: this.width(),
      height: this.height()
    };
    this.outer.css(assign(sizeCss, {
      position: 'relative'
    }));
    this.mask.css(assign(maskCss, {
      position: 'absolute',
      overflow: 'hidden'
    }));
    return this.inner.css(assign(sizeCss, {
      position: 'absolute'
    }));
  };

  return MaskFactory;

})(View);



}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../models/iota":10,"./view":35}],27:[function(require,module,exports){
var Preventable, View,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('./view');


/*
ユーザイベントの伝播を停止するViewです。
 */

module.exports = Preventable = (function(_super) {
  __extends(Preventable, _super);


  /*
  @private
  @property String 停止対象のイベントです。
   */

  Preventable.prototype.events = 'blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error';


  /*
  インスタンスを生成します。
   */

  function Preventable() {
    this.onMouse = __bind(this.onMouse, this);
    Preventable.__super__.constructor.apply(this, arguments);
    this.enabled = true;
    this.on(this.events, this.onMouse);
  }


  /*
  @private
  イベント発生時に`enabled`が`false`ならイベントに関する全ての動作を停止します。
  
  1. デフォルト動作を停止します。
  2. イベントの伝播を停止します。
  3. このインスタンスのコンストラクタ以降に登録されたイベントのコールバックをコールしません。
   */

  Preventable.prototype.onMouse = function(e) {
    if (!this.enabled) {
      e.preventDefault();
      e.stopPropagation();
      return e.stopImmediatePropagation();
    }
  };

  return Preventable;

})(View);



},{"./view":35}],28:[function(require,module,exports){
(function (global){
var $, Radio, View,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('./view');

$ = (typeof window !== "undefined" ? window.$ : typeof global !== "undefined" ? global.$ : null);


/*
`<input type="radio">`をスタイリングするためのラッパです。
ラジオボタンの状態をクラスとして要素に付与することでCSSに状態を伝達します。

ラジオボタンが元々もっている下記の機能をサポートします。
- `selected`属性が付いている場合は初期化時に選択されているクラスを付与します。
- `name`属性によるグルーピングが有効です。
グループの中の1つがユーザにより選択されると既に選択されていたラジオボタンは選択状態ではなくなります。

@example ラジオボタンのマークアップ
    <span class="radio">
      <input type="radio">
    </span>
 */

module.exports = Radio = (function(_super) {
  __extends(Radio, _super);


  /*
  @property String ラジオボタンが`checked`になった際に要素に付与されるクラス名です。
   */

  Radio.prototype.checked = 'is-checked';


  /*
  インスタンスを生成します。
   */

  function Radio() {
    this.update = __bind(this.update, this);
    var name;
    Radio.__super__.constructor.apply(this, arguments);
    this.radio = this.$('input[type=radio]').on('change radioChange', this.update);
    if ((name = this.radio.attr('name')) !== '') {
      this.otherRadios = $("input[type=radio][name=" + name + "]").not(this.radio);
    }
    this.update();
  }


  /*
  @private
  ラジオボタンの状態によりクラスを付与・除去します。
   */

  Radio.prototype.update = function() {
    var _ref;
    if (this.radio.prop('checked')) {
      this.addClass(this.checked);
      return (_ref = this.otherRadios) != null ? _ref.trigger('radioChange') : void 0;
    } else {
      return this.removeClass(this.checked);
    }
  };

  return Radio;

})(View);



}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./view":35}],29:[function(require,module,exports){

/*
Select is a wrapper of <input type="radio">.
 */
var Select, View,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('./view');

module.exports = Select = (function(_super) {
  __extends(Select, _super);

  Select.prototype.label = '.js-label';


  /*
  Creates a Select instance.
   */

  function Select() {
    this.update = __bind(this.update, this);
    Select.__super__.constructor.apply(this, arguments);
    this.$label = this.$(this.label);
    this.$select = this.$('select').on('change', this.update);
    this.update();
  }


  /*
  Reflects selected text of the raw element to the label element.
   */

  Select.prototype.update = function() {
    return this.$label.text(this.$select.find('option:selected').text());
  };

  return Select;

})(View);



},{"./view":35}],30:[function(require,module,exports){

/*
Selectable class.
 */
var Selectable, View,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('./view');

module.exports = Selectable = (function(_super) {
  __extends(Selectable, _super);

  function Selectable() {
    this.toggle = __bind(this.toggle, this);
    Selectable.__super__.constructor.apply(this, arguments);
    this.selectees = this.children().on('click', this.toggle);
  }

  Selectable.prototype.toggle = function(e) {
    var selectedIndex;
    selectedIndex = this.selectees.index(e.currentTarget);
    this.selectAt(selectedIndex);
    return this.trigger('selectable.changed', selectedIndex);
  };

  Selectable.prototype.selectAt = function(selectedIndex) {
    return this.selectees.removeClass('is-selected').eq(selectedIndex).addClass('is-selected');
  };

  return Selectable;

})(View);



},{"./view":35}],31:[function(require,module,exports){
(function (global){
var $, Slicer, View, hasAlpha, iota,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

$ = (typeof window !== "undefined" ? window.$ : typeof global !== "undefined" ? global.$ : null);

View = require('./view');

iota = require('../models/iota')();

hasAlpha = function(_arg) {
  var data, i, _i, _len;
  data = _arg.data;
  for (i = _i = 0, _len = data.length; _i < _len; i = _i += 4) {
    data[i];
    if (data[i + 3] !== 0) {
      return true;
    }
  }
  return false;
};

module.exports = Slicer = (function(_super) {
  __extends(Slicer, _super);

  Slicer.X = 1 << iota();

  Slicer.Y = 1 << iota();

  Slicer.replace = function(img, direction, filter) {
    var $canvas, $container, $img, canvas, char, context, hasAlphaCurrent, hasAlphaPrev, height, imageData, maxX, maxY, prev, startX, startY, width, x, y;
    if (direction == null) {
      direction = Slicer.X;
    }
    $img = $(img);
    width = $img.width();
    height = $img.height();
    $canvas = $('<canvas>').attr({
      width: width,
      height: height
    });
    canvas = $canvas[0];
    context = canvas.getContext('2d');
    context.drawImage($img[0], 0, 0);
    $container = $('<div>').css({
      display: 'inline-block',
      position: 'relative',
      width: width,
      height: height
    });
    switch (direction) {
      case Slicer.X:
        x = 0;
        maxX = width - 1;
        hasAlphaPrev = false;
        while (x <= maxX) {
          hasAlphaCurrent = hasAlpha(context.getImageData(x, 0, 1, height));
          if (!hasAlphaPrev && hasAlphaCurrent) {
            startX = x;
          } else if (hasAlphaPrev && !hasAlphaCurrent) {
            imageData = context.getImageData(startX, 0, x - startX, height);
            if (filter != null) {
              imageData = filter(imageData);
            }
            char = new Slicer(imageData, startX, 0);
            $container.append(char.$canvas);
          } else if (x === maxX && hasAlphaCurrent) {
            imageData = context.getImageData(startX, 0, width - startX, height);
            if (filter != null) {
              imageData = filter(imageData);
            }
            char = new Slicer(imageData, startX, 0);
            $container.append(char.$canvas);
          }
          hasAlphaPrev = hasAlphaCurrent;
          x++;
        }
        break;
      case Slicer.Y:
        y = 0;
        maxY = height - 1;
        hasAlphaPrev = false;
        while (y <= maxY) {
          hasAlphaCurrent = hasAlpha(context.getImageData(0, y, width, 1));
          if (!hasAlphaPrev && hasAlphaCurrent) {
            startY = y;
          } else if (hasAlphaPrev && !hasAlphaCurrent) {
            imageData = prev = context.getImageData(0, startY, width, y - startY);
            if (filter != null) {
              imageData = filter(imageData);
            }
            char = new Slicer(imageData, 0, startY);
            $container.append(char.$canvas);
          } else if (y === maxY && hasAlphaCurrent) {
            imageData = prev = context.getImageData(0, startY, width, height - startY);
            if (filter != null) {
              imageData = filter(imageData);
            }
            char = new Slicer(imageData, 0, startY);
            $container.append(char.$canvas);
          }
          hasAlphaPrev = hasAlphaCurrent;
          y++;
        }
        break;
      default:
        throw new TypeError("direction must be specified with `Slicer.X` or `Slicer.Y`");
    }
    $img.replaceWith($container);
    return $container;
  };

  function Slicer(imageData, left, top) {
    var context;
    Slicer.__super__.constructor.apply(this, arguments);
    this.$canvas = $('<canvas>').attr({
      width: imageData.width,
      height: imageData.height
    });
    context = this.$canvas[0].getContext('2d');
    context.putImageData(imageData, 0, 0);
    this.$canvas.css({
      position: 'absolute',
      left: left,
      top: top
    });
  }

  return Slicer;

})(View);



}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../models/iota":10,"./view":35}],32:[function(require,module,exports){
(function (global){
var $, Deferred, Sprite, View, iota,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

$ = (typeof window !== "undefined" ? window.$ : typeof global !== "undefined" ? global.$ : null);

require('../models/backgrouns-position').jquerize($);

View = require('./view');

iota = require('../models/iota')();

Deferred = (typeof window !== "undefined" ? window.$ : typeof global !== "undefined" ? global.$ : null).Deferred;


/*
スプライトアニメーションを管理するクラスです。

@example 同じViewに対して動き毎に別のSpriteを作ります。
    run = new Sprite '.foo'
    run.setRange 0, 10
    walk = new Sprite '.foo'
    walk.setRange 11, 20
    run.play()
    run.on Sprite.EVENT_LAST_FRAME, ->
      walk.play()
 */

module.exports = Sprite = (function(_super) {
  __extends(Sprite, _super);


  /*
  スプライト画像が並びがx方向であることを表すフラグです。
   */

  Sprite.X = 1 << iota();


  /*
  スプライト画像が並びがy方向であることを表すフラグです。
   */

  Sprite.Y = 1 << iota();


  /*
  最終フレームの終了時に発火するイベントです。
   */

  Sprite.EVENT_LAST_FRAME = 'sprite.lastFrame';


  /*
  指定のリピート回数が完了した時に発火するイベントです。
  永久にリピートする場合は発火しません。
   */

  Sprite.EVENT_COMPLETE_REPEAT = 'sprite.completeRepeat';


  /*
  スプライトインスタンスを生成します。
  
  @param [String, HTMLElement, jQueryObject, View] selector コントロールの対象の要素です
  @param [Integer] fps 1秒当たりのフレーム数です。
  @param [Integer] direction 背景画像が並んでいる方向です。
   */

  function Sprite(_arg, fps, direction) {
    _arg;
    this.fps = fps != null ? fps : 30;
    this.direction = direction != null ? direction : Sprite.Y;
    this.tick = __bind(this.tick, this);
    Sprite.__super__.constructor.apply(this, arguments);
    if (this.direction === this.constructor.X) {
      this.prop = 'backgroundPositionX';
      this.size = this.width();
    } else {
      this.prop = 'backgroundPositionY';
      this.size = this.height();
    }
    this.currentFrame = 0;
    this.setRange(0, 0);
  }


  /*
  このスプライトがフレームとして表示する背景の位置インデックスの範囲を設定します。
  
  @param [Integer] from 開始フレームの位置インデックスです。
  @param [Integer] to 最終フレームの位置インデックスです。
   */

  Sprite.prototype.setRange = function(from, to) {
    var _i, _results;
    return this.setPositions((function() {
      _results = [];
      for (var _i = from; from <= to ? _i <= to : _i >= to; from <= to ? _i++ : _i--){ _results.push(_i); }
      return _results;
    }).apply(this));
  };


  /*
  このスプライトがフレームとして表示する背景の位置インデックスの配列を設定します。
  
  @param [Array<Integer>] positions 位置インデックスの配列です。
   */

  Sprite.prototype.setPositions = function(positions) {
    this.positions = positions;
    return this.lastFrame = this.positions.length - 1;
  };


  /*
  指定されたフレームから再生します。
  
  @param [Integer] frame 再生を開始するフレームです。
  @param [Integer] repeat 再生回数です。
   */

  Sprite.prototype.gotoAndPlay = function(frame, repeat) {
    if (frame == null) {
      frame = 0;
    }
    if (repeat == null) {
      repeat = 1;
    }
    this.currentFrame = this.limitFrame(frame);
    return this.play(repeat);
  };


  /*
  指定されたフレームで停止します。
  
  @param [Integer] frame 表示するフレームです。
   */

  Sprite.prototype.gotoAndPause = function(frame) {
    if (frame == null) {
      frame = 0;
    }
    this.currentFrame = this.limitFrame(frame);
    this.updateView();
    return this.stop();
  };


  /*
  次のフレームに移動します。
   */

  Sprite.prototype.nextFrame = function() {
    this.currentFrame = this.verifyFrame(this.currentFrame + 1);
    return this.updateView();
  };


  /*
  前のフレームに移動します。
   */

  Sprite.prototype.prevFrame = function() {
    this.currentFrame = this.verifyFrame(this.currentFrame - 1);
    return this.updateView();
  };


  /*
  再生します。
  
  @param [Integer] repeat 再生回数です。
   */

  Sprite.prototype.play = function(repeat) {
    this.repeat = repeat != null ? repeat : 1;
    this.currentRepeatCount = 0;
    this.updateView();
    return this.startTick();
  };


  /*
  停止します。
   */

  Sprite.prototype.pause = function() {
    return this.stopTick();
  };


  /*
  @private
   */

  Sprite.prototype.limitFrame = function(frame) {
    if (frame < 0) {
      frame = 0;
    }
    if (frame > this.lastFrame) {
      frame = this.lastFrame;
    }
    return frame;
  };


  /*
  @private
   */

  Sprite.prototype.verifyFrame = function(frame) {
    if (frame < 0) {
      frame = this.lastFrame;
    }
    if (frame > this.lastFrame) {
      frame = 0;
    }
    return frame;
  };


  /*
  @private
   */

  Sprite.prototype.updateView = function() {
    var css, pos;
    pos = this.positions[this.currentFrame];
    css = {};
    css[this.prop] = -this.size * pos;
    return this.css(css);
  };


  /*
  @private
   */

  Sprite.prototype.startTick = function() {
    this.stopTick();
    return this.data('spriteIntervalId', setInterval(this.tick, 1000 / this.fps));
  };


  /*
  @private
   */

  Sprite.prototype.stopTick = function() {
    return clearInterval(this.data('spriteIntervalId'));
  };


  /*
  @private
   */

  Sprite.prototype.tick = function() {
    var frame, isLastFrame;
    frame = this.currentFrame + 1;
    if ((isLastFrame = frame > this.lastFrame)) {
      if (this.repeat > 0 && ++this.currentRepeatCount >= this.repeat) {
        this.stopTick();
        this.trigger(this.constructor.EVENT_LAST_FRAME);
        this.trigger(this.constructor.EVENT_COMPLETE_REPEAT);
        return;
      }
      frame = this.verifyFrame(frame);
    }
    this.currentFrame = frame;
    this.updateView();
    if (isLastFrame) {
      return this.trigger(this.constructor.EVENT_LAST_FRAME);
    }
  };

  return Sprite;

})(View);



}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../models/backgrouns-position":3,"../models/iota":10,"./view":35}],33:[function(require,module,exports){

/*
Tab class.
 */
var Tab, View,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('./view');

module.exports = Tab = (function(_super) {
  __extends(Tab, _super);

  Tab.prototype.selectorButtons = '.js-button';

  Tab.prototype.selectorContents = '.js-content';

  function Tab() {
    this.toggle = __bind(this.toggle, this);
    Tab.__super__.constructor.apply(this, arguments);
    this.$(this.selectorButtons).on('selectable.changed', this.toggle);
    this.$contents = this.$(this.selectorContents);
  }

  Tab.prototype.toggle = function(_arg, index) {
    _arg;
    return this.$contents.data('view').selectAt(index);
  };

  return Tab;

})(View);



},{"./view":35}],34:[function(require,module,exports){
var TextOverflow, View,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('./view');


/*
行数オプションを付与したCSS3のtext-overflowエミュレーションです。
 */

module.exports = TextOverflow = (function(_super) {
  var instances;

  __extends(TextOverflow, _super);

  instances = [][0];

  TextOverflow.register = function(textOverflow) {
    if (instances == null) {
      instances = [];
      this.$window.on('resize', this.onWindowResized);
    }
    return instances.push(textOverflow);
  };

  TextOverflow.unregister = function(textOverflow) {
    if (!this.instances) {
      return;
    }
    this.instances.splice(instances.indexOf(textOverflow), 1);
    if (instances.length === 0) {
      instances = null;
      return this.$window.off('resize', this.onWindowResized);
    }
  };

  TextOverflow.onWindowResized = function() {
    var instance, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = instances.length; _i < _len; _i++) {
      instance = instances[_i];
      _results.push(instance.update());
    }
    return _results;
  };

  function TextOverflow(_arg, rows, replacer) {
    _arg;
    this.rows = rows;
    this.replacer = replacer != null ? replacer : '...';
    TextOverflow.__super__.constructor.apply(this, arguments);
    this.defaultText = this.text();
    this.constructor.register(this);
    this.update();
  }

  TextOverflow.prototype.remove = function() {
    this.constructor.unregister(this);
    return TextOverflow.__super__.remove.apply(this, arguments);
  };

  TextOverflow.prototype.update = function() {
    var h, height, i, len, rows, _results;
    i = 0;
    len = this.defaultText.length;
    rows = 0;
    while (++i < len && rows <= this.rows) {
      this.text(this.defaultText.substr(0, i));
      h = this.height();
      if ((typeof height === "undefined" || height === null) || h > height) {
        height = h;
        rows++;
      }
    }
    _results = [];
    while (--i >= 0 && rows > this.rows) {
      this.text(this.defaultText.substr(0, i) + this.replacer);
      h = this.height();
      if ((height == null) || h < height) {
        height = h;
        _results.push(rows--);
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  return TextOverflow;

})(View);



},{"./view":35}],35:[function(require,module,exports){
(function (global){

/*!
The code of `View#pushStack()` and `View#end()` are borrowed from space-pen.
@see https://github.com/atom/space-pen/blob/master/src/space-pen.coffee
@license https://github.com/atom/space-pen/blob/master/LICENSE
 */
var $document, $window, View, jQuery, template,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

jQuery = (typeof window !== "undefined" ? window.$ : typeof global !== "undefined" ? global.$ : null);

template = (typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null).template;

$window = jQuery(window);

$document = jQuery(window.document);


/*
trigger()のエイリアスです。
 */

jQuery.fn.emit = jQuery.fn.trigger;


/*
one()のエイリアスです。
 */

jQuery.fn.once = jQuery.fn.one;


/*
Viewクラスはview-controllerの基底クラスです。
jQueryのラッパとして動作し、jQuery.fnに実装されているメソッドを委譲しています。
委譲されたメソッドの戻り値はjQuery.fnの戻りそのもので、
Viewインスタンスをコンテクストとしてメソッドチェーンを行うことはできません。
@dependsOn jquery
@dependsOn lodash
 */

module.exports = View = (function(_super) {
  __extends(View, _super);

  View.$window = $window;

  View.$document = $document;


  /*
  要素のテンプレートとなるStringです。
   */

  View.template = null;


  /*
  要素のセレクタです。
   */

  View.prototype.selector = null;


  /*
  セレクタか生成する要素のHTMLを渡すと、新しいViewインスタンスを返します。
  次のような優先順位で継承元(jQuery)コンストラクタをコールします。
  1. `@constructor.template`が設定されている場合: テンプレートから要素を生成します
  2. `@selector`が設定されている場合: 第一引数をコンテクストとしてセレクタを検索します
  3. 第一引数が指定されている場合: 第一引数から要素を生成・検索します。
  4. 第一引数が指定されていない場合: `<div>`要素を生成します。
   */

  function View(arg0) {
    var $el, context, data, prop, selector, val, _base;
    if (this.constructor.template != null) {
      if ((_base = this.constructor).templateFunc == null) {
        _base.templateFunc = template(this.constructor.template);
      }
      $el = View.__super__.constructor.call(this, jQuery.parseHTML(this.constructor.templateFunc((data = arg0))));
    } else if (this.selector != null) {
      $el = View.__super__.constructor.call(this, this.selector, (context = arg0));
    } else {
      $el = View.__super__.constructor.call(this, (selector = arg0) || '<div>');
    }
    for (prop in $el) {
      val = $el[prop];
      if ($el.hasOwnProperty(prop)) {
        this[prop] = val;
      }
    }
    this.data('view', this);
  }


  /*
  findのショートハンドです。
   */

  View.prototype.$ = function() {
    return jQuery.fn.find.apply(this, arguments);
  };


  /*
  @private
  ラッパを生成するjQueryメソッドをオーバーライドします。
  ここではViewインスタンスを生成するのではなく、jQueryオブジェクトを生成します。
   */

  View.prototype.pushStack = function(elems) {
    var ret;
    ret = jQuery.merge(jQuery(), elems);
    ret.prevObject = this;
    ret.context = this.context;
    return ret;
  };


  /*
  @private
  ラッパを生成するjQueryメソッドをオーバーライドします。
  ここではViewインスタンスを生成するのではなく、jQueryオブジェクトを生成します。
   */

  View.prototype.end = function() {
    var _ref;
    return (_ref = this.prevObject) != null ? _ref : jQuery(null);
  };

  return View;

})(jQuery);


/*
viewのインスタンスを取得します。
メソッドチェーンを行う際に、jQueryオブジェクトに移ったコンテクストを
Viewインスタンスに戻すことができます。
```coffeescript
new View '.some' // Viewインスタンスを生成します
.appendTo 'body' // jQueryのメソッドをコールします
.view().some()   // Viewに実装されたメソッドをコールします
```
 */

jQuery.fn.view = function() {
  return this.data('view');
};



}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9taW5vZGlzay93b3Jrc3BhY2UvZ2l0aHViL3RyeW1vcmUvcGVuY2lsL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbWlub2Rpc2svd29ya3NwYWNlL2dpdGh1Yi90cnltb3JlL3BlbmNpbC9wZW5jaWwuY29mZmVlIiwiL1VzZXJzL21pbm9kaXNrL3dvcmtzcGFjZS9naXRodWIvdHJ5bW9yZS9wZW5jaWwvbW9kZWxzL2FuaW1hdGUuY29mZmVlIiwiL1VzZXJzL21pbm9kaXNrL3dvcmtzcGFjZS9naXRodWIvdHJ5bW9yZS9wZW5jaWwvbW9kZWxzL2JhY2tncm91bnMtcG9zaXRpb24uY29mZmVlIiwiL1VzZXJzL21pbm9kaXNrL3dvcmtzcGFjZS9naXRodWIvdHJ5bW9yZS9wZW5jaWwvbW9kZWxzL2Jyb3dzZXIuY29mZmVlIiwiL1VzZXJzL21pbm9kaXNrL3dvcmtzcGFjZS9naXRodWIvdHJ5bW9yZS9wZW5jaWwvbW9kZWxzL2Vhc2luZy5jb2ZmZWUiLCIvVXNlcnMvbWlub2Rpc2svd29ya3NwYWNlL2dpdGh1Yi90cnltb3JlL3BlbmNpbC9tb2RlbHMvZmxvdy5jb2ZmZWUiLCIvVXNlcnMvbWlub2Rpc2svd29ya3NwYWNlL2dpdGh1Yi90cnltb3JlL3BlbmNpbC9tb2RlbHMvZ2VvbS9wb2ludC5jb2ZmZWUiLCIvVXNlcnMvbWlub2Rpc2svd29ya3NwYWNlL2dpdGh1Yi90cnltb3JlL3BlbmNpbC9tb2RlbHMvZ2VvbS9yZWN0LmNvZmZlZSIsIi9Vc2Vycy9taW5vZGlzay93b3Jrc3BhY2UvZ2l0aHViL3RyeW1vcmUvcGVuY2lsL21vZGVscy9pbWFnZS1kYXRhLWhlbHBlci5jb2ZmZWUiLCIvVXNlcnMvbWlub2Rpc2svd29ya3NwYWNlL2dpdGh1Yi90cnltb3JlL3BlbmNpbC9tb2RlbHMvaW90YS5jb2ZmZWUiLCIvVXNlcnMvbWlub2Rpc2svd29ya3NwYWNlL2dpdGh1Yi90cnltb3JlL3BlbmNpbC9tb2RlbHMvbG9jYXRpb24uY29mZmVlIiwiL1VzZXJzL21pbm9kaXNrL3dvcmtzcGFjZS9naXRodWIvdHJ5bW9yZS9wZW5jaWwvbW9kZWxzL29zLmNvZmZlZSIsIi9Vc2Vycy9taW5vZGlzay93b3Jrc3BhY2UvZ2l0aHViL3RyeW1vcmUvcGVuY2lsL21vZGVscy9xdWVyeS1zdHJpbmcuY29mZmVlIiwiL1VzZXJzL21pbm9kaXNrL3dvcmtzcGFjZS9naXRodWIvdHJ5bW9yZS9wZW5jaWwvbW9kZWxzL3NuYXBoZWxwZXIuY29mZmVlIiwiL1VzZXJzL21pbm9kaXNrL3dvcmtzcGFjZS9naXRodWIvdHJ5bW9yZS9wZW5jaWwvbW9kZWxzL3Nucy9mYWNlYm9vay5jb2ZmZWUiLCIvVXNlcnMvbWlub2Rpc2svd29ya3NwYWNlL2dpdGh1Yi90cnltb3JlL3BlbmNpbC9tb2RlbHMvc25zL2dvb2dsZS1wbHVzLmNvZmZlZSIsIi9Vc2Vycy9taW5vZGlzay93b3Jrc3BhY2UvZ2l0aHViL3RyeW1vcmUvcGVuY2lsL21vZGVscy9zbnMvaGF0ZW5hLmNvZmZlZSIsIi9Vc2Vycy9taW5vZGlzay93b3Jrc3BhY2UvZ2l0aHViL3RyeW1vcmUvcGVuY2lsL21vZGVscy9zbnMvbGluZS5jb2ZmZWUiLCIvVXNlcnMvbWlub2Rpc2svd29ya3NwYWNlL2dpdGh1Yi90cnltb3JlL3BlbmNpbC9tb2RlbHMvc25zL3BpbnRlcmVzdC5jb2ZmZWUiLCIvVXNlcnMvbWlub2Rpc2svd29ya3NwYWNlL2dpdGh1Yi90cnltb3JlL3BlbmNpbC9tb2RlbHMvc25zL3R3aXR0ZXIuY29mZmVlIiwiL1VzZXJzL21pbm9kaXNrL3dvcmtzcGFjZS9naXRodWIvdHJ5bW9yZS9wZW5jaWwvdmlld3MvYW5jaG9yLmNvZmZlZSIsIi9Vc2Vycy9taW5vZGlzay93b3Jrc3BhY2UvZ2l0aHViL3RyeW1vcmUvcGVuY2lsL3ZpZXdzL2JyZWFrcG9pbnQuY29mZmVlIiwiL1VzZXJzL21pbm9kaXNrL3dvcmtzcGFjZS9naXRodWIvdHJ5bW9yZS9wZW5jaWwvdmlld3MvY2hlY2tib3guY29mZmVlIiwiL1VzZXJzL21pbm9kaXNrL3dvcmtzcGFjZS9naXRodWIvdHJ5bW9yZS9wZW5jaWwvdmlld3MvZHJhd2VyLmNvZmZlZSIsIi9Vc2Vycy9taW5vZGlzay93b3Jrc3BhY2UvZ2l0aHViL3RyeW1vcmUvcGVuY2lsL3ZpZXdzL2ltYWdlLmNvZmZlZSIsIi9Vc2Vycy9taW5vZGlzay93b3Jrc3BhY2UvZ2l0aHViL3RyeW1vcmUvcGVuY2lsL3ZpZXdzL21hc2stZmFjdG9yeS5jb2ZmZWUiLCIvVXNlcnMvbWlub2Rpc2svd29ya3NwYWNlL2dpdGh1Yi90cnltb3JlL3BlbmNpbC92aWV3cy9wcmV2ZW50YWJsZS5jb2ZmZWUiLCIvVXNlcnMvbWlub2Rpc2svd29ya3NwYWNlL2dpdGh1Yi90cnltb3JlL3BlbmNpbC92aWV3cy9yYWRpby5jb2ZmZWUiLCIvVXNlcnMvbWlub2Rpc2svd29ya3NwYWNlL2dpdGh1Yi90cnltb3JlL3BlbmNpbC92aWV3cy9zZWxlY3QuY29mZmVlIiwiL1VzZXJzL21pbm9kaXNrL3dvcmtzcGFjZS9naXRodWIvdHJ5bW9yZS9wZW5jaWwvdmlld3Mvc2VsZWN0YWJsZS5jb2ZmZWUiLCIvVXNlcnMvbWlub2Rpc2svd29ya3NwYWNlL2dpdGh1Yi90cnltb3JlL3BlbmNpbC92aWV3cy9zbGljZXIuY29mZmVlIiwiL1VzZXJzL21pbm9kaXNrL3dvcmtzcGFjZS9naXRodWIvdHJ5bW9yZS9wZW5jaWwvdmlld3Mvc3ByaXRlLmNvZmZlZSIsIi9Vc2Vycy9taW5vZGlzay93b3Jrc3BhY2UvZ2l0aHViL3RyeW1vcmUvcGVuY2lsL3ZpZXdzL3RhYi5jb2ZmZWUiLCIvVXNlcnMvbWlub2Rpc2svd29ya3NwYWNlL2dpdGh1Yi90cnltb3JlL3BlbmNpbC92aWV3cy90ZXh0LW92ZXJmbG93LmNvZmZlZSIsIi9Vc2Vycy9taW5vZGlzay93b3Jrc3BhY2UvZ2l0aHViL3RyeW1vcmUvcGVuY2lsL3ZpZXdzL3ZpZXcuY29mZmVlIl0sIm5hbWVzIjpb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QTs7QUFBQSxpQkFpREEsU0FBQSxHQUFXLFNBQUMsS0FBRCxHQUFBO0FBQ1QsUUFBQSxHQUFBO0FBQUEsSUFBQSxHQUFBLEdBQU0sTUFBTSxDQUFDLEtBQVAsQ0FBYSxNQUFBLENBQUEsQ0FBYixFQUF1QixLQUF2QixDQUFOLENBQUE7QUFBQSxJQUNBLEdBQUcsQ0FBQyxVQUFKLEdBQWlCLElBRGpCLENBQUE7QUFBQSxJQUVBLEdBQUcsQ0FBQyxPQUFKLEdBQWMsSUFBQyxDQUFBLE9BRmYsQ0FBQTtXQUdBLElBSlM7RUFBQSxDQWpEWCxDQUFBOztBQXVEQTtBQUFBOzs7O0tBdkRBOztBQUFBLGlCQTREQSxHQUFBLEdBQUssU0FBQSxHQUFBO0FBQ0gsUUFBQSxJQUFBO3FEQUFjLE1BQUEsQ0FBTyxJQUFQLEVBRFg7RUFBQSxDQTVETCxDQUFBOztjQUFBOztHQUZpQixPQTlCbkIsQ0FBQTs7QUFnR0E7QUFBQTs7Ozs7Ozs7O0dBaEdBOztBQUFBLE1BMEdNLENBQUMsRUFBRSxDQUFDLElBQVYsR0FBaUIsU0FBQSxHQUFBO1NBQUcsSUFBQyxDQUFBLElBQUQsQ0FBTSxNQUFOLEVBQUg7QUFBQSxDQTFHakIsQ0FBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJtb2R1bGUuZXhwb3J0cyA9IFxuICBtb2RlbHM6XG4gICAgYW5pbWF0ZTogcmVxdWlyZSBcIi4vbW9kZWxzL2FuaW1hdGVcIlxuICAgIFwiYmFja2dyb3Vucy1wb3NpdGlvblwiOiByZXF1aXJlIFwiLi9tb2RlbHMvYmFja2dyb3Vucy1wb3NpdGlvblwiXG4gICAgYnJvd3NlcjogcmVxdWlyZSBcIi4vbW9kZWxzL2Jyb3dzZXJcIlxuICAgIGVhc2luZzogcmVxdWlyZSBcIi4vbW9kZWxzL2Vhc2luZ1wiXG4gICAgZmxvdzogcmVxdWlyZSBcIi4vbW9kZWxzL2Zsb3dcIlxuICAgIFwiaW1hZ2UtZGF0YS1oZWxwZXJcIjogcmVxdWlyZSBcIi4vbW9kZWxzL2ltYWdlLWRhdGEtaGVscGVyXCJcbiAgICBpb3RhOiByZXF1aXJlIFwiLi9tb2RlbHMvaW90YVwiXG4gICAgbG9jYXRpb246IHJlcXVpcmUgXCIuL21vZGVscy9sb2NhdGlvblwiXG4gICAgb3M6IHJlcXVpcmUgXCIuL21vZGVscy9vc1wiXG4gICAgXCJxdWVyeS1zdHJpbmdcIjogcmVxdWlyZSBcIi4vbW9kZWxzL3F1ZXJ5LXN0cmluZ1wiXG4gICAgc25hcGhlbHBlcjogcmVxdWlyZSBcIi4vbW9kZWxzL3NuYXBoZWxwZXJcIlxuICAgIGdlb206XG4gICAgICBwb2ludDogcmVxdWlyZSBcIi4vbW9kZWxzL2dlb20vcG9pbnRcIlxuICAgICAgcmVjdDogcmVxdWlyZSBcIi4vbW9kZWxzL2dlb20vcmVjdFwiXG5cbiAgICBzbnM6XG4gICAgICBmYWNlYm9vazogcmVxdWlyZSBcIi4vbW9kZWxzL3Nucy9mYWNlYm9va1wiXG4gICAgICBcImdvb2dsZS1wbHVzXCI6IHJlcXVpcmUgXCIuL21vZGVscy9zbnMvZ29vZ2xlLXBsdXNcIlxuICAgICAgaGF0ZW5hOiByZXF1aXJlIFwiLi9tb2RlbHMvc25zL2hhdGVuYVwiXG4gICAgICBsaW5lOiByZXF1aXJlIFwiLi9tb2RlbHMvc25zL2xpbmVcIlxuICAgICAgcGludGVyZXN0OiByZXF1aXJlIFwiLi9tb2RlbHMvc25zL3BpbnRlcmVzdFwiXG4gICAgICB0d2l0dGVyOiByZXF1aXJlIFwiLi9tb2RlbHMvc25zL3R3aXR0ZXJcIlxuXG4gIHZpZXdzOlxuICAgIGFuY2hvcjogcmVxdWlyZSBcIi4vdmlld3MvYW5jaG9yXCJcbiAgICBicmVha3BvaW50OiByZXF1aXJlIFwiLi92aWV3cy9icmVha3BvaW50XCJcbiAgICBjaGVja2JveDogcmVxdWlyZSBcIi4vdmlld3MvY2hlY2tib3hcIlxuICAgIGRyYXdlcjogcmVxdWlyZSBcIi4vdmlld3MvZHJhd2VyXCJcbiAgICBpbWFnZTogcmVxdWlyZSBcIi4vdmlld3MvaW1hZ2VcIlxuICAgIFwibWFzay1mYWN0b3J5XCI6IHJlcXVpcmUgXCIuL3ZpZXdzL21hc2stZmFjdG9yeVwiXG4gICAgcHJldmVudGFibGU6IHJlcXVpcmUgXCIuL3ZpZXdzL3ByZXZlbnRhYmxlXCJcbiAgICByYWRpbzogcmVxdWlyZSBcIi4vdmlld3MvcmFkaW9cIlxuICAgIHNlbGVjdDogcmVxdWlyZSBcIi4vdmlld3Mvc2VsZWN0XCJcbiAgICBzZWxlY3RhYmxlOiByZXF1aXJlIFwiLi92aWV3cy9zZWxlY3RhYmxlXCJcbiAgICBzbGljZXI6IHJlcXVpcmUgXCIuL3ZpZXdzL3NsaWNlclwiXG4gICAgc3ByaXRlOiByZXF1aXJlIFwiLi92aWV3cy9zcHJpdGVcIlxuICAgIHRhYjogcmVxdWlyZSBcIi4vdmlld3MvdGFiXCJcbiAgICBcInRleHQtb3ZlcmZsb3dcIjogcmVxdWlyZSBcIi4vdmlld3MvdGV4dC1vdmVyZmxvd1wiXG4gICAgdmlldzogcmVxdWlyZSBcIi4vdmlld3Mvdmlld1wiXG4iLCIkID0gcmVxdWlyZSAnanF1ZXJ5J1xuXG5tb2R1bGUuZXhwb3J0cyA9XG5cbiAgYW5pbWF0ZTogKGZyb20sIHRvLCBvcHRzKSAtPlxuICAgICQgJzxkaXY+J1xuICAgIC5jc3NcbiAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnXG4gICAgICBsZWZ0OiBmcm9tXG4gICAgLmFuaW1hdGVcbiAgICAgIGxlZnQ6IHRvXG4gICAgLCBvcHRzXG4iLCJtb2R1bGUuZXhwb3J0cyA9XG5cbiAganF1ZXJpemU6ICgkKSAtPlxuICAgIHJldHVybiBpZiAkLmpxdWVyaXplZD9bJ2JhY2tncm91bmQtc2l6ZSddXG5cbiAgICByZXBsYWNlciA9XG4gICAgICBsZWZ0OiAnMHB4J1xuICAgICAgcmlnaHQ6ICcxMDAlJ1xuICAgICAgdG9wOiAnMHB4J1xuICAgICAgYm90dG9tOiAnMTAwJSdcbiAgICBub3JtYWxpemUgPSAodmFsKSAtPiByZXBsYWNlclt2YWxdIG9yIHZhbFxuICAgIGdldEJhY2tncm91bmRTaXplcyA9IChlbCkgLT5cbiAgICAgICQuY3NzKGVsLCAnYmFja2dyb3VuZC1wb3NpdGlvbicpLnNwbGl0IC9cXHMrLywgMlxuXG4gICAgZm9yIGRpcmVjdGlvbiwgaSBpbiBbJ3gnLCAneSddXG4gICAgICBkbyAoZGlyZWN0aW9uLCBpKSAtPlxuICAgICAgICAkLmNzc0hvb2tzW1wiYmFja2dyb3VuZC1wb3NpdGlvbi0je2RpcmVjdGlvbn1cIl0gPVxuICAgICAgICAkLmNzc0hvb2tzW1wiYmFja2dyb3VuZFBvc2l0aW9uI3tkaXJlY3Rpb24udG9VcHBlckNhc2UoKX1cIl0gPVxuICAgICAgICAgIGdldDogKGVsKSAtPiBnZXRCYWNrZ3JvdW5kU2l6ZXMoZWwpW2ldXG4gICAgICAgICAgc2V0OiAoZWwsIHZhbCkgLT5cbiAgICAgICAgICAgIHNpemVzID0gZ2V0QmFja2dyb3VuZFNpemVzIGVsXG4gICAgICAgICAgICBzaXplc1tpXSA9IG5vcm1hbGl6ZSB2YWxcbiAgICAgICAgICAgICQuc3R5bGUgZWwsICdiYWNrZ3JvdW5kLXBvc2l0aW9uJywgc2l6ZXMuam9pbiAnICdcbiAgICAgICAgJC5meC5zdGVwW1wiYmFja2dyb3VuZC1wb3NpdGlvbi0je2RpcmVjdGlvbn1cIl0gPVxuICAgICAgICAkLmZ4LnN0ZXBbXCJiYWNrZ3JvdW5kUG9zaXRpb24je2RpcmVjdGlvbi50b1VwcGVyQ2FzZSgpfVwiXSA9ICh7IGVsZW0sIHByb3AsIG5vdyB9KSAtPlxuICAgICAgICAgICQuc3R5bGUgZWxlbSwgcHJvcCwgbm93XG5cbiAgICAkLmpxdWVyaXplZCA/PSB7fVxuICAgICQuanF1ZXJpemVkWydiYWNrZ3JvdW5kLXNpemUnXSA9IHRydWVcbiIsIiMjI1xuQnJvd3NlciBwYXJzZXMgdXNlciBhZ2VudCBhbmQgZGV0ZXJtaW5lcyB0aGUgYnJvd3NlciB0eXBlIGFuZCB2ZXJzaW9uLlxuIyMjXG5cblVBID0gd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKVxuUl9DSFJPTUUgPSAvKGNocm9tZSlbIFxcL10oW1xcdy5dKykvXG5SX1dFQktJVCA9IC8od2Via2l0KVsgXFwvXShbXFx3Ll0rKS9cblJfT1BFUkEgPSAvKG9wZXJhKSg/Oi4qdmVyc2lvbnwpWyBcXC9dKFtcXHcuXSspL1xuUl9NU0lFID0gLyhtc2llKSAoW1xcdy5dKykvXG5SX01PWklMTEEgPSAvKG1vemlsbGEpKD86Lio/IHJ2OihbXFx3Ll0rKXwpL1xuXG5bIHt9LCBuYW1lLCB2ZXJzaW9uIF0gPSBSX0NIUk9NRS5leGVjKFVBKSBvclxuICAgICAgICAgICAgICAgICAgICAgICAgUl9XRUJLSVQuZXhlYyhVQSkgb3JcbiAgICAgICAgICAgICAgICAgICAgICAgIFJfT1BFUkEuZXhlYyhVQSkgb3JcbiAgICAgICAgICAgICAgICAgICAgICAgIFJfTVNJRS5leGVjKFVBKSBvclxuICAgICAgICAgICAgICAgICAgICAgICAgVUEuaW5kZXhPZihcImNvbXBhdGlibGVcIikgPCAwIGFuZCBSX01PWklMTEEuZXhlYyhVQSkgb3JcbiAgICAgICAgICAgICAgICAgICAgICAgIFtdXG5cbmJyb3dzZXIgPSB7fVxuaWYgbmFtZVxuICBicm93c2VyW25hbWVdID0gdHJ1ZVxuICBicm93c2VyLnZlcnNpb24gPSB2ZXJzaW9uXG4gIG51bWJlciA9IHBhcnNlSW50IGJyb3dzZXIudmVyc2lvbiwgMTBcbiAgdW5sZXNzIGlzTmFOIG51bWJlclxuICAgIGJyb3dzZXIudmVyc2lvbk51bWJlciA9IG51bWJlclxuaWYgYnJvd3Nlci5jaHJvbWVcbiAgYnJvd3Nlci53ZWJraXQgPSB0cnVlXG5lbHNlIGlmIGJyb3dzZXIud2Via2l0XG4gIGJyb3dzZXIuc2FmYXJpID0gdHJ1ZVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJyb3dzZXJcbiIsIntcbiAgUElcbiAgYWJzXG4gIHBvd1xuICBzcXJ0XG4gIHNpblxuICBjb3NcbiAgYXNpblxuICByb3VuZFxufSA9IE1hdGhcblxuUElfMiA9IFBJIC8gMlxuXG5yb3VuZFNtYWxsID0gKHZhbCkgLT5cbiMgICAgcmV0dXJuIDAgaWYgdmFsIGlzIDBcbiMgICAgcmV0dXJuIHZhbCBpZiB2YWwgPj0gMWUtNiBvciB2YWwgPD0gLTFlLTZcbiMgICAgcmV0dXJuIDFlLTYgaWYgdmFsID49IDVlLTdcbiMgICAgcmV0dXJuIC0xZS02IGlmIHZhbCA8PSAtNWUtN1xuIyAgICAwXG4gIHJldHVybiB2YWwgaWYgdmFsID49IDFlLTZcbiAgcm91bmQodmFsICogMTAwMDAwMCkgLyAxMDAwMDAwXG5cbmZhY3RvcnkgPVxuXG4gIGxpbmVhcjogLT5cbiAgICAoeCwgdCwgYiwgYywgZCkgLT5cbiAgICAgIGMgKiB0IC8gZCArIGJcblxuICBlYXNlSW5CYWNrOiAocykgLT5cbiAgICBzID0gcyBvciAxLjcwMTU4XG4gICAgKHgsIHQsIGIsIGMsIGQpIC0+XG4gICAgICBjICogKHQgLz0gZCkgKiB0ICogKChzICsgMSkgKiB0IC0gcykgKyBiXG5cbiAgZWFzZUluT3V0QmFjazogKHMpIC0+XG4gICAgcyA9IHMgb3IgMS43MDE1OFxuICAgICh4LCB0LCBiLCBjLCBkKSAtPlxuICAgICAgcmV0dXJuIGMgLyAyICogKHQgKiB0ICogKCgocyAqIDEuNTI1KSArIDEpICogdCAtIHMgKiAxLjUyNSkpICsgYiAgaWYgKHQgLz0gZCAvIDIpIDwgMVxuICAgICAgYyAvIDIgKiAoKHQgLT0gMikgKiB0ICogKCgocyAqIDEuNTI1KSArIDEpICogdCArIHMgKiAxLjUyNSkgKyAyKSArIGJcblxuICBlYXNlT3V0QmFjazogKHMpIC0+XG4gICAgcyA9IHMgb3IgMS43MDE1OFxuICAgICh4LCB0LCBiLCBjLCBkKSAtPlxuICAgICAgYyAqICgodCA9IHQgLyBkIC0gMSkgKiB0ICogKChzICsgMSkgKiB0ICsgcykgKyAxKSArIGJcblxuICBlYXNlT3V0SW5CYWNrOiAocykgLT5cbiAgICBzID0gcyBvciAxLjcwMTU4XG4gICAgKHgsIHQsIGIsIGMsIGQpIC0+XG4gICAgICByZXR1cm4gKGMgLyAyKSAqICgodCA9ICh0ICogMikgLyBkIC0gMSkgKiB0ICogKChzICsgMSkgKiB0ICsgcykgKyAxKSArIGIgIGlmIHQgPCBkIC8gMlxuICAgICAgKGMgLyAyKSAqICh0ID0gKHQgKiAyIC0gZCkgLyBkKSAqIHQgKiAoKHMgKyAxKSAqIHQgLSBzKSArIChiICsgYyAvIDIpXG5cbiAgZWFzZUluQm91bmNlOiAtPlxuICAgICh4LCB0LCBiLCBjLCBkKSAtPlxuICAgICAgcmV0dXJuIGMgLSAoYyAqICg3LjU2MjUgKiB0ICogdCkpICsgYiAgaWYgKHQgPSAoZCAtIHQpIC8gZCkgPCAwLjM2MzYzNjM2MzYzNjM2MzY1XG4gICAgICByZXR1cm4gYyAtIChjICogKDcuNTYyNSAqICh0IC09IDAuNTQ1NDU0NTQ1NDU0NTQ1NCkgKiB0ICsgMC43NSkpICsgYiAgaWYgdCA8IDAuNzI3MjcyNzI3MjcyNzI3M1xuICAgICAgcmV0dXJuIGMgLSAoYyAqICg3LjU2MjUgKiAodCAtPSAwLjgxODE4MTgxODE4MTgxODIpICogdCArIDAuOTM3NSkpICsgYiAgaWYgdCA8IDAuOTA5MDkwOTA5MDkwOTA5MVxuICAgICAgYyAtIChjICogKDcuNTYyNSAqICh0IC09IDAuOTU0NTQ1NDU0NTQ1NDU0NikgKiB0ICsgMC45ODQzNzUpKSArIGJcblxuICBlYXNlSW5PdXRCb3VuY2U6IC0+XG4gICAgKHgsIHQsIGIsIGMsIGQpIC0+XG4gICAgICBpZiB0IDwgZCAvIDJcbiAgICAgICAgcmV0dXJuIChjIC0gKGMgKiAoNy41NjI1ICogdCAqIHQpKSkgKiAwLjUgKyBiICBpZiAodCA9IChkIC0gdCAqIDIpIC8gZCkgPCAwLjM2MzYzNjM2MzYzNjM2MzY1XG4gICAgICAgIHJldHVybiAoYyAtIChjICogKDcuNTYyNSAqICh0IC09IDAuNTQ1NDU0NTQ1NDU0NTQ1NCkgKiB0ICsgMC43NSkpKSAqIDAuNSArIGIgIGlmIHQgPCAwLjcyNzI3MjcyNzI3MjcyNzNcbiAgICAgICAgcmV0dXJuIChjIC0gKGMgKiAoNy41NjI1ICogKHQgLT0gMC44MTgxODE4MTgxODE4MTgyKSAqIHQgKyAwLjkzNzUpKSkgKiAwLjUgKyBiICBpZiB0IDwgMC45MDkwOTA5MDkwOTA5MDkxXG4gICAgICAgIChjIC0gKGMgKiAoNy41NjI1ICogKHQgLT0gMC45NTQ1NDU0NTQ1NDU0NTQ2KSAqIHQgKyAwLjk4NDM3NSkpKSAqIDAuNSArIGJcbiAgICAgIGVsc2VcbiAgICAgICAgcmV0dXJuIChjICogKDcuNTYyNSAqIHQgKiB0KSkgKiAwLjUgKyBjICogMC41ICsgYiAgaWYgKHQgPSAodCAqIDIgLSBkKSAvIGQpIDwgMC4zNjM2MzYzNjM2MzYzNjM2NVxuICAgICAgICByZXR1cm4gKGMgKiAoNy41NjI1ICogKHQgLT0gMC41NDU0NTQ1NDU0NTQ1NDU0KSAqIHQgKyAwLjc1KSkgKiAwLjUgKyBjICogMC41ICsgYiAgaWYgdCA8IDAuNzI3MjcyNzI3MjcyNzI3M1xuICAgICAgICByZXR1cm4gKGMgKiAoNy41NjI1ICogKHQgLT0gMC44MTgxODE4MTgxODE4MTgyKSAqIHQgKyAwLjkzNzUpKSAqIDAuNSArIGMgKiAwLjUgKyBiICBpZiB0IDwgMC45MDkwOTA5MDkwOTA5MDkxXG4gICAgICAgIChjICogKDcuNTYyNSAqICh0IC09IDAuOTU0NTQ1NDU0NTQ1NDU0NikgKiB0ICsgMC45ODQzNzUpKSAqIDAuNSArIGMgKiAwLjUgKyBiXG5cbiAgZWFzZU91dEJvdW5jZTogLT5cbiAgICAoeCwgdCwgYiwgYywgZCkgLT5cbiAgICAgIHJldHVybiBjICogKDcuNTYyNSAqIHQgKiB0KSArIGIgIGlmICh0IC89IGQpIDwgMC4zNjM2MzYzNjM2MzYzNjM2NVxuICAgICAgcmV0dXJuIGMgKiAoNy41NjI1ICogKHQgLT0gMC41NDU0NTQ1NDU0NTQ1NDU0KSAqIHQgKyAwLjc1KSArIGIgIGlmIHQgPCAwLjcyNzI3MjcyNzI3MjcyNzNcbiAgICAgIHJldHVybiBjICogKDcuNTYyNSAqICh0IC09IDAuODE4MTgxODE4MTgxODE4MikgKiB0ICsgMC45Mzc1KSArIGIgIGlmIHQgPCAwLjkwOTA5MDkwOTA5MDkwOTFcbiAgICAgIGMgKiAoNy41NjI1ICogKHQgLT0gMC45NTQ1NDU0NTQ1NDU0NTQ2KSAqIHQgKyAwLjk4NDM3NSkgKyBiXG5cbiAgZWFzZU91dEluQm91bmNlOiAtPlxuICAgICh4LCB0LCBiLCBjLCBkKSAtPlxuICAgICAgaWYgdCA8IGQgLyAyXG4gICAgICAgIHJldHVybiAoYyAvIDIpICogKDcuNTYyNSAqIHQgKiB0KSArIGIgIGlmICh0ID0gKHQgKiAyKSAvIGQpIDwgMC4zNjM2MzYzNjM2MzYzNjM2NVxuICAgICAgICByZXR1cm4gKGMgLyAyKSAqICg3LjU2MjUgKiAodCAtPSAwLjU0NTQ1NDU0NTQ1NDU0NTQpICogdCArIDAuNzUpICsgYiAgaWYgdCA8IDAuNzI3MjcyNzI3MjcyNzI3M1xuICAgICAgICByZXR1cm4gKGMgLyAyKSAqICg3LjU2MjUgKiAodCAtPSAwLjgxODE4MTgxODE4MTgxODIpICogdCArIDAuOTM3NSkgKyBiICBpZiB0IDwgMC45MDkwOTA5MDkwOTA5MDkxXG4gICAgICAgIChjIC8gMikgKiAoNy41NjI1ICogKHQgLT0gMC45NTQ1NDU0NTQ1NDU0NTQ2KSAqIHQgKyAwLjk4NDM3NSkgKyBiXG4gICAgICBlbHNlXG4gICAgICAgIHJldHVybiAoYyAvIDIpIC0gKChjIC8gMikgKiAoNy41NjI1ICogdCAqIHQpKSArIChiICsgYyAvIDIpICBpZiAodCA9IChkIC0gKHQgKiAyIC0gZCkpIC8gZCkgPCAwLjM2MzYzNjM2MzYzNjM2MzY1XG4gICAgICAgIHJldHVybiAoYyAvIDIpIC0gKChjIC8gMikgKiAoNy41NjI1ICogKHQgLT0gMC41NDU0NTQ1NDU0NTQ1NDU0KSAqIHQgKyAwLjc1KSkgKyAoYiArIGMgLyAyKSAgaWYgdCA8IDAuNzI3MjcyNzI3MjcyNzI3M1xuICAgICAgICByZXR1cm4gKGMgLyAyKSAtICgoYyAvIDIpICogKDcuNTYyNSAqICh0IC09IDAuODE4MTgxODE4MTgxODE4MikgKiB0ICsgMC45Mzc1KSkgKyAoYiArIGMgLyAyKSAgaWYgdCA8IDAuOTA5MDkwOTA5MDkwOTA5MVxuICAgICAgICAoYyAvIDIpIC0gKChjIC8gMikgKiAoNy41NjI1ICogKHQgLT0gMC45NTQ1NDU0NTQ1NDU0NTQ2KSAqIHQgKyAwLjk4NDM3NSkpICsgKGIgKyBjIC8gMilcblxuICBlYXNlSW5DaXJjOiAtPlxuICAgICh4LCB0LCBiLCBjLCBkKSAtPlxuICAgICAgLWMgKiAoc3FydCgxIC0gKHQgLz0gZCkgKiB0KSAtIDEpICsgYlxuXG4gIGVhc2VJbk91dENpcmM6IC0+XG4gICAgKHgsIHQsIGIsIGMsIGQpIC0+XG4gICAgICByZXR1cm4gLWMgLyAyICogKHNxcnQoMSAtIHQgKiB0KSAtIDEpICsgYiAgaWYgKHQgLz0gZCAvIDIpIDwgMVxuICAgICAgYyAvIDIgKiAoc3FydCgxIC0gKHQgLT0gMikgKiB0KSArIDEpICsgYlxuXG4gIGVhc2VPdXRDaXJjOiAtPlxuICAgICh4LCB0LCBiLCBjLCBkKSAtPlxuICAgICAgYyAqIHNxcnQoMSAtICh0ID0gdCAvIGQgLSAxKSAqIHQpICsgYlxuXG4gIGVhc2VPdXRJbkNpcmM6IC0+XG4gICAgKHgsIHQsIGIsIGMsIGQpIC0+XG4gICAgICByZXR1cm4gKGMgLyAyKSAqIHNxcnQoMSAtICh0ID0gKHQgKiAyKSAvIGQgLSAxKSAqIHQpICsgYiAgaWYgdCA8IGQgLyAyXG4gICAgICAtKGMgLyAyKSAqIChzcXJ0KDEgLSAodCA9ICh0ICogMiAtIGQpIC8gZCkgKiB0KSAtIDEpICsgKGIgKyBjIC8gMilcblxuICBlYXNlSW5DdWJpYzogLT5cbiAgICAoeCwgdCwgYiwgYywgZCkgLT5cbiAgICAgIGMgKiAodCAvPSBkKSAqIHQgKiB0ICsgYlxuXG4gIGVhc2VJbk91dEN1YmljOiAtPlxuICAgICh4LCB0LCBiLCBjLCBkKSAtPlxuICAgICAgKGlmICgodCAvPSBkIC8gMikgPCAxKSB0aGVuIGMgLyAyICogdCAqIHQgKiB0ICsgYiBlbHNlIGMgLyAyICogKCh0IC09IDIpICogdCAqIHQgKyAyKSArIGIpXG5cbiAgZWFzZU91dEN1YmljOiAtPlxuICAgICh4LCB0LCBiLCBjLCBkKSAtPlxuICAgICAgYyAqICgodCA9IHQgLyBkIC0gMSkgKiB0ICogdCArIDEpICsgYlxuXG4gIGVhc2VPdXRJbkN1YmljOiAtPlxuICAgICh4LCB0LCBiLCBjLCBkKSAtPlxuICAgICAgKGlmIHQgPCBkIC8gMiB0aGVuIGMgLyAyICogKCh0ID0gdCAqIDIgLyBkIC0gMSkgKiB0ICogdCArIDEpICsgYiBlbHNlIGMgLyAyICogKHQgPSAodCAqIDIgLSBkKSAvIGQpICogdCAqIHQgKyBiICsgYyAvIDIpXG5cbiAgZWFzZUluRWxhc3RpYzogKGEsIHApIC0+XG4gICAgYSA9IGEgb3IgMFxuICAgIHAgPSBwIG9yIDBcbiAgICAoeCwgdCwgYiwgYywgZCkgLT5cbiAgICAgIHMgPSB1bmRlZmluZWRcbiAgICAgIHJldHVybiBiICBpZiB0IGlzIDBcbiAgICAgIHJldHVybiBiICsgYyAgaWYgKHQgLz0gZCkgaXMgMVxuICAgICAgcCA9IGQgKiAwLjMgIHVubGVzcyBwXG4gICAgICBpZiBub3QgYSBvciBhIDwgYWJzKGMpXG4gICAgICAgIGEgPSBjXG4gICAgICAgIHMgPSBwIC8gNFxuICAgICAgZWxzZVxuICAgICAgICBzID0gcCAvICgyICogUEkpICogYXNpbihjIC8gYSlcbiAgICAgIC0oYSAqIHBvdygyLCAxMCAqICh0IC09IDEpKSAqIHNpbigodCAqIGQgLSBzKSAqICgyICogUEkpIC8gcCkpICsgYlxuXG4gIGVhc2VJbk91dEVsYXN0aWM6IChhLCBwKSAtPlxuICAgIGEgPSBhIG9yIDBcbiAgICBwID0gcCBvciAwXG4gICAgKHgsIHQsIGIsIGMsIGQpIC0+XG4gICAgICBzID0gdW5kZWZpbmVkXG4gICAgICByZXR1cm4gYiAgaWYgdCBpcyAwXG4gICAgICByZXR1cm4gYiArIGMgIGlmICh0IC89IGQgLyAyKSBpcyAyXG4gICAgICBwID0gZCAqICgwLjMgKiAxLjUpICB1bmxlc3MgcFxuICAgICAgaWYgbm90IGEgb3IgYSA8IGFicyhjKVxuICAgICAgICBhID0gY1xuICAgICAgICBzID0gcCAvIDRcbiAgICAgIGVsc2VcbiAgICAgICAgcyA9IHAgLyAoMiAqIFBJKSAqIGFzaW4oYyAvIGEpXG4gICAgICByZXR1cm4gLTAuNSAqIChhICogcG93KDIsIDEwICogKHQgLT0gMSkpICogc2luKCh0ICogZCAtIHMpICogKDIgKiBQSSkgLyBwKSkgKyBiICBpZiB0IDwgMVxuICAgICAgYSAqIHBvdygyLCAtMTAgKiAodCAtPSAxKSkgKiBzaW4oKHQgKiBkIC0gcykgKiAoMiAqIFBJKSAvIHApICogMC41ICsgYyArIGJcblxuICBlYXNlT3V0RWxhc3RpYzogKGEsIHApIC0+XG4gICAgYSA9IGEgb3IgMFxuICAgIHAgPSBwIG9yIDBcbiAgICAoeCwgdCwgYiwgYywgZCkgLT5cbiAgICAgIHMgPSB1bmRlZmluZWRcbiAgICAgIHJldHVybiBiICBpZiB0IGlzIDBcbiAgICAgIHJldHVybiBiICsgYyAgaWYgKHQgLz0gZCkgaXMgMVxuICAgICAgcCA9IGQgKiAwLjMgIHVubGVzcyBwXG4gICAgICBpZiBub3QgYSBvciBhIDwgYWJzKGMpXG4gICAgICAgIGEgPSBjXG4gICAgICAgIHMgPSBwIC8gNFxuICAgICAgZWxzZVxuICAgICAgICBzID0gcCAvICgyICogUEkpICogYXNpbihjIC8gYSlcbiAgICAgIGEgKiBwb3coMiwgLTEwICogdCkgKiBzaW4oKHQgKiBkIC0gcykgKiAoMiAqIFBJKSAvIHApICsgYyArIGJcblxuICBlYXNlT3V0SW5FbGFzdGljOiAoYSwgcCkgLT5cbiAgICBhID0gYSBvciAwXG4gICAgcCA9IHAgb3IgMFxuICAgICh4LCB0LCBiLCBjLCBkKSAtPlxuICAgICAgcyA9IHVuZGVmaW5lZFxuICAgICAgYyAvPSAyXG4gICAgICBpZiB0IDwgZCAvIDJcbiAgICAgICAgcmV0dXJuIGIgIGlmICh0ICo9IDIpIGlzIDBcbiAgICAgICAgcmV0dXJuIGIgKyBjICBpZiAodCAvPSBkKSBpcyAxXG4gICAgICAgIHAgPSBkICogMC4zICB1bmxlc3MgcFxuICAgICAgICBpZiBub3QgYSBvciBhIDwgYWJzKGMpXG4gICAgICAgICAgYSA9IGNcbiAgICAgICAgICBzID0gcCAvIDRcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHMgPSBwIC8gKDIgKiBQSSkgKiBhc2luKGMgLyBhKVxuICAgICAgICBhICogcG93KDIsIC0xMCAqIHQpICogc2luKCh0ICogZCAtIHMpICogKDIgKiBQSSkgLyBwKSArIGMgKyBiXG4gICAgICBlbHNlXG4gICAgICAgIHJldHVybiAoYiArIGMpICBpZiAodCA9IHQgKiAyIC0gZCkgaXMgMFxuICAgICAgICByZXR1cm4gKGIgKyBjKSArIGMgIGlmICh0IC89IGQpIGlzIDFcbiAgICAgICAgcCA9IGQgKiAwLjMgIHVubGVzcyBwXG4gICAgICAgIGlmIG5vdCBhIG9yIGEgPCBhYnMoYylcbiAgICAgICAgICBhID0gY1xuICAgICAgICAgIHMgPSBwIC8gNFxuICAgICAgICBlbHNlXG4gICAgICAgICAgcyA9IHAgLyAoMiAqIFBJKSAqIGFzaW4oYyAvIGEpXG4gICAgICAgIC0oYSAqIHBvdygyLCAxMCAqICh0IC09IDEpKSAqIHNpbigodCAqIGQgLSBzKSAqICgyICogUEkpIC8gcCkpICsgKGIgKyBjKVxuXG4gIGVhc2VJbkV4cG86IC0+XG4gICAgKHgsIHQsIGIsIGMsIGQpIC0+XG4gICAgICAoaWYgdCBpcyAwIHRoZW4gYiBlbHNlIGMgKiBwb3coMiwgMTAgKiAodCAvIGQgLSAxKSkgKyBiKVxuXG4gIGVhc2VJbk91dEV4cG86IC0+XG4gICAgKHgsIHQsIGIsIGMsIGQpIC0+XG4gICAgICByZXR1cm4gYiAgaWYgdCBpcyAwXG4gICAgICByZXR1cm4gYiArIGMgIGlmIHQgaXMgZFxuICAgICAgcmV0dXJuIGMgLyAyICogcG93KDIsIDEwICogKHQgLSAxKSkgKyBiICBpZiAodCAvPSBkIC8gMikgPCAxXG4gICAgICBjIC8gMiAqICgyIC0gcG93KDIsIC0xMCAqIC0tdCkpICsgYlxuXG4gIGVhc2VPdXRFeHBvOiAtPlxuICAgICh4LCB0LCBiLCBjLCBkKSAtPlxuICAgICAgcmV0dXJuIGIgKyBjICBpZiB0IGlzIGRcbiAgICAgIGMgKiAoMSAtIHBvdygyLCAtMTAgKiB0IC8gZCkpICsgYlxuXG4gIGVhc2VPdXRJbkV4cG86IC0+XG4gICAgKHgsIHQsIGIsIGMsIGQpIC0+XG4gICAgICByZXR1cm4gKGlmIHQgKiAyIGlzIGQgdGhlbiBiICsgYyAvIDIgZWxzZSBjIC8gMiAqICgxIC0gcG93KDIsIC0xMCAqIHQgKiAyIC8gZCkpICsgYikgIGlmIHQgPCBkIC8gMlxuICAgICAgKGlmICh0ICogMiAtIGQpIGlzIDAgdGhlbiBiICsgYyAvIDIgZWxzZSBjIC8gMiAqIHBvdygyLCAxMCAqICgodCAqIDIgLSBkKSAvIGQgLSAxKSkgKyBiICsgYyAvIDIpXG5cbiAgZWFzZUluUXVhZDogLT5cbiAgICAoeCwgdCwgYiwgYywgZCkgLT5cbiAgICAgIGMgKiAodCAvPSBkKSAqIHQgKyBiXG5cbiAgZWFzZUluT3V0UXVhZDogLT5cbiAgICAoeCwgdCwgYiwgYywgZCkgLT5cbiAgICAgIHJldHVybiBjIC8gMiAqIHQgKiB0ICsgYiAgaWYgKHQgLz0gZCAvIDIpIDwgMVxuICAgICAgLWMgLyAyICogKCgtLXQpICogKHQgLSAyKSAtIDEpICsgYlxuXG4gIGVhc2VPdXRRdWFkOiAtPlxuICAgICh4LCB0LCBiLCBjLCBkKSAtPlxuICAgICAgLWMgKiAodCAvPSBkKSAqICh0IC0gMikgKyBiXG5cbiAgZWFzZU91dEluUXVhZDogLT5cbiAgICAoeCwgdCwgYiwgYywgZCkgLT5cbiAgICAgIHJldHVybiAtKGMgLyAyKSAqICh0ID0gKHQgKiAyIC8gZCkpICogKHQgLSAyKSArIGIgIGlmIHQgPCBkIC8gMlxuICAgICAgKGMgLyAyKSAqICh0ID0gKHQgKiAyIC0gZCkgLyBkKSAqIHQgKyAoYiArIGMgLyAyKVxuXG4gIGVhc2VJblF1YXJ0OiAtPlxuICAgICh4LCB0LCBiLCBjLCBkKSAtPlxuICAgICAgYyAqICh0IC89IGQpICogdCAqIHQgKiB0ICsgYlxuXG4gIGVhc2VJbk91dFF1YXJ0OiAtPlxuICAgICh4LCB0LCBiLCBjLCBkKSAtPlxuICAgICAgcmV0dXJuIGMgLyAyICogdCAqIHQgKiB0ICogdCArIGIgIGlmICh0IC89IGQgLyAyKSA8IDFcbiAgICAgIC1jIC8gMiAqICgodCAtPSAyKSAqIHQgKiB0ICogdCAtIDIpICsgYlxuXG4gIGVhc2VPdXRRdWFydDogLT5cbiAgICAoeCwgdCwgYiwgYywgZCkgLT5cbiAgICAgIC1jICogKCh0ID0gdCAvIGQgLSAxKSAqIHQgKiB0ICogdCAtIDEpICsgYlxuXG4gIGVhc2VPdXRJblF1YXJ0OiAtPlxuICAgICh4LCB0LCBiLCBjLCBkKSAtPlxuICAgICAgcmV0dXJuIC0oYyAvIDIpICogKCh0ID0gKHQgKiAyKSAvIGQgLSAxKSAqIHQgKiB0ICogdCAtIDEpICsgYiAgaWYgdCA8IGQgLyAyXG4gICAgICAoYyAvIDIpICogKHQgPSAodCAqIDIgLSBkKSAvIGQpICogdCAqIHQgKiB0ICsgKGIgKyBjIC8gMilcblxuICBlYXNlSW5RdWludDogLT5cbiAgICAoeCwgdCwgYiwgYywgZCkgLT5cbiAgICAgIGMgKiAodCAvPSBkKSAqIHQgKiB0ICogdCAqIHQgKyBiXG5cbiAgZWFzZUluT3V0UXVpbnQ6IC0+XG4gICAgKHgsIHQsIGIsIGMsIGQpIC0+XG4gICAgICByZXR1cm4gYyAvIDIgKiB0ICogdCAqIHQgKiB0ICogdCArIGIgIGlmICh0IC89IGQgLyAyKSA8IDFcbiAgICAgIGMgLyAyICogKCh0IC09IDIpICogdCAqIHQgKiB0ICogdCArIDIpICsgYlxuXG4gIGVhc2VPdXRRdWludDogLT5cbiAgICAoeCwgdCwgYiwgYywgZCkgLT5cbiAgICAgIGMgKiAoKHQgPSB0IC8gZCAtIDEpICogdCAqIHQgKiB0ICogdCArIDEpICsgYlxuXG4gIGVhc2VPdXRJblF1aW50OiAtPlxuICAgICh4LCB0LCBiLCBjLCBkKSAtPlxuICAgICAgcmV0dXJuIChjIC8gMikgKiAoKHQgPSAodCAqIDIpIC8gZCAtIDEpICogdCAqIHQgKiB0ICogdCArIDEpICsgYiAgaWYgdCA8IGQgLyAyXG4gICAgICAoYyAvIDIpICogKHQgPSAodCAqIDIgLSBkKSAvIGQpICogdCAqIHQgKiB0ICogdCArIChiICsgYyAvIDIpXG5cbiAgZWFzZUluU2luZTogLT5cbiAgICAoeCwgdCwgYiwgYywgZCkgLT5cbiAgICAgIC1jICogY29zKHQgLyBkICogKFBJXzIpKSArIGMgKyBiXG5cbiAgZWFzZUluT3V0U2luZTogLT5cbiAgICAoeCwgdCwgYiwgYywgZCkgLT5cbiAgICAgIC1jIC8gMiAqIChjb3MoUEkgKiB0IC8gZCkgLSAxKSArIGJcblxuICBlYXNlT3V0U2luZTogLT5cbiAgICAoeCwgdCwgYiwgYywgZCkgLT5cbiAgICAgIGMgKiBzaW4odCAvIGQgKiAoUElfMikpICsgYlxuXG4gIGVhc2VPdXRJblNpbmU6IC0+XG4gICAgKHgsIHQsIGIsIGMsIGQpIC0+XG4gICAgICByZXR1cm4gKGMgLyAyKSAqIHNpbigodCAqIDIpIC8gZCAqIChQSV8yKSkgKyBiICBpZiB0IDwgZCAvIDJcbiAgICAgIC0oYyAvIDIpICogY29zKCh0ICogMiAtIGQpIC8gZCAqIChQSV8yKSkgKyAoYyAvIDIpICsgKGIgKyBjIC8gMilcblxubW9kdWxlLmV4cG9ydHMgPVxuXG4gIGZhY3Rvcnk6IGZhY3RvcnlcblxuICBqcXVlcml6ZTogKCQpIC0+XG4gICAgcmV0dXJuIGlmICQuanF1ZXJpemVkP1snZWFzaW5nJ11cblxuICAgICQuZXh0ZW5kICQuZWFzaW5nLCBkbyAtPlxuICAgICAgZWFzaW5nID0ge31cbiAgICAgIGZvciBuYW1lLCBmdW5jIG9mIGZhY3RvcnlcbiAgICAgICAgZWFzZSA9IGZ1bmMoKVxuICAgICAgICBkbyAoZWFzZSkgLT5cbiAgICAgICAgICBlYXNpbmdbbmFtZV0gPSAtPlxuICAgICAgICAgICAgcm91bmRTbWFsbCBlYXNlLmFwcGx5IEAsIGFyZ3VtZW50c1xuICAgICAgZWFzaW5nLmVhc2UgPSBlYXNpbmcuZWFzZU91dFF1YWRcbiAgICAgIGVhc2luZ1xuXG4gICAgJC5qcXVlcml6ZWQgPz0ge31cbiAgICAkLmpxdWVyaXplZFsnZWFzaW5nJ10gPSB0cnVlXG4iLCIkID0gcmVxdWlyZSAnanF1ZXJ5J1xuXG5mbG93ID1cblxuICBzZXJpYWw6IChjYnMpIC0+XG4gICAgZGZkID0gbnVsbFxuICAgIGZvciBjYiBpbiBjYnNcbiAgICAgIHVubGVzcyBkZmQ/XG4gICAgICAgIGRmZCA9IGNiKClcbiAgICAgIGVsc2VcbiAgICAgICAgZGZkID0gZGZkLnRoZW4gY2JcbiAgICBkZmRcblxuICBwYXJhbGxlbDogKGNicykgLT5cbiAgICBkID0gJC5EZWZlcnJlZCgpXG4gICAgZGZkcyA9IChjYigpIGZvciBjYiBpbiBjYnMpXG4gICAgJC53aGVuLmFwcGx5ICQsIGRmZHNcbiAgICAuZG9uZSBpZiBkZmRzLmxlbmd0aCA8PSAxXG4gICAgICAocmV0cy4uLikgLT4gZC5yZXNvbHZlIFsgcmV0cyBdXG4gICAgZWxzZVxuICAgICAgKHJldHMuLi4pIC0+IGQucmVzb2x2ZSByZXRzXG4gICAgLmZhaWwgZC5yZWplY3RcbiAgICBkLnByb21pc2UoKVxuXG4gIHdhaXQ6IChtcykgLT5cbiAgICBkZmQgPSAkLkRlZmVycmVkKClcbiAgICBzZXRUaW1lb3V0IC0+XG4gICAgICBkZmQucmVzb2x2ZSgpXG4gICAgLCBtc1xuICAgIGRmZC5wcm9taXNlKClcblxuXG5tb2R1bGUuZXhwb3J0cyA9ICQuZXh0ZW5kIGZsb3csXG4gIGpxdWVyeWl6ZTogKCQpIC0+XG4gICAgJC5leHRlbmQgZmxvd1xuIiwie2lzQXJndW1lbnRzLCBpc0FycmF5LCBpc09iamVjdH0gPSByZXF1aXJlICdsb2Rhc2gnXG57c3FydCwgY29zLCBhdGFuMn0gPSBNYXRoXG5cblxuIyMjXG7jg53jgqTjg7Pjg4jjgq/jg6njgrnjgafjgZnjgIJcbuS6jOasoeWFg+OBruebtOS6pOW6p+aomeezu+OCkuaJseOBhOOBvuOBmeOAglxuIyMjXG5tb2R1bGUuZXhwb3J0cyA9XG5jbGFzcyBQb2ludFxuXG4gIEBsZXJwOiAocHQxLCBwdDIsIHJhdGlvKSAtPlxuICAgIHZlY3RvciA9IHB0Mi5zdWIgcHQxXG4gICAgcHQxLmFkZCB2ZWN0b3IubXVsIHJhdGlvXG5cbiAgQGRpc3RhbmNlOiAocHQxLCBwdDIpIC0+XG4gICAgcHQyLnN1YihwdDEpLmRpc3RhbmNlKClcblxuICBAcG9zaXRpb25Ub1BvaW50OiAobGVmdCwgdG9wKSAtPlxuICAgIGlmIGxlZnQ/IGFuZCBsZWZ0LmxlZnQ/IGFuZCBsZWZ0LnRvcD9cbiAgICAgIHsgbGVmdCwgdG9wIH0gPSBsZWZ0XG4gICAgbmV3IFBvaW50IGxlZnQsIHRvcFxuXG4gIEBhcmd1bWVudHNUb0FycmF5OiAoYXJncykgLT5cbiAgICBlbGVtcyA9IHN3aXRjaCBhcmdzLmxlbmd0aFxuICAgICAgd2hlbiAwXG4gICAgICAgIFtdXG4gICAgICB3aGVuIDFcbiAgICAgICAgaWYgaXNBcmd1bWVudHMgYXJnc1swXSBvciBpc0FycmF5IGFyZ3NbMF1cbiAgICAgICAgICBhcmdzWzBdXG4gICAgICAgIGVsc2UgaWYgaXNPYmplY3QgYXJnc1swXVxuICAgICAgICAgIFthcmdzWzBdLngsIGFyZ3NbMF0ueV1cbiAgICAgICAgZWxzZVxuICAgICAgICAgIFthcmdzWzBdXVxuICAgICAgZWxzZVxuICAgICAgICBhcmdzXG5cbiAgICBmb3IgaSBpbiBbMC4uMV1cbiAgICAgIGVsZW1zW2ldID0gaWYgKHZhbCA9IGVsZW1zW2ldKT9cbiAgICAgICAgcGFyc2VGbG9hdCB2YWxcbiAgICAgIGVsc2VcbiAgICAgICAgMFxuICAgIGVsZW1zXG5cblxuICAjIyNcbiAgYGxlZnRgLGB0b3Bg44GL44KJ5oiQ44KL44Kq44OW44K444Kn44Kv44OI44GL44KJYFBvaW50YOOCpOODs+OCueOCv+ODs+OCueOCkueUn+aIkOOBl+OBvuOBmeOAglxuICBAcGFyYW0gW09iamVjdF0gcG9zaXRpb24g5bqn5qiZ44Kq44OW44K444Kn44Kv44OI44Gn44GZ44CCXG4gIEBvcHRpb24gcG9zaXRpb24gW0ludGVnZXJdIGxlZnQgeOW6p+aomeOBp+OBmeOAglxuICBAb3B0aW9uIHBvc2l0aW9uIFtJbnRlZ2VyXSB0b3AgeeW6p+aomeOBp+OBmeOAglxuICAjIyNcbiAgQGNyZWF0ZVdpdGhQb3NpdGlvbjogKHtsZWZ0LCB0b3B9KSAtPiBuZXcgUG9pbnQgbGVmdCwgdG9wXG5cbiAgIyMjXG4gIGBjbGllbnRYYCxgY2xpZW50WWDjgYvjgonmiJDjgovjgqrjg5bjgrjjgqfjgq/jg4jjgYvjgolgUG9pbnRg44Kk44Oz44K544K/44Oz44K544KS55Sf5oiQ44GX44G+44GZ44CCXG4gIEBwYXJhbSBbT2JqZWN0XSBwb3NpdGlvbiDluqfmqJnjgqrjg5bjgrjjgqfjgq/jg4jjgafjgZnjgIJcbiAgQG9wdGlvbiBwb3NpdGlvbiBbSW50ZWdlcl0gY2xpZW50WCB45bqn5qiZ44Gn44GZ44CCXG4gIEBvcHRpb24gcG9zaXRpb24gW0ludGVnZXJdIGNsaWVudFkgeeW6p+aomeOBp+OBmeOAglxuICAjIyNcbiAgQGNyZWF0ZVdpdGhDbGllbnQ6ICh7Y2xpZW50WCwgY2xpZW50WX0pIC0+IG5ldyBQb2ludCBjbGllbnRYLCBjbGllbnRZXG5cbiAgIyMjXG4gIGBwYWdlWGAsYHBhZ2VZYOOBi+OCieaIkOOCi+OCquODluOCuOOCp+OCr+ODiOOBi+OCiWBQb2ludGDjgqTjg7Pjgrnjgr/jg7PjgrnjgpLnlJ/miJDjgZfjgb7jgZnjgIJcbiAgQHBhcmFtIFtPYmplY3RdIHBvc2l0aW9uIOW6p+aomeOCquODluOCuOOCp+OCr+ODiOOBp+OBmeOAglxuICBAb3B0aW9uIHBvc2l0aW9uIFtJbnRlZ2VyXSBwYWdlWCB45bqn5qiZ44Gn44GZ44CCXG4gIEBvcHRpb24gcG9zaXRpb24gW0ludGVnZXJdIHBhZ2VZIHnluqfmqJnjgafjgZnjgIJcbiAgIyMjXG4gIEBjcmVhdGVXaXRoUGFnZTogKHtwYWdlWCwgcGFnZVl9KSAtPiBuZXcgUG9pbnQgcGFnZVgsIHBhZ2VZXG5cblxuICBjb25zdHJ1Y3RvcjogKHgsIHkpIC0+XG4gICAgW0B4LCBAeV0gPSBQb2ludC5hcmd1bWVudHNUb0FycmF5IGFyZ3VtZW50c1xuXG4gICMjI1xuICDopIfoo73jgZfjgb7jgZnjgIJcbiAgQHJldHVybiBbUG9pbnRdIOikh+ijveOBleOCjOOBn2BQb2ludGDjgqTjg7Pjgrnjgr/jg7PjgrnjgafjgZnjgIJcbiAgIyMjXG4gIGNsb25lOiAtPiBuZXcgUG9pbnQgQHgsIEB5XG5cbiAgIyMjXG4gIOWOn+eCueOBi+OCieOBrui3nembouOCkuaxguOCgeOBvuOBmeOAglxuICBAcmV0dXJuIFtOdW1iZXJdIOi3nembouOBp+OBmeOAglxuICAjIyNcbiAgZGlzdGFuY2U6IC0+IHNxcnQgQHggKiBAeCArIEB5ICogQHlcblxuICAjIyNcbiAgeOi7uOato+OBruWQkeOBjeOBi+OCieOBruWBj+inkuOCkuaxguOCgeOBvuOBmeOAglxuICBAcmV0dXJuIFtOdW1iZXJdIOinkuW6puOBp+OBmeOAgihyYWQpXG4gICMjI1xuICBhbmdsZTogLT4gYXRhbjIgeSwgeFxuXG4gICMjI1xuICDmuJvnrpfjgZfjgb7jgZnjgIJcbiAgQHBhcmFtIFtQb2ludF0gcG9pbnQg5rib566X44GZ44KLYFBvaW50YOOBp+OBmeOAglxuICBAcmV0dXJuIFtQb2ludF0g6KiI566X57WQ5p6c44Gu5paw44GX44GEYFBvaW50YOOBp+OBmeOAglxuICAjIyNcbiAgc3VidHJhY3Q6ICh4LCB5KSAtPlxuICAgIGlmIHg/IGFuZCB4Lng/IGFuZCB4Lnk/XG4gICAgICB7eCwgeX0gPSB4XG4gICAgbmV3IFBvaW50IEB4IC0geCwgQHkgLSB5XG5cbiAgIyMjXG4gIFBvaW50I3N1YnRyYWN044Gu44K344On44O844OI44OP44Oz44OJ44Gn44GZ44CCXG4gIEBzZWUgUG9pbnQjc3VidHJhY3RcbiAgIyMjXG4gIHN1YjogUG9pbnQ6OnN1YnRyYWN0XG5cbiAgIyMjXG4gIOWKoOeul+OBl+OBvuOBmeOAglxuICBAcGFyYW0gW1BvaW50XSBwb2ludCDliqDnrpfjgZnjgotgUG9pbnRg44Gn44GZ44CCXG4gIEByZXR1cm4gW1BvaW50XSDoqIjnrpfntZDmnpzjga7mlrDjgZfjgYRgUG9pbnRg44Gn44GZ44CCXG4gICMjI1xuICBhZGQ6ICh4LCB5KSAtPlxuICAgIGlmIHg/IGFuZCB4Lng/IGFuZCB4Lnk/XG4gICAgICB7eCwgeX0gPSB4XG4gICAgbmV3IFBvaW50IEB4ICsgeCwgQHkgKyB5XG5cbiAgIyMjXG4gIOWQhOimgee0oOOBq+S5l+eul+OBl+OBvuOBmeOAglxuICBAcGFyYW0gW051bWJlcl0gbiDkuZfnrpfjgZnjgovmlbDjgafjgZnjgIJcbiAgQHJldHVybiBbUG9pbnRdIOioiOeul+e1kOaenOOBruaWsOOBl+OBhGBQb2ludGDjgafjgZnjgIJcbiAgIyMjXG4gIG11bHRpcGx5OiAobikgLT5cbiAgICBuZXcgUG9pbnQgQHggKiBuLCBAeSAqIG5cblxuICAjIyNcbiAgUG9pbnQjbXVsdGlwbHnjga7jgrfjg6fjg7zjg4jjg4/jg7Pjg4njgafjgZnjgIJcbiAgQHNlZSBQb2ludCNtdWx0aXBseVxuICAjIyNcbiAgbXVsOiBQb2ludDo6bXVsdGlwbHlcblxuICAjIyNcbiAg44OZ44Kv44OI44Or44Gu5YaF56mN44KS5rGC44KB44G+44GZ44CCXG4gIGEg44O7IGIgPSB8YXx8Ynxjb3MozrgpXG4gIEBwYXJhbSBbUG9pbnRdIHBvaW50IOWGheepjeOCkuOBmeOCi2BQb2ludGDjgafjgZnjgIJcbiAgQHJldHVybiBbTnVtYmVyXSDlhoXnqY3jga7ntZDmnpzjgafjgZnjgIJcbiAgIyMjXG4gIGRvdFByb2R1Y3Q6IChwb2ludCkgLT5cbiAgICBhID0gQFxuICAgIGIgPSBuZXcgUG9pbnQgYXJndW1lbnRzXG4gICAgdGhldGEgPSBhLnN1YihiKS5hbmdsZSgpXG4gICAgYS5kaXN0YW5jZSgpICogYi5kaXN0YW5jZSgpICogY29zIHRoZXRhXG5cbiAgIyMjXG4gIOODmeOCr+ODiOODq+OBruWkluepjeOCkuaxguOCgeOBvuOBmeOAglxuICBhIHggYiA9IHxhfHxifHNpbijOuClcbiAgQHBhcmFtIFtQb2ludF0gcG9pbnQg5aSW56mN44KS44GZ44KLYFBvaW50YOOBp+OBmeOAglxuICBAcmV0dXJuIFtOdW1iZXJdIOWkluepjeOBrue1kOaenOOBp+OBmeOAglxuICAjIyNcbiAgY3Jvc3NQcm9kdWN0OiAocG9pbnQpIC0+XG4gICAgYSA9IEBcbiAgICBiID0gbmV3IFBvaW50IGFyZ3VtZW50c1xuICAgIHRoZXRhID0gYS5zdWIoYikuYW5nbGUoKVxuICAgIGEuZGlzdGFuY2UoKSAqIGIuZGlzdGFuY2UoKSAqIHNpbiB0aGV0YVxuXG4gICMjI1xuICDmjIflrprpoJjln5/lhoXjgavlj47jgb7jgovmlrDjgZfjgYRgUG9pbnRg44KS6L+U44GX44G+44GZ44CCXG4gIEBwYXJhbSBbUmVjdF0gcmVjdCBgUG9pbnRg44KS5Y+O44KB44KL6aCY5Z+f44Gn44GZ44CCXG4gIEByZXR1cm4gW1BvaW50XSDpoJjln5/lhoXjgavlj47jgb7jgovmlrDjgZfjgYRgUG9pbnRg44Gn44GZ44CCXG4gICMjI1xuICBjb250YWluSW46IChyZWN0KSAtPlxuICAgIG5ldyBQb2ludCAoXG4gICAgICBpZiBAeCA8ICh4ID0gcmVjdC5nZXRMZWZ0KCkpXG4gICAgICAgIHhcbiAgICAgIGVsc2UgaWYgQHggPiAoeCA9IHJlY3QuZ2V0UmlnaHQoKSlcbiAgICAgICAgeFxuICAgICAgZWxzZVxuICAgICAgICBAeFxuICAgICksIChcbiAgICAgIGlmIEB5IDwgKHkgPSByZWN0LmdldFRvcCgpKVxuICAgICAgICB5XG4gICAgICBlbHNlIGlmIEB5ID4gKHkgPSByZWN0LmdldEJvdHRvbSgpKVxuICAgICAgICB5XG4gICAgICBlbHNlXG4gICAgICAgIEB5XG4gICAgKVxuIiwiUG9pbnQgPSByZXF1aXJlICcuL3BvaW50J1xue2Zsb29yLCBjZWlsfSA9IE1hdGhcblxuXG4jIyNcbuevhOWbsuOCr+ODqeOCueOBp+OBmeOAglxu5LqM5qyh5YWD44Gu55u05Lqk5bqn5qiZ57O744KS5omx44GE44G+44GZ44CCXG4jIyNcbm1vZHVsZS5leHBvcnRzID1cbmNsYXNzIFJlY3RcblxuICBAY3JlYXRlV2l0aENvcm5lcjogKGxlZnQsIHJpZ2h0LCB0b3AsIGJvdHRvbSkgLT4gbmV3IFJlY3QgbGVmdCwgdG9wLCByaWdodCAtIGxlZnQsIGJvdHRvbSAtIHRvcFxuXG4gIEBwYXJzZUFyZ3VtZW50czogKGFyZ3MpIC0+XG4gICAgc3dpdGNoIGFyZ3MubGVuZ3RoXG4gICAgICB3aGVuIDBcbiAgICAgICAgeDogMFxuICAgICAgICB5OiAwXG4gICAgICAgIHdpZHRoOiAwXG4gICAgICAgIGhlaWdodDogMFxuICAgICAgd2hlbiAxXG4gICAgICAgIGFyZ3NbMF1cbiAgICAgIHdoZW4gMlxuICAgICAgICB4OiBhcmdzWzBdLnhcbiAgICAgICAgeTogYXJnc1swXS55XG4gICAgICAgIHdpZHRoOiBhcmdzWzBdLnhcbiAgICAgICAgaGVpZ2h0OiBhcmdzWzBdLnlcbiAgICAgIHdoZW4gNFxuICAgICAgICB4OiBhcmdzWzBdXG4gICAgICAgIHk6IGFyZ3NbMV1cbiAgICAgICAgd2lkdGg6IGFyZ3NbMl1cbiAgICAgICAgaGVpZ2h0OiBhcmdzWzNdXG4gICAgICBlbHNlXG4gICAgICAgIHg6IGFyZ3NbMF0gPyAwXG4gICAgICAgIHk6IGFyZ3NbMV0gPyAwXG4gICAgICAgIHdpZHRoOiBhcmdzWzJdID8gMFxuICAgICAgICBoZWlnaHQ6IGFyZ3NbM10gPyAwXG5cbiAgQGFyZ3VtZW50c1RvUmVjdDogKGFyZ3MpIC0+XG4gICAge3gsIHksIHdpZHRoLCBoZWlnaHR9ID0gUmVjdC5wYXJzZUFyZ3VtZW50cyBhcmdzXG4gICAgbmV3IFJlY3QgeCwgeSwgd2lkdGgsIGhlaWdodFxuXG4gIEBjcmVhdGVXaXRoQ2VudGVyOiAoY2VudGVyWCwgY2VudGVyWSwgd2lkdGgsIGhlaWdodCkgLT5cbiAgICByZWN0ID0gUmVjdC5hcmd1bWVudHNUb1JlY3QgYXJndW1lbnRzXG4gICAgcmVjdC54IC09IHJlY3Qud2lkdGggLyAyXG4gICAgcmVjdC55IC09IHJlY3QuaGVpZ2h0IC8gMlxuICAgIHJlY3RcblxuXG4gIGNvbnN0cnVjdG9yOiAoeCwgeSwgd2lkdGgsIGhlaWdodCkgLT5cbiAgICBpZiB4PyBhbmQgeC54PyBhbmQgeC55PyBhbmQgeC53aWR0aD8gYW5kIHguaGVpZ2h0P1xuICAgICAge3gsIHksIHdpZHRoLCBoZWlnaHR9ID0geFxuICAgIEB4ID0geCA/IDBcbiAgICBAeSA9IHkgPyAwXG4gICAgQHdpZHRoID0gd2lkdGggPyAwXG4gICAgQGhlaWdodCA9IGhlaWdodCA/IDBcbiAgICBAbm9ybWFsaXplKClcblxuICBub3JtYWxpemU6IC0+XG4gICAgaWYgQHdpZHRoIDwgMFxuICAgICAgQHggKz0gQHdpZHRoXG4gICAgICBAd2lkdGggKj0gLTFcbiAgICBpZiBAaGVpZ2h0IDwgMFxuICAgICAgQHkgKz0gQGhlaWdodFxuICAgICAgQGhlaWdodCAqPSAtMVxuXG4gICMjI1xuICDopIfoo73jgZfjgb7jgZnjgIJcbiAgQHJldHVybiBbUmVjdF0g6KSH6KO944GV44KM44GfYFJlY3Rg44Kk44Oz44K544K/44Oz44K544Gn44GZ44CCXG4gICMjI1xuICBjbG9uZTogLT4gbmV3IFJlY3QgQHgsIEB5LCBAd2lkdGgsIEBoZWlnaHRcblxuICBnZXRMZWZ0OiAtPiBAeFxuICBnZXRSaWdodDogLT4gQHggKyBAd2lkdGhcbiAgZ2V0VG9wOiAtPiBAeVxuICBnZXRCb3R0b206IC0+IEB5ICsgQGhlaWdodFxuICBnZXRMZWZ0VG9wOiAtPiBuZXcgUG9pbnQgQGdldExlZnQoKSwgQGdldFRvcCgpXG4gIGdldExlZnRCb3R0b206IC0+IG5ldyBQb2ludCBAZ2V0TGVmdCgpLCBAZ2V0Qm90dG9tKClcbiAgZ2V0UmlnaHRUb3A6IC0+IG5ldyBQb2ludCBAZ2V0UmlnaHQoKSwgQGdldFRvcCgpXG4gIGdldFJpZ2h0Qm90dG9tOiAtPiBuZXcgUG9pbnQgQGdldFJpZ2h0KCksIEBnZXRCb3R0b20oKVxuXG4gIGNvbnRhaW5zUG9pbnQ6IChwb2ludCkgLT5cbiAgICB7eCwgeX0gPSBQb2ludC5wYXJzZUFyZ3VtZW50cyBhcmd1bWVudHNcbiAgICBAZ2V0TGVmdCgpIDw9IHggPD0gQGdldFJpZ2h0KCkgYW5kIEBnZXRUb3AoKSA8PSB5IDw9IEBnZXRCb3R0b20oKVxuXG4gIGNvbnRhaW5zUmVjdDogKHJlY3QpIC0+XG4gICAge3gsIHksIHdpZHRoLCBoZWlnaHR9ID0gUmVjdC5wYXJzZUFyZ3VtZW50cyBhcmd1bWVudHNcbiAgICByZWN0ID0gbmV3IFJlY3QgeCwgeSwgd2lkdGgsIGhlaWdodFxuICAgIEBnZXRMZWZ0KCkgPD0gcmVjdC5nZXRMZWZ0KCkgYW5kIHJlY3QuZ2V0UmlnaHQoKSA8PSBAZ2V0UmlnaHQoKSBhbmRcbiAgICBAZ2V0VG9wKCkgPD0gcmVjdC5nZXRUb3AoKSBhbmQgcmVjdC5nZXRCb3R0b20oKSA8PSBAZ2V0Qm90dG9tKClcblxuICBvZmZzZXQ6ICh4LCB5KSAtPlxuICAgIG5ldyBSZWN0IEB4ICsgeCwgQHkgKyB5LCBAd2lkdGgsIEBoZWlnaHRcblxuICAjIyNcbiAg5oyH5a6a44GV44KM44Gf6YeP5aSn44GN44GP44GX44Gf5paw44Gf44Gq6aCY5Z+f44KS55Sf5oiQ44GX44G+44GZ44CCXG4gIEBwYXJhbSBbTnVtYmVyXSB3aWR0aCDlpKfjgY3jgY/jgZnjgovluYXjgafjgZnjgIJcbiAgQHBhcmFtIFtOdW1iZXJdIGhlaWdodCDlpKfjgY3jgY/jgZnjgovpq5jjgZXjgafjgZnjgIJcbiAgQHJldHVybiBbUmVjdF0g5paw44Gf44Gq6aCY5Z+f44Gn44GZ44CCXG4gICMjI1xuICBpbmZsYXRlOiAod2lkdGgsIGhlaWdodCkgLT5cbiAgICBuZXcgUmVjdCBAeCwgQHksIEB3aWR0aCArIHdpZHRoLCBAaGVpZ2h0ICsgaGVpZ2h0XG5cbiAgIyMjXG4gIOaMh+WumuOBleOCjOOBn+mHj+Wwj+OBleOBj+OBl+OBn+aWsOOBn+OBqumgmOWfn+OCkueUn+aIkOOBl+OBvuOBmeOAglxuICBAcGFyYW0gW051bWJlcl0gd2lkdGgg5bCP44GV44GP44GZ44KL5bmF44Gn44GZ44CCXG4gIEBwYXJhbSBbTnVtYmVyXSBoZWlnaHQg5bCP44GV44GP44GZ44KL6auY44GV44Gn44GZ44CCXG4gIEByZXR1cm4gW1JlY3RdIOaWsOOBn+OBqumgmOWfn+OBp+OBmeOAglxuICAjIyNcbiAgZGVmbGF0ZTogKHdpZHRoLCBoZWlnaHQpIC0+XG4gICAgbmV3IFJlY3QgQHgsIEB5LCBAd2lkdGggLSB3aWR0aCwgQGhlaWdodCAtIGhlaWdodFxuXG4gICNUT0RPIGltcGxlbWVudCBtZVxuICB1bmlvbjogKHJlY3QpIC0+XG5cblxuICAjIyNcbiAg5oyH5a6a44Gu6aCY5Z+f5YaF44Gr5Y+O44G+44KL5paw44Gf44Gq6aCY5Z+f44KS55Sf5oiQ44GX44G+44GZ44CCXG4gIDEuIHgseeOCkuWPjuOBvuOCi+OCiOOBhuOBq+ioreWumuOBl+OBvuOBmeOAglxuICAyLiDlj47jgb7jgonjgarjgYTloLTlkIjjga93aWR0aCxoZWlnaHTjgpLoqK3lrprjgZfjgb7jgZnjgIJcbiAgIyMjXG4gIGZhbGxXaXRoaW46IChyZWN0KSAtPlxuICAgIHIgPSBAY2xvbmUoKVxuICAgIGxlZnQwID0gci5nZXRMZWZ0KClcbiAgICByaWdodDAgPSByLmdldFJpZ2h0KClcbiAgICB0b3AwID0gci5nZXRUb3AoKVxuICAgIGJvdHRvbTAgPSByLmdldEJvdHRvbSgpXG4gICAgbGVmdDEgPSByZWN0LmdldExlZnQoKVxuICAgIHJpZ2h0MSA9IHJlY3QuZ2V0UmlnaHQoKVxuICAgIHRvcDEgPSByZWN0LmdldFRvcCgpXG4gICAgYm90dG9tMSA9IHJlY3QuZ2V0Qm90dG9tKClcblxuICAgIGlmIGxlZnQwIDwgbGVmdDFcbiAgICAgIHIueCA9IGxlZnQxXG4gICAgICAjIGlmIChvdmVyID0gci5nZXRSaWdodCgpIC0gcmlnaHQxKSA+IDBcbiAgICAgICMgICByLndpZHRoIC09IG92ZXJcbiAgICBpZiByaWdodDAgPiByaWdodDFcbiAgICAgIHIueCAtPSByaWdodDAgLSByaWdodDFcbiAgICBpZiAob3ZlciA9IHIuZ2V0UmlnaHQoKSAtIHJpZ2h0MSkgPiAwXG4gICAgICByLndpZHRoIC09IG92ZXJcbiAgICBpZiB0b3AwIDwgdG9wMVxuICAgICAgci55ID0gdG9wMVxuICAgICAgIyBpZiAob3ZlciA9IHIuZ2V0Qm90dG9tKCkgLSBib3R0b20xKSA+IDBcbiAgICAgICMgICByLmhlaWdodCAtPSBvdmVyXG4gICAgaWYgYm90dG9tMCA+IGJvdHRvbTFcbiAgICAgIHIueSAtPSBib3R0b20wIC0gYm90dG9tMVxuICAgIGlmIChvdmVyID0gci5nZXRCb3R0b20oKSAtIGJvdHRvbTEpID4gMFxuICAgICAgci5oZWlnaHQgLT0gb3ZlclxuXG4gICAgclxuXG4gIG1vdmFibGVSZWN0SW46IChyZWN0KSAtPlxuICAgIG5ldyBSZWN0IHJlY3QueCwgcmVjdC55LCByZWN0LndpZHRoIC0gQHdpZHRoLCByZWN0LmhlaWdodCAtIEBoZWlnaHRcblxuXG4gICMjI1xuICDjgZPjga7poJjln5/jgavmjIflrprluqfmqJnjgYzlkKvjgb7jgozjgovmlrDjgZ/jgarpoJjln5/jgpLnlJ/miJDjgZfjgb7jgZnjgIJcbiAgQHBhcmFtIFtOdW1iZXJdIHggeOW6p+aomeOBp+OBmeOAglxuICBAcGFyYW0gW051bWJlcl0geSB55bqn5qiZ44Gn44GZ44CCXG4gIEByZXR1cm4gW1JlY3RdIOaWsOOBn+OBqumgmOWfn+OBp+OBmeOAglxuICAjIyNcbiAgY29udGFpbjogKHgsIHkpIC0+XG4gICAgaWYgeD8gYW5kIHgueD8gYW5kIHgueT9cbiAgICAgIHt4LCB5fSA9IHhcbiAgICByID0gQGNsb25lKClcbiAgICByaWdodCA9IHIuZ2V0UmlnaHQoKVxuICAgIGlmIHggPCByLnhcbiAgICAgIHIueCA9IHhcbiAgICAgIHIud2lkdGggPSByaWdodCAtIHIueFxuICAgIGVsc2UgaWYgeCA+IHJpZ2h0XG4gICAgICByLndpZHRoID0geCAtIHIueFxuICAgIGJvdHRvbSA9IHIuZ2V0Qm90dG9tKClcbiAgICBpZiB5IDwgci55XG4gICAgICByLnkgPSB5XG4gICAgICByLmhlaWdodCA9IGJvdHRvbSAtIHIueVxuICAgIGVsc2UgaWYgeSA+IGJvdHRvbVxuICAgICAgci5oZWlnaHQgPSB5IC0gci55XG4gICAgclxuXG4gIGNlaWw6IC0+XG4gICAgbGVmdCA9IGZsb29yIEBnZXRMZWZ0KClcbiAgICByaWdodCA9IGNlaWwgQGdldFJpZ2h0KClcbiAgICB0b3AgPSBmbG9vciBAZ2V0VG9wKClcbiAgICBib3R0b20gPSBjZWlsIEBnZXRCb3R0b20oKVxuICAgIFJlY3QuY3JlYXRlV2l0aENvcm5lciBsZWZ0LCByaWdodCwgdG9wLCBib3R0b21cblxuICBmbG9vcjogLT5cbiAgICBsZWZ0ID0gY2VpbCBAZ2V0TGVmdCgpXG4gICAgcmlnaHQgPSBmbG9vciBAZ2V0UmlnaHQoKVxuICAgIHRvcCA9IGNlaWwgQGdldFRvcCgpXG4gICAgYm90dG9tID0gZmxvb3IgQGdldEJvdHRvbSgpXG4gICAgUmVjdC5jcmVhdGVXaXRoQ29ybmVyIGxlZnQsIHJpZ2h0LCB0b3AsIGJvdHRvbVxuIiwiaW90YSA9IHJlcXVpcmUoJy4uL21vZGVscy9pb3RhJykoKVxuXG5tb2R1bGUuZXhwb3J0cyA9XG5jbGFzcyBJbWFnZURhdGFVdGlsXG5cbiAgQExFRlQ6IDEgPDwgaW90YSgpXG4gIEBSSUdIVDogMSA8PCBpb3RhKClcbiAgQFRPUDogMSA8PCBpb3RhKClcbiAgQEJPVFRPTTogMSA8PCBpb3RhKClcblxuICBAY29udGV4dDogKHdpZHRoLCBoZWlnaHQpIC0+XG4gICAgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCAnY2FudmFzJ1xuICAgIGNhbnZhcy53aWR0aCA9IHdpZHRoXG4gICAgY2FudmFzLmhlaWdodCA9IGhlaWdodFxuICAgIGNhbnZhcy5nZXRDb250ZXh0ICcyZCdcblxuICBAbmV3OiAod2lkdGgsIGhlaWdodCkgLT5cbiAgICBjb250ZXh0ID0gSW1hZ2VEYXRhVXRpbC5jb250ZXh0IHdpZHRoLCBoZWlnaHRcbiAgICBjb250ZXh0LmdldEltYWdlRGF0YSAwLCAwLCB3aWR0aCwgaGVpZ2h0XG5cbiAgQGNsb25lOiAoaW1hZ2VEYXRhKSAtPlxuICAgIGNvbnRleHQgPSBJbWFnZURhdGFVdGlsLmNvbnRleHQgaW1hZ2VEYXRhLndpZHRoLCBpbWFnZURhdGEuaGVpZ2h0XG4gICAgY29udGV4dC5wdXRJbWFnZURhdGEgaW1hZ2VEYXRhLCAwLCAwXG4gICAgY29udGV4dC5nZXRJbWFnZURhdGEgMCwgMCwgaW1hZ2VEYXRhLndpZHRoLCBpbWFnZURhdGEuaGVpZ2h0XG5cbiAgQGNob3A6IChpbWFnZURhdGEsIGRpcmVjdGlvbikgLT5cbiAgICB7IHdpZHRoLCBoZWlnaHQsIGRhdGEgfSA9IGltYWdlRGF0YVxuXG4gICAgY29udGV4dCA9IEltYWdlRGF0YVV0aWwuY29udGV4dCB3aWR0aCwgaGVpZ2h0XG4gICAgY29udGV4dC5wdXRJbWFnZURhdGEgaW1hZ2VEYXRhLCAwLCAwXG5cbiAgICBtaW5YID0gMFxuICAgIG1heFggPSB3aWR0aCAtIDFcbiAgICBtaW5ZID0gMFxuICAgIG1heFkgPSBoZWlnaHQgLSAxXG4gICAgaWYgKGRpcmVjdGlvbiAmJiBJbWFnZURhdGFVdGlsLlJJR0hUKSBpcyBJbWFnZURhdGFVdGlsLlJJR0hUXG4gICAgICByaWdodCA9IGRvIC0+XG4gICAgICAgIHggPSBtYXhYXG4gICAgICAgIHdoaWxlIHggPj0gbWluWFxuICAgICAgICAgIHkgPSBtYXhZXG4gICAgICAgICAgd2hpbGUgeSA+PSBtaW5ZXG4gICAgICAgICAgICByZXR1cm4geCBpZiBkYXRhWzMgKyA0ICogKGhlaWdodCAqIHggKyB5KV0gaXNudCAwXG4gICAgICAgICAgICB5LS1cbiAgICAgICAgICB4LS1cbiAgICAgICAgcmV0dXJuIDBcbiAgICAgIHJldHVybiBjb250ZXh0LmdldEltYWdlRGF0YSAwLCAwLCByaWdodCArIDEsIGhlaWdodFxuIiwiIyMjXG7kuLvjgavjg5Xjg6njgrDjgpLkvZzjgovpmpvjgavkvb/nlKjjgZnjgovjg6bjg7zjg4bjgqPjg6rjg4bjgqPjgafjgZnjgIJcblxuQGV4YW1wbGUgMTDpgLLmlbDjga7jg5Xjg6njgrDjgpLnlJ/miJDjgZnjgotcbiAgICBpb3RhID0gcmVxdWlyZSgncGVuY2lsL21vZGVscy9pb3RhJykoKVxuICAgIGEgPSBpb3RhKCkgIyAwXG4gICAgYiA9IGlvdGEoKSAjIDFcbiAgICBjID0gaW90YSgpICMgMlxuICAgIGQgPSBpb3RhKCkgIyAzXG4gICAgZSA9IGlvdGEoKSAjIDRcblxuQGV4YW1wbGUgMumAsuaVsOOBruODleODqeOCsOOCkueUn+aIkOOBmeOCi1xuICAgIGlvdGEgPSByZXF1aXJlKCdwZW5jaWwvbW9kZWxzL2lvdGEnKSgpXG4gICAgYSA9IDEgPDwgaW90YSgpICMgMCAoMDAwMClcbiAgICBiID0gMSA8PCBpb3RhKCkgIyAxICgwMDAxKVxuICAgIGMgPSAxIDw8IGlvdGEoKSAjIDIgKDAwMTApXG4gICAgZCA9IDEgPDwgaW90YSgpICMgNCAoMDEwMClcbiAgICBlID0gMSA8PCBpb3RhKCkgIyA4ICgxMDAwKVxuIyMjXG5jbGFzcyBJb3RhXG5cbiAgIyMjXG4gIEByZXR1cm4gRnVuY3Rpb24g44Kz44O844Or44GZ44KL5q+O44GrMOOBi+OCieOCpOODs+OCr+ODquODoeODs+ODiOOBleOCjOOBn+aVtOaVsOOCkui/lOOBmemWouaVsOOCkui/lOOBl+OBvuOBmeOAglxuICAjIyNcbiAgQGZhY3Rvcnk6IC0+XG4gICAgaW5kZXggPSAwXG4gICAgLT4gaW5kZXgrK1xuXG5tb2R1bGUuZXhwb3J0cyA9IElvdGEuZmFjdG9yeVxuIiwiJCA9IHJlcXVpcmUgJ2pxdWVyeSdcblxucHJvcHMgPSBcIlwiXCJcbmhhc2hcbmhvc3Rcbmhvc3RuYW1lXG5ocmVmXG5vcmlnaW5cbnBhdGhuYW1lXG5wb3J0XG5wcm90b2NvbFxuXCJcIlwiLnNwbGl0IC9cXHMrL1xuXG5tb2R1bGUuZXhwb3J0cyA9XG4gIHBhcnNlOiAodXJsKSAtPlxuICAgIGxvY2F0aW9uID0ge31cbiAgICBlbCA9ICQoJzxhPicpLmF0dHIoaHJlZjogdXJsKVswXVxuICAgIGZvciBwcm9wIGluIHByb3BzXG4gICAgICBsb2NhdGlvbltwcm9wXSA9IGVsW3Byb3BdXG4gICAgbG9jYXRpb25cbiIsIiMjI1xuT1MgcGFyc2VzIHVzZXIgYWdlbnQgYW5kIGRldGVybWluZXMgdGhlIE9TIHR5cGUgYW5kIHZlcnNpb24uXG4jIyNcblxuVUEgPSB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpXG5SX0lfUEhPTkUgPSAvXFwoKGlwaG9uZSkuKj9vcyAoW1xcZF9dKykuKj9cXCkvXG5SX0lfUE9EID0gL1xcKChpcG9kKS4qP29zIChbXFxkX10rKS4qP1xcKS9cblJfSV9QQUQgPSAvXFwoKGlwYWQpLio/b3MgKFtcXGRfXSspLio/XFwpL1xuUl9BTkRST0lEID0gL1xcKC4qPyhhbmRyb2lkKSAoW1xcZFxcLl0rKS4qP1xcKS9cblJfTUFDID0gL1xcKC4qPyhtYWMpIG9zIHggKFtcXGRfXFwuXSspLio/XFwpL1xuUl9MSU5VWCA9IC9cXCguKj8obGludXgpIChcXHcrKXZcXCkvXG5SX1dJTkRPV1MgPSAvXFwoLio/KHdpbmRvd3MpIChcXHcrKS4qP1xcKS9cblxuWyB7fSwgbmFtZSwgdmVyc2lvbiBdID0gUl9JX1BIT05FLmV4ZWMoVUEpIG9yXG4gICAgICAgICAgICAgICAgICAgICAgICBSX0lfUE9ELmV4ZWMoVUEpIG9yXG4gICAgICAgICAgICAgICAgICAgICAgICBSX0lfUEFELmV4ZWMoVUEpIG9yXG4gICAgICAgICAgICAgICAgICAgICAgICBSX0FORFJPSUQuZXhlYyhVQSkgb3JcbiAgICAgICAgICAgICAgICAgICAgICAgIFJfTUFDLmV4ZWMoVUEpIG9yXG4gICAgICAgICAgICAgICAgICAgICAgICBSX1dJTkRPV1MuZXhlYyhVQSkgb3JcbiAgICAgICAgICAgICAgICAgICAgICAgIFJfTElOVVguZXhlYyhVQSkgb3JcbiAgICAgICAgICAgICAgICAgICAgICAgIFtdXG5cbm9zID0ge31cbmlmIG5hbWU/XG4gIG9zW25hbWVdID0gdHJ1ZVxuICBvcy52ZXJzaW9uID0gdmVyc2lvbi5zcGxpdCgnXycpLmpvaW4oJy4nKVxuaWYgb3MuaXBob25lIG9yIG9zLmlwb2Qgb3Igb3MuaXBhZFxuICBvcy5pb3MgPSB0cnVlXG5pZiBvcy5pb3Mgb3Igb3MuYW5kcm9pZFxuICBvcy5tb2JpbGUgPSB0cnVlXG5pZiBvcy52ZXJzaW9uP1xuICBudW1iZXIgPSBwYXJzZUludCBvcy52ZXJzaW9uLCAxMFxuICB1bmxlc3MgaXNOYU4gbnVtYmVyXG4gICAgb3MudmVyc2lvbk51bWJlciA9IG51bWJlclxuXG5tb2R1bGUuZXhwb3J0cyA9IG9zXG4iLCJ7IGlzQXJyYXkgfSA9IHJlcXVpcmUgJ2xvZGFzaCdcblxuXG4jIyNcbuOCr+OCqOODquaWh+Wtl+WIl+OCr+ODqeOCueOBp+OBmeOAglxuIyMjXG5tb2R1bGUuZXhwb3J0cyA9XG5jbGFzcyBRdWVyeVN0cmluZ1xuXG4gIEBzdHJpbmdpZnk6IChvYmosIHNlcCA9ICcmJywgZXEgPSAnPScpIC0+XG4gICAgcXVlcmllcyA9IGZvciBrZXksIHZhbCBvZiBvYmpcbiAgICAgIGlmIGlzQXJyYXkgdmFsXG4gICAgICAgIGZvciB2IGluIHZhbFxuICAgICAgICAgIFwiI3trZXl9I3tlcX0je2VuY29kZVVSSUNvbXBvbmVudCB2ID8gJyd9XCJcbiAgICAgIGVsc2VcbiAgICAgICAgXCIje2tleX0je2VxfSN7ZW5jb2RlVVJJQ29tcG9uZW50IHZhbCA/ICcnfVwiXG4gICAgcXVlcmllcy5qb2luIHNlcFxuXG4gIEBwYXJzZTogKHN0ciwgc2VwID0gJyYnLCBlcSA9ICc9Jywgb3B0cykgLT5cbiAgICBvcHRzID0gYXNzaWduIG9wdHMsIG1heEtleXM6IDEwMDBcbiAgICB7bWF4S2V5c30gPSBvcHRzXG4gICAgb2JqID0ge31cbiAgICBmb3Iga3YsIGkgaW4gc3RyLnNwbGl0IHNlcCB3aGVuIG1heEtleXMgaXMgMCBvciBpIDwgbWF4S2V5c1xuICAgICAgW2tleSwgdmFsXSA9IGt2LnNwbGl0IGVxXG4gICAgICBpZiBvYmpba2V5XT9cbiAgICAgICAgaWYgaXNBcnJheSBvYmpba2V5XVxuICAgICAgICAgIG9ialtrZXldLnB1c2ggdmFsXG4gICAgICAgIGVsc2VcbiAgICAgICAgICB0bXAgPSBvYmpba2V5XVxuICAgICAgICAgIG9ialtrZXldID0gW3RtcCwgdmFsXVxuICAgICAgZWxzZVxuICAgICAgICBvYmpba2V5XSA9IHZhbFxuICAgIG9ialxuIiwiUG9pbnQgPSByZXF1aXJlICcuL2dlb20vcG9pbnQnXG5cblxubW9kdWxlLmV4cG9ydHMgPVxuXG4gIGdldFRvdGFsTGVuZ3RoOiAocGF0aCkgLT5cbiAgICBzd2l0Y2ggcGF0aC50eXBlXG4gICAgICB3aGVuICdsaW5lJ1xuICAgICAgICBzdGFydCA9IG5ldyBQb2ludCBwYXJzZUZsb2F0KHBhdGguYXR0cigneDEnKSksIHBhcnNlRmxvYXQocGF0aC5hdHRyKCd5MScpKVxuICAgICAgICBlbmQgPSBuZXcgUG9pbnQgcGFyc2VGbG9hdChwYXRoLmF0dHIoJ3gyJykpLCBwYXJzZUZsb2F0KHBhdGguYXR0cigneTInKSlcbiAgICAgICAgUG9pbnQuZGlzdGFuY2Ugc3RhcnQsIGVuZFxuICAgICAgd2hlbiAncG9seWxpbmUnXG4gICAgICAgIGxlbmd0aCA9IDBcbiAgICAgICAgcG9pbnRzID0gcGF0aC5hdHRyICdwb2ludHMnXG4gICAgICAgIGkgPSBwb2ludHMubGVuZ3RoXG4gICAgICAgIHdoaWxlIGktLSA+IDBcbiAgICAgICAgICBpZiBwb2ludHNbaV0gaXMgJydcbiAgICAgICAgICAgIHBvaW50cyA9IHBvaW50cy5zcGxpY2UgaSwgMVxuICAgICAgICBmb3IgeCwgaSBpbiBwb2ludHMgYnkgMlxuICAgICAgICAgIHggPSBwYXJzZUZsb2F0IHhcbiAgICAgICAgICB5ID0gcGFyc2VGbG9hdCBwb2ludHNbaSArIDFdXG4gICAgICAgICAgbmV4dCA9IG5ldyBQb2ludCB4LCB5XG4gICAgICAgICAgaWYgcHJldj9cbiAgICAgICAgICAgIGxlbmd0aCArPSBQb2ludC5kaXN0YW5jZSBwcmV2LCBuZXh0XG4gICAgICAgICAgcHJldiA9IG5leHRcbiAgICAgICAgbGVuZ3RoXG4gICAgICBlbHNlXG4gICAgICAgIHBhdGguZ2V0VG90YWxMZW5ndGgoKVxuXG4gIGdldFBvaW50QXRMZW5ndGg6IChwYXRoLCBsZW4pIC0+XG4gICAgc3dpdGNoIHBhdGgudHlwZVxuICAgICAgd2hlbiAnbGluZSdcbiAgICAgICAgc3RhcnQgPSBuZXcgUG9pbnQgcGFyc2VGbG9hdChwYXRoLmF0dHIoJ3gxJykpLCBwYXJzZUZsb2F0KHBhdGguYXR0cigneTEnKSlcbiAgICAgICAgZW5kID0gbmV3IFBvaW50IHBhcnNlRmxvYXQocGF0aC5hdHRyKCd4MicpKSwgcGFyc2VGbG9hdChwYXRoLmF0dHIoJ3kyJykpXG4gICAgICAgIFBvaW50LmxlcnAgc3RhcnQsIGVuZCwgbGVuIC8gUG9pbnQuZGlzdGFuY2Ugc3RhcnQsIGVuZFxuICAgICAgd2hlbiAncG9seWxpbmUnXG4gICAgICAgIGxlbmd0aCA9IDBcbiAgICAgICAgcG9pbnRzID0gcGF0aC5hdHRyICdwb2ludHMnXG4gICAgICAgIGZvciB4LCBpIGluIHBvaW50cyBieSAyXG4gICAgICAgICAgeCA9IHBhcnNlRmxvYXQgeFxuICAgICAgICAgIHkgPSBwYXJzZUZsb2F0IHBvaW50c1tpICsgMV1cbiAgICAgICAgICBlbmQgPSBuZXcgUG9pbnQgeCwgeVxuICAgICAgICAgIGlmIHN0YXJ0P1xuICAgICAgICAgICAgZGlzdGFuY2UgPSBQb2ludC5kaXN0YW5jZSBzdGFydCwgZW5kXG4gICAgICAgICAgICBpZiBsZW5ndGggPD0gbGVuIDw9IChsZW5ndGggKz0gZGlzdGFuY2UpXG4gICAgICAgICAgICAgIHJldHVybiBQb2ludC5sZXJwIHN0YXJ0LCBlbmQsIGxlbiAvIFBvaW50LmRpc3RhbmNlIHN0YXJ0LCBlbmRcbiAgICAgICAgICBzdGFydCA9IGVuZFxuICAgICAgICByZXR1cm5cbiAgICAgIGVsc2VcbiAgICAgICAgbmV3IFBvaW50IHBhdGguZ2V0UG9pbnRBdExlbmd0aCBsZW5cbiIsInsgc3RyaW5naWZ5IH0gPSByZXF1aXJlICcuLi9xdWVyeS1zdHJpbmcnXG5cblxuIyMjXG5GYWNlYm9va+OBruaPkOS+m+OBmeOCi+OCteODvOODk+OCueOCkuWIqeeUqOOBmeOCi+OBn+OCgeOBruOCr+ODqeOCueOBp+OBmeOAglxuIyMjXG5tb2R1bGUuZXhwb3J0cyA9XG5jbGFzcyBGYWNlYm9va1xuXG4gICMjI1xuICDjgqbjgqfjg5bjgrXjgqTjg4jjgpLjgrfjgqfjgqLjgZnjgovngrrjga5VUkzjgpLnlJ/miJDjgZfjgb7jgZnjgIJcbiAgQHBhcmFtIFtTdHJpbmddIHVybCDjgqbjgqfjg5bjgrXjgqTjg4jjga5VUkzjgafjgZnjgIJcbiAgQHJldHVybiBbU3RyaW5nXSDjgrfjgqfjgqLjgZnjgovngrrjga5VUkzjgafjgZnjgIJcbiAgIyMjXG4gIEBjcmVhdGVTaGFyZVVybDogKHVybCkgLT4gXCJodHRwOi8vd3d3LmZhY2Vib29rLmNvbS9zaGFyZS5waHA/I3tzdHJpbmdpZnkgdTogdXJsfVwiXG5cbiAgIyMjXG4gIOOCpuOCp+ODluOCteOCpOODiOOBruOCt+OCp+OCouaVsOOCkuWPluW+l+OBl+OBvuOBmeOAglxuICBAcGFyYW0gW1N0cmluZ10gdXJsIOOCpuOCp+ODluOCteOCpOODiOOBrlVSTOOBp+OBmeOAglxuICBAcGFyYW0gW0Z1bmN0aW9uXSBjYWxsYmFjayDjgrPjg7zjg6vjg5Djg4Pjgq/jgafjgZnjgIJcblxuICBAZXhhbXBsZSDjgqbjgqfjg5bjgrXjgqTjg4jjga7jgrfjgqfjgqLmlbDjgpLlj5blvpfjgpJhbGVydOOBl+OBvuOBmeOAglxuICAgICAgRmFjZWJvb2suZmV0Y2hDb3VudCAnaHR0cDovL2V4YW1wbGUuY29tJywgKGVyciwgc2hhcmVzKSAtPlxuICAgICAgICB0aHJvdyBlcnIgaWYgZXJyP1xuICAgICAgICBhbGVydCBzaGFyZXNcbiAgIyMjXG4gIEBmZXRjaFNoYXJlQ291bnQ6ICh1cmwsIGNhbGxiYWNrKSAtPlxuICAgICRcbiAgICAuYWpheFxuICAgICAgdXJsOiAnaHR0cHM6Ly9ncmFwaC5mYWNlYm9vay5jb20vJ1xuICAgICAgdHlwZTogJ2dldCdcbiAgICAgIGNhY2hlOiBmYWxzZVxuICAgICAgZGF0YTpcbiAgICAgICAgdXJsOiB1cmxcbiAgICAgIGRhdGFUeXBlOiAnanNvbnAnXG4gICAgICBzdWNjZXNzOiAoeyBzaGFyZXMgfSkgLT5cbiAgICAgICAgdW5sZXNzIHNoYXJlcz9cbiAgICAgICAgICBjYWxsYmFjayAnbm8gZGF0YSdcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgY2FsbGJhY2sgbnVsbCwgc2hhcmVzXG4gICAgICBlcnJvcjogKHt9LCB0eXBlKSAtPlxuICAgICAgICBjYWxsYmFjayB0eXBlXG4iLCJ7IHN0cmluZ2lmeSB9ID0gcmVxdWlyZSAnLi4vcXVlcnktc3RyaW5nJ1xuXG5cbiMjI1xuR29vZ2xlK+OBruaPkOS+m+OBmeOCi+OCteODvOODk+OCueOCkuWIqeeUqOOBmeOCi+OBn+OCgeOBruOCr+ODqeOCueOBp+OBmeOAglxuIyMjXG5tb2R1bGUuZXhwb3J0cyA9XG5jbGFzcyBUd2l0dGVyXG5cbiAgIyMjXG4gIOOCpuOCp+ODluOCteOCpOODiOOCkuOCt+OCp+OCouOBmeOCi+eCuuOBrlVSTOOCkueUn+aIkOOBl+OBvuOBmeOAglxuICBAcGFyYW0gW1N0cmluZ10gdXJsIOOCpuOCp+ODluOCteOCpOODiOOBrlVSTOOBp+OBmeOAglxuICBAcmV0dXJuIFtTdHJpbmddIOOCt+OCp+OCouOBmeOCi+eCuuOBrlVSTOOBp+OBmeOAglxuICAjIyNcbiAgQGNyZWF0ZVNoYXJlVXJsOiAodXJsKSAtPiBcImh0dHBzOi8vcGx1cy5nb29nbGUuY29tL3NoYXJlPyN7c3RyaW5naWZ5IHt1cmx9fVwiXG5cbiAgIyMjXG4gIOOCpuOCp+ODluOCteOCpOODiOOBruOCt+OCp+OCouaVsOOCkuWPluW+l+OBl+OBvuOBmeOAglxuICBAcGFyYW0gW1N0cmluZ10gdXJsIOOCpuOCp+ODluOCteOCpOODiOOBrlVSTOOBp+OBmeOAglxuICBAcGFyYW0gW0Z1bmN0aW9uXSBjYWxsYmFjayDjgrPjg7zjg6vjg5Djg4Pjgq/jgafjgZnjgIJcbiAgIyMjXG4gIEBmZXRjaFNoYXJlQ291bnQ6ICh1cmwsIGNhbGxiYWNrKSAtPlxuICAgICRcbiAgICAuYWpheFxuICAgICAgdXJsOiBcImh0dHA6Ly9xdWVyeS55YWhvb2FwaXMuY29tL3YxL3B1YmxpYy95cWw/ZW52PWh0dHA6Ly9kYXRhdGFibGVzLm9yZy9hbGx0YWJsZXMuZW52JnE9I3tlbmNvZGVVUklDb21wb25lbnQgXCJTRUxFQ1QgY29udGVudCBGUk9NIGRhdGEuaGVhZGVycyBXSEVSRSB1cmw9J2h0dHBzOi8vcGx1c29uZS5nb29nbGUuY29tL18vKzEvZmFzdGJ1dHRvbj9obD1qYSZ1cmw9I3t1cmx9JyBhbmQgdWE9JyN7dWF9J1wifVwiXG4gICAgICB0eXBlOiAnZ2V0J1xuICAgICAgY2FjaGU6IGZhbHNlXG4gICAgICBkYXRhVHlwZTogJ3htbCdcbiAgICAgIGVycm9yOiAoe30sIHR5cGUpIC0+XG4gICAgICAgIGNhbGxiYWNrIHR5cGVcbiAgICAgIHN1Y2Nlc3M6IChkb2N1bWVudCkgLT5cbiAgICAgICAgc3RyID0gJChkb2N1bWVudCkuZmluZCgnY29udGVudCcpLnRleHQoKS5tYXRjaCgvPHNjcmlwdCB0eXBlPVwidGV4dFxcL2phdmFzY3JpcHRcIj53aW5kb3dcXC5fX1NTUiA9IChbXFxzXFxTXSo/KTsvKVsxXVxuICAgICAgICBzdHIgPSBzdHIucmVwbGFjZSAvXFxyP1xcbi9nLCAnJ1xuICAgICAgICBvYmogPSBudWxsXG4gICAgICAgIGV2YWwgXCJvYmogPSAje3N0cn07XCJcbiAgICAgICAgY291bnQgPSBvYmoubGRbMV1bNF1cblxuICAgICAgICB1bmxlc3MgY291bnQ/XG4gICAgICAgICAgY2FsbGJhY2sgJ25vIGRhdGEnXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIGNhbGxiYWNrIG51bGwsIHBhcnNlSW50IGNvdW50LCAxMFxuIiwiIyMjXG5IYXRlbmHjga7mj5DkvpvjgZnjgovjgrXjg7zjg5PjgrnjgpLliKnnlKjjgZnjgovjgZ/jgoHjga7jgq/jg6njgrnjgafjgZnjgIJcbiMjI1xubW9kdWxlLmV4cG9ydHMgPVxuY2xhc3MgSGF0ZW5hXG5cbiAgIyMjXG4gIOOCpuOCp+ODluOCteOCpOODiOOCkuODluODg+OCr+ODnuODvOOCr+OBmeOCi+eCuuOBrlVSTOOCkueUn+aIkOOBl+OBvuOBmeOAglxuICBAcGFyYW0gW1N0cmluZ10gdXJsIOOCpuOCp+ODluOCteOCpOODiOOBrlVSTOOBp+OBmeOAglxuICBAcmV0dXJuIFtTdHJpbmddIOODluODg+OCr+ODnuODvOOCr+OBmeOCi+eCuuOBrlVSTOOBp+OBmeOAglxuICAjIyNcbiAgQGNyZWF0ZUJvb2ttYXJrVXJsOiAodXJsKSAtPlxuICAgICMgRG9uJ3QgZW5jb2RlIHVybC5cbiAgICBcImh0dHA6Ly9iLmhhdGVuYS5uZS5qcC9lbnRyeS9hZGQvI3t1cmx9XCJcbiIsInsgc3RyaW5naWZ5IH0gPSByZXF1aXJlICcuLi9xdWVyeS1zdHJpbmcnXG57IG1vYmlsZSB9ID0gcmVxdWlyZSAnLi4vLi4vbW9kZWxzL29zJ1xuXG5cbiMjI1xuTGluZeOBruaPkOS+m+OBmeOCi+OCteODvOODk+OCueOCkuWIqeeUqOOBmeOCi+OBn+OCgeOBruOCr+ODqeOCueOBp+OBmeOAglxuIyMjXG5tb2R1bGUuZXhwb3J0cyA9XG5jbGFzcyBMaW5lXG5cbiAgIyMjXG4gIOODhuOCreOCueODiOOCkuODgeODo+ODg+ODiOOBmeOCi+eCuuOBrlVSTOOCkueUn+aIkOOBl+OBvuOBmeOAglxuICBAcGFyYW0gW1N0cmluZ10gdGV4dCDjg4bjgq3jgrnjg4jjgafjgZnjgIJcbiAgQHJldHVybiBbU3RyaW5nXSDjg4Hjg6Pjg4Pjg4jjgZnjgovngrrjga5VUkzjgafjgZnjgIJcbiAgIyMjXG4gIEBjcmVhdGVDaGF0VXJsOiAodGV4dCkgLT5cbiAgICB0ZXh0ID0gZW5jb2RlVVJJQ29tcG9uZW50IHRleHRcbiAgICBpZiBtb2JpbGVcbiAgICAgIFwibGluZTovL21zZy90ZXh0LyN7dGV4dH1cIlxuICAgIGVsc2VcbiAgICAgIFwiaHR0cDovL2xpbmUubmF2ZXIuanAvUi9tc2cvdGV4dC8/I3t0ZXh0fVwiXG4iLCJ7IHN0cmluZ2lmeSB9ID0gcmVxdWlyZSAnLi4vcXVlcnktc3RyaW5nJ1xuXG5cbiMjI1xuUGludGVyZXN044Gu5o+Q5L6b44GZ44KL44K144O844OT44K544KS5Yip55So44GZ44KL44Gf44KB44Gu44Kv44Op44K544Gn44GZ44CCXG4jIyNcbm1vZHVsZS5leHBvcnRzID1cbmNsYXNzIFBpbnRlcmVzdFxuXG4gICMjI1xuICDjgqbjgqfjg5bjgrXjgqTjg4jjgpLjg5Tjg7PjgZnjgovngrrjga5VUkzjgpLnlJ/miJDjgZfjgb7jgZnjgIJcbiAgQHBhcmFtIFtPYmplY3RdIG9wdGlvbnMg44Kq44OX44K344On44Oz44Gn44GZ44CCXG4gIEBvcHRpb24gb3B0aW9ucyBbU3RyaW5nXSB1cmwg44Km44Kn44OW44K144Kk44OI44GuVVJM44Gn44GZ44CCXG4gIEBvcHRpb24gb3B0aW9ucyBbU3RyaW5nXSBtZWRpYSDnlLvlg4/nrYnjga7jg6Hjg4fjgqPjgqLjga5VUkzjgafjgZnjgIJcbiAgQG9wdGlvbiBvcHRpb25zIFtTdHJpbmddIGRlc2NyaXB0aW9uIOiqrOaYjuaWh+OBp+OBmeOAglxuICBAcmV0dXJuIFtTdHJpbmddIOOCt+OCp+OCouOBmeOCi+eCuuOBrlVSTOOBp+OBmeOAglxuICAjIyNcbiAgQGNyZWF0ZVBpbkl0VXJsOiAob3B0aW9ucykgLT5cbiAgICBcImh0dHA6Ly93d3cucGludGVyZXN0LmNvbS9waW4vY3JlYXRlL2J1dHRvbi8/I3tzdHJpbmdpZnkgb3B0aW9uc31cIlxuIiwieyBzdHJpbmdpZnkgfSA9IHJlcXVpcmUgJy4uL3F1ZXJ5LXN0cmluZydcblxuXG4jIyNcblR3aXR0ZXLjga7mj5DkvpvjgZnjgovjgrXjg7zjg5PjgrnjgpLliKnnlKjjgZnjgovjgZ/jgoHjga7jgq/jg6njgrnjgafjgZnjgIJcbiMjI1xubW9kdWxlLmV4cG9ydHMgPVxuY2xhc3MgVHdpdHRlclxuXG4gICMjI1xuICDjgqbjgqfjg5bjgrXjgqTjg4jjgpLjg4TjgqTjg7zjg4jjgZnjgovngrrjga5VUkzjgpLnlJ/miJDjgZfjgb7jgZnjgIJcbiAgQHBhcmFtIFtPYmplY3RdIG9wdGlvbnMg44Kq44OX44K344On44Oz44Gn44GZ44CCXG4gIEBvcHRpb24gb3B0aW9ucyBbU3RyaW5nXSB0ZXh0IOiqrOaYjuaWh+OBp+OBmeOAglxuICBAb3B0aW9uIG9wdGlvbnMgW1N0cmluZ10gdXJsIOOCpuOCp+ODluOCteOCpOODiOOBrlVSTOOBp+OBmeOAglxuICBAb3B0aW9uIG9wdGlvbnMgW1N0cmluZ10gaGFzaHRhZ3Mg44OP44OD44K344Ol44K/44Kw44Gn44GZ44CCXG4gIEByZXR1cm4gW1N0cmluZ10g44OE44Kk44O844OI44GZ44KL54K644GuVVJM44Gn44GZ44CCXG4gICMjI1xuICBAY3JlYXRlVHdlZXRVcmw6ICh7dGV4dCwgdXJsLCBoYXNodGFnc30pIC0+XG4gICAgXCJodHRwOi8vdHdpdHRlci5jb20vc2hhcmU/I3tzdHJpbmdpZnkge3RleHQsIHVybCwgaGFzaHRhZ3N9fVwiXG5cbiAgIyMjXG4gIOOCpuOCp+ODluOCteOCpOODiOOBruODhOOCpOODvOODiOaVsOOCkuWPluW+l+OBl+OBvuOBmeOAglxuICBAcGFyYW0gW1N0cmluZ10gdXJsIOOCpuOCp+ODluOCteOCpOODiOOBrlVSTOOBp+OBmeOAglxuICBAcGFyYW0gW0Z1bmN0aW9uXSBjYWxsYmFjayDjgrPjg7zjg6vjg5Djg4Pjgq/jgafjgZnjgIJcbiAgIyMjXG4gIEBmZXRjaFR3ZWV0Q291bnQ6ICh1cmwsIGNhbGxiYWNrKSAtPlxuICAgICRcbiAgICAuYWpheFxuICAgICAgdXJsOiAnaHR0cDovL3VybHMuYXBpLnR3aXR0ZXIuY29tLzEvdXJscy9jb3VudC5qc29uJ1xuICAgICAgdHlwZTogJ2dldCdcbiAgICAgIGNhY2hlOiBmYWxzZVxuICAgICAgZGF0YTogdXJsOiB1cmxcbiAgICAgIGRhdGFUeXBlOiAnanNvbnAnXG4gICAgICBlcnJvcjogKHt9LCB0eXBlKSAtPlxuICAgICAgICBjYWxsYmFjayB0eXBlXG4gICAgICBzdWNjZXNzOiAoeyBjb3VudCB9KSAtPlxuICAgICAgICB1bmxlc3MgY291bnQ/XG4gICAgICAgICAgY2FsbGJhY2sgJ25vIGRhdGEnXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIGNhbGxiYWNrIG51bGwsIGNvdW50XG4iLCIjIyNcbkFuY2hvciBpcyBhIHdyYXBwZXIgb2YgPGEgaHJlZj1cIiMqXCI+LlxuIyMjXG5cblZpZXcgPSByZXF1aXJlICcuL3ZpZXcnXG4kID0gcmVxdWlyZSAnanF1ZXJ5J1xuXG5cbm1vZHVsZS5leHBvcnRzID1cbmNsYXNzIEFuY2hvciBleHRlbmRzIFZpZXdcblxuICAjIyNcbiAgQ3JlYXRlcyBhIEFuY2hvciBpbnN0YW5jZS5cbiAgIyMjXG4gIGNvbnN0cnVjdG9yOiAtPlxuICAgIHN1cGVyXG5cbiAgICBAb24gJ2NsaWNrJywgQG9uQ2xpY2tcblxuICAjIyNcbiAgQ2xpY2sgZXZlbnRcbiAgIyMjXG4gIG9uQ2xpY2s6IChlKSA9PlxuICAgIGhyZWYgPSBAYXR0ciAnaHJlZidcbiAgICBpZiBocmVmIGlzICcjJ1xuICAgICAgdG9wID0gMFxuICAgIGVsc2VcbiAgICAgICRlbCA9ICQgaHJlZlxuICAgICAgcmV0dXJuIGlmICRlbC5sZW5ndGggaXMgMFxuICAgICAgdG9wID0gJGVsLm9mZnNldCgpLnRvcFxuXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAkICdodG1sLGJvZHknXG4gICAgLnN0b3AgdHJ1ZSwgZmFsc2VcbiAgICAuYW5pbWF0ZVxuICAgICAgc2Nyb2xsVG9wOiB0b3BcbiAgICAsIDYwMCAjLCAnZWFzZU91dFF1YWQnXG4iLCIjIyNcbkJyZWFrcG9pbnQgY2FsbCByZWdpc3RlcmVkIGNhbGxiYWNrIHdoZW4gd2luZG93IHdpZHRoIGNvbnRhaW5zIHJlZ2lzdGVyZWQgcmFuZ2UuXG4jIyNcblxuVmlldyA9IHJlcXVpcmUgJy4vdmlldydcblxubW9kdWxlLmV4cG9ydHMgPVxuY2xhc3MgQnJlYWtwb2ludCBleHRlbmRzIFZpZXdcblxuICBicmVha3BvaW50OiB7XG4gICAgIycwLi42NDAnOiAnb25TbWFsbGVyVGhhbjY0MCdcbiAgfVxuXG4gICMjI1xuICBDcmVhdGVzIGEgQnJlYWtwb2ludCBpbnN0YW5jZS5cbiAgIyMjXG4gIGNvbnN0cnVjdG9yOiAtPlxuICAgIHN1cGVyXG5cbiAgICBAYnJlYWtwb2ludHMgPSBbXVxuICAgIGZvciBjb25kaXRpb24sIGNhbGxiYWNrIG9mIEBicmVha3BvaW50XG4gICAgICBtYXRjaGVkID0gY29uZGl0aW9uLm1hdGNoIC9eKFxcZCopKFxcLnsyLDN9KShcXGQqKSQvXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yICdicmVha3BvaW50IHNob3VsZCBiZSB3cml0dGVuIGxpa2UgNjQwLi4xMDgwIG9yIDY0MC4uLjEwODAnIHVubGVzcyBtYXRjaGVkP1xuICAgICAgQGJyZWFrcG9pbnRzLnB1c2hcbiAgICAgICAgc3RhcnQgICAgICAgIDogaWYgbWF0Y2hlZFsxXSBpcyAnJyB0aGVuIE51bWJlci5NSU5fVkFMVUUgZWxzZSBwYXJzZUZsb2F0IG1hdGNoZWRbMV1cbiAgICAgICAgZW5kICAgICAgICAgIDogaWYgbWF0Y2hlZFszXSBpcyAnJyB0aGVuIE51bWJlci5NQVhfVkFMVUUgZWxzZSBwYXJzZUZsb2F0IG1hdGNoZWRbM11cbiAgICAgICAgaXNDb250YWluc0VuZDogbWF0Y2hlZFsyXS5sZW5ndGggaXMgMlxuICAgICAgICBjYWxsYmFjayAgICAgOiBAW2NhbGxiYWNrXVxuICAgIEBjb25zdHJ1Y3Rvci4kd2luZG93XG4gICAgLm9uICdsb2FkJywgQG9uV2luZG93TG9hZFxuICAgIC5vbiAncmVzaXplJywgQG9uV2luZG93UmVzaXplZFxuXG4gICMjI1xuICBTdG9wcyBsaXN0ZW5pbmcgZXZlbnRzIGFuZCBkZWxldGVzIHJlZmVyZW5jZXMuXG4gICMjI1xuICBkZXN0cnVjdDogLT5cbiAgICBAY29uc3RydWN0b3IuJHdpbmRvdy5vZmYgJ2xvYWQnLCBAb25XaW5kb3dMb2FkXG4gICAgQGNvbnN0cnVjdG9yLiR3aW5kb3cub2ZmICdyZXNpemUnLCBAb25XaW5kb3dSZXNpemVkXG4gICAgc3VwZXJcblxuICBvbldpbmRvd0xvYWQ6ID0+XG4gICAgQG9uV2luZG93UmVzaXplZCgpXG5cbiAgIyMjXG4gIENhbGxzIGNhbGxiYWNrcyBjb250YWlucyBjdXJyZW50IHdpbmRvdyB3aWR0aC5cbiAgIyMjXG4gIG9uV2luZG93UmVzaXplZDogPT5cbiAgICB3aW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoID8gQGNvbnN0cnVjdG9yLiR3aW5kb3cuaW5uZXJXaWR0aCgpXG4gICAgZm9yIHsgc3RhcnQsIGVuZCwgaXNDb250YWluc0VuZCwgY2FsbGJhY2sgfSBpbiBAYnJlYWtwb2ludHNcbiAgICAgIGlmIGlzQ29udGFpbnNFbmRcbiAgICAgICAgaWYgc3RhcnQgPD0gd2luZG93V2lkdGggPD0gZW5kXG4gICAgICAgICAgY2FsbGJhY2suY2FsbCBALCB3aW5kb3dXaWR0aFxuICAgICAgZWxzZVxuICAgICAgICBpZiBzdGFydCA8PSB3aW5kb3dXaWR0aCA8IGVuZFxuICAgICAgICAgIGNhbGxiYWNrLmNhbGwgQCwgd2luZG93V2lkdGhcbiAgICBAb25SZXNpemVkKClcblxuICAjIyNcbiAgQ2FsbGVkIGFmdGVyIGFsbCBjYWxsYmFja3MgYXJlIGNhbGxlZC5cbiAgIyMjXG4gIG9uUmVzaXplZDogLT5cbiIsIiMjI1xuQ2hlY2tib3ggaXMgYSB3cmFwcGVyIG9mIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIj4uXG4jIyNcblxuVmlldyA9IHJlcXVpcmUgJy4vdmlldydcblxubW9kdWxlLmV4cG9ydHMgPVxuY2xhc3MgQ2hlY2tib3ggZXh0ZW5kcyBWaWV3XG5cbiAgY2hlY2tlZDogJ2lzLWNoZWNrZWQnXG5cbiAgIyMjXG4gIENyZWF0ZXMgYSBDaGVja2JveCBpbnN0YW5jZS5cbiAgIyMjXG4gIGNvbnN0cnVjdG9yOiAtPlxuICAgIHN1cGVyXG4gICAgQCRjaGVja2JveCA9IEAkICdpbnB1dFt0eXBlPWNoZWNrYm94XSdcbiAgICAub24gJ2NoYW5nZScsIEB1cGRhdGVcbiAgICBAdXBkYXRlKClcblxuICAjIyNcbiAgUmVmbGVjdHMgY2hlY2tlZCBzdGF0dXMgb2YgdGhlIHJhdyBlbGVtZW50IHRvIG15c2VsZi5cbiAgIyMjXG4gIHVwZGF0ZTogPT5cbiAgICBpZiBAJGNoZWNrYm94LnByb3AgJ2NoZWNrZWQnXG4gICAgICBAYWRkQ2xhc3MgQGNoZWNrZWRcbiAgICBlbHNlXG4gICAgICBAcmVtb3ZlQ2xhc3MgQGNoZWNrZWRcbiIsIiMjI1xuRHJhd2VyIGNsYXNzLlxuIyMjXG5cblZpZXcgPSByZXF1aXJlICcuL3ZpZXcnXG5cbm1vZHVsZS5leHBvcnRzID1cbmNsYXNzIERyYXdlciBleHRlbmRzIFZpZXdcblxuICBzZWxlY3RvckJ1dHRvbjogJy5qcy1idXR0b24nXG4gIHNlbGVjdG9yQ29udGVudDogJy5qcy1jb250ZW50J1xuICBjbGFzc09wZW5lZDogJ2lzLW9wZW5lZCdcblxuICBjb25zdHJ1Y3RvcjogLT5cbiAgICBzdXBlclxuICAgIEAkIEBzZWxlY3RvckJ1dHRvblxuICAgIC5vbiAnY2xpY2snLCBAdG9nZ2xlXG4gICAgQGNvbnRlbnQgPSBAJCBAc2VsZWN0b3JDb250ZW50XG5cbiAgdG9nZ2xlOiAoe30sIGluZGV4KSA9PlxuICAgIGlmIEBoYXNDbGFzcyBAY2xhc3NPcGVuZWRcbiAgICAgIEByZW1vdmVDbGFzcyBAY2xhc3NPcGVuZWRcbiAgICAgIEBjb250ZW50XG4gICAgICAuc3RvcCB0cnVlLCBmYWxzZVxuICAgICAgLnNsaWRlVXAoKVxuICAgIGVsc2VcbiAgICAgIEBhZGRDbGFzcyBAY2xhc3NPcGVuZWRcbiAgICAgIEBjb250ZW50XG4gICAgICAuc3RvcCB0cnVlLCBmYWxzZVxuICAgICAgLnNsaWRlRG93bigpXG4iLCJWaWV3ID0gcmVxdWlyZSAnLi92aWV3J1xueyBtc2llLCB2ZXJzaW9uTnVtYmVyIH0gPSByZXF1aXJlICcuLi9tb2RlbHMvYnJvd3NlcidcbiQgPSByZXF1aXJlICdqcXVlcnknXG5cblxuIyMjXG5JbWFnZeOCr+ODqeOCueOBp+OBmeOAglxuYDxpbWc+YOimgee0oOOBruihqOekuueKtuaFi+OBq+OBi+OBi+OCj+OCieOBmuOAgeeUu+WDj+OCkuODreODvOODieOBl+OCteOCpOOCuuOCkuWPluW+l+OBmeOCi+OBk+OBqOOBjOOBp+OBjeOBvuOBmeOAglxuIyMjXG5tb2R1bGUuZXhwb3J0cyA9XG5jbGFzcyBJbWFnZSBleHRlbmRzIFZpZXdcblxuICAjIyNcbiAgSW1hZ2XjgqTjg7Pjgrnjgr/jg7PjgrnjgpLnlJ/miJDjgZfjgb7jgZnjgIJcbiAgIyMjXG4gIGNvbnN0cnVjdG9yOiAtPlxuICAgIHN1cGVyXG4gICAgQHNyYyA9IEBhdHRyICdzcmMnXG4gICAgQGxvYWRlciA9ICQgJzxpbWc+J1xuICAgIEB3cmFwcGVyID0gJCAnPGRpdj4nXG4gICAgLmF0dHJcbiAgICAgIHdpZHRoOiAwXG4gICAgICBoZWlnaHQ6IDBcbiAgICAgIG92ZXJmbG93OiAnaGlkZGVuJ1xuICAgICAgdmlzaWJpbGl0eTogJ2hpZGRlbidcbiAgICAuYXBwZW5kIEBsb2FkZXJcblxuICAjIyNcbiAg55S75YOP44KS44Ot44O844OJ44GX44G+44GZ44CCXG4gIEBldmVudCAnaW1hZ2UuY29tcGxldGUnXG4gICMjI1xuICBsb2FkOiAoc3JjKSAtPlxuICAgIGlmIHNyYz9cbiAgICAgIEBzcmMgPSBzcmNcbiAgICByZXR1cm4gaWYgQHNyYyBpcyAnJ1xuXG4gICAgQHVubG9hZCgpXG4gICAgQHN0YXJ0TGlzdGVuaW5nKClcbiAgICBAbG9hZGVyLmF0dHIgc3JjOiBpZiBtc2llIGFuZCB2ZXJzaW9uTnVtYmVyIDwgOVxuICAgICAgXCIje0BzcmN9PyN7bmV3IERhdGUoKS5nZXRUaW1lKCl9XCJcbiAgICBlbHNlXG4gICAgICBAc3JjXG5cbiAgIyMjXG4gIOeUu+WDj+OCkuOCouODs+ODreODvOODieOBl+OBvuOBmeOAglxuICAjIyNcbiAgdW5sb2FkOiAtPlxuICAgIEBzdG9wTGlzdGVuaW5nKClcbiAgICBAbG9hZGVyLmF0dHIgc3JjOiAnJ1xuXG4gICMjI1xuICBAcHJpdmF0ZVxuICAjIyNcbiAgc3RhcnRMaXN0ZW5pbmc6IC0+XG4gICAgQGxvYWRlci5vbmUgJ2xvYWQgZXJyb3InLCBAb25Mb2FkQ29tcGxldGVcblxuICAjIyNcbiAgQHByaXZhdGVcbiAgIyMjXG4gIHN0b3BMaXN0ZW5pbmc6IC0+XG4gICAgQGxvYWRlci5vZmYgJ2xvYWQgZXJyb3InLCBAb25Mb2FkQ29tcGxldGVcblxuICAjIyNcbiAgQHByaXZhdGVcbiAgIyMjXG4gIG9uTG9hZENvbXBsZXRlOiA9PlxuICAgIEBzdG9wTGlzdGVuaW5nKClcbiAgICBAd3JhcHBlci5hcHBlbmRUbyAnYm9keSdcbiAgICBAYXR0clxuICAgICAgc3JjOiBAc3JjXG4gICAgICB3aWR0aDogQGxvYWRlci53aWR0aCgpXG4gICAgICBoZWlnaHQ6IEBsb2FkZXIud2lkdGgoKVxuICAgIEB3cmFwcGVyLnJlbW92ZSgpXG4gICAgQHRyaWdnZXIgJ2ltYWdlLmxvYWRlZCdcbiIsIlZpZXcgPSByZXF1aXJlICcuL3ZpZXcnXG57IGFzc2lnbiB9ID0gcmVxdWlyZSAnbG9kYXNoJ1xuaW90YSA9IHJlcXVpcmUoJy4uL21vZGVscy9pb3RhJykoKVxuXG5cbm1vZHVsZS5leHBvcnRzID1cbmNsYXNzIE1hc2tGYWN0b3J5IGV4dGVuZHMgVmlld1xuXG4gIEBMRUZUOiAxIDw8IGlvdGEoKVxuICBAUklHSFQ6IDEgPDwgaW90YSgpXG4gIEBUT1A6IDEgPDwgaW90YSgpXG4gIEBCT1RUT006IDEgPDwgaW90YSgpXG5cbiAgY2xhc3NPdXRlcjogJ2pzLW1hc2tmYWN0b3J5LW91dGVyJ1xuICBjbGFzc01hc2s6ICdqcy1tYXNrZmFjdG9yeS1tYXNrJ1xuICBjbGFzc0lubmVyOiAnanMtbWFza2ZhY3RvcnktaW5uZXInXG5cbiAgY29uc3RydWN0b3I6ICh7fSwgQG9yaWdpbiA9IEBjb25zdHJ1Y3Rvci5MRUZUKSAtPlxuICAgIHN1cGVyXG5cbiAgICBAb3V0ZXIgPSBAd3JhcElubmVyICc8ZGl2PidcbiAgICAuY2hpbGRyZW4oKVxuICAgIC5hZGRDbGFzcyBAY2xhc3NPdXRlclxuXG4gICAgQG1hc2sgPSBAb3V0ZXIud3JhcElubmVyICc8ZGl2PidcbiAgICAuY2hpbGRyZW4oKVxuICAgIC5hZGRDbGFzcyBAY2xhc3NNYXNrXG4gICAgLmNzc1xuICAgICAgd2lkdGg6ICcxMDAlJ1xuICAgICAgaGVpZ2h0OiAnMTAwJSdcblxuICAgIEBpbm5lciA9IEBtYXNrLndyYXBJbm5lciAnPGRpdj4nXG4gICAgLmNoaWxkcmVuKClcbiAgICAuYWRkQ2xhc3MgQGNsYXNzSW5uZXJcblxuICAgIGlmIChAb3JpZ2luICYgQGNvbnN0cnVjdG9yLkxFRlQpIGlzIEBjb25zdHJ1Y3Rvci5MRUZUXG4gICAgICBAbWFzay5jc3MgbGVmdDogMFxuICAgICAgQGlubmVyLmNzcyBsZWZ0OiAwXG4gICAgaWYgKEBvcmlnaW4gJiBAY29uc3RydWN0b3IuUklHSFQpIGlzIEBjb25zdHJ1Y3Rvci5SSUdIVFxuICAgICAgQG1hc2suY3NzIHJpZ2h0OiAwXG4gICAgICBAaW5uZXIuY3NzIHJpZ2h0OiAwXG4gICAgaWYgKEBvcmlnaW4gJiBAY29uc3RydWN0b3IuVE9QKSBpcyBAY29uc3RydWN0b3IuVE9QXG4gICAgICBAbWFzay5jc3MgdG9wOiAwXG4gICAgICBAaW5uZXIuY3NzIHRvcDogMFxuICAgIGlmIChAb3JpZ2luICYgQGNvbnN0cnVjdG9yLkJPVFRPTSkgaXMgQGNvbnN0cnVjdG9yLkJPVFRPTVxuICAgICAgQG1hc2suY3NzIGJvdHRvbTogMFxuICAgICAgQGlubmVyLmNzcyBib3R0b206IDBcblxuICAgIEBjb25zdHJ1Y3Rvci4kd2luZG93Lm9uICdsb2FkIHJlc2l6ZScsIEBvbldpbmRvd1Jlc2l6ZWRcbiAgICBAb25XaW5kb3dSZXNpemVkKClcblxuICBnZXRNYXNrOiAtPiBAbWFza1xuXG4gIG9uV2luZG93UmVzaXplZDogPT5cbiAgICBtYXNrQ3NzID1cbiAgICAgIHdpZHRoOiBAbWFza1swXS5zdHlsZS53aWR0aFxuICAgICAgaGVpZ2h0OiBAbWFza1swXS5zdHlsZS5oZWlnaHRcblxuICAgIEBvdXRlclxuICAgIC5jc3NcbiAgICAgIHBvc2l0aW9uOiAnJ1xuICAgIEBtYXNrXG4gICAgLmNzc1xuICAgICAgcG9zaXRpb246ICcnXG4gICAgICBvdmVyZmxvdzogJydcbiAgICAgIHdpZHRoOiAnJ1xuICAgICAgaGVpZ2h0OiAnJ1xuICAgIEBpbm5lclxuICAgIC5jc3NcbiAgICAgIHBvc2l0aW9uOiAnJ1xuXG4gICAgc2l6ZUNzcyA9XG4gICAgICB3aWR0aDogQHdpZHRoKClcbiAgICAgIGhlaWdodDogQGhlaWdodCgpXG5cbiAgICBAb3V0ZXJcbiAgICAuY3NzIGFzc2lnbiBzaXplQ3NzLFxuICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZSdcbiAgICBAbWFza1xuICAgIC5jc3MgYXNzaWduIG1hc2tDc3MsXG4gICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJ1xuICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nXG4gICAgQGlubmVyXG4gICAgLmNzcyBhc3NpZ24gc2l6ZUNzcyxcbiAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnXG4iLCJWaWV3ID0gcmVxdWlyZSAnLi92aWV3J1xuXG5cbiMjI1xu44Om44O844K244Kk44OZ44Oz44OI44Gu5Lyd5pKt44KS5YGc5q2i44GZ44KLVmlld+OBp+OBmeOAglxuIyMjXG5tb2R1bGUuZXhwb3J0cyA9XG5jbGFzcyBQcmV2ZW50YWJsZSBleHRlbmRzIFZpZXdcblxuICAjIyNcbiAgQHByaXZhdGVcbiAgQHByb3BlcnR5IFN0cmluZyDlgZzmraLlr77osaHjga7jgqTjg5njg7Pjg4jjgafjgZnjgIJcbiAgIyMjXG4gIGV2ZW50czogJ1xuICAgIGJsdXIgZm9jdXMgZm9jdXNpbiBmb2N1c291dCBsb2FkIHJlc2l6ZSBzY3JvbGwgdW5sb2FkIGNsaWNrIGRibGNsaWNrXG4gICAgbW91c2Vkb3duIG1vdXNldXAgbW91c2Vtb3ZlIG1vdXNlb3ZlciBtb3VzZW91dCBtb3VzZWVudGVyIG1vdXNlbGVhdmVcbiAgICBjaGFuZ2Ugc2VsZWN0IHN1Ym1pdCBrZXlkb3duIGtleXByZXNzIGtleXVwIGVycm9yXG4gICAgJ1xuXG4gICMjI1xuICDjgqTjg7Pjgrnjgr/jg7PjgrnjgpLnlJ/miJDjgZfjgb7jgZnjgIJcbiAgIyMjXG4gIGNvbnN0cnVjdG9yOiAtPlxuICAgIHN1cGVyXG5cbiAgICBAZW5hYmxlZCA9IHRydWVcbiAgICBAb24gQGV2ZW50cywgQG9uTW91c2VcblxuICAjIyNcbiAgQHByaXZhdGVcbiAg44Kk44OZ44Oz44OI55m655Sf5pmC44GrYGVuYWJsZWRg44GMYGZhbHNlYOOBquOCieOCpOODmeODs+ODiOOBq+mWouOBmeOCi+WFqOOBpuOBruWLleS9nOOCkuWBnOatouOBl+OBvuOBmeOAglxuXG4gIDEuIOODh+ODleOCqeODq+ODiOWLleS9nOOCkuWBnOatouOBl+OBvuOBmeOAglxuICAyLiDjgqTjg5njg7Pjg4jjga7kvJ3mkq3jgpLlgZzmraLjgZfjgb7jgZnjgIJcbiAgMy4g44GT44Gu44Kk44Oz44K544K/44Oz44K544Gu44Kz44Oz44K544OI44Op44Kv44K/5Lul6ZmN44Gr55m76Yyy44GV44KM44Gf44Kk44OZ44Oz44OI44Gu44Kz44O844Or44OQ44OD44Kv44KS44Kz44O844Or44GX44G+44Gb44KT44CCXG4gICMjI1xuICBvbk1vdXNlOiAoZSkgPT5cbiAgICB1bmxlc3MgQGVuYWJsZWRcbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKVxuIiwiVmlldyA9IHJlcXVpcmUgJy4vdmlldydcbiQgPSByZXF1aXJlICdqcXVlcnknXG5cblxuIyMjXG5gPGlucHV0IHR5cGU9XCJyYWRpb1wiPmDjgpLjgrnjgr/jgqTjg6rjg7PjgrDjgZnjgovjgZ/jgoHjga7jg6njg4Pjg5HjgafjgZnjgIJcbuODqeOCuOOCquODnOOCv+ODs+OBrueKtuaFi+OCkuOCr+ODqeOCueOBqOOBl+OBpuimgee0oOOBq+S7mOS4juOBmeOCi+OBk+OBqOOBp0NTU+OBq+eKtuaFi+OCkuS8nemBlOOBl+OBvuOBmeOAglxuXG7jg6njgrjjgqrjg5zjgr/jg7PjgYzlhYPjgIXjgoLjgaPjgabjgYTjgovkuIvoqJjjga7mqZ/og73jgpLjgrXjg53jg7zjg4jjgZfjgb7jgZnjgIJcbi0gYHNlbGVjdGVkYOWxnuaAp+OBjOS7mOOBhOOBpuOBhOOCi+WgtOWQiOOBr+WIneacn+WMluaZguOBq+mBuOaKnuOBleOCjOOBpuOBhOOCi+OCr+ODqeOCueOCkuS7mOS4juOBl+OBvuOBmeOAglxuLSBgbmFtZWDlsZ7mgKfjgavjgojjgovjgrDjg6vjg7zjg5Tjg7PjgrDjgYzmnInlirnjgafjgZnjgIJcbuOCsOODq+ODvOODl+OBruS4reOBrjHjgaTjgYzjg6bjg7zjgrbjgavjgojjgorpgbjmip7jgZXjgozjgovjgajml6Ljgavpgbjmip7jgZXjgozjgabjgYTjgZ/jg6njgrjjgqrjg5zjgr/jg7Pjga/pgbjmip7nirbmhYvjgafjga/jgarjgY/jgarjgorjgb7jgZnjgIJcblxuQGV4YW1wbGUg44Op44K444Kq44Oc44K/44Oz44Gu44Oe44O844Kv44Ki44OD44OXXG4gICAgPHNwYW4gY2xhc3M9XCJyYWRpb1wiPlxuICAgICAgPGlucHV0IHR5cGU9XCJyYWRpb1wiPlxuICAgIDwvc3Bhbj5cbiMjI1xubW9kdWxlLmV4cG9ydHMgPVxuY2xhc3MgUmFkaW8gZXh0ZW5kcyBWaWV3XG5cbiAgIyMjXG4gIEBwcm9wZXJ0eSBTdHJpbmcg44Op44K444Kq44Oc44K/44Oz44GMYGNoZWNrZWRg44Gr44Gq44Gj44Gf6Zqb44Gr6KaB57Sg44Gr5LuY5LiO44GV44KM44KL44Kv44Op44K55ZCN44Gn44GZ44CCXG4gICMjI1xuICBjaGVja2VkOiAnaXMtY2hlY2tlZCdcblxuICAjIyNcbiAg44Kk44Oz44K544K/44Oz44K544KS55Sf5oiQ44GX44G+44GZ44CCXG4gICMjI1xuICBjb25zdHJ1Y3RvcjogLT5cbiAgICBzdXBlclxuICAgIEByYWRpbyA9IEAkICdpbnB1dFt0eXBlPXJhZGlvXSdcbiAgICAub24gJ2NoYW5nZSByYWRpb0NoYW5nZScsIEB1cGRhdGVcbiAgICBpZiAobmFtZSA9IEByYWRpby5hdHRyICduYW1lJykgaXNudCAnJ1xuICAgICAgQG90aGVyUmFkaW9zID0gJCBcImlucHV0W3R5cGU9cmFkaW9dW25hbWU9I3tuYW1lfV1cIlxuICAgICAgLm5vdCBAcmFkaW9cbiAgICBAdXBkYXRlKClcblxuICAjIyNcbiAgQHByaXZhdGVcbiAg44Op44K444Kq44Oc44K/44Oz44Gu54q25oWL44Gr44KI44KK44Kv44Op44K544KS5LuY5LiO44O76Zmk5Y6744GX44G+44GZ44CCXG4gICMjI1xuICB1cGRhdGU6ID0+XG4gICAgaWYgQHJhZGlvLnByb3AgJ2NoZWNrZWQnXG4gICAgICBAYWRkQ2xhc3MgQGNoZWNrZWRcbiAgICAgIEBvdGhlclJhZGlvcz8udHJpZ2dlciAncmFkaW9DaGFuZ2UnXG4gICAgZWxzZVxuICAgICAgQHJlbW92ZUNsYXNzIEBjaGVja2VkXG4iLCIjIyNcblNlbGVjdCBpcyBhIHdyYXBwZXIgb2YgPGlucHV0IHR5cGU9XCJyYWRpb1wiPi5cbiMjI1xuXG5WaWV3ID0gcmVxdWlyZSAnLi92aWV3J1xuXG5tb2R1bGUuZXhwb3J0cyA9XG5jbGFzcyBTZWxlY3QgZXh0ZW5kcyBWaWV3XG5cbiAgbGFiZWw6ICcuanMtbGFiZWwnXG5cbiAgIyMjXG4gIENyZWF0ZXMgYSBTZWxlY3QgaW5zdGFuY2UuXG4gICMjI1xuICBjb25zdHJ1Y3RvcjogLT5cbiAgICBzdXBlclxuICAgIEAkbGFiZWwgPSBAJCBAbGFiZWxcbiAgICBAJHNlbGVjdCA9IEAkICdzZWxlY3QnXG4gICAgLm9uICdjaGFuZ2UnLCBAdXBkYXRlXG4gICAgQHVwZGF0ZSgpXG5cbiAgIyMjXG4gIFJlZmxlY3RzIHNlbGVjdGVkIHRleHQgb2YgdGhlIHJhdyBlbGVtZW50IHRvIHRoZSBsYWJlbCBlbGVtZW50LlxuICAjIyNcbiAgdXBkYXRlOiA9PlxuICAgIEAkbGFiZWwudGV4dCBAJHNlbGVjdC5maW5kKCdvcHRpb246c2VsZWN0ZWQnKS50ZXh0KClcbiIsIiMjI1xuU2VsZWN0YWJsZSBjbGFzcy5cbiMjI1xuXG5WaWV3ID0gcmVxdWlyZSAnLi92aWV3J1xuXG5cbm1vZHVsZS5leHBvcnRzID1cbmNsYXNzIFNlbGVjdGFibGUgZXh0ZW5kcyBWaWV3XG5cbiAgY29uc3RydWN0b3I6IC0+XG4gICAgc3VwZXJcbiAgICBAc2VsZWN0ZWVzID0gQGNoaWxkcmVuKClcbiAgICAub24gJ2NsaWNrJywgQHRvZ2dsZVxuXG4gIHRvZ2dsZTogKGUpID0+XG4gICAgc2VsZWN0ZWRJbmRleCA9IEBzZWxlY3RlZXMuaW5kZXggZS5jdXJyZW50VGFyZ2V0XG4gICAgQHNlbGVjdEF0IHNlbGVjdGVkSW5kZXhcbiAgICBAdHJpZ2dlciAnc2VsZWN0YWJsZS5jaGFuZ2VkJywgc2VsZWN0ZWRJbmRleFxuXG4gIHNlbGVjdEF0OiAoc2VsZWN0ZWRJbmRleCkgLT5cbiAgICBAc2VsZWN0ZWVzXG4gICAgLnJlbW92ZUNsYXNzICdpcy1zZWxlY3RlZCdcbiAgICAuZXEgc2VsZWN0ZWRJbmRleFxuICAgIC5hZGRDbGFzcyAnaXMtc2VsZWN0ZWQnXG4iLCIkID0gcmVxdWlyZSAnanF1ZXJ5J1xuVmlldyA9IHJlcXVpcmUgJy4vdmlldydcbmlvdGEgPSByZXF1aXJlKCcuLi9tb2RlbHMvaW90YScpKClcblxuaGFzQWxwaGEgPSAoeyBkYXRhIH0pIC0+XG4gIGZvciB7fSwgaSBpbiBkYXRhIGJ5IDRcbiAgICBpZiBkYXRhW2kgKyAzXSBpc250IDBcbiAgICAgIHJldHVybiB0cnVlXG4gIGZhbHNlXG5cbm1vZHVsZS5leHBvcnRzID1cbmNsYXNzIFNsaWNlciBleHRlbmRzIFZpZXdcblxuICBAWDogMSA8PCBpb3RhKClcbiAgQFk6IDEgPDwgaW90YSgpXG5cbiAgQHJlcGxhY2U6IChpbWcsIGRpcmVjdGlvbiA9IFNsaWNlci5YLCBmaWx0ZXIpIC0+XG4gICAgJGltZyA9ICQgaW1nXG4gICAgd2lkdGggPSAkaW1nLndpZHRoKClcbiAgICBoZWlnaHQgPSAkaW1nLmhlaWdodCgpXG4gICAgJGNhbnZhcyA9ICQgJzxjYW52YXM+J1xuICAgIC5hdHRyXG4gICAgICB3aWR0aDogd2lkdGhcbiAgICAgIGhlaWdodDogaGVpZ2h0XG4gICAgY2FudmFzID0gJGNhbnZhc1swXVxuICAgIGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCAnMmQnXG4gICAgY29udGV4dC5kcmF3SW1hZ2UgJGltZ1swXSwgMCwgMFxuXG4gICAgJGNvbnRhaW5lciA9ICQgJzxkaXY+J1xuICAgIC5jc3NcbiAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snXG4gICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJ1xuICAgICAgd2lkdGg6IHdpZHRoXG4gICAgICBoZWlnaHQ6IGhlaWdodFxuXG4gICAgc3dpdGNoIGRpcmVjdGlvblxuICAgICAgd2hlbiBTbGljZXIuWFxuICAgICAgICB4ID0gMFxuICAgICAgICBtYXhYID0gd2lkdGggLSAxXG4gICAgICAgIGhhc0FscGhhUHJldiA9IGZhbHNlXG4gICAgICAgIHdoaWxlIHggPD0gbWF4WFxuICAgICAgICAgIGhhc0FscGhhQ3VycmVudCA9IGhhc0FscGhhIGNvbnRleHQuZ2V0SW1hZ2VEYXRhIHgsIDAsIDEsIGhlaWdodFxuICAgICAgICAgIGlmICFoYXNBbHBoYVByZXYgYW5kIGhhc0FscGhhQ3VycmVudFxuICAgICAgICAgICAgc3RhcnRYID0geFxuICAgICAgICAgIGVsc2UgaWYgaGFzQWxwaGFQcmV2IGFuZCAhaGFzQWxwaGFDdXJyZW50XG4gICAgICAgICAgICBpbWFnZURhdGEgPSBjb250ZXh0LmdldEltYWdlRGF0YSBzdGFydFgsIDAsIHggLSBzdGFydFgsIGhlaWdodFxuICAgICAgICAgICAgaWYgZmlsdGVyP1xuICAgICAgICAgICAgICBpbWFnZURhdGEgPSBmaWx0ZXIgaW1hZ2VEYXRhXG4gICAgICAgICAgICBjaGFyID0gbmV3IFNsaWNlciBpbWFnZURhdGEsIHN0YXJ0WCwgMFxuICAgICAgICAgICAgJGNvbnRhaW5lci5hcHBlbmQgY2hhci4kY2FudmFzXG4gICAgICAgICAgZWxzZSBpZiB4IGlzIG1heFggYW5kIGhhc0FscGhhQ3VycmVudFxuICAgICAgICAgICAgaW1hZ2VEYXRhID0gY29udGV4dC5nZXRJbWFnZURhdGEgc3RhcnRYLCAwLCB3aWR0aCAtIHN0YXJ0WCwgaGVpZ2h0XG4gICAgICAgICAgICBpZiBmaWx0ZXI/XG4gICAgICAgICAgICAgIGltYWdlRGF0YSA9IGZpbHRlciBpbWFnZURhdGFcbiAgICAgICAgICAgIGNoYXIgPSBuZXcgU2xpY2VyIGltYWdlRGF0YSwgc3RhcnRYLCAwXG4gICAgICAgICAgICAkY29udGFpbmVyLmFwcGVuZCBjaGFyLiRjYW52YXNcbiAgICAgICAgICBoYXNBbHBoYVByZXYgPSBoYXNBbHBoYUN1cnJlbnRcbiAgICAgICAgICB4KytcbiAgICAgIHdoZW4gU2xpY2VyLllcbiAgICAgICAgeSA9IDBcbiAgICAgICAgbWF4WSA9IGhlaWdodCAtIDFcbiAgICAgICAgaGFzQWxwaGFQcmV2ID0gZmFsc2VcbiAgICAgICAgd2hpbGUgeSA8PSBtYXhZXG4gICAgICAgICAgaGFzQWxwaGFDdXJyZW50ID0gaGFzQWxwaGEgY29udGV4dC5nZXRJbWFnZURhdGEgMCwgeSwgd2lkdGgsIDFcbiAgICAgICAgICBpZiAhaGFzQWxwaGFQcmV2IGFuZCBoYXNBbHBoYUN1cnJlbnRcbiAgICAgICAgICAgIHN0YXJ0WSA9IHlcbiAgICAgICAgICBlbHNlIGlmIGhhc0FscGhhUHJldiBhbmQgIWhhc0FscGhhQ3VycmVudFxuICAgICAgICAgICAgaW1hZ2VEYXRhID0gcHJldiA9IGNvbnRleHQuZ2V0SW1hZ2VEYXRhIDAsIHN0YXJ0WSwgd2lkdGgsIHkgLSBzdGFydFlcbiAgICAgICAgICAgIGlmIGZpbHRlcj9cbiAgICAgICAgICAgICAgaW1hZ2VEYXRhID0gZmlsdGVyIGltYWdlRGF0YVxuICAgICAgICAgICAgY2hhciA9IG5ldyBTbGljZXIgaW1hZ2VEYXRhLCAwLCBzdGFydFlcbiAgICAgICAgICAgICRjb250YWluZXIuYXBwZW5kIGNoYXIuJGNhbnZhc1xuICAgICAgICAgIGVsc2UgaWYgeSBpcyBtYXhZIGFuZCBoYXNBbHBoYUN1cnJlbnRcbiAgICAgICAgICAgIGltYWdlRGF0YSA9IHByZXYgPSBjb250ZXh0LmdldEltYWdlRGF0YSAwLCBzdGFydFksIHdpZHRoLCBoZWlnaHQgLSBzdGFydFlcbiAgICAgICAgICAgIGlmIGZpbHRlcj9cbiAgICAgICAgICAgICAgaW1hZ2VEYXRhID0gZmlsdGVyIGltYWdlRGF0YVxuICAgICAgICAgICAgY2hhciA9IG5ldyBTbGljZXIgaW1hZ2VEYXRhLCAwLCBzdGFydFlcbiAgICAgICAgICAgICRjb250YWluZXIuYXBwZW5kIGNoYXIuJGNhbnZhc1xuICAgICAgICAgIGhhc0FscGhhUHJldiA9IGhhc0FscGhhQ3VycmVudFxuICAgICAgICAgIHkrK1xuICAgICAgZWxzZVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yIFwiZGlyZWN0aW9uIG11c3QgYmUgc3BlY2lmaWVkIHdpdGggYFNsaWNlci5YYCBvciBgU2xpY2VyLllgXCJcblxuICAgICRpbWcucmVwbGFjZVdpdGggJGNvbnRhaW5lclxuICAgICRjb250YWluZXJcblxuICBjb25zdHJ1Y3RvcjogKGltYWdlRGF0YSwgbGVmdCwgdG9wKSAtPlxuICAgIHN1cGVyXG5cbiAgICBAJGNhbnZhcyA9ICQgJzxjYW52YXM+J1xuICAgIC5hdHRyXG4gICAgICB3aWR0aDogaW1hZ2VEYXRhLndpZHRoXG4gICAgICBoZWlnaHQ6IGltYWdlRGF0YS5oZWlnaHRcbiAgICBjb250ZXh0ID0gQCRjYW52YXNbMF0uZ2V0Q29udGV4dCAnMmQnXG4gICAgY29udGV4dC5wdXRJbWFnZURhdGEgaW1hZ2VEYXRhLCAwLCAwXG4gICAgQCRjYW52YXNcbiAgICAuY3NzXG4gICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJ1xuICAgICAgbGVmdDogbGVmdFxuICAgICAgdG9wOiB0b3BcbiIsIiQgPSByZXF1aXJlICdqcXVlcnknXG5yZXF1aXJlKCcuLi9tb2RlbHMvYmFja2dyb3Vucy1wb3NpdGlvbicpLmpxdWVyaXplICRcblZpZXcgPSByZXF1aXJlICcuL3ZpZXcnXG5pb3RhID0gcmVxdWlyZSgnLi4vbW9kZWxzL2lvdGEnKSgpXG57IERlZmVycmVkIH0gPSByZXF1aXJlICdqcXVlcnknXG5cblxuIyMjXG7jgrnjg5fjg6njgqTjg4jjgqLjg4vjg6Hjg7zjgrfjg6fjg7PjgpLnrqHnkIbjgZnjgovjgq/jg6njgrnjgafjgZnjgIJcblxuQGV4YW1wbGUg5ZCM44GYVmlld+OBq+WvvuOBl+OBpuWLleOBjeavjuOBq+WIpeOBrlNwcml0ZeOCkuS9nOOCiuOBvuOBmeOAglxuICAgIHJ1biA9IG5ldyBTcHJpdGUgJy5mb28nXG4gICAgcnVuLnNldFJhbmdlIDAsIDEwXG4gICAgd2FsayA9IG5ldyBTcHJpdGUgJy5mb28nXG4gICAgd2Fsay5zZXRSYW5nZSAxMSwgMjBcbiAgICBydW4ucGxheSgpXG4gICAgcnVuLm9uIFNwcml0ZS5FVkVOVF9MQVNUX0ZSQU1FLCAtPlxuICAgICAgd2Fsay5wbGF5KClcbiMjI1xubW9kdWxlLmV4cG9ydHMgPVxuY2xhc3MgU3ByaXRlIGV4dGVuZHMgVmlld1xuXG4gICMjI1xuICDjgrnjg5fjg6njgqTjg4jnlLvlg4/jgYzkuKbjgbPjgYx45pa55ZCR44Gn44GC44KL44GT44Go44KS6KGo44GZ44OV44Op44Kw44Gn44GZ44CCXG4gICMjI1xuICBAWDogMSA8PCBpb3RhKClcblxuICAjIyNcbiAg44K544OX44Op44Kk44OI55S75YOP44GM5Lim44Gz44GMeeaWueWQkeOBp+OBguOCi+OBk+OBqOOCkuihqOOBmeODleODqeOCsOOBp+OBmeOAglxuICAjIyNcbiAgQFk6IDEgPDwgaW90YSgpXG5cbiAgIyMjXG4gIOacgOe1guODleODrOODvOODoOOBrue1guS6huaZguOBq+eZuueBq+OBmeOCi+OCpOODmeODs+ODiOOBp+OBmeOAglxuICAjIyNcbiAgQEVWRU5UX0xBU1RfRlJBTUU6ICdzcHJpdGUubGFzdEZyYW1lJ1xuXG4gICMjI1xuICDmjIflrprjga7jg6rjg5Tjg7zjg4jlm57mlbDjgYzlrozkuobjgZfjgZ/mmYLjgavnmbrngavjgZnjgovjgqTjg5njg7Pjg4jjgafjgZnjgIJcbiAg5rC45LmF44Gr44Oq44OU44O844OI44GZ44KL5aC05ZCI44Gv55m654Gr44GX44G+44Gb44KT44CCXG4gICMjI1xuICBARVZFTlRfQ09NUExFVEVfUkVQRUFUOiAnc3ByaXRlLmNvbXBsZXRlUmVwZWF0J1xuXG4gICMjI1xuICDjgrnjg5fjg6njgqTjg4jjgqTjg7Pjgrnjgr/jg7PjgrnjgpLnlJ/miJDjgZfjgb7jgZnjgIJcblxuICBAcGFyYW0gW1N0cmluZywgSFRNTEVsZW1lbnQsIGpRdWVyeU9iamVjdCwgVmlld10gc2VsZWN0b3Ig44Kz44Oz44OI44Ot44O844Or44Gu5a++6LGh44Gu6KaB57Sg44Gn44GZXG4gIEBwYXJhbSBbSW50ZWdlcl0gZnBzIDHnp5LlvZPjgZ/jgorjga7jg5Xjg6zjg7zjg6DmlbDjgafjgZnjgIJcbiAgQHBhcmFtIFtJbnRlZ2VyXSBkaXJlY3Rpb24g6IOM5pmv55S75YOP44GM5Lim44KT44Gn44GE44KL5pa55ZCR44Gn44GZ44CCXG4gICMjI1xuICBjb25zdHJ1Y3RvcjogKHt9LCBAZnBzID0gMzAsIEBkaXJlY3Rpb24gPSBTcHJpdGUuWSkgLT5cbiAgICBzdXBlclxuICAgIGlmIEBkaXJlY3Rpb24gaXMgQGNvbnN0cnVjdG9yLlhcbiAgICAgIEBwcm9wID0gJ2JhY2tncm91bmRQb3NpdGlvblgnXG4gICAgICBAc2l6ZSA9IEB3aWR0aCgpXG4gICAgZWxzZVxuICAgICAgQHByb3AgPSAnYmFja2dyb3VuZFBvc2l0aW9uWSdcbiAgICAgIEBzaXplID0gQGhlaWdodCgpXG4gICAgQGN1cnJlbnRGcmFtZSA9IDBcbiAgICBAc2V0UmFuZ2UgMCwgMFxuXG4gICMjI1xuICDjgZPjga7jgrnjg5fjg6njgqTjg4jjgYzjg5Xjg6zjg7zjg6DjgajjgZfjgabooajnpLrjgZnjgovog4zmma/jga7kvY3nva7jgqTjg7Pjg4fjg4Pjgq/jgrnjga7nr4Tlm7LjgpLoqK3lrprjgZfjgb7jgZnjgIJcblxuICBAcGFyYW0gW0ludGVnZXJdIGZyb20g6ZaL5aeL44OV44Os44O844Og44Gu5L2N572u44Kk44Oz44OH44OD44Kv44K544Gn44GZ44CCXG4gIEBwYXJhbSBbSW50ZWdlcl0gdG8g5pyA57WC44OV44Os44O844Og44Gu5L2N572u44Kk44Oz44OH44OD44Kv44K544Gn44GZ44CCXG4gICMjI1xuICBzZXRSYW5nZTogKGZyb20sIHRvKSAtPlxuICAgIEBzZXRQb3NpdGlvbnMgW2Zyb20uLnRvXVxuXG4gICMjI1xuICDjgZPjga7jgrnjg5fjg6njgqTjg4jjgYzjg5Xjg6zjg7zjg6DjgajjgZfjgabooajnpLrjgZnjgovog4zmma/jga7kvY3nva7jgqTjg7Pjg4fjg4Pjgq/jgrnjga7phY3liJfjgpLoqK3lrprjgZfjgb7jgZnjgIJcblxuICBAcGFyYW0gW0FycmF5PEludGVnZXI+XSBwb3NpdGlvbnMg5L2N572u44Kk44Oz44OH44OD44Kv44K544Gu6YWN5YiX44Gn44GZ44CCXG4gICMjI1xuICBzZXRQb3NpdGlvbnM6IChAcG9zaXRpb25zKSAtPlxuICAgIEBsYXN0RnJhbWUgPSBAcG9zaXRpb25zLmxlbmd0aCAtIDFcblxuICAjIyNcbiAg5oyH5a6a44GV44KM44Gf44OV44Os44O844Og44GL44KJ5YaN55Sf44GX44G+44GZ44CCXG5cbiAgQHBhcmFtIFtJbnRlZ2VyXSBmcmFtZSDlho3nlJ/jgpLplovlp4vjgZnjgovjg5Xjg6zjg7zjg6DjgafjgZnjgIJcbiAgQHBhcmFtIFtJbnRlZ2VyXSByZXBlYXQg5YaN55Sf5Zue5pWw44Gn44GZ44CCXG4gICMjI1xuICBnb3RvQW5kUGxheTogKGZyYW1lID0gMCwgcmVwZWF0ID0gMSkgLT5cbiAgICBAY3VycmVudEZyYW1lID0gQGxpbWl0RnJhbWUgZnJhbWVcbiAgICBAcGxheSByZXBlYXRcblxuICAjIyNcbiAg5oyH5a6a44GV44KM44Gf44OV44Os44O844Og44Gn5YGc5q2i44GX44G+44GZ44CCXG5cbiAgQHBhcmFtIFtJbnRlZ2VyXSBmcmFtZSDooajnpLrjgZnjgovjg5Xjg6zjg7zjg6DjgafjgZnjgIJcbiAgIyMjXG4gIGdvdG9BbmRQYXVzZTogKGZyYW1lID0gMCkgLT5cbiAgICBAY3VycmVudEZyYW1lID0gQGxpbWl0RnJhbWUgZnJhbWVcbiAgICBAdXBkYXRlVmlldygpXG4gICAgQHN0b3AoKVxuXG4gICMjI1xuICDmrKHjga7jg5Xjg6zjg7zjg6Djgavnp7vli5XjgZfjgb7jgZnjgIJcbiAgIyMjXG4gIG5leHRGcmFtZTogLT5cbiAgICBAY3VycmVudEZyYW1lID0gQHZlcmlmeUZyYW1lIEBjdXJyZW50RnJhbWUgKyAxXG4gICAgQHVwZGF0ZVZpZXcoKVxuXG4gICMjI1xuICDliY3jga7jg5Xjg6zjg7zjg6Djgavnp7vli5XjgZfjgb7jgZnjgIJcbiAgIyMjXG4gIHByZXZGcmFtZTogLT5cbiAgICBAY3VycmVudEZyYW1lID0gQHZlcmlmeUZyYW1lIEBjdXJyZW50RnJhbWUgLSAxXG4gICAgQHVwZGF0ZVZpZXcoKVxuXG4gICMjI1xuICDlho3nlJ/jgZfjgb7jgZnjgIJcblxuICBAcGFyYW0gW0ludGVnZXJdIHJlcGVhdCDlho3nlJ/lm57mlbDjgafjgZnjgIJcbiAgIyMjXG4gIHBsYXk6IChAcmVwZWF0ID0gMSkgLT5cbiAgICBAY3VycmVudFJlcGVhdENvdW50ID0gMFxuICAgIEB1cGRhdGVWaWV3KClcbiAgICBAc3RhcnRUaWNrKClcblxuICAjIyNcbiAg5YGc5q2i44GX44G+44GZ44CCXG4gICMjI1xuICBwYXVzZTogLT5cbiAgICBAc3RvcFRpY2soKVxuXG4gICMjI1xuICBAcHJpdmF0ZVxuICAjIyNcbiAgbGltaXRGcmFtZTogKGZyYW1lKSAtPlxuICAgIGlmIGZyYW1lIDwgMFxuICAgICAgZnJhbWUgPSAwXG4gICAgaWYgZnJhbWUgPiBAbGFzdEZyYW1lXG4gICAgICBmcmFtZSA9IEBsYXN0RnJhbWVcbiAgICBmcmFtZVxuXG4gICMjI1xuICBAcHJpdmF0ZVxuICAjIyNcbiAgdmVyaWZ5RnJhbWU6IChmcmFtZSkgLT5cbiAgICBpZiBmcmFtZSA8IDBcbiAgICAgIGZyYW1lID0gQGxhc3RGcmFtZVxuICAgIGlmIGZyYW1lID4gQGxhc3RGcmFtZVxuICAgICAgZnJhbWUgPSAwXG4gICAgZnJhbWVcblxuICAjIyNcbiAgQHByaXZhdGVcbiAgIyMjXG4gIHVwZGF0ZVZpZXc6IC0+XG4gICAgcG9zID0gQHBvc2l0aW9uc1tAY3VycmVudEZyYW1lXVxuICAgIGNzcyA9IHt9XG4gICAgY3NzW0Bwcm9wXSA9IC1Ac2l6ZSAqIHBvc1xuICAgIEBjc3MgY3NzXG5cbiAgIyMjXG4gIEBwcml2YXRlXG4gICMjI1xuICBzdGFydFRpY2s6IC0+XG4gICAgQHN0b3BUaWNrKClcbiAgICBAZGF0YSAnc3ByaXRlSW50ZXJ2YWxJZCcsIHNldEludGVydmFsIEB0aWNrLCAxMDAwIC8gQGZwc1xuXG4gICMjI1xuICBAcHJpdmF0ZVxuICAjIyNcbiAgc3RvcFRpY2s6IC0+XG4gICAgY2xlYXJJbnRlcnZhbCBAZGF0YSAnc3ByaXRlSW50ZXJ2YWxJZCdcblxuICAjIyNcbiAgQHByaXZhdGVcbiAgIyMjXG4gIHRpY2s6ID0+XG4gICAgZnJhbWUgPSBAY3VycmVudEZyYW1lICsgMVxuICAgIGlmIChpc0xhc3RGcmFtZSA9IGZyYW1lID4gQGxhc3RGcmFtZSlcbiAgICAgIGlmIEByZXBlYXQgPiAwIGFuZCArK0BjdXJyZW50UmVwZWF0Q291bnQgPj0gQHJlcGVhdFxuICAgICAgICBAc3RvcFRpY2soKVxuICAgICAgICBAdHJpZ2dlciBAY29uc3RydWN0b3IuRVZFTlRfTEFTVF9GUkFNRVxuICAgICAgICBAdHJpZ2dlciBAY29uc3RydWN0b3IuRVZFTlRfQ09NUExFVEVfUkVQRUFUXG4gICAgICAgIHJldHVyblxuICAgICAgZnJhbWUgPSBAdmVyaWZ5RnJhbWUgZnJhbWVcbiAgICBAY3VycmVudEZyYW1lID0gZnJhbWVcbiAgICBAdXBkYXRlVmlldygpXG4gICAgaWYgaXNMYXN0RnJhbWVcbiAgICAgIEB0cmlnZ2VyIEBjb25zdHJ1Y3Rvci5FVkVOVF9MQVNUX0ZSQU1FXG4iLCIjIyNcblRhYiBjbGFzcy5cbiMjI1xuXG5WaWV3ID0gcmVxdWlyZSAnLi92aWV3J1xuXG5tb2R1bGUuZXhwb3J0cyA9XG5jbGFzcyBUYWIgZXh0ZW5kcyBWaWV3XG5cbiAgc2VsZWN0b3JCdXR0b25zOiAnLmpzLWJ1dHRvbidcbiAgc2VsZWN0b3JDb250ZW50czogJy5qcy1jb250ZW50J1xuXG4gIGNvbnN0cnVjdG9yOiAtPlxuICAgIHN1cGVyXG4gICAgQCQgQHNlbGVjdG9yQnV0dG9uc1xuICAgIC5vbiAnc2VsZWN0YWJsZS5jaGFuZ2VkJywgQHRvZ2dsZVxuICAgIEAkY29udGVudHMgPSBAJCBAc2VsZWN0b3JDb250ZW50c1xuXG4gIHRvZ2dsZTogKHt9LCBpbmRleCkgPT5cbiAgICBAJGNvbnRlbnRzLmRhdGEoJ3ZpZXcnKS5zZWxlY3RBdCBpbmRleFxuIiwiVmlldyA9IHJlcXVpcmUgJy4vdmlldydcblxuIyMjXG7ooYzmlbDjgqrjg5fjgrfjg6fjg7PjgpLku5jkuI7jgZfjgZ9DU1Mz44GudGV4dC1vdmVyZmxvd+OCqOODn+ODpeODrOODvOOCt+ODp+ODs+OBp+OBmeOAglxuIyMjXG5tb2R1bGUuZXhwb3J0cyA9XG5jbGFzcyBUZXh0T3ZlcmZsb3cgZXh0ZW5kcyBWaWV3XG5cbiAgW2luc3RhbmNlc10gPSBbXVxuXG4gIEByZWdpc3RlcjogKHRleHRPdmVyZmxvdykgLT5cbiAgICB1bmxlc3MgaW5zdGFuY2VzP1xuICAgICAgaW5zdGFuY2VzID0gW11cbiAgICAgIEAkd2luZG93Lm9uICdyZXNpemUnLCBAb25XaW5kb3dSZXNpemVkXG4gICAgaW5zdGFuY2VzLnB1c2ggdGV4dE92ZXJmbG93XG5cbiAgQHVucmVnaXN0ZXI6ICh0ZXh0T3ZlcmZsb3cpIC0+XG4gICAgcmV0dXJuIHVubGVzcyBAaW5zdGFuY2VzXG4gICAgQGluc3RhbmNlcy5zcGxpY2UgaW5zdGFuY2VzLmluZGV4T2YodGV4dE92ZXJmbG93KSwgMVxuICAgIGlmIGluc3RhbmNlcy5sZW5ndGggaXMgMFxuICAgICAgaW5zdGFuY2VzID0gbnVsbFxuICAgICAgQCR3aW5kb3cub2ZmICdyZXNpemUnLCBAb25XaW5kb3dSZXNpemVkXG5cbiAgQG9uV2luZG93UmVzaXplZDogLT5cbiAgICBmb3IgaW5zdGFuY2UgaW4gaW5zdGFuY2VzXG4gICAgICBpbnN0YW5jZS51cGRhdGUoKVxuXG4gIGNvbnN0cnVjdG9yOiAoe30sIEByb3dzLCBAcmVwbGFjZXIgPSAnLi4uJykgLT5cbiAgICBzdXBlclxuICAgIEBkZWZhdWx0VGV4dCA9IEB0ZXh0KClcbiAgICBAY29uc3RydWN0b3IucmVnaXN0ZXIgQFxuICAgIEB1cGRhdGUoKVxuXG4gIHJlbW92ZTogLT5cbiAgICBAY29uc3RydWN0b3IudW5yZWdpc3RlciBAXG4gICAgc3VwZXJcblxuICB1cGRhdGU6IC0+XG4gICAgaSA9IDBcbiAgICBsZW4gPSBAZGVmYXVsdFRleHQubGVuZ3RoXG4gICAgcm93cyA9IDBcblxuICAgICMg5paH5a2X5pWw44KSMeaWh+Wtl+OBi+OCieWil+OChOOBl+OBquOBjOOCieimgee0oOOBrumrmOOBleOCkuWPluW+l+OBl+OBvuOBmeOAglxuICAgICMg6auY44GV44GM5aKX44GI44KL44Go6KGM5pWw44Kr44Km44Oz44K/44KS44Kk44Oz44Kv44Oq44Oh44Oz44OI44GX44G+44GZ44CCXG4gICAgIyDooYzmlbDjgqvjgqbjg7Pjgr/jgYzmjIflrprooYzmlbDjgpLotoXjgYjjgovjgb7jgafoqabooYzjgZfjgb7jgZnjgIJcbiAgICB3aGlsZSArK2kgPCBsZW4gJiYgcm93cyA8PSBAcm93c1xuICAgICAgQHRleHQgQGRlZmF1bHRUZXh0LnN1YnN0ciAwLCBpXG4gICAgICBoID0gQGhlaWdodCgpXG4gICAgICBpZiAhaGVpZ2h0PyBvciBoID4gaGVpZ2h0XG4gICAgICAgIGhlaWdodCA9IGhcbiAgICAgICAgcm93cysrXG5cbiAgICAjIOacq+WwvuOBq+S7o+abv+aWh+Wtl+OCkuS7mOOBkeaWh+Wtl+aVsOOCkua4m+OCieOBl+OBquOBjOOCieimgee0oOOBrumrmOOBleOCkuWPluW+l+OBl+OBvuOBmeOAglxuICAgICMg6auY44GV44GM5rib44KL44Go6KGM5pWw44Kr44Km44Oz44K/44KS44OH44Kv44Oq44Oh44Oz44OI44GX44G+44GZ44CCXG4gICAgIyDooYzmlbDjgqvjgqbjg7Pjgr/jgYzmjIflrprooYzku6XkuIvjgavjgarjgovjgb7jgafoqabooYzjgZfjgb7jgZnjgIJcbiAgICB3aGlsZSAtLWkgPj0gMCAmJiByb3dzID4gQHJvd3NcbiAgICAgIEB0ZXh0IEBkZWZhdWx0VGV4dC5zdWJzdHIoMCwgaSkgKyBAcmVwbGFjZXJcbiAgICAgIGggPSBAaGVpZ2h0KClcbiAgICAgIGlmICFoZWlnaHQ/IG9yIGggPCBoZWlnaHRcbiAgICAgICAgaGVpZ2h0ID0gaFxuICAgICAgICByb3dzLS1cbiIsIiMjIyFcblRoZSBjb2RlIG9mIGBWaWV3I3B1c2hTdGFjaygpYCBhbmQgYFZpZXcjZW5kKClgIGFyZSBib3Jyb3dlZCBmcm9tIHNwYWNlLXBlbi5cbkBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2F0b20vc3BhY2UtcGVuL2Jsb2IvbWFzdGVyL3NyYy9zcGFjZS1wZW4uY29mZmVlXG5AbGljZW5zZSBodHRwczovL2dpdGh1Yi5jb20vYXRvbS9zcGFjZS1wZW4vYmxvYi9tYXN0ZXIvTElDRU5TRVxuIyMjXG5cbmpRdWVyeSA9IHJlcXVpcmUgJ2pxdWVyeSdcbnsgdGVtcGxhdGUgfSA9IHJlcXVpcmUgJ2xvZGFzaCdcbiR3aW5kb3cgPSBqUXVlcnkgd2luZG93XG4kZG9jdW1lbnQgPSBqUXVlcnkgd2luZG93LmRvY3VtZW50XG5cbiMjI1xudHJpZ2dlcigp44Gu44Ko44Kk44Oq44Ki44K544Gn44GZ44CCXG4jIyNcbmpRdWVyeS5mbi5lbWl0ID0galF1ZXJ5LmZuLnRyaWdnZXJcblxuIyMjXG5vbmUoKeOBruOCqOOCpOODquOCouOCueOBp+OBmeOAglxuIyMjXG5qUXVlcnkuZm4ub25jZSA9IGpRdWVyeS5mbi5vbmVcblxuIyMjXG5WaWV344Kv44Op44K544Gvdmlldy1jb250cm9sbGVy44Gu5Z+65bqV44Kv44Op44K544Gn44GZ44CCXG5qUXVlcnnjga7jg6njg4Pjg5HjgajjgZfjgabli5XkvZzjgZfjgIFqUXVlcnkuZm7jgavlrp/oo4XjgZXjgozjgabjgYTjgovjg6Hjgr3jg4Pjg4njgpLlp5TorbLjgZfjgabjgYTjgb7jgZnjgIJcbuWnlOitsuOBleOCjOOBn+ODoeOCveODg+ODieOBruaIu+OCiuWApOOBr2pRdWVyeS5mbuOBruaIu+OCiuOBneOBruOCguOBruOBp+OAgVxuVmlld+OCpOODs+OCueOCv+ODs+OCueOCkuOCs+ODs+ODhuOCr+OCueODiOOBqOOBl+OBpuODoeOCveODg+ODieODgeOCp+ODvOODs+OCkuihjOOBhuOBk+OBqOOBr+OBp+OBjeOBvuOBm+OCk+OAglxuQGRlcGVuZHNPbiBqcXVlcnlcbkBkZXBlbmRzT24gbG9kYXNoXG4jIyNcbm1vZHVsZS5leHBvcnRzID1cbmNsYXNzIFZpZXcgZXh0ZW5kcyBqUXVlcnlcblxuICBAJHdpbmRvdzogJHdpbmRvd1xuICBAJGRvY3VtZW50OiAkZG9jdW1lbnRcblxuICAjIyNcbiAg6KaB57Sg44Gu44OG44Oz44OX44Os44O844OI44Go44Gq44KLU3RyaW5n44Gn44GZ44CCXG4gICMjI1xuICBAdGVtcGxhdGU6IG51bGxcblxuICAjIyNcbiAg6KaB57Sg44Gu44K744Os44Kv44K/44Gn44GZ44CCXG4gICMjI1xuICBzZWxlY3RvcjogbnVsbFxuXG4gICMjI1xuICDjgrvjg6zjgq/jgr/jgYvnlJ/miJDjgZnjgovopoHntKDjga5IVE1M44KS5rih44GZ44Go44CB5paw44GX44GEVmlld+OCpOODs+OCueOCv+ODs+OCueOCkui/lOOBl+OBvuOBmeOAglxuICDmrKHjga7jgojjgYbjgarlhKrlhYjpoIbkvY3jgafntpnmib/lhYMoalF1ZXJ5KeOCs+ODs+OCueODiOODqeOCr+OCv+OCkuOCs+ODvOODq+OBl+OBvuOBmeOAglxuICAxLiBgQGNvbnN0cnVjdG9yLnRlbXBsYXRlYOOBjOioreWumuOBleOCjOOBpuOBhOOCi+WgtOWQiDog44OG44Oz44OX44Os44O844OI44GL44KJ6KaB57Sg44KS55Sf5oiQ44GX44G+44GZXG4gIDIuIGBAc2VsZWN0b3Jg44GM6Kit5a6a44GV44KM44Gm44GE44KL5aC05ZCIOiDnrKzkuIDlvJXmlbDjgpLjgrPjg7Pjg4bjgq/jgrnjg4jjgajjgZfjgabjgrvjg6zjgq/jgr/jgpLmpJzntKLjgZfjgb7jgZlcbiAgMy4g56ys5LiA5byV5pWw44GM5oyH5a6a44GV44KM44Gm44GE44KL5aC05ZCIOiDnrKzkuIDlvJXmlbDjgYvjgonopoHntKDjgpLnlJ/miJDjg7vmpJzntKLjgZfjgb7jgZnjgIJcbiAgNC4g56ys5LiA5byV5pWw44GM5oyH5a6a44GV44KM44Gm44GE44Gq44GE5aC05ZCIOiBgPGRpdj5g6KaB57Sg44KS55Sf5oiQ44GX44G+44GZ44CCXG4gICMjI1xuICBjb25zdHJ1Y3RvcjogKGFyZzApIC0+XG4gICAgaWYgQGNvbnN0cnVjdG9yLnRlbXBsYXRlP1xuICAgICAgQGNvbnN0cnVjdG9yLnRlbXBsYXRlRnVuYyA/PSB0ZW1wbGF0ZSBAY29uc3RydWN0b3IudGVtcGxhdGVcbiAgICAgICRlbCA9IHN1cGVyIGpRdWVyeS5wYXJzZUhUTUwgQGNvbnN0cnVjdG9yLnRlbXBsYXRlRnVuYyAoZGF0YSA9IGFyZzApXG4gICAgZWxzZSBpZiBAc2VsZWN0b3I/XG4gICAgICAkZWwgPSBzdXBlciBAc2VsZWN0b3IsIChjb250ZXh0ID0gYXJnMClcbiAgICBlbHNlXG4gICAgICAkZWwgPSBzdXBlciAoc2VsZWN0b3IgPSBhcmcwKSBvciAnPGRpdj4nXG5cbiAgICAjIGpRdWVyeeOCquODluOCuOOCp+OCr+ODiOOBruODl+ODreODkeODhuOCo+OCkuOCs+ODlOODvOOBl+OBvuOBmVxuICAgIGZvciBwcm9wLCB2YWwgb2YgJGVsXG4gICAgICBpZiAkZWwuaGFzT3duUHJvcGVydHkgcHJvcFxuICAgICAgICBAW3Byb3BdID0gdmFsXG5cbiAgICAjIGpRdWVyeeOCquODluOCuOOCp+OCr+ODiOOBrmRhdGHjgasndmlldyfjgajjgZfjgabjgqTjg7Pjgrnjgr/jg7PjgrnjgpLnmbvpjLLjgZfjgb7jgZlcbiAgICBAZGF0YSAndmlldycsIEBcblxuICAjIyNcbiAgZmluZOOBruOCt+ODp+ODvOODiOODj+ODs+ODieOBp+OBmeOAglxuICAjIyNcbiAgJDogLT4galF1ZXJ5LmZuLmZpbmQuYXBwbHkgQCwgYXJndW1lbnRzXG4gICMgYWRkTGlzdGVuZXI6IC0+IGpRdWVyeS5mbi5vbi5hcHBseSBALCBhcmd1bWVudHNcblxuICAjIyNcbiAgQHByaXZhdGVcbiAg44Op44OD44OR44KS55Sf5oiQ44GZ44KLalF1ZXJ544Oh44K944OD44OJ44KS44Kq44O844OQ44O844Op44Kk44OJ44GX44G+44GZ44CCXG4gIOOBk+OBk+OBp+OBr1ZpZXfjgqTjg7Pjgrnjgr/jg7PjgrnjgpLnlJ/miJDjgZnjgovjga7jgafjga/jgarjgY/jgIFqUXVlcnnjgqrjg5bjgrjjgqfjgq/jg4jjgpLnlJ/miJDjgZfjgb7jgZnjgIJcbiAgIyMjXG4gIHB1c2hTdGFjazogKGVsZW1zKSAtPlxuICAgIHJldCA9IGpRdWVyeS5tZXJnZShqUXVlcnkoKSwgZWxlbXMpXG4gICAgcmV0LnByZXZPYmplY3QgPSB0aGlzXG4gICAgcmV0LmNvbnRleHQgPSBAY29udGV4dFxuICAgIHJldFxuXG4gICMjI1xuICBAcHJpdmF0ZVxuICDjg6njg4Pjg5HjgpLnlJ/miJDjgZnjgotqUXVlcnnjg6Hjgr3jg4Pjg4njgpLjgqrjg7zjg5Djg7zjg6njgqTjg4njgZfjgb7jgZnjgIJcbiAg44GT44GT44Gn44GvVmlld+OCpOODs+OCueOCv+ODs+OCueOCkueUn+aIkOOBmeOCi+OBruOBp+OBr+OBquOBj+OAgWpRdWVyeeOCquODluOCuOOCp+OCr+ODiOOCkueUn+aIkOOBl+OBvuOBmeOAglxuICAjIyNcbiAgZW5kOiAtPlxuICAgIEBwcmV2T2JqZWN0ID8galF1ZXJ5KG51bGwpXG5cblxuIyMjXG52aWV344Gu44Kk44Oz44K544K/44Oz44K544KS5Y+W5b6X44GX44G+44GZ44CCXG7jg6Hjgr3jg4Pjg4njg4Hjgqfjg7zjg7PjgpLooYzjgYbpmpvjgavjgIFqUXVlcnnjgqrjg5bjgrjjgqfjgq/jg4jjgavnp7vjgaPjgZ/jgrPjg7Pjg4bjgq/jgrnjg4jjgpJcblZpZXfjgqTjg7Pjgrnjgr/jg7PjgrnjgavmiLvjgZnjgZPjgajjgYzjgafjgY3jgb7jgZnjgIJcbmBgYGNvZmZlZXNjcmlwdFxubmV3IFZpZXcgJy5zb21lJyAvLyBWaWV344Kk44Oz44K544K/44Oz44K544KS55Sf5oiQ44GX44G+44GZXG4uYXBwZW5kVG8gJ2JvZHknIC8vIGpRdWVyeeOBruODoeOCveODg+ODieOCkuOCs+ODvOODq+OBl+OBvuOBmVxuLnZpZXcoKS5zb21lKCkgICAvLyBWaWV344Gr5a6f6KOF44GV44KM44Gf44Oh44K944OD44OJ44KS44Kz44O844Or44GX44G+44GZXG5gYGBcbiMjI1xualF1ZXJ5LmZuLnZpZXcgPSAtPiBAZGF0YSAndmlldydcbiJdfQ==
