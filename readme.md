# Pong

<!-- * Description of App and features
* Screenshot of sample route
* Screenshot of API tests in Postman -->


[Link to game](https://npl22.github.io/pong)

Classic arcade game, Pong, built as a browser game in JavaScript and HTML5 Canvas.  The AI has additional functionality compared to classic pong, movement of your paddle changes the ball's speed depending on what direction you're moving in.

## Features and implementation

### Gameplay

The core feature of this application is checking when the ball has hit a paddle and tracking score otherwise.  There is also some math involved in calculating how the ball will bounce.

[![https://gyazo.com/29dfd949f659a16b0ed11ef97801728b](https://i.gyazo.com/29dfd949f659a16b0ed11ef97801728b.gif)](https://gyazo.com/29dfd949f659a16b0ed11ef97801728b)


### Bouncing Mechanics

There is some math involved in calculating the bounce of the ball. To increase difficulty, the speed of the ball increases on every bounce with a maximum cap. The direction of the bounce is influenced by the direction the paddle is moving in and also the location at which the ball hits the paddle.

```javascript
paddleBounce(ball) {
  if (ball.y <= this.y + this.height && ball.y >= this.y) { // within bounds
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
```

## Future Directions for the Project

#### Color Palette

The next update will allow players to choose from multiple color palettes for their game. Upon loading, the game will cycle through the different options, and their will be a menu of clickable swatches at the bottom of the screen.

#### Pause Button

Currently, the next round starts immediately, a pause button is planned to be implemented in an update

#### Scoring Modal

The score updates in the upper-left and upper-right hand corners when you when a point. This could be made more clear with a model that appears briefly when a point is won.
