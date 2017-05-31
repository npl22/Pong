import Paddle from './paddle.js';

class Game {
  constructor(context, canvas) {
    this.c = context;
    this.canvas = canvas;

    this.paddleWidth = 70;
    this.paddleHeight = 225;
    this.paddle1 = new Paddle(10, 200);
    this.paddle2 = new Paddle(canvas.width - 80, 200);
    this.x = 300;
    this.y = 300;
    this.dx = 5;
    this.dy = 5;
    this.radius = 30;

    this.animate = this.animate.bind(this);
  }

  bindKeys() {
    window.addEventListener('keydown', e => {
      switch(e.key) {
        case("ArrowDown"):
          this.paddle2.y += 50;
          break;
        case("ArrowUp"):
          this.paddle2.y -= 50;
          break;
        case("s"):
          this.paddle1.y += 50;
          break;
        case("w"):
          this.paddle1.y -= 50;
          break;
        default:
          return;
      }
    });
  }

  animate() {
    window.requestAnimationFrame(this.animate);
    this.c.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.c.fillStyle = 'black';
    this.c.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.c.fillStyle = 'white';

    this.c.fillRect(this.paddle1.x, this.paddle1.y,
      this.paddleWidth, this.paddleHeight);
    this.c.fillRect(this.paddle2.x, this.paddle2.y,
      this.paddleWidth, this.paddleHeight);

    this.c.beginPath();
    this.c.arc(this.x, this.y, this.radius, 0, 2*Math.PI, false);
    this.c.fill();

    this.x += this.dx;
    this.y += this.dy;

    // Right Paddle
    if (this.x + this.radius >= this.paddle2.x) {

      if (this.y <= this.paddle2.y + this.paddleHeight
        && this.y >= this.paddle2.y) {
        this.dx = -this.dx;

        if (this.y <= this.paddle2.y + this.paddleHeight/2
          && this.y >= this.paddle2.y) {
            this.dy = -this.dy;
        }
      }
    }

    // Left Paddle
    if (this.x + this.radius < this.paddle1.x + this.paddleWidth*2) {

      if (this.y <= this.paddle1.y + this.paddleHeight
        && this.y >= this.paddle1.y) {
        this.dx = -this.dx;

        if (this.y <= this.paddle1.y + this.paddleHeight/2
          && this.y >= this.paddle1.y) {
            this.dy = -this.dy;
        }
      }
    }

    // Changing direction when hitting paddle



    // Bouncing off walls
    if (this.y + this.radius >= window.innerHeight
        || this.y - this.radius <= 0) {
      this.dy = -this.dy;
    }
  }
}

export default Game;
