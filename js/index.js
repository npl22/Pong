import StaticBackground from './lib/static-background.js';
import Game from './lib/game.js';

document.addEventListener('DOMContentLoaded', () => {
  const mainCanvas = document.getElementById('main-canvas');
  mainCanvas.width = window.innerWidth;
  mainCanvas.height = window.innerHeight - 40;
  const ctx = mainCanvas.getContext('2d');

  let staticBackground = new StaticBackground();
  let g = new Game(ctx, mainCanvas);
  g.bindKeys();
  g.animate();

  const playAgain = document.querySelector('.modal h2');
  playAgain.addEventListener('click', () => {
    // staticBackground = new StaticBackground();
    g = new Game(ctx, mainCanvas);
    g.animate();
  });
});
