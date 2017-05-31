import Game from './game.js';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.querySelector('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext('2d');

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

  const g = new Game(ctx, canvas);
  g.animate();
});
