/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {***REMOVED***
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		***REMOVED***
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
/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; ***REMOVED***
/******/
/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	***REMOVED***
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; ***REMOVED***
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	***REMOVED***
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); ***REMOVED***
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
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(3);


class Board {
  constructor() {
    this.board = $d('section');
    this.bottomRow = null;
  }

  generate() {
    this.generateRows();
  }

  generateSquares(row, y) {
    let square;
    for (let x = 0; x <= 10; x++) {
      square = this.createSquare(x, y);
      row.append(square);
    }
  }

  createSquare(x, y) {
    const square = $d.create('div').addClass('square');
    square.attr('x-pos', x);
    square.attr('y-pos', y);
    const position = 'pos' + String(x) + String(y);
    square.addClass(position);
    square.attr('isPiece', 0);
    return square;
  }

  createRow(y) {
    const row = $d.create('div').addClass('row');
    row.attr('y-pos', y);
    const position = 'row-pos' + String(y);
    row.addClass(position);
    return row;
  }

  generateRows() {
    let row;
    for (var y = 20; y >= 0; y--) {
      row = this.createRow(y);
      this.generateSquares(row, y);
      this.board.append(row);
    }
  }

  clearRow() {
    if (this._isBottomRowFull()) {
      const currentPieces = $d('.isPiece');
      this.resetBottomRow();
    }
  }

  resetBottomRow() {
    const bottomRowPieces = this.bottomRow.children();
    bottomRowPieces.attr('isPiece', 0);
    bottomRowPieces.removeClass('isPiece');
  }

  _isBottomRowFull() {
    const reducer = (acc, el) => {
      return acc && __WEBPACK_IMPORTED_MODULE_0__util__["a" /* isPiece */](el);
    ***REMOVED***
    this.bottomRow = $d('.row-pos0');
    return this.bottomRow.children().HTMLels.reduce(reducer, true);
  }
}

/* harmony default export */ exports["a"] = Board;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__board__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__piece__ = __webpack_require__(2);



document.addEventListener('DOMContentLoaded', () => {
  let board = new __WEBPACK_IMPORTED_MODULE_0__board__["a" /* default */]();
  board.generate();
  window.setInterval(() => {
    let piece = new __WEBPACK_IMPORTED_MODULE_1__piece__["a" /* default */]();
    piece.move(board);
    board.clearRow();
  }, 1000);
});


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(3);


class Piece {
  constructor() {
    const className = this._generateClassName();
    this.piece = $d(`.${className}`);
    this.toggleIsPiece();
  }

  _generateClassName() {
    let className = 'pos';
    const stringifiedDigits = this._generateDigits();
    className += stringifiedDigits + '20';
    return className;
  }

  _generateDigits() {
    const digit = Math.floor(Math.random()*11);
    return String(digit);
  }

  move(board) {
    let newYpos;
    let digits;
    let className;
    let nextSquare;
    let isNextSquarePiece;
    let intervalId = window.setInterval(() => {
      if (parseInt(this.piece.attr('y-pos')) <= 0) {
        window.clearInterval(intervalId);
      } else {
        newYpos = parseInt(this.piece.attr('y-pos')) - 1;
        digits = this.piece.attr('x-pos') + String(newYpos);
        className = 'pos' + digits;
        nextSquare = $d(`.${className}`);
        isNextSquarePiece = __WEBPACK_IMPORTED_MODULE_0__util__["a" /* isPiece */](nextSquare);

        if (isNextSquarePiece) {
          window.clearInterval(intervalId);
        } else {
          this.toggleIsPiece();
          this.piece = nextSquare;
          this.toggleIsPiece();
        }
      }
    }, 100);
  }

  toggleIsPiece() {
    if (__WEBPACK_IMPORTED_MODULE_0__util__["a" /* isPiece */](this.piece)) {
      this.piece.attr('isPiece', 0);
      this.piece.removeClass('isPiece');
    } else {
      this.piece.attr('isPiece', 1);
      this.piece.addClass('isPiece');
    }
  }
}

/* harmony default export */ exports["a"] = Piece;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
const isPiece = square => {
   if (square instanceof HTMLElement) {
     return Boolean(parseInt(square.getAttribute('ispiece')));
   } else {
     return Boolean(parseInt(square.attr('ispiece')));
   }
***REMOVED***
/* harmony export (immutable) */ exports["a"] = isPiece;



/***/ }
/******/ ]);