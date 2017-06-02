/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__paddle_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ball_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__players_js__ = __webpack_require__(5);




class Game {
  constructor(context, canvas) {
    this.c = context;
    this.canvas = canvas;

    this.paddle1 = new __WEBPACK_IMPORTED_MODULE_0__paddle_js__["a" /* default */](20, 200, 15, 100, 4.5);
    this.paddle2 = new __WEBPACK_IMPORTED_MODULE_0__paddle_js__["a" /* default */](canvas.width - 22, 200, 15, 100, 6);
    this.ball = new __WEBPACK_IMPORTED_MODULE_1__ball_js__["a" /* default */](this.canvas.width/2,
                         this.canvas.height/2,
                         15, -4, 4);

    this.keyDown = null;
    this.playerScore = 0;
    this.computerScore = 0;
    this.animationRequest = null;
    this.animate = this.animate.bind(this);
  }

  bindKeys() {
    window.addEventListener('keydown', e => {
      switch(e.key) {
        case("ArrowDown"):
          this.keyDown = "ArrowDown";
          $(".instructions-modal").fadeOut();
          break;
        case("ArrowUp"):
          this.keyDown = "ArrowUp";
          $(".instructions-modal").fadeOut();
          break;
        default:
          return;
      }
    });
    window.addEventListener('keyup', e => {
      this.keyDown = null;
    });
  }

  animate() {
    this.animationRequest = window.requestAnimationFrame(this.animate);
    this.resetCanvas();
    this.drawShapes();

    this.ball.animate();
    __WEBPACK_IMPORTED_MODULE_2__players_js__["a" /* default */].animateHumanPlayer(this.canvas, this.paddle2, this.keyDown);
    __WEBPACK_IMPORTED_MODULE_2__players_js__["a" /* default */].animateComputerPlayer(this.canvas, this.paddle1, this.ball);

    this.checkCollisions();

    this.trackScores();

    let winMessage;
    let staticBackground;
    this.displayWinMessage(winMessage, staticBackground);
  }

  resetCanvas() {
    this.c.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.c.fillStyle = 'black';
    this.c.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawShapes() {
    this.c.fillStyle = 'white';
    const shapes = [this.paddle1, this.paddle2, this.ball];
    shapes.forEach(shape => shape.draw(this.c));
  }

  checkCollisions() {
    // Right Paddle
    if (this.ball.x + this.ball.radius > this.paddle2.x) {
      this.paddle2.oldY = this.paddle2.oldY || this.paddle2.y;
      this.paddle2.paddleBounce(this.ball);
      this.paddle2.oldY = this.paddle2.y;
    }
    // Left Paddle
    if (this.ball.x + this.ball.radius <
        this.paddle1.x + this.paddle1.width*2) {
      this.paddle1.oldY = this.paddle1.oldY || this.paddle1.y;
      this.paddle1.paddleBounce(this.ball);
      this.paddle1.oldY = this.paddle1.y;
    }
    // Bouncing off walls
    if (this.ball.y + this.ball.radius >= this.canvas.height
        || this.ball.y - this.ball.radius <= 0) {
      this.ball.yVel = -this.ball.yVel;
    }
  }

  trackScores() {
    if (this.ball.x + this.ball.radius <
        this.paddle1.x + this.paddle1.width) {
      this.playerScore++;
      document.getElementById('player-score')
        .innerHTML = `Score:${this.playerScore}`;
      this.ball.resetBall(this.canvas.width/2, this.canvas.height/2);
    }
    else if (this.ball.x > this.paddle2.x) {
      this.computerScore++;
      document.getElementById('computer-score')
        .innerHTML = `Score:${this.computerScore}`;
      this.ball.resetBall(this.canvas.width/2, this.canvas.height/2);
    }
  }

  displayWinMessage(winMessage, staticBackground) {
    if (this.playerScore >= 2) {
      document.getElementById('static-background').style.display = "none";
      winMessage = document.querySelector(".modal");
      winMessage.style.display = "flex";
      document.querySelector('.modal h1').innerHTML = "You win!";
      window.cancelAnimationFrame(this.animationRequest);
    }
    else if (this.computerScore >= 2) {
      document.getElementById('static-background').style.display = "none";
      winMessage = document.querySelector(".modal");
      winMessage.style.display = "flex";
      document.querySelector('.modal h1').innerHTML = "Computer wins!";
      window.cancelAnimationFrame(this.animationRequest);
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/* harmony default export */ __webpack_exports__["a"] = (StaticBackground);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Ball {
  constructor(x, y, radius, xVel, yVel) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.xVel = xVel;
    this.yVel = yVel;
  }

  draw(ctx) {
    // square ball
    ctx.fillRect(this.x, this.y, this.radius, this.radius);

    // // round ball
    // ctx.beginPath();
    // ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI, false);
    // ctx.fill();
  }

  animate() {
    this.x += this.xVel;
    this.y += this.yVel;
  }

  resetBall(x, y) {
    this.xVel = -4;
    this.yVel = 4;
    this.x = x;
    this.y = y;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Ball);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__static_background_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__game_js__ = __webpack_require__(0);



document.addEventListener('DOMContentLoaded', () => {
  const mainCanvas = document.getElementById('main-canvas');
  mainCanvas.width = window.innerWidth;
  mainCanvas.height = window.innerHeight - 40;
  const ctx = mainCanvas.getContext('2d');

  let staticBackground = new __WEBPACK_IMPORTED_MODULE_0__static_background_js__["a" /* default */]();
  let g = new __WEBPACK_IMPORTED_MODULE_1__game_js__["a" /* default */](ctx, mainCanvas);
  g.bindKeys();
  g.animate();

  const playAgain = document.querySelector('.modal h2');
  playAgain.addEventListener('click', () => {
    document.querySelector(".modal").style.display = "none";
    document.getElementById('static-background').style.display = "block";

    g = new __WEBPACK_IMPORTED_MODULE_1__game_js__["a" /* default */](ctx, mainCanvas);
    g.bindKeys();
    g.animate();
  });
});


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Paddle {
  constructor(x, y, width, height, yVel) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.yVel = yVel;
  }

  draw(ctx) {
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  paddleBounce(ball) {
    if (ball.y <= this.y + this.height && ball.y >= this.y) { // within bounds

      if (Math.abs(ball.xVel) < 7) {
        ball.xVel *= -1.25;
      } else {
        ball.xVel = -ball.xVel;
      }

      // Paddle moving up
      if (this.y < this.oldY) {
        if (ball.y > this.y + this.height/2) { // bottom half of paddle
          ball.yVel = Math.abs(ball.yVel * 0.75);
        }
        else if (ball.y < this.y + this.height/2) { // top half of paddle
          ball.yVel = -Math.abs(ball.yVel * 1.25);
        }
      }
      // Paddle moving down
      else if (this.y > this.oldY) {
        if (ball.y > this.y + this.height/2) { // bottom half of paddle
          ball.yVel = Math.abs(ball.yVel * 1.25);
        }
        else if (ball.y < this.y + this.height/2) { // top half of paddle
          ball.yVel = -Math.abs(ball.yVel * 0.75);
        }
      }

    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Paddle);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Players {
  static animateHumanPlayer(canvas, paddle, keyDown) {
    switch(keyDown) {
      case("ArrowDown"):
        if (paddle.y + paddle.height < canvas.height) {
          paddle.y += paddle.yVel;
        }
        break;
      case("ArrowUp"):
        if (paddle.y >= 0) {
          paddle.y -= paddle.yVel;
        }
        break;
      default:
        break;
    }
  }

  static animateComputerPlayer(canvas, paddle, ball) {
    switch(true) {
      case(ball.y > paddle.y + paddle.height/2):
        if (paddle.y + paddle.height < canvas.height) {
          paddle.y += paddle.yVel;
        }
        break;
      case(ball.y < paddle.y + paddle.height/2):
        if (paddle.y >= 0) {
          paddle.y -= paddle.yVel;
        }
        break;
      default:
        break;
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Players);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map