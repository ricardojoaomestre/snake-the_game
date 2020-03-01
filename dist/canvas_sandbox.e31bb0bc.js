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
})({"src/utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPixelRatio = getPixelRatio;
exports.createHiDPICanvas = createHiDPICanvas;
exports.toGrid = toGrid;

function getPixelRatio(canvasId) {
  var ctx = document.getElementById(canvasId).getContext("2d"),
      dpr = window.devicePixelRatio || 1,
      bsr = ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1;
  return dpr / bsr;
}
/**
 * Returns the context and canvas configured to support the aspect ratio of the browser
 * @param {int} w window width
 * @param {int} h window height
 * @param {int} ratio device aspect ratio
 */


function createHiDPICanvas(canvasId, w, h, ratio) {
  if (!ratio) {
    ratio = getPixelRatio(canvasId);
  }

  var can = document.getElementById(canvasId);
  can.width = w * ratio;
  can.height = h * ratio;
  can.style.width = w + "px";
  can.style.height = h + "px";
  var ctx = can.getContext("2d");
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  return ctx;
}

function toGrid(x, y, gridSize) {
  var column = Math.abs(x / gridSize);
  var row = Math.abs(y / gridSize);
  return {
    column: column,
    row: row
  };
}
},{}],"src/Position.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Position =
/*#__PURE__*/
function () {
  /**
   * Position: represents a position on the screen.
   * @param {int} x the X coordinate
   * @param {*} y the Y coordinate
   */
  function Position(x, y) {
    _classCallCheck(this, Position);

    this.x = x;
    this.y = y;
  }

  _createClass(Position, [{
    key: "isEqual",
    value: function isEqual(position) {
      return this.x === position.x && this.y === position.y;
    }
  }]);

  return Position;
}();

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
   * changes horizontal direction to -1 (left)
   */


  _createClass(Direction, [{
    key: "goLeft",
    value: function goLeft() {
      if (!this.h) {
        this.v = 0;
        this.h = -1;
      }
    }
    /**
     * changes horizontal direction to 1 (right)
     */

  }, {
    key: "goRight",
    value: function goRight() {
      if (!this.h) {
        this.v = 0;
        this.h = 1;
      }
    }
    /**
     * changes vertical direction to -1 (up)
     */

  }, {
    key: "goUp",
    value: function goUp() {
      if (!this.v) {
        this.v = -1;
        this.h = 0;
      }
    }
    /**
     * changes vertical direction to 1 (down)
     */

  }, {
    key: "goDown",
    value: function goDown() {
      if (!this.v) {
        this.v = 1;
        this.h = 0;
      }
    }
  }]);

  return Direction;
}();

exports.default = Direction;
},{}],"src/Configs.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.grid = exports.fps = void 0;
var fps = 10;
exports.fps = fps;
var grid = 15;
exports.grid = grid;
},{}],"src/Snake.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Position = _interopRequireDefault(require("./Position"));

var _Configs = require("./Configs");

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
   * @param {number} width the width of the snake (usually same as the grid)
   */
  function Snake(position, direction, size) {
    _classCallCheck(this, Snake);

    this.position = position;
    this.direction = direction;
    this.body = [position];
    this.size = size;
  }
  /**
   * draws the snake body
   */


  _createClass(Snake, [{
    key: "draw",
    value: function draw(context) {
      if (this.body.length > 1) {
        var tail = this.body[this.body.length - 1];
        context.clearRect(tail.x, tail.y, _Configs.grid, _Configs.grid);
      }

      context.fillRect(this.position.x, this.position.y, _Configs.grid, _Configs.grid);
    }
    /**
     * Returns true if the head of the snake hits its own body
     */

  }, {
    key: "isAHit",
    value: function isAHit() {
      var hit = false;

      for (var i = 1; i < this.body.length && !hit; i++) {
        hit = this.body[i].isEqual(this.position);
      }

      return hit;
    }
    /**
     * Updates the position of the snake based on its direction and evaluates if there's a hit.
     */

  }, {
    key: "update",
    value: function update() {
      // adds head's new position
      this.body.unshift(new _Position.default(this.position.x + this.direction.h * _Configs.grid, this.position.y + this.direction.v * _Configs.grid)); // updates head's position

      this.position = this.body[0];

      if (this.body.length >= this.size) {
        this.body.pop();
      }
    }
  }, {
    key: "goUp",
    value: function goUp() {
      this.direction.goUp();
    }
  }, {
    key: "goDown",
    value: function goDown() {
      this.direction.goDown();
    }
  }, {
    key: "goLeft",
    value: function goLeft() {
      this.direction.goLeft();
    }
  }, {
    key: "goRight",
    value: function goRight() {
      this.direction.goRight();
    }
  }]);

  return Snake;
}();

exports.default = Snake;
},{"./Position":"src/Position.js","./Configs":"src/Configs.js"}],"src/Fruit.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Configs = require("./Configs");

var _Position = _interopRequireDefault(require("./Position"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Fruit =
/*#__PURE__*/
function () {
  function Fruit(maxWidth, maxHeight) {
    _classCallCheck(this, Fruit);

    this.colors = {
      10: "#000000",
      20: "#FF0000",
      30: "#00FF00",
      40: "#0000FF"
    };
    this._maxWidth = maxWidth;
    this._maxHeight = maxHeight;
    this.position = this._generatePosition();
    this.points = this._generatePoints();
  }

  _createClass(Fruit, [{
    key: "_generatePosition",
    value: function _generatePosition() {
      var x = Math.random() * (this._maxWidth - _Configs.grid);

      var y = Math.random() * (this._maxHeight - _Configs.grid);

      return new _Position.default(x - x % _Configs.grid, y - y % _Configs.grid);
    }
  }, {
    key: "_generatePoints",
    value: function _generatePoints() {
      return (Math.trunc(Math.random() * 4) + 1) * 10;
    }
  }, {
    key: "updateFruit",
    value: function updateFruit() {
      console.log("new fruit!");
      this.position = this._generatePosition();
      this.points = this._generatePoints();
    }
  }, {
    key: "draw",
    value: function draw(context) {
      context.save();
      context.fillStyle = this.colors[this.points];
      context.fillRect(this.position.x, this.position.y, _Configs.grid, _Configs.grid);
      context.restore();
    }
  }]);

  return Fruit;
}();

exports.default = Fruit;
},{"./Configs":"src/Configs.js","./Position":"src/Position.js"}],"src/Key.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  _pressed: {},
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  SPACE: 32,
  isDown: function isDown(keyCode) {
    return this._pressed[keyCode];
  },
  onKeydown: function onKeydown(event) {
    if (!this._pressed[0]) this._pressed[event.keyCode] = true;
  },
  onKeyup: function onKeyup(event) {
    delete this._pressed[event.keyCode];
  }
};
exports.default = _default;
},{}],"src/scoreBar.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ScoreBar =
/*#__PURE__*/
function () {
  function ScoreBar(position, width, height, score) {
    _classCallCheck(this, ScoreBar);

    this.position = position;
    this.width = width;
    this.height = height;
    this.score = score;
  }

  _createClass(ScoreBar, [{
    key: "draw",
    value: function draw(context) {
      context.save();
      context.clearRect(this.position.x, this.position.y, this.width, this.height);
      context.fillRect(this.position.x, this.position.y, this.width, this.height);
      context.font = "".concat(this.height - 10, "px Arial");
      context.fillStyle = "#FFFFFF";
      context.fillText("Score ".concat(this.score), this.position.x + this.height - 10, this.position.y + this.height - 10);
      context.restore();
    }
  }]);

  return ScoreBar;
}();

exports.default = ScoreBar;
},{}],"src/Game.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Position = _interopRequireDefault(require("./Position"));

var _Direction = _interopRequireDefault(require("./Direction"));

var _Snake = _interopRequireDefault(require("./Snake"));

var _Fruit = _interopRequireDefault(require("./Fruit"));

var _Configs = require("./Configs");

var _Key = _interopRequireDefault(require("./Key"));

var _scoreBar = _interopRequireDefault(require("./scoreBar"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Game =
/*#__PURE__*/
function () {
  function Game(context) {
    _classCallCheck(this, Game);

    this.paused = false;
    this.score = new _scoreBar.default(new _Position.default(0, 0), innerWidth, 30, 0);
    window.addEventListener("keydown", function (evt) {
      return _Key.default.onKeydown(evt);
    }, false);
    window.addEventListener("keyup", function (evt) {
      return _Key.default.onKeyup(evt);
    }, false);
    this.snake = new _Snake.default(new _Position.default(innerWidth / 2 - _Configs.grid / 2 - (innerWidth / 2 - _Configs.grid / 2) % _Configs.grid, (innerHeight - this.score.height) / 2 - _Configs.grid / 2 - ((innerHeight - this.score.height) / 2 - _Configs.grid / 2) % _Configs.grid), new _Direction.default(0, 1), 4);
    this.fruit = new _Fruit.default(innerWidth, innerHeight - this.score.height, 1);
    this.context = context;
    this.snake.draw(this.context);
    this.fruit.draw(this.context);
    this.score.draw(this.context);
  }

  _createClass(Game, [{
    key: "run",
    value: function run() {
      var _this = this;

      if (this.paused) return;
      if (_Key.default.isDown(_Key.default.UP)) this.snake.goUp();
      if (_Key.default.isDown(_Key.default.DOWN)) this.snake.goDown();
      if (_Key.default.isDown(_Key.default.LEFT)) this.snake.goLeft();
      if (_Key.default.isDown(_Key.default.RIGHT)) this.snake.goRight();

      if (_Key.default.isDown(_Key.default.SPACE)) {
        this.paused = !this.paused;
        if (!this.paused) this.run();
      }

      setTimeout(function () {
        requestAnimationFrame(_this.run.bind(_this));

        _this.snake.update();

        if (_this.snake.isAHit()) {
          _this.paused = true;
          console.log("G A M E  O V E R!!!");
          return;
        } else {
          if (_this.snake.position.x < 0) {
            _this.snake.position.x = innerWidth - _Configs.grid;
          } else {
            if (_this.snake.position.x > innerWidth - _Configs.grid) {
              _this.snake.position.x = 0;
            }
          }

          if (_this.snake.position.y < _this.score.height) {
            _this.snake.position.y = innerHeight - _Configs.grid;
          } else {
            if (_this.snake.position.y > innerHeight - _Configs.grid) {
              _this.snake.position.y = _this.score.height;
            }
          }

          if (_this.snake.position.isEqual(_this.fruit.position)) {
            _this.snake.size++;
            _this.score.score += _this.fruit.points;

            _this.fruit.updateFruit();

            _this.fruit.draw(_this.context);

            _this.score.draw(_this.context);
          }

          _this.snake.draw(_this.context);
        }
      }, 1000 / _Configs.fps);
    }
  }]);

  return Game;
}();

exports.default = Game;
},{"./Position":"src/Position.js","./Direction":"src/Direction.js","./Snake":"src/Snake.js","./Fruit":"src/Fruit.js","./Configs":"src/Configs.js","./Key":"src/Key.js","./scoreBar":"src/scoreBar.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _utils = require("./src/utils");

var _Game = _interopRequireDefault(require("./src/Game"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var context = (0, _utils.createHiDPICanvas)("canvas", innerWidth, innerHeight);
var game = new _Game.default(context);
game.run();
},{"./src/utils":"src/utils.js","./src/Game":"src/Game.js"}],"node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60628" + '/');

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