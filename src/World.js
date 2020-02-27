import Position from "./Position";

export default class World {
  constructor(height, width, gridSize) {
    this.fruits = [];
    this.width = width;
    this.height = height;
    this.context = window.context;
    this.gridSize = gridSize;
    this.maxFruits = 5;
    this.fruitSize = 15;
    for (var i = 0; i < this.maxFruits; i++) {
      const newFruit = this.generateFruit();
      console.log(newFruit);
      this.fruits.push(newFruit);
    }
  }

  generateFruit() {
    const x = Math.random() * this.width;
    const y = Math.random() * this.height;
    return new Position(x - (x % this.fruitSize), y - (y % this.fruitSize));
  }

  draw() {
    this.context.save();
    this.context.fillStyle = "rgb(255,0,0)";
    for (var i = 0; i < this.fruits.length; i++) {
      const x = Math.abs(
        this.fruits[i].x - (this.fruits[i].x % this.fruitSize)
      );
      const y = Math.abs(
        this.fruits[i].y - (this.fruits[i].y % this.fruitSize)
      );
      console.log(`Fruit ${x} ${y}`);
      this.context.beginPath();
      this.context.fillRect(x, y, this.fruitSize, this.fruitSize);
      this.context.closePath();
    }
    this.context.restore();
  }

  isFruitEaten(snakePosition) {
    const value = this.fruits.findIndex(
      fruit =>
        Math.abs(fruit.x - (fruit.x % this.fruitSize)) ===
          snakePosition.x * this.fruitSize &&
        Math.abs(fruit.y - (fruit.y % this.fruitSize)) ===
          snakePosition.y * this.fruitSize
    );
    if (value !== -1) {
      const newFruit = this.generateFruit();
      this.fruits.splice(value, 1, newFruit);
    }
  }
}
