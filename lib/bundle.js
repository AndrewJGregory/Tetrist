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
      this.resetBottomRow();
      // this.movePiecesDown();
    }
  }

  resetBottomRow() {
    const bottomRowPieces = this.bottomRow.children();
    bottomRowPieces.attr('isPiece', 0);
    bottomRowPieces.removeClass('isPiece');
  }

  movePiecesDown() {
    const currentPieces = $d('.isPiece');
    let posClass;
    let nextDigits;
    let nextClassName;
    let nextSquare;
    currentPieces.HTMLels.forEach(el => {
      posClass = Array.from(el.classList).filter(className => {
        return className.slice(0,3) === 'pos';
      })[0];
      el.classList.remove('isPiece');
      el.setAttribute('isPiece', 0);
      nextDigits = parseInt(posClass.slice(3)) - 1;
      nextClassName = 'pos' + String(nextDigits);
      nextSquare = $d(`.${nextClassName}`);
      nextSquare.addClass('isPiece');
    });
  }

  _isBottomRowFull() {
    const reducer = (acc, el) => {
      return acc && el.hasClass('isPiece');
    };
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
    piece.move();
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
      if (parseInt(this.piece.attr('y-pos')) <= 0) {
        window.clearInterval(intervalId);
      } else {
        this.removeCurrentPiece();
        this.generateNextPiece();
      }
    }, 100);
  }

  generateNextPiece() {
    const piece = __WEBPACK_IMPORTED_MODULE_0__util__["b" /* generateNextPiece */](this.piece);
    this.piece = piece;
  }

  removeCurrentPiece() {
    this.toggleIsPiece();
  }


  toggleIsPiece() {
    const shapeId = this.piece.attr('shape-id');
    const color = __WEBPACK_IMPORTED_MODULE_0__util__["c" /* generateColor */](`${shapeId}`);
    if (this.piece.hasClass(`${color}`)) {
      this.piece.removeClass(`${color}`);
    } else {
      this.piece.addClass(`${color}`);
    }

  }


}

/* harmony default export */ exports["a"] = Piece;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
const generateStartPiece = () => {
  const startXpos = 3;
  const yPos = 20;
  const shapeId = 5;
  return generatePiece(startXpos, yPos, shapeId);
};
/* harmony export (immutable) */ exports["a"] = generateStartPiece;


const generateNextPiece = piece => {
  let startXpos = parseInt(piece.attr('x-pos'));
  let shapeId = parseInt(piece.attr('shape-id'));
  let yPos = parseInt(piece.attr('y-pos'));
  return generatePiece(startXpos, yPos, shapeId);
};
/* harmony export (immutable) */ exports["b"] = generateNextPiece;


const generatePiece = (startXpos, yPos, shapeId) => {
  const collection = generateCollection(startXpos, yPos, shapeId);
  return finalizePiece(collection, shapeId);
};


const generateColor = shapeId => {
  return colors[shapeId];
};
/* harmony export (immutable) */ exports["c"] = generateColor;


const colors = {
  0: 'red',
  1: 'orange',
  2: 'yellow',
  3: 'blue',
  4: 'purple',
  5: 'white',
  6: 'black'
};

const generatePieceDeltas = shapeId => {
  return pieceDeltas[shapeId];
};

const pieceDeltas = {
  0: [[0, -1], [1, -1], [2, -1], [3, -1]],
  1: [[0, -1], [0, 0], [-1, -1], [1, -1]],
  2: [[0, -1], [0, 0], [1, 0], [1, -1]],
  3: [[0, -1], [1, -1], [2, -1], [2, -2]],
  4: [[0, -1], [-1, -1], [-2, -1], [-2, -2]],
  5: [[0, -1], [0, -2], [1, -1], [-1, -2]],
  6: [[0, -1], [0, -2], [-1, -1], [1, -2]]
  // 0: I, 1: T, 2: O, 3: J, 4: L, 5: S, 6: Z
};

const generateCollection = (startXpos, yPos, shapeId) => {
  const deltas = generatePieceDeltas(shapeId);
  let collection = $d();
  let newSqPos;
  let newSq;
  deltas.forEach(delta => {
    newSqPos = String(startXpos + delta[0]) + String(yPos + delta[1]);
    newSq = $d(`.pos${newSqPos}`);
    collection.concat(newSq);
  });
  return collection;
};

const finalizePiece = (collection, shapeId) => {
  const color = generateColor(shapeId);
  collection.addClass(`${color}`);
  collection.attr('shape-id', shapeId);
  return collection;
};

const shouldPieceMoveAgain = piece => {
  const isPieceAtBottom = (parseInt(piece.attr('y-pos')) <= 0);

};
/* unused harmony export shouldPieceMoveAgain */



/***/ }
/******/ ]);