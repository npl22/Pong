import Scoreboard from './scoreboard.js';
import Game from './game.js';

document.addEventListener('DOMContentLoaded', () => {
  const mainCanvas = document.getElementById('main-canvas');
  mainCanvas.width = window.innerWidth;
  mainCanvas.height = window.innerHeight - 40;
  const ctx = mainCanvas.getContext('2d');

  const scoreboard = new Scoreboard();

  window.addEventListener('resize', handleResize);
  function handleResize() {
    mainCanvas.width = window.innerWidth;
    mainCanvas.height = window.innerHeight;

    // scoreboard.canvas.width = window.innerWidth;
    // scoreboard.canvas.height = window.innerHeight;
    // const w = window.innerWidth;
    // const h = window.innerHeight;
    // const ratio = 100/100;
    // const windowRatio = w/h;
    // const scale = w/100;
  }

  const g = new Game(ctx, mainCanvas);
  g.bindKeys();
  g.animate();
});
