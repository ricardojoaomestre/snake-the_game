export default class Position {
  /**
   * Position: represents a position on the screen.
   * @param {int} x the X coordinate
   * @param {*} y the Y coordinate
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  isEqual(position) {
    return this.x === position.x && this.y === position.y;
  }
}
