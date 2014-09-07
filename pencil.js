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
    point: require("./models/point"),
    "query-string": require("./models/query-string"),
    rect: require("./models/rect"),
    snaphelper: require("./models/snaphelper"),
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



},{"./models/animate":2,"./models/backgrouns-position":3,"./models/browser":4,"./models/easing":5,"./models/flow":6,"./models/image-data-helper":7,"./models/iota":8,"./models/location":9,"./models/os":10,"./models/point":11,"./models/query-string":12,"./models/rect":13,"./models/snaphelper":14,"./models/sns/facebook":15,"./models/sns/google-plus":16,"./models/sns/hatena":17,"./models/sns/line":18,"./models/sns/pinterest":19,"./models/sns/twitter":20,"./views/anchor":21,"./views/breakpoint":22,"./views/checkbox":23,"./views/drawer":24,"./views/image":25,"./views/mask-factory":26,"./views/preventable":27,"./views/radio":28,"./views/select":29,"./views/selectable":30,"./views/slicer":31,"./views/sprite":32,"./views/tab":33,"./views/text-overflow":34,"./views/view":35}],2:[function(require,module,exports){
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



},{"../models/iota":8}],8:[function(require,module,exports){

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



},{}],9:[function(require,module,exports){
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
},{}],10:[function(require,module,exports){

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



},{}],11:[function(require,module,exports){
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
},{}],12:[function(require,module,exports){
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
},{}],13:[function(require,module,exports){
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

  Rect.createWithArguments = function(args) {
    var height, width, x, y, _ref;
    _ref = Rect.parseArguments(args), x = _ref.x, y = _ref.y, width = _ref.width, height = _ref.height;
    return new Rect(x, y, width, height);
  };

  Rect.createWithCenter = function(centerX, centerY, width, height) {
    var rect;
    rect = Rect.createWithArguments(arguments);
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
  }


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



},{"./point":11}],14:[function(require,module,exports){
var Point;

Point = require('./point');

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



},{"./point":11}],15:[function(require,module,exports){
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



},{"../query-string":12}],16:[function(require,module,exports){
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



},{"../query-string":12}],17:[function(require,module,exports){

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



},{"../../models/os":10,"../query-string":12}],19:[function(require,module,exports){
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



},{"../query-string":12}],20:[function(require,module,exports){
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



},{"../query-string":12}],21:[function(require,module,exports){
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

/*
Image is a wrapper of <img>.
 */
var Image, View, msie, versionNumber, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

_ref = require('../models/browser'), msie = _ref.msie, versionNumber = _ref.versionNumber;

View = require('./view');

module.exports = Image = (function(_super) {
  __extends(Image, _super);


  /*
  Creates a Image instance.
   */

  function Image() {
    Image.__super__.constructor.apply(this, arguments);
    this.src = this.attr('src');
  }


  /*
  画像をロードします。
  @event
   */

  Image.prototype.load = function() {
    var src;
    if (msie && versionNumber < 9) {
      src = "" + this.src + "?" + (new Date().getTime());
    }
    return $('<img>').one('load error', (function(_this) {
      return function() {
        return _this.emit('load.complete');
      };
    })(this)).attr('src', src);
  };

  return Image;

})(View);



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
},{"../models/iota":8,"./view":35}],27:[function(require,module,exports){
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
    this.$radio = this.$('input[type=radio]').on('change radio.change', this.update);
    if ((name = this.$radio.attr('name')) !== '') {
      this.$otherRadios = $("input[type=radio][name=" + name + "]").not(this.$radio);
    }
    this.update();
  }


  /*
  @private
  ラジオボタンの状態によりクラスを付与・除去します。
   */

  Radio.prototype.update = function() {
    var _ref;
    if (this.$radio.prop('checked')) {
      this.addClass(this.checked);
      return (_ref = this.$otherRadios) != null ? _ref.trigger('radio.change') : void 0;
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
},{"../models/iota":8,"./view":35}],32:[function(require,module,exports){
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
},{"../models/backgrouns-position":3,"../models/iota":8,"./view":35}],33:[function(require,module,exports){

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9taW5vZGlzay93b3Jrc3BhY2UvZ2l0aHViL3RyeW1vcmUvcGVuY2lsL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbWlub2Rpc2svd29ya3NwYWNlL2dpdGh1Yi90cnltb3JlL3BlbmNpbC9wZW5jaWwuY29mZmVlIiwiL1VzZXJzL21pbm9kaXNrL3dvcmtzcGFjZS9naXRodWIvdHJ5bW9yZS9wZW5jaWwvbW9kZWxzL2FuaW1hdGUuY29mZmVlIiwiL1VzZXJzL21pbm9kaXNrL3dvcmtzcGFjZS9naXRodWIvdHJ5bW9yZS9wZW5jaWwvbW9kZWxzL2JhY2tncm91bnMtcG9zaXRpb24uY29mZmVlIiwiL1VzZXJzL21pbm9kaXNrL3dvcmtzcGFjZS9naXRodWIvdHJ5bW9yZS9wZW5jaWwvbW9kZWxzL2Jyb3dzZXIuY29mZmVlIiwiL1VzZXJzL21pbm9kaXNrL3dvcmtzcGFjZS9naXRodWIvdHJ5bW9yZS9wZW5jaWwvbW9kZWxzL2Vhc2luZy5jb2ZmZWUiLCIvVXNlcnMvbWlub2Rpc2svd29ya3NwYWNlL2dpdGh1Yi90cnltb3JlL3BlbmNpbC9tb2RlbHMvZmxvdy5jb2ZmZWUiLCIvVXNlcnMvbWlub2Rpc2svd29ya3NwYWNlL2dpdGh1Yi90cnltb3JlL3BlbmNpbC9tb2RlbHMvaW1hZ2UtZGF0YS1oZWxwZXIuY29mZmVlIiwiL1VzZXJzL21pbm9kaXNrL3dvcmtzcGFjZS9naXRodWIvdHJ5bW9yZS9wZW5jaWwvbW9kZWxzL2lvdGEuY29mZmVlIiwiL1VzZXJzL21pbm9kaXNrL3dvcmtzcGFjZS9naXRodWIvdHJ5bW9yZS9wZW5jaWwvbW9kZWxzL2xvY2F0aW9uLmNvZmZlZSIsIi9Vc2Vycy9taW5vZGlzay93b3Jrc3BhY2UvZ2l0aHViL3RyeW1vcmUvcGVuY2lsL21vZGVscy9vcy5jb2ZmZWUiLCIvVXNlcnMvbWlub2Rpc2svd29ya3NwYWNlL2dpdGh1Yi90cnltb3JlL3BlbmNpbC9tb2RlbHMvcG9pbnQuY29mZmVlIiwiL1VzZXJzL21pbm9kaXNrL3dvcmtzcGFjZS9naXRodWIvdHJ5bW9yZS9wZW5jaWwvbW9kZWxzL3F1ZXJ5LXN0cmluZy5jb2ZmZWUiLCIvVXNlcnMvbWlub2Rpc2svd29ya3NwYWNlL2dpdGh1Yi90cnltb3JlL3BlbmNpbC9tb2RlbHMvcmVjdC5jb2ZmZWUiLCIvVXNlcnMvbWlub2Rpc2svd29ya3NwYWNlL2dpdGh1Yi90cnltb3JlL3BlbmNpbC9tb2RlbHMvc25hcGhlbHBlci5jb2ZmZWUiLCIvVXNlcnMvbWlub2Rpc2svd29ya3NwYWNlL2dpdGh1Yi90cnltb3JlL3BlbmNpbC9tb2RlbHMvc25zL2ZhY2Vib29rLmNvZmZlZSIsIi9Vc2Vycy9taW5vZGlzay93b3Jrc3BhY2UvZ2l0aHViL3RyeW1vcmUvcGVuY2lsL21vZGVscy9zbnMvZ29vZ2xlLXBsdXMuY29mZmVlIiwiL1VzZXJzL21pbm9kaXNrL3dvcmtzcGFjZS9naXRodWIvdHJ5bW9yZS9wZW5jaWwvbW9kZWxzL3Nucy9oYXRlbmEuY29mZmVlIiwiL1VzZXJzL21pbm9kaXNrL3dvcmtzcGFjZS9naXRodWIvdHJ5bW9yZS9wZW5jaWwvbW9kZWxzL3Nucy9saW5lLmNvZmZlZSIsIi9Vc2Vycy9taW5vZGlzay93b3Jrc3BhY2UvZ2l0aHViL3RyeW1vcmUvcGVuY2lsL21vZGVscy9zbnMvcGludGVyZXN0LmNvZmZlZSIsIi9Vc2Vycy9taW5vZGlzay93b3Jrc3BhY2UvZ2l0aHViL3RyeW1vcmUvcGVuY2lsL21vZGVscy9zbnMvdHdpdHRlci5jb2ZmZWUiLCIvVXNlcnMvbWlub2Rpc2svd29ya3NwYWNlL2dpdGh1Yi90cnltb3JlL3BlbmNpbC92aWV3cy9hbmNob3IuY29mZmVlIiwiL1VzZXJzL21pbm9kaXNrL3dvcmtzcGFjZS9naXRodWIvdHJ5bW9yZS9wZW5jaWwvdmlld3MvYnJlYWtwb2ludC5jb2ZmZWUiLCIvVXNlcnMvbWlub2Rpc2svd29ya3NwYWNlL2dpdGh1Yi90cnltb3JlL3BlbmNpbC92aWV3cy9jaGVja2JveC5jb2ZmZWUiLCIvVXNlcnMvbWlub2Rpc2svd29ya3NwYWNlL2dpdGh1Yi90cnltb3JlL3BlbmNpbC92aWV3cy9kcmF3ZXIuY29mZmVlIiwiL1VzZXJzL21pbm9kaXNrL3dvcmtzcGFjZS9naXRodWIvdHJ5bW9yZS9wZW5jaWwvdmlld3MvaW1hZ2UuY29mZmVlIiwiL1VzZXJzL21pbm9kaXNrL3dvcmtzcGFjZS9naXRodWIvdHJ5bW9yZS9wZW5jaWwvdmlld3MvbWFzay1mYWN0b3J5LmNvZmZlZSIsIi9Vc2Vycy9taW5vZGlzay93b3Jrc3BhY2UvZ2l0aHViL3RyeW1vcmUvcGVuY2lsL3ZpZXdzL3ByZXZlbnRhYmxlLmNvZmZlZSIsIi9Vc2Vycy9taW5vZGlzay93b3Jrc3BhY2UvZ2l0aHViL3RyeW1vcmUvcGVuY2lsL3ZpZXdzL3JhZGlvLmNvZmZlZSIsIi9Vc2Vycy9taW5vZGlzay93b3Jrc3BhY2UvZ2l0aHViL3RyeW1vcmUvcGVuY2lsL3ZpZXdzL3NlbGVjdC5jb2ZmZWUiLCIvVXNlcnMvbWlub2Rpc2svd29ya3NwYWNlL2dpdGh1Yi90cnltb3JlL3BlbmNpbC92aWV3cy9zZWxlY3RhYmxlLmNvZmZlZSIsIi9Vc2Vycy9taW5vZGlzay93b3Jrc3BhY2UvZ2l0aHViL3RyeW1vcmUvcGVuY2lsL3ZpZXdzL3NsaWNlci5jb2ZmZWUiLCIvVXNlcnMvbWlub2Rpc2svd29ya3NwYWNlL2dpdGh1Yi90cnltb3JlL3BlbmNpbC92aWV3cy9zcHJpdGUuY29mZmVlIiwiL1VzZXJzL21pbm9kaXNrL3dvcmtzcGFjZS9naXRodWIvdHJ5bW9yZS9wZW5jaWwvdmlld3MvdGFiLmNvZmZlZSIsIi9Vc2Vycy9taW5vZGlzay93b3Jrc3BhY2UvZ2l0aHViL3RyeW1vcmUvcGVuY2lsL3ZpZXdzL3RleHQtb3ZlcmZsb3cuY29mZmVlIiwiL1VzZXJzL21pbm9kaXNrL3dvcmtzcGFjZS9naXRodWIvdHJ5bW9yZS9wZW5jaWwvdmlld3Mvdmlldy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5n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QSxHQUFHLFNBQUEsR0FBQTtXQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQWYsQ0FBcUIsSUFBckIsRUFBd0IsU0FBeEIsRUFBSDtFQUFBLENBekNILENBQUE7O0FBNENBO0FBQUE7Ozs7S0E1Q0E7O0FBQUEsaUJBaURBLFNBQUEsR0FBVyxTQUFDLEtBQUQsR0FBQTtBQUNULFFBQUEsR0FBQTtBQUFBLElBQUEsR0FBQSxHQUFNLE1BQU0sQ0FBQyxLQUFQLENBQWEsTUFBQSxDQUFBLENBQWIsRUFBdUIsS0FBdkIsQ0FBTixDQUFBO0FBQUEsSUFDQSxHQUFHLENBQUMsVUFBSixHQUFpQixJQURqQixDQUFBO0FBQUEsSUFFQSxHQUFHLENBQUMsT0FBSixHQUFjLElBQUMsQ0FBQSxPQUZmLENBQUE7V0FHQSxJQUpTO0VBQUEsQ0FqRFgsQ0FBQTs7QUF1REE7QUFBQTs7OztLQXZEQTs7QUFBQSxpQkE0REEsR0FBQSxHQUFLLFNBQUEsR0FBQTtBQUNILFFBQUEsSUFBQTtxREFBYyxNQUFBLENBQU8sSUFBUCxFQURYO0VBQUEsQ0E1REwsQ0FBQTs7Y0FBQTs7R0FGaUIsT0E5Qm5CLENBQUE7O0FBZ0dBO0FBQUE7Ozs7Ozs7OztHQWhHQTs7QUFBQSxNQTBHTSxDQUFDLEVBQUUsQ0FBQyxJQUFWLEdBQWlCLFNBQUEsR0FBQTtTQUFHLElBQUMsQ0FBQSxJQUFELENBQU0sTUFBTixFQUFIO0FBQUEsQ0ExR2pCLENBQUEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibW9kdWxlLmV4cG9ydHMgPSBcbiAgbW9kZWxzOlxuICAgIGFuaW1hdGU6IHJlcXVpcmUgXCIuL21vZGVscy9hbmltYXRlXCJcbiAgICBcImJhY2tncm91bnMtcG9zaXRpb25cIjogcmVxdWlyZSBcIi4vbW9kZWxzL2JhY2tncm91bnMtcG9zaXRpb25cIlxuICAgIGJyb3dzZXI6IHJlcXVpcmUgXCIuL21vZGVscy9icm93c2VyXCJcbiAgICBlYXNpbmc6IHJlcXVpcmUgXCIuL21vZGVscy9lYXNpbmdcIlxuICAgIGZsb3c6IHJlcXVpcmUgXCIuL21vZGVscy9mbG93XCJcbiAgICBcImltYWdlLWRhdGEtaGVscGVyXCI6IHJlcXVpcmUgXCIuL21vZGVscy9pbWFnZS1kYXRhLWhlbHBlclwiXG4gICAgaW90YTogcmVxdWlyZSBcIi4vbW9kZWxzL2lvdGFcIlxuICAgIGxvY2F0aW9uOiByZXF1aXJlIFwiLi9tb2RlbHMvbG9jYXRpb25cIlxuICAgIG9zOiByZXF1aXJlIFwiLi9tb2RlbHMvb3NcIlxuICAgIHBvaW50OiByZXF1aXJlIFwiLi9tb2RlbHMvcG9pbnRcIlxuICAgIFwicXVlcnktc3RyaW5nXCI6IHJlcXVpcmUgXCIuL21vZGVscy9xdWVyeS1zdHJpbmdcIlxuICAgIHJlY3Q6IHJlcXVpcmUgXCIuL21vZGVscy9yZWN0XCJcbiAgICBzbmFwaGVscGVyOiByZXF1aXJlIFwiLi9tb2RlbHMvc25hcGhlbHBlclwiXG4gICAgc25zOlxuICAgICAgZmFjZWJvb2s6IHJlcXVpcmUgXCIuL21vZGVscy9zbnMvZmFjZWJvb2tcIlxuICAgICAgXCJnb29nbGUtcGx1c1wiOiByZXF1aXJlIFwiLi9tb2RlbHMvc25zL2dvb2dsZS1wbHVzXCJcbiAgICAgIGhhdGVuYTogcmVxdWlyZSBcIi4vbW9kZWxzL3Nucy9oYXRlbmFcIlxuICAgICAgbGluZTogcmVxdWlyZSBcIi4vbW9kZWxzL3Nucy9saW5lXCJcbiAgICAgIHBpbnRlcmVzdDogcmVxdWlyZSBcIi4vbW9kZWxzL3Nucy9waW50ZXJlc3RcIlxuICAgICAgdHdpdHRlcjogcmVxdWlyZSBcIi4vbW9kZWxzL3Nucy90d2l0dGVyXCJcblxuICB2aWV3czpcbiAgICBhbmNob3I6IHJlcXVpcmUgXCIuL3ZpZXdzL2FuY2hvclwiXG4gICAgYnJlYWtwb2ludDogcmVxdWlyZSBcIi4vdmlld3MvYnJlYWtwb2ludFwiXG4gICAgY2hlY2tib3g6IHJlcXVpcmUgXCIuL3ZpZXdzL2NoZWNrYm94XCJcbiAgICBkcmF3ZXI6IHJlcXVpcmUgXCIuL3ZpZXdzL2RyYXdlclwiXG4gICAgaW1hZ2U6IHJlcXVpcmUgXCIuL3ZpZXdzL2ltYWdlXCJcbiAgICBcIm1hc2stZmFjdG9yeVwiOiByZXF1aXJlIFwiLi92aWV3cy9tYXNrLWZhY3RvcnlcIlxuICAgIHByZXZlbnRhYmxlOiByZXF1aXJlIFwiLi92aWV3cy9wcmV2ZW50YWJsZVwiXG4gICAgcmFkaW86IHJlcXVpcmUgXCIuL3ZpZXdzL3JhZGlvXCJcbiAgICBzZWxlY3Q6IHJlcXVpcmUgXCIuL3ZpZXdzL3NlbGVjdFwiXG4gICAgc2VsZWN0YWJsZTogcmVxdWlyZSBcIi4vdmlld3Mvc2VsZWN0YWJsZVwiXG4gICAgc2xpY2VyOiByZXF1aXJlIFwiLi92aWV3cy9zbGljZXJcIlxuICAgIHNwcml0ZTogcmVxdWlyZSBcIi4vdmlld3Mvc3ByaXRlXCJcbiAgICB0YWI6IHJlcXVpcmUgXCIuL3ZpZXdzL3RhYlwiXG4gICAgXCJ0ZXh0LW92ZXJmbG93XCI6IHJlcXVpcmUgXCIuL3ZpZXdzL3RleHQtb3ZlcmZsb3dcIlxuICAgIHZpZXc6IHJlcXVpcmUgXCIuL3ZpZXdzL3ZpZXdcIlxuIiwiJCA9IHJlcXVpcmUgJ2pxdWVyeSdcblxubW9kdWxlLmV4cG9ydHMgPVxuXG4gIGFuaW1hdGU6IChmcm9tLCB0bywgb3B0cykgLT5cbiAgICAkICc8ZGl2PidcbiAgICAuY3NzXG4gICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJ1xuICAgICAgbGVmdDogZnJvbVxuICAgIC5hbmltYXRlXG4gICAgICBsZWZ0OiB0b1xuICAgICwgb3B0c1xuIiwibW9kdWxlLmV4cG9ydHMgPVxuXG4gIGpxdWVyaXplOiAoJCkgLT5cbiAgICByZXR1cm4gaWYgJC5qcXVlcml6ZWQ/WydiYWNrZ3JvdW5kLXNpemUnXVxuXG4gICAgcmVwbGFjZXIgPVxuICAgICAgbGVmdDogJzBweCdcbiAgICAgIHJpZ2h0OiAnMTAwJSdcbiAgICAgIHRvcDogJzBweCdcbiAgICAgIGJvdHRvbTogJzEwMCUnXG4gICAgbm9ybWFsaXplID0gKHZhbCkgLT4gcmVwbGFjZXJbdmFsXSBvciB2YWxcbiAgICBnZXRCYWNrZ3JvdW5kU2l6ZXMgPSAoZWwpIC0+XG4gICAgICAkLmNzcyhlbCwgJ2JhY2tncm91bmQtcG9zaXRpb24nKS5zcGxpdCAvXFxzKy8sIDJcblxuICAgIGZvciBkaXJlY3Rpb24sIGkgaW4gWyd4JywgJ3knXVxuICAgICAgZG8gKGRpcmVjdGlvbiwgaSkgLT5cbiAgICAgICAgJC5jc3NIb29rc1tcImJhY2tncm91bmQtcG9zaXRpb24tI3tkaXJlY3Rpb259XCJdID1cbiAgICAgICAgJC5jc3NIb29rc1tcImJhY2tncm91bmRQb3NpdGlvbiN7ZGlyZWN0aW9uLnRvVXBwZXJDYXNlKCl9XCJdID1cbiAgICAgICAgICBnZXQ6IChlbCkgLT4gZ2V0QmFja2dyb3VuZFNpemVzKGVsKVtpXVxuICAgICAgICAgIHNldDogKGVsLCB2YWwpIC0+XG4gICAgICAgICAgICBzaXplcyA9IGdldEJhY2tncm91bmRTaXplcyBlbFxuICAgICAgICAgICAgc2l6ZXNbaV0gPSBub3JtYWxpemUgdmFsXG4gICAgICAgICAgICAkLnN0eWxlIGVsLCAnYmFja2dyb3VuZC1wb3NpdGlvbicsIHNpemVzLmpvaW4gJyAnXG4gICAgICAgICQuZnguc3RlcFtcImJhY2tncm91bmQtcG9zaXRpb24tI3tkaXJlY3Rpb259XCJdID1cbiAgICAgICAgJC5meC5zdGVwW1wiYmFja2dyb3VuZFBvc2l0aW9uI3tkaXJlY3Rpb24udG9VcHBlckNhc2UoKX1cIl0gPSAoeyBlbGVtLCBwcm9wLCBub3cgfSkgLT5cbiAgICAgICAgICAkLnN0eWxlIGVsZW0sIHByb3AsIG5vd1xuXG4gICAgJC5qcXVlcml6ZWQgPz0ge31cbiAgICAkLmpxdWVyaXplZFsnYmFja2dyb3VuZC1zaXplJ10gPSB0cnVlXG4iLCIjIyNcbkJyb3dzZXIgcGFyc2VzIHVzZXIgYWdlbnQgYW5kIGRldGVybWluZXMgdGhlIGJyb3dzZXIgdHlwZSBhbmQgdmVyc2lvbi5cbiMjI1xuXG5VQSA9IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKClcblJfQ0hST01FID0gLyhjaHJvbWUpWyBcXC9dKFtcXHcuXSspL1xuUl9XRUJLSVQgPSAvKHdlYmtpdClbIFxcL10oW1xcdy5dKykvXG5SX09QRVJBID0gLyhvcGVyYSkoPzouKnZlcnNpb258KVsgXFwvXShbXFx3Ll0rKS9cblJfTVNJRSA9IC8obXNpZSkgKFtcXHcuXSspL1xuUl9NT1pJTExBID0gLyhtb3ppbGxhKSg/Oi4qPyBydjooW1xcdy5dKyl8KS9cblxuWyB7fSwgbmFtZSwgdmVyc2lvbiBdID0gUl9DSFJPTUUuZXhlYyhVQSkgb3JcbiAgICAgICAgICAgICAgICAgICAgICAgIFJfV0VCS0lULmV4ZWMoVUEpIG9yXG4gICAgICAgICAgICAgICAgICAgICAgICBSX09QRVJBLmV4ZWMoVUEpIG9yXG4gICAgICAgICAgICAgICAgICAgICAgICBSX01TSUUuZXhlYyhVQSkgb3JcbiAgICAgICAgICAgICAgICAgICAgICAgIFVBLmluZGV4T2YoXCJjb21wYXRpYmxlXCIpIDwgMCBhbmQgUl9NT1pJTExBLmV4ZWMoVUEpIG9yXG4gICAgICAgICAgICAgICAgICAgICAgICBbXVxuXG5icm93c2VyID0ge31cbmlmIG5hbWVcbiAgYnJvd3NlcltuYW1lXSA9IHRydWVcbiAgYnJvd3Nlci52ZXJzaW9uID0gdmVyc2lvblxuICBudW1iZXIgPSBwYXJzZUludCBicm93c2VyLnZlcnNpb24sIDEwXG4gIHVubGVzcyBpc05hTiBudW1iZXJcbiAgICBicm93c2VyLnZlcnNpb25OdW1iZXIgPSBudW1iZXJcbmlmIGJyb3dzZXIuY2hyb21lXG4gIGJyb3dzZXIud2Via2l0ID0gdHJ1ZVxuZWxzZSBpZiBicm93c2VyLndlYmtpdFxuICBicm93c2VyLnNhZmFyaSA9IHRydWVcblxubW9kdWxlLmV4cG9ydHMgPSBicm93c2VyXG4iLCJ7XG4gIFBJXG4gIGFic1xuICBwb3dcbiAgc3FydFxuICBzaW5cbiAgY29zXG4gIGFzaW5cbiAgcm91bmRcbn0gPSBNYXRoXG5cblBJXzIgPSBQSSAvIDJcblxucm91bmRTbWFsbCA9ICh2YWwpIC0+XG4jICAgIHJldHVybiAwIGlmIHZhbCBpcyAwXG4jICAgIHJldHVybiB2YWwgaWYgdmFsID49IDFlLTYgb3IgdmFsIDw9IC0xZS02XG4jICAgIHJldHVybiAxZS02IGlmIHZhbCA+PSA1ZS03XG4jICAgIHJldHVybiAtMWUtNiBpZiB2YWwgPD0gLTVlLTdcbiMgICAgMFxuICByZXR1cm4gdmFsIGlmIHZhbCA+PSAxZS02XG4gIHJvdW5kKHZhbCAqIDEwMDAwMDApIC8gMTAwMDAwMFxuXG5mYWN0b3J5ID1cblxuICBsaW5lYXI6IC0+XG4gICAgKHgsIHQsIGIsIGMsIGQpIC0+XG4gICAgICBjICogdCAvIGQgKyBiXG5cbiAgZWFzZUluQmFjazogKHMpIC0+XG4gICAgcyA9IHMgb3IgMS43MDE1OFxuICAgICh4LCB0LCBiLCBjLCBkKSAtPlxuICAgICAgYyAqICh0IC89IGQpICogdCAqICgocyArIDEpICogdCAtIHMpICsgYlxuXG4gIGVhc2VJbk91dEJhY2s6IChzKSAtPlxuICAgIHMgPSBzIG9yIDEuNzAxNThcbiAgICAoeCwgdCwgYiwgYywgZCkgLT5cbiAgICAgIHJldHVybiBjIC8gMiAqICh0ICogdCAqICgoKHMgKiAxLjUyNSkgKyAxKSAqIHQgLSBzICogMS41MjUpKSArIGIgIGlmICh0IC89IGQgLyAyKSA8IDFcbiAgICAgIGMgLyAyICogKCh0IC09IDIpICogdCAqICgoKHMgKiAxLjUyNSkgKyAxKSAqIHQgKyBzICogMS41MjUpICsgMikgKyBiXG5cbiAgZWFzZU91dEJhY2s6IChzKSAtPlxuICAgIHMgPSBzIG9yIDEuNzAxNThcbiAgICAoeCwgdCwgYiwgYywgZCkgLT5cbiAgICAgIGMgKiAoKHQgPSB0IC8gZCAtIDEpICogdCAqICgocyArIDEpICogdCArIHMpICsgMSkgKyBiXG5cbiAgZWFzZU91dEluQmFjazogKHMpIC0+XG4gICAgcyA9IHMgb3IgMS43MDE1OFxuICAgICh4LCB0LCBiLCBjLCBkKSAtPlxuICAgICAgcmV0dXJuIChjIC8gMikgKiAoKHQgPSAodCAqIDIpIC8gZCAtIDEpICogdCAqICgocyArIDEpICogdCArIHMpICsgMSkgKyBiICBpZiB0IDwgZCAvIDJcbiAgICAgIChjIC8gMikgKiAodCA9ICh0ICogMiAtIGQpIC8gZCkgKiB0ICogKChzICsgMSkgKiB0IC0gcykgKyAoYiArIGMgLyAyKVxuXG4gIGVhc2VJbkJvdW5jZTogLT5cbiAgICAoeCwgdCwgYiwgYywgZCkgLT5cbiAgICAgIHJldHVybiBjIC0gKGMgKiAoNy41NjI1ICogdCAqIHQpKSArIGIgIGlmICh0ID0gKGQgLSB0KSAvIGQpIDwgMC4zNjM2MzYzNjM2MzYzNjM2NVxuICAgICAgcmV0dXJuIGMgLSAoYyAqICg3LjU2MjUgKiAodCAtPSAwLjU0NTQ1NDU0NTQ1NDU0NTQpICogdCArIDAuNzUpKSArIGIgIGlmIHQgPCAwLjcyNzI3MjcyNzI3MjcyNzNcbiAgICAgIHJldHVybiBjIC0gKGMgKiAoNy41NjI1ICogKHQgLT0gMC44MTgxODE4MTgxODE4MTgyKSAqIHQgKyAwLjkzNzUpKSArIGIgIGlmIHQgPCAwLjkwOTA5MDkwOTA5MDkwOTFcbiAgICAgIGMgLSAoYyAqICg3LjU2MjUgKiAodCAtPSAwLjk1NDU0NTQ1NDU0NTQ1NDYpICogdCArIDAuOTg0Mzc1KSkgKyBiXG5cbiAgZWFzZUluT3V0Qm91bmNlOiAtPlxuICAgICh4LCB0LCBiLCBjLCBkKSAtPlxuICAgICAgaWYgdCA8IGQgLyAyXG4gICAgICAgIHJldHVybiAoYyAtIChjICogKDcuNTYyNSAqIHQgKiB0KSkpICogMC41ICsgYiAgaWYgKHQgPSAoZCAtIHQgKiAyKSAvIGQpIDwgMC4zNjM2MzYzNjM2MzYzNjM2NVxuICAgICAgICByZXR1cm4gKGMgLSAoYyAqICg3LjU2MjUgKiAodCAtPSAwLjU0NTQ1NDU0NTQ1NDU0NTQpICogdCArIDAuNzUpKSkgKiAwLjUgKyBiICBpZiB0IDwgMC43MjcyNzI3MjcyNzI3MjczXG4gICAgICAgIHJldHVybiAoYyAtIChjICogKDcuNTYyNSAqICh0IC09IDAuODE4MTgxODE4MTgxODE4MikgKiB0ICsgMC45Mzc1KSkpICogMC41ICsgYiAgaWYgdCA8IDAuOTA5MDkwOTA5MDkwOTA5MVxuICAgICAgICAoYyAtIChjICogKDcuNTYyNSAqICh0IC09IDAuOTU0NTQ1NDU0NTQ1NDU0NikgKiB0ICsgMC45ODQzNzUpKSkgKiAwLjUgKyBiXG4gICAgICBlbHNlXG4gICAgICAgIHJldHVybiAoYyAqICg3LjU2MjUgKiB0ICogdCkpICogMC41ICsgYyAqIDAuNSArIGIgIGlmICh0ID0gKHQgKiAyIC0gZCkgLyBkKSA8IDAuMzYzNjM2MzYzNjM2MzYzNjVcbiAgICAgICAgcmV0dXJuIChjICogKDcuNTYyNSAqICh0IC09IDAuNTQ1NDU0NTQ1NDU0NTQ1NCkgKiB0ICsgMC43NSkpICogMC41ICsgYyAqIDAuNSArIGIgIGlmIHQgPCAwLjcyNzI3MjcyNzI3MjcyNzNcbiAgICAgICAgcmV0dXJuIChjICogKDcuNTYyNSAqICh0IC09IDAuODE4MTgxODE4MTgxODE4MikgKiB0ICsgMC45Mzc1KSkgKiAwLjUgKyBjICogMC41ICsgYiAgaWYgdCA8IDAuOTA5MDkwOTA5MDkwOTA5MVxuICAgICAgICAoYyAqICg3LjU2MjUgKiAodCAtPSAwLjk1NDU0NTQ1NDU0NTQ1NDYpICogdCArIDAuOTg0Mzc1KSkgKiAwLjUgKyBjICogMC41ICsgYlxuXG4gIGVhc2VPdXRCb3VuY2U6IC0+XG4gICAgKHgsIHQsIGIsIGMsIGQpIC0+XG4gICAgICByZXR1cm4gYyAqICg3LjU2MjUgKiB0ICogdCkgKyBiICBpZiAodCAvPSBkKSA8IDAuMzYzNjM2MzYzNjM2MzYzNjVcbiAgICAgIHJldHVybiBjICogKDcuNTYyNSAqICh0IC09IDAuNTQ1NDU0NTQ1NDU0NTQ1NCkgKiB0ICsgMC43NSkgKyBiICBpZiB0IDwgMC43MjcyNzI3MjcyNzI3MjczXG4gICAgICByZXR1cm4gYyAqICg3LjU2MjUgKiAodCAtPSAwLjgxODE4MTgxODE4MTgxODIpICogdCArIDAuOTM3NSkgKyBiICBpZiB0IDwgMC45MDkwOTA5MDkwOTA5MDkxXG4gICAgICBjICogKDcuNTYyNSAqICh0IC09IDAuOTU0NTQ1NDU0NTQ1NDU0NikgKiB0ICsgMC45ODQzNzUpICsgYlxuXG4gIGVhc2VPdXRJbkJvdW5jZTogLT5cbiAgICAoeCwgdCwgYiwgYywgZCkgLT5cbiAgICAgIGlmIHQgPCBkIC8gMlxuICAgICAgICByZXR1cm4gKGMgLyAyKSAqICg3LjU2MjUgKiB0ICogdCkgKyBiICBpZiAodCA9ICh0ICogMikgLyBkKSA8IDAuMzYzNjM2MzYzNjM2MzYzNjVcbiAgICAgICAgcmV0dXJuIChjIC8gMikgKiAoNy41NjI1ICogKHQgLT0gMC41NDU0NTQ1NDU0NTQ1NDU0KSAqIHQgKyAwLjc1KSArIGIgIGlmIHQgPCAwLjcyNzI3MjcyNzI3MjcyNzNcbiAgICAgICAgcmV0dXJuIChjIC8gMikgKiAoNy41NjI1ICogKHQgLT0gMC44MTgxODE4MTgxODE4MTgyKSAqIHQgKyAwLjkzNzUpICsgYiAgaWYgdCA8IDAuOTA5MDkwOTA5MDkwOTA5MVxuICAgICAgICAoYyAvIDIpICogKDcuNTYyNSAqICh0IC09IDAuOTU0NTQ1NDU0NTQ1NDU0NikgKiB0ICsgMC45ODQzNzUpICsgYlxuICAgICAgZWxzZVxuICAgICAgICByZXR1cm4gKGMgLyAyKSAtICgoYyAvIDIpICogKDcuNTYyNSAqIHQgKiB0KSkgKyAoYiArIGMgLyAyKSAgaWYgKHQgPSAoZCAtICh0ICogMiAtIGQpKSAvIGQpIDwgMC4zNjM2MzYzNjM2MzYzNjM2NVxuICAgICAgICByZXR1cm4gKGMgLyAyKSAtICgoYyAvIDIpICogKDcuNTYyNSAqICh0IC09IDAuNTQ1NDU0NTQ1NDU0NTQ1NCkgKiB0ICsgMC43NSkpICsgKGIgKyBjIC8gMikgIGlmIHQgPCAwLjcyNzI3MjcyNzI3MjcyNzNcbiAgICAgICAgcmV0dXJuIChjIC8gMikgLSAoKGMgLyAyKSAqICg3LjU2MjUgKiAodCAtPSAwLjgxODE4MTgxODE4MTgxODIpICogdCArIDAuOTM3NSkpICsgKGIgKyBjIC8gMikgIGlmIHQgPCAwLjkwOTA5MDkwOTA5MDkwOTFcbiAgICAgICAgKGMgLyAyKSAtICgoYyAvIDIpICogKDcuNTYyNSAqICh0IC09IDAuOTU0NTQ1NDU0NTQ1NDU0NikgKiB0ICsgMC45ODQzNzUpKSArIChiICsgYyAvIDIpXG5cbiAgZWFzZUluQ2lyYzogLT5cbiAgICAoeCwgdCwgYiwgYywgZCkgLT5cbiAgICAgIC1jICogKHNxcnQoMSAtICh0IC89IGQpICogdCkgLSAxKSArIGJcblxuICBlYXNlSW5PdXRDaXJjOiAtPlxuICAgICh4LCB0LCBiLCBjLCBkKSAtPlxuICAgICAgcmV0dXJuIC1jIC8gMiAqIChzcXJ0KDEgLSB0ICogdCkgLSAxKSArIGIgIGlmICh0IC89IGQgLyAyKSA8IDFcbiAgICAgIGMgLyAyICogKHNxcnQoMSAtICh0IC09IDIpICogdCkgKyAxKSArIGJcblxuICBlYXNlT3V0Q2lyYzogLT5cbiAgICAoeCwgdCwgYiwgYywgZCkgLT5cbiAgICAgIGMgKiBzcXJ0KDEgLSAodCA9IHQgLyBkIC0gMSkgKiB0KSArIGJcblxuICBlYXNlT3V0SW5DaXJjOiAtPlxuICAgICh4LCB0LCBiLCBjLCBkKSAtPlxuICAgICAgcmV0dXJuIChjIC8gMikgKiBzcXJ0KDEgLSAodCA9ICh0ICogMikgLyBkIC0gMSkgKiB0KSArIGIgIGlmIHQgPCBkIC8gMlxuICAgICAgLShjIC8gMikgKiAoc3FydCgxIC0gKHQgPSAodCAqIDIgLSBkKSAvIGQpICogdCkgLSAxKSArIChiICsgYyAvIDIpXG5cbiAgZWFzZUluQ3ViaWM6IC0+XG4gICAgKHgsIHQsIGIsIGMsIGQpIC0+XG4gICAgICBjICogKHQgLz0gZCkgKiB0ICogdCArIGJcblxuICBlYXNlSW5PdXRDdWJpYzogLT5cbiAgICAoeCwgdCwgYiwgYywgZCkgLT5cbiAgICAgIChpZiAoKHQgLz0gZCAvIDIpIDwgMSkgdGhlbiBjIC8gMiAqIHQgKiB0ICogdCArIGIgZWxzZSBjIC8gMiAqICgodCAtPSAyKSAqIHQgKiB0ICsgMikgKyBiKVxuXG4gIGVhc2VPdXRDdWJpYzogLT5cbiAgICAoeCwgdCwgYiwgYywgZCkgLT5cbiAgICAgIGMgKiAoKHQgPSB0IC8gZCAtIDEpICogdCAqIHQgKyAxKSArIGJcblxuICBlYXNlT3V0SW5DdWJpYzogLT5cbiAgICAoeCwgdCwgYiwgYywgZCkgLT5cbiAgICAgIChpZiB0IDwgZCAvIDIgdGhlbiBjIC8gMiAqICgodCA9IHQgKiAyIC8gZCAtIDEpICogdCAqIHQgKyAxKSArIGIgZWxzZSBjIC8gMiAqICh0ID0gKHQgKiAyIC0gZCkgLyBkKSAqIHQgKiB0ICsgYiArIGMgLyAyKVxuXG4gIGVhc2VJbkVsYXN0aWM6IChhLCBwKSAtPlxuICAgIGEgPSBhIG9yIDBcbiAgICBwID0gcCBvciAwXG4gICAgKHgsIHQsIGIsIGMsIGQpIC0+XG4gICAgICBzID0gdW5kZWZpbmVkXG4gICAgICByZXR1cm4gYiAgaWYgdCBpcyAwXG4gICAgICByZXR1cm4gYiArIGMgIGlmICh0IC89IGQpIGlzIDFcbiAgICAgIHAgPSBkICogMC4zICB1bmxlc3MgcFxuICAgICAgaWYgbm90IGEgb3IgYSA8IGFicyhjKVxuICAgICAgICBhID0gY1xuICAgICAgICBzID0gcCAvIDRcbiAgICAgIGVsc2VcbiAgICAgICAgcyA9IHAgLyAoMiAqIFBJKSAqIGFzaW4oYyAvIGEpXG4gICAgICAtKGEgKiBwb3coMiwgMTAgKiAodCAtPSAxKSkgKiBzaW4oKHQgKiBkIC0gcykgKiAoMiAqIFBJKSAvIHApKSArIGJcblxuICBlYXNlSW5PdXRFbGFzdGljOiAoYSwgcCkgLT5cbiAgICBhID0gYSBvciAwXG4gICAgcCA9IHAgb3IgMFxuICAgICh4LCB0LCBiLCBjLCBkKSAtPlxuICAgICAgcyA9IHVuZGVmaW5lZFxuICAgICAgcmV0dXJuIGIgIGlmIHQgaXMgMFxuICAgICAgcmV0dXJuIGIgKyBjICBpZiAodCAvPSBkIC8gMikgaXMgMlxuICAgICAgcCA9IGQgKiAoMC4zICogMS41KSAgdW5sZXNzIHBcbiAgICAgIGlmIG5vdCBhIG9yIGEgPCBhYnMoYylcbiAgICAgICAgYSA9IGNcbiAgICAgICAgcyA9IHAgLyA0XG4gICAgICBlbHNlXG4gICAgICAgIHMgPSBwIC8gKDIgKiBQSSkgKiBhc2luKGMgLyBhKVxuICAgICAgcmV0dXJuIC0wLjUgKiAoYSAqIHBvdygyLCAxMCAqICh0IC09IDEpKSAqIHNpbigodCAqIGQgLSBzKSAqICgyICogUEkpIC8gcCkpICsgYiAgaWYgdCA8IDFcbiAgICAgIGEgKiBwb3coMiwgLTEwICogKHQgLT0gMSkpICogc2luKCh0ICogZCAtIHMpICogKDIgKiBQSSkgLyBwKSAqIDAuNSArIGMgKyBiXG5cbiAgZWFzZU91dEVsYXN0aWM6IChhLCBwKSAtPlxuICAgIGEgPSBhIG9yIDBcbiAgICBwID0gcCBvciAwXG4gICAgKHgsIHQsIGIsIGMsIGQpIC0+XG4gICAgICBzID0gdW5kZWZpbmVkXG4gICAgICByZXR1cm4gYiAgaWYgdCBpcyAwXG4gICAgICByZXR1cm4gYiArIGMgIGlmICh0IC89IGQpIGlzIDFcbiAgICAgIHAgPSBkICogMC4zICB1bmxlc3MgcFxuICAgICAgaWYgbm90IGEgb3IgYSA8IGFicyhjKVxuICAgICAgICBhID0gY1xuICAgICAgICBzID0gcCAvIDRcbiAgICAgIGVsc2VcbiAgICAgICAgcyA9IHAgLyAoMiAqIFBJKSAqIGFzaW4oYyAvIGEpXG4gICAgICBhICogcG93KDIsIC0xMCAqIHQpICogc2luKCh0ICogZCAtIHMpICogKDIgKiBQSSkgLyBwKSArIGMgKyBiXG5cbiAgZWFzZU91dEluRWxhc3RpYzogKGEsIHApIC0+XG4gICAgYSA9IGEgb3IgMFxuICAgIHAgPSBwIG9yIDBcbiAgICAoeCwgdCwgYiwgYywgZCkgLT5cbiAgICAgIHMgPSB1bmRlZmluZWRcbiAgICAgIGMgLz0gMlxuICAgICAgaWYgdCA8IGQgLyAyXG4gICAgICAgIHJldHVybiBiICBpZiAodCAqPSAyKSBpcyAwXG4gICAgICAgIHJldHVybiBiICsgYyAgaWYgKHQgLz0gZCkgaXMgMVxuICAgICAgICBwID0gZCAqIDAuMyAgdW5sZXNzIHBcbiAgICAgICAgaWYgbm90IGEgb3IgYSA8IGFicyhjKVxuICAgICAgICAgIGEgPSBjXG4gICAgICAgICAgcyA9IHAgLyA0XG4gICAgICAgIGVsc2VcbiAgICAgICAgICBzID0gcCAvICgyICogUEkpICogYXNpbihjIC8gYSlcbiAgICAgICAgYSAqIHBvdygyLCAtMTAgKiB0KSAqIHNpbigodCAqIGQgLSBzKSAqICgyICogUEkpIC8gcCkgKyBjICsgYlxuICAgICAgZWxzZVxuICAgICAgICByZXR1cm4gKGIgKyBjKSAgaWYgKHQgPSB0ICogMiAtIGQpIGlzIDBcbiAgICAgICAgcmV0dXJuIChiICsgYykgKyBjICBpZiAodCAvPSBkKSBpcyAxXG4gICAgICAgIHAgPSBkICogMC4zICB1bmxlc3MgcFxuICAgICAgICBpZiBub3QgYSBvciBhIDwgYWJzKGMpXG4gICAgICAgICAgYSA9IGNcbiAgICAgICAgICBzID0gcCAvIDRcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHMgPSBwIC8gKDIgKiBQSSkgKiBhc2luKGMgLyBhKVxuICAgICAgICAtKGEgKiBwb3coMiwgMTAgKiAodCAtPSAxKSkgKiBzaW4oKHQgKiBkIC0gcykgKiAoMiAqIFBJKSAvIHApKSArIChiICsgYylcblxuICBlYXNlSW5FeHBvOiAtPlxuICAgICh4LCB0LCBiLCBjLCBkKSAtPlxuICAgICAgKGlmIHQgaXMgMCB0aGVuIGIgZWxzZSBjICogcG93KDIsIDEwICogKHQgLyBkIC0gMSkpICsgYilcblxuICBlYXNlSW5PdXRFeHBvOiAtPlxuICAgICh4LCB0LCBiLCBjLCBkKSAtPlxuICAgICAgcmV0dXJuIGIgIGlmIHQgaXMgMFxuICAgICAgcmV0dXJuIGIgKyBjICBpZiB0IGlzIGRcbiAgICAgIHJldHVybiBjIC8gMiAqIHBvdygyLCAxMCAqICh0IC0gMSkpICsgYiAgaWYgKHQgLz0gZCAvIDIpIDwgMVxuICAgICAgYyAvIDIgKiAoMiAtIHBvdygyLCAtMTAgKiAtLXQpKSArIGJcblxuICBlYXNlT3V0RXhwbzogLT5cbiAgICAoeCwgdCwgYiwgYywgZCkgLT5cbiAgICAgIHJldHVybiBiICsgYyAgaWYgdCBpcyBkXG4gICAgICBjICogKDEgLSBwb3coMiwgLTEwICogdCAvIGQpKSArIGJcblxuICBlYXNlT3V0SW5FeHBvOiAtPlxuICAgICh4LCB0LCBiLCBjLCBkKSAtPlxuICAgICAgcmV0dXJuIChpZiB0ICogMiBpcyBkIHRoZW4gYiArIGMgLyAyIGVsc2UgYyAvIDIgKiAoMSAtIHBvdygyLCAtMTAgKiB0ICogMiAvIGQpKSArIGIpICBpZiB0IDwgZCAvIDJcbiAgICAgIChpZiAodCAqIDIgLSBkKSBpcyAwIHRoZW4gYiArIGMgLyAyIGVsc2UgYyAvIDIgKiBwb3coMiwgMTAgKiAoKHQgKiAyIC0gZCkgLyBkIC0gMSkpICsgYiArIGMgLyAyKVxuXG4gIGVhc2VJblF1YWQ6IC0+XG4gICAgKHgsIHQsIGIsIGMsIGQpIC0+XG4gICAgICBjICogKHQgLz0gZCkgKiB0ICsgYlxuXG4gIGVhc2VJbk91dFF1YWQ6IC0+XG4gICAgKHgsIHQsIGIsIGMsIGQpIC0+XG4gICAgICByZXR1cm4gYyAvIDIgKiB0ICogdCArIGIgIGlmICh0IC89IGQgLyAyKSA8IDFcbiAgICAgIC1jIC8gMiAqICgoLS10KSAqICh0IC0gMikgLSAxKSArIGJcblxuICBlYXNlT3V0UXVhZDogLT5cbiAgICAoeCwgdCwgYiwgYywgZCkgLT5cbiAgICAgIC1jICogKHQgLz0gZCkgKiAodCAtIDIpICsgYlxuXG4gIGVhc2VPdXRJblF1YWQ6IC0+XG4gICAgKHgsIHQsIGIsIGMsIGQpIC0+XG4gICAgICByZXR1cm4gLShjIC8gMikgKiAodCA9ICh0ICogMiAvIGQpKSAqICh0IC0gMikgKyBiICBpZiB0IDwgZCAvIDJcbiAgICAgIChjIC8gMikgKiAodCA9ICh0ICogMiAtIGQpIC8gZCkgKiB0ICsgKGIgKyBjIC8gMilcblxuICBlYXNlSW5RdWFydDogLT5cbiAgICAoeCwgdCwgYiwgYywgZCkgLT5cbiAgICAgIGMgKiAodCAvPSBkKSAqIHQgKiB0ICogdCArIGJcblxuICBlYXNlSW5PdXRRdWFydDogLT5cbiAgICAoeCwgdCwgYiwgYywgZCkgLT5cbiAgICAgIHJldHVybiBjIC8gMiAqIHQgKiB0ICogdCAqIHQgKyBiICBpZiAodCAvPSBkIC8gMikgPCAxXG4gICAgICAtYyAvIDIgKiAoKHQgLT0gMikgKiB0ICogdCAqIHQgLSAyKSArIGJcblxuICBlYXNlT3V0UXVhcnQ6IC0+XG4gICAgKHgsIHQsIGIsIGMsIGQpIC0+XG4gICAgICAtYyAqICgodCA9IHQgLyBkIC0gMSkgKiB0ICogdCAqIHQgLSAxKSArIGJcblxuICBlYXNlT3V0SW5RdWFydDogLT5cbiAgICAoeCwgdCwgYiwgYywgZCkgLT5cbiAgICAgIHJldHVybiAtKGMgLyAyKSAqICgodCA9ICh0ICogMikgLyBkIC0gMSkgKiB0ICogdCAqIHQgLSAxKSArIGIgIGlmIHQgPCBkIC8gMlxuICAgICAgKGMgLyAyKSAqICh0ID0gKHQgKiAyIC0gZCkgLyBkKSAqIHQgKiB0ICogdCArIChiICsgYyAvIDIpXG5cbiAgZWFzZUluUXVpbnQ6IC0+XG4gICAgKHgsIHQsIGIsIGMsIGQpIC0+XG4gICAgICBjICogKHQgLz0gZCkgKiB0ICogdCAqIHQgKiB0ICsgYlxuXG4gIGVhc2VJbk91dFF1aW50OiAtPlxuICAgICh4LCB0LCBiLCBjLCBkKSAtPlxuICAgICAgcmV0dXJuIGMgLyAyICogdCAqIHQgKiB0ICogdCAqIHQgKyBiICBpZiAodCAvPSBkIC8gMikgPCAxXG4gICAgICBjIC8gMiAqICgodCAtPSAyKSAqIHQgKiB0ICogdCAqIHQgKyAyKSArIGJcblxuICBlYXNlT3V0UXVpbnQ6IC0+XG4gICAgKHgsIHQsIGIsIGMsIGQpIC0+XG4gICAgICBjICogKCh0ID0gdCAvIGQgLSAxKSAqIHQgKiB0ICogdCAqIHQgKyAxKSArIGJcblxuICBlYXNlT3V0SW5RdWludDogLT5cbiAgICAoeCwgdCwgYiwgYywgZCkgLT5cbiAgICAgIHJldHVybiAoYyAvIDIpICogKCh0ID0gKHQgKiAyKSAvIGQgLSAxKSAqIHQgKiB0ICogdCAqIHQgKyAxKSArIGIgIGlmIHQgPCBkIC8gMlxuICAgICAgKGMgLyAyKSAqICh0ID0gKHQgKiAyIC0gZCkgLyBkKSAqIHQgKiB0ICogdCAqIHQgKyAoYiArIGMgLyAyKVxuXG4gIGVhc2VJblNpbmU6IC0+XG4gICAgKHgsIHQsIGIsIGMsIGQpIC0+XG4gICAgICAtYyAqIGNvcyh0IC8gZCAqIChQSV8yKSkgKyBjICsgYlxuXG4gIGVhc2VJbk91dFNpbmU6IC0+XG4gICAgKHgsIHQsIGIsIGMsIGQpIC0+XG4gICAgICAtYyAvIDIgKiAoY29zKFBJICogdCAvIGQpIC0gMSkgKyBiXG5cbiAgZWFzZU91dFNpbmU6IC0+XG4gICAgKHgsIHQsIGIsIGMsIGQpIC0+XG4gICAgICBjICogc2luKHQgLyBkICogKFBJXzIpKSArIGJcblxuICBlYXNlT3V0SW5TaW5lOiAtPlxuICAgICh4LCB0LCBiLCBjLCBkKSAtPlxuICAgICAgcmV0dXJuIChjIC8gMikgKiBzaW4oKHQgKiAyKSAvIGQgKiAoUElfMikpICsgYiAgaWYgdCA8IGQgLyAyXG4gICAgICAtKGMgLyAyKSAqIGNvcygodCAqIDIgLSBkKSAvIGQgKiAoUElfMikpICsgKGMgLyAyKSArIChiICsgYyAvIDIpXG5cbm1vZHVsZS5leHBvcnRzID1cblxuICBmYWN0b3J5OiBmYWN0b3J5XG5cbiAganF1ZXJpemU6ICgkKSAtPlxuICAgIHJldHVybiBpZiAkLmpxdWVyaXplZD9bJ2Vhc2luZyddXG5cbiAgICAkLmV4dGVuZCAkLmVhc2luZywgZG8gLT5cbiAgICAgIGVhc2luZyA9IHt9XG4gICAgICBmb3IgbmFtZSwgZnVuYyBvZiBmYWN0b3J5XG4gICAgICAgIGVhc2UgPSBmdW5jKClcbiAgICAgICAgZG8gKGVhc2UpIC0+XG4gICAgICAgICAgZWFzaW5nW25hbWVdID0gLT5cbiAgICAgICAgICAgIHJvdW5kU21hbGwgZWFzZS5hcHBseSBALCBhcmd1bWVudHNcbiAgICAgIGVhc2luZy5lYXNlID0gZWFzaW5nLmVhc2VPdXRRdWFkXG4gICAgICBlYXNpbmdcblxuICAgICQuanF1ZXJpemVkID89IHt9XG4gICAgJC5qcXVlcml6ZWRbJ2Vhc2luZyddID0gdHJ1ZVxuIiwiJCA9IHJlcXVpcmUgJ2pxdWVyeSdcblxuZmxvdyA9XG5cbiAgc2VyaWFsOiAoY2JzKSAtPlxuICAgIGRmZCA9IG51bGxcbiAgICBmb3IgY2IgaW4gY2JzXG4gICAgICB1bmxlc3MgZGZkP1xuICAgICAgICBkZmQgPSBjYigpXG4gICAgICBlbHNlXG4gICAgICAgIGRmZCA9IGRmZC50aGVuIGNiXG4gICAgZGZkXG5cbiAgcGFyYWxsZWw6IChjYnMpIC0+XG4gICAgZCA9ICQuRGVmZXJyZWQoKVxuICAgIGRmZHMgPSAoY2IoKSBmb3IgY2IgaW4gY2JzKVxuICAgICQud2hlbi5hcHBseSAkLCBkZmRzXG4gICAgLmRvbmUgaWYgZGZkcy5sZW5ndGggPD0gMVxuICAgICAgKHJldHMuLi4pIC0+IGQucmVzb2x2ZSBbIHJldHMgXVxuICAgIGVsc2VcbiAgICAgIChyZXRzLi4uKSAtPiBkLnJlc29sdmUgcmV0c1xuICAgIC5mYWlsIGQucmVqZWN0XG4gICAgZC5wcm9taXNlKClcblxuICB3YWl0OiAobXMpIC0+XG4gICAgZGZkID0gJC5EZWZlcnJlZCgpXG4gICAgc2V0VGltZW91dCAtPlxuICAgICAgZGZkLnJlc29sdmUoKVxuICAgICwgbXNcbiAgICBkZmQucHJvbWlzZSgpXG5cblxubW9kdWxlLmV4cG9ydHMgPSAkLmV4dGVuZCBmbG93LFxuICBqcXVlcnlpemU6ICgkKSAtPlxuICAgICQuZXh0ZW5kIGZsb3dcbiIsImlvdGEgPSByZXF1aXJlKCcuLi9tb2RlbHMvaW90YScpKClcblxubW9kdWxlLmV4cG9ydHMgPVxuY2xhc3MgSW1hZ2VEYXRhVXRpbFxuXG4gIEBMRUZUOiAxIDw8IGlvdGEoKVxuICBAUklHSFQ6IDEgPDwgaW90YSgpXG4gIEBUT1A6IDEgPDwgaW90YSgpXG4gIEBCT1RUT006IDEgPDwgaW90YSgpXG5cbiAgQGNvbnRleHQ6ICh3aWR0aCwgaGVpZ2h0KSAtPlxuICAgIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgJ2NhbnZhcydcbiAgICBjYW52YXMud2lkdGggPSB3aWR0aFxuICAgIGNhbnZhcy5oZWlnaHQgPSBoZWlnaHRcbiAgICBjYW52YXMuZ2V0Q29udGV4dCAnMmQnXG5cbiAgQG5ldzogKHdpZHRoLCBoZWlnaHQpIC0+XG4gICAgY29udGV4dCA9IEltYWdlRGF0YVV0aWwuY29udGV4dCB3aWR0aCwgaGVpZ2h0XG4gICAgY29udGV4dC5nZXRJbWFnZURhdGEgMCwgMCwgd2lkdGgsIGhlaWdodFxuXG4gIEBjbG9uZTogKGltYWdlRGF0YSkgLT5cbiAgICBjb250ZXh0ID0gSW1hZ2VEYXRhVXRpbC5jb250ZXh0IGltYWdlRGF0YS53aWR0aCwgaW1hZ2VEYXRhLmhlaWdodFxuICAgIGNvbnRleHQucHV0SW1hZ2VEYXRhIGltYWdlRGF0YSwgMCwgMFxuICAgIGNvbnRleHQuZ2V0SW1hZ2VEYXRhIDAsIDAsIGltYWdlRGF0YS53aWR0aCwgaW1hZ2VEYXRhLmhlaWdodFxuXG4gIEBjaG9wOiAoaW1hZ2VEYXRhLCBkaXJlY3Rpb24pIC0+XG4gICAgeyB3aWR0aCwgaGVpZ2h0LCBkYXRhIH0gPSBpbWFnZURhdGFcblxuICAgIGNvbnRleHQgPSBJbWFnZURhdGFVdGlsLmNvbnRleHQgd2lkdGgsIGhlaWdodFxuICAgIGNvbnRleHQucHV0SW1hZ2VEYXRhIGltYWdlRGF0YSwgMCwgMFxuXG4gICAgbWluWCA9IDBcbiAgICBtYXhYID0gd2lkdGggLSAxXG4gICAgbWluWSA9IDBcbiAgICBtYXhZID0gaGVpZ2h0IC0gMVxuICAgIGlmIChkaXJlY3Rpb24gJiYgSW1hZ2VEYXRhVXRpbC5SSUdIVCkgaXMgSW1hZ2VEYXRhVXRpbC5SSUdIVFxuICAgICAgcmlnaHQgPSBkbyAtPlxuICAgICAgICB4ID0gbWF4WFxuICAgICAgICB3aGlsZSB4ID49IG1pblhcbiAgICAgICAgICB5ID0gbWF4WVxuICAgICAgICAgIHdoaWxlIHkgPj0gbWluWVxuICAgICAgICAgICAgcmV0dXJuIHggaWYgZGF0YVszICsgNCAqIChoZWlnaHQgKiB4ICsgeSldIGlzbnQgMFxuICAgICAgICAgICAgeS0tXG4gICAgICAgICAgeC0tXG4gICAgICAgIHJldHVybiAwXG4gICAgICByZXR1cm4gY29udGV4dC5nZXRJbWFnZURhdGEgMCwgMCwgcmlnaHQgKyAxLCBoZWlnaHRcbiIsIiMjI1xu5Li744Gr44OV44Op44Kw44KS5L2c44KL6Zqb44Gr5L2/55So44GZ44KL44Om44O844OG44Kj44Oq44OG44Kj44Gn44GZ44CCXG5cbkBleGFtcGxlIDEw6YCy5pWw44Gu44OV44Op44Kw44KS55Sf5oiQ44GZ44KLXG4gICAgaW90YSA9IHJlcXVpcmUoJ3BlbmNpbC9tb2RlbHMvaW90YScpKClcbiAgICBhID0gaW90YSgpICMgMFxuICAgIGIgPSBpb3RhKCkgIyAxXG4gICAgYyA9IGlvdGEoKSAjIDJcbiAgICBkID0gaW90YSgpICMgM1xuICAgIGUgPSBpb3RhKCkgIyA0XG5cbkBleGFtcGxlIDLpgLLmlbDjga7jg5Xjg6njgrDjgpLnlJ/miJDjgZnjgotcbiAgICBpb3RhID0gcmVxdWlyZSgncGVuY2lsL21vZGVscy9pb3RhJykoKVxuICAgIGEgPSAxIDw8IGlvdGEoKSAjIDAgKDAwMDApXG4gICAgYiA9IDEgPDwgaW90YSgpICMgMSAoMDAwMSlcbiAgICBjID0gMSA8PCBpb3RhKCkgIyAyICgwMDEwKVxuICAgIGQgPSAxIDw8IGlvdGEoKSAjIDQgKDAxMDApXG4gICAgZSA9IDEgPDwgaW90YSgpICMgOCAoMTAwMClcbiMjI1xuY2xhc3MgSW90YVxuXG4gICMjI1xuICBAcmV0dXJuIEZ1bmN0aW9uIOOCs+ODvOODq+OBmeOCi+avjuOBqzDjgYvjgonjgqTjg7Pjgq/jg6rjg6Hjg7Pjg4jjgZXjgozjgZ/mlbTmlbDjgpLov5TjgZnplqLmlbDjgpLov5TjgZfjgb7jgZnjgIJcbiAgIyMjXG4gIEBmYWN0b3J5OiAtPlxuICAgIGluZGV4ID0gMFxuICAgIC0+IGluZGV4KytcblxubW9kdWxlLmV4cG9ydHMgPSBJb3RhLmZhY3RvcnlcbiIsIiQgPSByZXF1aXJlICdqcXVlcnknXG5cbnByb3BzID0gXCJcIlwiXG5oYXNoXG5ob3N0XG5ob3N0bmFtZVxuaHJlZlxub3JpZ2luXG5wYXRobmFtZVxucG9ydFxucHJvdG9jb2xcblwiXCJcIi5zcGxpdCAvXFxzKy9cblxubW9kdWxlLmV4cG9ydHMgPVxuICBwYXJzZTogKHVybCkgLT5cbiAgICBsb2NhdGlvbiA9IHt9XG4gICAgZWwgPSAkKCc8YT4nKS5hdHRyKGhyZWY6IHVybClbMF1cbiAgICBmb3IgcHJvcCBpbiBwcm9wc1xuICAgICAgbG9jYXRpb25bcHJvcF0gPSBlbFtwcm9wXVxuICAgIGxvY2F0aW9uXG4iLCIjIyNcbk9TIHBhcnNlcyB1c2VyIGFnZW50IGFuZCBkZXRlcm1pbmVzIHRoZSBPUyB0eXBlIGFuZCB2ZXJzaW9uLlxuIyMjXG5cblVBID0gd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKVxuUl9JX1BIT05FID0gL1xcKChpcGhvbmUpLio/b3MgKFtcXGRfXSspLio/XFwpL1xuUl9JX1BPRCA9IC9cXCgoaXBvZCkuKj9vcyAoW1xcZF9dKykuKj9cXCkvXG5SX0lfUEFEID0gL1xcKChpcGFkKS4qP29zIChbXFxkX10rKS4qP1xcKS9cblJfQU5EUk9JRCA9IC9cXCguKj8oYW5kcm9pZCkgKFtcXGRcXC5dKykuKj9cXCkvXG5SX01BQyA9IC9cXCguKj8obWFjKSBvcyB4IChbXFxkX1xcLl0rKS4qP1xcKS9cblJfTElOVVggPSAvXFwoLio/KGxpbnV4KSAoXFx3Kyl2XFwpL1xuUl9XSU5ET1dTID0gL1xcKC4qPyh3aW5kb3dzKSAoXFx3KykuKj9cXCkvXG5cblsge30sIG5hbWUsIHZlcnNpb24gXSA9IFJfSV9QSE9ORS5leGVjKFVBKSBvclxuICAgICAgICAgICAgICAgICAgICAgICAgUl9JX1BPRC5leGVjKFVBKSBvclxuICAgICAgICAgICAgICAgICAgICAgICAgUl9JX1BBRC5leGVjKFVBKSBvclxuICAgICAgICAgICAgICAgICAgICAgICAgUl9BTkRST0lELmV4ZWMoVUEpIG9yXG4gICAgICAgICAgICAgICAgICAgICAgICBSX01BQy5leGVjKFVBKSBvclxuICAgICAgICAgICAgICAgICAgICAgICAgUl9XSU5ET1dTLmV4ZWMoVUEpIG9yXG4gICAgICAgICAgICAgICAgICAgICAgICBSX0xJTlVYLmV4ZWMoVUEpIG9yXG4gICAgICAgICAgICAgICAgICAgICAgICBbXVxuXG5vcyA9IHt9XG5pZiBuYW1lP1xuICBvc1tuYW1lXSA9IHRydWVcbiAgb3MudmVyc2lvbiA9IHZlcnNpb24uc3BsaXQoJ18nKS5qb2luKCcuJylcbmlmIG9zLmlwaG9uZSBvciBvcy5pcG9kIG9yIG9zLmlwYWRcbiAgb3MuaW9zID0gdHJ1ZVxuaWYgb3MuaW9zIG9yIG9zLmFuZHJvaWRcbiAgb3MubW9iaWxlID0gdHJ1ZVxuaWYgb3MudmVyc2lvbj9cbiAgbnVtYmVyID0gcGFyc2VJbnQgb3MudmVyc2lvbiwgMTBcbiAgdW5sZXNzIGlzTmFOIG51bWJlclxuICAgIG9zLnZlcnNpb25OdW1iZXIgPSBudW1iZXJcblxubW9kdWxlLmV4cG9ydHMgPSBvc1xuIiwie2lzQXJyYXksIGlzT2JqZWN0fSA9IHJlcXVpcmUgJ2xvZGFzaCdcbntzcXJ0fSA9IE1hdGhcblxuXG4jIyNcbuODneOCpOODs+ODiOOCr+ODqeOCueOBp+OBmeOAglxu5LqM5qyh5YWD44Gu55u05Lqk5bqn5qiZ57O744KS5omx44GE44G+44GZ44CCXG4jIyNcbm1vZHVsZS5leHBvcnRzID1cbmNsYXNzIFBvaW50XG5cbiAgQGxlcnA6IChwdDEsIHB0MiwgcmF0aW8pIC0+XG4gICAgdmVjdG9yID0gcHQyLnN1YiBwdDFcbiAgICBwdDEuYWRkIHZlY3Rvci5tdWwgcmF0aW9cblxuICBAZGlzdGFuY2U6IChwdDEsIHB0MikgLT5cbiAgICBwdDIuc3ViKHB0MSkuZGlzdGFuY2UoKVxuXG4gIEBwb3NpdGlvblRvUG9pbnQ6IChsZWZ0LCB0b3ApIC0+XG4gICAgaWYgbGVmdD8gYW5kIGxlZnQubGVmdD8gYW5kIGxlZnQudG9wP1xuICAgICAgeyBsZWZ0LCB0b3AgfSA9IGxlZnRcbiAgICBuZXcgUG9pbnQgbGVmdCwgdG9wXG5cbiAgQHBhcnNlQXJndW1lbnRzOiAoYXJncykgLT5cbiAgICBhcmdzID0gc3dpdGNoIGFyZ3MubGVuZ3RoXG4gICAgICB3aGVuIDBcbiAgICAgICAgW11cbiAgICAgIHdoZW4gMVxuICAgICAgICBpZiBpc0FycmF5IGFyZ3NbMF1cbiAgICAgICAgICBhcmdzWzBdXG4gICAgICAgIGVsc2UgaWYgaXNPYmplY3QgYXJnc1swXVxuICAgICAgICAgIFthcmdzWzBdLngsIGFyZ3NbMF0ueV1cbiAgICAgICAgZWxzZVxuICAgICAgICAgIFthcmdzWzBdXVxuICAgICAgZWxzZVxuICAgICAgICBhcmdzXG4gICAgZm9yIGkgaW4gWzAuLjFdXG4gICAgICBhcmdzW2ldID0gaWYgKHZhbCA9IGFyZ3NbaV0pP1xuICAgICAgICBwYXJzZUZsb2F0IHZhbFxuICAgICAgZWxzZVxuICAgICAgICBhcmdzW2ldID0gMFxuICAgIGFyZ3NcblxuXG4gICMjI1xuICBgbGVmdGAsYHRvcGDjgYvjgonmiJDjgovjgqrjg5bjgrjjgqfjgq/jg4jjgYvjgolgUG9pbnRg44Kk44Oz44K544K/44Oz44K544KS55Sf5oiQ44GX44G+44GZ44CCXG4gIEBwYXJhbSBbT2JqZWN0XSBwb3NpdGlvbiDluqfmqJnjgqrjg5bjgrjjgqfjgq/jg4jjgafjgZnjgIJcbiAgQG9wdGlvbiBwb3NpdGlvbiBbSW50ZWdlcl0gbGVmdCB45bqn5qiZ44Gn44GZ44CCXG4gIEBvcHRpb24gcG9zaXRpb24gW0ludGVnZXJdIHRvcCB55bqn5qiZ44Gn44GZ44CCXG4gICMjI1xuICBAY3JlYXRlV2l0aFBvc2l0aW9uOiAoeyBsZWZ0LCB0b3AgfSkgLT5cbiAgICBuZXcgUG9pbnQgbGVmdCwgdG9wXG5cbiAgIyMjXG4gIGBjbGllbnRYYCxgY2xpZW50WWDjgYvjgonmiJDjgovjgqrjg5bjgrjjgqfjgq/jg4jjgYvjgolgUG9pbnRg44Kk44Oz44K544K/44Oz44K544KS55Sf5oiQ44GX44G+44GZ44CCXG4gIEBwYXJhbSBbT2JqZWN0XSBwb3NpdGlvbiDluqfmqJnjgqrjg5bjgrjjgqfjgq/jg4jjgafjgZnjgIJcbiAgQG9wdGlvbiBwb3NpdGlvbiBbSW50ZWdlcl0gY2xpZW50WCB45bqn5qiZ44Gn44GZ44CCXG4gIEBvcHRpb24gcG9zaXRpb24gW0ludGVnZXJdIGNsaWVudFkgeeW6p+aomeOBp+OBmeOAglxuICAjIyNcbiAgQGNyZWF0ZVdpdGhDbGllbnQ6ICh7IGNsaWVudFgsIGNsaWVudFkgfSkgLT5cbiAgICBuZXcgUG9pbnQgY2xpZW50WCwgY2xpZW50WVxuXG5cbiAgY29uc3RydWN0b3I6ICh4LCB5KSAtPlxuICAgIFtAeCwgQHldID0gUG9pbnQucGFyc2VBcmd1bWVudHMgYXJndW1lbnRzXG5cbiAgIyMjXG4gIOikh+ijveOBl+OBvuOBmeOAglxuICBAcmV0dXJuIFtQb2ludF0g6KSH6KO944GV44KM44GfYFBvaW50YOOCpOODs+OCueOCv+ODs+OCueOBp+OBmeOAglxuICAjIyNcbiAgY2xvbmU6IC0+IG5ldyBQb2ludCBAeCwgQHlcblxuICBkaXN0YW5jZTogLT5cbiAgICBzcXJ0IEB4ICogQHggKyBAeSAqIEB5XG5cbiAgc3VidHJhY3Q6ICh4LCB5KSAtPlxuICAgIGlmIHg/IGFuZCB4Lng/IGFuZCB4Lnk/XG4gICAgICB7eCwgeX0gPSB4XG4gICAgbmV3IFBvaW50IEB4IC0geCwgQHkgLSB5XG4gIHN1YjogUG9pbnQ6OnN1YnRyYWN0XG5cbiAgYWRkOiAoeCwgeSkgLT5cbiAgICBpZiB4PyBhbmQgeC54PyBhbmQgeC55P1xuICAgICAge3gsIHl9ID0geFxuICAgIG5ldyBQb2ludCBAeCArIHgsIEB5ICsgeVxuXG4gIG11bHRpcGx5OiAobikgLT5cbiAgICBuZXcgUG9pbnQgQHggKiBuLCBAeSAqIG5cbiAgbXVsOiBQb2ludDo6bXVsdGlwbHlcbiIsInsgaXNBcnJheSB9ID0gcmVxdWlyZSAnbG9kYXNoJ1xuXG5cbiMjI1xu44Kv44Ko44Oq5paH5a2X5YiX44Kv44Op44K544Gn44GZ44CCXG4jIyNcbm1vZHVsZS5leHBvcnRzID1cbmNsYXNzIFF1ZXJ5U3RyaW5nXG5cbiAgQHN0cmluZ2lmeTogKG9iaiwgc2VwID0gJyYnLCBlcSA9ICc9JykgLT5cbiAgICBxdWVyaWVzID0gZm9yIGtleSwgdmFsIG9mIG9ialxuICAgICAgaWYgaXNBcnJheSB2YWxcbiAgICAgICAgZm9yIHYgaW4gdmFsXG4gICAgICAgICAgXCIje2tleX0je2VxfSN7ZW5jb2RlVVJJQ29tcG9uZW50IHYgPyAnJ31cIlxuICAgICAgZWxzZVxuICAgICAgICBcIiN7a2V5fSN7ZXF9I3tlbmNvZGVVUklDb21wb25lbnQgdmFsID8gJyd9XCJcbiAgICBxdWVyaWVzLmpvaW4gc2VwXG5cbiAgQHBhcnNlOiAoc3RyLCBzZXAgPSAnJicsIGVxID0gJz0nLCBvcHRzKSAtPlxuICAgIG9wdHMgPSBhc3NpZ24gb3B0cywgbWF4S2V5czogMTAwMFxuICAgIHttYXhLZXlzfSA9IG9wdHNcbiAgICBvYmogPSB7fVxuICAgIGZvciBrdiwgaSBpbiBzdHIuc3BsaXQgc2VwIHdoZW4gbWF4S2V5cyBpcyAwIG9yIGkgPCBtYXhLZXlzXG4gICAgICBba2V5LCB2YWxdID0ga3Yuc3BsaXQgZXFcbiAgICAgIGlmIG9ialtrZXldP1xuICAgICAgICBpZiBpc0FycmF5IG9ialtrZXldXG4gICAgICAgICAgb2JqW2tleV0ucHVzaCB2YWxcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHRtcCA9IG9ialtrZXldXG4gICAgICAgICAgb2JqW2tleV0gPSBbdG1wLCB2YWxdXG4gICAgICBlbHNlXG4gICAgICAgIG9ialtrZXldID0gdmFsXG4gICAgb2JqXG4iLCJQb2ludCA9IHJlcXVpcmUgJy4vcG9pbnQnXG57Zmxvb3IsIGNlaWx9ID0gTWF0aFxuXG5cbiMjI1xu56+E5Zuy44Kv44Op44K544Gn44GZ44CCXG7kuozmrKHlhYPjga7nm7TkuqTluqfmqJnns7vjgpLmibHjgYTjgb7jgZnjgIJcbiMjI1xubW9kdWxlLmV4cG9ydHMgPVxuY2xhc3MgUmVjdFxuXG4gIEBjcmVhdGVXaXRoQ29ybmVyOiAobGVmdCwgcmlnaHQsIHRvcCwgYm90dG9tKSAtPiBuZXcgUmVjdCBsZWZ0LCB0b3AsIHJpZ2h0IC0gbGVmdCwgYm90dG9tIC0gdG9wXG5cbiAgQHBhcnNlQXJndW1lbnRzOiAoYXJncykgLT5cbiAgICBzd2l0Y2ggYXJncy5sZW5ndGhcbiAgICAgIHdoZW4gMFxuICAgICAgICB4OiAwXG4gICAgICAgIHk6IDBcbiAgICAgICAgd2lkdGg6IDBcbiAgICAgICAgaGVpZ2h0OiAwXG4gICAgICB3aGVuIDFcbiAgICAgICAgYXJnc1swXVxuICAgICAgd2hlbiAyXG4gICAgICAgIHg6IGFyZ3NbMF0ueFxuICAgICAgICB5OiBhcmdzWzBdLnlcbiAgICAgICAgd2lkdGg6IGFyZ3NbMF0ueFxuICAgICAgICBoZWlnaHQ6IGFyZ3NbMF0ueVxuICAgICAgd2hlbiA0XG4gICAgICAgIHg6IGFyZ3NbMF1cbiAgICAgICAgeTogYXJnc1sxXVxuICAgICAgICB3aWR0aDogYXJnc1syXVxuICAgICAgICBoZWlnaHQ6IGFyZ3NbM11cbiAgICAgIGVsc2VcbiAgICAgICAgeDogYXJnc1swXSA/IDBcbiAgICAgICAgeTogYXJnc1sxXSA/IDBcbiAgICAgICAgd2lkdGg6IGFyZ3NbMl0gPyAwXG4gICAgICAgIGhlaWdodDogYXJnc1szXSA/IDBcblxuICBAY3JlYXRlV2l0aEFyZ3VtZW50czogKGFyZ3MpIC0+XG4gICAge3gsIHksIHdpZHRoLCBoZWlnaHR9ID0gUmVjdC5wYXJzZUFyZ3VtZW50cyBhcmdzXG4gICAgbmV3IFJlY3QgeCwgeSwgd2lkdGgsIGhlaWdodFxuXG4gIEBjcmVhdGVXaXRoQ2VudGVyOiAoY2VudGVyWCwgY2VudGVyWSwgd2lkdGgsIGhlaWdodCkgLT5cbiAgICByZWN0ID0gUmVjdC5jcmVhdGVXaXRoQXJndW1lbnRzIGFyZ3VtZW50c1xuICAgIHJlY3QueCAtPSByZWN0LndpZHRoIC8gMlxuICAgIHJlY3QueSAtPSByZWN0LmhlaWdodCAvIDJcbiAgICByZWN0XG5cblxuICBjb25zdHJ1Y3RvcjogKHgsIHksIHdpZHRoLCBoZWlnaHQpIC0+XG4gICAgaWYgeD8gYW5kIHgueD8gYW5kIHgueT8gYW5kIHgud2lkdGg/IGFuZCB4LmhlaWdodD9cbiAgICAgIHt4LCB5LCB3aWR0aCwgaGVpZ2h0fSA9IHhcbiAgICBAeCA9IHggPyAwXG4gICAgQHkgPSB5ID8gMFxuICAgIEB3aWR0aCA9IHdpZHRoID8gMFxuICAgIEBoZWlnaHQgPSBoZWlnaHQgPyAwXG5cbiAgIyMjXG4gIOikh+ijveOBl+OBvuOBmeOAglxuICBAcmV0dXJuIFtSZWN0XSDopIfoo73jgZXjgozjgZ9gUmVjdGDjgqTjg7Pjgrnjgr/jg7PjgrnjgafjgZnjgIJcbiAgIyMjXG4gIGNsb25lOiAtPiBuZXcgUmVjdCBAeCwgQHksIEB3aWR0aCwgQGhlaWdodFxuXG4gIGdldExlZnQ6IC0+IEB4XG4gIGdldFJpZ2h0OiAtPiBAeCArIEB3aWR0aFxuICBnZXRUb3A6IC0+IEB5XG4gIGdldEJvdHRvbTogLT4gQHkgKyBAaGVpZ2h0XG4gIGdldExlZnRUb3A6IC0+IG5ldyBQb2ludCBAZ2V0TGVmdCgpLCBAZ2V0VG9wKClcbiAgZ2V0TGVmdEJvdHRvbTogLT4gbmV3IFBvaW50IEBnZXRMZWZ0KCksIEBnZXRCb3R0b20oKVxuICBnZXRSaWdodFRvcDogLT4gbmV3IFBvaW50IEBnZXRSaWdodCgpLCBAZ2V0VG9wKClcbiAgZ2V0UmlnaHRCb3R0b206IC0+IG5ldyBQb2ludCBAZ2V0UmlnaHQoKSwgQGdldEJvdHRvbSgpXG5cbiAgY29udGFpbnNQb2ludDogKHBvaW50KSAtPlxuICAgIHt4LCB5fSA9IFBvaW50LnBhcnNlQXJndW1lbnRzIGFyZ3VtZW50c1xuICAgIEBnZXRMZWZ0KCkgPD0geCA8PSBAZ2V0UmlnaHQoKSBhbmQgQGdldFRvcCgpIDw9IHkgPD0gQGdldEJvdHRvbSgpXG5cbiAgY29udGFpbnNSZWN0OiAocmVjdCkgLT5cbiAgICB7eCwgeSwgd2lkdGgsIGhlaWdodH0gPSBSZWN0LnBhcnNlQXJndW1lbnRzIGFyZ3VtZW50c1xuICAgIHJlY3QgPSBuZXcgUmVjdCB4LCB5LCB3aWR0aCwgaGVpZ2h0XG4gICAgQGdldExlZnQoKSA8PSByZWN0LmdldExlZnQoKSBhbmQgcmVjdC5nZXRSaWdodCgpIDw9IEBnZXRSaWdodCgpIGFuZFxuICAgIEBnZXRUb3AoKSA8PSByZWN0LmdldFRvcCgpIGFuZCByZWN0LmdldEJvdHRvbSgpIDw9IEBnZXRCb3R0b20oKVxuXG4gIG9mZnNldDogKHgsIHkpIC0+XG4gICAgbmV3IFJlY3QgQHggKyB4LCBAeSArIHksIEB3aWR0aCwgQGhlaWdodFxuXG4gICMjI1xuICDmjIflrprjgZXjgozjgZ/ph4/lpKfjgY3jgY/jgZfjgZ/mlrDjgZ/jgarpoJjln5/jgpLnlJ/miJDjgZfjgb7jgZnjgIJcbiAgQHBhcmFtIFtOdW1iZXJdIHdpZHRoIOWkp+OBjeOBj+OBmeOCi+W5heOBp+OBmeOAglxuICBAcGFyYW0gW051bWJlcl0gaGVpZ2h0IOWkp+OBjeOBj+OBmeOCi+mrmOOBleOBp+OBmeOAglxuICBAcmV0dXJuIFtSZWN0XSDmlrDjgZ/jgarpoJjln5/jgafjgZnjgIJcbiAgIyMjXG4gIGluZmxhdGU6ICh3aWR0aCwgaGVpZ2h0KSAtPlxuICAgIG5ldyBSZWN0IEB4LCBAeSwgQHdpZHRoICsgd2lkdGgsIEBoZWlnaHQgKyBoZWlnaHRcblxuICAjIyNcbiAg5oyH5a6a44GV44KM44Gf6YeP5bCP44GV44GP44GX44Gf5paw44Gf44Gq6aCY5Z+f44KS55Sf5oiQ44GX44G+44GZ44CCXG4gIEBwYXJhbSBbTnVtYmVyXSB3aWR0aCDlsI/jgZXjgY/jgZnjgovluYXjgafjgZnjgIJcbiAgQHBhcmFtIFtOdW1iZXJdIGhlaWdodCDlsI/jgZXjgY/jgZnjgovpq5jjgZXjgafjgZnjgIJcbiAgQHJldHVybiBbUmVjdF0g5paw44Gf44Gq6aCY5Z+f44Gn44GZ44CCXG4gICMjI1xuICBkZWZsYXRlOiAod2lkdGgsIGhlaWdodCkgLT5cbiAgICBuZXcgUmVjdCBAeCwgQHksIEB3aWR0aCAtIHdpZHRoLCBAaGVpZ2h0IC0gaGVpZ2h0XG5cbiAgI1RPRE8gaW1wbGVtZW50IG1lXG4gIHVuaW9uOiAocmVjdCkgLT5cblxuXG4gICMjI1xuICDmjIflrprjga7poJjln5/lhoXjgavlj47jgb7jgovmlrDjgZ/jgarpoJjln5/jgpLnlJ/miJDjgZfjgb7jgZnjgIJcbiAgMS4geCx544KS5Y+O44G+44KL44KI44GG44Gr6Kit5a6a44GX44G+44GZ44CCXG4gIDIuIOWPjuOBvuOCieOBquOBhOWgtOWQiOOBr3dpZHRoLGhlaWdodOOCkuioreWumuOBl+OBvuOBmeOAglxuICAjIyNcbiAgZmFsbFdpdGhpbjogKHJlY3QpIC0+XG4gICAgciA9IEBjbG9uZSgpXG4gICAgbGVmdDAgPSByLmdldExlZnQoKVxuICAgIHJpZ2h0MCA9IHIuZ2V0UmlnaHQoKVxuICAgIHRvcDAgPSByLmdldFRvcCgpXG4gICAgYm90dG9tMCA9IHIuZ2V0Qm90dG9tKClcbiAgICBsZWZ0MSA9IHJlY3QuZ2V0TGVmdCgpXG4gICAgcmlnaHQxID0gcmVjdC5nZXRSaWdodCgpXG4gICAgdG9wMSA9IHJlY3QuZ2V0VG9wKClcbiAgICBib3R0b20xID0gcmVjdC5nZXRCb3R0b20oKVxuXG4gICAgaWYgbGVmdDAgPCBsZWZ0MVxuICAgICAgci54ID0gbGVmdDFcbiAgICAgICMgaWYgKG92ZXIgPSByLmdldFJpZ2h0KCkgLSByaWdodDEpID4gMFxuICAgICAgIyAgIHIud2lkdGggLT0gb3ZlclxuICAgIGlmIHJpZ2h0MCA+IHJpZ2h0MVxuICAgICAgci54IC09IHJpZ2h0MCAtIHJpZ2h0MVxuICAgIGlmIChvdmVyID0gci5nZXRSaWdodCgpIC0gcmlnaHQxKSA+IDBcbiAgICAgIHIud2lkdGggLT0gb3ZlclxuICAgIGlmIHRvcDAgPCB0b3AxXG4gICAgICByLnkgPSB0b3AxXG4gICAgICAjIGlmIChvdmVyID0gci5nZXRCb3R0b20oKSAtIGJvdHRvbTEpID4gMFxuICAgICAgIyAgIHIuaGVpZ2h0IC09IG92ZXJcbiAgICBpZiBib3R0b20wID4gYm90dG9tMVxuICAgICAgci55IC09IGJvdHRvbTAgLSBib3R0b20xXG4gICAgaWYgKG92ZXIgPSByLmdldEJvdHRvbSgpIC0gYm90dG9tMSkgPiAwXG4gICAgICByLmhlaWdodCAtPSBvdmVyXG5cbiAgICByXG5cblxuXG4gICMjI1xuICDjgZPjga7poJjln5/jgavmjIflrprluqfmqJnjgYzlkKvjgb7jgozjgovmlrDjgZ/jgarpoJjln5/jgpLnlJ/miJDjgZfjgb7jgZnjgIJcbiAgQHBhcmFtIFtOdW1iZXJdIHggeOW6p+aomeOBp+OBmeOAglxuICBAcGFyYW0gW051bWJlcl0geSB55bqn5qiZ44Gn44GZ44CCXG4gIEByZXR1cm4gW1JlY3RdIOaWsOOBn+OBqumgmOWfn+OBp+OBmeOAglxuICAjIyNcbiAgY29udGFpbjogKHgsIHkpIC0+XG4gICAgaWYgeD8gYW5kIHgueD8gYW5kIHgueT9cbiAgICAgIHt4LCB5fSA9IHhcbiAgICByID0gQGNsb25lKClcbiAgICByaWdodCA9IHIuZ2V0UmlnaHQoKVxuICAgIGlmIHggPCByLnhcbiAgICAgIHIueCA9IHhcbiAgICAgIHIud2lkdGggPSByaWdodCAtIHIueFxuICAgIGVsc2UgaWYgeCA+IHJpZ2h0XG4gICAgICByLndpZHRoID0geCAtIHIueFxuICAgIGJvdHRvbSA9IHIuZ2V0Qm90dG9tKClcbiAgICBpZiB5IDwgci55XG4gICAgICByLnkgPSB5XG4gICAgICByLmhlaWdodCA9IGJvdHRvbSAtIHIueVxuICAgIGVsc2UgaWYgeSA+IGJvdHRvbVxuICAgICAgci5oZWlnaHQgPSB5IC0gci55XG4gICAgclxuXG4gIGNlaWw6IC0+XG4gICAgbGVmdCA9IGZsb29yIEBnZXRMZWZ0KClcbiAgICByaWdodCA9IGNlaWwgQGdldFJpZ2h0KClcbiAgICB0b3AgPSBmbG9vciBAZ2V0VG9wKClcbiAgICBib3R0b20gPSBjZWlsIEBnZXRCb3R0b20oKVxuICAgIFJlY3QuY3JlYXRlV2l0aENvcm5lciBsZWZ0LCByaWdodCwgdG9wLCBib3R0b21cblxuICBmbG9vcjogLT5cbiAgICBsZWZ0ID0gY2VpbCBAZ2V0TGVmdCgpXG4gICAgcmlnaHQgPSBmbG9vciBAZ2V0UmlnaHQoKVxuICAgIHRvcCA9IGNlaWwgQGdldFRvcCgpXG4gICAgYm90dG9tID0gZmxvb3IgQGdldEJvdHRvbSgpXG4gICAgUmVjdC5jcmVhdGVXaXRoQ29ybmVyIGxlZnQsIHJpZ2h0LCB0b3AsIGJvdHRvbVxuIiwiUG9pbnQgPSByZXF1aXJlICcuL3BvaW50J1xuXG5tb2R1bGUuZXhwb3J0cyA9XG5cbiAgZ2V0VG90YWxMZW5ndGg6IChwYXRoKSAtPlxuICAgIHN3aXRjaCBwYXRoLnR5cGVcbiAgICAgIHdoZW4gJ2xpbmUnXG4gICAgICAgIHN0YXJ0ID0gbmV3IFBvaW50IHBhcnNlRmxvYXQocGF0aC5hdHRyKCd4MScpKSwgcGFyc2VGbG9hdChwYXRoLmF0dHIoJ3kxJykpXG4gICAgICAgIGVuZCA9IG5ldyBQb2ludCBwYXJzZUZsb2F0KHBhdGguYXR0cigneDInKSksIHBhcnNlRmxvYXQocGF0aC5hdHRyKCd5MicpKVxuICAgICAgICBQb2ludC5kaXN0YW5jZSBzdGFydCwgZW5kXG4gICAgICB3aGVuICdwb2x5bGluZSdcbiAgICAgICAgbGVuZ3RoID0gMFxuICAgICAgICBwb2ludHMgPSBwYXRoLmF0dHIgJ3BvaW50cydcbiAgICAgICAgaSA9IHBvaW50cy5sZW5ndGhcbiAgICAgICAgd2hpbGUgaS0tID4gMFxuICAgICAgICAgIGlmIHBvaW50c1tpXSBpcyAnJ1xuICAgICAgICAgICAgcG9pbnRzID0gcG9pbnRzLnNwbGljZSBpLCAxXG4gICAgICAgIGZvciB4LCBpIGluIHBvaW50cyBieSAyXG4gICAgICAgICAgeCA9IHBhcnNlRmxvYXQgeFxuICAgICAgICAgIHkgPSBwYXJzZUZsb2F0IHBvaW50c1tpICsgMV1cbiAgICAgICAgICBuZXh0ID0gbmV3IFBvaW50IHgsIHlcbiAgICAgICAgICBpZiBwcmV2P1xuICAgICAgICAgICAgbGVuZ3RoICs9IFBvaW50LmRpc3RhbmNlIHByZXYsIG5leHRcbiAgICAgICAgICBwcmV2ID0gbmV4dFxuICAgICAgICBsZW5ndGhcbiAgICAgIGVsc2VcbiAgICAgICAgcGF0aC5nZXRUb3RhbExlbmd0aCgpXG5cbiAgZ2V0UG9pbnRBdExlbmd0aDogKHBhdGgsIGxlbikgLT5cbiAgICBzd2l0Y2ggcGF0aC50eXBlXG4gICAgICB3aGVuICdsaW5lJ1xuICAgICAgICBzdGFydCA9IG5ldyBQb2ludCBwYXJzZUZsb2F0KHBhdGguYXR0cigneDEnKSksIHBhcnNlRmxvYXQocGF0aC5hdHRyKCd5MScpKVxuICAgICAgICBlbmQgPSBuZXcgUG9pbnQgcGFyc2VGbG9hdChwYXRoLmF0dHIoJ3gyJykpLCBwYXJzZUZsb2F0KHBhdGguYXR0cigneTInKSlcbiAgICAgICAgUG9pbnQubGVycCBzdGFydCwgZW5kLCBsZW4gLyBQb2ludC5kaXN0YW5jZSBzdGFydCwgZW5kXG4gICAgICB3aGVuICdwb2x5bGluZSdcbiAgICAgICAgbGVuZ3RoID0gMFxuICAgICAgICBwb2ludHMgPSBwYXRoLmF0dHIgJ3BvaW50cydcbiAgICAgICAgZm9yIHgsIGkgaW4gcG9pbnRzIGJ5IDJcbiAgICAgICAgICB4ID0gcGFyc2VGbG9hdCB4XG4gICAgICAgICAgeSA9IHBhcnNlRmxvYXQgcG9pbnRzW2kgKyAxXVxuICAgICAgICAgIGVuZCA9IG5ldyBQb2ludCB4LCB5XG4gICAgICAgICAgaWYgc3RhcnQ/XG4gICAgICAgICAgICBkaXN0YW5jZSA9IFBvaW50LmRpc3RhbmNlIHN0YXJ0LCBlbmRcbiAgICAgICAgICAgIGlmIGxlbmd0aCA8PSBsZW4gPD0gKGxlbmd0aCArPSBkaXN0YW5jZSlcbiAgICAgICAgICAgICAgcmV0dXJuIFBvaW50LmxlcnAgc3RhcnQsIGVuZCwgbGVuIC8gUG9pbnQuZGlzdGFuY2Ugc3RhcnQsIGVuZFxuICAgICAgICAgIHN0YXJ0ID0gZW5kXG4gICAgICAgIHJldHVyblxuICAgICAgZWxzZVxuICAgICAgICBuZXcgUG9pbnQgcGF0aC5nZXRQb2ludEF0TGVuZ3RoIGxlblxuIiwieyBzdHJpbmdpZnkgfSA9IHJlcXVpcmUgJy4uL3F1ZXJ5LXN0cmluZydcblxuXG4jIyNcbkZhY2Vib29r44Gu5o+Q5L6b44GZ44KL44K144O844OT44K544KS5Yip55So44GZ44KL44Gf44KB44Gu44Kv44Op44K544Gn44GZ44CCXG4jIyNcbm1vZHVsZS5leHBvcnRzID1cbmNsYXNzIEZhY2Vib29rXG5cbiAgIyMjXG4gIOOCpuOCp+ODluOCteOCpOODiOOCkuOCt+OCp+OCouOBmeOCi+eCuuOBrlVSTOOCkueUn+aIkOOBl+OBvuOBmeOAglxuICBAcGFyYW0gW1N0cmluZ10gdXJsIOOCpuOCp+ODluOCteOCpOODiOOBrlVSTOOBp+OBmeOAglxuICBAcmV0dXJuIFtTdHJpbmddIOOCt+OCp+OCouOBmeOCi+eCuuOBrlVSTOOBp+OBmeOAglxuICAjIyNcbiAgQGNyZWF0ZVNoYXJlVXJsOiAodXJsKSAtPiBcImh0dHA6Ly93d3cuZmFjZWJvb2suY29tL3NoYXJlLnBocD8je3N0cmluZ2lmeSB1OiB1cmx9XCJcblxuICAjIyNcbiAg44Km44Kn44OW44K144Kk44OI44Gu44K344Kn44Ki5pWw44KS5Y+W5b6X44GX44G+44GZ44CCXG4gIEBwYXJhbSBbU3RyaW5nXSB1cmwg44Km44Kn44OW44K144Kk44OI44GuVVJM44Gn44GZ44CCXG4gIEBwYXJhbSBbRnVuY3Rpb25dIGNhbGxiYWNrIOOCs+ODvOODq+ODkOODg+OCr+OBp+OBmeOAglxuXG4gIEBleGFtcGxlIOOCpuOCp+ODluOCteOCpOODiOOBruOCt+OCp+OCouaVsOOCkuWPluW+l+OCkmFsZXJ044GX44G+44GZ44CCXG4gICAgICBGYWNlYm9vay5mZXRjaENvdW50ICdodHRwOi8vZXhhbXBsZS5jb20nLCAoZXJyLCBzaGFyZXMpIC0+XG4gICAgICAgIHRocm93IGVyciBpZiBlcnI/XG4gICAgICAgIGFsZXJ0IHNoYXJlc1xuICAjIyNcbiAgQGZldGNoU2hhcmVDb3VudDogKHVybCwgY2FsbGJhY2spIC0+XG4gICAgJFxuICAgIC5hamF4XG4gICAgICB1cmw6ICdodHRwczovL2dyYXBoLmZhY2Vib29rLmNvbS8nXG4gICAgICB0eXBlOiAnZ2V0J1xuICAgICAgY2FjaGU6IGZhbHNlXG4gICAgICBkYXRhOlxuICAgICAgICB1cmw6IHVybFxuICAgICAgZGF0YVR5cGU6ICdqc29ucCdcbiAgICAgIHN1Y2Nlc3M6ICh7IHNoYXJlcyB9KSAtPlxuICAgICAgICB1bmxlc3Mgc2hhcmVzP1xuICAgICAgICAgIGNhbGxiYWNrICdubyBkYXRhJ1xuICAgICAgICAgIHJldHVyblxuICAgICAgICBjYWxsYmFjayBudWxsLCBzaGFyZXNcbiAgICAgIGVycm9yOiAoe30sIHR5cGUpIC0+XG4gICAgICAgIGNhbGxiYWNrIHR5cGVcbiIsInsgc3RyaW5naWZ5IH0gPSByZXF1aXJlICcuLi9xdWVyeS1zdHJpbmcnXG5cblxuIyMjXG5Hb29nbGUr44Gu5o+Q5L6b44GZ44KL44K144O844OT44K544KS5Yip55So44GZ44KL44Gf44KB44Gu44Kv44Op44K544Gn44GZ44CCXG4jIyNcbm1vZHVsZS5leHBvcnRzID1cbmNsYXNzIFR3aXR0ZXJcblxuICAjIyNcbiAg44Km44Kn44OW44K144Kk44OI44KS44K344Kn44Ki44GZ44KL54K644GuVVJM44KS55Sf5oiQ44GX44G+44GZ44CCXG4gIEBwYXJhbSBbU3RyaW5nXSB1cmwg44Km44Kn44OW44K144Kk44OI44GuVVJM44Gn44GZ44CCXG4gIEByZXR1cm4gW1N0cmluZ10g44K344Kn44Ki44GZ44KL54K644GuVVJM44Gn44GZ44CCXG4gICMjI1xuICBAY3JlYXRlU2hhcmVVcmw6ICh1cmwpIC0+IFwiaHR0cHM6Ly9wbHVzLmdvb2dsZS5jb20vc2hhcmU/I3tzdHJpbmdpZnkge3VybH19XCJcblxuICAjIyNcbiAg44Km44Kn44OW44K144Kk44OI44Gu44K344Kn44Ki5pWw44KS5Y+W5b6X44GX44G+44GZ44CCXG4gIEBwYXJhbSBbU3RyaW5nXSB1cmwg44Km44Kn44OW44K144Kk44OI44GuVVJM44Gn44GZ44CCXG4gIEBwYXJhbSBbRnVuY3Rpb25dIGNhbGxiYWNrIOOCs+ODvOODq+ODkOODg+OCr+OBp+OBmeOAglxuICAjIyNcbiAgQGZldGNoU2hhcmVDb3VudDogKHVybCwgY2FsbGJhY2spIC0+XG4gICAgJFxuICAgIC5hamF4XG4gICAgICB1cmw6IFwiaHR0cDovL3F1ZXJ5LnlhaG9vYXBpcy5jb20vdjEvcHVibGljL3lxbD9lbnY9aHR0cDovL2RhdGF0YWJsZXMub3JnL2FsbHRhYmxlcy5lbnYmcT0je2VuY29kZVVSSUNvbXBvbmVudCBcIlNFTEVDVCBjb250ZW50IEZST00gZGF0YS5oZWFkZXJzIFdIRVJFIHVybD0naHR0cHM6Ly9wbHVzb25lLmdvb2dsZS5jb20vXy8rMS9mYXN0YnV0dG9uP2hsPWphJnVybD0je3VybH0nIGFuZCB1YT0nI3t1YX0nXCJ9XCJcbiAgICAgIHR5cGU6ICdnZXQnXG4gICAgICBjYWNoZTogZmFsc2VcbiAgICAgIGRhdGFUeXBlOiAneG1sJ1xuICAgICAgZXJyb3I6ICh7fSwgdHlwZSkgLT5cbiAgICAgICAgY2FsbGJhY2sgdHlwZVxuICAgICAgc3VjY2VzczogKGRvY3VtZW50KSAtPlxuICAgICAgICBzdHIgPSAkKGRvY3VtZW50KS5maW5kKCdjb250ZW50JykudGV4dCgpLm1hdGNoKC88c2NyaXB0IHR5cGU9XCJ0ZXh0XFwvamF2YXNjcmlwdFwiPndpbmRvd1xcLl9fU1NSID0gKFtcXHNcXFNdKj8pOy8pWzFdXG4gICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlIC9cXHI/XFxuL2csICcnXG4gICAgICAgIG9iaiA9IG51bGxcbiAgICAgICAgZXZhbCBcIm9iaiA9ICN7c3RyfTtcIlxuICAgICAgICBjb3VudCA9IG9iai5sZFsxXVs0XVxuXG4gICAgICAgIHVubGVzcyBjb3VudD9cbiAgICAgICAgICBjYWxsYmFjayAnbm8gZGF0YSdcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgY2FsbGJhY2sgbnVsbCwgcGFyc2VJbnQgY291bnQsIDEwXG4iLCIjIyNcbkhhdGVuYeOBruaPkOS+m+OBmeOCi+OCteODvOODk+OCueOCkuWIqeeUqOOBmeOCi+OBn+OCgeOBruOCr+ODqeOCueOBp+OBmeOAglxuIyMjXG5tb2R1bGUuZXhwb3J0cyA9XG5jbGFzcyBIYXRlbmFcblxuICAjIyNcbiAg44Km44Kn44OW44K144Kk44OI44KS44OW44OD44Kv44Oe44O844Kv44GZ44KL54K644GuVVJM44KS55Sf5oiQ44GX44G+44GZ44CCXG4gIEBwYXJhbSBbU3RyaW5nXSB1cmwg44Km44Kn44OW44K144Kk44OI44GuVVJM44Gn44GZ44CCXG4gIEByZXR1cm4gW1N0cmluZ10g44OW44OD44Kv44Oe44O844Kv44GZ44KL54K644GuVVJM44Gn44GZ44CCXG4gICMjI1xuICBAY3JlYXRlQm9va21hcmtVcmw6ICh1cmwpIC0+XG4gICAgIyBEb24ndCBlbmNvZGUgdXJsLlxuICAgIFwiaHR0cDovL2IuaGF0ZW5hLm5lLmpwL2VudHJ5L2FkZC8je3VybH1cIlxuIiwieyBzdHJpbmdpZnkgfSA9IHJlcXVpcmUgJy4uL3F1ZXJ5LXN0cmluZydcbnsgbW9iaWxlIH0gPSByZXF1aXJlICcuLi8uLi9tb2RlbHMvb3MnXG5cblxuIyMjXG5MaW5l44Gu5o+Q5L6b44GZ44KL44K144O844OT44K544KS5Yip55So44GZ44KL44Gf44KB44Gu44Kv44Op44K544Gn44GZ44CCXG4jIyNcbm1vZHVsZS5leHBvcnRzID1cbmNsYXNzIExpbmVcblxuICAjIyNcbiAg44OG44Kt44K544OI44KS44OB44Oj44OD44OI44GZ44KL54K644GuVVJM44KS55Sf5oiQ44GX44G+44GZ44CCXG4gIEBwYXJhbSBbU3RyaW5nXSB0ZXh0IOODhuOCreOCueODiOOBp+OBmeOAglxuICBAcmV0dXJuIFtTdHJpbmddIOODgeODo+ODg+ODiOOBmeOCi+eCuuOBrlVSTOOBp+OBmeOAglxuICAjIyNcbiAgQGNyZWF0ZUNoYXRVcmw6ICh0ZXh0KSAtPlxuICAgIHRleHQgPSBlbmNvZGVVUklDb21wb25lbnQgdGV4dFxuICAgIGlmIG1vYmlsZVxuICAgICAgXCJsaW5lOi8vbXNnL3RleHQvI3t0ZXh0fVwiXG4gICAgZWxzZVxuICAgICAgXCJodHRwOi8vbGluZS5uYXZlci5qcC9SL21zZy90ZXh0Lz8je3RleHR9XCJcbiIsInsgc3RyaW5naWZ5IH0gPSByZXF1aXJlICcuLi9xdWVyeS1zdHJpbmcnXG5cblxuIyMjXG5QaW50ZXJlc3Tjga7mj5DkvpvjgZnjgovjgrXjg7zjg5PjgrnjgpLliKnnlKjjgZnjgovjgZ/jgoHjga7jgq/jg6njgrnjgafjgZnjgIJcbiMjI1xubW9kdWxlLmV4cG9ydHMgPVxuY2xhc3MgUGludGVyZXN0XG5cbiAgIyMjXG4gIOOCpuOCp+ODluOCteOCpOODiOOCkuODlOODs+OBmeOCi+eCuuOBrlVSTOOCkueUn+aIkOOBl+OBvuOBmeOAglxuICBAcGFyYW0gW09iamVjdF0gb3B0aW9ucyDjgqrjg5fjgrfjg6fjg7PjgafjgZnjgIJcbiAgQG9wdGlvbiBvcHRpb25zIFtTdHJpbmddIHVybCDjgqbjgqfjg5bjgrXjgqTjg4jjga5VUkzjgafjgZnjgIJcbiAgQG9wdGlvbiBvcHRpb25zIFtTdHJpbmddIG1lZGlhIOeUu+WDj+etieOBruODoeODh+OCo+OCouOBrlVSTOOBp+OBmeOAglxuICBAb3B0aW9uIG9wdGlvbnMgW1N0cmluZ10gZGVzY3JpcHRpb24g6Kqs5piO5paH44Gn44GZ44CCXG4gIEByZXR1cm4gW1N0cmluZ10g44K344Kn44Ki44GZ44KL54K644GuVVJM44Gn44GZ44CCXG4gICMjI1xuICBAY3JlYXRlUGluSXRVcmw6IChvcHRpb25zKSAtPlxuICAgIFwiaHR0cDovL3d3dy5waW50ZXJlc3QuY29tL3Bpbi9jcmVhdGUvYnV0dG9uLz8je3N0cmluZ2lmeSBvcHRpb25zfVwiXG4iLCJ7IHN0cmluZ2lmeSB9ID0gcmVxdWlyZSAnLi4vcXVlcnktc3RyaW5nJ1xuXG5cbiMjI1xuVHdpdHRlcuOBruaPkOS+m+OBmeOCi+OCteODvOODk+OCueOCkuWIqeeUqOOBmeOCi+OBn+OCgeOBruOCr+ODqeOCueOBp+OBmeOAglxuIyMjXG5tb2R1bGUuZXhwb3J0cyA9XG5jbGFzcyBUd2l0dGVyXG5cbiAgIyMjXG4gIOOCpuOCp+ODluOCteOCpOODiOOCkuODhOOCpOODvOODiOOBmeOCi+eCuuOBrlVSTOOCkueUn+aIkOOBl+OBvuOBmeOAglxuICBAcGFyYW0gW09iamVjdF0gb3B0aW9ucyDjgqrjg5fjgrfjg6fjg7PjgafjgZnjgIJcbiAgQG9wdGlvbiBvcHRpb25zIFtTdHJpbmddIHRleHQg6Kqs5piO5paH44Gn44GZ44CCXG4gIEBvcHRpb24gb3B0aW9ucyBbU3RyaW5nXSB1cmwg44Km44Kn44OW44K144Kk44OI44GuVVJM44Gn44GZ44CCXG4gIEBvcHRpb24gb3B0aW9ucyBbU3RyaW5nXSBoYXNodGFncyDjg4/jg4Pjgrfjg6Xjgr/jgrDjgafjgZnjgIJcbiAgQHJldHVybiBbU3RyaW5nXSDjg4TjgqTjg7zjg4jjgZnjgovngrrjga5VUkzjgafjgZnjgIJcbiAgIyMjXG4gIEBjcmVhdGVUd2VldFVybDogKHt0ZXh0LCB1cmwsIGhhc2h0YWdzfSkgLT5cbiAgICBcImh0dHA6Ly90d2l0dGVyLmNvbS9zaGFyZT8je3N0cmluZ2lmeSB7dGV4dCwgdXJsLCBoYXNodGFnc319XCJcblxuICAjIyNcbiAg44Km44Kn44OW44K144Kk44OI44Gu44OE44Kk44O844OI5pWw44KS5Y+W5b6X44GX44G+44GZ44CCXG4gIEBwYXJhbSBbU3RyaW5nXSB1cmwg44Km44Kn44OW44K144Kk44OI44GuVVJM44Gn44GZ44CCXG4gIEBwYXJhbSBbRnVuY3Rpb25dIGNhbGxiYWNrIOOCs+ODvOODq+ODkOODg+OCr+OBp+OBmeOAglxuICAjIyNcbiAgQGZldGNoVHdlZXRDb3VudDogKHVybCwgY2FsbGJhY2spIC0+XG4gICAgJFxuICAgIC5hamF4XG4gICAgICB1cmw6ICdodHRwOi8vdXJscy5hcGkudHdpdHRlci5jb20vMS91cmxzL2NvdW50Lmpzb24nXG4gICAgICB0eXBlOiAnZ2V0J1xuICAgICAgY2FjaGU6IGZhbHNlXG4gICAgICBkYXRhOiB1cmw6IHVybFxuICAgICAgZGF0YVR5cGU6ICdqc29ucCdcbiAgICAgIGVycm9yOiAoe30sIHR5cGUpIC0+XG4gICAgICAgIGNhbGxiYWNrIHR5cGVcbiAgICAgIHN1Y2Nlc3M6ICh7IGNvdW50IH0pIC0+XG4gICAgICAgIHVubGVzcyBjb3VudD9cbiAgICAgICAgICBjYWxsYmFjayAnbm8gZGF0YSdcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgY2FsbGJhY2sgbnVsbCwgY291bnRcbiIsIiMjI1xuQW5jaG9yIGlzIGEgd3JhcHBlciBvZiA8YSBocmVmPVwiIypcIj4uXG4jIyNcblxuVmlldyA9IHJlcXVpcmUgJy4vdmlldydcbiQgPSByZXF1aXJlICdqcXVlcnknXG5cblxubW9kdWxlLmV4cG9ydHMgPVxuY2xhc3MgQW5jaG9yIGV4dGVuZHMgVmlld1xuXG4gICMjI1xuICBDcmVhdGVzIGEgQW5jaG9yIGluc3RhbmNlLlxuICAjIyNcbiAgY29uc3RydWN0b3I6IC0+XG4gICAgc3VwZXJcblxuICAgIEBvbiAnY2xpY2snLCBAb25DbGlja1xuXG4gICMjI1xuICBDbGljayBldmVudFxuICAjIyNcbiAgb25DbGljazogKGUpID0+XG4gICAgaHJlZiA9IEBhdHRyICdocmVmJ1xuICAgIGlmIGhyZWYgaXMgJyMnXG4gICAgICB0b3AgPSAwXG4gICAgZWxzZVxuICAgICAgJGVsID0gJCBocmVmXG4gICAgICByZXR1cm4gaWYgJGVsLmxlbmd0aCBpcyAwXG4gICAgICB0b3AgPSAkZWwub2Zmc2V0KCkudG9wXG5cbiAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICQgJ2h0bWwsYm9keSdcbiAgICAuc3RvcCB0cnVlLCBmYWxzZVxuICAgIC5hbmltYXRlXG4gICAgICBzY3JvbGxUb3A6IHRvcFxuICAgICwgNjAwICMsICdlYXNlT3V0UXVhZCdcbiIsIiMjI1xuQnJlYWtwb2ludCBjYWxsIHJlZ2lzdGVyZWQgY2FsbGJhY2sgd2hlbiB3aW5kb3cgd2lkdGggY29udGFpbnMgcmVnaXN0ZXJlZCByYW5nZS5cbiMjI1xuXG5WaWV3ID0gcmVxdWlyZSAnLi92aWV3J1xuXG5tb2R1bGUuZXhwb3J0cyA9XG5jbGFzcyBCcmVha3BvaW50IGV4dGVuZHMgVmlld1xuXG4gIGJyZWFrcG9pbnQ6IHtcbiAgICAjJzAuLjY0MCc6ICdvblNtYWxsZXJUaGFuNjQwJ1xuICB9XG5cbiAgIyMjXG4gIENyZWF0ZXMgYSBCcmVha3BvaW50IGluc3RhbmNlLlxuICAjIyNcbiAgY29uc3RydWN0b3I6IC0+XG4gICAgc3VwZXJcblxuICAgIEBicmVha3BvaW50cyA9IFtdXG4gICAgZm9yIGNvbmRpdGlvbiwgY2FsbGJhY2sgb2YgQGJyZWFrcG9pbnRcbiAgICAgIG1hdGNoZWQgPSBjb25kaXRpb24ubWF0Y2ggL14oXFxkKikoXFwuezIsM30pKFxcZCopJC9cbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IgJ2JyZWFrcG9pbnQgc2hvdWxkIGJlIHdyaXR0ZW4gbGlrZSA2NDAuLjEwODAgb3IgNjQwLi4uMTA4MCcgdW5sZXNzIG1hdGNoZWQ/XG4gICAgICBAYnJlYWtwb2ludHMucHVzaFxuICAgICAgICBzdGFydCAgICAgICAgOiBpZiBtYXRjaGVkWzFdIGlzICcnIHRoZW4gTnVtYmVyLk1JTl9WQUxVRSBlbHNlIHBhcnNlRmxvYXQgbWF0Y2hlZFsxXVxuICAgICAgICBlbmQgICAgICAgICAgOiBpZiBtYXRjaGVkWzNdIGlzICcnIHRoZW4gTnVtYmVyLk1BWF9WQUxVRSBlbHNlIHBhcnNlRmxvYXQgbWF0Y2hlZFszXVxuICAgICAgICBpc0NvbnRhaW5zRW5kOiBtYXRjaGVkWzJdLmxlbmd0aCBpcyAyXG4gICAgICAgIGNhbGxiYWNrICAgICA6IEBbY2FsbGJhY2tdXG4gICAgQGNvbnN0cnVjdG9yLiR3aW5kb3dcbiAgICAub24gJ2xvYWQnLCBAb25XaW5kb3dMb2FkXG4gICAgLm9uICdyZXNpemUnLCBAb25XaW5kb3dSZXNpemVkXG5cbiAgIyMjXG4gIFN0b3BzIGxpc3RlbmluZyBldmVudHMgYW5kIGRlbGV0ZXMgcmVmZXJlbmNlcy5cbiAgIyMjXG4gIGRlc3RydWN0OiAtPlxuICAgIEBjb25zdHJ1Y3Rvci4kd2luZG93Lm9mZiAnbG9hZCcsIEBvbldpbmRvd0xvYWRcbiAgICBAY29uc3RydWN0b3IuJHdpbmRvdy5vZmYgJ3Jlc2l6ZScsIEBvbldpbmRvd1Jlc2l6ZWRcbiAgICBzdXBlclxuXG4gIG9uV2luZG93TG9hZDogPT5cbiAgICBAb25XaW5kb3dSZXNpemVkKClcblxuICAjIyNcbiAgQ2FsbHMgY2FsbGJhY2tzIGNvbnRhaW5zIGN1cnJlbnQgd2luZG93IHdpZHRoLlxuICAjIyNcbiAgb25XaW5kb3dSZXNpemVkOiA9PlxuICAgIHdpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGggPyBAY29uc3RydWN0b3IuJHdpbmRvdy5pbm5lcldpZHRoKClcbiAgICBmb3IgeyBzdGFydCwgZW5kLCBpc0NvbnRhaW5zRW5kLCBjYWxsYmFjayB9IGluIEBicmVha3BvaW50c1xuICAgICAgaWYgaXNDb250YWluc0VuZFxuICAgICAgICBpZiBzdGFydCA8PSB3aW5kb3dXaWR0aCA8PSBlbmRcbiAgICAgICAgICBjYWxsYmFjay5jYWxsIEAsIHdpbmRvd1dpZHRoXG4gICAgICBlbHNlXG4gICAgICAgIGlmIHN0YXJ0IDw9IHdpbmRvd1dpZHRoIDwgZW5kXG4gICAgICAgICAgY2FsbGJhY2suY2FsbCBALCB3aW5kb3dXaWR0aFxuICAgIEBvblJlc2l6ZWQoKVxuXG4gICMjI1xuICBDYWxsZWQgYWZ0ZXIgYWxsIGNhbGxiYWNrcyBhcmUgY2FsbGVkLlxuICAjIyNcbiAgb25SZXNpemVkOiAtPlxuIiwiIyMjXG5DaGVja2JveCBpcyBhIHdyYXBwZXIgb2YgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiPi5cbiMjI1xuXG5WaWV3ID0gcmVxdWlyZSAnLi92aWV3J1xuXG5tb2R1bGUuZXhwb3J0cyA9XG5jbGFzcyBDaGVja2JveCBleHRlbmRzIFZpZXdcblxuICBjaGVja2VkOiAnaXMtY2hlY2tlZCdcblxuICAjIyNcbiAgQ3JlYXRlcyBhIENoZWNrYm94IGluc3RhbmNlLlxuICAjIyNcbiAgY29uc3RydWN0b3I6IC0+XG4gICAgc3VwZXJcbiAgICBAJGNoZWNrYm94ID0gQCQgJ2lucHV0W3R5cGU9Y2hlY2tib3hdJ1xuICAgIC5vbiAnY2hhbmdlJywgQHVwZGF0ZVxuICAgIEB1cGRhdGUoKVxuXG4gICMjI1xuICBSZWZsZWN0cyBjaGVja2VkIHN0YXR1cyBvZiB0aGUgcmF3IGVsZW1lbnQgdG8gbXlzZWxmLlxuICAjIyNcbiAgdXBkYXRlOiA9PlxuICAgIGlmIEAkY2hlY2tib3gucHJvcCAnY2hlY2tlZCdcbiAgICAgIEBhZGRDbGFzcyBAY2hlY2tlZFxuICAgIGVsc2VcbiAgICAgIEByZW1vdmVDbGFzcyBAY2hlY2tlZFxuIiwiIyMjXG5EcmF3ZXIgY2xhc3MuXG4jIyNcblxuVmlldyA9IHJlcXVpcmUgJy4vdmlldydcblxubW9kdWxlLmV4cG9ydHMgPVxuY2xhc3MgRHJhd2VyIGV4dGVuZHMgVmlld1xuXG4gIHNlbGVjdG9yQnV0dG9uOiAnLmpzLWJ1dHRvbidcbiAgc2VsZWN0b3JDb250ZW50OiAnLmpzLWNvbnRlbnQnXG4gIGNsYXNzT3BlbmVkOiAnaXMtb3BlbmVkJ1xuXG4gIGNvbnN0cnVjdG9yOiAtPlxuICAgIHN1cGVyXG4gICAgQCQgQHNlbGVjdG9yQnV0dG9uXG4gICAgLm9uICdjbGljaycsIEB0b2dnbGVcbiAgICBAY29udGVudCA9IEAkIEBzZWxlY3RvckNvbnRlbnRcblxuICB0b2dnbGU6ICh7fSwgaW5kZXgpID0+XG4gICAgaWYgQGhhc0NsYXNzIEBjbGFzc09wZW5lZFxuICAgICAgQHJlbW92ZUNsYXNzIEBjbGFzc09wZW5lZFxuICAgICAgQGNvbnRlbnRcbiAgICAgIC5zdG9wIHRydWUsIGZhbHNlXG4gICAgICAuc2xpZGVVcCgpXG4gICAgZWxzZVxuICAgICAgQGFkZENsYXNzIEBjbGFzc09wZW5lZFxuICAgICAgQGNvbnRlbnRcbiAgICAgIC5zdG9wIHRydWUsIGZhbHNlXG4gICAgICAuc2xpZGVEb3duKClcbiIsIiMjI1xuSW1hZ2UgaXMgYSB3cmFwcGVyIG9mIDxpbWc+LlxuIyMjXG5cbnsgbXNpZSwgdmVyc2lvbk51bWJlciB9ID0gcmVxdWlyZSAnLi4vbW9kZWxzL2Jyb3dzZXInXG5WaWV3ID0gcmVxdWlyZSAnLi92aWV3J1xuXG5tb2R1bGUuZXhwb3J0cyA9XG5jbGFzcyBJbWFnZSBleHRlbmRzIFZpZXdcblxuICAjIyNcbiAgQ3JlYXRlcyBhIEltYWdlIGluc3RhbmNlLlxuICAjIyNcbiAgY29uc3RydWN0b3I6IC0+XG4gICAgc3VwZXJcbiAgICBAc3JjID0gQGF0dHIgJ3NyYydcblxuICAjIyNcbiAg55S75YOP44KS44Ot44O844OJ44GX44G+44GZ44CCXG4gIEBldmVudFxuICAjIyNcbiAgbG9hZDogLT5cbiAgICBpZiBtc2llIGFuZCB2ZXJzaW9uTnVtYmVyIDwgOVxuICAgICAgc3JjID0gXCIje0BzcmN9PyN7bmV3IERhdGUoKS5nZXRUaW1lKCl9XCJcbiAgICAkICc8aW1nPidcbiAgICAub25lICdsb2FkIGVycm9yJywgPT5cbiAgICAgIEBlbWl0ICdsb2FkLmNvbXBsZXRlJ1xuICAgIC5hdHRyICdzcmMnLCBzcmNcbiIsIlZpZXcgPSByZXF1aXJlICcuL3ZpZXcnXG57IGFzc2lnbiB9ID0gcmVxdWlyZSAnbG9kYXNoJ1xuaW90YSA9IHJlcXVpcmUoJy4uL21vZGVscy9pb3RhJykoKVxuXG5cbm1vZHVsZS5leHBvcnRzID1cbmNsYXNzIE1hc2tGYWN0b3J5IGV4dGVuZHMgVmlld1xuXG4gIEBMRUZUOiAxIDw8IGlvdGEoKVxuICBAUklHSFQ6IDEgPDwgaW90YSgpXG4gIEBUT1A6IDEgPDwgaW90YSgpXG4gIEBCT1RUT006IDEgPDwgaW90YSgpXG5cbiAgY2xhc3NPdXRlcjogJ2pzLW1hc2tmYWN0b3J5LW91dGVyJ1xuICBjbGFzc01hc2s6ICdqcy1tYXNrZmFjdG9yeS1tYXNrJ1xuICBjbGFzc0lubmVyOiAnanMtbWFza2ZhY3RvcnktaW5uZXInXG5cbiAgY29uc3RydWN0b3I6ICh7fSwgQG9yaWdpbiA9IEBjb25zdHJ1Y3Rvci5MRUZUKSAtPlxuICAgIHN1cGVyXG5cbiAgICBAb3V0ZXIgPSBAd3JhcElubmVyICc8ZGl2PidcbiAgICAuY2hpbGRyZW4oKVxuICAgIC5hZGRDbGFzcyBAY2xhc3NPdXRlclxuXG4gICAgQG1hc2sgPSBAb3V0ZXIud3JhcElubmVyICc8ZGl2PidcbiAgICAuY2hpbGRyZW4oKVxuICAgIC5hZGRDbGFzcyBAY2xhc3NNYXNrXG4gICAgLmNzc1xuICAgICAgd2lkdGg6ICcxMDAlJ1xuICAgICAgaGVpZ2h0OiAnMTAwJSdcblxuICAgIEBpbm5lciA9IEBtYXNrLndyYXBJbm5lciAnPGRpdj4nXG4gICAgLmNoaWxkcmVuKClcbiAgICAuYWRkQ2xhc3MgQGNsYXNzSW5uZXJcblxuICAgIGlmIChAb3JpZ2luICYgQGNvbnN0cnVjdG9yLkxFRlQpIGlzIEBjb25zdHJ1Y3Rvci5MRUZUXG4gICAgICBAbWFzay5jc3MgbGVmdDogMFxuICAgICAgQGlubmVyLmNzcyBsZWZ0OiAwXG4gICAgaWYgKEBvcmlnaW4gJiBAY29uc3RydWN0b3IuUklHSFQpIGlzIEBjb25zdHJ1Y3Rvci5SSUdIVFxuICAgICAgQG1hc2suY3NzIHJpZ2h0OiAwXG4gICAgICBAaW5uZXIuY3NzIHJpZ2h0OiAwXG4gICAgaWYgKEBvcmlnaW4gJiBAY29uc3RydWN0b3IuVE9QKSBpcyBAY29uc3RydWN0b3IuVE9QXG4gICAgICBAbWFzay5jc3MgdG9wOiAwXG4gICAgICBAaW5uZXIuY3NzIHRvcDogMFxuICAgIGlmIChAb3JpZ2luICYgQGNvbnN0cnVjdG9yLkJPVFRPTSkgaXMgQGNvbnN0cnVjdG9yLkJPVFRPTVxuICAgICAgQG1hc2suY3NzIGJvdHRvbTogMFxuICAgICAgQGlubmVyLmNzcyBib3R0b206IDBcblxuICAgIEBjb25zdHJ1Y3Rvci4kd2luZG93Lm9uICdsb2FkIHJlc2l6ZScsIEBvbldpbmRvd1Jlc2l6ZWRcbiAgICBAb25XaW5kb3dSZXNpemVkKClcblxuICBnZXRNYXNrOiAtPiBAbWFza1xuXG4gIG9uV2luZG93UmVzaXplZDogPT5cbiAgICBtYXNrQ3NzID1cbiAgICAgIHdpZHRoOiBAbWFza1swXS5zdHlsZS53aWR0aFxuICAgICAgaGVpZ2h0OiBAbWFza1swXS5zdHlsZS5oZWlnaHRcblxuICAgIEBvdXRlclxuICAgIC5jc3NcbiAgICAgIHBvc2l0aW9uOiAnJ1xuICAgIEBtYXNrXG4gICAgLmNzc1xuICAgICAgcG9zaXRpb246ICcnXG4gICAgICBvdmVyZmxvdzogJydcbiAgICAgIHdpZHRoOiAnJ1xuICAgICAgaGVpZ2h0OiAnJ1xuICAgIEBpbm5lclxuICAgIC5jc3NcbiAgICAgIHBvc2l0aW9uOiAnJ1xuXG4gICAgc2l6ZUNzcyA9XG4gICAgICB3aWR0aDogQHdpZHRoKClcbiAgICAgIGhlaWdodDogQGhlaWdodCgpXG5cbiAgICBAb3V0ZXJcbiAgICAuY3NzIGFzc2lnbiBzaXplQ3NzLFxuICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZSdcbiAgICBAbWFza1xuICAgIC5jc3MgYXNzaWduIG1hc2tDc3MsXG4gICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJ1xuICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nXG4gICAgQGlubmVyXG4gICAgLmNzcyBhc3NpZ24gc2l6ZUNzcyxcbiAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnXG4iLCJWaWV3ID0gcmVxdWlyZSAnLi92aWV3J1xuXG5cbiMjI1xu44Om44O844K244Kk44OZ44Oz44OI44Gu5Lyd5pKt44KS5YGc5q2i44GZ44KLVmlld+OBp+OBmeOAglxuIyMjXG5tb2R1bGUuZXhwb3J0cyA9XG5jbGFzcyBQcmV2ZW50YWJsZSBleHRlbmRzIFZpZXdcblxuICAjIyNcbiAgQHByaXZhdGVcbiAgQHByb3BlcnR5IFN0cmluZyDlgZzmraLlr77osaHjga7jgqTjg5njg7Pjg4jjgafjgZnjgIJcbiAgIyMjXG4gIGV2ZW50czogJ1xuICAgIGJsdXIgZm9jdXMgZm9jdXNpbiBmb2N1c291dCBsb2FkIHJlc2l6ZSBzY3JvbGwgdW5sb2FkIGNsaWNrIGRibGNsaWNrXG4gICAgbW91c2Vkb3duIG1vdXNldXAgbW91c2Vtb3ZlIG1vdXNlb3ZlciBtb3VzZW91dCBtb3VzZWVudGVyIG1vdXNlbGVhdmVcbiAgICBjaGFuZ2Ugc2VsZWN0IHN1Ym1pdCBrZXlkb3duIGtleXByZXNzIGtleXVwIGVycm9yXG4gICAgJ1xuXG4gICMjI1xuICDjgqTjg7Pjgrnjgr/jg7PjgrnjgpLnlJ/miJDjgZfjgb7jgZnjgIJcbiAgIyMjXG4gIGNvbnN0cnVjdG9yOiAtPlxuICAgIHN1cGVyXG5cbiAgICBAZW5hYmxlZCA9IHRydWVcbiAgICBAb24gQGV2ZW50cywgQG9uTW91c2VcblxuICAjIyNcbiAgQHByaXZhdGVcbiAg44Kk44OZ44Oz44OI55m655Sf5pmC44GrYGVuYWJsZWRg44GMYGZhbHNlYOOBquOCieOCpOODmeODs+ODiOOBq+mWouOBmeOCi+WFqOOBpuOBruWLleS9nOOCkuWBnOatouOBl+OBvuOBmeOAglxuXG4gIDEuIOODh+ODleOCqeODq+ODiOWLleS9nOOCkuWBnOatouOBl+OBvuOBmeOAglxuICAyLiDjgqTjg5njg7Pjg4jjga7kvJ3mkq3jgpLlgZzmraLjgZfjgb7jgZnjgIJcbiAgMy4g44GT44Gu44Kk44Oz44K544K/44Oz44K544Gu44Kz44Oz44K544OI44Op44Kv44K/5Lul6ZmN44Gr55m76Yyy44GV44KM44Gf44Kk44OZ44Oz44OI44Gu44Kz44O844Or44OQ44OD44Kv44KS44Kz44O844Or44GX44G+44Gb44KT44CCXG4gICMjI1xuICBvbk1vdXNlOiAoZSkgPT5cbiAgICB1bmxlc3MgQGVuYWJsZWRcbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKVxuIiwiVmlldyA9IHJlcXVpcmUgJy4vdmlldydcbiQgPSByZXF1aXJlICdqcXVlcnknXG5cblxuIyMjXG5gPGlucHV0IHR5cGU9XCJyYWRpb1wiPmDjgpLjgrnjgr/jgqTjg6rjg7PjgrDjgZnjgovjgZ/jgoHjga7jg6njg4Pjg5HjgafjgZnjgIJcbuODqeOCuOOCquODnOOCv+ODs+OBrueKtuaFi+OCkuOCr+ODqeOCueOBqOOBl+OBpuimgee0oOOBq+S7mOS4juOBmeOCi+OBk+OBqOOBp0NTU+OBq+eKtuaFi+OCkuS8nemBlOOBl+OBvuOBmeOAglxuXG7jg6njgrjjgqrjg5zjgr/jg7PjgYzlhYPjgIXjgoLjgaPjgabjgYTjgovkuIvoqJjjga7mqZ/og73jgpLjgrXjg53jg7zjg4jjgZfjgb7jgZnjgIJcbi0gYHNlbGVjdGVkYOWxnuaAp+OBjOS7mOOBhOOBpuOBhOOCi+WgtOWQiOOBr+WIneacn+WMluaZguOBq+mBuOaKnuOBleOCjOOBpuOBhOOCi+OCr+ODqeOCueOCkuS7mOS4juOBl+OBvuOBmeOAglxuLSBgbmFtZWDlsZ7mgKfjgavjgojjgovjgrDjg6vjg7zjg5Tjg7PjgrDjgYzmnInlirnjgafjgZnjgIJcbuOCsOODq+ODvOODl+OBruS4reOBrjHjgaTjgYzjg6bjg7zjgrbjgavjgojjgorpgbjmip7jgZXjgozjgovjgajml6Ljgavpgbjmip7jgZXjgozjgabjgYTjgZ/jg6njgrjjgqrjg5zjgr/jg7Pjga/pgbjmip7nirbmhYvjgafjga/jgarjgY/jgarjgorjgb7jgZnjgIJcblxuQGV4YW1wbGUg44Op44K444Kq44Oc44K/44Oz44Gu44Oe44O844Kv44Ki44OD44OXXG4gICAgPHNwYW4gY2xhc3M9XCJyYWRpb1wiPlxuICAgICAgPGlucHV0IHR5cGU9XCJyYWRpb1wiPlxuICAgIDwvc3Bhbj5cbiMjI1xubW9kdWxlLmV4cG9ydHMgPVxuY2xhc3MgUmFkaW8gZXh0ZW5kcyBWaWV3XG5cbiAgIyMjXG4gIEBwcm9wZXJ0eSBTdHJpbmcg44Op44K444Kq44Oc44K/44Oz44GMYGNoZWNrZWRg44Gr44Gq44Gj44Gf6Zqb44Gr6KaB57Sg44Gr5LuY5LiO44GV44KM44KL44Kv44Op44K55ZCN44Gn44GZ44CCXG4gICMjI1xuICBjaGVja2VkOiAnaXMtY2hlY2tlZCdcblxuICAjIyNcbiAg44Kk44Oz44K544K/44Oz44K544KS55Sf5oiQ44GX44G+44GZ44CCXG4gICMjI1xuICBjb25zdHJ1Y3RvcjogLT5cbiAgICBzdXBlclxuICAgIEAkcmFkaW8gPSBAJCAnaW5wdXRbdHlwZT1yYWRpb10nXG4gICAgLm9uICdjaGFuZ2UgcmFkaW8uY2hhbmdlJywgQHVwZGF0ZVxuICAgIGlmIChuYW1lID0gQCRyYWRpby5hdHRyICduYW1lJykgaXNudCAnJ1xuICAgICAgQCRvdGhlclJhZGlvcyA9ICQgXCJpbnB1dFt0eXBlPXJhZGlvXVtuYW1lPSN7bmFtZX1dXCJcbiAgICAgIC5ub3QgQCRyYWRpb1xuICAgIEB1cGRhdGUoKVxuXG4gICMjI1xuICBAcHJpdmF0ZVxuICDjg6njgrjjgqrjg5zjgr/jg7Pjga7nirbmhYvjgavjgojjgorjgq/jg6njgrnjgpLku5jkuI7jg7vpmaTljrvjgZfjgb7jgZnjgIJcbiAgIyMjXG4gIHVwZGF0ZTogPT5cbiAgICBpZiBAJHJhZGlvLnByb3AgJ2NoZWNrZWQnXG4gICAgICBAYWRkQ2xhc3MgQGNoZWNrZWRcbiAgICAgIEAkb3RoZXJSYWRpb3M/LnRyaWdnZXIgJ3JhZGlvLmNoYW5nZSdcbiAgICBlbHNlXG4gICAgICBAcmVtb3ZlQ2xhc3MgQGNoZWNrZWRcbiIsIiMjI1xuU2VsZWN0IGlzIGEgd3JhcHBlciBvZiA8aW5wdXQgdHlwZT1cInJhZGlvXCI+LlxuIyMjXG5cblZpZXcgPSByZXF1aXJlICcuL3ZpZXcnXG5cbm1vZHVsZS5leHBvcnRzID1cbmNsYXNzIFNlbGVjdCBleHRlbmRzIFZpZXdcblxuICBsYWJlbDogJy5qcy1sYWJlbCdcblxuICAjIyNcbiAgQ3JlYXRlcyBhIFNlbGVjdCBpbnN0YW5jZS5cbiAgIyMjXG4gIGNvbnN0cnVjdG9yOiAtPlxuICAgIHN1cGVyXG4gICAgQCRsYWJlbCA9IEAkIEBsYWJlbFxuICAgIEAkc2VsZWN0ID0gQCQgJ3NlbGVjdCdcbiAgICAub24gJ2NoYW5nZScsIEB1cGRhdGVcbiAgICBAdXBkYXRlKClcblxuICAjIyNcbiAgUmVmbGVjdHMgc2VsZWN0ZWQgdGV4dCBvZiB0aGUgcmF3IGVsZW1lbnQgdG8gdGhlIGxhYmVsIGVsZW1lbnQuXG4gICMjI1xuICB1cGRhdGU6ID0+XG4gICAgQCRsYWJlbC50ZXh0IEAkc2VsZWN0LmZpbmQoJ29wdGlvbjpzZWxlY3RlZCcpLnRleHQoKVxuIiwiIyMjXG5TZWxlY3RhYmxlIGNsYXNzLlxuIyMjXG5cblZpZXcgPSByZXF1aXJlICcuL3ZpZXcnXG5cblxubW9kdWxlLmV4cG9ydHMgPVxuY2xhc3MgU2VsZWN0YWJsZSBleHRlbmRzIFZpZXdcblxuICBjb25zdHJ1Y3RvcjogLT5cbiAgICBzdXBlclxuICAgIEBzZWxlY3RlZXMgPSBAY2hpbGRyZW4oKVxuICAgIC5vbiAnY2xpY2snLCBAdG9nZ2xlXG5cbiAgdG9nZ2xlOiAoZSkgPT5cbiAgICBzZWxlY3RlZEluZGV4ID0gQHNlbGVjdGVlcy5pbmRleCBlLmN1cnJlbnRUYXJnZXRcbiAgICBAc2VsZWN0QXQgc2VsZWN0ZWRJbmRleFxuICAgIEB0cmlnZ2VyICdzZWxlY3RhYmxlLmNoYW5nZWQnLCBzZWxlY3RlZEluZGV4XG5cbiAgc2VsZWN0QXQ6IChzZWxlY3RlZEluZGV4KSAtPlxuICAgIEBzZWxlY3RlZXNcbiAgICAucmVtb3ZlQ2xhc3MgJ2lzLXNlbGVjdGVkJ1xuICAgIC5lcSBzZWxlY3RlZEluZGV4XG4gICAgLmFkZENsYXNzICdpcy1zZWxlY3RlZCdcbiIsIiQgPSByZXF1aXJlICdqcXVlcnknXG5WaWV3ID0gcmVxdWlyZSAnLi92aWV3J1xuaW90YSA9IHJlcXVpcmUoJy4uL21vZGVscy9pb3RhJykoKVxuXG5oYXNBbHBoYSA9ICh7IGRhdGEgfSkgLT5cbiAgZm9yIHt9LCBpIGluIGRhdGEgYnkgNFxuICAgIGlmIGRhdGFbaSArIDNdIGlzbnQgMFxuICAgICAgcmV0dXJuIHRydWVcbiAgZmFsc2VcblxubW9kdWxlLmV4cG9ydHMgPVxuY2xhc3MgU2xpY2VyIGV4dGVuZHMgVmlld1xuXG4gIEBYOiAxIDw8IGlvdGEoKVxuICBAWTogMSA8PCBpb3RhKClcblxuICBAcmVwbGFjZTogKGltZywgZGlyZWN0aW9uID0gU2xpY2VyLlgsIGZpbHRlcikgLT5cbiAgICAkaW1nID0gJCBpbWdcbiAgICB3aWR0aCA9ICRpbWcud2lkdGgoKVxuICAgIGhlaWdodCA9ICRpbWcuaGVpZ2h0KClcbiAgICAkY2FudmFzID0gJCAnPGNhbnZhcz4nXG4gICAgLmF0dHJcbiAgICAgIHdpZHRoOiB3aWR0aFxuICAgICAgaGVpZ2h0OiBoZWlnaHRcbiAgICBjYW52YXMgPSAkY2FudmFzWzBdXG4gICAgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0ICcyZCdcbiAgICBjb250ZXh0LmRyYXdJbWFnZSAkaW1nWzBdLCAwLCAwXG5cbiAgICAkY29udGFpbmVyID0gJCAnPGRpdj4nXG4gICAgLmNzc1xuICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaydcbiAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnXG4gICAgICB3aWR0aDogd2lkdGhcbiAgICAgIGhlaWdodDogaGVpZ2h0XG5cbiAgICBzd2l0Y2ggZGlyZWN0aW9uXG4gICAgICB3aGVuIFNsaWNlci5YXG4gICAgICAgIHggPSAwXG4gICAgICAgIG1heFggPSB3aWR0aCAtIDFcbiAgICAgICAgaGFzQWxwaGFQcmV2ID0gZmFsc2VcbiAgICAgICAgd2hpbGUgeCA8PSBtYXhYXG4gICAgICAgICAgaGFzQWxwaGFDdXJyZW50ID0gaGFzQWxwaGEgY29udGV4dC5nZXRJbWFnZURhdGEgeCwgMCwgMSwgaGVpZ2h0XG4gICAgICAgICAgaWYgIWhhc0FscGhhUHJldiBhbmQgaGFzQWxwaGFDdXJyZW50XG4gICAgICAgICAgICBzdGFydFggPSB4XG4gICAgICAgICAgZWxzZSBpZiBoYXNBbHBoYVByZXYgYW5kICFoYXNBbHBoYUN1cnJlbnRcbiAgICAgICAgICAgIGltYWdlRGF0YSA9IGNvbnRleHQuZ2V0SW1hZ2VEYXRhIHN0YXJ0WCwgMCwgeCAtIHN0YXJ0WCwgaGVpZ2h0XG4gICAgICAgICAgICBpZiBmaWx0ZXI/XG4gICAgICAgICAgICAgIGltYWdlRGF0YSA9IGZpbHRlciBpbWFnZURhdGFcbiAgICAgICAgICAgIGNoYXIgPSBuZXcgU2xpY2VyIGltYWdlRGF0YSwgc3RhcnRYLCAwXG4gICAgICAgICAgICAkY29udGFpbmVyLmFwcGVuZCBjaGFyLiRjYW52YXNcbiAgICAgICAgICBlbHNlIGlmIHggaXMgbWF4WCBhbmQgaGFzQWxwaGFDdXJyZW50XG4gICAgICAgICAgICBpbWFnZURhdGEgPSBjb250ZXh0LmdldEltYWdlRGF0YSBzdGFydFgsIDAsIHdpZHRoIC0gc3RhcnRYLCBoZWlnaHRcbiAgICAgICAgICAgIGlmIGZpbHRlcj9cbiAgICAgICAgICAgICAgaW1hZ2VEYXRhID0gZmlsdGVyIGltYWdlRGF0YVxuICAgICAgICAgICAgY2hhciA9IG5ldyBTbGljZXIgaW1hZ2VEYXRhLCBzdGFydFgsIDBcbiAgICAgICAgICAgICRjb250YWluZXIuYXBwZW5kIGNoYXIuJGNhbnZhc1xuICAgICAgICAgIGhhc0FscGhhUHJldiA9IGhhc0FscGhhQ3VycmVudFxuICAgICAgICAgIHgrK1xuICAgICAgd2hlbiBTbGljZXIuWVxuICAgICAgICB5ID0gMFxuICAgICAgICBtYXhZID0gaGVpZ2h0IC0gMVxuICAgICAgICBoYXNBbHBoYVByZXYgPSBmYWxzZVxuICAgICAgICB3aGlsZSB5IDw9IG1heFlcbiAgICAgICAgICBoYXNBbHBoYUN1cnJlbnQgPSBoYXNBbHBoYSBjb250ZXh0LmdldEltYWdlRGF0YSAwLCB5LCB3aWR0aCwgMVxuICAgICAgICAgIGlmICFoYXNBbHBoYVByZXYgYW5kIGhhc0FscGhhQ3VycmVudFxuICAgICAgICAgICAgc3RhcnRZID0geVxuICAgICAgICAgIGVsc2UgaWYgaGFzQWxwaGFQcmV2IGFuZCAhaGFzQWxwaGFDdXJyZW50XG4gICAgICAgICAgICBpbWFnZURhdGEgPSBwcmV2ID0gY29udGV4dC5nZXRJbWFnZURhdGEgMCwgc3RhcnRZLCB3aWR0aCwgeSAtIHN0YXJ0WVxuICAgICAgICAgICAgaWYgZmlsdGVyP1xuICAgICAgICAgICAgICBpbWFnZURhdGEgPSBmaWx0ZXIgaW1hZ2VEYXRhXG4gICAgICAgICAgICBjaGFyID0gbmV3IFNsaWNlciBpbWFnZURhdGEsIDAsIHN0YXJ0WVxuICAgICAgICAgICAgJGNvbnRhaW5lci5hcHBlbmQgY2hhci4kY2FudmFzXG4gICAgICAgICAgZWxzZSBpZiB5IGlzIG1heFkgYW5kIGhhc0FscGhhQ3VycmVudFxuICAgICAgICAgICAgaW1hZ2VEYXRhID0gcHJldiA9IGNvbnRleHQuZ2V0SW1hZ2VEYXRhIDAsIHN0YXJ0WSwgd2lkdGgsIGhlaWdodCAtIHN0YXJ0WVxuICAgICAgICAgICAgaWYgZmlsdGVyP1xuICAgICAgICAgICAgICBpbWFnZURhdGEgPSBmaWx0ZXIgaW1hZ2VEYXRhXG4gICAgICAgICAgICBjaGFyID0gbmV3IFNsaWNlciBpbWFnZURhdGEsIDAsIHN0YXJ0WVxuICAgICAgICAgICAgJGNvbnRhaW5lci5hcHBlbmQgY2hhci4kY2FudmFzXG4gICAgICAgICAgaGFzQWxwaGFQcmV2ID0gaGFzQWxwaGFDdXJyZW50XG4gICAgICAgICAgeSsrXG4gICAgICBlbHNlXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IgXCJkaXJlY3Rpb24gbXVzdCBiZSBzcGVjaWZpZWQgd2l0aCBgU2xpY2VyLlhgIG9yIGBTbGljZXIuWWBcIlxuXG4gICAgJGltZy5yZXBsYWNlV2l0aCAkY29udGFpbmVyXG4gICAgJGNvbnRhaW5lclxuXG4gIGNvbnN0cnVjdG9yOiAoaW1hZ2VEYXRhLCBsZWZ0LCB0b3ApIC0+XG4gICAgc3VwZXJcblxuICAgIEAkY2FudmFzID0gJCAnPGNhbnZhcz4nXG4gICAgLmF0dHJcbiAgICAgIHdpZHRoOiBpbWFnZURhdGEud2lkdGhcbiAgICAgIGhlaWdodDogaW1hZ2VEYXRhLmhlaWdodFxuICAgIGNvbnRleHQgPSBAJGNhbnZhc1swXS5nZXRDb250ZXh0ICcyZCdcbiAgICBjb250ZXh0LnB1dEltYWdlRGF0YSBpbWFnZURhdGEsIDAsIDBcbiAgICBAJGNhbnZhc1xuICAgIC5jc3NcbiAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnXG4gICAgICBsZWZ0OiBsZWZ0XG4gICAgICB0b3A6IHRvcFxuIiwiJCA9IHJlcXVpcmUgJ2pxdWVyeSdcbnJlcXVpcmUoJy4uL21vZGVscy9iYWNrZ3JvdW5zLXBvc2l0aW9uJykuanF1ZXJpemUgJFxuVmlldyA9IHJlcXVpcmUgJy4vdmlldydcbmlvdGEgPSByZXF1aXJlKCcuLi9tb2RlbHMvaW90YScpKClcbnsgRGVmZXJyZWQgfSA9IHJlcXVpcmUgJ2pxdWVyeSdcblxuXG4jIyNcbuOCueODl+ODqeOCpOODiOOCouODi+ODoeODvOOCt+ODp+ODs+OCkueuoeeQhuOBmeOCi+OCr+ODqeOCueOBp+OBmeOAglxuXG5AZXhhbXBsZSDlkIzjgZhWaWV344Gr5a++44GX44Gm5YuV44GN5q+O44Gr5Yil44GuU3ByaXRl44KS5L2c44KK44G+44GZ44CCXG4gICAgcnVuID0gbmV3IFNwcml0ZSAnLmZvbydcbiAgICBydW4uc2V0UmFuZ2UgMCwgMTBcbiAgICB3YWxrID0gbmV3IFNwcml0ZSAnLmZvbydcbiAgICB3YWxrLnNldFJhbmdlIDExLCAyMFxuICAgIHJ1bi5wbGF5KClcbiAgICBydW4ub24gU3ByaXRlLkVWRU5UX0xBU1RfRlJBTUUsIC0+XG4gICAgICB3YWxrLnBsYXkoKVxuIyMjXG5tb2R1bGUuZXhwb3J0cyA9XG5jbGFzcyBTcHJpdGUgZXh0ZW5kcyBWaWV3XG5cbiAgIyMjXG4gIOOCueODl+ODqeOCpOODiOeUu+WDj+OBjOS4puOBs+OBjHjmlrnlkJHjgafjgYLjgovjgZPjgajjgpLooajjgZnjg5Xjg6njgrDjgafjgZnjgIJcbiAgIyMjXG4gIEBYOiAxIDw8IGlvdGEoKVxuXG4gICMjI1xuICDjgrnjg5fjg6njgqTjg4jnlLvlg4/jgYzkuKbjgbPjgYx55pa55ZCR44Gn44GC44KL44GT44Go44KS6KGo44GZ44OV44Op44Kw44Gn44GZ44CCXG4gICMjI1xuICBAWTogMSA8PCBpb3RhKClcblxuICAjIyNcbiAg5pyA57WC44OV44Os44O844Og44Gu57WC5LqG5pmC44Gr55m654Gr44GZ44KL44Kk44OZ44Oz44OI44Gn44GZ44CCXG4gICMjI1xuICBARVZFTlRfTEFTVF9GUkFNRTogJ3Nwcml0ZS5sYXN0RnJhbWUnXG5cbiAgIyMjXG4gIOaMh+WumuOBruODquODlOODvOODiOWbnuaVsOOBjOWujOS6huOBl+OBn+aZguOBq+eZuueBq+OBmeOCi+OCpOODmeODs+ODiOOBp+OBmeOAglxuICDmsLjkuYXjgavjg6rjg5Tjg7zjg4jjgZnjgovloLTlkIjjga/nmbrngavjgZfjgb7jgZvjgpPjgIJcbiAgIyMjXG4gIEBFVkVOVF9DT01QTEVURV9SRVBFQVQ6ICdzcHJpdGUuY29tcGxldGVSZXBlYXQnXG5cbiAgIyMjXG4gIOOCueODl+ODqeOCpOODiOOCpOODs+OCueOCv+ODs+OCueOCkueUn+aIkOOBl+OBvuOBmeOAglxuXG4gIEBwYXJhbSBbU3RyaW5nLCBIVE1MRWxlbWVudCwgalF1ZXJ5T2JqZWN0LCBWaWV3XSBzZWxlY3RvciDjgrPjg7Pjg4jjg63jg7zjg6vjga7lr77osaHjga7opoHntKDjgafjgZlcbiAgQHBhcmFtIFtJbnRlZ2VyXSBmcHMgMeenkuW9k+OBn+OCiuOBruODleODrOODvOODoOaVsOOBp+OBmeOAglxuICBAcGFyYW0gW0ludGVnZXJdIGRpcmVjdGlvbiDog4zmma/nlLvlg4/jgYzkuKbjgpPjgafjgYTjgovmlrnlkJHjgafjgZnjgIJcbiAgIyMjXG4gIGNvbnN0cnVjdG9yOiAoe30sIEBmcHMgPSAzMCwgQGRpcmVjdGlvbiA9IFNwcml0ZS5ZKSAtPlxuICAgIHN1cGVyXG4gICAgaWYgQGRpcmVjdGlvbiBpcyBAY29uc3RydWN0b3IuWFxuICAgICAgQHByb3AgPSAnYmFja2dyb3VuZFBvc2l0aW9uWCdcbiAgICAgIEBzaXplID0gQHdpZHRoKClcbiAgICBlbHNlXG4gICAgICBAcHJvcCA9ICdiYWNrZ3JvdW5kUG9zaXRpb25ZJ1xuICAgICAgQHNpemUgPSBAaGVpZ2h0KClcbiAgICBAY3VycmVudEZyYW1lID0gMFxuICAgIEBzZXRSYW5nZSAwLCAwXG5cbiAgIyMjXG4gIOOBk+OBruOCueODl+ODqeOCpOODiOOBjOODleODrOODvOODoOOBqOOBl+OBpuihqOekuuOBmeOCi+iDjOaZr+OBruS9jee9ruOCpOODs+ODh+ODg+OCr+OCueOBruevhOWbsuOCkuioreWumuOBl+OBvuOBmeOAglxuXG4gIEBwYXJhbSBbSW50ZWdlcl0gZnJvbSDplovlp4vjg5Xjg6zjg7zjg6Djga7kvY3nva7jgqTjg7Pjg4fjg4Pjgq/jgrnjgafjgZnjgIJcbiAgQHBhcmFtIFtJbnRlZ2VyXSB0byDmnIDntYLjg5Xjg6zjg7zjg6Djga7kvY3nva7jgqTjg7Pjg4fjg4Pjgq/jgrnjgafjgZnjgIJcbiAgIyMjXG4gIHNldFJhbmdlOiAoZnJvbSwgdG8pIC0+XG4gICAgQHNldFBvc2l0aW9ucyBbZnJvbS4udG9dXG5cbiAgIyMjXG4gIOOBk+OBruOCueODl+ODqeOCpOODiOOBjOODleODrOODvOODoOOBqOOBl+OBpuihqOekuuOBmeOCi+iDjOaZr+OBruS9jee9ruOCpOODs+ODh+ODg+OCr+OCueOBrumFjeWIl+OCkuioreWumuOBl+OBvuOBmeOAglxuXG4gIEBwYXJhbSBbQXJyYXk8SW50ZWdlcj5dIHBvc2l0aW9ucyDkvY3nva7jgqTjg7Pjg4fjg4Pjgq/jgrnjga7phY3liJfjgafjgZnjgIJcbiAgIyMjXG4gIHNldFBvc2l0aW9uczogKEBwb3NpdGlvbnMpIC0+XG4gICAgQGxhc3RGcmFtZSA9IEBwb3NpdGlvbnMubGVuZ3RoIC0gMVxuXG4gICMjI1xuICDmjIflrprjgZXjgozjgZ/jg5Xjg6zjg7zjg6DjgYvjgonlho3nlJ/jgZfjgb7jgZnjgIJcblxuICBAcGFyYW0gW0ludGVnZXJdIGZyYW1lIOWGjeeUn+OCkumWi+Wni+OBmeOCi+ODleODrOODvOODoOOBp+OBmeOAglxuICBAcGFyYW0gW0ludGVnZXJdIHJlcGVhdCDlho3nlJ/lm57mlbDjgafjgZnjgIJcbiAgIyMjXG4gIGdvdG9BbmRQbGF5OiAoZnJhbWUgPSAwLCByZXBlYXQgPSAxKSAtPlxuICAgIEBjdXJyZW50RnJhbWUgPSBAbGltaXRGcmFtZSBmcmFtZVxuICAgIEBwbGF5IHJlcGVhdFxuXG4gICMjI1xuICDmjIflrprjgZXjgozjgZ/jg5Xjg6zjg7zjg6DjgaflgZzmraLjgZfjgb7jgZnjgIJcblxuICBAcGFyYW0gW0ludGVnZXJdIGZyYW1lIOihqOekuuOBmeOCi+ODleODrOODvOODoOOBp+OBmeOAglxuICAjIyNcbiAgZ290b0FuZFBhdXNlOiAoZnJhbWUgPSAwKSAtPlxuICAgIEBjdXJyZW50RnJhbWUgPSBAbGltaXRGcmFtZSBmcmFtZVxuICAgIEB1cGRhdGVWaWV3KClcbiAgICBAc3RvcCgpXG5cbiAgIyMjXG4gIOasoeOBruODleODrOODvOODoOOBq+enu+WLleOBl+OBvuOBmeOAglxuICAjIyNcbiAgbmV4dEZyYW1lOiAtPlxuICAgIEBjdXJyZW50RnJhbWUgPSBAdmVyaWZ5RnJhbWUgQGN1cnJlbnRGcmFtZSArIDFcbiAgICBAdXBkYXRlVmlldygpXG5cbiAgIyMjXG4gIOWJjeOBruODleODrOODvOODoOOBq+enu+WLleOBl+OBvuOBmeOAglxuICAjIyNcbiAgcHJldkZyYW1lOiAtPlxuICAgIEBjdXJyZW50RnJhbWUgPSBAdmVyaWZ5RnJhbWUgQGN1cnJlbnRGcmFtZSAtIDFcbiAgICBAdXBkYXRlVmlldygpXG5cbiAgIyMjXG4gIOWGjeeUn+OBl+OBvuOBmeOAglxuXG4gIEBwYXJhbSBbSW50ZWdlcl0gcmVwZWF0IOWGjeeUn+WbnuaVsOOBp+OBmeOAglxuICAjIyNcbiAgcGxheTogKEByZXBlYXQgPSAxKSAtPlxuICAgIEBjdXJyZW50UmVwZWF0Q291bnQgPSAwXG4gICAgQHVwZGF0ZVZpZXcoKVxuICAgIEBzdGFydFRpY2soKVxuXG4gICMjI1xuICDlgZzmraLjgZfjgb7jgZnjgIJcbiAgIyMjXG4gIHBhdXNlOiAtPlxuICAgIEBzdG9wVGljaygpXG5cbiAgIyMjXG4gIEBwcml2YXRlXG4gICMjI1xuICBsaW1pdEZyYW1lOiAoZnJhbWUpIC0+XG4gICAgaWYgZnJhbWUgPCAwXG4gICAgICBmcmFtZSA9IDBcbiAgICBpZiBmcmFtZSA+IEBsYXN0RnJhbWVcbiAgICAgIGZyYW1lID0gQGxhc3RGcmFtZVxuICAgIGZyYW1lXG5cbiAgIyMjXG4gIEBwcml2YXRlXG4gICMjI1xuICB2ZXJpZnlGcmFtZTogKGZyYW1lKSAtPlxuICAgIGlmIGZyYW1lIDwgMFxuICAgICAgZnJhbWUgPSBAbGFzdEZyYW1lXG4gICAgaWYgZnJhbWUgPiBAbGFzdEZyYW1lXG4gICAgICBmcmFtZSA9IDBcbiAgICBmcmFtZVxuXG4gICMjI1xuICBAcHJpdmF0ZVxuICAjIyNcbiAgdXBkYXRlVmlldzogLT5cbiAgICBwb3MgPSBAcG9zaXRpb25zW0BjdXJyZW50RnJhbWVdXG4gICAgY3NzID0ge31cbiAgICBjc3NbQHByb3BdID0gLUBzaXplICogcG9zXG4gICAgQGNzcyBjc3NcblxuICAjIyNcbiAgQHByaXZhdGVcbiAgIyMjXG4gIHN0YXJ0VGljazogLT5cbiAgICBAc3RvcFRpY2soKVxuICAgIEBkYXRhICdzcHJpdGVJbnRlcnZhbElkJywgc2V0SW50ZXJ2YWwgQHRpY2ssIDEwMDAgLyBAZnBzXG5cbiAgIyMjXG4gIEBwcml2YXRlXG4gICMjI1xuICBzdG9wVGljazogLT5cbiAgICBjbGVhckludGVydmFsIEBkYXRhICdzcHJpdGVJbnRlcnZhbElkJ1xuXG4gICMjI1xuICBAcHJpdmF0ZVxuICAjIyNcbiAgdGljazogPT5cbiAgICBmcmFtZSA9IEBjdXJyZW50RnJhbWUgKyAxXG4gICAgaWYgKGlzTGFzdEZyYW1lID0gZnJhbWUgPiBAbGFzdEZyYW1lKVxuICAgICAgaWYgQHJlcGVhdCA+IDAgYW5kICsrQGN1cnJlbnRSZXBlYXRDb3VudCA+PSBAcmVwZWF0XG4gICAgICAgIEBzdG9wVGljaygpXG4gICAgICAgIEB0cmlnZ2VyIEBjb25zdHJ1Y3Rvci5FVkVOVF9MQVNUX0ZSQU1FXG4gICAgICAgIEB0cmlnZ2VyIEBjb25zdHJ1Y3Rvci5FVkVOVF9DT01QTEVURV9SRVBFQVRcbiAgICAgICAgcmV0dXJuXG4gICAgICBmcmFtZSA9IEB2ZXJpZnlGcmFtZSBmcmFtZVxuICAgIEBjdXJyZW50RnJhbWUgPSBmcmFtZVxuICAgIEB1cGRhdGVWaWV3KClcbiAgICBpZiBpc0xhc3RGcmFtZVxuICAgICAgQHRyaWdnZXIgQGNvbnN0cnVjdG9yLkVWRU5UX0xBU1RfRlJBTUVcbiIsIiMjI1xuVGFiIGNsYXNzLlxuIyMjXG5cblZpZXcgPSByZXF1aXJlICcuL3ZpZXcnXG5cbm1vZHVsZS5leHBvcnRzID1cbmNsYXNzIFRhYiBleHRlbmRzIFZpZXdcblxuICBzZWxlY3RvckJ1dHRvbnM6ICcuanMtYnV0dG9uJ1xuICBzZWxlY3RvckNvbnRlbnRzOiAnLmpzLWNvbnRlbnQnXG5cbiAgY29uc3RydWN0b3I6IC0+XG4gICAgc3VwZXJcbiAgICBAJCBAc2VsZWN0b3JCdXR0b25zXG4gICAgLm9uICdzZWxlY3RhYmxlLmNoYW5nZWQnLCBAdG9nZ2xlXG4gICAgQCRjb250ZW50cyA9IEAkIEBzZWxlY3RvckNvbnRlbnRzXG5cbiAgdG9nZ2xlOiAoe30sIGluZGV4KSA9PlxuICAgIEAkY29udGVudHMuZGF0YSgndmlldycpLnNlbGVjdEF0IGluZGV4XG4iLCJWaWV3ID0gcmVxdWlyZSAnLi92aWV3J1xuXG4jIyNcbuihjOaVsOOCquODl+OCt+ODp+ODs+OCkuS7mOS4juOBl+OBn0NTUzPjga50ZXh0LW92ZXJmbG9344Ko44Of44Ol44Os44O844K344On44Oz44Gn44GZ44CCXG4jIyNcbm1vZHVsZS5leHBvcnRzID1cbmNsYXNzIFRleHRPdmVyZmxvdyBleHRlbmRzIFZpZXdcblxuICBbaW5zdGFuY2VzXSA9IFtdXG5cbiAgQHJlZ2lzdGVyOiAodGV4dE92ZXJmbG93KSAtPlxuICAgIHVubGVzcyBpbnN0YW5jZXM/XG4gICAgICBpbnN0YW5jZXMgPSBbXVxuICAgICAgQCR3aW5kb3cub24gJ3Jlc2l6ZScsIEBvbldpbmRvd1Jlc2l6ZWRcbiAgICBpbnN0YW5jZXMucHVzaCB0ZXh0T3ZlcmZsb3dcblxuICBAdW5yZWdpc3RlcjogKHRleHRPdmVyZmxvdykgLT5cbiAgICByZXR1cm4gdW5sZXNzIEBpbnN0YW5jZXNcbiAgICBAaW5zdGFuY2VzLnNwbGljZSBpbnN0YW5jZXMuaW5kZXhPZih0ZXh0T3ZlcmZsb3cpLCAxXG4gICAgaWYgaW5zdGFuY2VzLmxlbmd0aCBpcyAwXG4gICAgICBpbnN0YW5jZXMgPSBudWxsXG4gICAgICBAJHdpbmRvdy5vZmYgJ3Jlc2l6ZScsIEBvbldpbmRvd1Jlc2l6ZWRcblxuICBAb25XaW5kb3dSZXNpemVkOiAtPlxuICAgIGZvciBpbnN0YW5jZSBpbiBpbnN0YW5jZXNcbiAgICAgIGluc3RhbmNlLnVwZGF0ZSgpXG5cbiAgY29uc3RydWN0b3I6ICh7fSwgQHJvd3MsIEByZXBsYWNlciA9ICcuLi4nKSAtPlxuICAgIHN1cGVyXG4gICAgQGRlZmF1bHRUZXh0ID0gQHRleHQoKVxuICAgIEBjb25zdHJ1Y3Rvci5yZWdpc3RlciBAXG4gICAgQHVwZGF0ZSgpXG5cbiAgcmVtb3ZlOiAtPlxuICAgIEBjb25zdHJ1Y3Rvci51bnJlZ2lzdGVyIEBcbiAgICBzdXBlclxuXG4gIHVwZGF0ZTogLT5cbiAgICBpID0gMFxuICAgIGxlbiA9IEBkZWZhdWx0VGV4dC5sZW5ndGhcbiAgICByb3dzID0gMFxuXG4gICAgIyDmloflrZfmlbDjgpIx5paH5a2X44GL44KJ5aKX44KE44GX44Gq44GM44KJ6KaB57Sg44Gu6auY44GV44KS5Y+W5b6X44GX44G+44GZ44CCXG4gICAgIyDpq5jjgZXjgYzlopfjgYjjgovjgajooYzmlbDjgqvjgqbjg7Pjgr/jgpLjgqTjg7Pjgq/jg6rjg6Hjg7Pjg4jjgZfjgb7jgZnjgIJcbiAgICAjIOihjOaVsOOCq+OCpuODs+OCv+OBjOaMh+WumuihjOaVsOOCkui2heOBiOOCi+OBvuOBp+ippuihjOOBl+OBvuOBmeOAglxuICAgIHdoaWxlICsraSA8IGxlbiAmJiByb3dzIDw9IEByb3dzXG4gICAgICBAdGV4dCBAZGVmYXVsdFRleHQuc3Vic3RyIDAsIGlcbiAgICAgIGggPSBAaGVpZ2h0KClcbiAgICAgIGlmICFoZWlnaHQ/IG9yIGggPiBoZWlnaHRcbiAgICAgICAgaGVpZ2h0ID0gaFxuICAgICAgICByb3dzKytcblxuICAgICMg5pyr5bC+44Gr5Luj5pu/5paH5a2X44KS5LuY44GR5paH5a2X5pWw44KS5rib44KJ44GX44Gq44GM44KJ6KaB57Sg44Gu6auY44GV44KS5Y+W5b6X44GX44G+44GZ44CCXG4gICAgIyDpq5jjgZXjgYzmuJvjgovjgajooYzmlbDjgqvjgqbjg7Pjgr/jgpLjg4fjgq/jg6rjg6Hjg7Pjg4jjgZfjgb7jgZnjgIJcbiAgICAjIOihjOaVsOOCq+OCpuODs+OCv+OBjOaMh+WumuihjOS7peS4i+OBq+OBquOCi+OBvuOBp+ippuihjOOBl+OBvuOBmeOAglxuICAgIHdoaWxlIC0taSA+PSAwICYmIHJvd3MgPiBAcm93c1xuICAgICAgQHRleHQgQGRlZmF1bHRUZXh0LnN1YnN0cigwLCBpKSArIEByZXBsYWNlclxuICAgICAgaCA9IEBoZWlnaHQoKVxuICAgICAgaWYgIWhlaWdodD8gb3IgaCA8IGhlaWdodFxuICAgICAgICBoZWlnaHQgPSBoXG4gICAgICAgIHJvd3MtLVxuIiwiIyMjIVxuVGhlIGNvZGUgb2YgYFZpZXcjcHVzaFN0YWNrKClgIGFuZCBgVmlldyNlbmQoKWAgYXJlIGJvcnJvd2VkIGZyb20gc3BhY2UtcGVuLlxuQHNlZSBodHRwczovL2dpdGh1Yi5jb20vYXRvbS9zcGFjZS1wZW4vYmxvYi9tYXN0ZXIvc3JjL3NwYWNlLXBlbi5jb2ZmZWVcbkBsaWNlbnNlIGh0dHBzOi8vZ2l0aHViLmNvbS9hdG9tL3NwYWNlLXBlbi9ibG9iL21hc3Rlci9MSUNFTlNFXG4jIyNcblxualF1ZXJ5ID0gcmVxdWlyZSAnanF1ZXJ5J1xueyB0ZW1wbGF0ZSB9ID0gcmVxdWlyZSAnbG9kYXNoJ1xuJHdpbmRvdyA9IGpRdWVyeSB3aW5kb3dcbiRkb2N1bWVudCA9IGpRdWVyeSB3aW5kb3cuZG9jdW1lbnRcblxuIyMjXG50cmlnZ2VyKCnjga7jgqjjgqTjg6rjgqLjgrnjgafjgZnjgIJcbiMjI1xualF1ZXJ5LmZuLmVtaXQgPSBqUXVlcnkuZm4udHJpZ2dlclxuXG4jIyNcbm9uZSgp44Gu44Ko44Kk44Oq44Ki44K544Gn44GZ44CCXG4jIyNcbmpRdWVyeS5mbi5vbmNlID0galF1ZXJ5LmZuLm9uZVxuXG4jIyNcblZpZXfjgq/jg6njgrnjga92aWV3LWNvbnRyb2xsZXLjga7ln7rlupXjgq/jg6njgrnjgafjgZnjgIJcbmpRdWVyeeOBruODqeODg+ODkeOBqOOBl+OBpuWLleS9nOOBl+OAgWpRdWVyeS5mbuOBq+Wun+ijheOBleOCjOOBpuOBhOOCi+ODoeOCveODg+ODieOCkuWnlOitsuOBl+OBpuOBhOOBvuOBmeOAglxu5aeU6K2y44GV44KM44Gf44Oh44K944OD44OJ44Gu5oi744KK5YCk44GvalF1ZXJ5LmZu44Gu5oi744KK44Gd44Gu44KC44Gu44Gn44CBXG5WaWV344Kk44Oz44K544K/44Oz44K544KS44Kz44Oz44OG44Kv44K544OI44Go44GX44Gm44Oh44K944OD44OJ44OB44Kn44O844Oz44KS6KGM44GG44GT44Go44Gv44Gn44GN44G+44Gb44KT44CCXG5AZGVwZW5kc09uIGpxdWVyeVxuQGRlcGVuZHNPbiBsb2Rhc2hcbiMjI1xubW9kdWxlLmV4cG9ydHMgPVxuY2xhc3MgVmlldyBleHRlbmRzIGpRdWVyeVxuXG4gIEAkd2luZG93OiAkd2luZG93XG4gIEAkZG9jdW1lbnQ6ICRkb2N1bWVudFxuXG4gICMjI1xuICDopoHntKDjga7jg4bjg7Pjg5fjg6zjg7zjg4jjgajjgarjgotTdHJpbmfjgafjgZnjgIJcbiAgIyMjXG4gIEB0ZW1wbGF0ZTogbnVsbFxuXG4gICMjI1xuICDopoHntKDjga7jgrvjg6zjgq/jgr/jgafjgZnjgIJcbiAgIyMjXG4gIHNlbGVjdG9yOiBudWxsXG5cbiAgIyMjXG4gIOOCu+ODrOOCr+OCv+OBi+eUn+aIkOOBmeOCi+imgee0oOOBrkhUTUzjgpLmuKHjgZnjgajjgIHmlrDjgZfjgYRWaWV344Kk44Oz44K544K/44Oz44K544KS6L+U44GX44G+44GZ44CCXG4gIOasoeOBruOCiOOBhuOBquWEquWFiOmghuS9jeOBp+e2meaJv+WFgyhqUXVlcnkp44Kz44Oz44K544OI44Op44Kv44K/44KS44Kz44O844Or44GX44G+44GZ44CCXG4gIDEuIGBAY29uc3RydWN0b3IudGVtcGxhdGVg44GM6Kit5a6a44GV44KM44Gm44GE44KL5aC05ZCIOiDjg4bjg7Pjg5fjg6zjg7zjg4jjgYvjgonopoHntKDjgpLnlJ/miJDjgZfjgb7jgZlcbiAgMi4gYEBzZWxlY3RvcmDjgYzoqK3lrprjgZXjgozjgabjgYTjgovloLTlkIg6IOesrOS4gOW8leaVsOOCkuOCs+ODs+ODhuOCr+OCueODiOOBqOOBl+OBpuOCu+ODrOOCr+OCv+OCkuaknOe0ouOBl+OBvuOBmVxuICAzLiDnrKzkuIDlvJXmlbDjgYzmjIflrprjgZXjgozjgabjgYTjgovloLTlkIg6IOesrOS4gOW8leaVsOOBi+OCieimgee0oOOCkueUn+aIkOODu+aknOe0ouOBl+OBvuOBmeOAglxuICA0LiDnrKzkuIDlvJXmlbDjgYzmjIflrprjgZXjgozjgabjgYTjgarjgYTloLTlkIg6IGA8ZGl2PmDopoHntKDjgpLnlJ/miJDjgZfjgb7jgZnjgIJcbiAgIyMjXG4gIGNvbnN0cnVjdG9yOiAoYXJnMCkgLT5cbiAgICBpZiBAY29uc3RydWN0b3IudGVtcGxhdGU/XG4gICAgICBAY29uc3RydWN0b3IudGVtcGxhdGVGdW5jID89IHRlbXBsYXRlIEBjb25zdHJ1Y3Rvci50ZW1wbGF0ZVxuICAgICAgJGVsID0gc3VwZXIgalF1ZXJ5LnBhcnNlSFRNTCBAY29uc3RydWN0b3IudGVtcGxhdGVGdW5jIChkYXRhID0gYXJnMClcbiAgICBlbHNlIGlmIEBzZWxlY3Rvcj9cbiAgICAgICRlbCA9IHN1cGVyIEBzZWxlY3RvciwgKGNvbnRleHQgPSBhcmcwKVxuICAgIGVsc2VcbiAgICAgICRlbCA9IHN1cGVyIChzZWxlY3RvciA9IGFyZzApIG9yICc8ZGl2PidcblxuICAgICMgalF1ZXJ544Kq44OW44K444Kn44Kv44OI44Gu44OX44Ot44OR44OG44Kj44KS44Kz44OU44O844GX44G+44GZXG4gICAgZm9yIHByb3AsIHZhbCBvZiAkZWxcbiAgICAgIGlmICRlbC5oYXNPd25Qcm9wZXJ0eSBwcm9wXG4gICAgICAgIEBbcHJvcF0gPSB2YWxcblxuICAgICMgalF1ZXJ544Kq44OW44K444Kn44Kv44OI44GuZGF0YeOBqyd2aWV3J+OBqOOBl+OBpuOCpOODs+OCueOCv+ODs+OCueOCkueZu+mMsuOBl+OBvuOBmVxuICAgIEBkYXRhICd2aWV3JywgQFxuXG4gICMjI1xuICBmaW5k44Gu44K344On44O844OI44OP44Oz44OJ44Gn44GZ44CCXG4gICMjI1xuICAkOiAtPiBqUXVlcnkuZm4uZmluZC5hcHBseSBALCBhcmd1bWVudHNcbiAgIyBhZGRMaXN0ZW5lcjogLT4galF1ZXJ5LmZuLm9uLmFwcGx5IEAsIGFyZ3VtZW50c1xuXG4gICMjI1xuICBAcHJpdmF0ZVxuICDjg6njg4Pjg5HjgpLnlJ/miJDjgZnjgotqUXVlcnnjg6Hjgr3jg4Pjg4njgpLjgqrjg7zjg5Djg7zjg6njgqTjg4njgZfjgb7jgZnjgIJcbiAg44GT44GT44Gn44GvVmlld+OCpOODs+OCueOCv+ODs+OCueOCkueUn+aIkOOBmeOCi+OBruOBp+OBr+OBquOBj+OAgWpRdWVyeeOCquODluOCuOOCp+OCr+ODiOOCkueUn+aIkOOBl+OBvuOBmeOAglxuICAjIyNcbiAgcHVzaFN0YWNrOiAoZWxlbXMpIC0+XG4gICAgcmV0ID0galF1ZXJ5Lm1lcmdlKGpRdWVyeSgpLCBlbGVtcylcbiAgICByZXQucHJldk9iamVjdCA9IHRoaXNcbiAgICByZXQuY29udGV4dCA9IEBjb250ZXh0XG4gICAgcmV0XG5cbiAgIyMjXG4gIEBwcml2YXRlXG4gIOODqeODg+ODkeOCkueUn+aIkOOBmeOCi2pRdWVyeeODoeOCveODg+ODieOCkuOCquODvOODkOODvOODqeOCpOODieOBl+OBvuOBmeOAglxuICDjgZPjgZPjgafjga9WaWV344Kk44Oz44K544K/44Oz44K544KS55Sf5oiQ44GZ44KL44Gu44Gn44Gv44Gq44GP44CBalF1ZXJ544Kq44OW44K444Kn44Kv44OI44KS55Sf5oiQ44GX44G+44GZ44CCXG4gICMjI1xuICBlbmQ6IC0+XG4gICAgQHByZXZPYmplY3QgPyBqUXVlcnkobnVsbClcblxuXG4jIyNcbnZpZXfjga7jgqTjg7Pjgrnjgr/jg7PjgrnjgpLlj5blvpfjgZfjgb7jgZnjgIJcbuODoeOCveODg+ODieODgeOCp+ODvOODs+OCkuihjOOBhumam+OBq+OAgWpRdWVyeeOCquODluOCuOOCp+OCr+ODiOOBq+enu+OBo+OBn+OCs+ODs+ODhuOCr+OCueODiOOCklxuVmlld+OCpOODs+OCueOCv+ODs+OCueOBq+aIu+OBmeOBk+OBqOOBjOOBp+OBjeOBvuOBmeOAglxuYGBgY29mZmVlc2NyaXB0XG5uZXcgVmlldyAnLnNvbWUnIC8vIFZpZXfjgqTjg7Pjgrnjgr/jg7PjgrnjgpLnlJ/miJDjgZfjgb7jgZlcbi5hcHBlbmRUbyAnYm9keScgLy8galF1ZXJ544Gu44Oh44K944OD44OJ44KS44Kz44O844Or44GX44G+44GZXG4udmlldygpLnNvbWUoKSAgIC8vIFZpZXfjgavlrp/oo4XjgZXjgozjgZ/jg6Hjgr3jg4Pjg4njgpLjgrPjg7zjg6vjgZfjgb7jgZlcbmBgYFxuIyMjXG5qUXVlcnkuZm4udmlldyA9IC0+IEBkYXRhICd2aWV3J1xuIl19
