import Paddle from './paddle.js';
import Ball from './ball.js';
import Players from './players.js';

class Game {
  constructor(context, canvas) {
    this.c = context;
    this.canvas = canvas;

    this.paddle1 = new Paddle(20, 200, 30, 175, 7);
    this.paddle2 = new Paddle(canvas.width - 40, 200, 30, 175, 6);
    this.ball = new Ball(300, 300, 15, 8, 8);

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
    const shapes = [this.paddle1, this.paddle2, this.ball];
    shapes.forEach(shape => shape.draw(this.c));
  }

  checkCollisions() {
    // Right Paddle
    if (this.ball.x + this.ball.radius >= this.paddle2.x) {
      this.paddleBounce(this.paddle2);
    }

    // Left Paddle
    if (this.ball.x + this.ball.radius <
        this.paddle1.x + this.paddle1.width*2) {
      this.paddleBounce(this.paddle1);
    }

    // Bouncing off walls
    if (this.ball.y + this.ball.radius >= window.innerHeight
        || this.ball.y - this.ball.radius <= 0) {
      this.ball.yVel = -this.ball.yVel;
    }
  }

  paddleBounce(paddle) {
    if (this.ball.y <= paddle.y + paddle.height
      && this.ball.y >= paddle.y) {
      this.ball.xVel = -this.ball.xVel;

      if (this.ball.y <= paddle.y + paddle.height/2
        && this.ball.y >= paddle.y) {
          this.ball.yVel = -this.ball.yVel;
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

    Players.animateHumanPlayer(this.canvas, this.paddle2, this.keyDown);
    Players.animateComputerPlayer(this.canvas, this.paddle1, this.ball);

    this.checkCollisions();
  }

}

export default Game;
