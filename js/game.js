import Paddle from './paddle.js';
import Ball from './ball.js';

class Game {
  constructor(context, canvas) {
    this.c = context;
    this.canvas = canvas;

    this.paddleWidth = 70;
    this.paddleHeight = 225;
    this.paddle1 = new Paddle(10, 200);
    this.paddle1.yVel = 8;
    this.paddle2 = new Paddle(canvas.width - 80, 200);
    this.ball = new Ball(300, 300, 30, 10, 10);

    this.animate = this.animate.bind(this);
  }

  bindKeys() {
    window.addEventListener('keydown', e => {
      switch(e.key) {
        case("ArrowDown"):
          this.paddle2.y += 80;
          break;
        case("ArrowUp"):
          this.paddle2.y -= 80;
          break;
        case("s"):
          this.paddle1.y += 80;
          break;
        case("w"):
          this.paddle1.y -= 80;
          break;
        default:
          return;
      }
    });
  }

  drawShapes() {
    this.c.fillStyle = 'white';

    this.c.fillRect(this.paddle1.x, this.paddle1.y,
      this.paddleWidth, this.paddleHeight);
    this.c.fillRect(this.paddle2.x, this.paddle2.y,
      this.paddleWidth, this.paddleHeight);

    this.c.beginPath();
    this.c.arc(this.ball.x, this.ball.y, this.ball.radius, 0, 2*Math.PI, false);
    this.c.fill();
  }

  checkCollisions() {
    // Right Paddle
    if (this.ball.x + this.ball.radius >= this.paddle2.x) {

      if (this.ball.y <= this.paddle2.y + this.paddleHeight
        && this.ball.y >= this.paddle2.y) {
        this.ball.xVel = -this.ball.xVel;

        if (this.ball.y <= this.paddle2.y + this.paddleHeight/2
          && this.ball.y >= this.paddle2.y) {
            this.ball.yVel = -this.ball.yVel;
        }
      }
    }

    // Left Paddle
    if (this.ball.x + this.ball.radius < this.paddle1.x + this.paddleWidth*2) {

      if (this.ball.y <= this.paddle1.y + this.paddleHeight
        && this.ball.y >= this.paddle1.y) {
        this.ball.xVel = -this.ball.xVel;

        if (this.ball.y <= this.paddle1.y + this.paddleHeight/2
          && this.ball.y >= this.paddle1.y) {
            this.ball.yVel = -this.ball.yVel;
        }
      }
    }

    // Bouncing off walls
    if (this.ball.y + this.ball.radius >= window.innerHeight
        || this.ball.y - this.ball.radius <= 0) {
      this.ball.yVel = -this.ball.yVel;
    }
  }

  animate() {
    window.requestAnimationFrame(this.animate);
    this.c.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.c.fillStyle = 'black';
    this.c.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.drawShapes();

    this.ball.x += this.ball.xVel;
    this.ball.y += this.ball.yVel;

    // AI
    switch(true) {
      // case (this.ball.y === this.paddle1.y - this.paddleWidth/2):
      //   break;
      case (this.ball.y > this.paddle1.y + this.paddleHeight/2):
        this.paddle1.y += this.paddle1.yVel;
        break;
      case (this.ball.y < this.paddle1.y + this.paddleHeight/2):
        this.paddle1.y -= this.paddle1.yVel;
        break;
    }

    this.checkCollisions();
  }

}

export default Game;
