export default class Fruit {
  constructor(size) {
    this.colors = {
      10: "#000000",
      20: "#FF0000",
      30: "#00FF00",
      40: "#0000FF"
    };
    this.size = size;
    this.position = null;
    this.points = null;
  }

  draw(context) {
    context.save();
    context.fillStyle = this.colors[this.points];
    context.fillRect(this.position.x, this.position.y, this.size, this.size);
    context.restore();
  }
}
