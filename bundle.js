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



class Game {
  constructor(context, canvas) {
    this.c = context;
    this.canvas = canvas;

    this.paddleWidth = 70;
    this.paddleHeight = 225;
    this.paddle1 = new __WEBPACK_IMPORTED_MODULE_0__paddle_js__["a" /* default */](10, 200, 10);
    this.paddle2 = new __WEBPACK_IMPORTED_MODULE_0__paddle_js__["a" /* default */](canvas.width - 80, 200, 10);
    this.ball = new __WEBPACK_IMPORTED_MODULE_1__ball_js__["a" /* default */](300, 300, 30, 10, 10);

    // this.paddle1.oldY = null;
    // this.paddle2.oldY = null;
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
        // case("s"):
        //   this.paddle1.y += 80;
        //   break;
        // case("w"):
        //   this.paddle1.y -= 80;
        //   break;
        default:
          return;
      }
    });

    window.addEventListener('keyup', e => {
      e.preventDefault();
      this.keyDown = null;
    });
  }

  drawShapes() {
    this.c.fillStyle = 'white';

    this.c.fillRect(this.paddle1.x, this.paddle1.y,
      this.paddleWidth, this.paddleHeight);
    this.c.fillRect(this.paddle2.x, this.paddle2.y,
      this.paddleWidth, this.paddleHeight);

    this.c.beginPath();
    this.c.arc(this.ball.x, this.ball.y, this.ball.radius, 0, 2*Math.PI, false);
    this.c.fill();
  }

  checkCollisions() {
    // Right Paddle
    if (this.ball.x + this.ball.radius >= this.paddle2.x) {
      this.paddleBounce(this.paddle2);
    }

    // Left Paddle
    if (this.ball.x + this.ball.radius < this.paddle1.x + this.paddleWidth*2) {
      this.paddleBounce(this.paddle1);
    }

    // Bouncing off walls
    if (this.ball.y + this.ball.radius >= window.innerHeight
        || this.ball.y - this.ball.radius <= 0) {
      this.ball.yVel = -this.ball.yVel;
    }
  }

  paddleBounce(paddle) {
    if (this.ball.y <= paddle.y + this.paddleHeight
      && this.ball.y >= paddle.y) {
      this.ball.xVel = -this.ball.xVel;

      if (this.ball.y <= paddle.y + this.paddleHeight/2
        && this.ball.y >= paddle.y) {
          this.ball.yVel = this.ball.yVel;
      }
    }
  }

  animate() {
    window.requestAnimationFrame(this.animate);
    this.c.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.c.fillStyle = 'black';
    this.c.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.drawShapes();

    // this.paddle1.oldY = this.paddle1.y;
    // this.paddle2.oldY = this.paddle2.y;

    this.ball.x += this.ball.xVel;
    this.ball.y += this.ball.yVel;

    // Player
    switch(this.keyDown) {
      case("ArrowDown"):
        if (this.paddle2.y + this.paddleHeight < this.canvas.height) {
          this.paddle2.y += this.paddle2.yVel;
        }
        break;
      case("ArrowUp"):
        if (this.paddle2.y >= 0) {
          this.paddle2.y -= this.paddle2.yVel;
        }
        break;
      default:
        break;
    }

    // AI
    switch(true) {
      // case (this.ball.y === this.paddle1.y - this.paddleWidth/2):
      //   break;
      case(this.ball.y > this.paddle1.y + this.paddleHeight/2):
        this.paddle1.y += this.paddle1.yVel;
        break;
      case(this.ball.y < this.paddle1.y + this.paddleHeight/2):
        this.paddle1.y -= this.paddle1.yVel;
        break;
      default:
        break;
    }

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
  constructor(x, y, yVel) {
    this.x = x;
    this.y = y;
    this.yVel = yVel;
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
}

/* harmony default export */ __webpack_exports__["a"] = (Ball);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map