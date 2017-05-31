class Game {
  constructor(context, canvas) {
    this.c = context;
    this.canvas = canvas;

    this.paddle1X = 10;
    this.paddle2X = this.canvas.width - 80
    this.paddle1Y = 300;
    this.paddle2Y = 100;
    this.paddleWidth = 70;
    this.paddleHeight = 225;
    this.x = 300;
    this.y = 300;
    this.dx = 5;
    this.dy = 5;
    this.radius = 30;

    this.animate = this.animate.bind(this);
  }

  bindKeys() {
    window.addEventListener('keydown', e => {
      console.log("Paddle2Y: ", this.paddle2Y);
      switch(e.key) {
        case("ArrowDown"):
          this.paddle2Y += 50;
          break;
        case("ArrowUp"):
          this.paddle2Y -= 50;
          break;
        case("s"):
          this.paddle1Y += 50;
          break;
        case("w"):
          this.paddle1Y -= 50;
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

    this.c.fillRect(this.paddle1X, this.paddle1Y,
      this.paddleWidth, this.paddleHeight);
    this.c.fillRect(this.paddle2X, this.paddle2Y,
      this.paddleWidth, this.paddleHeight);

    this.c.beginPath();
    this.c.arc(this.x, this.y, this.radius, 0, 2*Math.PI, false);
    this.c.fill();

    this.x += this.dx;
    this.y += this.dy;

    if (this.x + this.radius >= this.paddle2X) {
      console.log("ball near paddle");
      if (this.y <= this.paddle2Y + this.paddleHeight
        && this.y >= this.paddle2Y) {
        console.log("ball in correct place");
        this.dx = -this.dx;
      }
    }

    if (this.x + this.radius < this.paddle1X + this.paddleWidth*2) {
      console.log("ball near paddle");
      if (this.y <= this.paddle1Y + this.paddleHeight
        && this.y >= this.paddle1Y) {
        console.log("ball in correct place");
        this.dx = -this.dx;
      }
    }

    if (this.y + this.radius >= window.innerHeight
        || this.y - this.radius <= 0) {
      this.dy = -this.dy;
    }
  }
}

export default Game;
