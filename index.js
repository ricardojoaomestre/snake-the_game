import Position from "./src/Position";
import Direction from "./src/Direction";
import Snake from "./src/Snake";
import World from "./src/World";

const width = window.innerWidth;
const height = window.innerHeight;
const fps = 8; // game speed
var paused = false; // game pause trigger
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

var { canvas, context } = createHiDPICanvas(width, height);
const snake = new Snake(new Position(0, 0), new Direction(1, 0), context);
const world = new World(width, height, context);

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

world.draw();
animate();
