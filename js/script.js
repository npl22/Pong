const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext('2d');
window.addEventListener('resize', handleResize);
function handleResize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  // const w = window.innerWidth;
  // const h = window.innerHeight;
  // const ratio = 100/100;
  // const windowRatio = w/h;
  // const scale = w/100;
}

let paddleY = 100;
let x = 300;
let y = 300;
let dx = 10;
let dy = 10;
const radius = 30;
function animate() {
  window.requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.fillStyle = 'black';
  c.fillRect(0, 0, canvas.width, canvas.height);
  c.fillStyle = 'white';

  c.fillRect(10, 300, 70, 225);
  c.fillRect(800, paddleY, 70, 225);

  c.beginPath();
  c.arc(x, y, radius, 0, 2*Math.PI, false);
  c.fill();

  x += dx;
  y += dy;

  if (x + radius >= 800 || x - radius <= 80) {
    dx = -dx;
  }

  if (y + radius >= window.innerHeight || y - radius <= 0) {
    dy = -dy;
  }
}

window.addEventListener('keydown', e => {
  switch(e.key) {
    case("ArrowDown"):
      paddleY -= 8;
      break;
    case("ArrowUp"):
      paddleY += 8;
      break;
    default:
      return;
  }
});

animate();
