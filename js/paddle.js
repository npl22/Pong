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
