import StaticBackground from './static-background.js';
import Game from './game.js';

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
    document.querySelector(".modal").style.display = "none";
    document.getElementById('static-background').style.display = "block";
    document.querySelectorAll("header h1").innerHTML = "Score:0";

    g = new Game(ctx, mainCanvas);
    g.bindKeys();
    g.animate();
  });
});
