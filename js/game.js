import Paddle from './paddle.js';
import Ball from './ball.js';

class Game {
  constructor(context, canvas) {
    this.c = context;
    this.canvas = canvas;

    this.paddleWidth = 70;
    this.paddleHeight = 225;
    this.paddle1 = new Paddle(10, 200, 10);
    this.paddle2 = new Paddle(canvas.width - 80, 200, 10);
    this.ball = new Ball(300, 300, 30, 10, 10);

    // this.paddle1.oldY = null;
    // this.paddle2.oldY = null;
    this.keyDown = null;

    this.animate = this.animate.bind(this);
  }

  bindKeys() {
    window.addEventListener('keydown', e => {
      switch(e.key) {
        case("ArrowDown"):
          this.keyDown = "ArrowDown";
          break;
        case("ArrowUp"):
          this.keyDown = "ArrowUp";
          break;
        // case("s"):
        //   this.paddle1.y += 80;
        //   break;
        // case("w"):
        //   this.paddle1.y -= 80;
        //   break;
        default:
          return;
      }
    });

    window.addEventListener('keyup', e => {
      e.preventDefault();
      this.keyDown = null;
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
      this.paddleBounce(this.paddle2);
    }

    // Left Paddle
    if (this.ball.x + this.ball.radius < this.paddle1.x + this.paddleWidth*2) {
      this.paddleBounce(this.paddle1);
    }

    // Bouncing off walls
    if (this.ball.y + this.ball.radius >= window.innerHeight
        || this.ball.y - this.ball.radius <= 0) {
      this.ball.yVel = -this.ball.yVel;
    }
  }

  paddleBounce(paddle) {
    if (this.ball.y <= paddle.y + this.paddleHeight
      && this.ball.y >= paddle.y) {
      this.ball.xVel = -this.ball.xVel;

      if (this.ball.y <= paddle.y + this.paddleHeight/2
        && this.ball.y >= paddle.y) {
          this.ball.yVel = this.ball.yVel;
      }
    }
  }

  animate() {
    window.requestAnimationFrame(this.animate);
    this.c.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.c.fillStyle = 'black';
    this.c.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.drawShapes();

    // this.paddle1.oldY = this.paddle1.y;
    // this.paddle2.oldY = this.paddle2.y;

    this.ball.x += this.ball.xVel;
    this.ball.y += this.ball.yVel;

    // Player
    switch(this.keyDown) {
      case("ArrowDown"):
        if (this.paddle2.y + this.paddleHeight < this.canvas.height) {
          this.paddle2.y += this.paddle2.yVel;
        }
        break;
      case("ArrowUp"):
        if (this.paddle2.y >= 0) {
          this.paddle2.y -= this.paddle2.yVel;
        }
        break;
      default:
        break;
    }

    // AI
    switch(true) {
      // case (this.ball.y === this.paddle1.y - this.paddleWidth/2):
      //   break;
      case(this.ball.y > this.paddle1.y + this.paddleHeight/2):
        this.paddle1.y += this.paddle1.yVel;
        break;
      case(this.ball.y < this.paddle1.y + this.paddleHeight/2):
        this.paddle1.y -= this.paddle1.yVel;
        break;
      default:
        break;
    }

    this.checkCollisions();
  }

}

export default Game;
