import { createHiDPICanvas } from "./src/utils";
import Game from "./src/Game";

const width = window.innerWidth;
const height = window.innerHeight;

window.context = createHiDPICanvas("canvas", width, height);
const game = new Game(width, height, 8, 15);
window.addEventListener("keydown", evt => {
  game.handleKeys(evt.keyCode);
});

game.run();
