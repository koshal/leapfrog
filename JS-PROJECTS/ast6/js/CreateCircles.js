function CreateCircles(context, rows, cols) {
  this.context = context;
  this.rows = rows;
  this.cols = cols;
  this.initialPoint = {
    x: 100,
    y: 60
  };

  this.gap = 30;
  this.circles = [];

  this.updateCircles = function() {
    this.create(false);
    this.create(true);
  };

  this.drawCircles = function() {
    console.log(this.circles.length);
    for (let i = 0; i < this.circles.length; i++) {
      this.circles[i].updateCircle();
      this.circles[i].drawCircle();
    }
  };

  this.create = function(isOutofContext) {
    let currentY = this.initialPoint.y;

    for (let i = 0; i < this.rows; i++) {
      currentY += this.gap;

      let currentX = 0;
      let phaseIncrement = 6;
      let currentPhase = 0;

      for (let j = 0; j < this.cols; j++) {
        let circle = new Circle(this.context, isOutofContext);

        circle.point.x = currentX += this.gap;
        circle.point.y = currentY;
        circle.currentX = currentPhase += phaseIncrement;
        circle.currentY = currentY;

        this.circles.push(circle);
      }
    }
  };

  this.updateCircles();
  // console.log(this.updateCircle);
}
