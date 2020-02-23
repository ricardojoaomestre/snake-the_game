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

  goLeft() {
    this.v = 0;
    this.h = 1;
  }

  goRight() {
    this.v = 0;
    this.h = -1;
  }

  goUp() {
    this.v = -1;
    this.h = 0;
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
    this.size = 2;
  }

  draw() {
    for (var i = 0; i < this.size; i++) {
      context.fillRect(
        this.body[i].x * this.SNAKE_SQUARE + this.SNAKE_SQUARE / 2,
        this.body[i].y * this.SNAKE_SQUARE + this.SNAKE_SQUARE / 2,
        this.SNAKE_SQUARE,
        this.SNAKE_SQUARE
      );
    }
  }

  update() {
    var temp;
    if (this.body.length >= this.size) {
      temp = this.body.pop();
    } else {
      temp = new Position(this.body[0].x, this.body[0].y);
    }

    temp.x += this.direction.h;
    temp.y += this.direction.v;
    this.body.unshift(temp);
    this.draw();
  }
}

var fps = 5;
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
      snake.direction.goUp();
      break;
    case 40:
      snake.direction.goDown();
      break;
    case 37:
      snake.direction.goRight();
      break;
    case 39:
      snake.direction.goLeft();
      break;
    case 32:
      paused = !paused;
      if (!paused) animate();
      break;
  }
});
