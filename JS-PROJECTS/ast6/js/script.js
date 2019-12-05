const WIDTH = 630;
const HEIGHT = 460;

const ROWS = 10;
const COLS = 20;

let canvas1 = document.getElementById("canvas1");
let canvas2 = document.getElementById("canvas2");

new Helix(canvas1, WIDTH, HEIGHT, ROWS, COLS);
new Helix(canvas2, WIDTH, HEIGHT, ROWS, COLS);
