import Position from "./Position";

export default class Snake {
  /**
   * Snake: Represents the game actor: the snake.
   * @param {Position} p the position of the head of the snake
   * @param {Direction} d the direction of the snake
   * @param {Object} c the canvas context
   */
  constructor(p, d, c) {
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
  draw() {
    this.context.fillRect(
      this.position.x * this.snakeSquare + this.snakeSquare / 2,
      this.position.y * this.snakeSquare + this.snakeSquare / 2,
      this.snakeSquare,
      this.snakeSquare
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
        this.context.clearRect(
          tail.x * this.snakeSquare + this.snakeSquare / 2,
          tail.y * this.snakeSquare + this.snakeSquare / 2,
          this.snakeSquare,
          this.snakeSquare
        );
      }

      // the game pauses and prints 'lost', else draw the snake
      this.draw();
    }
  }
}
