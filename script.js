const width = window.innerWidth;
const height = window.innerHeight;
const fps = 8; // game speed
var paused = false; // game pause trigger
const MAX_SIZE = 30;
const MATRIX_SIZE = 15;
/**
 * Calculates the pixel ratio of the screen
 */
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

class Position {
  /**
   * Position: represents a position on the screen.
   * @param {int} x the X coordinate
   * @param {*} y the Y coordinate
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Direction {
  /**
   *
   * Direction: represents a direction by horizontal e vertical properties.
   * @param {int} h horizontal direction (-1: left; 0: neutral; 1: right)
   * @param {int} v vertical direction (-1: up; 0: neutral; 1: down)
   */
  constructor(h, v) {
    this.h = h;
    this.v = v;
  }

  /**
   * returns true if it's possible to turn left
   */
  canGoLeft() {
    return this.h === 0;
  }

  /**
   * changes horizontal direction to -1 (left)
   */
  goLeft() {
    this.v = 0;
    this.h = -1;
  }

  /**
   * returns true if it's possible to turn right
   */
  canGoRight() {
    return this.h === 0;
  }

  /**
   * changes horizontal direction to 1 (right)
   */
  goRight() {
    this.v = 0;
    this.h = 1;
  }

  /**
   * returns true if it's possible to turn up
   */
  canGoUp() {
    return this.v === 0;
  }

  /**
   * changes vertical direction to -1 (up)
   */
  goUp() {
    this.v = -1;
    this.h = 0;
  }

  /**
   * returns true if it's possible to turn down
   */
  canGoDown() {
    return this.v === 0;
  }

  /**
   * changes vertical direction to 1 (down)
   */
  goDown() {
    this.v = 1;
    this.h = 0;
  }
}

class Snake {
  SNAKE_SQUARE = MATRIX_SIZE;
  /**
   * Snake: Represents the game actor: the snake.
   * @param {Position} p the position of the head of the snake
   * @param {Direction} d the direction of the snake
   */
  constructor(p, d) {
    this.position = p;
    this.direction = d;
    this.body = [p];
    this.size = MAX_SIZE;
  }

  /**
   * draws the snake body
   */
  draw() {
    context.fillRect(
      this.position.x * this.SNAKE_SQUARE + this.SNAKE_SQUARE / 2,
      this.position.y * this.SNAKE_SQUARE + this.SNAKE_SQUARE / 2,
      this.SNAKE_SQUARE,
      this.SNAKE_SQUARE
    );
  }

  /**
   * Returns true if the head of the snake hits its own body
   */
  isAHit() {
    var hit = false;
    for (var i = 1; i < this.body.length && !hit; i++) {
      hit =
        this.body[i].x === this.position.x &&
        this.body[i].y === this.position.y;
    }
    return hit;
  }

  /**
   * Updates the position of the snake based on its direction and evaluates if there's a hit.
   */
  update() {
    var tail;
    // adds head's new position
    this.body.unshift(
      new Position(
        this.position.x + this.direction.h,
        this.position.y + this.direction.v
      )
    );

    // updates head's position
    this.position = this.body[0];

    if (this.isAHit()) {
      paused = true;
      console.log("lost!");
    } else {
      // if body has grown enough, remove the tail at the end
      if (this.body.length === this.size) {
        tail = this.body.pop();
        context.clearRect(
          tail.x * this.SNAKE_SQUARE + this.SNAKE_SQUARE / 2,
          tail.y * this.SNAKE_SQUARE + this.SNAKE_SQUARE / 2,
          this.SNAKE_SQUARE,
          this.SNAKE_SQUARE
        );
      }

      // the game pauses and prints 'lost', else draw the snake
      this.draw();
    }
  }
}

class World {
  MAX_FRUITS = 5;
  FRUIT_SIZE = MATRIX_SIZE;
  constructor() {
    this.fruits = [];
    for (var i = 0; i < this.MAX_FRUITS; i++) {
      this.fruits.push(this.generateFruit());
    }
  }

  generateFruit() {
    return new Position(
      Math.random() * window.innerWidth,
      Math.random() * window.innerHeight
    );
  }

  draw() {
    context.save();
    context.fillStyle = "rgb(255,0,0)";
    for (var i = 0; i < this.fruits.length; i++) {
      context.beginPath();
      context.fillRect(
        this.fruits[i].x,
        this.fruits[i].y,
        this.FRUIT_SIZE,
        this.FRUIT_SIZE
      );
      context.closePath();
    }
    context.restore();
  }
}

var { canvas, context } = createHiDPICanvas(width, height);
const snake = new Snake(new Position(0, 0), new Direction(1, 0));
const world = new World();
world.draw();

/**
 * Animation loop function
 */
function animate() {
  if (paused) return;

  setTimeout(function() {
    requestAnimationFrame(animate);
    snake.update();
  }, 1000 / fps);
}

/**
 * Key events to move the snake
 */
window.addEventListener("keydown", evt => {
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

animate();
