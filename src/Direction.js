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
   * returns true if it's possible to turn left
   */
  canGoLeft() {
    return this.h === 0;
  }

  /**
   * changes horizontal direction to -1 (left)
   */
  goLeft() {
    this.v = 0;
    this.h = -1;
  }

  /**
   * returns true if it's possible to turn right
   */
  canGoRight() {
    return this.h === 0;
  }

  /**
   * changes horizontal direction to 1 (right)
   */
  goRight() {
    this.v = 0;
    this.h = 1;
  }

  /**
   * returns true if it's possible to turn up
   */
  canGoUp() {
    return this.v === 0;
  }

  /**
   * changes vertical direction to -1 (up)
   */
  goUp() {
    this.v = -1;
    this.h = 0;
  }

  /**
   * returns true if it's possible to turn down
   */
  canGoDown() {
    return this.v === 0;
  }

  /**
   * changes vertical direction to 1 (down)
   */
  goDown() {
    this.v = 1;
    this.h = 0;
  }
}
