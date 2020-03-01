export function getPixelRatio(canvasId) {
  var ctx = document.getElementById(canvasId).getContext("2d"),
    dpr = window.devicePixelRatio || 1,
    bsr =
      ctx.webkitBackingStorePixelRatio ||
      ctx.mozBackingStorePixelRatio ||
      ctx.msBackingStorePixelRatio ||
      ctx.oBackingStorePixelRatio ||
      ctx.backingStorePixelRatio ||
      1;

  return dpr / bsr;
}

/**
 * Returns the context and canvas configured to support the aspect ratio of the browser
 * @param {int} w window width
 * @param {int} h window height
 * @param {int} ratio device aspect ratio
 */
export function createHiDPICanvas(canvasId, w, h, ratio) {
  if (!ratio) {
    ratio = getPixelRatio(canvasId);
  }
  var can = document.getElementById(canvasId);
  can.width = w * ratio;
  can.height = h * ratio;
  can.style.width = w + "px";
  can.style.height = h + "px";
  var ctx = can.getContext("2d");
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  return ctx;
}

export function toGrid(x, y, gridSize) {
  const column = Math.abs(x / gridSize);
  const row = Math.abs(y / gridSize);
  return { column, row };
}

export function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
