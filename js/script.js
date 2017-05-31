const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext('2d');

// c.fillStyle = 'rgba(255, 0, 0, 0.5)';
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = 'rgba(0, 255, 0, 0.5)';
// c.fillRect(500, 100, 100, 100);
// c.fillStyle = 'rgba(0, 0, 255, 0.5)';
// c.fillRect(100, 400, 100, 100);
// c.fillStyle = 'rgba(0, 0, 0, 0.5)';
// c.fillRect(500, 400, 100, 100);
//
// // Line
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(400, 300);
// c.strokeStyle = '#fa34a3';
// c.stroke();
//
// // Arc/Circle
// for (let i = 0; i < 100; i++) {
//   const x = Math.random() * canvas.width;
//   const y = Math.random() * canvas.height;
//   c.beginPath();
//   c.arc(x, y , 30, 0, 2*Math.PI, false);
//   c.strokeStyle = '#00F';
//   c.stroke();
// }

let mouse = {
  x: undefined,
  y: undefined
};

window.addEventListener('mousemove', e =>{
  mouse.x = e.x;
  mouse.y = e.y;
});

function Circle(x, y, dx, dy, r) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.r = r;

  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.r, 0, 2*Math.PI, false);
    c.strokeStyle = '#00F';
    c.stroke();
    c.fill();
  };

  this.animate = function() {
    if (this.x + this.r >= innerWidth || this.x - this.r <= 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.r >= innerHeight || this.y - this.r <= 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    // interactivity - do something if the circle is near the mouse
    if (mouse.x - this.x < 50 && mouse.x - this.x > -50
      && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
      if (this.r < 40) {
        this.r += 1;
      }
    }
    else if (this.r > 2) {
      this.r -= 1;
    }

    this.draw();
  };
}

const circleArray = [];
for (var i = 0; i < 300; i++) {
  let r = 30;
  let x = Math.random() * (innerWidth - 2*r) + r;
  let y = Math.random() * (innerHeight - 2*r) + r;
  let dx = (Math.random() - 0.5) * 6;
  let dy = (Math.random() - 0.5) * 6;

  let circle = new Circle(x, y, dx, dy , r );
  circleArray.push(circle);
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);

  circleArray.forEach(circle => circle.animate());
}

animate();
