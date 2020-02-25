import Position from "./Position";

export default class World {
  constructor(height, width, context) {
    this.fruits = [];
    this.width = width;
    this.height = height;
    this.context = context;
    this.maxFruits = 5;
    this.fruitSize = 15;
    for (var i = 0; i < this.maxFruits; i++) {
      this.fruits.push(this.generateFruit());
    }
  }

  generateFruit() {
    return new Position(
      Math.random() * this.width,
      Math.random() * this.height
    );
  }

  draw() {
    this.context.save();
    this.context.fillStyle = "rgb(255,0,0)";
    for (var i = 0; i < this.fruits.length; i++) {
      this.context.beginPath();
      this.context.fillRect(
        this.fruits[i].x,
        this.fruits[i].y,
        this.fruitSize,
        this.fruitSize
      );
      this.context.closePath();
    }
    this.context.restore();
  }
}
