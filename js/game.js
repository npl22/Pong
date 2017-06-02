import Paddle from './paddle.js';
import Ball from './ball.js';
import Players from './players.js';

class Game {
  constructor(context, canvas) {
    this.c = context;
    this.canvas = canvas;

    this.paddle1 = new Paddle(20, 200, 15, 100, 5);
    this.paddle2 = new Paddle(canvas.width - 22, 200, 15, 100, 6);
    this.ball = new Ball(this.canvas.width/6,
                         this.canvas.height/2,
                         15, 4.5, 4.5);

    this.keyDown = null;
    this.playerScore = 0;
    this.computerScore = 0;
    this.animationRequest = null;
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
      this.keyDown = null;
    });
  }

  animate() {
    this.animationRequest = window.requestAnimationFrame(this.animate);
    this.resetCanvas();
    this.drawShapes();

    this.ball.animate();
    Players.animateHumanPlayer(this.canvas, this.paddle2, this.keyDown);
    Players.animateComputerPlayer(this.canvas, this.paddle1, this.ball);

    this.checkCollisions();

    this.trackScores();

    let winMessage;
    let staticBackground;
    this.displayWinMessage(winMessage, staticBackground);
  }

  resetCanvas() {
    this.c.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.c.fillStyle = 'black';
    this.c.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawShapes() {
    this.c.fillStyle = 'white';
    const shapes = [this.paddle1, this.paddle2, this.ball];
    shapes.forEach(shape => shape.draw(this.c));
  }

  checkCollisions() {
    // Right Paddle
    if (this.ball.x + this.ball.radius > this.paddle2.x) {
      this.paddleBounce(this.paddle2);
    }
    // Left Paddle
    if (this.ball.x + this.ball.radius <
        this.paddle1.x + this.paddle1.width*2) {
      this.paddleBounce(this.paddle1);
    }
    // Bouncing off walls
    if (this.ball.y + this.ball.radius >= this.canvas.height
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

  trackScores() {
    if (this.ball.x <= this.paddle1.x) {
      this.playerScore++;
      document.getElementById('player-score')
        .innerHTML = `Score:${this.playerScore}`;
      this.ball.resetBall(this.canvas.width/6, this.canvas.height/2);
    }
    else if (this.ball.x >= this.paddle2.x) {
      this.computerScore++;
      document.getElementById('computer-score')
        .innerHTML = `Score:${this.computerScore}`;
      this.ball.resetBall(this.canvas.width*0.833, this.canvas.height/2);
    }
  }

  displayWinMessage(winMessage, staticBackground) {
    if (this.playerScore >= 3) {
      document.getElementById('static-background').style.display = "none";
      winMessage = document.querySelector(".modal");
      winMessage.style.display = "flex";
      document.querySelector('.modal h1').innerHTML = "You win!";
      window.cancelAnimationFrame(this.animationRequest);
    }
    else if (this.computerScore >= 3) {
      document.getElementById('static-background').style.display = "none";
      winMessage = document.querySelector(".modal");
      winMessage.style.display = "flex";
      document.querySelector('.modal h1').innerHTML = "Computer wins!";
      window.cancelAnimationFrame(this.animationRequest);
    }
  }
}

export default Game;
