export default class ScoreBar {
  constructor(position, width, height, score) {
    this.position = position;
    this.width = width;
    this.height = height;
    this.score = score;
  }

  draw(context) {
    context.save();
    context.clearRect(
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
    context.font = `${this.height - 10}px Arial`;
    context.fillStyle = "#FFFFFF";
    context.fillText(
      `Score ${this.score}`,
      this.position.x + this.height - 10,
      this.position.y + this.height - 10
    );
    context.restore();
  }
}
