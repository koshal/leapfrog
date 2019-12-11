function Circle(context, isFaded) {
  this.context = context;
  this.radius = 0;
  this.radiusAmp = 15;
  this.isFaded = isFaded;
  this.point = {
    x: 100,
    y: 100
  };

  this.currentX = 0;
  this.currentY = 100;
  this.angle = 180;
  this.changes = 80;
  this.omega = 3;

  this.drawCircle = function() {
    this.context.beginPath();
    this.context.fillStyle = "#fcae78";
    this.context.arc(this.point.x, this.point.y, this.radius, 0, 2 * Math.PI);
    this.context.closePath();
    this.context.fill();
  };

  this.updateCircle = function() {
    let tempX;

    if (this.currentX <= this.angle) {
      this.currentX++;
      tempX = (this.omega * this.currentX * Math.PI) / this.angle;
      console.log(tempX);

      if (!this.isFaded) {
        this.point.y = this.changes * Math.sin(tempX) + this.currentY;
        this.radius =
          (this.radiusAmp / 2) * Math.cos(tempX) + this.radiusAmp / 2;
      } else {
        this.point.y = this.changes * Math.sin(tempX + Math.PI) + this.currentY;
        this.radius =
          (this.radiusAmp / 2) * Math.cos(tempX + Math.PI) + this.radiusAmp / 2;
      }
    } else {
      this.currentX = 0;
    }
  };
}
