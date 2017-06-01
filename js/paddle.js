class Paddle {
  constructor(x, y, width, height, yVel) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.yVel = yVel;

    this.borderRadius = 20;
  }

  draw(ctx) {
    const x = this.x;
    const y = this.y;
    const width = this.width;
    const height = this.height;
    const borderRadius = this.borderRadius;

    ctx.beginPath();
    ctx.moveTo(x + borderRadius, y);
    ctx.lineTo(x + width - borderRadius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + borderRadius);
    ctx.lineTo(x + width, y + height - borderRadius);
    ctx.quadraticCurveTo(x + width, y + height,
                         x + width - borderRadius, y + height);
    ctx.lineTo(x + borderRadius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - borderRadius);
    ctx.lineTo(x, y + borderRadius);
    ctx.quadraticCurveTo(x, y, x + borderRadius, y);
    ctx.closePath();
    ctx.fill();
  }
}

export default Paddle;



// Change origin and dimensions to match true size (a stroke makes the shape a bit larger)


// You can do the same thing with paths, like this triangle
// Remember that a stroke will make the shape a bit larger so you'll need to fiddle with the
// coordinates to get the correct dimensions.

//
// this.c.fillRect(this.paddle1.x, this.paddle1.y,
//   this.paddle1.width, this.paddle1.height);
// this.c.fillRect(this.paddle2.x, this.paddle2.y,
//   this.paddle1.width, this.paddle1.height);
