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
