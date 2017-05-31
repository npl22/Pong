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
class Game {
  constructor(context, canvas) {
    this.c = context;
    this.canvas = canvas;

    this.paddleY = 100;
    this.paddleWidth = 70;
    this.paddleHeight = 225;
    this.x = 300;
    this.y = 300;
    this.dx = 10;
    this.dy = 10;
    this.radius = 30;

    this.animate = this.animate.bind(this);
  }


  animate() {
    window.requestAnimationFrame(this.animate);
    this.c.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.c.fillStyle = 'black';
    this.c.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.c.fillStyle = 'white';

    this.c.fillRect(10, 300, this.paddleWidth, this.paddleHeight);
    this.c.fillRect(this.canvas.width - 80, this.paddleY, this.paddleWidth, this.paddleHeight);

    this.c.beginPath();
    this.c.arc(this.x, this.y, this.radius, 0, 2*Math.PI, false);
    this.c.fill();

    this.x += this.dx;
    this.y += this.dy;

    if (this.x + this.radius >= this.canvas.width - 80 || this.x - this.radius <= 80) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius >= window.innerHeight || this.y - this.radius <= 0) {
      this.dy = -this.dy;
    }

    window.addEventListener('keydown', e => {
      switch(e.key) {
        case("ArrowDown"):
          this.paddleY += 8;
          break;
        case("ArrowUp"):
          this.paddleY -= 8;
          break;
        default:
          return;
      }
    });
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
  g.animate();
});


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map