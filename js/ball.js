class Ball {
  constructor(x, y, radius, xVel, yVel) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.xVel = xVel;
    this.yVel = yVel;
  }

  draw(ctx) {
    // square ball
    ctx.fillRect(this.x, this.y, this.radius, this.radius);

    // // round ball
    // ctx.beginPath();
    // ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI, false);
    // ctx.fill();
  }

  resetBall() {
    this.xVel = -this.xVel;
    this.x = window.innerWidth/2;
    this.y = window.innerHeight/2;
  }
}

export default Ball;
