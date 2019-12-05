const WIDTH = 630;
const HEIGHT = 460;

const ROWS = 10;
const COLS = 20;

let canvas1 = document.getElementById("canvas1");
let canvas2 = document.getElementById("canvas2");

function Helix(canvas, width, height, rows, cols) {
  this.canvas = canvas;
  this.canvas.width = width;
  this.canvas.height = height;
  this.context = this.canvas.getContext("2d");
  this.rows = rows;
  this.cols = cols;

  this.createCircles = new CreateCircles(this.context, this.rows, this.cols);

  this.drawCanvas = function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillStyle = "#073a4b";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.createCircles.drawCircles();
  };

  this.gameLoop = function() {
    this.drawCanvas();
    requestAnimationFrame(this.gameLoop.bind(this));
  };

  this.gameLoop();
}

new Helix(canvas1, WIDTH, HEIGHT, ROWS, COLS);
new Helix(canvas2, WIDTH, HEIGHT, ROWS, COLS);
