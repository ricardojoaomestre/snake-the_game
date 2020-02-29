import Position from "./Position";
import Direction from "./Direction";
import Snake from "./Snake";
import Fruit from "./Fruit";
import { grid, fps } from "./Configs";

export default class Game {
  constructor(context) {
    this.paused = false;
    this.score = 0;
    this.snake = new Snake(
      new Position(
        innerWidth / 2 - grid / 2 - ((innerWidth / 2 - grid / 2) % grid),
        innerHeight / 2 - grid / 2 - ((innerHeight / 2 - grid / 2) % grid)
      ),
      new Direction(0, 1),
      4
    );
    this.fruit = new Fruit(innerWidth, innerHeight, 1);
    this.context = context;
    this.snake.draw(this.context);
    this.fruit.draw(this.context);
  }

  run() {
    if (this.paused) return;

    setTimeout(() => {
      requestAnimationFrame(this.run.bind(this));
      this.snake.update();
      if (this.snake.isAHit()) {
        this.paused = true;
        console.log("G A M E  O V E R!!!");
      } else {
        if (this.snake.position.x < 0) {
          this.snake.position.x = innerWidth;
        } else {
          if (this.snake.position.x > innerWidth) {
            this.snake.position.x = 0;
          }
        }
        if (this.snake.position.y < 0) {
          this.snake.position.y = innerHeight;
        } else {
          if (this.snake.position.y > innerHeight) {
            this.snake.position.y = 0;
          }
        }

        if (this.snake.position.isEqual(this.fruit.position)) {
          this.fruit.updateFruit();
          this.fruit.draw(this.context);
          this.snake.size++;
          this.score += this.fruit.points;
        }

        this.snake.draw(this.context);
      }
    }, 1000 / fps);
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
