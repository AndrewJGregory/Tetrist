/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__collision_detection_util__ = __webpack_require__(2);


const generateStartPiece = () => {
  const startXpos = 5;
  const yPos = 18;
  const shapeId = Math.floor(Math.random()*7);
  const orientation = 0;
  return generatePiece(startXpos, yPos, shapeId, orientation);
};
/* harmony export (immutable) */ exports["f"] = generateStartPiece;


const generateNextPiece = (piece) => {
  let { startXpos, shapeId, yPos } = getAttributes(piece);
  const collection = generateUserMoveCollection(piece, [0, -1]);
  return finalizePiece(collection, shapeId);
};
/* harmony export (immutable) */ exports["g"] = generateNextPiece;


const generatePiece = (startXpos, yPos, shapeId, orientation) => {
  const deltas = generatePieceDeltas(shapeId, orientation);
  const collection = generateCollection(startXpos, yPos, deltas);
  return finalizePiece(collection, shapeId);
};

const generateColor = shapeId => {
  return colors[shapeId];
};
/* harmony export (immutable) */ exports["h"] = generateColor;


const colors = {
  0: 'red',
  1: 'orange',
  2: 'yellow',
  3: 'blue',
  4: 'purple',
  5: 'white',
  6: 'pink'
};

const generatePieceDeltas = (shapeId, orientation) => {
  return pieceDeltas[shapeId][orientation];
};
/* harmony export (immutable) */ exports["d"] = generatePieceDeltas;


const pieceDeltas = {
  0: [
    [[0, 0], [-1, 0], [1, 0], [2, 0]],
    [[0, 0], [0, 1], [0, 2], [0, -1]],
    [[0, 0], [-1, 0], [1, 0], [2, 0]],
    [[1, 0], [1, 1], [1, 2], [1, -1]],
  ],
  1: [
    [[0, 0], [1, 0], [-1, 0], [0, 1]],
    [[0, 0], [0, 1], [0, -1], [-1, 0]],
    [[0, 0], [0, -1], [-1, 0], [1, 0]],
    [[0, 0], [0, 1], [0, -1], [1, 0]]
  ],
  2: [
    [[0, 0], [0, 1], [1, 0], [1, 1]],
    [[0, 0], [0, 1], [1, 0], [1, 1]],
    [[0, 0], [0, 1], [1, 0], [1, 1]],
    [[0, 0], [0, 1], [1, 0], [1, 1]],
  ],
  3: [
    [[0, 0], [-1, 0], [1, 0], [1, 1]],
    [[0, 0], [0, 1], [0, -1], [-1, 1]],
    [[0, 0], [1, 0], [-1, 0], [-1, -1]],
    [[0, 0], [0, 1], [0, -1], [1, -1]],
  ],
  4: [
    [[0, 0], [-1, 0], [1, 0], [1, 1]],
    [[0, 0], [0, -1], [0, 1], [-1, 1]],
    [[0, 0], [1, 0], [-1, 0], [-1, -1]],
    [[0, 0], [0, 1], [0, -1], [1, -1]]
  ],
  5: [
    [[0, 0], [0, 1], [1, 1], [-1, 0]],
    [[0, 0], [-1, 0], [-1, 1], [0, -1]],
    [[0, 0], [0, -1], [1, 0], [-1, -1]],
    [[0, 0], [0, 1], [1, 0], [1, -1]],
  ],
  6: [
    [[0, 0], [0, 1], [-1, 1], [1, 0]],
    [[0, 0], [0, 1], [-1, 0], [-1, -1]],
    [[0, 0], [-1, 0], [0, -1], [1, -1]],
    [[0, 0], [0, -1], [1, 0], [1, 1]],
  ]
  // 0: I, 1: T, 2: O, 3: J, 4: L, 5: S, 6: Z
};

const generateMoveDelta = decision => {
  return moveDeltas[decision];
};
/* harmony export (immutable) */ exports["a"] = generateMoveDelta;


const moveDeltas = {
  'left': [-1, 0],
  'right': [1, 0],
  'down': [0, -1]
};

const movePieceByUser = (decision, piece) => {
  const delta = generateMoveDelta(decision);
  const collection = generateUserMoveCollection(piece, delta);
  const shapeId = piece.attr('shape-id');
  return finalizePiece(collection, shapeId);
};
/* harmony export (immutable) */ exports["j"] = movePieceByUser;


const generateRotatedPiece = (piece, orientation) => {
  const { startXpos, shapeId, yPos } = getAttributes(piece);
  const deltas = generatePieceDeltas(shapeId, orientation);
  const collection = generateCollection(startXpos, yPos, deltas);
  return finalizePiece(collection, shapeId);
};
/* harmony export (immutable) */ exports["i"] = generateRotatedPiece;


const generateUserMoveCollection = (piece, delta) => {
  const collection = $d();
  let newSqPos, newSq, newYpos, newXpos, HTMLel;
  const { shapeId } = getAttributes(piece);

  for (let i = 0; i < piece.HTMLels.length; i++) {
    HTMLel = piece.HTMLels[i];
    newYpos = parseInt(HTMLel.getAttribute('y-pos')) + delta[1];
    newXpos = parseInt(HTMLel.getAttribute('x-pos')) + delta[0];
    newSqPos = String(newXpos) + String(newYpos);
    newSq = $d(`.pos${newSqPos}`);
    collection.concat(newSq);
  }

  return collection;
};
/* harmony export (immutable) */ exports["b"] = generateUserMoveCollection;


const generateCollection = (startXpos, yPos, deltas) => {
  let collection = $d();
  let newSqPos, newSq, newYpos, delta, newXpos;
  for (let i = 0; i < deltas.length; i++) {
    delta = deltas[i];
    newYpos = yPos + delta[1];
    newXpos = startXpos + delta[0];
    newSqPos = String(newXpos) + String(newYpos);
    try {
      newSq = $d(`.pos${newSqPos}`);
    } catch (e) {
      return createMockInvalidPiece();
    }
    collection.concat(newSq);
  }
  return collection;
};
/* harmony export (immutable) */ exports["e"] = generateCollection;


const finalizePiece = (collection, shapeId) => {
  const color = generateColor(shapeId);
  if (__WEBPACK_IMPORTED_MODULE_0__collision_detection_util__["a" /* isGameOver */](collection)) {
    return false;
  } else {
    collection.addClass(`${color}`);
    collection.addClass('moving');
    collection.attr('shape-id', shapeId);
    collection.attr('isPiece', true);
    return collection;
  }
};

const getAttributes = piece => {
  let startXpos = parseInt(piece.attr('x-pos'));
  let shapeId = parseInt(piece.attr('shape-id'));
  let yPos = parseInt(piece.attr('y-pos'));
  return { startXpos, shapeId, yPos };
};
/* harmony export (immutable) */ exports["c"] = getAttributes;


const makeColorsArray = () => {
  return ['red', 'orange',
  'yellow', 'blue',
  'purple', 'white',
  'pink'];
};
/* harmony export (immutable) */ exports["k"] = makeColorsArray;


const createMockInvalidPiece = () => {
  const invalidPiece = $d.create('div').attr('y-pos', -1).attr('x-pos', -1);
  return invalidPiece;
};


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_collision_detection_util__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_piece_util__ = __webpack_require__(0);



class Piece {
  constructor() {
    this.collection = __WEBPACK_IMPORTED_MODULE_1__util_piece_util__["f" /* generateStartPiece */]();
    this.intervalId = -1;
    this.orientation = 0;
    this.playPauseModal = $d('#playPauseModal').HTMLels[0];
  }

  move() {
    this.intervalId = window.setInterval(() => {
      if (__WEBPACK_IMPORTED_MODULE_0__util_collision_detection_util__["b" /* shouldPieceMoveAgain */](this.collection)) {
        this.removeCurrentPiece();
        this.generateNextPiece();
      } else {
        this.removePieceObject();
      }
    }, 200);
  }

  generateNextPiece() {
    const collection = __WEBPACK_IMPORTED_MODULE_1__util_piece_util__["g" /* generateNextPiece */](this.collection);
    this.collection = collection;
  }

  removePieceObject() {
    window.clearInterval(this.intervalId);
    this.intervalId = -1;
    $d('html').off('keydown');
    this.collection.removeClass('moving');
  }

  removeCurrentPiece() {
    const shapeId = this.collection.attr('shape-id');
    const color = __WEBPACK_IMPORTED_MODULE_1__util_piece_util__["h" /* generateColor */](`${shapeId}`);
    this.collection.removeClass(`${color}`);
    this.collection.removeClass('moving');
    this.collection.attr('isPiece', false);
  }

  rotatePiece() {
    const newOrientation = this._returnNewOrientation();
    const shouldPieceRotate = __WEBPACK_IMPORTED_MODULE_0__util_collision_detection_util__["c" /* shouldPieceRotate */](
      this.collection,
      newOrientation
    );
    if (this.isMoving() && shouldPieceRotate) {
      this._setOrientation();
      this.removeCurrentPiece();
      const rotatedPiece = __WEBPACK_IMPORTED_MODULE_1__util_piece_util__["i" /* generateRotatedPiece */](
        this.collection, this.orientation
      );
      this.collection = rotatedPiece;
    }
  }

  _returnNewOrientation() {
    const newOrientation = (this.orientation + 1) % 4;
    return newOrientation;
  }

  _setOrientation() {
    this.orientation++;
    this.orientation %= 4;
  }

  userMovePiece(decision) {
    if (this.isMoving()) {
      if (__WEBPACK_IMPORTED_MODULE_0__util_collision_detection_util__["d" /* shouldPieceBeMovedByUser */](decision, this.collection)) {
        this.removeCurrentPiece();
        const collection = __WEBPACK_IMPORTED_MODULE_1__util_piece_util__["j" /* movePieceByUser */](decision, this.collection);
        this.collection = collection;
      }
    }
  }

  playOrPause() {
    if (this.isMoving()) {
      window.clearInterval(this.intervalId);
      this.intervalId = -1;
      this.playPauseModal.style.display = 'block';
    } else {
      this.playPauseModal.style.display = 'none';
      this.move();
    }
  }

  isMoving() {
    return this.intervalId > 0;
  }

  handleInput(e) {
    const decision = this._convertKeycodeToWord(e.keyCode);
    switch (decision) {
      case 'playOrPause':
      this.playOrPause();
      break;
      case 'rotate':
      this.rotatePiece();
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
    const keyCodesToWords = {
      32: 'playOrPause', // spacebar
      65: 'left', // "A"
      83: 'down', // "S"
      68: 'right', // "D"
      87: 'rotate' // "W"
    };
    return keyCodesToWords[keyCode];
  }
}

/* harmony default export */ exports["a"] = Piece;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__piece_util__ = __webpack_require__(0);


const shouldPieceBeMovedByUser = (decision, piece) => {
  const delta = __WEBPACK_IMPORTED_MODULE_0__piece_util__["a" /* generateMoveDelta */](decision);
  if (!isPieceInBounds(decision, piece)) {
    return false;
  }

  const possibleNextPiece = __WEBPACK_IMPORTED_MODULE_0__piece_util__["b" /* generateUserMoveCollection */](piece, delta);
  return !isCollision(piece, possibleNextPiece);
};
/* harmony export (immutable) */ exports["d"] = shouldPieceBeMovedByUser;



const isPieceInBounds = (decision, piece) => {
  const delta = __WEBPACK_IMPORTED_MODULE_0__piece_util__["a" /* generateMoveDelta */](decision);
  let collection = $d();
  let newXpos, HTMLel, newYpos;
  for (let i = 0; i < piece.HTMLels.length; i++) {
    HTMLel = piece.HTMLels[i];
    newXpos = parseInt(HTMLel.getAttribute('x-pos')) + delta[0];
    newYpos = parseInt(HTMLel.getAttribute('y-pos')) + delta[1];
    if (!areCoordinatesInBounds(newXpos, newYpos)) {
      return false;
    }
  }
  return true;
};

const isCollision = (currentPiece, possibleNextPiece) => {
  possibleNextPiece = possibleNextPiece.HTMLels.filter(HTMLel => {
    return !currentPiece.HTMLels.includes(HTMLel);
  });

  const doesPieceOverlap = possibleNextPiece.reduce((acc, el) => (
    acc || (el.getAttribute('isPiece') === 'true')
  ), false);

  return doesPieceOverlap;
};

const areCoordinatesInBounds = (xPos, yPos) => {
  if (xPos < 0 || xPos >= 10 || yPos < 0 || yPos >= 20) {
    return false;
  } else {
    return true;
  }
};

const shouldPieceRotate = (piece, newOrientation) => {
  let { startXpos, shapeId, yPos } = __WEBPACK_IMPORTED_MODULE_0__piece_util__["c" /* getAttributes */](piece);
  const deltas = __WEBPACK_IMPORTED_MODULE_0__piece_util__["d" /* generatePieceDeltas */](shapeId, newOrientation);
  const possibleRotatedPiece = __WEBPACK_IMPORTED_MODULE_0__piece_util__["e" /* generateCollection */](startXpos, yPos, deltas);
  let HTMLel, newXpos, newYpos;
  if (isCollision(piece, possibleRotatedPiece)) {
    return false;
  }

  for (let i = 0; i < possibleRotatedPiece.HTMLels.length; i++) {
    HTMLel = possibleRotatedPiece.HTMLels[i];
    newXpos = parseInt(HTMLel.getAttribute('x-pos'));
    newYpos = parseInt(HTMLel.getAttribute('y-pos'));
    if (!areCoordinatesInBounds(newXpos, newYpos)) {
      return false;
    }
  }
  return true;
};
/* harmony export (immutable) */ exports["c"] = shouldPieceRotate;


const shouldPieceMoveAgain = (piece) => {
  let { startXpos, shapeId, yPos } = __WEBPACK_IMPORTED_MODULE_0__piece_util__["c" /* getAttributes */](piece);

  if (!isPieceInBounds('down', piece)) {
    return false;
  }

  let possibleNextPiece = __WEBPACK_IMPORTED_MODULE_0__piece_util__["b" /* generateUserMoveCollection */](piece, [0,-1]);
  const doesPieceCollide = isCollision(piece, possibleNextPiece);

  return !doesPieceCollide;
};
/* harmony export (immutable) */ exports["b"] = shouldPieceMoveAgain;


const isGameOver = (collection) => {
  return collection.HTMLels.reduce((acc, el) => {
    return acc || (el.getAttribute('isPiece') === 'true');
  }, false);
};
/* harmony export (immutable) */ exports["a"] = isGameOver;



/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__board__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__piece__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_piece_util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__audio__ = __webpack_require__(7);





class Game {
  constructor() {
    this.board = new __WEBPACK_IMPORTED_MODULE_0__board__["a" /* default */]();
    this.board.generate();
    this.intervalId = -1;
    this.piece = null;
    this.gameOverModal = $d('#gameOverModal').HTMLels[0];
    this.colors = __WEBPACK_IMPORTED_MODULE_2__util_piece_util__["k" /* makeColorsArray */]();
    this.audio = new __WEBPACK_IMPORTED_MODULE_3__audio__["a" /* default */]();
    this.audio.setup();
  }

  play() {
    $d('html').off('keydown');
    this.intervalId = window.setInterval(() => {
      if (!this.isAnyPieceMoving()) {
        this.piece = new __WEBPACK_IMPORTED_MODULE_1__piece__["a" /* default */]();
        if (this.piece.collection) {
          this.piece.move();
          this.board.handleClearingOfRows();
          $d('html').on('keydown', keyPress => {
            this.piece.handleInput(keyPress);
          });
        } else {
          this.endGame();
        }
      }
    }, 500);
  }

  isAnyPieceMoving() {
    return $d('.square').hasOneClass('moving');
  }

  endGame() {
    window.clearInterval(this.intervalId);
    this.gameOverModal.style.display = 'block';
    $d('html').off('keydown');
    $d('html').on('keydown', keyPress => {
      this.handleInput(keyPress);
    });
  }

  reset() {
    const allSquares = $d('.square');
    this.colors.forEach(color => {
      allSquares.removeClass(color);
    });
    allSquares.addClass('green')
    .attr('isPiece', false)
    .attr('shape-id', -1);
    this.gameOverModal.style.display = 'none';
    this.board.score = 0;
    $d('.scoreCounter').html(`Rows\n cleared:\n 0`);
  }

  handleInput(keyPress) {
    if (keyPress.keyCode === 32) {
      this.reset();
      this.play();
    }
  }
}

/* harmony default export */ exports["a"] = Game;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
const closeModal = (e, modal) => {
    modal[0].style.display = 'none';
    $d('html').off('click');
};
/* harmony export (immutable) */ exports["a"] = closeModal;



/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_piece_util__ = __webpack_require__(0);


class Board {
  constructor() {
    this.board = $d('section');
    this.colors = __WEBPACK_IMPORTED_MODULE_0__util_piece_util__["k" /* makeColorsArray */]();
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

  generateRows() {
    let row;
    for (var y = 19; y >= 0; y--) {
      row = this.createRow(y);
      this.generateSquares(row, y);
      this.board.append(row);
    }
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
    for (let i = 0; i < 20; i++) {
      row = $d(`.row-pos${i}`);
      isRowFull = this.isRowFull(row);
      if (isRowFull) {
        this.clearRow(row);
        this.updateScore();
        abovePieces = this.getAbovePieces(i);
        this.movePiecesDown(abovePieces);
        i--;
      }
    }
  }

  updateScore() {
    this.score++;
    $d('.scoreCounter').html(`Rows\n cleared:\n ${this.score}`);
  }

  clearRow(row) {
    let pieceColor;
    row.children().HTMLels.forEach(el => {
      pieceColor = this.colors.filter(color => Array.from(el.classList).includes(color))[0];

      el.classList.remove(pieceColor);
      el.setAttribute('shape-id', -1);
      el.setAttribute('isPiece', false);
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__piece__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__game__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_main_util__ = __webpack_require__(4);




document.addEventListener('DOMContentLoaded', () => {
  const modal = document.querySelectorAll('#welcomeModal');
  $d('html').on('keydown', (e) => {
    __WEBPACK_IMPORTED_MODULE_2__util_main_util__["a" /* closeModal */](e, modal);
    const game = new __WEBPACK_IMPORTED_MODULE_1__game__["a" /* default */]();
    game.play();
  });
});


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
class Audio {
  constructor() {
    this.element = $d('audio').HTMLels[0];
    this.container = $d('.audio-controls');
    this.isPlaying = false;
  }

  setup() {
    this.container.on('click', () => {
      this.handleClick();
    });
  }

  handleClick() {
    this.isPlaying ? this.pause() : this.play();
  }

  play() {
    this.isPlaying = true;
    this.updateContent('pause');
    this.element.play();
  }

  pause() {
    this.isPlaying = false;
    this.updateContent('play');
    this.element.pause();
  }

  updateContent(type) {
    this.container.empty();
    const content = this.createContent(`${type}`);
    this.container.append(content);
  }

  createContent(type) {
    const content = $d.create('i');
    content.addClass('fa')
    .addClass('fa-2x')
    .addClass(`fa-${type}`)
    .attr('aria-hidden', 'true');
    return content;
  }
}

/* harmony default export */ exports["a"] = Audio;


/***/ }
/******/ ]);