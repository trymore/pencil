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
          if (isArguments(args[0]) || isArray(args[0])) {
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