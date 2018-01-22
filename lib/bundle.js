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
    this.colors = ['red', 'orange',
    'yellow', 'blue',
    'purple', 'white',
    'black'];
    this.score = 0;
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
    let abovePieces, isRowFull, row;
    for (let i = 0; i < 10; i++) {
      row = $d(`.row-pos${i}`);
      isRowFull = this.isRowFull(row);
      if (isRowFull) {
        this.clearRow(row);
        this.updateScore();
        abovePieces = this.getAbovePieces(i);
        this.movePiecesDown(abovePieces);
      }
    }
  }

  updateScore() {
    this.score++;
    $d('aside').html(`Rows cleared: ${this.score}`);
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

  getAbovePieces(yPos) {
    let abovePieces = $d();
    let pieces;
    this.colors.forEach(color => {
      if (Array.from(document.querySelectorAll(`.${color}`)).length !== 0) {
        pieces = $d(`.${color}`);
        pieces.HTMLels = pieces.HTMLels.filter(el => {
          return !Array.from(el.classList).includes('moving') &&
          (parseInt(el.getAttribute('y-pos')) > yPos);
        });
        abovePieces.concat(pieces);
      }
    });
    abovePieces.HTMLels.sort(this._compareByYpos);
    return abovePieces;
  }

  generateRows() {
    let row;
    for (var y = 19; y >= 0; y--) {
      row = this.createRow(y);
      this.generateSquares(row, y);
      this.board.append(row);
    }
  }

  _compareByYpos(elOne, elTwo) {
    const result = parseInt(elOne.getAttribute('y-pos')) >
    parseInt(elTwo.getAttribute('y-pos'));
    switch (result) {
      case true:
      return 1;
      case false:
      return -1;
      default:
      return 0;
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




const closeModal = (e, modal) => {
  if (e.target !== modal) {
    modal[0].style.display = 'none';
    $d('html').off('click');
  }
***REMOVED***

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.querySelectorAll('#welcomeModal');
  $d('html').on('click', (e) => {
    closeModal(e, modal);
      const game = new __WEBPACK_IMPORTED_MODULE_1__game__["a" /* default */]();
      let isAnyPieceMoving;
      let piece;
      let intervalId = window.setInterval(() => {
        isAnyPieceMoving = $d('.square').hasOneClass('moving');
        if (!isAnyPieceMoving) {
          game.board.handleClearingOfRows();
          piece = new __WEBPACK_IMPORTED_MODULE_0__piece__["a" /* default */]();
          piece.move();
          $d('html').on('keydown', keyPress => {
            piece.handleInput(keyPress);
          });
        }
      }, 500);
  });
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
    this.orientation = 0;
    this.playPauseModal = $d('#playPauseModal').HTMLels[0];
  }

  move() {
    this.intervalId = window.setInterval(() => {
      if (__WEBPACK_IMPORTED_MODULE_0__util__["b" /* shouldPieceMoveAgain */](this.piece, this.orientation)) {
        this.removeCurrentPiece();
        this.generateNextPiece();
      } else {
        window.clearInterval(this.intervalId);
        this.intervalId = -1;
        $d('html').off('keydown');
        this.piece.removeClass('moving');
      }
    }, 250);
  }

  generateNextPiece() {
    const piece = __WEBPACK_IMPORTED_MODULE_0__util__["c" /* generateNextPiece */](this.piece, this.orientation);
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

  rotatePiece(direction) {
    if (this.isGamePlaying() && __WEBPACK_IMPORTED_MODULE_0__util__["b" /* shouldPieceMoveAgain */](this.piece, this._returnNewOrientation(direction))) {
      this._setOrientation(direction);
      this.removeCurrentPiece();
      const rotatedPiece = __WEBPACK_IMPORTED_MODULE_0__util__["e" /* generateRotatedPiece */](
        this.piece, this.orientation
      );
      this.piece = rotatedPiece;
    }
  }

  _returnNewOrientation(direction) {
    let orientation = this.orientation;
    if (direction === 'left') {
      orientation++;
    } else {
      orientation += 3;
    }

    orientation %= 4;
    return orientation;
  }

  _setOrientation(direction) {
    if (direction === 'left') {
      this.orientation++;
    } else {
      this.orientation += 3;
    }
    this.orientation = this.orientation % 4;
  }

  userMovePiece(decision) {
    if (this.isGamePlaying()) {
      if (__WEBPACK_IMPORTED_MODULE_0__util__["f" /* shouldPieceBeMovedByUser */](decision, this.piece, this.orientation)) {
        this.removeCurrentPiece();
        const piece = __WEBPACK_IMPORTED_MODULE_0__util__["g" /* movePieceByUser */](decision, this.piece);
        this.piece = piece;
      }
    }
  }

  playOrPause() {
    if (this.isGamePlaying()) {
      window.clearInterval(this.intervalId);
      this.intervalId = -1;
      this.playPauseModal.style.display = 'block';

    } else {
      this.playPauseModal.style.display = 'none';
      this.move();
    }
  }

  isGamePlaying() {
    return this.intervalId > 0;
  }

  handleInput(e) {
    const decision = this._convertKeycodeToWord(e.keyCode);
    switch (decision) {
      case 'playOrPause':
      this.playOrPause();
      break;
      case 'rotateLeft':
      this.rotatePiece('left');
      break;
      case 'rotateRight':
      this.rotatePiece('right');
      break;
      case 'left':
      case 'right':
      case 'down':
      this.userMovePiece(decision);
      break;
      default:
      return null;
    }
  }

  _convertKeycodeToWord(keyCode) {
    switch (keyCode) {
      case 32:
      return 'playOrPause';
      case 65:
      return 'left';
      case 83:
      return 'down';
      case 68:
      return 'right';
      case 81:
      return 'rotateLeft';
      case 69:
      return 'rotateRight';
      default:
      return null;
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
  const orientation = 0;
  if (shapeIdsSpawnAtTop.includes(shapeId)) {
    yPos = 20;
  }
  return generatePiece(startXpos, yPos, shapeId, orientation);
***REMOVED***
/* harmony export (immutable) */ exports["a"] = generateStartPiece;


const generateNextPiece = (piece, orientation) => {
  let { startXpos, shapeId, yPos } = getAttributes(piece);
  return generatePiece(startXpos, yPos, shapeId, orientation);
***REMOVED***
/* harmony export (immutable) */ exports["c"] = generateNextPiece;


const generatePiece = (startXpos, yPos, shapeId, orientation) => {
  const deltas = generatePieceDeltas(shapeId, orientation);
  const collection = generateCollection(startXpos, yPos, shapeId, deltas);
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

const generatePieceDeltas = (shapeId, orientation) => {
  return pieceDeltas[shapeId][orientation];
***REMOVED***

const pieceDeltas = {
  0: [
    [[0, -1], [1, -1], [2, -1], [3, -1]],
    [[0, -1], [0, 0], [0, 1], [0, 2]],
    [[0, -1], [1, -1], [2, -1], [3, -1]],
    [[0, -1], [0, 0], [0, 1], [0, 2]],
  ],
  1: [
    [[0, -1], [0, 0], [-1, -1], [1, -1]],
    [[0, -1], [0, 0], [0, -2], [-1, -1]],
    [[0, -1], [0, 0], [-1, 0], [1, 0]],
    [[0, -1], [0, 0], [0, 1], [1, 0]]
  ],
  2: [
    [[0, -1], [0, 0], [1, 0], [1, -1]],
    [[0, -1], [0, 0], [1, 0], [1, -1]],
    [[0, -1], [0, 0], [1, 0], [1, -1]],
    [[0, -1], [0, 0], [1, 0], [1, -1]],
  ],
  3: [
    [[0, -1], [1, -1], [2, -1], [2, -2]],
    [[0, -1], [1, -1], [1, 0], [1, 1]],
    [[0, -1], [1, -1], [2, -1], [0, 0]],
    [[0, -1], [0, -2], [0, -3], [1, -1]],
  ],
  4: [
    [[0, -1], [-1, -1], [-2, -1], [-2, -2]],
    [[0, -1], [-1, -1], [-1, 0], [-1, 1]],
    [[0, -1], [0, 0], [-1, -1], [-2, -1]],
    [[0, -1], [0, -2], [-1, -1], [0, -3]]
  ],
  5: [
    [[0, -1], [0, -2], [1, -1], [-1, -2]],
    [[0, -1], [0, -2], [1, -2], [1, -3]],
    [[0, -1], [0, -2], [1, -1], [-1, -2]],
    [[0, -1], [0, -2], [1, -2], [1, -3]],

  ],
  6: [
    [[0, -1], [0, -2], [-1, -1], [1, -2]],
    [[0, -1], [0, -2], [-1, -2], [-1, -3]],
    [[0, -1], [0, -2], [-1, -1], [1, -2]],
    [[0, -1], [0, -2], [-1, -2], [-1, -3]],
  ]
  // 0: I, 1: T, 2: O, 3: J, 4: L, 5: S, 6: Z
***REMOVED***

const generateMoveDelta = decision => {
  return moveDeltas[decision];
***REMOVED***

const moveDeltas = {
  'left': [-1, 0],
  'right': [1, 0],
  'down': [0, -1]
***REMOVED***

const movePieceByUser = (decision, piece) => {
  const delta = generateMoveDelta(decision);
  const collection = generateUserMoveCollection(piece, delta);
  const shapeId = piece.attr('shape-id');
  return finalizePiece(collection, shapeId);
***REMOVED***
/* harmony export (immutable) */ exports["g"] = movePieceByUser;


const generateRotatedPiece = (piece, orientation) => {
  const { startXpos, shapeId, yPos } = getAttributes(piece);
  const deltas = generatePieceDeltas(shapeId, orientation);
  const collection = generateCollection(startXpos, yPos, shapeId, deltas);
  return finalizePiece(collection, shapeId);
***REMOVED***
/* harmony export (immutable) */ exports["e"] = generateRotatedPiece;


const generateUserMoveCollection = (piece, delta) => {
  let collection = $d();
  let newSqPos, newSq, newYpos, newXpos, HTMLel, doesPieceCollide;
  let shapeId = piece.attr('shape-id');

  for (let i = 0; i < piece.HTMLels.length; i++) {
    HTMLel = piece.HTMLels[i];
    newYpos = parseInt(HTMLel.getAttribute('y-pos')) + delta[1];
    newXpos = parseInt(HTMLel.getAttribute('x-pos')) + delta[0];
    newSqPos = String(newXpos) + String(newYpos);
    newSq = $d(`.pos${newSqPos}`);
    collection.concat(newSq);
  }
  doesPieceCollide = isCollision(piece, collection);
  if (doesPieceCollide) {
    return false;
  }
  return collection;
***REMOVED***


const shouldPieceBeMovedByUser = (decision, piece, orientation) => {
  const delta = generateMoveDelta(decision);
  return isPieceInBounds(decision, piece) &&
  shouldPieceMoveAgain(piece, orientation) &&
  generateUserMoveCollection(piece, delta);
***REMOVED***
/* harmony export (immutable) */ exports["f"] = shouldPieceBeMovedByUser;


const isPieceInBounds = (decision, piece) => {
  const delta = generateMoveDelta(decision);
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

const generateCollection = (startXpos, yPos, shapeId, deltas) => {
  let collection = $d();
  let newSqPos, newSq, newYpos, delta, newXpos;
  for (let i = 0; i < deltas.length; i++) {
    delta = deltas[i];
    newYpos = yPos + delta[1];
    newXpos = startXpos + delta[0];
    if (newYpos < 0 || newYpos >= 20 || newXpos < 0 || newXpos >= 10) {
      return false;
    }

    newSqPos = String(newXpos) + String(newYpos);

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

const shouldPieceMoveAgain = (piece, orientation) => {
  let { startXpos, shapeId, yPos } = getAttributes(piece);
  const deltas = generatePieceDeltas(shapeId, orientation);
  let possibleNextPiece = generateCollection(startXpos, yPos, shapeId, deltas);
  if (!possibleNextPiece) {
    return false;
  }
  let doesPieceCollide = isCollision(piece, possibleNextPiece);

  if (doesPieceCollide) {
    return false;
  }
  return true;
***REMOVED***
/* harmony export (immutable) */ exports["b"] = shouldPieceMoveAgain;


const isCollision = (currentPiece, possibleNextPiece) => {
  possibleNextPiece = possibleNextPiece.HTMLels.filter(HTMLel => {
    return !currentPiece.HTMLels.includes(HTMLel);
  });

    if (possibleNextPiece.reduce((acc, el) => {
      return acc || (el.getAttribute('isPiece') === 'true');
    }, false)) {
      return true;
    }
    return false;
***REMOVED***

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