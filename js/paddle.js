class Paddle {
  constructor(x, y, width, height, yVel) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.yVel = yVel;
  }

  draw(ctx) {
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  paddleBounce(ball) {
    if (ball.y <= this.y + this.height
        && ball.y + ball.radius >= this.y) { // within bounds

      if (Math.abs(ball.xVel) < 10) {
        ball.xVel *= -1.25;
      } else {
        ball.xVel = -ball.xVel;
      }

      // different ball speeds if you hit the bottom or upper tip
      if (ball.y > this.y + this.height*(5/6)) {
        ball.yVel = 6;
      }
      else if (ball.y < this.y + this.height*(1/6)) {
        ball.yVel = -6;
      }
      else if (ball.y > this.y + this.height*(2/3)) {
        ball.yVel = 4;
      }
      else if (ball.y < this.y + this.height*(1/3)) {
        ball.yVel = -4;
      } else {
        if (ball.yVel > 0) {
          ball.yVel = 3;
        } else {
          ball.yVel = -3;
        }
      }

    }
  }

}

export default Paddle;
