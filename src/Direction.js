export default class Direction {
  /**
   *
   * Direction: represents a direction by horizontal e vertical properties.
   * @param {int} h horizontal direction (-1: left; 0: neutral; 1: right)
   * @param {int} v vertical direction (-1: up; 0: neutral; 1: down)
   */
  constructor(h, v) {
    this.h = h;
    this.v = v;
  }

  /**
   * changes horizontal direction to -1 (left)
   */
  goLeft() {
    if (!this.h) {
      this.v = 0;
      this.h = -1;
    }
  }

  /**
   * changes horizontal direction to 1 (right)
   */
  goRight() {
    if (!this.h) {
      this.v = 0;
      this.h = 1;
    }
  }

  /**
   * changes vertical direction to -1 (up)
   */
  goUp() {
    if (!this.v) {
      this.v = -1;
      this.h = 0;
    }
  }

  /**
   * changes vertical direction to 1 (down)
   */
  goDown() {
    if (!this.v) {
      this.v = 1;
      this.h = 0;
    }
  }
}
