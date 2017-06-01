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

    this.paddle1 = new __WEBPACK_IMPORTED_MODULE_0__paddle_js__["a" /* default */](20, 200, 30, 175, 7);
    this.paddle2 = new __WEBPACK_IMPORTED_MODULE_0__paddle_js__["a" /* default */](canvas.width - 40, 200, 30, 175, 6);
    this.ball = new __WEBPACK_IMPORTED_MODULE_1__ball_js__["a" /* default */](300, 300, 15, 8, 8);

    this.keyDown = null;
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
    if (this.ball.x + this.ball.radius >= this.paddle2.x) {
      this.paddleBounce(this.paddle2);
    }

    // Left Paddle
    if (this.ball.x + this.ball.radius <
        this.paddle1.x + this.paddle1.width*2) {
      this.paddleBounce(this.paddle1);
    }

    // Bouncing off walls
    if (this.ball.y + this.ball.radius >= window.innerHeight
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
    window.requestAnimationFrame(this.animate);
    this.c.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.c.fillStyle = 'black';
    this.c.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.drawShapes();

    this.ball.x += this.ball.xVel;
    this.ball.y += this.ball.yVel;

    __WEBPACK_IMPORTED_MODULE_2__players_js__["a" /* default */].animateHumanPlayer(this.canvas, this.paddle2, this.keyDown);
    __WEBPACK_IMPORTED_MODULE_2__players_js__["a" /* default */].animateComputerPlayer(this.canvas, this.paddle1, this.ball);

    this.checkCollisions();
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_js__ = __webpack_require__(0);


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

  const g = new __WEBPACK_IMPORTED_MODULE_0__game_js__["a" /* default */](ctx, canvas);
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

    ctx.beginPath();
    ctx.moveTo(x + borderRadius, y);
    ctx.lineTo(x + width - borderRadius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + borderRadius);
    ctx.lineTo(x + width, y + height - borderRadius);
    ctx.quadraticCurveTo(x + width, y + height,
                         x + width - borderRadius, y + height);
    ctx.lineTo(x + borderRadius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - borderRadius);
    ctx.lineTo(x, y + borderRadius);
    ctx.quadraticCurveTo(x, y, x + borderRadius, y);
    ctx.closePath();
    ctx.fill();
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
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI, false);
    ctx.fill();
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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map