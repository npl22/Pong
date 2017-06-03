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
    if (ball.y <= this.y + this.height && ball.y >= this.y) { // within bounds

      console.log(ball.xVel);
      if (Math.abs(ball.xVel) < 7) {
        ball.xVel *= -1.25;
      } else {
        ball.xVel = -ball.xVel;
      }

      // Paddle moving up
      if (this.y < this.oldY) {
        if (ball.y > this.y + this.height/2) { // bottom half of paddle
          ball.yVel = Math.abs(ball.yVel * 0.75);
        }
        else if (ball.y < this.y + this.height/2) { // top half of paddle
          ball.yVel = -Math.abs(ball.yVel * 1.25);
        }
      }
      // Paddle moving down
      else if (this.y > this.oldY) {
        if (ball.y > this.y + this.height/2) { // bottom half of paddle
          ball.yVel = Math.abs(ball.yVel * 1.25);
        }
        else if (ball.y < this.y + this.height/2) { // top half of paddle
          ball.yVel = -Math.abs(ball.yVel * 0.75);
        }
      }

    }
  }
}

export default Paddle;
