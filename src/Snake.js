import Position from "./Position";
import { grid } from "./Configs";

export default class Snake {
  /**
   * Snake: Represents the game actor: the snake.
   * @param {Position} p the position of the head of the snake
   * @param {Direction} d the direction of the snake
   * @param {number} width the width of the snake (usually same as the grid)
   */
  constructor(position, direction, size) {
    this.position = position;
    this.direction = direction;
    this.body = [position];
    this.size = size;
  }

  /**
   * draws the snake body
   */
  draw(context) {
    if (this.body.length > 1) {
      var tail = this.body[this.body.length - 1];
      context.clearRect(tail.x, tail.y, grid, grid);
    }
    context.fillRect(this.position.x, this.position.y, grid, grid);
  }

  /**
   * Returns true if the head of the snake hits its own body
   */
  isAHit() {
    var hit = false;
    for (var i = 1; i < this.body.length && !hit; i++) {
      hit = this.body[i].isEqual(this.position);
    }
    return hit;
  }

  /**
   * Updates the position of the snake based on its direction and evaluates if there's a hit.
   */
  update() {
    // adds head's new position
    this.body.unshift(
      new Position(
        this.position.x + this.direction.h * grid,
        this.position.y + this.direction.v * grid
      )
    );
    // updates head's position
    this.position = this.body[0];
    if (this.body.length >= this.size) {
      this.body.pop();
    }
  }
}
