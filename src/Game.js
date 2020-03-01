import Position from "./Position";
import Direction from "./Direction";
import Snake from "./Snake";
import Fruit from "./Fruit";
import { grid, fps } from "./Configs";
import Key from "./Key";
import ScoreBar from "./scoreBar";
import { randomBetween } from "./utils";

export default class Game {
  constructor(context) {
    this.context = context;
    window.context = context;
    this.paused = false;
    this.board = {
      top: 30,
      bottom: innerHeight - (innerHeight % grid),
      left: 0,
      right: innerWidth - (innerWidth % grid),
      width: innerWidth - (innerWidth % grid) - 0,
      height: innerHeight - (innerHeight % grid) - 30
    };

    this.score = null;
    this.fruit = null;
    this.snake = null;
    this.setup();

    window.addEventListener(
      "keydown",
      evt => {
        if (evt.keyCode === Key.SPACE) {
          this.paused = !this.paused;
          if (!this.paused) this.run();
        } else {
          Key.onKeydown(evt);
        }
      },
      false
    );
    window.addEventListener("keyup", evt => Key.onKeyup(evt), false);

    this.snake.draw(this.context);
    this.fruit.draw(this.context);
    this.score.draw(this.context);
  }

  setup() {
    this.score = new ScoreBar(
      new Position(0, 0),
      this.board.width,
      this.board.top,
      0
    );
    this.fruit = new Fruit(grid);
    this.snake = this.createSnake();

    this.generateNewFruit();
  }

  createSnake() {
    const x =
      this.board.width / 2 -
      grid / 2 -
      ((this.board.width / 2 - grid / 2) % grid);
    const y =
      this.board.height / 2 -
      grid / 2 -
      ((this.board.height / 2 - grid / 2) % grid);
    return new Snake(new Position(x, y), new Direction(0, 1), 4);
  }

  generateNewFruit() {
    this.fruit.position = this.generateFruitPosition();
    this.fruit.points = this.generateFruitPoints();
  }

  generateFruitPosition() {
    const x = randomBetween(this.board.left, this.board.right - grid);
    const y = randomBetween(this.board.top, this.board.bottom - grid);
    return new Position(x - (x % grid), y - (y % grid));
  }

  generateFruitPoints() {
    return randomBetween(1, 4) * 10;
  }

  checkLimits() {
    if (this.snake.position.x < this.board.left) {
      this.snake.position.x = this.board.right - grid;
    } else {
      if (this.snake.position.x > this.board.right - grid) {
        this.snake.position.x = this.board.left;
      }
    }
    if (this.snake.position.y < this.board.top) {
      this.snake.position.y = this.board.bottom;
    } else {
      if (this.snake.position.y > this.board.bottom) {
        this.snake.position.y = this.board.top;
      }
    }
  }

  checkMeal() {
    if (this.snake.position.isEqual(this.fruit.position)) {
      this.snake.size++;
      this.score.score += this.fruit.points;
      this.generateNewFruit();

      this.fruit.draw(this.context);
      this.score.draw(this.context);
    }
  }

  run() {
    if (this.paused) return;
    if (Key.isDown(Key.UP)) this.snake.goUp();
    if (Key.isDown(Key.DOWN)) this.snake.goDown();
    if (Key.isDown(Key.LEFT)) this.snake.goLeft();
    if (Key.isDown(Key.RIGHT)) this.snake.goRight();

    setTimeout(() => {
      requestAnimationFrame(this.run.bind(this));

      this.snake.update();
      if (!this.snake.isAHit()) {
        this.checkLimits();
        this.checkMeal();
        this.snake.draw(this.context);
      } else {
        this.paused = true;
        console.log("G A M E  O V E R!!!");
      }
    }, 1000 / fps);
  }
}
