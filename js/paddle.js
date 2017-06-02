class Paddle {
  constructor(x, y, width, height, yVel) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.yVel = yVel;

    this.borderRadius = 15;
  }

  draw(ctx) {
    const x = this.x;
    const y = this.y;
    const width = this.width;
    const height = this.height;
    const borderRadius = this.borderRadius;

    // Square rectangle
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

export default Paddle;
