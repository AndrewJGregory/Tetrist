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
    this.colors = ['red', 'orange',
    'yellow', 'blue',
    'purple', 'white',
    'black'];
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
    square.attr('isPiece', false);
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

  handleClearingOfRows() {
    this.bottomRow = $d('.row-pos0');
    const shapeIds = ['0', '1', '2', '3', '4', '5', '6'];
    let allPieces;
    let isBottomRowFull = this.isRowFull(this.bottomRow);
    if (isBottomRowFull) {
      this.clearRow(this.bottomRow);
      allPieces = this.getAllPieces();
      this.movePiecesDown(allPieces);
    }
  }

  clearRow(row) {
    let pieceColor;
    row.children().HTMLels.forEach(el => {
      pieceColor = this.colors.filter(color => Array.from(el.classList).includes(color))[0];

      el.classList.remove(pieceColor);
      el.setAttribute('shape-id', -1);
      el.setAttribute('isPiece', false);
      el.classList.add('green');
    });
  }

  isRowFull(row) {
    return row.children().HTMLels.reduce((acc, el) => {
      return acc &&
      (el.getAttribute('isPiece') === 'true');
    }, true);
  }

  movePiecesDown(allPieces) {
    let oldYpos, newYpos, xPos, newPos, pieceColor, newSq;
    allPieces.HTMLels.forEach(pieceSquare => {
      oldYpos = parseInt(pieceSquare.getAttribute('y-pos'));
      newYpos = oldYpos - 1;
      xPos = parseInt(pieceSquare.getAttribute('x-pos'));
      newPos = String(xPos) + String(newYpos);
      pieceColor = this.colors.filter(color => Array.from(pieceSquare.classList).includes(color))[0];
      pieceSquare.classList.remove(pieceColor);
      pieceSquare.setAttribute('shape-id', -1);
      pieceSquare.setAttribute('isPiece', false);
      newSq = $d(`.pos${newPos}`);
      newSq.addClass(pieceColor);
      newSq.attr('isPiece', true);
    });
  }

  getAllPieces() {
    const allPieces = $d();
    let pieces;
    this.colors.forEach(color => {
      if (Array.from(document.querySelectorAll(`.${color}`)).length !== 0) {
        pieces = $d(`.${color}`);
        pieces.HTMLels = pieces.HTMLels.filter(el => {
          return !Array.from(el.classList).includes('moving');
        });
        allPieces.concat(pieces);
      }
    });
    return allPieces;
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(3);




document.addEventListener('DOMContentLoaded', () => {
  const game = new __WEBPACK_IMPORTED_MODULE_1__game__["a" /* default */]();
  let isAnyPieceMoving;
  let piece;
  let intervalId = window.setInterval(() => {
    isAnyPieceMoving = $d('.square').hasOneClass('moving');
    if (!isAnyPieceMoving) {
      piece = new __WEBPACK_IMPORTED_MODULE_0__piece__["a" /* default */]();
      piece.move();
      $d('html').on('keydown', e => {
        piece.handleInput(e);
      });
    }
  }, 500);
  let clearRowIntervalId = window.setInterval(() => {
    game.board.handleClearingOfRows();
  }, 250);
});


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(3);


class Piece {
  constructor() {
    this.piece = __WEBPACK_IMPORTED_MODULE_0__util__["a" /* generateStartPiece */]();
    this.intervalId = -1;
  }

  move() {
    this.intervalId = window.setInterval(() => {
      if (__WEBPACK_IMPORTED_MODULE_0__util__["b" /* shouldPieceMoveAgain */](this.piece)) {
        this.removeCurrentPiece();
        this.generateNextPiece();
      } else {
        window.clearInterval(this.intervalId);
        this.intervalId = -1;
        $d('html').off('keydown');
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
      this.piece.attr('isPiece', false);
    } else {
      this.piece.addClass(`${color}`);
      this.piece.addClass('moving');
      this.piece.attr('isPiece', true);
    }
  }

  handleInput(e) {
    const key = e.keyCode;
    switch (key) {
      case 32:
      this.playOrPause();
      break;
      case 37:
      case 39:
      case 40:
      this.userMovePiece(key);
      break;
      default:
      return null;
    }
  }

  userMovePiece(key) {
    if (this.intervalId > 0) {
      if (__WEBPACK_IMPORTED_MODULE_0__util__["e" /* shouldPieceBeMovedByUser */](key, this.piece)) {
        this.removeCurrentPiece();
        const piece = __WEBPACK_IMPORTED_MODULE_0__util__["f" /* movePieceByUser */](key, this.piece);
        this.piece = piece;
      }
    }
  }

  playOrPause() {
    if (this.intervalId > 0) {
      window.clearInterval(this.intervalId);
      this.intervalId = -1;
    } else {
      this.move();
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
  const shapeId = 2;
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

const generateMoveDelta = keyCode => {
  return moveDeltas[keyCode];
***REMOVED***

const moveDeltas = {
  37: [-1, 0],
  39: [1, 0],
  40: [0, -1]
***REMOVED***

const movePieceByUser = (key, piece) => {
  const collection = generateUserMoveCollection(key, piece);
  const shapeId = piece.attr('shape-id');
  return finalizePiece(collection, shapeId);
***REMOVED***
/* harmony export (immutable) */ exports["f"] = movePieceByUser;


const generateUserMoveCollection = (key, piece) => {
  const delta = generateMoveDelta(key);
  let collection = $d();
  let newSqPos;
  let newSq;
  let newYpos;
  let newXpos;
  let shapeId = piece.attr('shape-id');
  let HTMLel;
  for (let i = 0; i < piece.HTMLels.length; i++) {
    HTMLel = piece.HTMLels[i];
    newYpos = parseInt(HTMLel.getAttribute('y-pos')) + delta[1];
    newXpos = parseInt(HTMLel.getAttribute('x-pos')) + delta[0];
    newSqPos = String(newXpos) + String(newYpos);
    newSq = $d(`.pos${newSqPos}`);
    collection.concat(newSq);
  }
  return collection;
***REMOVED***

const shouldPieceBeMovedByUser = (key, piece) => {
  const delta = generateMoveDelta(key);
  let collection = $d();
  let newXpos;
  let HTMLel;
  let newYpos;
  for (let i = 0; i < piece.HTMLels.length; i++) {
    HTMLel = piece.HTMLels[i];
    newXpos = parseInt(HTMLel.getAttribute('x-pos')) + delta[0];
    newYpos = parseInt(HTMLel.getAttribute('y-pos')) + delta[1];
    if (newXpos < 0 || newXpos > 9 || newYpos < 0) {
      return false;
    }
  }
  return true;
***REMOVED***
/* harmony export (immutable) */ exports["e"] = shouldPieceBeMovedByUser;


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
  collection.attr('isPiece', true);
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
    this.board = new __WEBPACK_IMPORTED_MODULE_0__board__["a" /* default */]();
    this.board.generate();
  }
}

/* harmony default export */ exports["a"] = Game;


/***/ }
/******/ ]);