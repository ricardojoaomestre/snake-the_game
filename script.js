var PIXEL_RATIO = (function() {
  var ctx = document.getElementById("canvas").getContext("2d"),
    dpr = window.devicePixelRatio || 1,
    bsr =
      ctx.webkitBackingStorePixelRatio ||
      ctx.mozBackingStorePixelRatio ||
      ctx.msBackingStorePixelRatio ||
      ctx.oBackingStorePixelRatio ||
      ctx.backingStorePixelRatio ||
      1;

  return dpr / bsr;
})();

/**
 * Returns the context and canvas configured to support the aspect ratio of the browser
 * @param {int} w window width
 * @param {int} h window height
 * @param {int} ratio device aspect ratio
 */
const createHiDPICanvas = function(w, h, ratio) {
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
  return { canvas: can, context: ctx };
};

const width = window.innerWidth;
const height = window.innerHeight;
var { canvas, context } = createHiDPICanvas(width, height);

class Position {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Direction {
  constructor(h, v) {
    this.h = h;
    this.v = v;
  }

  canGoLeft() {
    return this.h === 0;
  }
  goLeft() {
    this.v = 0;
    this.h = 1;
  }

  canGoRight() {
    return this.h === 0;
  }
  goRight() {
    this.v = 0;
    this.h = -1;
  }

  canGoUp() {
    return this.v === 0;
  }

  goUp() {
    this.v = -1;
    this.h = 0;
  }

  canGoDown() {
    return this.v === 0;
  }

  goDown() {
    this.v = 1;
    this.h = 0;
  }
}

class Snake {
  SNAKE_SQUARE = 14;
  constructor(p, d) {
    this.position = p;
    this.direction = d;
    this.body = [p];
    this.size = 10;
  }

  draw() {
    for (var i = 0; i < this.body.length; i++) {
      context.fillRect(
        this.body[i].x * this.SNAKE_SQUARE + this.SNAKE_SQUARE / 2,
        this.body[i].y * this.SNAKE_SQUARE + this.SNAKE_SQUARE / 2,
        this.SNAKE_SQUARE,
        this.SNAKE_SQUARE
      );
    }
  }

  isAHit() {
    var hit = false;
    for (var i = 1; i < this.body.length && !hit; i++) {
      hit =
        this.body[i].x === this.body[0].x && this.body[i].y === this.body[0].y;
    }
    return hit;
  }

  update() {
    const pos = new Position(
      this.body[0].x + this.direction.h,
      this.body[0].y + this.direction.v
    );
    this.body.unshift(pos);
    if (this.body.length === this.size) {
      this.body.pop();
    }
    if (this.isAHit()) {
      paused = true;
      console.log("lost!");
    } else {
      this.draw();
    }
  }
}

var fps = 8;
var paused = false;
const snake = new Snake(new Position(0, 0), new Direction(1, 0));

function animate() {
  if (paused) return;
  setTimeout(function() {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    snake.update();
  }, 1000 / fps);
}

animate();

window.addEventListener("keydown", evt => {
  switch (evt.keyCode) {
    case 38:
      snake.direction.canGoUp() && snake.direction.goUp();
      break;
    case 40:
      snake.direction.canGoDown() && snake.direction.goDown();
      break;
    case 37:
      snake.direction.canGoRight() && snake.direction.goRight();
      break;
    case 39:
      snake.direction.canGoLeft() && snake.direction.goLeft();
      break;
    case 32:
      paused = !paused;
      if (!paused) animate();
      break;
  }
});
