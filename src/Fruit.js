import { grid } from "./Configs";
import Position from "./Position";

export default class Fruit {
  constructor(maxWidth, maxHeight, points) {
    this._maxWidth = maxWidth;
    this._maxHeight = maxHeight;
    this.position = this._generatePosition();

    this.points = points;
  }

  _generatePosition() {
    const x = Math.random() * this._maxWidth;
    const y = Math.random() * this._maxHeight;
    return new Position(x - (x % grid), y - (y % grid));
  }

  updateFruit() {
    console.log("new fruit!");
    this.position = this._generatePosition();
  }

  draw(context) {
    context.save();
    context.fillStyle = "#FF0000";
    context.fillRect(this.position.x, this.position.y, grid, grid);
    context.restore();
  }
}
