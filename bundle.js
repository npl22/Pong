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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__paddle_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ball_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__players_js__ = __webpack_require__(4);




class Game {
  constructor(context, canvas) {
    this.c = context;
    this.canvas = canvas;

    this.paddle1 = new __WEBPACK_IMPORTED_MODULE_0__paddle_js__["a" /* default */](20, 200, 15, 100, 3);
    this.paddle2 = new __WEBPACK_IMPORTED_MODULE_0__paddle_js__["a" /* default */](canvas.width - 22, 200, 15, 100, 6);
    this.ball = new __WEBPACK_IMPORTED_MODULE_1__ball_js__["a" /* default */](this.canvas.width/6,
                         this.canvas.height/2,
                         15, 6, 6);

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
          break;
        case("ArrowUp"):
          this.keyDown = "ArrowUp";
          break;
        default:
          return;
      }
    });
    window.addEventListener('keyup', e => {
      this.keyDown = null;
    });
  }

  drawShapes() {
    this.c.fillStyle = 'white';
    const shapes = [this.paddle1, this.paddle2, this.ball];
    shapes.forEach(shape => shape.draw(this.c));
  }

  checkCollisions() {
    // Right Paddle
    if (this.ball.x + this.ball.radius > this.paddle2.x) {
      this.paddleBounce(this.paddle2);
    }
    // Left Paddle
    if (this.ball.x + this.ball.radius <
        this.paddle1.x + this.paddle1.width*2) {
      this.paddleBounce(this.paddle1);
    }
    // Bouncing off walls
    if (this.ball.y + this.ball.radius >= this.canvas.height
        || this.ball.y - this.ball.radius <= 0) {
      this.ball.yVel = -this.ball.yVel;
    }
  }

  paddleBounce(paddle) {
    if (this.ball.y <= paddle.y + paddle.height
      && this.ball.y >= paddle.y) {
      this.ball.xVel = -this.ball.xVel;

      if (this.ball.y <= paddle.y + paddle.height/2
        && this.ball.y >= paddle.y) {
          this.ball.yVel = -this.ball.yVel;
      }
    }
  }

  animate() {
    this.animationRequest = window.requestAnimationFrame(this.animate);
    this.c.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.c.fillStyle = 'black';
    this.c.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.drawShapes();

    this.ball.x += this.ball.xVel;
    this.ball.y += this.ball.yVel;

    __WEBPACK_IMPORTED_MODULE_2__players_js__["a" /* default */].animateHumanPlayer(this.canvas, this.paddle2, this.keyDown);
    __WEBPACK_IMPORTED_MODULE_2__players_js__["a" /* default */].animateComputerPlayer(this.canvas, this.paddle1, this.ball);

    this.checkCollisions();

    if (this.ball.x <= this.paddle1.x) {
      this.playerScore++;
      document.getElementById('player-score')
        .innerHTML = `Score:${this.playerScore}`;
      this.ball.resetBall(this.canvas.width/6, this.canvas.height/2);
    }
    else if (this.ball.x >= this.paddle2.x) {
      this.computerScore++;
      document.getElementById('computer-score')
        .innerHTML = `Score:${this.computerScore}`;
      this.ball.resetBall(this.canvas.width*0.833, this.canvas.height/2);
    }

    let winMessage;
    let staticBackground;
    if (this.playerScore >= 1) {
      staticBackground = document.getElementById('static-background');
      staticBackground.parentNode.removeChild(staticBackground);
      winMessage = document.querySelector(".modal");
      winMessage.style.display = "flex";
      document.querySelector('.modal h1').innerHTML = "You win!";
      window.cancelAnimationFrame(this.animationRequest);
    }

    if (this.computerScore >= 1) {
      staticBackground = document.getElementById('static-background');
      staticBackground.parentNode.removeChild(staticBackground);
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
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__static_background_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__game_js__ = __webpack_require__(0);



document.addEventListener('DOMContentLoaded', () => {
  const mainCanvas = document.getElementById('main-canvas');
  mainCanvas.width = window.innerWidth;
  mainCanvas.height = window.innerHeight - 40;
  const ctx = mainCanvas.getContext('2d');

  const staticBackground = new __WEBPACK_IMPORTED_MODULE_0__static_background_js__["a" /* default */]();

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

  const g = new __WEBPACK_IMPORTED_MODULE_1__game_js__["a" /* default */](ctx, mainCanvas);
  g.bindKeys();
  g.animate();
});


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

    // Square rectangle
    ctx.fillRect(this.x, this.y, this.width, this.height);

    // // Rounded rectangle
    // ctx.beginPath();
    // ctx.moveTo(x + borderRadius, y);
    // ctx.lineTo(x + width - borderRadius, y);
    // ctx.quadraticCurveTo(x + width, y, x + width, y + borderRadius);
    // ctx.lineTo(x + width, y + height - borderRadius);
    // ctx.quadraticCurveTo(x + width, y + height,
    //                      x + width - borderRadius, y + height);
    // ctx.lineTo(x + borderRadius, y + height);
    // ctx.quadraticCurveTo(x, y + height, x, y + height - borderRadius);
    // ctx.lineTo(x, y + borderRadius);
    // ctx.quadraticCurveTo(x, y, x + borderRadius, y);
    // ctx.closePath();
    // ctx.fill();
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Paddle);


/***/ }),
/* 3 */
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

  resetBall(x, y) {
    this.xVel = -this.xVel;
    this.x = x;
    this.y = y;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Ball);


/***/ }),
/* 4 */
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
      case (ball.y === paddle.y - paddle.width/2):
        break;
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
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Players);


/***/ }),
/* 5 */,
/* 6 */
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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map