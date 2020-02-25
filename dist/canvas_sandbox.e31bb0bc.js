// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/Position.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Position =
/**
 * Position: represents a position on the screen.
 * @param {int} x the X coordinate
 * @param {*} y the Y coordinate
 */
function Position(x, y) {
  _classCallCheck(this, Position);

  this.x = x;
  this.y = y;
};

exports.default = Position;
},{}],"src/Direction.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Direction =
/*#__PURE__*/
function () {
  /**
   *
   * Direction: represents a direction by horizontal e vertical properties.
   * @param {int} h horizontal direction (-1: left; 0: neutral; 1: right)
   * @param {int} v vertical direction (-1: up; 0: neutral; 1: down)
   */
  function Direction(h, v) {
    _classCallCheck(this, Direction);

    this.h = h;
    this.v = v;
  }
  /**
   * returns true if it's possible to turn left
   */


  _createClass(Direction, [{
    key: "canGoLeft",
    value: function canGoLeft() {
      return this.h === 0;
    }
    /**
     * changes horizontal direction to -1 (left)
     */

  }, {
    key: "goLeft",
    value: function goLeft() {
      this.v = 0;
      this.h = -1;
    }
    /**
     * returns true if it's possible to turn right
     */

  }, {
    key: "canGoRight",
    value: function canGoRight() {
      return this.h === 0;
    }
    /**
     * changes horizontal direction to 1 (right)
     */

  }, {
    key: "goRight",
    value: function goRight() {
      this.v = 0;
      this.h = 1;
    }
    /**
     * returns true if it's possible to turn up
     */

  }, {
    key: "canGoUp",
    value: function canGoUp() {
      return this.v === 0;
    }
    /**
     * changes vertical direction to -1 (up)
     */

  }, {
    key: "goUp",
    value: function goUp() {
      this.v = -1;
      this.h = 0;
    }
    /**
     * returns true if it's possible to turn down
     */

  }, {
    key: "canGoDown",
    value: function canGoDown() {
      return this.v === 0;
    }
    /**
     * changes vertical direction to 1 (down)
     */

  }, {
    key: "goDown",
    value: function goDown() {
      this.v = 1;
      this.h = 0;
    }
  }]);

  return Direction;
}();

exports.default = Direction;
},{}],"src/Snake.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Position = _interopRequireDefault(require("./Position"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Snake =
/*#__PURE__*/
function () {
  /**
   * Snake: Represents the game actor: the snake.
   * @param {Position} p the position of the head of the snake
   * @param {Direction} d the direction of the snake
   * @param {Object} c the canvas context
   */
  function Snake(p, d, c) {
    _classCallCheck(this, Snake);

    this.position = p;
    this.direction = d;
    this.body = [p];
    this.size = 20;
    this.snakeSquare = 15;
    this.context = c;
  }
  /**
   * draws the snake body
   */


  _createClass(Snake, [{
    key: "draw",
    value: function draw() {
      this.context.fillRect(this.position.x * this.snakeSquare + this.snakeSquare / 2, this.position.y * this.snakeSquare + this.snakeSquare / 2, this.snakeSquare, this.snakeSquare);
    }
    /**
     * Returns true if the head of the snake hits its own body
     */

  }, {
    key: "isAHit",
    value: function isAHit() {
      var hit = false;

      for (var i = 1; i < this.body.length && !hit; i++) {
        hit = this.body[i].x === this.position.x && this.body[i].y === this.position.y;
      }

      return hit;
    }
    /**
     * Updates the position of the snake based on its direction and evaluates if there's a hit.
     */

  }, {
    key: "update",
    value: function update() {
      var tail; // adds head's new position

      this.body.unshift(new _Position.default(this.position.x + this.direction.h, this.position.y + this.direction.v)); // updates head's position

      this.position = this.body[0];

      if (this.isAHit()) {
        paused = true;
        console.log("lost!");
      } else {
        // if body has grown enough, remove the tail at the end
        if (this.body.length === this.size) {
          tail = this.body.pop();
          this.context.clearRect(tail.x * this.snakeSquare + this.snakeSquare / 2, tail.y * this.snakeSquare + this.snakeSquare / 2, this.snakeSquare, this.snakeSquare);
        } // the game pauses and prints 'lost', else draw the snake


        this.draw();
      }
    }
  }]);

  return Snake;
}();

exports.default = Snake;
},{"./Position":"src/Position.js"}],"src/World.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Position = _interopRequireDefault(require("./Position"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var World =
/*#__PURE__*/
function () {
  function World(height, width, context) {
    _classCallCheck(this, World);

    this.fruits = [];
    this.width = width;
    this.height = height;
    this.context = context;
    this.maxFruits = 5;
    this.fruitSize = 15;

    for (var i = 0; i < this.maxFruits; i++) {
      this.fruits.push(this.generateFruit());
    }
  }

  _createClass(World, [{
    key: "generateFruit",
    value: function generateFruit() {
      return new _Position.default(Math.random() * this.width, Math.random() * this.height);
    }
  }, {
    key: "draw",
    value: function draw() {
      this.context.save();
      this.context.fillStyle = "rgb(255,0,0)";

      for (var i = 0; i < this.fruits.length; i++) {
        this.context.beginPath();
        this.context.fillRect(this.fruits[i].x, this.fruits[i].y, this.fruitSize, this.fruitSize);
        this.context.closePath();
      }

      this.context.restore();
    }
  }]);

  return World;
}();

exports.default = World;
},{"./Position":"src/Position.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _Position = _interopRequireDefault(require("./src/Position"));

var _Direction = _interopRequireDefault(require("./src/Direction"));

var _Snake = _interopRequireDefault(require("./src/Snake"));

var _World = _interopRequireDefault(require("./src/World"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var width = window.innerWidth;
var height = window.innerHeight;
var fps = 8; // game speed

var paused = false; // game pause trigger

/**
 * Calculates the pixel ratio of the screen
 */

var PIXEL_RATIO = function () {
  var ctx = document.getElementById("canvas").getContext("2d"),
      dpr = window.devicePixelRatio || 1,
      bsr = ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1;
  return dpr / bsr;
}();
/**
 * Returns the context and canvas configured to support the aspect ratio of the browser
 * @param {int} w window width
 * @param {int} h window height
 * @param {int} ratio device aspect ratio
 */


var createHiDPICanvas = function createHiDPICanvas(w, h, ratio) {
  if (!ratio) {
    ratio = PIXEL_RATIO;
  }

  var can = document.getElementById("canvas");
  can.width = w * ratio;
  can.height = h * ratio;
  can.style.width = w + "px";
  can.style.height = h + "px";
  var ctx = can.getContext("2d");
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  return {
    canvas: can,
    context: ctx
  };
};

var _createHiDPICanvas = createHiDPICanvas(width, height),
    canvas = _createHiDPICanvas.canvas,
    context = _createHiDPICanvas.context;

var snake = new _Snake.default(new _Position.default(0, 0), new _Direction.default(1, 0), context);
var world = new _World.default(width, height, context);
/**
 * Animation loop function
 */

function animate() {
  if (paused) return;
  setTimeout(function () {
    requestAnimationFrame(animate);
    snake.update();
  }, 1000 / fps);
}
/**
 * Key events to move the snake
 */


window.addEventListener("keydown", function (evt) {
  switch (evt.keyCode) {
    case 38:
      snake.direction.canGoUp() && snake.direction.goUp();
      break;

    case 40:
      snake.direction.canGoDown() && snake.direction.goDown();
      break;

    case 37:
      snake.direction.canGoLeft() && snake.direction.goLeft();
      break;

    case 39:
      snake.direction.canGoRight() && snake.direction.goRight();
      break;

    case 32:
      paused = !paused;
      if (!paused) animate();
      break;
  }
});
world.draw();
animate();
},{"./src/Position":"src/Position.js","./src/Direction":"src/Direction.js","./src/Snake":"src/Snake.js","./src/World":"src/World.js"}],"node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "54417" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/canvas_sandbox.e31bb0bc.js.map