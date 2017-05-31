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

c.beginPath();
c.arc(300, 300, 30, 0, 2*Math.PI, false);
c.fill();

c.fillRect(10, 300, 70, 225);
c.fillRect(1200, 100, 70, 225);
