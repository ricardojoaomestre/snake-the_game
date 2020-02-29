import { createHiDPICanvas } from "./src/utils";

import Game from "./src/Game";
const context = createHiDPICanvas("canvas", innerWidth, innerHeight);

const game = new Game(context);
window.addEventListener("keydown", evt => {
  game.handleKeys(evt.keyCode);
});

game.run();
