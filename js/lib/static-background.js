class StaticBackground{
  constructor(){
    this.canvas = document.getElementById('static-background');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = this.canvas.getContext('2d');

    this.lineWidth = 8;
    this.drawDivider(this.ctx);
  }

  drawDivider(ctx) {
    ctx.strokeStyle = "white";
    ctx.lineWidth = this.lineWidth;
    ctx.setLineDash([20, 16]);
    ctx.moveTo((this.canvas.width + this.lineWidth)/2, 0);
    ctx.lineTo((this.canvas.width + this.lineWidth)/2, this.canvas.height);
    ctx.stroke();
  }
}

export default StaticBackground;
