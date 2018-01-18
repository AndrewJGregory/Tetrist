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
    for (let x = 0; x < 10; x++) {
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
    for (var y = 19; y >= 0; y--) {
      row = this.createRow(y);
      this.generateSquares(row, y);
      this.board.append(row);
    }
  }
}

/* harmony default export */ exports["a"] = Board;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__piece__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__game__ = __webpack_require__(4);



document.addEventListener('DOMContentLoaded', () => {
  const game = new __WEBPACK_IMPORTED_MODULE_1__game__["a" /* default */]();
  let isAnyPieceMoving;
  let intervalId = window.setInterval(() => {
    isAnyPieceMoving = $d('.square').hasOneClass('moving');
    if (!isAnyPieceMoving) {
      let piece = new __WEBPACK_IMPORTED_MODULE_0__piece__["a" /* default */]();
      piece.move();
    }
  }, 500);
});


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(3);


class Piece {
  constructor() {
    this.piece = __WEBPACK_IMPORTED_MODULE_0__util__["a" /* generateStartPiece */]();
  }

  move() {
    let intervalId = window.setInterval(() => {
      if (__WEBPACK_IMPORTED_MODULE_0__util__["b" /* shouldPieceMoveAgain */](this.piece)) {
        this.removeCurrentPiece();
        this.generateNextPiece();
      } else {
        window.clearInterval(intervalId);
        this.piece.removeClass('moving');
      }
    }, 100);
  }

  generateNextPiece() {
    const piece = __WEBPACK_IMPORTED_MODULE_0__util__["c" /* generateNextPiece */](this.piece);
    this.piece = piece;
  }

  removeCurrentPiece() {
    this.toggleIsPiece();
  }

  toggleIsPiece() {
    const shapeId = this.piece.attr('shape-id');
    const color = __WEBPACK_IMPORTED_MODULE_0__util__["d" /* generateColor */](`${shapeId}`);
    if (this.piece.hasAllClass(`${color}`)) {
      this.piece.removeClass(`${color}`);
      this.piece.removeClass('moving');
    } else {
      this.piece.addClass(`${color}`);
      this.piece.addClass('moving');
    }
  }
}

/* harmony default export */ exports["a"] = Piece;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
const generateStartPiece = () => {
  const startXpos = 4;
  let yPos = 19;
  const shapeId = Math.floor(Math.random()*7);
  const shapeIdsSpawnAtTop = [0, 3, 4, 5, 6];
  if (shapeIdsSpawnAtTop.includes(shapeId)) {
    yPos = 20;
  }
  return generatePiece(startXpos, yPos, shapeId);
***REMOVED***
/* harmony export (immutable) */ exports["a"] = generateStartPiece;


const generateNextPiece = piece => {
  let { startXpos, shapeId, yPos } = getAttributes(piece);
  return generatePiece(startXpos, yPos, shapeId);
***REMOVED***
/* harmony export (immutable) */ exports["c"] = generateNextPiece;


const generatePiece = (startXpos, yPos, shapeId) => {
  const collection = generateCollection(startXpos, yPos, shapeId);
  return finalizePiece(collection, shapeId);
***REMOVED***

const generateColor = shapeId => {
  return colors[shapeId];
***REMOVED***
/* harmony export (immutable) */ exports["d"] = generateColor;


const colors = {
  0: 'red',
  1: 'orange',
  2: 'yellow',
  3: 'blue',
  4: 'purple',
  5: 'white',
  6: 'black'
***REMOVED***

const generatePieceDeltas = shapeId => {
  return pieceDeltas[shapeId];
***REMOVED***

const pieceDeltas = {
  0: [[0, -1], [1, -1], [2, -1], [3, -1]],
  1: [[0, -1], [0, 0], [-1, -1], [1, -1]],
  2: [[0, -1], [0, 0], [1, 0], [1, -1]],
  3: [[0, -1], [1, -1], [2, -1], [2, -2]],
  4: [[0, -1], [-1, -1], [-2, -1], [-2, -2]],
  5: [[0, -1], [0, -2], [1, -1], [-1, -2]],
  6: [[0, -1], [0, -2], [-1, -1], [1, -2]]
  // 0: I, 1: T, 2: O, 3: J, 4: L, 5: S, 6: Z
***REMOVED***

const generateCollection = (startXpos, yPos, shapeId) => {
  const deltas = generatePieceDeltas(shapeId);
  let collection = $d();
  let newSqPos;
  let newSq;
  let newYpos;
  let delta;
  for (let i = 0; i < 4; i++) {
    delta = deltas[i];
    newYpos = yPos + delta[1];
    if (newYpos < 0) {
      return false;
    }
    newSqPos = String(startXpos + delta[0]) + String(newYpos);

    newSq = $d(`.pos${newSqPos}`);
    collection.concat(newSq);
  }
  return collection;
***REMOVED***

const finalizePiece = (collection, shapeId) => {
  const color = generateColor(shapeId);
  collection.addClass(`${color}`);
  collection.addClass('moving');
  collection.attr('shape-id', shapeId);

  return collection;
***REMOVED***

const shouldPieceMoveAgain = piece => {
  let { startXpos, shapeId, yPos } = getAttributes(piece);

  let possibleNextPiece = generateCollection(startXpos, yPos, shapeId);
  if (!possibleNextPiece) {
    return false;
  }

  const allColors = [];
  for (let i = 0; i < 7; i++) {
    allColors.push(generateColor(i));
  }

  let collisionCount = 0;

  possibleNextPiece.HTMLels.forEach(HTMLel => {
    if (piece.HTMLels.includes(HTMLel)) {
      collisionCount++;
    }
  });

  if (shapeId === 2) {
    if (collisionCount > 2) {
      return false;
    }
  } else {
    if (collisionCount > 1) {
      return false;
    }
  }

  possibleNextPiece = possibleNextPiece.HTMLels.filter(HTMLel => {
    return !piece.HTMLels.includes(HTMLel);
  });

  possibleNextPiece = possibleNextPiece.map(el => Array.from(el.classList)).reduce((acc, el) => acc.concat(el), []);

  const isCollision = allColors.reduce((acc, el) => {
    return acc || possibleNextPiece.includes(el);
  }, false);

  if (isCollision) {
    return false;
  }
  return true;
***REMOVED***
/* harmony export (immutable) */ exports["b"] = shouldPieceMoveAgain;


const getAttributes = piece => {
  let startXpos = parseInt(piece.attr('x-pos'));
  let shapeId = parseInt(piece.attr('shape-id'));
  let yPos = parseInt(piece.attr('y-pos'));
  return { startXpos, shapeId, yPos ***REMOVED***
***REMOVED***


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__board__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__piece__ = __webpack_require__(2);



class Game {
  constructor() {
    let board = new __WEBPACK_IMPORTED_MODULE_0__board__["a" /* default */]();
    board.generate();
  }
}

/* harmony default export */ exports["a"] = Game;


/***/ }
/******/ ]);