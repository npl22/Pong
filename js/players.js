class Players {
  static animateHumanPlayer(canvas, paddle, keyDown) {
    switch(keyDown) {
      case("ArrowDown"):
        if (paddle.y + paddle.height < canvas.height) {
          paddle.y += paddle.yVel;
        }
        break;
      case("ArrowUp"):
        if (paddle.y >= 0) {
          paddle.y -= paddle.yVel;
        }
        break;
      default:
        break;
    }
  }

  static animateComputerPlayer(canvas, paddle, ball) {
    switch(true) {
      case (ball.y === paddle.y - paddle.width/2):
        break;
      case(ball.y > paddle.y + paddle.height/2):
        if (paddle.y + paddle.height < canvas.height) {
          paddle.y += paddle.yVel;
        }
        break;
      case(ball.y < paddle.y + paddle.height/2):
        if (paddle.y >= 0) {
          paddle.y -= paddle.yVel;
        }
        break;
    }
  }
}

export default Players;
