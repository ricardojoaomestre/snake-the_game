import Position from "./Position";
import Direction from "./Direction";
import Snake from "./Snake";
import World from "./World";

export default class Game {
  constructor(width, height, fps, gridSize) {
    this.width = width;
    this.height = height;
    this.context = window.context;
    this.gridSize = gridSize;
    this.fps = fps;
    this.paused = false;
    this.snake = null;
    this.createWorld();
    this.createSnake();
  }

  createSnake() {
    this.snake = new Snake(
      new Position(0, 0),
      new Direction(1, 0),
      this.gridSize
    );
    this.snake.draw();
  }

  createWorld() {
    this.world = new World(this.width, this.height);
    this.world.draw();
  }

  run() {
    if (this.paused || !this.snake) return;
    setTimeout(() => {
      requestAnimationFrame(this.run.bind(this));
      this.snake.update();
      if (this.world.isFruitEaten(this.snake.position)) {
        this.world.fruits.push(this.world.generateFruit());
      }
    }, 1000 / this.fps);
  }

  handleKeys(keyCode) {
    switch (keyCode) {
      case 38:
        this.snake.direction.canGoUp() && this.snake.direction.goUp();
        break;
      case 40:
        this.snake.direction.canGoDown() && this.snake.direction.goDown();
        break;
      case 37:
        this.snake.direction.canGoLeft() && this.snake.direction.goLeft();

        break;
      case 39:
        this.snake.direction.canGoRight() && this.snake.direction.goRight();
        break;
      case 32:
        this.paused = !this.paused;
        if (!this.paused) this.run();
        break;
    }
  }
}
