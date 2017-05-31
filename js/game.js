class Game {
  constructor(context, canvas) {
    this.c = context;
    this.canvas = canvas;

    this.paddleY = 100;
    this.paddleWidth = 70;
    this.paddleHeight = 225;
    this.x = 300;
    this.y = 300;
    this.dx = 10;
    this.dy = 10;
    this.radius = 30;

    this.animate = this.animate.bind(this);
  }


  animate() {
    window.requestAnimationFrame(this.animate);
    this.c.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.c.fillStyle = 'black';
    this.c.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.c.fillStyle = 'white';

    this.c.fillRect(10, 300, this.paddleWidth, this.paddleHeight);
    this.c.fillRect(this.canvas.width - 80, this.paddleY, this.paddleWidth, this.paddleHeight);

    this.c.beginPath();
    this.c.arc(this.x, this.y, this.radius, 0, 2*Math.PI, false);
    this.c.fill();

    this.x += this.dx;
    this.y += this.dy;

    if (this.x + this.radius >= this.canvas.width - 80 || this.x - this.radius <= 80) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius >= window.innerHeight || this.y - this.radius <= 0) {
      this.dy = -this.dy;
    }

    window.addEventListener('keydown', e => {
      switch(e.key) {
        case("ArrowDown"):
          this.paddleY += 8;
          break;
        case("ArrowUp"):
          this.paddleY -= 8;
          break;
        default:
          return;
      }
    });
  }

}

export default Game;
