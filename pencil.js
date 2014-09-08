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

  Point.prototype.containIn = function(rect) {
    var x, y;
    return new Point((this.x < (x = rect.getLeft()) ? x : this.x > (x = rect.getRight()) ? x : this.x), (this.y < (y = rect.getTop()) ? y : this.y > (y = rect.getBottom()) ? y : this.y));
  };

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9taW5vZGlzay93b3Jrc3BhY2UvZ2l0aHViL3RyeW1vcmUvcGVuY2lsL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbWlub2Rpc2svd29ya3NwYWNlL2dpdGh1Yi90cnltb3JlL3BlbmNpbC9wZW5jaWwuY29mZmVlIiwiL1VzZXJzL21pbm9kaXNrL3dvcmtzcGFjZS9naXRodWIvdHJ5bW9yZS9wZW5jaWwvbW9kZWxzL2FuaW1hdGUuY29mZmVlIiwiL1VzZXJzL21pbm9kaXNrL3dvcmtzcGFjZS9naXRodWIvdHJ5bW9yZS9wZW5jaWwvbW9kZWxzL2JhY2tncm91bnMtcG9zaXRpb24uY29mZmVlIiwiL1VzZXJzL21pbm9kaXNrL3dvcmtzcGFjZS9naXRodWIvdHJ5bW9yZS9wZW5jaWwvbW9kZWxzL2Jyb3dzZXIuY29mZmVlIiwiL1VzZXJzL21pbm9kaXNrL3dvcmtzcGFjZS9naXRodWIvdHJ5bW9yZS9wZW5jaWwvbW9kZWxzL2Vhc2luZy5jb2ZmZWUiLCIvVXNlcnMvbWlub2Rpc2svd29ya3NwYWNlL2dpdGh1Yi90cnltb3JlL3BlbmNpbC9tb2RlbHMvZmxvdy5jb2ZmZWUiLCIvVXNlcnMvbWlub2Rpc2svd29ya3NwYWNlL2dpdGh1Yi90cnltb3JlL3BlbmNpbC9tb2RlbHMvaW1hZ2UtZGF0YS1oZWxwZXIuY29mZmVlIiwiL1VzZXJzL21pbm9kaXNrL3dvcmtzcGFjZS9naXRodWIvdHJ5bW9yZS9wZW5jaWwvbW9kZWxzL2lvdGEuY29mZmVlIiwiL1VzZXJzL21pbm9kaXNrL3dvcmtzcGFjZS9naXRodWIvdHJ5bW9yZS9wZW5jaWwvbW9kZWxzL2xvY2F0aW9uLmNvZmZlZSIsIi9Vc2Vycy9taW5vZGlzay93b3Jrc3BhY2UvZ2l0aHViL3RyeW1vcmUvcGVuY2lsL21vZGVscy9vcy5jb2ZmZWUiLCIvVXNlcnMvbWlub2Rpc2svd29ya3NwYWNlL2dpdGh1Yi90cnltb3JlL3BlbmNpbC9tb2RlbHMvcG9pbnQuY29mZmVlIiwiL1VzZXJzL21pbm9kaXNrL3dvcmtzcGFjZS9naXRodWIvdHJ5bW9yZS9wZW5jaWwvbW9kZWxzL3F1ZXJ5LXN0cmluZy5jb2ZmZWUiLCIvVXNlcnMvbWlub2Rpc2svd29ya3NwYWNlL2dpdGh1Yi90cnltb3JlL3BlbmNpbC9tb2RlbHMvcmVjdC5jb2ZmZWUiLCIvVXNlcnMvbWlub2Rpc2svd29ya3NwYWNlL2dpdGh1Yi90cnltb3JlL3BlbmNpbC9tb2RlbHMvc25hcGhlbHBlci5jb2ZmZWUiLCIvVXNlcnMvbWlub2Rpc2svd29ya3NwYWNlL2dpdGh1Yi90cnltb3JlL3BlbmNpbC9tb2RlbHMvc25zL2ZhY2Vib29rLmNvZmZlZSIsIi9Vc2Vycy9taW5vZGlzay93b3Jrc3BhY2UvZ2l0aHViL3RyeW1vcmUvcGVuY2lsL21vZGVscy9zbnMvZ29vZ2xlLXBsdXMuY29mZmVlIiwiL1VzZXJzL21pbm9kaXNrL3dvcmtzcGFjZS9naXRodWIvdHJ5bW9yZS9wZW5jaWwvbW9kZWxzL3Nucy9oYXRlbmEuY29mZmVlIiwiL1VzZXJzL21pbm9kaXNrL3dvcmtzcGFjZS9naXRodWIvdHJ5bW9yZS9wZW5jaWwvbW9kZWxzL3Nucy9saW5lLmNvZmZlZSIsIi9Vc2Vycy9taW5vZGlzay93b3Jrc3BhY2UvZ2l0aHViL3RyeW1vcmUvcGVuY2lsL21vZGVscy9zbnMvcGludGVyZXN0LmNvZmZlZSIsIi9Vc2Vycy9taW5vZGlzay93b3Jrc3BhY2UvZ2l0aHViL3RyeW1vcmUvcGVuY2lsL21vZGVscy9zbnMvdHdpdHRlci5jb2ZmZWUiLCIvVXNlcnMvbWlub2Rpc2svd29ya3NwYWNlL2dpdGh1Yi90cnltb3JlL3BlbmNpbC92aWV3cy9hbmNob3IuY29mZmVlIiwiL1VzZXJzL21pbm9kaXNrL3dvcmtzcGFjZS9naXRodWIvdHJ5bW9yZS9wZW5jaWwvdmlld3MvYnJlYWtwb2ludC5jb2ZmZWUiLCIvVXNlcnMvbWlub2Rpc2svd29ya3NwYWNlL2dpdGh1Yi90cnltb3JlL3BlbmNpbC92aWV3cy9jaGVja2JveC5jb2ZmZWUiLCIvVXNlcnMvbWlub2Rpc2svd29ya3NwYWNlL2dpdGh1Yi90cnltb3JlL3BlbmNpbC92aWV3cy9kcmF3ZXIuY29mZmVlIiwiL1VzZXJzL21pbm9kaXNrL3dvcmtzcGFjZS9naXRodWIvdHJ5bW9yZS9wZW5jaWwvdmlld3MvaW1hZ2UuY29mZmVlIiwiL1VzZXJzL21pbm9kaXNrL3dvcmtzcGFjZS9naXRodWIvdHJ5bW9yZS9wZW5jaWwvdmlld3MvbWFzay1mYWN0b3J5LmNvZmZlZSIsIi9Vc2Vycy9taW5vZGlzay93b3Jrc3BhY2UvZ2l0aHViL3RyeW1vcmUvcGVuY2lsL3ZpZXdzL3ByZXZlbnRhYmxlLmNvZmZlZSIsIi9Vc2Vycy9taW5vZGlzay93b3Jrc3BhY2UvZ2l0aHViL3RyeW1vcmUvcGVuY2lsL3ZpZXdzL3JhZGlvLmNvZmZlZSIsIi9Vc2Vycy9taW5vZGlzay93b3Jrc3BhY2UvZ2l0aHViL3RyeW1vcmUvcGVuY2lsL3ZpZXdzL3NlbGVjdC5jb2ZmZWUiLCIvVXNlcnMvbWlub2Rpc2svd29ya3NwYWNlL2dpdGh1Yi90cnltb3JlL3BlbmNpbC92aWV3cy9zZWxlY3RhYmxlLmNvZmZlZSIsIi9Vc2Vycy9taW5vZGlzay93b3Jrc3BhY2UvZ2l0aHViL3RyeW1vcmUvcGVuY2lsL3ZpZXdzL3NsaWNlci5jb2ZmZWUiLCIvVXNlcnMvbWlub2Rpc2svd29ya3NwYWNlL2dpdGh1Yi90cnltb3JlL3BlbmNpbC92aWV3cy9zcHJpdGUuY29mZmVlIiwiL1VzZXJzL21pbm9kaXNrL3dvcmtzcGFjZS9naXRodWIvdHJ5bW9yZS9wZW5jaWwvdmlld3MvdGFiLmNvZmZlZSIsIi9Vc2Vycy9taW5vZGlzay93b3Jrc3BhY2UvZ2l0aHViL3RyeW1vcmUvcGVuY2lsL3ZpZXdzL3RleHQtb3ZlcmZsb3cuY29mZmVlIiwiL1VzZXJzL21pbm9kaXNrL3dvcmtzcGFjZS9naXRodWIvdHJ5bW9yZS9wZW5jaWwvdmlld3Mvdmlldy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5n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QXVCLEtBQXZCLENBQU4sQ0FBQTtBQUFBLElBQ0EsR0FBRyxDQUFDLFVBQUosR0FBaUIsSUFEakIsQ0FBQTtBQUFBLElBRUEsR0FBRyxDQUFDLE9BQUosR0FBYyxJQUFDLENBQUEsT0FGZixDQUFBO1dBR0EsSUFKUztFQUFBLENBakRYLENBQUE7O0FBdURBO0FBQUE7Ozs7S0F2REE7O0FBQUEsaUJBNERBLEdBQUEsR0FBSyxTQUFBLEdBQUE7QUFDSCxRQUFBLElBQUE7cURBQWMsTUFBQSxDQUFPLElBQVAsRUFEWDtFQUFBLENBNURMLENBQUE7O2NBQUE7O0dBRmlCLE9BOUJuQixDQUFBOztBQWdHQTtBQUFBOzs7Ozs7Ozs7R0FoR0E7O0FBQUEsTUEwR00sQ0FBQyxFQUFFLENBQUMsSUFBVixHQUFpQixTQUFBLEdBQUE7U0FBRyxJQUFDLENBQUEsSUFBRCxDQUFNLE1BQU4sRUFBSDtBQUFBLENBMUdqQixDQUFBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIm1vZHVsZS5leHBvcnRzID0gXG4gIG1vZGVsczpcbiAgICBhbmltYXRlOiByZXF1aXJlIFwiLi9tb2RlbHMvYW5pbWF0ZVwiXG4gICAgXCJiYWNrZ3JvdW5zLXBvc2l0aW9uXCI6IHJlcXVpcmUgXCIuL21vZGVscy9iYWNrZ3JvdW5zLXBvc2l0aW9uXCJcbiAgICBicm93c2VyOiByZXF1aXJlIFwiLi9tb2RlbHMvYnJvd3NlclwiXG4gICAgZWFzaW5nOiByZXF1aXJlIFwiLi9tb2RlbHMvZWFzaW5nXCJcbiAgICBmbG93OiByZXF1aXJlIFwiLi9tb2RlbHMvZmxvd1wiXG4gICAgXCJpbWFnZS1kYXRhLWhlbHBlclwiOiByZXF1aXJlIFwiLi9tb2RlbHMvaW1hZ2UtZGF0YS1oZWxwZXJcIlxuICAgIGlvdGE6IHJlcXVpcmUgXCIuL21vZGVscy9pb3RhXCJcbiAgICBsb2NhdGlvbjogcmVxdWlyZSBcIi4vbW9kZWxzL2xvY2F0aW9uXCJcbiAgICBvczogcmVxdWlyZSBcIi4vbW9kZWxzL29zXCJcbiAgICBwb2ludDogcmVxdWlyZSBcIi4vbW9kZWxzL3BvaW50XCJcbiAgICBcInF1ZXJ5LXN0cmluZ1wiOiByZXF1aXJlIFwiLi9tb2RlbHMvcXVlcnktc3RyaW5nXCJcbiAgICByZWN0OiByZXF1aXJlIFwiLi9tb2RlbHMvcmVjdFwiXG4gICAgc25hcGhlbHBlcjogcmVxdWlyZSBcIi4vbW9kZWxzL3NuYXBoZWxwZXJcIlxuICAgIHNuczpcbiAgICAgIGZhY2Vib29rOiByZXF1aXJlIFwiLi9tb2RlbHMvc25zL2ZhY2Vib29rXCJcbiAgICAgIFwiZ29vZ2xlLXBsdXNcIjogcmVxdWlyZSBcIi4vbW9kZWxzL3Nucy9nb29nbGUtcGx1c1wiXG4gICAgICBoYXRlbmE6IHJlcXVpcmUgXCIuL21vZGVscy9zbnMvaGF0ZW5hXCJcbiAgICAgIGxpbmU6IHJlcXVpcmUgXCIuL21vZGVscy9zbnMvbGluZVwiXG4gICAgICBwaW50ZXJlc3Q6IHJlcXVpcmUgXCIuL21vZGVscy9zbnMvcGludGVyZXN0XCJcbiAgICAgIHR3aXR0ZXI6IHJlcXVpcmUgXCIuL21vZGVscy9zbnMvdHdpdHRlclwiXG5cbiAgdmlld3M6XG4gICAgYW5jaG9yOiByZXF1aXJlIFwiLi92aWV3cy9hbmNob3JcIlxuICAgIGJyZWFrcG9pbnQ6IHJlcXVpcmUgXCIuL3ZpZXdzL2JyZWFrcG9pbnRcIlxuICAgIGNoZWNrYm94OiByZXF1aXJlIFwiLi92aWV3cy9jaGVja2JveFwiXG4gICAgZHJhd2VyOiByZXF1aXJlIFwiLi92aWV3cy9kcmF3ZXJcIlxuICAgIGltYWdlOiByZXF1aXJlIFwiLi92aWV3cy9pbWFnZVwiXG4gICAgXCJtYXNrLWZhY3RvcnlcIjogcmVxdWlyZSBcIi4vdmlld3MvbWFzay1mYWN0b3J5XCJcbiAgICBwcmV2ZW50YWJsZTogcmVxdWlyZSBcIi4vdmlld3MvcHJldmVudGFibGVcIlxuICAgIHJhZGlvOiByZXF1aXJlIFwiLi92aWV3cy9yYWRpb1wiXG4gICAgc2VsZWN0OiByZXF1aXJlIFwiLi92aWV3cy9zZWxlY3RcIlxuICAgIHNlbGVjdGFibGU6IHJlcXVpcmUgXCIuL3ZpZXdzL3NlbGVjdGFibGVcIlxuICAgIHNsaWNlcjogcmVxdWlyZSBcIi4vdmlld3Mvc2xpY2VyXCJcbiAgICBzcHJpdGU6IHJlcXVpcmUgXCIuL3ZpZXdzL3Nwcml0ZVwiXG4gICAgdGFiOiByZXF1aXJlIFwiLi92aWV3cy90YWJcIlxuICAgIFwidGV4dC1vdmVyZmxvd1wiOiByZXF1aXJlIFwiLi92aWV3cy90ZXh0LW92ZXJmbG93XCJcbiAgICB2aWV3OiByZXF1aXJlIFwiLi92aWV3cy92aWV3XCJcbiIsIiQgPSByZXF1aXJlICdqcXVlcnknXG5cbm1vZHVsZS5leHBvcnRzID1cblxuICBhbmltYXRlOiAoZnJvbSwgdG8sIG9wdHMpIC0+XG4gICAgJCAnPGRpdj4nXG4gICAgLmNzc1xuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZSdcbiAgICAgIGxlZnQ6IGZyb21cbiAgICAuYW5pbWF0ZVxuICAgICAgbGVmdDogdG9cbiAgICAsIG9wdHNcbiIsIm1vZHVsZS5leHBvcnRzID1cblxuICBqcXVlcml6ZTogKCQpIC0+XG4gICAgcmV0dXJuIGlmICQuanF1ZXJpemVkP1snYmFja2dyb3VuZC1zaXplJ11cblxuICAgIHJlcGxhY2VyID1cbiAgICAgIGxlZnQ6ICcwcHgnXG4gICAgICByaWdodDogJzEwMCUnXG4gICAgICB0b3A6ICcwcHgnXG4gICAgICBib3R0b206ICcxMDAlJ1xuICAgIG5vcm1hbGl6ZSA9ICh2YWwpIC0+IHJlcGxhY2VyW3ZhbF0gb3IgdmFsXG4gICAgZ2V0QmFja2dyb3VuZFNpemVzID0gKGVsKSAtPlxuICAgICAgJC5jc3MoZWwsICdiYWNrZ3JvdW5kLXBvc2l0aW9uJykuc3BsaXQgL1xccysvLCAyXG5cbiAgICBmb3IgZGlyZWN0aW9uLCBpIGluIFsneCcsICd5J11cbiAgICAgIGRvIChkaXJlY3Rpb24sIGkpIC0+XG4gICAgICAgICQuY3NzSG9va3NbXCJiYWNrZ3JvdW5kLXBvc2l0aW9uLSN7ZGlyZWN0aW9ufVwiXSA9XG4gICAgICAgICQuY3NzSG9va3NbXCJiYWNrZ3JvdW5kUG9zaXRpb24je2RpcmVjdGlvbi50b1VwcGVyQ2FzZSgpfVwiXSA9XG4gICAgICAgICAgZ2V0OiAoZWwpIC0+IGdldEJhY2tncm91bmRTaXplcyhlbClbaV1cbiAgICAgICAgICBzZXQ6IChlbCwgdmFsKSAtPlxuICAgICAgICAgICAgc2l6ZXMgPSBnZXRCYWNrZ3JvdW5kU2l6ZXMgZWxcbiAgICAgICAgICAgIHNpemVzW2ldID0gbm9ybWFsaXplIHZhbFxuICAgICAgICAgICAgJC5zdHlsZSBlbCwgJ2JhY2tncm91bmQtcG9zaXRpb24nLCBzaXplcy5qb2luICcgJ1xuICAgICAgICAkLmZ4LnN0ZXBbXCJiYWNrZ3JvdW5kLXBvc2l0aW9uLSN7ZGlyZWN0aW9ufVwiXSA9XG4gICAgICAgICQuZnguc3RlcFtcImJhY2tncm91bmRQb3NpdGlvbiN7ZGlyZWN0aW9uLnRvVXBwZXJDYXNlKCl9XCJdID0gKHsgZWxlbSwgcHJvcCwgbm93IH0pIC0+XG4gICAgICAgICAgJC5zdHlsZSBlbGVtLCBwcm9wLCBub3dcblxuICAgICQuanF1ZXJpemVkID89IHt9XG4gICAgJC5qcXVlcml6ZWRbJ2JhY2tncm91bmQtc2l6ZSddID0gdHJ1ZVxuIiwiIyMjXG5Ccm93c2VyIHBhcnNlcyB1c2VyIGFnZW50IGFuZCBkZXRlcm1pbmVzIHRoZSBicm93c2VyIHR5cGUgYW5kIHZlcnNpb24uXG4jIyNcblxuVUEgPSB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpXG5SX0NIUk9NRSA9IC8oY2hyb21lKVsgXFwvXShbXFx3Ll0rKS9cblJfV0VCS0lUID0gLyh3ZWJraXQpWyBcXC9dKFtcXHcuXSspL1xuUl9PUEVSQSA9IC8ob3BlcmEpKD86Lip2ZXJzaW9ufClbIFxcL10oW1xcdy5dKykvXG5SX01TSUUgPSAvKG1zaWUpIChbXFx3Ll0rKS9cblJfTU9aSUxMQSA9IC8obW96aWxsYSkoPzouKj8gcnY6KFtcXHcuXSspfCkvXG5cblsge30sIG5hbWUsIHZlcnNpb24gXSA9IFJfQ0hST01FLmV4ZWMoVUEpIG9yXG4gICAgICAgICAgICAgICAgICAgICAgICBSX1dFQktJVC5leGVjKFVBKSBvclxuICAgICAgICAgICAgICAgICAgICAgICAgUl9PUEVSQS5leGVjKFVBKSBvclxuICAgICAgICAgICAgICAgICAgICAgICAgUl9NU0lFLmV4ZWMoVUEpIG9yXG4gICAgICAgICAgICAgICAgICAgICAgICBVQS5pbmRleE9mKFwiY29tcGF0aWJsZVwiKSA8IDAgYW5kIFJfTU9aSUxMQS5leGVjKFVBKSBvclxuICAgICAgICAgICAgICAgICAgICAgICAgW11cblxuYnJvd3NlciA9IHt9XG5pZiBuYW1lXG4gIGJyb3dzZXJbbmFtZV0gPSB0cnVlXG4gIGJyb3dzZXIudmVyc2lvbiA9IHZlcnNpb25cbiAgbnVtYmVyID0gcGFyc2VJbnQgYnJvd3Nlci52ZXJzaW9uLCAxMFxuICB1bmxlc3MgaXNOYU4gbnVtYmVyXG4gICAgYnJvd3Nlci52ZXJzaW9uTnVtYmVyID0gbnVtYmVyXG5pZiBicm93c2VyLmNocm9tZVxuICBicm93c2VyLndlYmtpdCA9IHRydWVcbmVsc2UgaWYgYnJvd3Nlci53ZWJraXRcbiAgYnJvd3Nlci5zYWZhcmkgPSB0cnVlXG5cbm1vZHVsZS5leHBvcnRzID0gYnJvd3NlclxuIiwie1xuICBQSVxuICBhYnNcbiAgcG93XG4gIHNxcnRcbiAgc2luXG4gIGNvc1xuICBhc2luXG4gIHJvdW5kXG59ID0gTWF0aFxuXG5QSV8yID0gUEkgLyAyXG5cbnJvdW5kU21hbGwgPSAodmFsKSAtPlxuIyAgICByZXR1cm4gMCBpZiB2YWwgaXMgMFxuIyAgICByZXR1cm4gdmFsIGlmIHZhbCA+PSAxZS02IG9yIHZhbCA8PSAtMWUtNlxuIyAgICByZXR1cm4gMWUtNiBpZiB2YWwgPj0gNWUtN1xuIyAgICByZXR1cm4gLTFlLTYgaWYgdmFsIDw9IC01ZS03XG4jICAgIDBcbiAgcmV0dXJuIHZhbCBpZiB2YWwgPj0gMWUtNlxuICByb3VuZCh2YWwgKiAxMDAwMDAwKSAvIDEwMDAwMDBcblxuZmFjdG9yeSA9XG5cbiAgbGluZWFyOiAtPlxuICAgICh4LCB0LCBiLCBjLCBkKSAtPlxuICAgICAgYyAqIHQgLyBkICsgYlxuXG4gIGVhc2VJbkJhY2s6IChzKSAtPlxuICAgIHMgPSBzIG9yIDEuNzAxNThcbiAgICAoeCwgdCwgYiwgYywgZCkgLT5cbiAgICAgIGMgKiAodCAvPSBkKSAqIHQgKiAoKHMgKyAxKSAqIHQgLSBzKSArIGJcblxuICBlYXNlSW5PdXRCYWNrOiAocykgLT5cbiAgICBzID0gcyBvciAxLjcwMTU4XG4gICAgKHgsIHQsIGIsIGMsIGQpIC0+XG4gICAgICByZXR1cm4gYyAvIDIgKiAodCAqIHQgKiAoKChzICogMS41MjUpICsgMSkgKiB0IC0gcyAqIDEuNTI1KSkgKyBiICBpZiAodCAvPSBkIC8gMikgPCAxXG4gICAgICBjIC8gMiAqICgodCAtPSAyKSAqIHQgKiAoKChzICogMS41MjUpICsgMSkgKiB0ICsgcyAqIDEuNTI1KSArIDIpICsgYlxuXG4gIGVhc2VPdXRCYWNrOiAocykgLT5cbiAgICBzID0gcyBvciAxLjcwMTU4XG4gICAgKHgsIHQsIGIsIGMsIGQpIC0+XG4gICAgICBjICogKCh0ID0gdCAvIGQgLSAxKSAqIHQgKiAoKHMgKyAxKSAqIHQgKyBzKSArIDEpICsgYlxuXG4gIGVhc2VPdXRJbkJhY2s6IChzKSAtPlxuICAgIHMgPSBzIG9yIDEuNzAxNThcbiAgICAoeCwgdCwgYiwgYywgZCkgLT5cbiAgICAgIHJldHVybiAoYyAvIDIpICogKCh0ID0gKHQgKiAyKSAvIGQgLSAxKSAqIHQgKiAoKHMgKyAxKSAqIHQgKyBzKSArIDEpICsgYiAgaWYgdCA8IGQgLyAyXG4gICAgICAoYyAvIDIpICogKHQgPSAodCAqIDIgLSBkKSAvIGQpICogdCAqICgocyArIDEpICogdCAtIHMpICsgKGIgKyBjIC8gMilcblxuICBlYXNlSW5Cb3VuY2U6IC0+XG4gICAgKHgsIHQsIGIsIGMsIGQpIC0+XG4gICAgICByZXR1cm4gYyAtIChjICogKDcuNTYyNSAqIHQgKiB0KSkgKyBiICBpZiAodCA9IChkIC0gdCkgLyBkKSA8IDAuMzYzNjM2MzYzNjM2MzYzNjVcbiAgICAgIHJldHVybiBjIC0gKGMgKiAoNy41NjI1ICogKHQgLT0gMC41NDU0NTQ1NDU0NTQ1NDU0KSAqIHQgKyAwLjc1KSkgKyBiICBpZiB0IDwgMC43MjcyNzI3MjcyNzI3MjczXG4gICAgICByZXR1cm4gYyAtIChjICogKDcuNTYyNSAqICh0IC09IDAuODE4MTgxODE4MTgxODE4MikgKiB0ICsgMC45Mzc1KSkgKyBiICBpZiB0IDwgMC45MDkwOTA5MDkwOTA5MDkxXG4gICAgICBjIC0gKGMgKiAoNy41NjI1ICogKHQgLT0gMC45NTQ1NDU0NTQ1NDU0NTQ2KSAqIHQgKyAwLjk4NDM3NSkpICsgYlxuXG4gIGVhc2VJbk91dEJvdW5jZTogLT5cbiAgICAoeCwgdCwgYiwgYywgZCkgLT5cbiAgICAgIGlmIHQgPCBkIC8gMlxuICAgICAgICByZXR1cm4gKGMgLSAoYyAqICg3LjU2MjUgKiB0ICogdCkpKSAqIDAuNSArIGIgIGlmICh0ID0gKGQgLSB0ICogMikgLyBkKSA8IDAuMzYzNjM2MzYzNjM2MzYzNjVcbiAgICAgICAgcmV0dXJuIChjIC0gKGMgKiAoNy41NjI1ICogKHQgLT0gMC41NDU0NTQ1NDU0NTQ1NDU0KSAqIHQgKyAwLjc1KSkpICogMC41ICsgYiAgaWYgdCA8IDAuNzI3MjcyNzI3MjcyNzI3M1xuICAgICAgICByZXR1cm4gKGMgLSAoYyAqICg3LjU2MjUgKiAodCAtPSAwLjgxODE4MTgxODE4MTgxODIpICogdCArIDAuOTM3NSkpKSAqIDAuNSArIGIgIGlmIHQgPCAwLjkwOTA5MDkwOTA5MDkwOTFcbiAgICAgICAgKGMgLSAoYyAqICg3LjU2MjUgKiAodCAtPSAwLjk1NDU0NTQ1NDU0NTQ1NDYpICogdCArIDAuOTg0Mzc1KSkpICogMC41ICsgYlxuICAgICAgZWxzZVxuICAgICAgICByZXR1cm4gKGMgKiAoNy41NjI1ICogdCAqIHQpKSAqIDAuNSArIGMgKiAwLjUgKyBiICBpZiAodCA9ICh0ICogMiAtIGQpIC8gZCkgPCAwLjM2MzYzNjM2MzYzNjM2MzY1XG4gICAgICAgIHJldHVybiAoYyAqICg3LjU2MjUgKiAodCAtPSAwLjU0NTQ1NDU0NTQ1NDU0NTQpICogdCArIDAuNzUpKSAqIDAuNSArIGMgKiAwLjUgKyBiICBpZiB0IDwgMC43MjcyNzI3MjcyNzI3MjczXG4gICAgICAgIHJldHVybiAoYyAqICg3LjU2MjUgKiAodCAtPSAwLjgxODE4MTgxODE4MTgxODIpICogdCArIDAuOTM3NSkpICogMC41ICsgYyAqIDAuNSArIGIgIGlmIHQgPCAwLjkwOTA5MDkwOTA5MDkwOTFcbiAgICAgICAgKGMgKiAoNy41NjI1ICogKHQgLT0gMC45NTQ1NDU0NTQ1NDU0NTQ2KSAqIHQgKyAwLjk4NDM3NSkpICogMC41ICsgYyAqIDAuNSArIGJcblxuICBlYXNlT3V0Qm91bmNlOiAtPlxuICAgICh4LCB0LCBiLCBjLCBkKSAtPlxuICAgICAgcmV0dXJuIGMgKiAoNy41NjI1ICogdCAqIHQpICsgYiAgaWYgKHQgLz0gZCkgPCAwLjM2MzYzNjM2MzYzNjM2MzY1XG4gICAgICByZXR1cm4gYyAqICg3LjU2MjUgKiAodCAtPSAwLjU0NTQ1NDU0NTQ1NDU0NTQpICogdCArIDAuNzUpICsgYiAgaWYgdCA8IDAuNzI3MjcyNzI3MjcyNzI3M1xuICAgICAgcmV0dXJuIGMgKiAoNy41NjI1ICogKHQgLT0gMC44MTgxODE4MTgxODE4MTgyKSAqIHQgKyAwLjkzNzUpICsgYiAgaWYgdCA8IDAuOTA5MDkwOTA5MDkwOTA5MVxuICAgICAgYyAqICg3LjU2MjUgKiAodCAtPSAwLjk1NDU0NTQ1NDU0NTQ1NDYpICogdCArIDAuOTg0Mzc1KSArIGJcblxuICBlYXNlT3V0SW5Cb3VuY2U6IC0+XG4gICAgKHgsIHQsIGIsIGMsIGQpIC0+XG4gICAgICBpZiB0IDwgZCAvIDJcbiAgICAgICAgcmV0dXJuIChjIC8gMikgKiAoNy41NjI1ICogdCAqIHQpICsgYiAgaWYgKHQgPSAodCAqIDIpIC8gZCkgPCAwLjM2MzYzNjM2MzYzNjM2MzY1XG4gICAgICAgIHJldHVybiAoYyAvIDIpICogKDcuNTYyNSAqICh0IC09IDAuNTQ1NDU0NTQ1NDU0NTQ1NCkgKiB0ICsgMC43NSkgKyBiICBpZiB0IDwgMC43MjcyNzI3MjcyNzI3MjczXG4gICAgICAgIHJldHVybiAoYyAvIDIpICogKDcuNTYyNSAqICh0IC09IDAuODE4MTgxODE4MTgxODE4MikgKiB0ICsgMC45Mzc1KSArIGIgIGlmIHQgPCAwLjkwOTA5MDkwOTA5MDkwOTFcbiAgICAgICAgKGMgLyAyKSAqICg3LjU2MjUgKiAodCAtPSAwLjk1NDU0NTQ1NDU0NTQ1NDYpICogdCArIDAuOTg0Mzc1KSArIGJcbiAgICAgIGVsc2VcbiAgICAgICAgcmV0dXJuIChjIC8gMikgLSAoKGMgLyAyKSAqICg3LjU2MjUgKiB0ICogdCkpICsgKGIgKyBjIC8gMikgIGlmICh0ID0gKGQgLSAodCAqIDIgLSBkKSkgLyBkKSA8IDAuMzYzNjM2MzYzNjM2MzYzNjVcbiAgICAgICAgcmV0dXJuIChjIC8gMikgLSAoKGMgLyAyKSAqICg3LjU2MjUgKiAodCAtPSAwLjU0NTQ1NDU0NTQ1NDU0NTQpICogdCArIDAuNzUpKSArIChiICsgYyAvIDIpICBpZiB0IDwgMC43MjcyNzI3MjcyNzI3MjczXG4gICAgICAgIHJldHVybiAoYyAvIDIpIC0gKChjIC8gMikgKiAoNy41NjI1ICogKHQgLT0gMC44MTgxODE4MTgxODE4MTgyKSAqIHQgKyAwLjkzNzUpKSArIChiICsgYyAvIDIpICBpZiB0IDwgMC45MDkwOTA5MDkwOTA5MDkxXG4gICAgICAgIChjIC8gMikgLSAoKGMgLyAyKSAqICg3LjU2MjUgKiAodCAtPSAwLjk1NDU0NTQ1NDU0NTQ1NDYpICogdCArIDAuOTg0Mzc1KSkgKyAoYiArIGMgLyAyKVxuXG4gIGVhc2VJbkNpcmM6IC0+XG4gICAgKHgsIHQsIGIsIGMsIGQpIC0+XG4gICAgICAtYyAqIChzcXJ0KDEgLSAodCAvPSBkKSAqIHQpIC0gMSkgKyBiXG5cbiAgZWFzZUluT3V0Q2lyYzogLT5cbiAgICAoeCwgdCwgYiwgYywgZCkgLT5cbiAgICAgIHJldHVybiAtYyAvIDIgKiAoc3FydCgxIC0gdCAqIHQpIC0gMSkgKyBiICBpZiAodCAvPSBkIC8gMikgPCAxXG4gICAgICBjIC8gMiAqIChzcXJ0KDEgLSAodCAtPSAyKSAqIHQpICsgMSkgKyBiXG5cbiAgZWFzZU91dENpcmM6IC0+XG4gICAgKHgsIHQsIGIsIGMsIGQpIC0+XG4gICAgICBjICogc3FydCgxIC0gKHQgPSB0IC8gZCAtIDEpICogdCkgKyBiXG5cbiAgZWFzZU91dEluQ2lyYzogLT5cbiAgICAoeCwgdCwgYiwgYywgZCkgLT5cbiAgICAgIHJldHVybiAoYyAvIDIpICogc3FydCgxIC0gKHQgPSAodCAqIDIpIC8gZCAtIDEpICogdCkgKyBiICBpZiB0IDwgZCAvIDJcbiAgICAgIC0oYyAvIDIpICogKHNxcnQoMSAtICh0ID0gKHQgKiAyIC0gZCkgLyBkKSAqIHQpIC0gMSkgKyAoYiArIGMgLyAyKVxuXG4gIGVhc2VJbkN1YmljOiAtPlxuICAgICh4LCB0LCBiLCBjLCBkKSAtPlxuICAgICAgYyAqICh0IC89IGQpICogdCAqIHQgKyBiXG5cbiAgZWFzZUluT3V0Q3ViaWM6IC0+XG4gICAgKHgsIHQsIGIsIGMsIGQpIC0+XG4gICAgICAoaWYgKCh0IC89IGQgLyAyKSA8IDEpIHRoZW4gYyAvIDIgKiB0ICogdCAqIHQgKyBiIGVsc2UgYyAvIDIgKiAoKHQgLT0gMikgKiB0ICogdCArIDIpICsgYilcblxuICBlYXNlT3V0Q3ViaWM6IC0+XG4gICAgKHgsIHQsIGIsIGMsIGQpIC0+XG4gICAgICBjICogKCh0ID0gdCAvIGQgLSAxKSAqIHQgKiB0ICsgMSkgKyBiXG5cbiAgZWFzZU91dEluQ3ViaWM6IC0+XG4gICAgKHgsIHQsIGIsIGMsIGQpIC0+XG4gICAgICAoaWYgdCA8IGQgLyAyIHRoZW4gYyAvIDIgKiAoKHQgPSB0ICogMiAvIGQgLSAxKSAqIHQgKiB0ICsgMSkgKyBiIGVsc2UgYyAvIDIgKiAodCA9ICh0ICogMiAtIGQpIC8gZCkgKiB0ICogdCArIGIgKyBjIC8gMilcblxuICBlYXNlSW5FbGFzdGljOiAoYSwgcCkgLT5cbiAgICBhID0gYSBvciAwXG4gICAgcCA9IHAgb3IgMFxuICAgICh4LCB0LCBiLCBjLCBkKSAtPlxuICAgICAgcyA9IHVuZGVmaW5lZFxuICAgICAgcmV0dXJuIGIgIGlmIHQgaXMgMFxuICAgICAgcmV0dXJuIGIgKyBjICBpZiAodCAvPSBkKSBpcyAxXG4gICAgICBwID0gZCAqIDAuMyAgdW5sZXNzIHBcbiAgICAgIGlmIG5vdCBhIG9yIGEgPCBhYnMoYylcbiAgICAgICAgYSA9IGNcbiAgICAgICAgcyA9IHAgLyA0XG4gICAgICBlbHNlXG4gICAgICAgIHMgPSBwIC8gKDIgKiBQSSkgKiBhc2luKGMgLyBhKVxuICAgICAgLShhICogcG93KDIsIDEwICogKHQgLT0gMSkpICogc2luKCh0ICogZCAtIHMpICogKDIgKiBQSSkgLyBwKSkgKyBiXG5cbiAgZWFzZUluT3V0RWxhc3RpYzogKGEsIHApIC0+XG4gICAgYSA9IGEgb3IgMFxuICAgIHAgPSBwIG9yIDBcbiAgICAoeCwgdCwgYiwgYywgZCkgLT5cbiAgICAgIHMgPSB1bmRlZmluZWRcbiAgICAgIHJldHVybiBiICBpZiB0IGlzIDBcbiAgICAgIHJldHVybiBiICsgYyAgaWYgKHQgLz0gZCAvIDIpIGlzIDJcbiAgICAgIHAgPSBkICogKDAuMyAqIDEuNSkgIHVubGVzcyBwXG4gICAgICBpZiBub3QgYSBvciBhIDwgYWJzKGMpXG4gICAgICAgIGEgPSBjXG4gICAgICAgIHMgPSBwIC8gNFxuICAgICAgZWxzZVxuICAgICAgICBzID0gcCAvICgyICogUEkpICogYXNpbihjIC8gYSlcbiAgICAgIHJldHVybiAtMC41ICogKGEgKiBwb3coMiwgMTAgKiAodCAtPSAxKSkgKiBzaW4oKHQgKiBkIC0gcykgKiAoMiAqIFBJKSAvIHApKSArIGIgIGlmIHQgPCAxXG4gICAgICBhICogcG93KDIsIC0xMCAqICh0IC09IDEpKSAqIHNpbigodCAqIGQgLSBzKSAqICgyICogUEkpIC8gcCkgKiAwLjUgKyBjICsgYlxuXG4gIGVhc2VPdXRFbGFzdGljOiAoYSwgcCkgLT5cbiAgICBhID0gYSBvciAwXG4gICAgcCA9IHAgb3IgMFxuICAgICh4LCB0LCBiLCBjLCBkKSAtPlxuICAgICAgcyA9IHVuZGVmaW5lZFxuICAgICAgcmV0dXJuIGIgIGlmIHQgaXMgMFxuICAgICAgcmV0dXJuIGIgKyBjICBpZiAodCAvPSBkKSBpcyAxXG4gICAgICBwID0gZCAqIDAuMyAgdW5sZXNzIHBcbiAgICAgIGlmIG5vdCBhIG9yIGEgPCBhYnMoYylcbiAgICAgICAgYSA9IGNcbiAgICAgICAgcyA9IHAgLyA0XG4gICAgICBlbHNlXG4gICAgICAgIHMgPSBwIC8gKDIgKiBQSSkgKiBhc2luKGMgLyBhKVxuICAgICAgYSAqIHBvdygyLCAtMTAgKiB0KSAqIHNpbigodCAqIGQgLSBzKSAqICgyICogUEkpIC8gcCkgKyBjICsgYlxuXG4gIGVhc2VPdXRJbkVsYXN0aWM6IChhLCBwKSAtPlxuICAgIGEgPSBhIG9yIDBcbiAgICBwID0gcCBvciAwXG4gICAgKHgsIHQsIGIsIGMsIGQpIC0+XG4gICAgICBzID0gdW5kZWZpbmVkXG4gICAgICBjIC89IDJcbiAgICAgIGlmIHQgPCBkIC8gMlxuICAgICAgICByZXR1cm4gYiAgaWYgKHQgKj0gMikgaXMgMFxuICAgICAgICByZXR1cm4gYiArIGMgIGlmICh0IC89IGQpIGlzIDFcbiAgICAgICAgcCA9IGQgKiAwLjMgIHVubGVzcyBwXG4gICAgICAgIGlmIG5vdCBhIG9yIGEgPCBhYnMoYylcbiAgICAgICAgICBhID0gY1xuICAgICAgICAgIHMgPSBwIC8gNFxuICAgICAgICBlbHNlXG4gICAgICAgICAgcyA9IHAgLyAoMiAqIFBJKSAqIGFzaW4oYyAvIGEpXG4gICAgICAgIGEgKiBwb3coMiwgLTEwICogdCkgKiBzaW4oKHQgKiBkIC0gcykgKiAoMiAqIFBJKSAvIHApICsgYyArIGJcbiAgICAgIGVsc2VcbiAgICAgICAgcmV0dXJuIChiICsgYykgIGlmICh0ID0gdCAqIDIgLSBkKSBpcyAwXG4gICAgICAgIHJldHVybiAoYiArIGMpICsgYyAgaWYgKHQgLz0gZCkgaXMgMVxuICAgICAgICBwID0gZCAqIDAuMyAgdW5sZXNzIHBcbiAgICAgICAgaWYgbm90IGEgb3IgYSA8IGFicyhjKVxuICAgICAgICAgIGEgPSBjXG4gICAgICAgICAgcyA9IHAgLyA0XG4gICAgICAgIGVsc2VcbiAgICAgICAgICBzID0gcCAvICgyICogUEkpICogYXNpbihjIC8gYSlcbiAgICAgICAgLShhICogcG93KDIsIDEwICogKHQgLT0gMSkpICogc2luKCh0ICogZCAtIHMpICogKDIgKiBQSSkgLyBwKSkgKyAoYiArIGMpXG5cbiAgZWFzZUluRXhwbzogLT5cbiAgICAoeCwgdCwgYiwgYywgZCkgLT5cbiAgICAgIChpZiB0IGlzIDAgdGhlbiBiIGVsc2UgYyAqIHBvdygyLCAxMCAqICh0IC8gZCAtIDEpKSArIGIpXG5cbiAgZWFzZUluT3V0RXhwbzogLT5cbiAgICAoeCwgdCwgYiwgYywgZCkgLT5cbiAgICAgIHJldHVybiBiICBpZiB0IGlzIDBcbiAgICAgIHJldHVybiBiICsgYyAgaWYgdCBpcyBkXG4gICAgICByZXR1cm4gYyAvIDIgKiBwb3coMiwgMTAgKiAodCAtIDEpKSArIGIgIGlmICh0IC89IGQgLyAyKSA8IDFcbiAgICAgIGMgLyAyICogKDIgLSBwb3coMiwgLTEwICogLS10KSkgKyBiXG5cbiAgZWFzZU91dEV4cG86IC0+XG4gICAgKHgsIHQsIGIsIGMsIGQpIC0+XG4gICAgICByZXR1cm4gYiArIGMgIGlmIHQgaXMgZFxuICAgICAgYyAqICgxIC0gcG93KDIsIC0xMCAqIHQgLyBkKSkgKyBiXG5cbiAgZWFzZU91dEluRXhwbzogLT5cbiAgICAoeCwgdCwgYiwgYywgZCkgLT5cbiAgICAgIHJldHVybiAoaWYgdCAqIDIgaXMgZCB0aGVuIGIgKyBjIC8gMiBlbHNlIGMgLyAyICogKDEgLSBwb3coMiwgLTEwICogdCAqIDIgLyBkKSkgKyBiKSAgaWYgdCA8IGQgLyAyXG4gICAgICAoaWYgKHQgKiAyIC0gZCkgaXMgMCB0aGVuIGIgKyBjIC8gMiBlbHNlIGMgLyAyICogcG93KDIsIDEwICogKCh0ICogMiAtIGQpIC8gZCAtIDEpKSArIGIgKyBjIC8gMilcblxuICBlYXNlSW5RdWFkOiAtPlxuICAgICh4LCB0LCBiLCBjLCBkKSAtPlxuICAgICAgYyAqICh0IC89IGQpICogdCArIGJcblxuICBlYXNlSW5PdXRRdWFkOiAtPlxuICAgICh4LCB0LCBiLCBjLCBkKSAtPlxuICAgICAgcmV0dXJuIGMgLyAyICogdCAqIHQgKyBiICBpZiAodCAvPSBkIC8gMikgPCAxXG4gICAgICAtYyAvIDIgKiAoKC0tdCkgKiAodCAtIDIpIC0gMSkgKyBiXG5cbiAgZWFzZU91dFF1YWQ6IC0+XG4gICAgKHgsIHQsIGIsIGMsIGQpIC0+XG4gICAgICAtYyAqICh0IC89IGQpICogKHQgLSAyKSArIGJcblxuICBlYXNlT3V0SW5RdWFkOiAtPlxuICAgICh4LCB0LCBiLCBjLCBkKSAtPlxuICAgICAgcmV0dXJuIC0oYyAvIDIpICogKHQgPSAodCAqIDIgLyBkKSkgKiAodCAtIDIpICsgYiAgaWYgdCA8IGQgLyAyXG4gICAgICAoYyAvIDIpICogKHQgPSAodCAqIDIgLSBkKSAvIGQpICogdCArIChiICsgYyAvIDIpXG5cbiAgZWFzZUluUXVhcnQ6IC0+XG4gICAgKHgsIHQsIGIsIGMsIGQpIC0+XG4gICAgICBjICogKHQgLz0gZCkgKiB0ICogdCAqIHQgKyBiXG5cbiAgZWFzZUluT3V0UXVhcnQ6IC0+XG4gICAgKHgsIHQsIGIsIGMsIGQpIC0+XG4gICAgICByZXR1cm4gYyAvIDIgKiB0ICogdCAqIHQgKiB0ICsgYiAgaWYgKHQgLz0gZCAvIDIpIDwgMVxuICAgICAgLWMgLyAyICogKCh0IC09IDIpICogdCAqIHQgKiB0IC0gMikgKyBiXG5cbiAgZWFzZU91dFF1YXJ0OiAtPlxuICAgICh4LCB0LCBiLCBjLCBkKSAtPlxuICAgICAgLWMgKiAoKHQgPSB0IC8gZCAtIDEpICogdCAqIHQgKiB0IC0gMSkgKyBiXG5cbiAgZWFzZU91dEluUXVhcnQ6IC0+XG4gICAgKHgsIHQsIGIsIGMsIGQpIC0+XG4gICAgICByZXR1cm4gLShjIC8gMikgKiAoKHQgPSAodCAqIDIpIC8gZCAtIDEpICogdCAqIHQgKiB0IC0gMSkgKyBiICBpZiB0IDwgZCAvIDJcbiAgICAgIChjIC8gMikgKiAodCA9ICh0ICogMiAtIGQpIC8gZCkgKiB0ICogdCAqIHQgKyAoYiArIGMgLyAyKVxuXG4gIGVhc2VJblF1aW50OiAtPlxuICAgICh4LCB0LCBiLCBjLCBkKSAtPlxuICAgICAgYyAqICh0IC89IGQpICogdCAqIHQgKiB0ICogdCArIGJcblxuICBlYXNlSW5PdXRRdWludDogLT5cbiAgICAoeCwgdCwgYiwgYywgZCkgLT5cbiAgICAgIHJldHVybiBjIC8gMiAqIHQgKiB0ICogdCAqIHQgKiB0ICsgYiAgaWYgKHQgLz0gZCAvIDIpIDwgMVxuICAgICAgYyAvIDIgKiAoKHQgLT0gMikgKiB0ICogdCAqIHQgKiB0ICsgMikgKyBiXG5cbiAgZWFzZU91dFF1aW50OiAtPlxuICAgICh4LCB0LCBiLCBjLCBkKSAtPlxuICAgICAgYyAqICgodCA9IHQgLyBkIC0gMSkgKiB0ICogdCAqIHQgKiB0ICsgMSkgKyBiXG5cbiAgZWFzZU91dEluUXVpbnQ6IC0+XG4gICAgKHgsIHQsIGIsIGMsIGQpIC0+XG4gICAgICByZXR1cm4gKGMgLyAyKSAqICgodCA9ICh0ICogMikgLyBkIC0gMSkgKiB0ICogdCAqIHQgKiB0ICsgMSkgKyBiICBpZiB0IDwgZCAvIDJcbiAgICAgIChjIC8gMikgKiAodCA9ICh0ICogMiAtIGQpIC8gZCkgKiB0ICogdCAqIHQgKiB0ICsgKGIgKyBjIC8gMilcblxuICBlYXNlSW5TaW5lOiAtPlxuICAgICh4LCB0LCBiLCBjLCBkKSAtPlxuICAgICAgLWMgKiBjb3ModCAvIGQgKiAoUElfMikpICsgYyArIGJcblxuICBlYXNlSW5PdXRTaW5lOiAtPlxuICAgICh4LCB0LCBiLCBjLCBkKSAtPlxuICAgICAgLWMgLyAyICogKGNvcyhQSSAqIHQgLyBkKSAtIDEpICsgYlxuXG4gIGVhc2VPdXRTaW5lOiAtPlxuICAgICh4LCB0LCBiLCBjLCBkKSAtPlxuICAgICAgYyAqIHNpbih0IC8gZCAqIChQSV8yKSkgKyBiXG5cbiAgZWFzZU91dEluU2luZTogLT5cbiAgICAoeCwgdCwgYiwgYywgZCkgLT5cbiAgICAgIHJldHVybiAoYyAvIDIpICogc2luKCh0ICogMikgLyBkICogKFBJXzIpKSArIGIgIGlmIHQgPCBkIC8gMlxuICAgICAgLShjIC8gMikgKiBjb3MoKHQgKiAyIC0gZCkgLyBkICogKFBJXzIpKSArIChjIC8gMikgKyAoYiArIGMgLyAyKVxuXG5tb2R1bGUuZXhwb3J0cyA9XG5cbiAgZmFjdG9yeTogZmFjdG9yeVxuXG4gIGpxdWVyaXplOiAoJCkgLT5cbiAgICByZXR1cm4gaWYgJC5qcXVlcml6ZWQ/WydlYXNpbmcnXVxuXG4gICAgJC5leHRlbmQgJC5lYXNpbmcsIGRvIC0+XG4gICAgICBlYXNpbmcgPSB7fVxuICAgICAgZm9yIG5hbWUsIGZ1bmMgb2YgZmFjdG9yeVxuICAgICAgICBlYXNlID0gZnVuYygpXG4gICAgICAgIGRvIChlYXNlKSAtPlxuICAgICAgICAgIGVhc2luZ1tuYW1lXSA9IC0+XG4gICAgICAgICAgICByb3VuZFNtYWxsIGVhc2UuYXBwbHkgQCwgYXJndW1lbnRzXG4gICAgICBlYXNpbmcuZWFzZSA9IGVhc2luZy5lYXNlT3V0UXVhZFxuICAgICAgZWFzaW5nXG5cbiAgICAkLmpxdWVyaXplZCA/PSB7fVxuICAgICQuanF1ZXJpemVkWydlYXNpbmcnXSA9IHRydWVcbiIsIiQgPSByZXF1aXJlICdqcXVlcnknXG5cbmZsb3cgPVxuXG4gIHNlcmlhbDogKGNicykgLT5cbiAgICBkZmQgPSBudWxsXG4gICAgZm9yIGNiIGluIGNic1xuICAgICAgdW5sZXNzIGRmZD9cbiAgICAgICAgZGZkID0gY2IoKVxuICAgICAgZWxzZVxuICAgICAgICBkZmQgPSBkZmQudGhlbiBjYlxuICAgIGRmZFxuXG4gIHBhcmFsbGVsOiAoY2JzKSAtPlxuICAgIGQgPSAkLkRlZmVycmVkKClcbiAgICBkZmRzID0gKGNiKCkgZm9yIGNiIGluIGNicylcbiAgICAkLndoZW4uYXBwbHkgJCwgZGZkc1xuICAgIC5kb25lIGlmIGRmZHMubGVuZ3RoIDw9IDFcbiAgICAgIChyZXRzLi4uKSAtPiBkLnJlc29sdmUgWyByZXRzIF1cbiAgICBlbHNlXG4gICAgICAocmV0cy4uLikgLT4gZC5yZXNvbHZlIHJldHNcbiAgICAuZmFpbCBkLnJlamVjdFxuICAgIGQucHJvbWlzZSgpXG5cbiAgd2FpdDogKG1zKSAtPlxuICAgIGRmZCA9ICQuRGVmZXJyZWQoKVxuICAgIHNldFRpbWVvdXQgLT5cbiAgICAgIGRmZC5yZXNvbHZlKClcbiAgICAsIG1zXG4gICAgZGZkLnByb21pc2UoKVxuXG5cbm1vZHVsZS5leHBvcnRzID0gJC5leHRlbmQgZmxvdyxcbiAganF1ZXJ5aXplOiAoJCkgLT5cbiAgICAkLmV4dGVuZCBmbG93XG4iLCJpb3RhID0gcmVxdWlyZSgnLi4vbW9kZWxzL2lvdGEnKSgpXG5cbm1vZHVsZS5leHBvcnRzID1cbmNsYXNzIEltYWdlRGF0YVV0aWxcblxuICBATEVGVDogMSA8PCBpb3RhKClcbiAgQFJJR0hUOiAxIDw8IGlvdGEoKVxuICBAVE9QOiAxIDw8IGlvdGEoKVxuICBAQk9UVE9NOiAxIDw8IGlvdGEoKVxuXG4gIEBjb250ZXh0OiAod2lkdGgsIGhlaWdodCkgLT5cbiAgICBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50ICdjYW52YXMnXG4gICAgY2FudmFzLndpZHRoID0gd2lkdGhcbiAgICBjYW52YXMuaGVpZ2h0ID0gaGVpZ2h0XG4gICAgY2FudmFzLmdldENvbnRleHQgJzJkJ1xuXG4gIEBuZXc6ICh3aWR0aCwgaGVpZ2h0KSAtPlxuICAgIGNvbnRleHQgPSBJbWFnZURhdGFVdGlsLmNvbnRleHQgd2lkdGgsIGhlaWdodFxuICAgIGNvbnRleHQuZ2V0SW1hZ2VEYXRhIDAsIDAsIHdpZHRoLCBoZWlnaHRcblxuICBAY2xvbmU6IChpbWFnZURhdGEpIC0+XG4gICAgY29udGV4dCA9IEltYWdlRGF0YVV0aWwuY29udGV4dCBpbWFnZURhdGEud2lkdGgsIGltYWdlRGF0YS5oZWlnaHRcbiAgICBjb250ZXh0LnB1dEltYWdlRGF0YSBpbWFnZURhdGEsIDAsIDBcbiAgICBjb250ZXh0LmdldEltYWdlRGF0YSAwLCAwLCBpbWFnZURhdGEud2lkdGgsIGltYWdlRGF0YS5oZWlnaHRcblxuICBAY2hvcDogKGltYWdlRGF0YSwgZGlyZWN0aW9uKSAtPlxuICAgIHsgd2lkdGgsIGhlaWdodCwgZGF0YSB9ID0gaW1hZ2VEYXRhXG5cbiAgICBjb250ZXh0ID0gSW1hZ2VEYXRhVXRpbC5jb250ZXh0IHdpZHRoLCBoZWlnaHRcbiAgICBjb250ZXh0LnB1dEltYWdlRGF0YSBpbWFnZURhdGEsIDAsIDBcblxuICAgIG1pblggPSAwXG4gICAgbWF4WCA9IHdpZHRoIC0gMVxuICAgIG1pblkgPSAwXG4gICAgbWF4WSA9IGhlaWdodCAtIDFcbiAgICBpZiAoZGlyZWN0aW9uICYmIEltYWdlRGF0YVV0aWwuUklHSFQpIGlzIEltYWdlRGF0YVV0aWwuUklHSFRcbiAgICAgIHJpZ2h0ID0gZG8gLT5cbiAgICAgICAgeCA9IG1heFhcbiAgICAgICAgd2hpbGUgeCA+PSBtaW5YXG4gICAgICAgICAgeSA9IG1heFlcbiAgICAgICAgICB3aGlsZSB5ID49IG1pbllcbiAgICAgICAgICAgIHJldHVybiB4IGlmIGRhdGFbMyArIDQgKiAoaGVpZ2h0ICogeCArIHkpXSBpc250IDBcbiAgICAgICAgICAgIHktLVxuICAgICAgICAgIHgtLVxuICAgICAgICByZXR1cm4gMFxuICAgICAgcmV0dXJuIGNvbnRleHQuZ2V0SW1hZ2VEYXRhIDAsIDAsIHJpZ2h0ICsgMSwgaGVpZ2h0XG4iLCIjIyNcbuS4u+OBq+ODleODqeOCsOOCkuS9nOOCi+mam+OBq+S9v+eUqOOBmeOCi+ODpuODvOODhuOCo+ODquODhuOCo+OBp+OBmeOAglxuXG5AZXhhbXBsZSAxMOmAsuaVsOOBruODleODqeOCsOOCkueUn+aIkOOBmeOCi1xuICAgIGlvdGEgPSByZXF1aXJlKCdwZW5jaWwvbW9kZWxzL2lvdGEnKSgpXG4gICAgYSA9IGlvdGEoKSAjIDBcbiAgICBiID0gaW90YSgpICMgMVxuICAgIGMgPSBpb3RhKCkgIyAyXG4gICAgZCA9IGlvdGEoKSAjIDNcbiAgICBlID0gaW90YSgpICMgNFxuXG5AZXhhbXBsZSAy6YCy5pWw44Gu44OV44Op44Kw44KS55Sf5oiQ44GZ44KLXG4gICAgaW90YSA9IHJlcXVpcmUoJ3BlbmNpbC9tb2RlbHMvaW90YScpKClcbiAgICBhID0gMSA8PCBpb3RhKCkgIyAwICgwMDAwKVxuICAgIGIgPSAxIDw8IGlvdGEoKSAjIDEgKDAwMDEpXG4gICAgYyA9IDEgPDwgaW90YSgpICMgMiAoMDAxMClcbiAgICBkID0gMSA8PCBpb3RhKCkgIyA0ICgwMTAwKVxuICAgIGUgPSAxIDw8IGlvdGEoKSAjIDggKDEwMDApXG4jIyNcbmNsYXNzIElvdGFcblxuICAjIyNcbiAgQHJldHVybiBGdW5jdGlvbiDjgrPjg7zjg6vjgZnjgovmr47jgasw44GL44KJ44Kk44Oz44Kv44Oq44Oh44Oz44OI44GV44KM44Gf5pW05pWw44KS6L+U44GZ6Zai5pWw44KS6L+U44GX44G+44GZ44CCXG4gICMjI1xuICBAZmFjdG9yeTogLT5cbiAgICBpbmRleCA9IDBcbiAgICAtPiBpbmRleCsrXG5cbm1vZHVsZS5leHBvcnRzID0gSW90YS5mYWN0b3J5XG4iLCIkID0gcmVxdWlyZSAnanF1ZXJ5J1xuXG5wcm9wcyA9IFwiXCJcIlxuaGFzaFxuaG9zdFxuaG9zdG5hbWVcbmhyZWZcbm9yaWdpblxucGF0aG5hbWVcbnBvcnRcbnByb3RvY29sXG5cIlwiXCIuc3BsaXQgL1xccysvXG5cbm1vZHVsZS5leHBvcnRzID1cbiAgcGFyc2U6ICh1cmwpIC0+XG4gICAgbG9jYXRpb24gPSB7fVxuICAgIGVsID0gJCgnPGE+JykuYXR0cihocmVmOiB1cmwpWzBdXG4gICAgZm9yIHByb3AgaW4gcHJvcHNcbiAgICAgIGxvY2F0aW9uW3Byb3BdID0gZWxbcHJvcF1cbiAgICBsb2NhdGlvblxuIiwiIyMjXG5PUyBwYXJzZXMgdXNlciBhZ2VudCBhbmQgZGV0ZXJtaW5lcyB0aGUgT1MgdHlwZSBhbmQgdmVyc2lvbi5cbiMjI1xuXG5VQSA9IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKClcblJfSV9QSE9ORSA9IC9cXCgoaXBob25lKS4qP29zIChbXFxkX10rKS4qP1xcKS9cblJfSV9QT0QgPSAvXFwoKGlwb2QpLio/b3MgKFtcXGRfXSspLio/XFwpL1xuUl9JX1BBRCA9IC9cXCgoaXBhZCkuKj9vcyAoW1xcZF9dKykuKj9cXCkvXG5SX0FORFJPSUQgPSAvXFwoLio/KGFuZHJvaWQpIChbXFxkXFwuXSspLio/XFwpL1xuUl9NQUMgPSAvXFwoLio/KG1hYykgb3MgeCAoW1xcZF9cXC5dKykuKj9cXCkvXG5SX0xJTlVYID0gL1xcKC4qPyhsaW51eCkgKFxcdyspdlxcKS9cblJfV0lORE9XUyA9IC9cXCguKj8od2luZG93cykgKFxcdyspLio/XFwpL1xuXG5bIHt9LCBuYW1lLCB2ZXJzaW9uIF0gPSBSX0lfUEhPTkUuZXhlYyhVQSkgb3JcbiAgICAgICAgICAgICAgICAgICAgICAgIFJfSV9QT0QuZXhlYyhVQSkgb3JcbiAgICAgICAgICAgICAgICAgICAgICAgIFJfSV9QQUQuZXhlYyhVQSkgb3JcbiAgICAgICAgICAgICAgICAgICAgICAgIFJfQU5EUk9JRC5leGVjKFVBKSBvclxuICAgICAgICAgICAgICAgICAgICAgICAgUl9NQUMuZXhlYyhVQSkgb3JcbiAgICAgICAgICAgICAgICAgICAgICAgIFJfV0lORE9XUy5leGVjKFVBKSBvclxuICAgICAgICAgICAgICAgICAgICAgICAgUl9MSU5VWC5leGVjKFVBKSBvclxuICAgICAgICAgICAgICAgICAgICAgICAgW11cblxub3MgPSB7fVxuaWYgbmFtZT9cbiAgb3NbbmFtZV0gPSB0cnVlXG4gIG9zLnZlcnNpb24gPSB2ZXJzaW9uLnNwbGl0KCdfJykuam9pbignLicpXG5pZiBvcy5pcGhvbmUgb3Igb3MuaXBvZCBvciBvcy5pcGFkXG4gIG9zLmlvcyA9IHRydWVcbmlmIG9zLmlvcyBvciBvcy5hbmRyb2lkXG4gIG9zLm1vYmlsZSA9IHRydWVcbmlmIG9zLnZlcnNpb24/XG4gIG51bWJlciA9IHBhcnNlSW50IG9zLnZlcnNpb24sIDEwXG4gIHVubGVzcyBpc05hTiBudW1iZXJcbiAgICBvcy52ZXJzaW9uTnVtYmVyID0gbnVtYmVyXG5cbm1vZHVsZS5leHBvcnRzID0gb3NcbiIsIntpc0FycmF5LCBpc09iamVjdH0gPSByZXF1aXJlICdsb2Rhc2gnXG57c3FydH0gPSBNYXRoXG5cblxuIyMjXG7jg53jgqTjg7Pjg4jjgq/jg6njgrnjgafjgZnjgIJcbuS6jOasoeWFg+OBruebtOS6pOW6p+aomeezu+OCkuaJseOBhOOBvuOBmeOAglxuIyMjXG5tb2R1bGUuZXhwb3J0cyA9XG5jbGFzcyBQb2ludFxuXG4gIEBsZXJwOiAocHQxLCBwdDIsIHJhdGlvKSAtPlxuICAgIHZlY3RvciA9IHB0Mi5zdWIgcHQxXG4gICAgcHQxLmFkZCB2ZWN0b3IubXVsIHJhdGlvXG5cbiAgQGRpc3RhbmNlOiAocHQxLCBwdDIpIC0+XG4gICAgcHQyLnN1YihwdDEpLmRpc3RhbmNlKClcblxuICBAcG9zaXRpb25Ub1BvaW50OiAobGVmdCwgdG9wKSAtPlxuICAgIGlmIGxlZnQ/IGFuZCBsZWZ0LmxlZnQ/IGFuZCBsZWZ0LnRvcD9cbiAgICAgIHsgbGVmdCwgdG9wIH0gPSBsZWZ0XG4gICAgbmV3IFBvaW50IGxlZnQsIHRvcFxuXG4gIEBwYXJzZUFyZ3VtZW50czogKGFyZ3MpIC0+XG4gICAgYXJncyA9IHN3aXRjaCBhcmdzLmxlbmd0aFxuICAgICAgd2hlbiAwXG4gICAgICAgIFtdXG4gICAgICB3aGVuIDFcbiAgICAgICAgaWYgaXNBcnJheSBhcmdzWzBdXG4gICAgICAgICAgYXJnc1swXVxuICAgICAgICBlbHNlIGlmIGlzT2JqZWN0IGFyZ3NbMF1cbiAgICAgICAgICBbYXJnc1swXS54LCBhcmdzWzBdLnldXG4gICAgICAgIGVsc2VcbiAgICAgICAgICBbYXJnc1swXV1cbiAgICAgIGVsc2VcbiAgICAgICAgYXJnc1xuICAgIGZvciBpIGluIFswLi4xXVxuICAgICAgYXJnc1tpXSA9IGlmICh2YWwgPSBhcmdzW2ldKT9cbiAgICAgICAgcGFyc2VGbG9hdCB2YWxcbiAgICAgIGVsc2VcbiAgICAgICAgYXJnc1tpXSA9IDBcbiAgICBhcmdzXG5cblxuICAjIyNcbiAgYGxlZnRgLGB0b3Bg44GL44KJ5oiQ44KL44Kq44OW44K444Kn44Kv44OI44GL44KJYFBvaW50YOOCpOODs+OCueOCv+ODs+OCueOCkueUn+aIkOOBl+OBvuOBmeOAglxuICBAcGFyYW0gW09iamVjdF0gcG9zaXRpb24g5bqn5qiZ44Kq44OW44K444Kn44Kv44OI44Gn44GZ44CCXG4gIEBvcHRpb24gcG9zaXRpb24gW0ludGVnZXJdIGxlZnQgeOW6p+aomeOBp+OBmeOAglxuICBAb3B0aW9uIHBvc2l0aW9uIFtJbnRlZ2VyXSB0b3AgeeW6p+aomeOBp+OBmeOAglxuICAjIyNcbiAgQGNyZWF0ZVdpdGhQb3NpdGlvbjogKHtsZWZ0LCB0b3B9KSAtPiBuZXcgUG9pbnQgbGVmdCwgdG9wXG5cbiAgIyMjXG4gIGBjbGllbnRYYCxgY2xpZW50WWDjgYvjgonmiJDjgovjgqrjg5bjgrjjgqfjgq/jg4jjgYvjgolgUG9pbnRg44Kk44Oz44K544K/44Oz44K544KS55Sf5oiQ44GX44G+44GZ44CCXG4gIEBwYXJhbSBbT2JqZWN0XSBwb3NpdGlvbiDluqfmqJnjgqrjg5bjgrjjgqfjgq/jg4jjgafjgZnjgIJcbiAgQG9wdGlvbiBwb3NpdGlvbiBbSW50ZWdlcl0gY2xpZW50WCB45bqn5qiZ44Gn44GZ44CCXG4gIEBvcHRpb24gcG9zaXRpb24gW0ludGVnZXJdIGNsaWVudFkgeeW6p+aomeOBp+OBmeOAglxuICAjIyNcbiAgQGNyZWF0ZVdpdGhDbGllbnQ6ICh7Y2xpZW50WCwgY2xpZW50WX0pIC0+IG5ldyBQb2ludCBjbGllbnRYLCBjbGllbnRZXG5cbiAgIyMjXG4gIGBwYWdlWGAsYHBhZ2VZYOOBi+OCieaIkOOCi+OCquODluOCuOOCp+OCr+ODiOOBi+OCiWBQb2ludGDjgqTjg7Pjgrnjgr/jg7PjgrnjgpLnlJ/miJDjgZfjgb7jgZnjgIJcbiAgQHBhcmFtIFtPYmplY3RdIHBvc2l0aW9uIOW6p+aomeOCquODluOCuOOCp+OCr+ODiOOBp+OBmeOAglxuICBAb3B0aW9uIHBvc2l0aW9uIFtJbnRlZ2VyXSBwYWdlWCB45bqn5qiZ44Gn44GZ44CCXG4gIEBvcHRpb24gcG9zaXRpb24gW0ludGVnZXJdIHBhZ2VZIHnluqfmqJnjgafjgZnjgIJcbiAgIyMjXG4gIEBjcmVhdGVXaXRoUGFnZTogKHtwYWdlWCwgcGFnZVl9KSAtPiBuZXcgUG9pbnQgcGFnZVgsIHBhZ2VZXG5cblxuICBjb25zdHJ1Y3RvcjogKHgsIHkpIC0+XG4gICAgW0B4LCBAeV0gPSBQb2ludC5wYXJzZUFyZ3VtZW50cyBhcmd1bWVudHNcblxuICAjIyNcbiAg6KSH6KO944GX44G+44GZ44CCXG4gIEByZXR1cm4gW1BvaW50XSDopIfoo73jgZXjgozjgZ9gUG9pbnRg44Kk44Oz44K544K/44Oz44K544Gn44GZ44CCXG4gICMjI1xuICBjbG9uZTogLT4gbmV3IFBvaW50IEB4LCBAeVxuXG4gIGRpc3RhbmNlOiAtPlxuICAgIHNxcnQgQHggKiBAeCArIEB5ICogQHlcblxuICBzdWJ0cmFjdDogKHgsIHkpIC0+XG4gICAgaWYgeD8gYW5kIHgueD8gYW5kIHgueT9cbiAgICAgIHt4LCB5fSA9IHhcbiAgICBuZXcgUG9pbnQgQHggLSB4LCBAeSAtIHlcbiAgc3ViOiBQb2ludDo6c3VidHJhY3RcblxuICBhZGQ6ICh4LCB5KSAtPlxuICAgIGlmIHg/IGFuZCB4Lng/IGFuZCB4Lnk/XG4gICAgICB7eCwgeX0gPSB4XG4gICAgbmV3IFBvaW50IEB4ICsgeCwgQHkgKyB5XG5cbiAgbXVsdGlwbHk6IChuKSAtPlxuICAgIG5ldyBQb2ludCBAeCAqIG4sIEB5ICogblxuICBtdWw6IFBvaW50OjptdWx0aXBseVxuXG4gIGNvbnRhaW5JbjogKHJlY3QpIC0+XG4gICAgbmV3IFBvaW50IChcbiAgICAgIGlmIEB4IDwgKHggPSByZWN0LmdldExlZnQoKSlcbiAgICAgICAgeFxuICAgICAgZWxzZSBpZiBAeCA+ICh4ID0gcmVjdC5nZXRSaWdodCgpKVxuICAgICAgICB4XG4gICAgICBlbHNlXG4gICAgICAgIEB4XG4gICAgKSwgKFxuICAgICAgaWYgQHkgPCAoeSA9IHJlY3QuZ2V0VG9wKCkpXG4gICAgICAgIHlcbiAgICAgIGVsc2UgaWYgQHkgPiAoeSA9IHJlY3QuZ2V0Qm90dG9tKCkpXG4gICAgICAgIHlcbiAgICAgIGVsc2VcbiAgICAgICAgQHlcbiAgICApXG4iLCJ7IGlzQXJyYXkgfSA9IHJlcXVpcmUgJ2xvZGFzaCdcblxuXG4jIyNcbuOCr+OCqOODquaWh+Wtl+WIl+OCr+ODqeOCueOBp+OBmeOAglxuIyMjXG5tb2R1bGUuZXhwb3J0cyA9XG5jbGFzcyBRdWVyeVN0cmluZ1xuXG4gIEBzdHJpbmdpZnk6IChvYmosIHNlcCA9ICcmJywgZXEgPSAnPScpIC0+XG4gICAgcXVlcmllcyA9IGZvciBrZXksIHZhbCBvZiBvYmpcbiAgICAgIGlmIGlzQXJyYXkgdmFsXG4gICAgICAgIGZvciB2IGluIHZhbFxuICAgICAgICAgIFwiI3trZXl9I3tlcX0je2VuY29kZVVSSUNvbXBvbmVudCB2ID8gJyd9XCJcbiAgICAgIGVsc2VcbiAgICAgICAgXCIje2tleX0je2VxfSN7ZW5jb2RlVVJJQ29tcG9uZW50IHZhbCA/ICcnfVwiXG4gICAgcXVlcmllcy5qb2luIHNlcFxuXG4gIEBwYXJzZTogKHN0ciwgc2VwID0gJyYnLCBlcSA9ICc9Jywgb3B0cykgLT5cbiAgICBvcHRzID0gYXNzaWduIG9wdHMsIG1heEtleXM6IDEwMDBcbiAgICB7bWF4S2V5c30gPSBvcHRzXG4gICAgb2JqID0ge31cbiAgICBmb3Iga3YsIGkgaW4gc3RyLnNwbGl0IHNlcCB3aGVuIG1heEtleXMgaXMgMCBvciBpIDwgbWF4S2V5c1xuICAgICAgW2tleSwgdmFsXSA9IGt2LnNwbGl0IGVxXG4gICAgICBpZiBvYmpba2V5XT9cbiAgICAgICAgaWYgaXNBcnJheSBvYmpba2V5XVxuICAgICAgICAgIG9ialtrZXldLnB1c2ggdmFsXG4gICAgICAgIGVsc2VcbiAgICAgICAgICB0bXAgPSBvYmpba2V5XVxuICAgICAgICAgIG9ialtrZXldID0gW3RtcCwgdmFsXVxuICAgICAgZWxzZVxuICAgICAgICBvYmpba2V5XSA9IHZhbFxuICAgIG9ialxuIiwiUG9pbnQgPSByZXF1aXJlICcuL3BvaW50J1xue2Zsb29yLCBjZWlsfSA9IE1hdGhcblxuXG4jIyNcbuevhOWbsuOCr+ODqeOCueOBp+OBmeOAglxu5LqM5qyh5YWD44Gu55u05Lqk5bqn5qiZ57O744KS5omx44GE44G+44GZ44CCXG4jIyNcbm1vZHVsZS5leHBvcnRzID1cbmNsYXNzIFJlY3RcblxuICBAY3JlYXRlV2l0aENvcm5lcjogKGxlZnQsIHJpZ2h0LCB0b3AsIGJvdHRvbSkgLT4gbmV3IFJlY3QgbGVmdCwgdG9wLCByaWdodCAtIGxlZnQsIGJvdHRvbSAtIHRvcFxuXG4gIEBwYXJzZUFyZ3VtZW50czogKGFyZ3MpIC0+XG4gICAgc3dpdGNoIGFyZ3MubGVuZ3RoXG4gICAgICB3aGVuIDBcbiAgICAgICAgeDogMFxuICAgICAgICB5OiAwXG4gICAgICAgIHdpZHRoOiAwXG4gICAgICAgIGhlaWdodDogMFxuICAgICAgd2hlbiAxXG4gICAgICAgIGFyZ3NbMF1cbiAgICAgIHdoZW4gMlxuICAgICAgICB4OiBhcmdzWzBdLnhcbiAgICAgICAgeTogYXJnc1swXS55XG4gICAgICAgIHdpZHRoOiBhcmdzWzBdLnhcbiAgICAgICAgaGVpZ2h0OiBhcmdzWzBdLnlcbiAgICAgIHdoZW4gNFxuICAgICAgICB4OiBhcmdzWzBdXG4gICAgICAgIHk6IGFyZ3NbMV1cbiAgICAgICAgd2lkdGg6IGFyZ3NbMl1cbiAgICAgICAgaGVpZ2h0OiBhcmdzWzNdXG4gICAgICBlbHNlXG4gICAgICAgIHg6IGFyZ3NbMF0gPyAwXG4gICAgICAgIHk6IGFyZ3NbMV0gPyAwXG4gICAgICAgIHdpZHRoOiBhcmdzWzJdID8gMFxuICAgICAgICBoZWlnaHQ6IGFyZ3NbM10gPyAwXG5cbiAgQGNyZWF0ZVdpdGhBcmd1bWVudHM6IChhcmdzKSAtPlxuICAgIHt4LCB5LCB3aWR0aCwgaGVpZ2h0fSA9IFJlY3QucGFyc2VBcmd1bWVudHMgYXJnc1xuICAgIG5ldyBSZWN0IHgsIHksIHdpZHRoLCBoZWlnaHRcblxuICBAY3JlYXRlV2l0aENlbnRlcjogKGNlbnRlclgsIGNlbnRlclksIHdpZHRoLCBoZWlnaHQpIC0+XG4gICAgcmVjdCA9IFJlY3QuY3JlYXRlV2l0aEFyZ3VtZW50cyBhcmd1bWVudHNcbiAgICByZWN0LnggLT0gcmVjdC53aWR0aCAvIDJcbiAgICByZWN0LnkgLT0gcmVjdC5oZWlnaHQgLyAyXG4gICAgcmVjdFxuXG5cbiAgY29uc3RydWN0b3I6ICh4LCB5LCB3aWR0aCwgaGVpZ2h0KSAtPlxuICAgIGlmIHg/IGFuZCB4Lng/IGFuZCB4Lnk/IGFuZCB4LndpZHRoPyBhbmQgeC5oZWlnaHQ/XG4gICAgICB7eCwgeSwgd2lkdGgsIGhlaWdodH0gPSB4XG4gICAgQHggPSB4ID8gMFxuICAgIEB5ID0geSA/IDBcbiAgICBAd2lkdGggPSB3aWR0aCA/IDBcbiAgICBAaGVpZ2h0ID0gaGVpZ2h0ID8gMFxuICAgIEBub3JtYWxpemUoKVxuXG4gIG5vcm1hbGl6ZTogLT5cbiAgICBpZiBAd2lkdGggPCAwXG4gICAgICBAeCArPSBAd2lkdGhcbiAgICAgIEB3aWR0aCAqPSAtMVxuICAgIGlmIEBoZWlnaHQgPCAwXG4gICAgICBAeSArPSBAaGVpZ2h0XG4gICAgICBAaGVpZ2h0ICo9IC0xXG5cbiAgIyMjXG4gIOikh+ijveOBl+OBvuOBmeOAglxuICBAcmV0dXJuIFtSZWN0XSDopIfoo73jgZXjgozjgZ9gUmVjdGDjgqTjg7Pjgrnjgr/jg7PjgrnjgafjgZnjgIJcbiAgIyMjXG4gIGNsb25lOiAtPiBuZXcgUmVjdCBAeCwgQHksIEB3aWR0aCwgQGhlaWdodFxuXG4gIGdldExlZnQ6IC0+IEB4XG4gIGdldFJpZ2h0OiAtPiBAeCArIEB3aWR0aFxuICBnZXRUb3A6IC0+IEB5XG4gIGdldEJvdHRvbTogLT4gQHkgKyBAaGVpZ2h0XG4gIGdldExlZnRUb3A6IC0+IG5ldyBQb2ludCBAZ2V0TGVmdCgpLCBAZ2V0VG9wKClcbiAgZ2V0TGVmdEJvdHRvbTogLT4gbmV3IFBvaW50IEBnZXRMZWZ0KCksIEBnZXRCb3R0b20oKVxuICBnZXRSaWdodFRvcDogLT4gbmV3IFBvaW50IEBnZXRSaWdodCgpLCBAZ2V0VG9wKClcbiAgZ2V0UmlnaHRCb3R0b206IC0+IG5ldyBQb2ludCBAZ2V0UmlnaHQoKSwgQGdldEJvdHRvbSgpXG5cbiAgY29udGFpbnNQb2ludDogKHBvaW50KSAtPlxuICAgIHt4LCB5fSA9IFBvaW50LnBhcnNlQXJndW1lbnRzIGFyZ3VtZW50c1xuICAgIEBnZXRMZWZ0KCkgPD0geCA8PSBAZ2V0UmlnaHQoKSBhbmQgQGdldFRvcCgpIDw9IHkgPD0gQGdldEJvdHRvbSgpXG5cbiAgY29udGFpbnNSZWN0OiAocmVjdCkgLT5cbiAgICB7eCwgeSwgd2lkdGgsIGhlaWdodH0gPSBSZWN0LnBhcnNlQXJndW1lbnRzIGFyZ3VtZW50c1xuICAgIHJlY3QgPSBuZXcgUmVjdCB4LCB5LCB3aWR0aCwgaGVpZ2h0XG4gICAgQGdldExlZnQoKSA8PSByZWN0LmdldExlZnQoKSBhbmQgcmVjdC5nZXRSaWdodCgpIDw9IEBnZXRSaWdodCgpIGFuZFxuICAgIEBnZXRUb3AoKSA8PSByZWN0LmdldFRvcCgpIGFuZCByZWN0LmdldEJvdHRvbSgpIDw9IEBnZXRCb3R0b20oKVxuXG4gIG9mZnNldDogKHgsIHkpIC0+XG4gICAgbmV3IFJlY3QgQHggKyB4LCBAeSArIHksIEB3aWR0aCwgQGhlaWdodFxuXG4gICMjI1xuICDmjIflrprjgZXjgozjgZ/ph4/lpKfjgY3jgY/jgZfjgZ/mlrDjgZ/jgarpoJjln5/jgpLnlJ/miJDjgZfjgb7jgZnjgIJcbiAgQHBhcmFtIFtOdW1iZXJdIHdpZHRoIOWkp+OBjeOBj+OBmeOCi+W5heOBp+OBmeOAglxuICBAcGFyYW0gW051bWJlcl0gaGVpZ2h0IOWkp+OBjeOBj+OBmeOCi+mrmOOBleOBp+OBmeOAglxuICBAcmV0dXJuIFtSZWN0XSDmlrDjgZ/jgarpoJjln5/jgafjgZnjgIJcbiAgIyMjXG4gIGluZmxhdGU6ICh3aWR0aCwgaGVpZ2h0KSAtPlxuICAgIG5ldyBSZWN0IEB4LCBAeSwgQHdpZHRoICsgd2lkdGgsIEBoZWlnaHQgKyBoZWlnaHRcblxuICAjIyNcbiAg5oyH5a6a44GV44KM44Gf6YeP5bCP44GV44GP44GX44Gf5paw44Gf44Gq6aCY5Z+f44KS55Sf5oiQ44GX44G+44GZ44CCXG4gIEBwYXJhbSBbTnVtYmVyXSB3aWR0aCDlsI/jgZXjgY/jgZnjgovluYXjgafjgZnjgIJcbiAgQHBhcmFtIFtOdW1iZXJdIGhlaWdodCDlsI/jgZXjgY/jgZnjgovpq5jjgZXjgafjgZnjgIJcbiAgQHJldHVybiBbUmVjdF0g5paw44Gf44Gq6aCY5Z+f44Gn44GZ44CCXG4gICMjI1xuICBkZWZsYXRlOiAod2lkdGgsIGhlaWdodCkgLT5cbiAgICBuZXcgUmVjdCBAeCwgQHksIEB3aWR0aCAtIHdpZHRoLCBAaGVpZ2h0IC0gaGVpZ2h0XG5cbiAgI1RPRE8gaW1wbGVtZW50IG1lXG4gIHVuaW9uOiAocmVjdCkgLT5cblxuXG4gICMjI1xuICDmjIflrprjga7poJjln5/lhoXjgavlj47jgb7jgovmlrDjgZ/jgarpoJjln5/jgpLnlJ/miJDjgZfjgb7jgZnjgIJcbiAgMS4geCx544KS5Y+O44G+44KL44KI44GG44Gr6Kit5a6a44GX44G+44GZ44CCXG4gIDIuIOWPjuOBvuOCieOBquOBhOWgtOWQiOOBr3dpZHRoLGhlaWdodOOCkuioreWumuOBl+OBvuOBmeOAglxuICAjIyNcbiAgZmFsbFdpdGhpbjogKHJlY3QpIC0+XG4gICAgciA9IEBjbG9uZSgpXG4gICAgbGVmdDAgPSByLmdldExlZnQoKVxuICAgIHJpZ2h0MCA9IHIuZ2V0UmlnaHQoKVxuICAgIHRvcDAgPSByLmdldFRvcCgpXG4gICAgYm90dG9tMCA9IHIuZ2V0Qm90dG9tKClcbiAgICBsZWZ0MSA9IHJlY3QuZ2V0TGVmdCgpXG4gICAgcmlnaHQxID0gcmVjdC5nZXRSaWdodCgpXG4gICAgdG9wMSA9IHJlY3QuZ2V0VG9wKClcbiAgICBib3R0b20xID0gcmVjdC5nZXRCb3R0b20oKVxuXG4gICAgaWYgbGVmdDAgPCBsZWZ0MVxuICAgICAgci54ID0gbGVmdDFcbiAgICAgICMgaWYgKG92ZXIgPSByLmdldFJpZ2h0KCkgLSByaWdodDEpID4gMFxuICAgICAgIyAgIHIud2lkdGggLT0gb3ZlclxuICAgIGlmIHJpZ2h0MCA+IHJpZ2h0MVxuICAgICAgci54IC09IHJpZ2h0MCAtIHJpZ2h0MVxuICAgIGlmIChvdmVyID0gci5nZXRSaWdodCgpIC0gcmlnaHQxKSA+IDBcbiAgICAgIHIud2lkdGggLT0gb3ZlclxuICAgIGlmIHRvcDAgPCB0b3AxXG4gICAgICByLnkgPSB0b3AxXG4gICAgICAjIGlmIChvdmVyID0gci5nZXRCb3R0b20oKSAtIGJvdHRvbTEpID4gMFxuICAgICAgIyAgIHIuaGVpZ2h0IC09IG92ZXJcbiAgICBpZiBib3R0b20wID4gYm90dG9tMVxuICAgICAgci55IC09IGJvdHRvbTAgLSBib3R0b20xXG4gICAgaWYgKG92ZXIgPSByLmdldEJvdHRvbSgpIC0gYm90dG9tMSkgPiAwXG4gICAgICByLmhlaWdodCAtPSBvdmVyXG5cbiAgICByXG5cbiAgbW92YWJsZVJlY3RJbjogKHJlY3QpIC0+XG4gICAgbmV3IFJlY3QgcmVjdC54LCByZWN0LnksIHJlY3Qud2lkdGggLSBAd2lkdGgsIHJlY3QuaGVpZ2h0IC0gQGhlaWdodFxuXG5cbiAgIyMjXG4gIOOBk+OBrumgmOWfn+OBq+aMh+WumuW6p+aomeOBjOWQq+OBvuOCjOOCi+aWsOOBn+OBqumgmOWfn+OCkueUn+aIkOOBl+OBvuOBmeOAglxuICBAcGFyYW0gW051bWJlcl0geCB45bqn5qiZ44Gn44GZ44CCXG4gIEBwYXJhbSBbTnVtYmVyXSB5IHnluqfmqJnjgafjgZnjgIJcbiAgQHJldHVybiBbUmVjdF0g5paw44Gf44Gq6aCY5Z+f44Gn44GZ44CCXG4gICMjI1xuICBjb250YWluOiAoeCwgeSkgLT5cbiAgICBpZiB4PyBhbmQgeC54PyBhbmQgeC55P1xuICAgICAge3gsIHl9ID0geFxuICAgIHIgPSBAY2xvbmUoKVxuICAgIHJpZ2h0ID0gci5nZXRSaWdodCgpXG4gICAgaWYgeCA8IHIueFxuICAgICAgci54ID0geFxuICAgICAgci53aWR0aCA9IHJpZ2h0IC0gci54XG4gICAgZWxzZSBpZiB4ID4gcmlnaHRcbiAgICAgIHIud2lkdGggPSB4IC0gci54XG4gICAgYm90dG9tID0gci5nZXRCb3R0b20oKVxuICAgIGlmIHkgPCByLnlcbiAgICAgIHIueSA9IHlcbiAgICAgIHIuaGVpZ2h0ID0gYm90dG9tIC0gci55XG4gICAgZWxzZSBpZiB5ID4gYm90dG9tXG4gICAgICByLmhlaWdodCA9IHkgLSByLnlcbiAgICByXG5cbiAgY2VpbDogLT5cbiAgICBsZWZ0ID0gZmxvb3IgQGdldExlZnQoKVxuICAgIHJpZ2h0ID0gY2VpbCBAZ2V0UmlnaHQoKVxuICAgIHRvcCA9IGZsb29yIEBnZXRUb3AoKVxuICAgIGJvdHRvbSA9IGNlaWwgQGdldEJvdHRvbSgpXG4gICAgUmVjdC5jcmVhdGVXaXRoQ29ybmVyIGxlZnQsIHJpZ2h0LCB0b3AsIGJvdHRvbVxuXG4gIGZsb29yOiAtPlxuICAgIGxlZnQgPSBjZWlsIEBnZXRMZWZ0KClcbiAgICByaWdodCA9IGZsb29yIEBnZXRSaWdodCgpXG4gICAgdG9wID0gY2VpbCBAZ2V0VG9wKClcbiAgICBib3R0b20gPSBmbG9vciBAZ2V0Qm90dG9tKClcbiAgICBSZWN0LmNyZWF0ZVdpdGhDb3JuZXIgbGVmdCwgcmlnaHQsIHRvcCwgYm90dG9tXG4iLCJQb2ludCA9IHJlcXVpcmUgJy4vcG9pbnQnXG5cbm1vZHVsZS5leHBvcnRzID1cblxuICBnZXRUb3RhbExlbmd0aDogKHBhdGgpIC0+XG4gICAgc3dpdGNoIHBhdGgudHlwZVxuICAgICAgd2hlbiAnbGluZSdcbiAgICAgICAgc3RhcnQgPSBuZXcgUG9pbnQgcGFyc2VGbG9hdChwYXRoLmF0dHIoJ3gxJykpLCBwYXJzZUZsb2F0KHBhdGguYXR0cigneTEnKSlcbiAgICAgICAgZW5kID0gbmV3IFBvaW50IHBhcnNlRmxvYXQocGF0aC5hdHRyKCd4MicpKSwgcGFyc2VGbG9hdChwYXRoLmF0dHIoJ3kyJykpXG4gICAgICAgIFBvaW50LmRpc3RhbmNlIHN0YXJ0LCBlbmRcbiAgICAgIHdoZW4gJ3BvbHlsaW5lJ1xuICAgICAgICBsZW5ndGggPSAwXG4gICAgICAgIHBvaW50cyA9IHBhdGguYXR0ciAncG9pbnRzJ1xuICAgICAgICBpID0gcG9pbnRzLmxlbmd0aFxuICAgICAgICB3aGlsZSBpLS0gPiAwXG4gICAgICAgICAgaWYgcG9pbnRzW2ldIGlzICcnXG4gICAgICAgICAgICBwb2ludHMgPSBwb2ludHMuc3BsaWNlIGksIDFcbiAgICAgICAgZm9yIHgsIGkgaW4gcG9pbnRzIGJ5IDJcbiAgICAgICAgICB4ID0gcGFyc2VGbG9hdCB4XG4gICAgICAgICAgeSA9IHBhcnNlRmxvYXQgcG9pbnRzW2kgKyAxXVxuICAgICAgICAgIG5leHQgPSBuZXcgUG9pbnQgeCwgeVxuICAgICAgICAgIGlmIHByZXY/XG4gICAgICAgICAgICBsZW5ndGggKz0gUG9pbnQuZGlzdGFuY2UgcHJldiwgbmV4dFxuICAgICAgICAgIHByZXYgPSBuZXh0XG4gICAgICAgIGxlbmd0aFxuICAgICAgZWxzZVxuICAgICAgICBwYXRoLmdldFRvdGFsTGVuZ3RoKClcblxuICBnZXRQb2ludEF0TGVuZ3RoOiAocGF0aCwgbGVuKSAtPlxuICAgIHN3aXRjaCBwYXRoLnR5cGVcbiAgICAgIHdoZW4gJ2xpbmUnXG4gICAgICAgIHN0YXJ0ID0gbmV3IFBvaW50IHBhcnNlRmxvYXQocGF0aC5hdHRyKCd4MScpKSwgcGFyc2VGbG9hdChwYXRoLmF0dHIoJ3kxJykpXG4gICAgICAgIGVuZCA9IG5ldyBQb2ludCBwYXJzZUZsb2F0KHBhdGguYXR0cigneDInKSksIHBhcnNlRmxvYXQocGF0aC5hdHRyKCd5MicpKVxuICAgICAgICBQb2ludC5sZXJwIHN0YXJ0LCBlbmQsIGxlbiAvIFBvaW50LmRpc3RhbmNlIHN0YXJ0LCBlbmRcbiAgICAgIHdoZW4gJ3BvbHlsaW5lJ1xuICAgICAgICBsZW5ndGggPSAwXG4gICAgICAgIHBvaW50cyA9IHBhdGguYXR0ciAncG9pbnRzJ1xuICAgICAgICBmb3IgeCwgaSBpbiBwb2ludHMgYnkgMlxuICAgICAgICAgIHggPSBwYXJzZUZsb2F0IHhcbiAgICAgICAgICB5ID0gcGFyc2VGbG9hdCBwb2ludHNbaSArIDFdXG4gICAgICAgICAgZW5kID0gbmV3IFBvaW50IHgsIHlcbiAgICAgICAgICBpZiBzdGFydD9cbiAgICAgICAgICAgIGRpc3RhbmNlID0gUG9pbnQuZGlzdGFuY2Ugc3RhcnQsIGVuZFxuICAgICAgICAgICAgaWYgbGVuZ3RoIDw9IGxlbiA8PSAobGVuZ3RoICs9IGRpc3RhbmNlKVxuICAgICAgICAgICAgICByZXR1cm4gUG9pbnQubGVycCBzdGFydCwgZW5kLCBsZW4gLyBQb2ludC5kaXN0YW5jZSBzdGFydCwgZW5kXG4gICAgICAgICAgc3RhcnQgPSBlbmRcbiAgICAgICAgcmV0dXJuXG4gICAgICBlbHNlXG4gICAgICAgIG5ldyBQb2ludCBwYXRoLmdldFBvaW50QXRMZW5ndGggbGVuXG4iLCJ7IHN0cmluZ2lmeSB9ID0gcmVxdWlyZSAnLi4vcXVlcnktc3RyaW5nJ1xuXG5cbiMjI1xuRmFjZWJvb2vjga7mj5DkvpvjgZnjgovjgrXjg7zjg5PjgrnjgpLliKnnlKjjgZnjgovjgZ/jgoHjga7jgq/jg6njgrnjgafjgZnjgIJcbiMjI1xubW9kdWxlLmV4cG9ydHMgPVxuY2xhc3MgRmFjZWJvb2tcblxuICAjIyNcbiAg44Km44Kn44OW44K144Kk44OI44KS44K344Kn44Ki44GZ44KL54K644GuVVJM44KS55Sf5oiQ44GX44G+44GZ44CCXG4gIEBwYXJhbSBbU3RyaW5nXSB1cmwg44Km44Kn44OW44K144Kk44OI44GuVVJM44Gn44GZ44CCXG4gIEByZXR1cm4gW1N0cmluZ10g44K344Kn44Ki44GZ44KL54K644GuVVJM44Gn44GZ44CCXG4gICMjI1xuICBAY3JlYXRlU2hhcmVVcmw6ICh1cmwpIC0+IFwiaHR0cDovL3d3dy5mYWNlYm9vay5jb20vc2hhcmUucGhwPyN7c3RyaW5naWZ5IHU6IHVybH1cIlxuXG4gICMjI1xuICDjgqbjgqfjg5bjgrXjgqTjg4jjga7jgrfjgqfjgqLmlbDjgpLlj5blvpfjgZfjgb7jgZnjgIJcbiAgQHBhcmFtIFtTdHJpbmddIHVybCDjgqbjgqfjg5bjgrXjgqTjg4jjga5VUkzjgafjgZnjgIJcbiAgQHBhcmFtIFtGdW5jdGlvbl0gY2FsbGJhY2sg44Kz44O844Or44OQ44OD44Kv44Gn44GZ44CCXG5cbiAgQGV4YW1wbGUg44Km44Kn44OW44K144Kk44OI44Gu44K344Kn44Ki5pWw44KS5Y+W5b6X44KSYWxlcnTjgZfjgb7jgZnjgIJcbiAgICAgIEZhY2Vib29rLmZldGNoQ291bnQgJ2h0dHA6Ly9leGFtcGxlLmNvbScsIChlcnIsIHNoYXJlcykgLT5cbiAgICAgICAgdGhyb3cgZXJyIGlmIGVycj9cbiAgICAgICAgYWxlcnQgc2hhcmVzXG4gICMjI1xuICBAZmV0Y2hTaGFyZUNvdW50OiAodXJsLCBjYWxsYmFjaykgLT5cbiAgICAkXG4gICAgLmFqYXhcbiAgICAgIHVybDogJ2h0dHBzOi8vZ3JhcGguZmFjZWJvb2suY29tLydcbiAgICAgIHR5cGU6ICdnZXQnXG4gICAgICBjYWNoZTogZmFsc2VcbiAgICAgIGRhdGE6XG4gICAgICAgIHVybDogdXJsXG4gICAgICBkYXRhVHlwZTogJ2pzb25wJ1xuICAgICAgc3VjY2VzczogKHsgc2hhcmVzIH0pIC0+XG4gICAgICAgIHVubGVzcyBzaGFyZXM/XG4gICAgICAgICAgY2FsbGJhY2sgJ25vIGRhdGEnXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIGNhbGxiYWNrIG51bGwsIHNoYXJlc1xuICAgICAgZXJyb3I6ICh7fSwgdHlwZSkgLT5cbiAgICAgICAgY2FsbGJhY2sgdHlwZVxuIiwieyBzdHJpbmdpZnkgfSA9IHJlcXVpcmUgJy4uL3F1ZXJ5LXN0cmluZydcblxuXG4jIyNcbkdvb2dsZSvjga7mj5DkvpvjgZnjgovjgrXjg7zjg5PjgrnjgpLliKnnlKjjgZnjgovjgZ/jgoHjga7jgq/jg6njgrnjgafjgZnjgIJcbiMjI1xubW9kdWxlLmV4cG9ydHMgPVxuY2xhc3MgVHdpdHRlclxuXG4gICMjI1xuICDjgqbjgqfjg5bjgrXjgqTjg4jjgpLjgrfjgqfjgqLjgZnjgovngrrjga5VUkzjgpLnlJ/miJDjgZfjgb7jgZnjgIJcbiAgQHBhcmFtIFtTdHJpbmddIHVybCDjgqbjgqfjg5bjgrXjgqTjg4jjga5VUkzjgafjgZnjgIJcbiAgQHJldHVybiBbU3RyaW5nXSDjgrfjgqfjgqLjgZnjgovngrrjga5VUkzjgafjgZnjgIJcbiAgIyMjXG4gIEBjcmVhdGVTaGFyZVVybDogKHVybCkgLT4gXCJodHRwczovL3BsdXMuZ29vZ2xlLmNvbS9zaGFyZT8je3N0cmluZ2lmeSB7dXJsfX1cIlxuXG4gICMjI1xuICDjgqbjgqfjg5bjgrXjgqTjg4jjga7jgrfjgqfjgqLmlbDjgpLlj5blvpfjgZfjgb7jgZnjgIJcbiAgQHBhcmFtIFtTdHJpbmddIHVybCDjgqbjgqfjg5bjgrXjgqTjg4jjga5VUkzjgafjgZnjgIJcbiAgQHBhcmFtIFtGdW5jdGlvbl0gY2FsbGJhY2sg44Kz44O844Or44OQ44OD44Kv44Gn44GZ44CCXG4gICMjI1xuICBAZmV0Y2hTaGFyZUNvdW50OiAodXJsLCBjYWxsYmFjaykgLT5cbiAgICAkXG4gICAgLmFqYXhcbiAgICAgIHVybDogXCJodHRwOi8vcXVlcnkueWFob29hcGlzLmNvbS92MS9wdWJsaWMveXFsP2Vudj1odHRwOi8vZGF0YXRhYmxlcy5vcmcvYWxsdGFibGVzLmVudiZxPSN7ZW5jb2RlVVJJQ29tcG9uZW50IFwiU0VMRUNUIGNvbnRlbnQgRlJPTSBkYXRhLmhlYWRlcnMgV0hFUkUgdXJsPSdodHRwczovL3BsdXNvbmUuZ29vZ2xlLmNvbS9fLysxL2Zhc3RidXR0b24/aGw9amEmdXJsPSN7dXJsfScgYW5kIHVhPScje3VhfSdcIn1cIlxuICAgICAgdHlwZTogJ2dldCdcbiAgICAgIGNhY2hlOiBmYWxzZVxuICAgICAgZGF0YVR5cGU6ICd4bWwnXG4gICAgICBlcnJvcjogKHt9LCB0eXBlKSAtPlxuICAgICAgICBjYWxsYmFjayB0eXBlXG4gICAgICBzdWNjZXNzOiAoZG9jdW1lbnQpIC0+XG4gICAgICAgIHN0ciA9ICQoZG9jdW1lbnQpLmZpbmQoJ2NvbnRlbnQnKS50ZXh0KCkubWF0Y2goLzxzY3JpcHQgdHlwZT1cInRleHRcXC9qYXZhc2NyaXB0XCI+d2luZG93XFwuX19TU1IgPSAoW1xcc1xcU10qPyk7LylbMV1cbiAgICAgICAgc3RyID0gc3RyLnJlcGxhY2UgL1xccj9cXG4vZywgJydcbiAgICAgICAgb2JqID0gbnVsbFxuICAgICAgICBldmFsIFwib2JqID0gI3tzdHJ9O1wiXG4gICAgICAgIGNvdW50ID0gb2JqLmxkWzFdWzRdXG5cbiAgICAgICAgdW5sZXNzIGNvdW50P1xuICAgICAgICAgIGNhbGxiYWNrICdubyBkYXRhJ1xuICAgICAgICAgIHJldHVyblxuICAgICAgICBjYWxsYmFjayBudWxsLCBwYXJzZUludCBjb3VudCwgMTBcbiIsIiMjI1xuSGF0ZW5h44Gu5o+Q5L6b44GZ44KL44K144O844OT44K544KS5Yip55So44GZ44KL44Gf44KB44Gu44Kv44Op44K544Gn44GZ44CCXG4jIyNcbm1vZHVsZS5leHBvcnRzID1cbmNsYXNzIEhhdGVuYVxuXG4gICMjI1xuICDjgqbjgqfjg5bjgrXjgqTjg4jjgpLjg5bjg4Pjgq/jg57jg7zjgq/jgZnjgovngrrjga5VUkzjgpLnlJ/miJDjgZfjgb7jgZnjgIJcbiAgQHBhcmFtIFtTdHJpbmddIHVybCDjgqbjgqfjg5bjgrXjgqTjg4jjga5VUkzjgafjgZnjgIJcbiAgQHJldHVybiBbU3RyaW5nXSDjg5bjg4Pjgq/jg57jg7zjgq/jgZnjgovngrrjga5VUkzjgafjgZnjgIJcbiAgIyMjXG4gIEBjcmVhdGVCb29rbWFya1VybDogKHVybCkgLT5cbiAgICAjIERvbid0IGVuY29kZSB1cmwuXG4gICAgXCJodHRwOi8vYi5oYXRlbmEubmUuanAvZW50cnkvYWRkLyN7dXJsfVwiXG4iLCJ7IHN0cmluZ2lmeSB9ID0gcmVxdWlyZSAnLi4vcXVlcnktc3RyaW5nJ1xueyBtb2JpbGUgfSA9IHJlcXVpcmUgJy4uLy4uL21vZGVscy9vcydcblxuXG4jIyNcbkxpbmXjga7mj5DkvpvjgZnjgovjgrXjg7zjg5PjgrnjgpLliKnnlKjjgZnjgovjgZ/jgoHjga7jgq/jg6njgrnjgafjgZnjgIJcbiMjI1xubW9kdWxlLmV4cG9ydHMgPVxuY2xhc3MgTGluZVxuXG4gICMjI1xuICDjg4bjgq3jgrnjg4jjgpLjg4Hjg6Pjg4Pjg4jjgZnjgovngrrjga5VUkzjgpLnlJ/miJDjgZfjgb7jgZnjgIJcbiAgQHBhcmFtIFtTdHJpbmddIHRleHQg44OG44Kt44K544OI44Gn44GZ44CCXG4gIEByZXR1cm4gW1N0cmluZ10g44OB44Oj44OD44OI44GZ44KL54K644GuVVJM44Gn44GZ44CCXG4gICMjI1xuICBAY3JlYXRlQ2hhdFVybDogKHRleHQpIC0+XG4gICAgdGV4dCA9IGVuY29kZVVSSUNvbXBvbmVudCB0ZXh0XG4gICAgaWYgbW9iaWxlXG4gICAgICBcImxpbmU6Ly9tc2cvdGV4dC8je3RleHR9XCJcbiAgICBlbHNlXG4gICAgICBcImh0dHA6Ly9saW5lLm5hdmVyLmpwL1IvbXNnL3RleHQvPyN7dGV4dH1cIlxuIiwieyBzdHJpbmdpZnkgfSA9IHJlcXVpcmUgJy4uL3F1ZXJ5LXN0cmluZydcblxuXG4jIyNcblBpbnRlcmVzdOOBruaPkOS+m+OBmeOCi+OCteODvOODk+OCueOCkuWIqeeUqOOBmeOCi+OBn+OCgeOBruOCr+ODqeOCueOBp+OBmeOAglxuIyMjXG5tb2R1bGUuZXhwb3J0cyA9XG5jbGFzcyBQaW50ZXJlc3RcblxuICAjIyNcbiAg44Km44Kn44OW44K144Kk44OI44KS44OU44Oz44GZ44KL54K644GuVVJM44KS55Sf5oiQ44GX44G+44GZ44CCXG4gIEBwYXJhbSBbT2JqZWN0XSBvcHRpb25zIOOCquODl+OCt+ODp+ODs+OBp+OBmeOAglxuICBAb3B0aW9uIG9wdGlvbnMgW1N0cmluZ10gdXJsIOOCpuOCp+ODluOCteOCpOODiOOBrlVSTOOBp+OBmeOAglxuICBAb3B0aW9uIG9wdGlvbnMgW1N0cmluZ10gbWVkaWEg55S75YOP562J44Gu44Oh44OH44Kj44Ki44GuVVJM44Gn44GZ44CCXG4gIEBvcHRpb24gb3B0aW9ucyBbU3RyaW5nXSBkZXNjcmlwdGlvbiDoqqzmmI7mlofjgafjgZnjgIJcbiAgQHJldHVybiBbU3RyaW5nXSDjgrfjgqfjgqLjgZnjgovngrrjga5VUkzjgafjgZnjgIJcbiAgIyMjXG4gIEBjcmVhdGVQaW5JdFVybDogKG9wdGlvbnMpIC0+XG4gICAgXCJodHRwOi8vd3d3LnBpbnRlcmVzdC5jb20vcGluL2NyZWF0ZS9idXR0b24vPyN7c3RyaW5naWZ5IG9wdGlvbnN9XCJcbiIsInsgc3RyaW5naWZ5IH0gPSByZXF1aXJlICcuLi9xdWVyeS1zdHJpbmcnXG5cblxuIyMjXG5Ud2l0dGVy44Gu5o+Q5L6b44GZ44KL44K144O844OT44K544KS5Yip55So44GZ44KL44Gf44KB44Gu44Kv44Op44K544Gn44GZ44CCXG4jIyNcbm1vZHVsZS5leHBvcnRzID1cbmNsYXNzIFR3aXR0ZXJcblxuICAjIyNcbiAg44Km44Kn44OW44K144Kk44OI44KS44OE44Kk44O844OI44GZ44KL54K644GuVVJM44KS55Sf5oiQ44GX44G+44GZ44CCXG4gIEBwYXJhbSBbT2JqZWN0XSBvcHRpb25zIOOCquODl+OCt+ODp+ODs+OBp+OBmeOAglxuICBAb3B0aW9uIG9wdGlvbnMgW1N0cmluZ10gdGV4dCDoqqzmmI7mlofjgafjgZnjgIJcbiAgQG9wdGlvbiBvcHRpb25zIFtTdHJpbmddIHVybCDjgqbjgqfjg5bjgrXjgqTjg4jjga5VUkzjgafjgZnjgIJcbiAgQG9wdGlvbiBvcHRpb25zIFtTdHJpbmddIGhhc2h0YWdzIOODj+ODg+OCt+ODpeOCv+OCsOOBp+OBmeOAglxuICBAcmV0dXJuIFtTdHJpbmddIOODhOOCpOODvOODiOOBmeOCi+eCuuOBrlVSTOOBp+OBmeOAglxuICAjIyNcbiAgQGNyZWF0ZVR3ZWV0VXJsOiAoe3RleHQsIHVybCwgaGFzaHRhZ3N9KSAtPlxuICAgIFwiaHR0cDovL3R3aXR0ZXIuY29tL3NoYXJlPyN7c3RyaW5naWZ5IHt0ZXh0LCB1cmwsIGhhc2h0YWdzfX1cIlxuXG4gICMjI1xuICDjgqbjgqfjg5bjgrXjgqTjg4jjga7jg4TjgqTjg7zjg4jmlbDjgpLlj5blvpfjgZfjgb7jgZnjgIJcbiAgQHBhcmFtIFtTdHJpbmddIHVybCDjgqbjgqfjg5bjgrXjgqTjg4jjga5VUkzjgafjgZnjgIJcbiAgQHBhcmFtIFtGdW5jdGlvbl0gY2FsbGJhY2sg44Kz44O844Or44OQ44OD44Kv44Gn44GZ44CCXG4gICMjI1xuICBAZmV0Y2hUd2VldENvdW50OiAodXJsLCBjYWxsYmFjaykgLT5cbiAgICAkXG4gICAgLmFqYXhcbiAgICAgIHVybDogJ2h0dHA6Ly91cmxzLmFwaS50d2l0dGVyLmNvbS8xL3VybHMvY291bnQuanNvbidcbiAgICAgIHR5cGU6ICdnZXQnXG4gICAgICBjYWNoZTogZmFsc2VcbiAgICAgIGRhdGE6IHVybDogdXJsXG4gICAgICBkYXRhVHlwZTogJ2pzb25wJ1xuICAgICAgZXJyb3I6ICh7fSwgdHlwZSkgLT5cbiAgICAgICAgY2FsbGJhY2sgdHlwZVxuICAgICAgc3VjY2VzczogKHsgY291bnQgfSkgLT5cbiAgICAgICAgdW5sZXNzIGNvdW50P1xuICAgICAgICAgIGNhbGxiYWNrICdubyBkYXRhJ1xuICAgICAgICAgIHJldHVyblxuICAgICAgICBjYWxsYmFjayBudWxsLCBjb3VudFxuIiwiIyMjXG5BbmNob3IgaXMgYSB3cmFwcGVyIG9mIDxhIGhyZWY9XCIjKlwiPi5cbiMjI1xuXG5WaWV3ID0gcmVxdWlyZSAnLi92aWV3J1xuJCA9IHJlcXVpcmUgJ2pxdWVyeSdcblxuXG5tb2R1bGUuZXhwb3J0cyA9XG5jbGFzcyBBbmNob3IgZXh0ZW5kcyBWaWV3XG5cbiAgIyMjXG4gIENyZWF0ZXMgYSBBbmNob3IgaW5zdGFuY2UuXG4gICMjI1xuICBjb25zdHJ1Y3RvcjogLT5cbiAgICBzdXBlclxuXG4gICAgQG9uICdjbGljaycsIEBvbkNsaWNrXG5cbiAgIyMjXG4gIENsaWNrIGV2ZW50XG4gICMjI1xuICBvbkNsaWNrOiAoZSkgPT5cbiAgICBocmVmID0gQGF0dHIgJ2hyZWYnXG4gICAgaWYgaHJlZiBpcyAnIydcbiAgICAgIHRvcCA9IDBcbiAgICBlbHNlXG4gICAgICAkZWwgPSAkIGhyZWZcbiAgICAgIHJldHVybiBpZiAkZWwubGVuZ3RoIGlzIDBcbiAgICAgIHRvcCA9ICRlbC5vZmZzZXQoKS50b3BcblxuICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgJCAnaHRtbCxib2R5J1xuICAgIC5zdG9wIHRydWUsIGZhbHNlXG4gICAgLmFuaW1hdGVcbiAgICAgIHNjcm9sbFRvcDogdG9wXG4gICAgLCA2MDAgIywgJ2Vhc2VPdXRRdWFkJ1xuIiwiIyMjXG5CcmVha3BvaW50IGNhbGwgcmVnaXN0ZXJlZCBjYWxsYmFjayB3aGVuIHdpbmRvdyB3aWR0aCBjb250YWlucyByZWdpc3RlcmVkIHJhbmdlLlxuIyMjXG5cblZpZXcgPSByZXF1aXJlICcuL3ZpZXcnXG5cbm1vZHVsZS5leHBvcnRzID1cbmNsYXNzIEJyZWFrcG9pbnQgZXh0ZW5kcyBWaWV3XG5cbiAgYnJlYWtwb2ludDoge1xuICAgICMnMC4uNjQwJzogJ29uU21hbGxlclRoYW42NDAnXG4gIH1cblxuICAjIyNcbiAgQ3JlYXRlcyBhIEJyZWFrcG9pbnQgaW5zdGFuY2UuXG4gICMjI1xuICBjb25zdHJ1Y3RvcjogLT5cbiAgICBzdXBlclxuXG4gICAgQGJyZWFrcG9pbnRzID0gW11cbiAgICBmb3IgY29uZGl0aW9uLCBjYWxsYmFjayBvZiBAYnJlYWtwb2ludFxuICAgICAgbWF0Y2hlZCA9IGNvbmRpdGlvbi5tYXRjaCAvXihcXGQqKShcXC57MiwzfSkoXFxkKikkL1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvciAnYnJlYWtwb2ludCBzaG91bGQgYmUgd3JpdHRlbiBsaWtlIDY0MC4uMTA4MCBvciA2NDAuLi4xMDgwJyB1bmxlc3MgbWF0Y2hlZD9cbiAgICAgIEBicmVha3BvaW50cy5wdXNoXG4gICAgICAgIHN0YXJ0ICAgICAgICA6IGlmIG1hdGNoZWRbMV0gaXMgJycgdGhlbiBOdW1iZXIuTUlOX1ZBTFVFIGVsc2UgcGFyc2VGbG9hdCBtYXRjaGVkWzFdXG4gICAgICAgIGVuZCAgICAgICAgICA6IGlmIG1hdGNoZWRbM10gaXMgJycgdGhlbiBOdW1iZXIuTUFYX1ZBTFVFIGVsc2UgcGFyc2VGbG9hdCBtYXRjaGVkWzNdXG4gICAgICAgIGlzQ29udGFpbnNFbmQ6IG1hdGNoZWRbMl0ubGVuZ3RoIGlzIDJcbiAgICAgICAgY2FsbGJhY2sgICAgIDogQFtjYWxsYmFja11cbiAgICBAY29uc3RydWN0b3IuJHdpbmRvd1xuICAgIC5vbiAnbG9hZCcsIEBvbldpbmRvd0xvYWRcbiAgICAub24gJ3Jlc2l6ZScsIEBvbldpbmRvd1Jlc2l6ZWRcblxuICAjIyNcbiAgU3RvcHMgbGlzdGVuaW5nIGV2ZW50cyBhbmQgZGVsZXRlcyByZWZlcmVuY2VzLlxuICAjIyNcbiAgZGVzdHJ1Y3Q6IC0+XG4gICAgQGNvbnN0cnVjdG9yLiR3aW5kb3cub2ZmICdsb2FkJywgQG9uV2luZG93TG9hZFxuICAgIEBjb25zdHJ1Y3Rvci4kd2luZG93Lm9mZiAncmVzaXplJywgQG9uV2luZG93UmVzaXplZFxuICAgIHN1cGVyXG5cbiAgb25XaW5kb3dMb2FkOiA9PlxuICAgIEBvbldpbmRvd1Jlc2l6ZWQoKVxuXG4gICMjI1xuICBDYWxscyBjYWxsYmFja3MgY29udGFpbnMgY3VycmVudCB3aW5kb3cgd2lkdGguXG4gICMjI1xuICBvbldpbmRvd1Jlc2l6ZWQ6ID0+XG4gICAgd2luZG93V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCA/IEBjb25zdHJ1Y3Rvci4kd2luZG93LmlubmVyV2lkdGgoKVxuICAgIGZvciB7IHN0YXJ0LCBlbmQsIGlzQ29udGFpbnNFbmQsIGNhbGxiYWNrIH0gaW4gQGJyZWFrcG9pbnRzXG4gICAgICBpZiBpc0NvbnRhaW5zRW5kXG4gICAgICAgIGlmIHN0YXJ0IDw9IHdpbmRvd1dpZHRoIDw9IGVuZFxuICAgICAgICAgIGNhbGxiYWNrLmNhbGwgQCwgd2luZG93V2lkdGhcbiAgICAgIGVsc2VcbiAgICAgICAgaWYgc3RhcnQgPD0gd2luZG93V2lkdGggPCBlbmRcbiAgICAgICAgICBjYWxsYmFjay5jYWxsIEAsIHdpbmRvd1dpZHRoXG4gICAgQG9uUmVzaXplZCgpXG5cbiAgIyMjXG4gIENhbGxlZCBhZnRlciBhbGwgY2FsbGJhY2tzIGFyZSBjYWxsZWQuXG4gICMjI1xuICBvblJlc2l6ZWQ6IC0+XG4iLCIjIyNcbkNoZWNrYm94IGlzIGEgd3JhcHBlciBvZiA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCI+LlxuIyMjXG5cblZpZXcgPSByZXF1aXJlICcuL3ZpZXcnXG5cbm1vZHVsZS5leHBvcnRzID1cbmNsYXNzIENoZWNrYm94IGV4dGVuZHMgVmlld1xuXG4gIGNoZWNrZWQ6ICdpcy1jaGVja2VkJ1xuXG4gICMjI1xuICBDcmVhdGVzIGEgQ2hlY2tib3ggaW5zdGFuY2UuXG4gICMjI1xuICBjb25zdHJ1Y3RvcjogLT5cbiAgICBzdXBlclxuICAgIEAkY2hlY2tib3ggPSBAJCAnaW5wdXRbdHlwZT1jaGVja2JveF0nXG4gICAgLm9uICdjaGFuZ2UnLCBAdXBkYXRlXG4gICAgQHVwZGF0ZSgpXG5cbiAgIyMjXG4gIFJlZmxlY3RzIGNoZWNrZWQgc3RhdHVzIG9mIHRoZSByYXcgZWxlbWVudCB0byBteXNlbGYuXG4gICMjI1xuICB1cGRhdGU6ID0+XG4gICAgaWYgQCRjaGVja2JveC5wcm9wICdjaGVja2VkJ1xuICAgICAgQGFkZENsYXNzIEBjaGVja2VkXG4gICAgZWxzZVxuICAgICAgQHJlbW92ZUNsYXNzIEBjaGVja2VkXG4iLCIjIyNcbkRyYXdlciBjbGFzcy5cbiMjI1xuXG5WaWV3ID0gcmVxdWlyZSAnLi92aWV3J1xuXG5tb2R1bGUuZXhwb3J0cyA9XG5jbGFzcyBEcmF3ZXIgZXh0ZW5kcyBWaWV3XG5cbiAgc2VsZWN0b3JCdXR0b246ICcuanMtYnV0dG9uJ1xuICBzZWxlY3RvckNvbnRlbnQ6ICcuanMtY29udGVudCdcbiAgY2xhc3NPcGVuZWQ6ICdpcy1vcGVuZWQnXG5cbiAgY29uc3RydWN0b3I6IC0+XG4gICAgc3VwZXJcbiAgICBAJCBAc2VsZWN0b3JCdXR0b25cbiAgICAub24gJ2NsaWNrJywgQHRvZ2dsZVxuICAgIEBjb250ZW50ID0gQCQgQHNlbGVjdG9yQ29udGVudFxuXG4gIHRvZ2dsZTogKHt9LCBpbmRleCkgPT5cbiAgICBpZiBAaGFzQ2xhc3MgQGNsYXNzT3BlbmVkXG4gICAgICBAcmVtb3ZlQ2xhc3MgQGNsYXNzT3BlbmVkXG4gICAgICBAY29udGVudFxuICAgICAgLnN0b3AgdHJ1ZSwgZmFsc2VcbiAgICAgIC5zbGlkZVVwKClcbiAgICBlbHNlXG4gICAgICBAYWRkQ2xhc3MgQGNsYXNzT3BlbmVkXG4gICAgICBAY29udGVudFxuICAgICAgLnN0b3AgdHJ1ZSwgZmFsc2VcbiAgICAgIC5zbGlkZURvd24oKVxuIiwiVmlldyA9IHJlcXVpcmUgJy4vdmlldydcbnsgbXNpZSwgdmVyc2lvbk51bWJlciB9ID0gcmVxdWlyZSAnLi4vbW9kZWxzL2Jyb3dzZXInXG4kID0gcmVxdWlyZSAnanF1ZXJ5J1xuXG5cbiMjI1xuSW1hZ2Xjgq/jg6njgrnjgafjgZnjgIJcbmA8aW1nPmDopoHntKDjga7ooajnpLrnirbmhYvjgavjgYvjgYvjgo/jgonjgZrjgIHnlLvlg4/jgpLjg63jg7zjg4njgZfjgrXjgqTjgrrjgpLlj5blvpfjgZnjgovjgZPjgajjgYzjgafjgY3jgb7jgZnjgIJcbiMjI1xubW9kdWxlLmV4cG9ydHMgPVxuY2xhc3MgSW1hZ2UgZXh0ZW5kcyBWaWV3XG5cbiAgIyMjXG4gIEltYWdl44Kk44Oz44K544K/44Oz44K544KS55Sf5oiQ44GX44G+44GZ44CCXG4gICMjI1xuICBjb25zdHJ1Y3RvcjogLT5cbiAgICBzdXBlclxuICAgIEBzcmMgPSBAYXR0ciAnc3JjJ1xuICAgIEBsb2FkZXIgPSAkICc8aW1nPidcbiAgICBAd3JhcHBlciA9ICQgJzxkaXY+J1xuICAgIC5hdHRyXG4gICAgICB3aWR0aDogMFxuICAgICAgaGVpZ2h0OiAwXG4gICAgICBvdmVyZmxvdzogJ2hpZGRlbidcbiAgICAgIHZpc2liaWxpdHk6ICdoaWRkZW4nXG4gICAgLmFwcGVuZCBAbG9hZGVyXG5cbiAgIyMjXG4gIOeUu+WDj+OCkuODreODvOODieOBl+OBvuOBmeOAglxuICBAZXZlbnQgJ2ltYWdlLmNvbXBsZXRlJ1xuICAjIyNcbiAgbG9hZDogKHNyYykgLT5cbiAgICBpZiBzcmM/XG4gICAgICBAc3JjID0gc3JjXG4gICAgcmV0dXJuIGlmIEBzcmMgaXMgJydcblxuICAgIEB1bmxvYWQoKVxuICAgIEBzdGFydExpc3RlbmluZygpXG4gICAgQGxvYWRlci5hdHRyIHNyYzogaWYgbXNpZSBhbmQgdmVyc2lvbk51bWJlciA8IDlcbiAgICAgIFwiI3tAc3JjfT8je25ldyBEYXRlKCkuZ2V0VGltZSgpfVwiXG4gICAgZWxzZVxuICAgICAgQHNyY1xuXG4gICMjI1xuICDnlLvlg4/jgpLjgqLjg7Pjg63jg7zjg4njgZfjgb7jgZnjgIJcbiAgIyMjXG4gIHVubG9hZDogLT5cbiAgICBAc3RvcExpc3RlbmluZygpXG4gICAgQGxvYWRlci5hdHRyIHNyYzogJydcblxuICAjIyNcbiAgQHByaXZhdGVcbiAgIyMjXG4gIHN0YXJ0TGlzdGVuaW5nOiAtPlxuICAgIEBsb2FkZXIub25lICdsb2FkIGVycm9yJywgQG9uTG9hZENvbXBsZXRlXG5cbiAgIyMjXG4gIEBwcml2YXRlXG4gICMjI1xuICBzdG9wTGlzdGVuaW5nOiAtPlxuICAgIEBsb2FkZXIub2ZmICdsb2FkIGVycm9yJywgQG9uTG9hZENvbXBsZXRlXG5cbiAgIyMjXG4gIEBwcml2YXRlXG4gICMjI1xuICBvbkxvYWRDb21wbGV0ZTogPT5cbiAgICBAc3RvcExpc3RlbmluZygpXG4gICAgQHdyYXBwZXIuYXBwZW5kVG8gJ2JvZHknXG4gICAgQGF0dHJcbiAgICAgIHNyYzogQHNyY1xuICAgICAgd2lkdGg6IEBsb2FkZXIud2lkdGgoKVxuICAgICAgaGVpZ2h0OiBAbG9hZGVyLndpZHRoKClcbiAgICBAd3JhcHBlci5yZW1vdmUoKVxuICAgIEB0cmlnZ2VyICdpbWFnZS5sb2FkZWQnXG4iLCJWaWV3ID0gcmVxdWlyZSAnLi92aWV3J1xueyBhc3NpZ24gfSA9IHJlcXVpcmUgJ2xvZGFzaCdcbmlvdGEgPSByZXF1aXJlKCcuLi9tb2RlbHMvaW90YScpKClcblxuXG5tb2R1bGUuZXhwb3J0cyA9XG5jbGFzcyBNYXNrRmFjdG9yeSBleHRlbmRzIFZpZXdcblxuICBATEVGVDogMSA8PCBpb3RhKClcbiAgQFJJR0hUOiAxIDw8IGlvdGEoKVxuICBAVE9QOiAxIDw8IGlvdGEoKVxuICBAQk9UVE9NOiAxIDw8IGlvdGEoKVxuXG4gIGNsYXNzT3V0ZXI6ICdqcy1tYXNrZmFjdG9yeS1vdXRlcidcbiAgY2xhc3NNYXNrOiAnanMtbWFza2ZhY3RvcnktbWFzaydcbiAgY2xhc3NJbm5lcjogJ2pzLW1hc2tmYWN0b3J5LWlubmVyJ1xuXG4gIGNvbnN0cnVjdG9yOiAoe30sIEBvcmlnaW4gPSBAY29uc3RydWN0b3IuTEVGVCkgLT5cbiAgICBzdXBlclxuXG4gICAgQG91dGVyID0gQHdyYXBJbm5lciAnPGRpdj4nXG4gICAgLmNoaWxkcmVuKClcbiAgICAuYWRkQ2xhc3MgQGNsYXNzT3V0ZXJcblxuICAgIEBtYXNrID0gQG91dGVyLndyYXBJbm5lciAnPGRpdj4nXG4gICAgLmNoaWxkcmVuKClcbiAgICAuYWRkQ2xhc3MgQGNsYXNzTWFza1xuICAgIC5jc3NcbiAgICAgIHdpZHRoOiAnMTAwJSdcbiAgICAgIGhlaWdodDogJzEwMCUnXG5cbiAgICBAaW5uZXIgPSBAbWFzay53cmFwSW5uZXIgJzxkaXY+J1xuICAgIC5jaGlsZHJlbigpXG4gICAgLmFkZENsYXNzIEBjbGFzc0lubmVyXG5cbiAgICBpZiAoQG9yaWdpbiAmIEBjb25zdHJ1Y3Rvci5MRUZUKSBpcyBAY29uc3RydWN0b3IuTEVGVFxuICAgICAgQG1hc2suY3NzIGxlZnQ6IDBcbiAgICAgIEBpbm5lci5jc3MgbGVmdDogMFxuICAgIGlmIChAb3JpZ2luICYgQGNvbnN0cnVjdG9yLlJJR0hUKSBpcyBAY29uc3RydWN0b3IuUklHSFRcbiAgICAgIEBtYXNrLmNzcyByaWdodDogMFxuICAgICAgQGlubmVyLmNzcyByaWdodDogMFxuICAgIGlmIChAb3JpZ2luICYgQGNvbnN0cnVjdG9yLlRPUCkgaXMgQGNvbnN0cnVjdG9yLlRPUFxuICAgICAgQG1hc2suY3NzIHRvcDogMFxuICAgICAgQGlubmVyLmNzcyB0b3A6IDBcbiAgICBpZiAoQG9yaWdpbiAmIEBjb25zdHJ1Y3Rvci5CT1RUT00pIGlzIEBjb25zdHJ1Y3Rvci5CT1RUT01cbiAgICAgIEBtYXNrLmNzcyBib3R0b206IDBcbiAgICAgIEBpbm5lci5jc3MgYm90dG9tOiAwXG5cbiAgICBAY29uc3RydWN0b3IuJHdpbmRvdy5vbiAnbG9hZCByZXNpemUnLCBAb25XaW5kb3dSZXNpemVkXG4gICAgQG9uV2luZG93UmVzaXplZCgpXG5cbiAgZ2V0TWFzazogLT4gQG1hc2tcblxuICBvbldpbmRvd1Jlc2l6ZWQ6ID0+XG4gICAgbWFza0NzcyA9XG4gICAgICB3aWR0aDogQG1hc2tbMF0uc3R5bGUud2lkdGhcbiAgICAgIGhlaWdodDogQG1hc2tbMF0uc3R5bGUuaGVpZ2h0XG5cbiAgICBAb3V0ZXJcbiAgICAuY3NzXG4gICAgICBwb3NpdGlvbjogJydcbiAgICBAbWFza1xuICAgIC5jc3NcbiAgICAgIHBvc2l0aW9uOiAnJ1xuICAgICAgb3ZlcmZsb3c6ICcnXG4gICAgICB3aWR0aDogJydcbiAgICAgIGhlaWdodDogJydcbiAgICBAaW5uZXJcbiAgICAuY3NzXG4gICAgICBwb3NpdGlvbjogJydcblxuICAgIHNpemVDc3MgPVxuICAgICAgd2lkdGg6IEB3aWR0aCgpXG4gICAgICBoZWlnaHQ6IEBoZWlnaHQoKVxuXG4gICAgQG91dGVyXG4gICAgLmNzcyBhc3NpZ24gc2l6ZUNzcyxcbiAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnXG4gICAgQG1hc2tcbiAgICAuY3NzIGFzc2lnbiBtYXNrQ3NzLFxuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZSdcbiAgICAgIG92ZXJmbG93OiAnaGlkZGVuJ1xuICAgIEBpbm5lclxuICAgIC5jc3MgYXNzaWduIHNpemVDc3MsXG4gICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJ1xuIiwiVmlldyA9IHJlcXVpcmUgJy4vdmlldydcblxuXG4jIyNcbuODpuODvOOCtuOCpOODmeODs+ODiOOBruS8neaSreOCkuWBnOatouOBmeOCi1ZpZXfjgafjgZnjgIJcbiMjI1xubW9kdWxlLmV4cG9ydHMgPVxuY2xhc3MgUHJldmVudGFibGUgZXh0ZW5kcyBWaWV3XG5cbiAgIyMjXG4gIEBwcml2YXRlXG4gIEBwcm9wZXJ0eSBTdHJpbmcg5YGc5q2i5a++6LGh44Gu44Kk44OZ44Oz44OI44Gn44GZ44CCXG4gICMjI1xuICBldmVudHM6ICdcbiAgICBibHVyIGZvY3VzIGZvY3VzaW4gZm9jdXNvdXQgbG9hZCByZXNpemUgc2Nyb2xsIHVubG9hZCBjbGljayBkYmxjbGlja1xuICAgIG1vdXNlZG93biBtb3VzZXVwIG1vdXNlbW92ZSBtb3VzZW92ZXIgbW91c2VvdXQgbW91c2VlbnRlciBtb3VzZWxlYXZlXG4gICAgY2hhbmdlIHNlbGVjdCBzdWJtaXQga2V5ZG93biBrZXlwcmVzcyBrZXl1cCBlcnJvclxuICAgICdcblxuICAjIyNcbiAg44Kk44Oz44K544K/44Oz44K544KS55Sf5oiQ44GX44G+44GZ44CCXG4gICMjI1xuICBjb25zdHJ1Y3RvcjogLT5cbiAgICBzdXBlclxuXG4gICAgQGVuYWJsZWQgPSB0cnVlXG4gICAgQG9uIEBldmVudHMsIEBvbk1vdXNlXG5cbiAgIyMjXG4gIEBwcml2YXRlXG4gIOOCpOODmeODs+ODiOeZuueUn+aZguOBq2BlbmFibGVkYOOBjGBmYWxzZWDjgarjgonjgqTjg5njg7Pjg4jjgavplqLjgZnjgovlhajjgabjga7li5XkvZzjgpLlgZzmraLjgZfjgb7jgZnjgIJcblxuICAxLiDjg4fjg5Xjgqnjg6vjg4jli5XkvZzjgpLlgZzmraLjgZfjgb7jgZnjgIJcbiAgMi4g44Kk44OZ44Oz44OI44Gu5Lyd5pKt44KS5YGc5q2i44GX44G+44GZ44CCXG4gIDMuIOOBk+OBruOCpOODs+OCueOCv+ODs+OCueOBruOCs+ODs+OCueODiOODqeOCr+OCv+S7pemZjeOBq+eZu+mMsuOBleOCjOOBn+OCpOODmeODs+ODiOOBruOCs+ODvOODq+ODkOODg+OCr+OCkuOCs+ODvOODq+OBl+OBvuOBm+OCk+OAglxuICAjIyNcbiAgb25Nb3VzZTogKGUpID0+XG4gICAgdW5sZXNzIEBlbmFibGVkXG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKClcbiIsIlZpZXcgPSByZXF1aXJlICcuL3ZpZXcnXG4kID0gcmVxdWlyZSAnanF1ZXJ5J1xuXG5cbiMjI1xuYDxpbnB1dCB0eXBlPVwicmFkaW9cIj5g44KS44K544K/44Kk44Oq44Oz44Kw44GZ44KL44Gf44KB44Gu44Op44OD44OR44Gn44GZ44CCXG7jg6njgrjjgqrjg5zjgr/jg7Pjga7nirbmhYvjgpLjgq/jg6njgrnjgajjgZfjgabopoHntKDjgavku5jkuI7jgZnjgovjgZPjgajjgadDU1PjgavnirbmhYvjgpLkvJ3pgZTjgZfjgb7jgZnjgIJcblxu44Op44K444Kq44Oc44K/44Oz44GM5YWD44CF44KC44Gj44Gm44GE44KL5LiL6KiY44Gu5qmf6IO944KS44K144Od44O844OI44GX44G+44GZ44CCXG4tIGBzZWxlY3RlZGDlsZ7mgKfjgYzku5jjgYTjgabjgYTjgovloLTlkIjjga/liJ3mnJ/ljJbmmYLjgavpgbjmip7jgZXjgozjgabjgYTjgovjgq/jg6njgrnjgpLku5jkuI7jgZfjgb7jgZnjgIJcbi0gYG5hbWVg5bGe5oCn44Gr44KI44KL44Kw44Or44O844OU44Oz44Kw44GM5pyJ5Yq544Gn44GZ44CCXG7jgrDjg6vjg7zjg5fjga7kuK3jga4x44Gk44GM44Om44O844K244Gr44KI44KK6YG45oqe44GV44KM44KL44Go5pei44Gr6YG45oqe44GV44KM44Gm44GE44Gf44Op44K444Kq44Oc44K/44Oz44Gv6YG45oqe54q25oWL44Gn44Gv44Gq44GP44Gq44KK44G+44GZ44CCXG5cbkBleGFtcGxlIOODqeOCuOOCquODnOOCv+ODs+OBruODnuODvOOCr+OCouODg+ODl1xuICAgIDxzcGFuIGNsYXNzPVwicmFkaW9cIj5cbiAgICAgIDxpbnB1dCB0eXBlPVwicmFkaW9cIj5cbiAgICA8L3NwYW4+XG4jIyNcbm1vZHVsZS5leHBvcnRzID1cbmNsYXNzIFJhZGlvIGV4dGVuZHMgVmlld1xuXG4gICMjI1xuICBAcHJvcGVydHkgU3RyaW5nIOODqeOCuOOCquODnOOCv+ODs+OBjGBjaGVja2VkYOOBq+OBquOBo+OBn+mam+OBq+imgee0oOOBq+S7mOS4juOBleOCjOOCi+OCr+ODqeOCueWQjeOBp+OBmeOAglxuICAjIyNcbiAgY2hlY2tlZDogJ2lzLWNoZWNrZWQnXG5cbiAgIyMjXG4gIOOCpOODs+OCueOCv+ODs+OCueOCkueUn+aIkOOBl+OBvuOBmeOAglxuICAjIyNcbiAgY29uc3RydWN0b3I6IC0+XG4gICAgc3VwZXJcbiAgICBAcmFkaW8gPSBAJCAnaW5wdXRbdHlwZT1yYWRpb10nXG4gICAgLm9uICdjaGFuZ2UgcmFkaW9DaGFuZ2UnLCBAdXBkYXRlXG4gICAgaWYgKG5hbWUgPSBAcmFkaW8uYXR0ciAnbmFtZScpIGlzbnQgJydcbiAgICAgIEBvdGhlclJhZGlvcyA9ICQgXCJpbnB1dFt0eXBlPXJhZGlvXVtuYW1lPSN7bmFtZX1dXCJcbiAgICAgIC5ub3QgQHJhZGlvXG4gICAgQHVwZGF0ZSgpXG5cbiAgIyMjXG4gIEBwcml2YXRlXG4gIOODqeOCuOOCquODnOOCv+ODs+OBrueKtuaFi+OBq+OCiOOCiuOCr+ODqeOCueOCkuS7mOS4juODu+mZpOWOu+OBl+OBvuOBmeOAglxuICAjIyNcbiAgdXBkYXRlOiA9PlxuICAgIGlmIEByYWRpby5wcm9wICdjaGVja2VkJ1xuICAgICAgQGFkZENsYXNzIEBjaGVja2VkXG4gICAgICBAb3RoZXJSYWRpb3M/LnRyaWdnZXIgJ3JhZGlvQ2hhbmdlJ1xuICAgIGVsc2VcbiAgICAgIEByZW1vdmVDbGFzcyBAY2hlY2tlZFxuIiwiIyMjXG5TZWxlY3QgaXMgYSB3cmFwcGVyIG9mIDxpbnB1dCB0eXBlPVwicmFkaW9cIj4uXG4jIyNcblxuVmlldyA9IHJlcXVpcmUgJy4vdmlldydcblxubW9kdWxlLmV4cG9ydHMgPVxuY2xhc3MgU2VsZWN0IGV4dGVuZHMgVmlld1xuXG4gIGxhYmVsOiAnLmpzLWxhYmVsJ1xuXG4gICMjI1xuICBDcmVhdGVzIGEgU2VsZWN0IGluc3RhbmNlLlxuICAjIyNcbiAgY29uc3RydWN0b3I6IC0+XG4gICAgc3VwZXJcbiAgICBAJGxhYmVsID0gQCQgQGxhYmVsXG4gICAgQCRzZWxlY3QgPSBAJCAnc2VsZWN0J1xuICAgIC5vbiAnY2hhbmdlJywgQHVwZGF0ZVxuICAgIEB1cGRhdGUoKVxuXG4gICMjI1xuICBSZWZsZWN0cyBzZWxlY3RlZCB0ZXh0IG9mIHRoZSByYXcgZWxlbWVudCB0byB0aGUgbGFiZWwgZWxlbWVudC5cbiAgIyMjXG4gIHVwZGF0ZTogPT5cbiAgICBAJGxhYmVsLnRleHQgQCRzZWxlY3QuZmluZCgnb3B0aW9uOnNlbGVjdGVkJykudGV4dCgpXG4iLCIjIyNcblNlbGVjdGFibGUgY2xhc3MuXG4jIyNcblxuVmlldyA9IHJlcXVpcmUgJy4vdmlldydcblxuXG5tb2R1bGUuZXhwb3J0cyA9XG5jbGFzcyBTZWxlY3RhYmxlIGV4dGVuZHMgVmlld1xuXG4gIGNvbnN0cnVjdG9yOiAtPlxuICAgIHN1cGVyXG4gICAgQHNlbGVjdGVlcyA9IEBjaGlsZHJlbigpXG4gICAgLm9uICdjbGljaycsIEB0b2dnbGVcblxuICB0b2dnbGU6IChlKSA9PlxuICAgIHNlbGVjdGVkSW5kZXggPSBAc2VsZWN0ZWVzLmluZGV4IGUuY3VycmVudFRhcmdldFxuICAgIEBzZWxlY3RBdCBzZWxlY3RlZEluZGV4XG4gICAgQHRyaWdnZXIgJ3NlbGVjdGFibGUuY2hhbmdlZCcsIHNlbGVjdGVkSW5kZXhcblxuICBzZWxlY3RBdDogKHNlbGVjdGVkSW5kZXgpIC0+XG4gICAgQHNlbGVjdGVlc1xuICAgIC5yZW1vdmVDbGFzcyAnaXMtc2VsZWN0ZWQnXG4gICAgLmVxIHNlbGVjdGVkSW5kZXhcbiAgICAuYWRkQ2xhc3MgJ2lzLXNlbGVjdGVkJ1xuIiwiJCA9IHJlcXVpcmUgJ2pxdWVyeSdcblZpZXcgPSByZXF1aXJlICcuL3ZpZXcnXG5pb3RhID0gcmVxdWlyZSgnLi4vbW9kZWxzL2lvdGEnKSgpXG5cbmhhc0FscGhhID0gKHsgZGF0YSB9KSAtPlxuICBmb3Ige30sIGkgaW4gZGF0YSBieSA0XG4gICAgaWYgZGF0YVtpICsgM10gaXNudCAwXG4gICAgICByZXR1cm4gdHJ1ZVxuICBmYWxzZVxuXG5tb2R1bGUuZXhwb3J0cyA9XG5jbGFzcyBTbGljZXIgZXh0ZW5kcyBWaWV3XG5cbiAgQFg6IDEgPDwgaW90YSgpXG4gIEBZOiAxIDw8IGlvdGEoKVxuXG4gIEByZXBsYWNlOiAoaW1nLCBkaXJlY3Rpb24gPSBTbGljZXIuWCwgZmlsdGVyKSAtPlxuICAgICRpbWcgPSAkIGltZ1xuICAgIHdpZHRoID0gJGltZy53aWR0aCgpXG4gICAgaGVpZ2h0ID0gJGltZy5oZWlnaHQoKVxuICAgICRjYW52YXMgPSAkICc8Y2FudmFzPidcbiAgICAuYXR0clxuICAgICAgd2lkdGg6IHdpZHRoXG4gICAgICBoZWlnaHQ6IGhlaWdodFxuICAgIGNhbnZhcyA9ICRjYW52YXNbMF1cbiAgICBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQgJzJkJ1xuICAgIGNvbnRleHQuZHJhd0ltYWdlICRpbWdbMF0sIDAsIDBcblxuICAgICRjb250YWluZXIgPSAkICc8ZGl2PidcbiAgICAuY3NzXG4gICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJ1xuICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZSdcbiAgICAgIHdpZHRoOiB3aWR0aFxuICAgICAgaGVpZ2h0OiBoZWlnaHRcblxuICAgIHN3aXRjaCBkaXJlY3Rpb25cbiAgICAgIHdoZW4gU2xpY2VyLlhcbiAgICAgICAgeCA9IDBcbiAgICAgICAgbWF4WCA9IHdpZHRoIC0gMVxuICAgICAgICBoYXNBbHBoYVByZXYgPSBmYWxzZVxuICAgICAgICB3aGlsZSB4IDw9IG1heFhcbiAgICAgICAgICBoYXNBbHBoYUN1cnJlbnQgPSBoYXNBbHBoYSBjb250ZXh0LmdldEltYWdlRGF0YSB4LCAwLCAxLCBoZWlnaHRcbiAgICAgICAgICBpZiAhaGFzQWxwaGFQcmV2IGFuZCBoYXNBbHBoYUN1cnJlbnRcbiAgICAgICAgICAgIHN0YXJ0WCA9IHhcbiAgICAgICAgICBlbHNlIGlmIGhhc0FscGhhUHJldiBhbmQgIWhhc0FscGhhQ3VycmVudFxuICAgICAgICAgICAgaW1hZ2VEYXRhID0gY29udGV4dC5nZXRJbWFnZURhdGEgc3RhcnRYLCAwLCB4IC0gc3RhcnRYLCBoZWlnaHRcbiAgICAgICAgICAgIGlmIGZpbHRlcj9cbiAgICAgICAgICAgICAgaW1hZ2VEYXRhID0gZmlsdGVyIGltYWdlRGF0YVxuICAgICAgICAgICAgY2hhciA9IG5ldyBTbGljZXIgaW1hZ2VEYXRhLCBzdGFydFgsIDBcbiAgICAgICAgICAgICRjb250YWluZXIuYXBwZW5kIGNoYXIuJGNhbnZhc1xuICAgICAgICAgIGVsc2UgaWYgeCBpcyBtYXhYIGFuZCBoYXNBbHBoYUN1cnJlbnRcbiAgICAgICAgICAgIGltYWdlRGF0YSA9IGNvbnRleHQuZ2V0SW1hZ2VEYXRhIHN0YXJ0WCwgMCwgd2lkdGggLSBzdGFydFgsIGhlaWdodFxuICAgICAgICAgICAgaWYgZmlsdGVyP1xuICAgICAgICAgICAgICBpbWFnZURhdGEgPSBmaWx0ZXIgaW1hZ2VEYXRhXG4gICAgICAgICAgICBjaGFyID0gbmV3IFNsaWNlciBpbWFnZURhdGEsIHN0YXJ0WCwgMFxuICAgICAgICAgICAgJGNvbnRhaW5lci5hcHBlbmQgY2hhci4kY2FudmFzXG4gICAgICAgICAgaGFzQWxwaGFQcmV2ID0gaGFzQWxwaGFDdXJyZW50XG4gICAgICAgICAgeCsrXG4gICAgICB3aGVuIFNsaWNlci5ZXG4gICAgICAgIHkgPSAwXG4gICAgICAgIG1heFkgPSBoZWlnaHQgLSAxXG4gICAgICAgIGhhc0FscGhhUHJldiA9IGZhbHNlXG4gICAgICAgIHdoaWxlIHkgPD0gbWF4WVxuICAgICAgICAgIGhhc0FscGhhQ3VycmVudCA9IGhhc0FscGhhIGNvbnRleHQuZ2V0SW1hZ2VEYXRhIDAsIHksIHdpZHRoLCAxXG4gICAgICAgICAgaWYgIWhhc0FscGhhUHJldiBhbmQgaGFzQWxwaGFDdXJyZW50XG4gICAgICAgICAgICBzdGFydFkgPSB5XG4gICAgICAgICAgZWxzZSBpZiBoYXNBbHBoYVByZXYgYW5kICFoYXNBbHBoYUN1cnJlbnRcbiAgICAgICAgICAgIGltYWdlRGF0YSA9IHByZXYgPSBjb250ZXh0LmdldEltYWdlRGF0YSAwLCBzdGFydFksIHdpZHRoLCB5IC0gc3RhcnRZXG4gICAgICAgICAgICBpZiBmaWx0ZXI/XG4gICAgICAgICAgICAgIGltYWdlRGF0YSA9IGZpbHRlciBpbWFnZURhdGFcbiAgICAgICAgICAgIGNoYXIgPSBuZXcgU2xpY2VyIGltYWdlRGF0YSwgMCwgc3RhcnRZXG4gICAgICAgICAgICAkY29udGFpbmVyLmFwcGVuZCBjaGFyLiRjYW52YXNcbiAgICAgICAgICBlbHNlIGlmIHkgaXMgbWF4WSBhbmQgaGFzQWxwaGFDdXJyZW50XG4gICAgICAgICAgICBpbWFnZURhdGEgPSBwcmV2ID0gY29udGV4dC5nZXRJbWFnZURhdGEgMCwgc3RhcnRZLCB3aWR0aCwgaGVpZ2h0IC0gc3RhcnRZXG4gICAgICAgICAgICBpZiBmaWx0ZXI/XG4gICAgICAgICAgICAgIGltYWdlRGF0YSA9IGZpbHRlciBpbWFnZURhdGFcbiAgICAgICAgICAgIGNoYXIgPSBuZXcgU2xpY2VyIGltYWdlRGF0YSwgMCwgc3RhcnRZXG4gICAgICAgICAgICAkY29udGFpbmVyLmFwcGVuZCBjaGFyLiRjYW52YXNcbiAgICAgICAgICBoYXNBbHBoYVByZXYgPSBoYXNBbHBoYUN1cnJlbnRcbiAgICAgICAgICB5KytcbiAgICAgIGVsc2VcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvciBcImRpcmVjdGlvbiBtdXN0IGJlIHNwZWNpZmllZCB3aXRoIGBTbGljZXIuWGAgb3IgYFNsaWNlci5ZYFwiXG5cbiAgICAkaW1nLnJlcGxhY2VXaXRoICRjb250YWluZXJcbiAgICAkY29udGFpbmVyXG5cbiAgY29uc3RydWN0b3I6IChpbWFnZURhdGEsIGxlZnQsIHRvcCkgLT5cbiAgICBzdXBlclxuXG4gICAgQCRjYW52YXMgPSAkICc8Y2FudmFzPidcbiAgICAuYXR0clxuICAgICAgd2lkdGg6IGltYWdlRGF0YS53aWR0aFxuICAgICAgaGVpZ2h0OiBpbWFnZURhdGEuaGVpZ2h0XG4gICAgY29udGV4dCA9IEAkY2FudmFzWzBdLmdldENvbnRleHQgJzJkJ1xuICAgIGNvbnRleHQucHV0SW1hZ2VEYXRhIGltYWdlRGF0YSwgMCwgMFxuICAgIEAkY2FudmFzXG4gICAgLmNzc1xuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZSdcbiAgICAgIGxlZnQ6IGxlZnRcbiAgICAgIHRvcDogdG9wXG4iLCIkID0gcmVxdWlyZSAnanF1ZXJ5J1xucmVxdWlyZSgnLi4vbW9kZWxzL2JhY2tncm91bnMtcG9zaXRpb24nKS5qcXVlcml6ZSAkXG5WaWV3ID0gcmVxdWlyZSAnLi92aWV3J1xuaW90YSA9IHJlcXVpcmUoJy4uL21vZGVscy9pb3RhJykoKVxueyBEZWZlcnJlZCB9ID0gcmVxdWlyZSAnanF1ZXJ5J1xuXG5cbiMjI1xu44K544OX44Op44Kk44OI44Ki44OL44Oh44O844K344On44Oz44KS566h55CG44GZ44KL44Kv44Op44K544Gn44GZ44CCXG5cbkBleGFtcGxlIOWQjOOBmFZpZXfjgavlr77jgZfjgabli5XjgY3mr47jgavliKXjga5TcHJpdGXjgpLkvZzjgorjgb7jgZnjgIJcbiAgICBydW4gPSBuZXcgU3ByaXRlICcuZm9vJ1xuICAgIHJ1bi5zZXRSYW5nZSAwLCAxMFxuICAgIHdhbGsgPSBuZXcgU3ByaXRlICcuZm9vJ1xuICAgIHdhbGsuc2V0UmFuZ2UgMTEsIDIwXG4gICAgcnVuLnBsYXkoKVxuICAgIHJ1bi5vbiBTcHJpdGUuRVZFTlRfTEFTVF9GUkFNRSwgLT5cbiAgICAgIHdhbGsucGxheSgpXG4jIyNcbm1vZHVsZS5leHBvcnRzID1cbmNsYXNzIFNwcml0ZSBleHRlbmRzIFZpZXdcblxuICAjIyNcbiAg44K544OX44Op44Kk44OI55S75YOP44GM5Lim44Gz44GMeOaWueWQkeOBp+OBguOCi+OBk+OBqOOCkuihqOOBmeODleODqeOCsOOBp+OBmeOAglxuICAjIyNcbiAgQFg6IDEgPDwgaW90YSgpXG5cbiAgIyMjXG4gIOOCueODl+ODqeOCpOODiOeUu+WDj+OBjOS4puOBs+OBjHnmlrnlkJHjgafjgYLjgovjgZPjgajjgpLooajjgZnjg5Xjg6njgrDjgafjgZnjgIJcbiAgIyMjXG4gIEBZOiAxIDw8IGlvdGEoKVxuXG4gICMjI1xuICDmnIDntYLjg5Xjg6zjg7zjg6Djga7ntYLkuobmmYLjgavnmbrngavjgZnjgovjgqTjg5njg7Pjg4jjgafjgZnjgIJcbiAgIyMjXG4gIEBFVkVOVF9MQVNUX0ZSQU1FOiAnc3ByaXRlLmxhc3RGcmFtZSdcblxuICAjIyNcbiAg5oyH5a6a44Gu44Oq44OU44O844OI5Zue5pWw44GM5a6M5LqG44GX44Gf5pmC44Gr55m654Gr44GZ44KL44Kk44OZ44Oz44OI44Gn44GZ44CCXG4gIOawuOS5heOBq+ODquODlOODvOODiOOBmeOCi+WgtOWQiOOBr+eZuueBq+OBl+OBvuOBm+OCk+OAglxuICAjIyNcbiAgQEVWRU5UX0NPTVBMRVRFX1JFUEVBVDogJ3Nwcml0ZS5jb21wbGV0ZVJlcGVhdCdcblxuICAjIyNcbiAg44K544OX44Op44Kk44OI44Kk44Oz44K544K/44Oz44K544KS55Sf5oiQ44GX44G+44GZ44CCXG5cbiAgQHBhcmFtIFtTdHJpbmcsIEhUTUxFbGVtZW50LCBqUXVlcnlPYmplY3QsIFZpZXddIHNlbGVjdG9yIOOCs+ODs+ODiOODreODvOODq+OBruWvvuixoeOBruimgee0oOOBp+OBmVxuICBAcGFyYW0gW0ludGVnZXJdIGZwcyAx56eS5b2T44Gf44KK44Gu44OV44Os44O844Og5pWw44Gn44GZ44CCXG4gIEBwYXJhbSBbSW50ZWdlcl0gZGlyZWN0aW9uIOiDjOaZr+eUu+WDj+OBjOS4puOCk+OBp+OBhOOCi+aWueWQkeOBp+OBmeOAglxuICAjIyNcbiAgY29uc3RydWN0b3I6ICh7fSwgQGZwcyA9IDMwLCBAZGlyZWN0aW9uID0gU3ByaXRlLlkpIC0+XG4gICAgc3VwZXJcbiAgICBpZiBAZGlyZWN0aW9uIGlzIEBjb25zdHJ1Y3Rvci5YXG4gICAgICBAcHJvcCA9ICdiYWNrZ3JvdW5kUG9zaXRpb25YJ1xuICAgICAgQHNpemUgPSBAd2lkdGgoKVxuICAgIGVsc2VcbiAgICAgIEBwcm9wID0gJ2JhY2tncm91bmRQb3NpdGlvblknXG4gICAgICBAc2l6ZSA9IEBoZWlnaHQoKVxuICAgIEBjdXJyZW50RnJhbWUgPSAwXG4gICAgQHNldFJhbmdlIDAsIDBcblxuICAjIyNcbiAg44GT44Gu44K544OX44Op44Kk44OI44GM44OV44Os44O844Og44Go44GX44Gm6KGo56S644GZ44KL6IOM5pmv44Gu5L2N572u44Kk44Oz44OH44OD44Kv44K544Gu56+E5Zuy44KS6Kit5a6a44GX44G+44GZ44CCXG5cbiAgQHBhcmFtIFtJbnRlZ2VyXSBmcm9tIOmWi+Wni+ODleODrOODvOODoOOBruS9jee9ruOCpOODs+ODh+ODg+OCr+OCueOBp+OBmeOAglxuICBAcGFyYW0gW0ludGVnZXJdIHRvIOacgOe1guODleODrOODvOODoOOBruS9jee9ruOCpOODs+ODh+ODg+OCr+OCueOBp+OBmeOAglxuICAjIyNcbiAgc2V0UmFuZ2U6IChmcm9tLCB0bykgLT5cbiAgICBAc2V0UG9zaXRpb25zIFtmcm9tLi50b11cblxuICAjIyNcbiAg44GT44Gu44K544OX44Op44Kk44OI44GM44OV44Os44O844Og44Go44GX44Gm6KGo56S644GZ44KL6IOM5pmv44Gu5L2N572u44Kk44Oz44OH44OD44Kv44K544Gu6YWN5YiX44KS6Kit5a6a44GX44G+44GZ44CCXG5cbiAgQHBhcmFtIFtBcnJheTxJbnRlZ2VyPl0gcG9zaXRpb25zIOS9jee9ruOCpOODs+ODh+ODg+OCr+OCueOBrumFjeWIl+OBp+OBmeOAglxuICAjIyNcbiAgc2V0UG9zaXRpb25zOiAoQHBvc2l0aW9ucykgLT5cbiAgICBAbGFzdEZyYW1lID0gQHBvc2l0aW9ucy5sZW5ndGggLSAxXG5cbiAgIyMjXG4gIOaMh+WumuOBleOCjOOBn+ODleODrOODvOODoOOBi+OCieWGjeeUn+OBl+OBvuOBmeOAglxuXG4gIEBwYXJhbSBbSW50ZWdlcl0gZnJhbWUg5YaN55Sf44KS6ZaL5aeL44GZ44KL44OV44Os44O844Og44Gn44GZ44CCXG4gIEBwYXJhbSBbSW50ZWdlcl0gcmVwZWF0IOWGjeeUn+WbnuaVsOOBp+OBmeOAglxuICAjIyNcbiAgZ290b0FuZFBsYXk6IChmcmFtZSA9IDAsIHJlcGVhdCA9IDEpIC0+XG4gICAgQGN1cnJlbnRGcmFtZSA9IEBsaW1pdEZyYW1lIGZyYW1lXG4gICAgQHBsYXkgcmVwZWF0XG5cbiAgIyMjXG4gIOaMh+WumuOBleOCjOOBn+ODleODrOODvOODoOOBp+WBnOatouOBl+OBvuOBmeOAglxuXG4gIEBwYXJhbSBbSW50ZWdlcl0gZnJhbWUg6KGo56S644GZ44KL44OV44Os44O844Og44Gn44GZ44CCXG4gICMjI1xuICBnb3RvQW5kUGF1c2U6IChmcmFtZSA9IDApIC0+XG4gICAgQGN1cnJlbnRGcmFtZSA9IEBsaW1pdEZyYW1lIGZyYW1lXG4gICAgQHVwZGF0ZVZpZXcoKVxuICAgIEBzdG9wKClcblxuICAjIyNcbiAg5qyh44Gu44OV44Os44O844Og44Gr56e75YuV44GX44G+44GZ44CCXG4gICMjI1xuICBuZXh0RnJhbWU6IC0+XG4gICAgQGN1cnJlbnRGcmFtZSA9IEB2ZXJpZnlGcmFtZSBAY3VycmVudEZyYW1lICsgMVxuICAgIEB1cGRhdGVWaWV3KClcblxuICAjIyNcbiAg5YmN44Gu44OV44Os44O844Og44Gr56e75YuV44GX44G+44GZ44CCXG4gICMjI1xuICBwcmV2RnJhbWU6IC0+XG4gICAgQGN1cnJlbnRGcmFtZSA9IEB2ZXJpZnlGcmFtZSBAY3VycmVudEZyYW1lIC0gMVxuICAgIEB1cGRhdGVWaWV3KClcblxuICAjIyNcbiAg5YaN55Sf44GX44G+44GZ44CCXG5cbiAgQHBhcmFtIFtJbnRlZ2VyXSByZXBlYXQg5YaN55Sf5Zue5pWw44Gn44GZ44CCXG4gICMjI1xuICBwbGF5OiAoQHJlcGVhdCA9IDEpIC0+XG4gICAgQGN1cnJlbnRSZXBlYXRDb3VudCA9IDBcbiAgICBAdXBkYXRlVmlldygpXG4gICAgQHN0YXJ0VGljaygpXG5cbiAgIyMjXG4gIOWBnOatouOBl+OBvuOBmeOAglxuICAjIyNcbiAgcGF1c2U6IC0+XG4gICAgQHN0b3BUaWNrKClcblxuICAjIyNcbiAgQHByaXZhdGVcbiAgIyMjXG4gIGxpbWl0RnJhbWU6IChmcmFtZSkgLT5cbiAgICBpZiBmcmFtZSA8IDBcbiAgICAgIGZyYW1lID0gMFxuICAgIGlmIGZyYW1lID4gQGxhc3RGcmFtZVxuICAgICAgZnJhbWUgPSBAbGFzdEZyYW1lXG4gICAgZnJhbWVcblxuICAjIyNcbiAgQHByaXZhdGVcbiAgIyMjXG4gIHZlcmlmeUZyYW1lOiAoZnJhbWUpIC0+XG4gICAgaWYgZnJhbWUgPCAwXG4gICAgICBmcmFtZSA9IEBsYXN0RnJhbWVcbiAgICBpZiBmcmFtZSA+IEBsYXN0RnJhbWVcbiAgICAgIGZyYW1lID0gMFxuICAgIGZyYW1lXG5cbiAgIyMjXG4gIEBwcml2YXRlXG4gICMjI1xuICB1cGRhdGVWaWV3OiAtPlxuICAgIHBvcyA9IEBwb3NpdGlvbnNbQGN1cnJlbnRGcmFtZV1cbiAgICBjc3MgPSB7fVxuICAgIGNzc1tAcHJvcF0gPSAtQHNpemUgKiBwb3NcbiAgICBAY3NzIGNzc1xuXG4gICMjI1xuICBAcHJpdmF0ZVxuICAjIyNcbiAgc3RhcnRUaWNrOiAtPlxuICAgIEBzdG9wVGljaygpXG4gICAgQGRhdGEgJ3Nwcml0ZUludGVydmFsSWQnLCBzZXRJbnRlcnZhbCBAdGljaywgMTAwMCAvIEBmcHNcblxuICAjIyNcbiAgQHByaXZhdGVcbiAgIyMjXG4gIHN0b3BUaWNrOiAtPlxuICAgIGNsZWFySW50ZXJ2YWwgQGRhdGEgJ3Nwcml0ZUludGVydmFsSWQnXG5cbiAgIyMjXG4gIEBwcml2YXRlXG4gICMjI1xuICB0aWNrOiA9PlxuICAgIGZyYW1lID0gQGN1cnJlbnRGcmFtZSArIDFcbiAgICBpZiAoaXNMYXN0RnJhbWUgPSBmcmFtZSA+IEBsYXN0RnJhbWUpXG4gICAgICBpZiBAcmVwZWF0ID4gMCBhbmQgKytAY3VycmVudFJlcGVhdENvdW50ID49IEByZXBlYXRcbiAgICAgICAgQHN0b3BUaWNrKClcbiAgICAgICAgQHRyaWdnZXIgQGNvbnN0cnVjdG9yLkVWRU5UX0xBU1RfRlJBTUVcbiAgICAgICAgQHRyaWdnZXIgQGNvbnN0cnVjdG9yLkVWRU5UX0NPTVBMRVRFX1JFUEVBVFxuICAgICAgICByZXR1cm5cbiAgICAgIGZyYW1lID0gQHZlcmlmeUZyYW1lIGZyYW1lXG4gICAgQGN1cnJlbnRGcmFtZSA9IGZyYW1lXG4gICAgQHVwZGF0ZVZpZXcoKVxuICAgIGlmIGlzTGFzdEZyYW1lXG4gICAgICBAdHJpZ2dlciBAY29uc3RydWN0b3IuRVZFTlRfTEFTVF9GUkFNRVxuIiwiIyMjXG5UYWIgY2xhc3MuXG4jIyNcblxuVmlldyA9IHJlcXVpcmUgJy4vdmlldydcblxubW9kdWxlLmV4cG9ydHMgPVxuY2xhc3MgVGFiIGV4dGVuZHMgVmlld1xuXG4gIHNlbGVjdG9yQnV0dG9uczogJy5qcy1idXR0b24nXG4gIHNlbGVjdG9yQ29udGVudHM6ICcuanMtY29udGVudCdcblxuICBjb25zdHJ1Y3RvcjogLT5cbiAgICBzdXBlclxuICAgIEAkIEBzZWxlY3RvckJ1dHRvbnNcbiAgICAub24gJ3NlbGVjdGFibGUuY2hhbmdlZCcsIEB0b2dnbGVcbiAgICBAJGNvbnRlbnRzID0gQCQgQHNlbGVjdG9yQ29udGVudHNcblxuICB0b2dnbGU6ICh7fSwgaW5kZXgpID0+XG4gICAgQCRjb250ZW50cy5kYXRhKCd2aWV3Jykuc2VsZWN0QXQgaW5kZXhcbiIsIlZpZXcgPSByZXF1aXJlICcuL3ZpZXcnXG5cbiMjI1xu6KGM5pWw44Kq44OX44K344On44Oz44KS5LuY5LiO44GX44GfQ1NTM+OBrnRleHQtb3ZlcmZsb3fjgqjjg5/jg6Xjg6zjg7zjgrfjg6fjg7PjgafjgZnjgIJcbiMjI1xubW9kdWxlLmV4cG9ydHMgPVxuY2xhc3MgVGV4dE92ZXJmbG93IGV4dGVuZHMgVmlld1xuXG4gIFtpbnN0YW5jZXNdID0gW11cblxuICBAcmVnaXN0ZXI6ICh0ZXh0T3ZlcmZsb3cpIC0+XG4gICAgdW5sZXNzIGluc3RhbmNlcz9cbiAgICAgIGluc3RhbmNlcyA9IFtdXG4gICAgICBAJHdpbmRvdy5vbiAncmVzaXplJywgQG9uV2luZG93UmVzaXplZFxuICAgIGluc3RhbmNlcy5wdXNoIHRleHRPdmVyZmxvd1xuXG4gIEB1bnJlZ2lzdGVyOiAodGV4dE92ZXJmbG93KSAtPlxuICAgIHJldHVybiB1bmxlc3MgQGluc3RhbmNlc1xuICAgIEBpbnN0YW5jZXMuc3BsaWNlIGluc3RhbmNlcy5pbmRleE9mKHRleHRPdmVyZmxvdyksIDFcbiAgICBpZiBpbnN0YW5jZXMubGVuZ3RoIGlzIDBcbiAgICAgIGluc3RhbmNlcyA9IG51bGxcbiAgICAgIEAkd2luZG93Lm9mZiAncmVzaXplJywgQG9uV2luZG93UmVzaXplZFxuXG4gIEBvbldpbmRvd1Jlc2l6ZWQ6IC0+XG4gICAgZm9yIGluc3RhbmNlIGluIGluc3RhbmNlc1xuICAgICAgaW5zdGFuY2UudXBkYXRlKClcblxuICBjb25zdHJ1Y3RvcjogKHt9LCBAcm93cywgQHJlcGxhY2VyID0gJy4uLicpIC0+XG4gICAgc3VwZXJcbiAgICBAZGVmYXVsdFRleHQgPSBAdGV4dCgpXG4gICAgQGNvbnN0cnVjdG9yLnJlZ2lzdGVyIEBcbiAgICBAdXBkYXRlKClcblxuICByZW1vdmU6IC0+XG4gICAgQGNvbnN0cnVjdG9yLnVucmVnaXN0ZXIgQFxuICAgIHN1cGVyXG5cbiAgdXBkYXRlOiAtPlxuICAgIGkgPSAwXG4gICAgbGVuID0gQGRlZmF1bHRUZXh0Lmxlbmd0aFxuICAgIHJvd3MgPSAwXG5cbiAgICAjIOaWh+Wtl+aVsOOCkjHmloflrZfjgYvjgonlopfjgoTjgZfjgarjgYzjgonopoHntKDjga7pq5jjgZXjgpLlj5blvpfjgZfjgb7jgZnjgIJcbiAgICAjIOmrmOOBleOBjOWil+OBiOOCi+OBqOihjOaVsOOCq+OCpuODs+OCv+OCkuOCpOODs+OCr+ODquODoeODs+ODiOOBl+OBvuOBmeOAglxuICAgICMg6KGM5pWw44Kr44Km44Oz44K/44GM5oyH5a6a6KGM5pWw44KS6LaF44GI44KL44G+44Gn6Kmm6KGM44GX44G+44GZ44CCXG4gICAgd2hpbGUgKytpIDwgbGVuICYmIHJvd3MgPD0gQHJvd3NcbiAgICAgIEB0ZXh0IEBkZWZhdWx0VGV4dC5zdWJzdHIgMCwgaVxuICAgICAgaCA9IEBoZWlnaHQoKVxuICAgICAgaWYgIWhlaWdodD8gb3IgaCA+IGhlaWdodFxuICAgICAgICBoZWlnaHQgPSBoXG4gICAgICAgIHJvd3MrK1xuXG4gICAgIyDmnKvlsL7jgavku6Pmm7/mloflrZfjgpLku5jjgZHmloflrZfmlbDjgpLmuJvjgonjgZfjgarjgYzjgonopoHntKDjga7pq5jjgZXjgpLlj5blvpfjgZfjgb7jgZnjgIJcbiAgICAjIOmrmOOBleOBjOa4m+OCi+OBqOihjOaVsOOCq+OCpuODs+OCv+OCkuODh+OCr+ODquODoeODs+ODiOOBl+OBvuOBmeOAglxuICAgICMg6KGM5pWw44Kr44Km44Oz44K/44GM5oyH5a6a6KGM5Lul5LiL44Gr44Gq44KL44G+44Gn6Kmm6KGM44GX44G+44GZ44CCXG4gICAgd2hpbGUgLS1pID49IDAgJiYgcm93cyA+IEByb3dzXG4gICAgICBAdGV4dCBAZGVmYXVsdFRleHQuc3Vic3RyKDAsIGkpICsgQHJlcGxhY2VyXG4gICAgICBoID0gQGhlaWdodCgpXG4gICAgICBpZiAhaGVpZ2h0PyBvciBoIDwgaGVpZ2h0XG4gICAgICAgIGhlaWdodCA9IGhcbiAgICAgICAgcm93cy0tXG4iLCIjIyMhXG5UaGUgY29kZSBvZiBgVmlldyNwdXNoU3RhY2soKWAgYW5kIGBWaWV3I2VuZCgpYCBhcmUgYm9ycm93ZWQgZnJvbSBzcGFjZS1wZW4uXG5Ac2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9hdG9tL3NwYWNlLXBlbi9ibG9iL21hc3Rlci9zcmMvc3BhY2UtcGVuLmNvZmZlZVxuQGxpY2Vuc2UgaHR0cHM6Ly9naXRodWIuY29tL2F0b20vc3BhY2UtcGVuL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiMjI1xuXG5qUXVlcnkgPSByZXF1aXJlICdqcXVlcnknXG57IHRlbXBsYXRlIH0gPSByZXF1aXJlICdsb2Rhc2gnXG4kd2luZG93ID0galF1ZXJ5IHdpbmRvd1xuJGRvY3VtZW50ID0galF1ZXJ5IHdpbmRvdy5kb2N1bWVudFxuXG4jIyNcbnRyaWdnZXIoKeOBruOCqOOCpOODquOCouOCueOBp+OBmeOAglxuIyMjXG5qUXVlcnkuZm4uZW1pdCA9IGpRdWVyeS5mbi50cmlnZ2VyXG5cbiMjI1xub25lKCnjga7jgqjjgqTjg6rjgqLjgrnjgafjgZnjgIJcbiMjI1xualF1ZXJ5LmZuLm9uY2UgPSBqUXVlcnkuZm4ub25lXG5cbiMjI1xuVmlld+OCr+ODqeOCueOBr3ZpZXctY29udHJvbGxlcuOBruWfuuW6leOCr+ODqeOCueOBp+OBmeOAglxualF1ZXJ544Gu44Op44OD44OR44Go44GX44Gm5YuV5L2c44GX44CBalF1ZXJ5LmZu44Gr5a6f6KOF44GV44KM44Gm44GE44KL44Oh44K944OD44OJ44KS5aeU6K2y44GX44Gm44GE44G+44GZ44CCXG7lp5TorbLjgZXjgozjgZ/jg6Hjgr3jg4Pjg4njga7miLvjgorlgKTjga9qUXVlcnkuZm7jga7miLvjgorjgZ3jga7jgoLjga7jgafjgIFcblZpZXfjgqTjg7Pjgrnjgr/jg7PjgrnjgpLjgrPjg7Pjg4bjgq/jgrnjg4jjgajjgZfjgabjg6Hjgr3jg4Pjg4njg4Hjgqfjg7zjg7PjgpLooYzjgYbjgZPjgajjga/jgafjgY3jgb7jgZvjgpPjgIJcbkBkZXBlbmRzT24ganF1ZXJ5XG5AZGVwZW5kc09uIGxvZGFzaFxuIyMjXG5tb2R1bGUuZXhwb3J0cyA9XG5jbGFzcyBWaWV3IGV4dGVuZHMgalF1ZXJ5XG5cbiAgQCR3aW5kb3c6ICR3aW5kb3dcbiAgQCRkb2N1bWVudDogJGRvY3VtZW50XG5cbiAgIyMjXG4gIOimgee0oOOBruODhuODs+ODl+ODrOODvOODiOOBqOOBquOCi1N0cmluZ+OBp+OBmeOAglxuICAjIyNcbiAgQHRlbXBsYXRlOiBudWxsXG5cbiAgIyMjXG4gIOimgee0oOOBruOCu+ODrOOCr+OCv+OBp+OBmeOAglxuICAjIyNcbiAgc2VsZWN0b3I6IG51bGxcblxuICAjIyNcbiAg44K744Os44Kv44K/44GL55Sf5oiQ44GZ44KL6KaB57Sg44GuSFRNTOOCkua4oeOBmeOBqOOAgeaWsOOBl+OBhFZpZXfjgqTjg7Pjgrnjgr/jg7PjgrnjgpLov5TjgZfjgb7jgZnjgIJcbiAg5qyh44Gu44KI44GG44Gq5YSq5YWI6aCG5L2N44Gn57aZ5om/5YWDKGpRdWVyeSnjgrPjg7Pjgrnjg4jjg6njgq/jgr/jgpLjgrPjg7zjg6vjgZfjgb7jgZnjgIJcbiAgMS4gYEBjb25zdHJ1Y3Rvci50ZW1wbGF0ZWDjgYzoqK3lrprjgZXjgozjgabjgYTjgovloLTlkIg6IOODhuODs+ODl+ODrOODvOODiOOBi+OCieimgee0oOOCkueUn+aIkOOBl+OBvuOBmVxuICAyLiBgQHNlbGVjdG9yYOOBjOioreWumuOBleOCjOOBpuOBhOOCi+WgtOWQiDog56ys5LiA5byV5pWw44KS44Kz44Oz44OG44Kv44K544OI44Go44GX44Gm44K744Os44Kv44K/44KS5qSc57Si44GX44G+44GZXG4gIDMuIOesrOS4gOW8leaVsOOBjOaMh+WumuOBleOCjOOBpuOBhOOCi+WgtOWQiDog56ys5LiA5byV5pWw44GL44KJ6KaB57Sg44KS55Sf5oiQ44O75qSc57Si44GX44G+44GZ44CCXG4gIDQuIOesrOS4gOW8leaVsOOBjOaMh+WumuOBleOCjOOBpuOBhOOBquOBhOWgtOWQiDogYDxkaXY+YOimgee0oOOCkueUn+aIkOOBl+OBvuOBmeOAglxuICAjIyNcbiAgY29uc3RydWN0b3I6IChhcmcwKSAtPlxuICAgIGlmIEBjb25zdHJ1Y3Rvci50ZW1wbGF0ZT9cbiAgICAgIEBjb25zdHJ1Y3Rvci50ZW1wbGF0ZUZ1bmMgPz0gdGVtcGxhdGUgQGNvbnN0cnVjdG9yLnRlbXBsYXRlXG4gICAgICAkZWwgPSBzdXBlciBqUXVlcnkucGFyc2VIVE1MIEBjb25zdHJ1Y3Rvci50ZW1wbGF0ZUZ1bmMgKGRhdGEgPSBhcmcwKVxuICAgIGVsc2UgaWYgQHNlbGVjdG9yP1xuICAgICAgJGVsID0gc3VwZXIgQHNlbGVjdG9yLCAoY29udGV4dCA9IGFyZzApXG4gICAgZWxzZVxuICAgICAgJGVsID0gc3VwZXIgKHNlbGVjdG9yID0gYXJnMCkgb3IgJzxkaXY+J1xuXG4gICAgIyBqUXVlcnnjgqrjg5bjgrjjgqfjgq/jg4jjga7jg5fjg63jg5Hjg4bjgqPjgpLjgrPjg5Tjg7zjgZfjgb7jgZlcbiAgICBmb3IgcHJvcCwgdmFsIG9mICRlbFxuICAgICAgaWYgJGVsLmhhc093blByb3BlcnR5IHByb3BcbiAgICAgICAgQFtwcm9wXSA9IHZhbFxuXG4gICAgIyBqUXVlcnnjgqrjg5bjgrjjgqfjgq/jg4jjga5kYXRh44GrJ3ZpZXcn44Go44GX44Gm44Kk44Oz44K544K/44Oz44K544KS55m76Yyy44GX44G+44GZXG4gICAgQGRhdGEgJ3ZpZXcnLCBAXG5cbiAgIyMjXG4gIGZpbmTjga7jgrfjg6fjg7zjg4jjg4/jg7Pjg4njgafjgZnjgIJcbiAgIyMjXG4gICQ6IC0+IGpRdWVyeS5mbi5maW5kLmFwcGx5IEAsIGFyZ3VtZW50c1xuICAjIGFkZExpc3RlbmVyOiAtPiBqUXVlcnkuZm4ub24uYXBwbHkgQCwgYXJndW1lbnRzXG5cbiAgIyMjXG4gIEBwcml2YXRlXG4gIOODqeODg+ODkeOCkueUn+aIkOOBmeOCi2pRdWVyeeODoeOCveODg+ODieOCkuOCquODvOODkOODvOODqeOCpOODieOBl+OBvuOBmeOAglxuICDjgZPjgZPjgafjga9WaWV344Kk44Oz44K544K/44Oz44K544KS55Sf5oiQ44GZ44KL44Gu44Gn44Gv44Gq44GP44CBalF1ZXJ544Kq44OW44K444Kn44Kv44OI44KS55Sf5oiQ44GX44G+44GZ44CCXG4gICMjI1xuICBwdXNoU3RhY2s6IChlbGVtcykgLT5cbiAgICByZXQgPSBqUXVlcnkubWVyZ2UoalF1ZXJ5KCksIGVsZW1zKVxuICAgIHJldC5wcmV2T2JqZWN0ID0gdGhpc1xuICAgIHJldC5jb250ZXh0ID0gQGNvbnRleHRcbiAgICByZXRcblxuICAjIyNcbiAgQHByaXZhdGVcbiAg44Op44OD44OR44KS55Sf5oiQ44GZ44KLalF1ZXJ544Oh44K944OD44OJ44KS44Kq44O844OQ44O844Op44Kk44OJ44GX44G+44GZ44CCXG4gIOOBk+OBk+OBp+OBr1ZpZXfjgqTjg7Pjgrnjgr/jg7PjgrnjgpLnlJ/miJDjgZnjgovjga7jgafjga/jgarjgY/jgIFqUXVlcnnjgqrjg5bjgrjjgqfjgq/jg4jjgpLnlJ/miJDjgZfjgb7jgZnjgIJcbiAgIyMjXG4gIGVuZDogLT5cbiAgICBAcHJldk9iamVjdCA/IGpRdWVyeShudWxsKVxuXG5cbiMjI1xudmlld+OBruOCpOODs+OCueOCv+ODs+OCueOCkuWPluW+l+OBl+OBvuOBmeOAglxu44Oh44K944OD44OJ44OB44Kn44O844Oz44KS6KGM44GG6Zqb44Gr44CBalF1ZXJ544Kq44OW44K444Kn44Kv44OI44Gr56e744Gj44Gf44Kz44Oz44OG44Kv44K544OI44KSXG5WaWV344Kk44Oz44K544K/44Oz44K544Gr5oi744GZ44GT44Go44GM44Gn44GN44G+44GZ44CCXG5gYGBjb2ZmZWVzY3JpcHRcbm5ldyBWaWV3ICcuc29tZScgLy8gVmlld+OCpOODs+OCueOCv+ODs+OCueOCkueUn+aIkOOBl+OBvuOBmVxuLmFwcGVuZFRvICdib2R5JyAvLyBqUXVlcnnjga7jg6Hjgr3jg4Pjg4njgpLjgrPjg7zjg6vjgZfjgb7jgZlcbi52aWV3KCkuc29tZSgpICAgLy8gVmlld+OBq+Wun+ijheOBleOCjOOBn+ODoeOCveODg+ODieOCkuOCs+ODvOODq+OBl+OBvuOBmVxuYGBgXG4jIyNcbmpRdWVyeS5mbi52aWV3ID0gLT4gQGRhdGEgJ3ZpZXcnXG4iXX0=
