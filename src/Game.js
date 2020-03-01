import Position from "./Position";
import Direction from "./Direction";
import Snake from "./Snake";
import Fruit from "./Fruit";
import { grid, fps } from "./Configs";
import Key from "./Key";

export default class Game {
  constructor(context) {
    this.paused = false;
    this.score = 0;
    window.addEventListener("keydown", evt => Key.onKeydown(evt), false);
    window.addEventListener("keyup", evt => Key.onKeyup(evt), false);

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
    if (Key.isDown(Key.UP)) this.snake.goUp();
    if (Key.isDown(Key.DOWN)) this.snake.goDown();
    if (Key.isDown(Key.LEFT)) this.snake.goLeft();
    if (Key.isDown(Key.RIGHT)) this.snake.goRight();
    if (Key.isDown(Key.SPACE)) {
      this.paused = !this.paused;
      if (!this.paused) this.run();
    }

    setTimeout(() => {
      requestAnimationFrame(this.run.bind(this));
      this.snake.update();

      if (this.snake.isAHit()) {
        this.paused = true;
        console.log("G A M E  O V E R!!!");
        return;
      } else {
        if (this.snake.position.x < 0) {
          this.snake.position.x = innerWidth - grid;
        } else {
          if (this.snake.position.x > innerWidth - grid) {
            this.snake.position.x = 0;
          }
        }
        if (this.snake.position.y < 0) {
          this.snake.position.y = innerHeight - grid;
        } else {
          if (this.snake.position.y > innerHeight - grid) {
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
}
