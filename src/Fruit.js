import { grid } from "./Configs";
import Position from "./Position";

export default class Fruit {
  constructor(maxWidth, maxHeight) {
    this.colors = {
      10: "#000000",
      20: "#FF0000",
      30: "#00FF00",
      40: "#0000FF"
    };
    this._maxWidth = maxWidth;
    this._maxHeight = maxHeight;
    this.position = this._generatePosition();
    this.points = this._generatePoints();
  }

  _generatePosition() {
    const x = Math.random() * (this._maxWidth - grid);
    const y = Math.random() * (this._maxHeight - grid);
    return new Position(x - (x % grid), y - (y % grid));
  }

  _generatePoints() {
    return (Math.trunc(Math.random() * 4) + 1) * 10;
  }

  updateFruit() {
    console.log("new fruit!");
    this.position = this._generatePosition();
    this.points = this._generatePoints();
  }

  draw(context) {
    context.save();
    context.fillStyle = this.colors[this.points];
    context.fillRect(this.position.x, this.position.y, grid, grid);
    context.restore();
  }
}
