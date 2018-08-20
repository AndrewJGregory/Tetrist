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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__collision_detection_util__ = __webpack_require__(1);


const generateFirstCollection = () => {
  const startXpos = 5;
  let yPos = 18;
  const shapeId = Math.floor(Math.random() * 7);
  const orientation = 0;
  const deltas = generatePieceDeltas(shapeId, orientation);
  if (shapeId === 0) yPos = 19;
  const collection = generateCollection(startXpos, yPos, deltas);
  collection.attr("shape-id", shapeId);
  return collection;
***REMOVED***
/* harmony export (immutable) */ exports["f"] = generateFirstCollection;


const generateNextPiece = piece => {
  let { startXpos, shapeId, yPos } = getAttributes(piece);
  const collection = generateUserMoveCollection(piece, [0, -1]);
  collection.attr("shape-id", shapeId);
  return collection;
***REMOVED***
/* harmony export (immutable) */ exports["h"] = generateNextPiece;


const generateColor = shapeId => {
  return colors[shapeId];
***REMOVED***
/* harmony export (immutable) */ exports["i"] = generateColor;


const colors = {
  0: "red",
  1: "orange",
  2: "yellow",
  3: "blue",
  4: "purple",
  5: "white",
  6: "pink"
***REMOVED***

const generatePieceDeltas = (shapeId, orientation) => {
  return pieceDeltas[shapeId][orientation];
***REMOVED***
/* harmony export (immutable) */ exports["d"] = generatePieceDeltas;


const pieceDeltas = {
  0: [
    [[0, 0], [-1, 0], [1, 0], [2, 0]],
    [[0, 0], [0, 1], [0, 2], [0, -1]],
    [[0, 0], [-1, 0], [1, 0], [2, 0]],
    [[1, 0], [1, 1], [1, 2], [1, -1]]
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
    [[0, 0], [0, 1], [1, 0], [1, 1]]
  ],
  3: [
    [[0, 0], [-1, 0], [1, 0], [1, 1]],
    [[0, 0], [0, 1], [0, -1], [-1, 1]],
    [[0, 0], [1, 0], [-1, 0], [-1, -1]],
    [[0, 0], [0, 1], [0, -1], [1, -1]]
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
    [[0, 0], [0, 1], [1, 0], [1, -1]]
  ],
  6: [
    [[0, 0], [0, 1], [-1, 1], [1, 0]],
    [[0, 0], [0, 1], [-1, 0], [-1, -1]],
    [[0, 0], [-1, 0], [0, -1], [1, -1]],
    [[0, 0], [0, -1], [1, 0], [1, 1]]
  ]
  // 0: I, 1: T, 2: O, 3: J, 4: L, 5: S, 6: Z
***REMOVED***

const generateMoveDelta = decision => {
  return moveDeltas[decision];
***REMOVED***
/* harmony export (immutable) */ exports["a"] = generateMoveDelta;


const moveDeltas = {
  left: [-1, 0],
  right: [1, 0],
  down: [0, -1]
***REMOVED***

const movePieceByUser = (decision, piece) => {
  const delta = generateMoveDelta(decision);
  const collection = generateUserMoveCollection(piece, delta);
  const shapeId = piece.attr("shape-id");
  collection.attr("shape-id", shapeId);
  return collection;
***REMOVED***
/* harmony export (immutable) */ exports["k"] = movePieceByUser;


const generateRotatedPiece = (piece, orientation) => {
  const { startXpos, shapeId, yPos } = getAttributes(piece);
  const deltas = generatePieceDeltas(shapeId, orientation);
  const collection = generateCollection(startXpos, yPos, deltas);
  return collection;
***REMOVED***
/* harmony export (immutable) */ exports["j"] = generateRotatedPiece;


const generateUserMoveCollection = (piece, delta) => {
  const collection = $d();
  let newSqPos, newSq, newYpos, newXpos, HTMLel;
  const { shapeId } = getAttributes(piece);

  for (let i = 0; i < piece.HTMLels.length; i++) {
    HTMLel = piece.HTMLels[i];
    newYpos = parseInt(HTMLel.getAttribute("y-pos")) + delta[1];
    newXpos = parseInt(HTMLel.getAttribute("x-pos")) + delta[0];
    newSqPos = String(newXpos) + String(newYpos);
    newSq = $d(`.pos${newSqPos}`);
    collection.concat(newSq);
  }

  return collection;
***REMOVED***
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
***REMOVED***
/* harmony export (immutable) */ exports["e"] = generateCollection;


const finalizePiece = collection => {
  const color = generateColor(collection.attr("shape-id"));
  collection.addClass(`${color}`);
  collection.addClass("moving");
  collection.attr("isPiece", true);
***REMOVED***
/* harmony export (immutable) */ exports["g"] = finalizePiece;


const getAttributes = piece => {
  let startXpos = parseInt(piece.attr("x-pos"));
  let shapeId = parseInt(piece.attr("shape-id"));
  let yPos = parseInt(piece.attr("y-pos"));
  return { startXpos, shapeId, yPos ***REMOVED***
***REMOVED***
/* harmony export (immutable) */ exports["c"] = getAttributes;


const makeColorsArray = () => {
  return ["red", "orange", "yellow", "blue", "purple", "white", "pink"];
***REMOVED***
/* harmony export (immutable) */ exports["l"] = makeColorsArray;


const createMockInvalidPiece = () => {
  const invalidPiece = $d
    .create("div")
    .attr("y-pos", -1)
    .attr("x-pos", -1);
  return invalidPiece;
***REMOVED***


/***/ },
/* 1 */
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
***REMOVED***
/* harmony export (immutable) */ exports["c"] = shouldPieceBeMovedByUser;


const isPieceInBounds = (decision, piece) => {
  const delta = __WEBPACK_IMPORTED_MODULE_0__piece_util__["a" /* generateMoveDelta */](decision);
  let collection = $d();
  let newXpos, HTMLel, newYpos;
  for (let i = 0; i < piece.HTMLels.length; i++) {
    HTMLel = piece.HTMLels[i];
    newXpos = parseInt(HTMLel.getAttribute("x-pos")) + delta[0];
    newYpos = parseInt(HTMLel.getAttribute("y-pos")) + delta[1];
    if (!areCoordinatesInBounds(newXpos, newYpos)) {
      return false;
    }
  }
  return true;
***REMOVED***

const isCollision = (currentPiece, possibleNextPiece) => {
  possibleNextPiece = possibleNextPiece.HTMLels.filter(HTMLel => {
    return !currentPiece.HTMLels.includes(HTMLel);
  });

  const doesPieceOverlap = possibleNextPiece.reduce(
    (acc, el) => acc || el.getAttribute("isPiece") === "true",
    false
  );

  return doesPieceOverlap;
***REMOVED***

const areCoordinatesInBounds = (xPos, yPos) => {
  if (xPos < 0 || xPos >= 10 || yPos < 0 || yPos >= 20) {
    return false;
  } else {
    return true;
  }
***REMOVED***

const shouldPieceRotate = (piece, newOrientation) => {
  let { startXpos, shapeId, yPos } = __WEBPACK_IMPORTED_MODULE_0__piece_util__["c" /* getAttributes */](piece);
  const deltas = __WEBPACK_IMPORTED_MODULE_0__piece_util__["d" /* generatePieceDeltas */](shapeId, newOrientation);
  const possibleRotatedPiece = __WEBPACK_IMPORTED_MODULE_0__piece_util__["e" /* generateCollection */](
    startXpos,
    yPos,
    deltas
  );
  let HTMLel, newXpos, newYpos;
  if (isCollision(piece, possibleRotatedPiece)) {
    return false;
  }

  for (let i = 0; i < possibleRotatedPiece.HTMLels.length; i++) {
    HTMLel = possibleRotatedPiece.HTMLels[i];
    newXpos = parseInt(HTMLel.getAttribute("x-pos"));
    newYpos = parseInt(HTMLel.getAttribute("y-pos"));
    if (!areCoordinatesInBounds(newXpos, newYpos)) {
      return false;
    }
  }
  return true;
***REMOVED***
/* harmony export (immutable) */ exports["b"] = shouldPieceRotate;


const shouldPieceMoveAgain = piece => {
  let { startXpos, shapeId, yPos } = __WEBPACK_IMPORTED_MODULE_0__piece_util__["c" /* getAttributes */](piece);

  if (!isPieceInBounds("down", piece)) {
    return false;
  }

  let possibleNextPiece = __WEBPACK_IMPORTED_MODULE_0__piece_util__["b" /* generateUserMoveCollection */](piece, [0, -1]);
  const doesPieceCollide = isCollision(piece, possibleNextPiece);

  return !doesPieceCollide;
***REMOVED***
/* harmony export (immutable) */ exports["a"] = shouldPieceMoveAgain;



/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_collision_detection_util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_piece_util__ = __webpack_require__(0);



class Piece {
  constructor() {
    this.collection = __WEBPACK_IMPORTED_MODULE_1__util_piece_util__["f" /* generateFirstCollection */]();
    this.intervalId = -1;
    this.orientation = 0;
    this.playPauseModal = $d("#playPauseModal").HTMLels[0];
    this.preview = $d();
  }

  draw() {
    __WEBPACK_IMPORTED_MODULE_1__util_piece_util__["g" /* finalizePiece */](this.collection);
  }

  move() {
    this.intervalId = window.setInterval(() => {
      if (__WEBPACK_IMPORTED_MODULE_0__util_collision_detection_util__["a" /* shouldPieceMoveAgain */](this.collection)) {
        this.removePreview();
        this.removeCurrentPiece();
        this.collection = __WEBPACK_IMPORTED_MODULE_1__util_piece_util__["h" /* generateNextPiece */](this.collection);
        this.draw();
        this.setPreview();
        this.drawPreview();
      } else {
        this.removePieceObject();
      }
    }, 200);
  }

  setPreview() {
    if (this.collection) {
      this.preview = this.collection.dup();
      let possibleNextPiece = this.collection.dup();
      let doesCollide, shouldMoveAgain;
      while (true) {
        shouldMoveAgain = __WEBPACK_IMPORTED_MODULE_0__util_collision_detection_util__["a" /* shouldPieceMoveAgain */](possibleNextPiece);
        if (shouldMoveAgain) {
          this.preview = possibleNextPiece;
          possibleNextPiece = __WEBPACK_IMPORTED_MODULE_1__util_piece_util__["b" /* generateUserMoveCollection */](
            possibleNextPiece,
            [0, -1]
          );
        } else {
          this.preview = possibleNextPiece;
          break;
        }
      }
    }
  }

  drawPreview() {
    this.preview.addClass("preview");
  }

  removePreview() {
    this.preview.removeClass("preview");
  }

  removePieceObject() {
    window.clearInterval(this.intervalId);
    this.intervalId = -1;
    $d("html").off("keydown");
    this.collection.removeClass("moving");
    this.preview.removeClass("preview");
  }

  removeCurrentPiece() {
    const shapeId = this.collection.attr("shape-id");
    const color = __WEBPACK_IMPORTED_MODULE_1__util_piece_util__["i" /* generateColor */](`${shapeId}`);
    this.collection.removeClass(`${color}`);
    this.collection.removeClass("moving");
    this.collection.attr("isPiece", false);
  }

  rotatePiece() {
    const newOrientation = this._returnNewOrientation();
    const shouldPieceRotate = __WEBPACK_IMPORTED_MODULE_0__util_collision_detection_util__["b" /* shouldPieceRotate */](
      this.collection,
      newOrientation
    );
    if (this.isMoving() && shouldPieceRotate) {
      this._setOrientation();
      this.removePreview();
      this.removeCurrentPiece();
      this.collection = __WEBPACK_IMPORTED_MODULE_1__util_piece_util__["j" /* generateRotatedPiece */](
        this.collection,
        this.orientation
      );
      this.draw();
      this.setPreview();
      this.drawPreview();
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
      if (__WEBPACK_IMPORTED_MODULE_0__util_collision_detection_util__["c" /* shouldPieceBeMovedByUser */](decision, this.collection)) {
        this.removeCurrentPiece();
        this.collection = __WEBPACK_IMPORTED_MODULE_1__util_piece_util__["k" /* movePieceByUser */](decision, this.collection);
        this.draw();
        this.removePreview();
        this.setPreview();
        this.drawPreview();
      }
    }
  }

  playOrPause() {
    if (this.isMoving()) {
      window.clearInterval(this.intervalId);
      this.intervalId = -1;
      this.playPauseModal.style.display = "block";
    } else {
      this.playPauseModal.style.display = "none";
      this.move();
    }
  }

  isMoving() {
    return this.intervalId > 0;
  }

  handleInput(e) {
    const decision = this._convertKeycodeToWord(e.keyCode);
    switch (decision) {
      case "playOrPause":
        this.playOrPause();
        break;
      case "rotate":
        this.rotatePiece();
        break;
      case "left":
      case "right":
      case "down":
        this.userMovePiece(decision);
        break;
      case "drop":
        const shapeId = this.collection.attr("shape-id");
        this.removeCurrentPiece();
        this.collection = this.preview;
        this.collection.attr("shape-id", shapeId);
        this.draw();
        this.removePieceObject();
        break;
      default:
        return null;
    }
  }

  _convertKeycodeToWord(keyCode) {
    const keyCodesToWords = {
      32: "drop", // spacebar
      65: "left", // "A"
      83: "down", // "S"
      68: "right", // "D"
      87: "rotate", // "W",
      16: "playOrPause" // "Left Shift"
    ***REMOVED***
    return keyCodesToWords[keyCode];
  }
}

/* harmony default export */ exports["a"] = Piece;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__board__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__piece__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_piece_util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_collision_detection_util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__audio__ = __webpack_require__(5);






class Game {
  constructor() {
    this.board = new __WEBPACK_IMPORTED_MODULE_0__board__["a" /* default */]();
    this.board.generate();
    this.intervalId = -1;
    this.piece = null;
    this.gameOverModal = $d("#gameOverModal").HTMLels[0];
    this.submitBtn = $d(".score-submit-btn");
    this.nameInput = $d(".name-input");
    this.colors = __WEBPACK_IMPORTED_MODULE_2__util_piece_util__["l" /* makeColorsArray */]();
    this.audio = new __WEBPACK_IMPORTED_MODULE_4__audio__["a" /* default */]();
    this._initializeFirebase();
    this.database = firebase.database();
    this.nameInput.on("keydown", e => {
      this.nameInput.removeClass("error");
      $d(".name-input-error-msg").html("");
    });
  }

  play() {
    this.readFromDatabase();
    $d(".extra-game-over-text").html("Submit your high score to play again.");
    $d("html").off("keydown");
    this.intervalId = window.setInterval(() => {
      if (!this.isAnyPieceMoving()) {
        this.piece = new __WEBPACK_IMPORTED_MODULE_1__piece__["a" /* default */]();
        if (this.isOver()) {
          this.endGame();
        } else {
          this.piece.draw();
          this.piece.setPreview();
          this.piece.drawPreview();
          this.piece.move();
          this.board.handleClearingOfRows();
          $d("html").on("keydown", keyPress => {
            this.piece.handleInput(keyPress);
          });
        }
      }
    }, 500);
  }

  isOver() {
    const isAtTop = this.piece.collection.HTMLels.some(
      HTMLel => HTMLel.getAttribute("y-pos") == 19
    );
    let isColliding;
    const colors = __WEBPACK_IMPORTED_MODULE_2__util_piece_util__["l" /* makeColorsArray */]();
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < colors.length; j++) {
        const color = colors[j];
        if (this.piece.collection.hasOneClass(color)) {
          isColliding = true;
        }
      }
    }
    return isAtTop && isColliding;
  }

  isAnyPieceMoving() {
    return $d(".square").hasOneClass("moving");
  }

  endGame() {
    window.clearInterval(this.intervalId);
    this.gameOverModal.style.display = "block";
    $d("html").off("keydown");

    this.submitBtn.on("click", e => {
      e.preventDefault();
      const name = this.nameInput.val();
      if (name) {
        this.submitBtn
          .html("Submitting...")
          .off("click")
          .removeClass("clickable")
          .addClass("not-allowed");
        this.saveScore(name);
        $d("html").on("keydown", keyPress => {
          this.handleInput(keyPress);
        });
        $d(".extra-game-over-text").html("Press the spacebar to play again.");
      } else {
        this.nameInput.addClass("error");
        $d(".name-input-error-msg").html("Name cannot be blank.");
      }
    });
  }

  saveScore(name) {
    const score = this.board.score;
    this.database.ref("scores/").push(
      {
        name,
        score
      },
      () => {
        this.submitBtn.html("Submitted!");
      }
    );
  }

  reset() {
    const allSquares = $d(".square");
    this.colors.forEach(color => {
      allSquares.removeClass(color);
    });
    allSquares
      .addClass("green")
      .attr("isPiece", false)
      .attr("shape-id", -1);
    this.gameOverModal.style.display = "none";
    this.board.score = 0;
    $d(".scoreCounter").html(`Rows\n cleared:\n 0`);
    $d("tbody").html("");
    this.submitBtn
      .removeClass("not-allowed")
      .addClass("clickable")
      .html("Submit score");
    this.nameInput.val("");
  }

  handleInput(keyPress) {
    if (keyPress.keyCode === 32) {
      this.reset();
      this.play();
    }
  }

  _initializeFirebase() {
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
    firebase.initializeApp(config);
  }

  readFromDatabase() {
    this.database
      .ref("/scores/")
      .once("value")
      .then(snapshot => {
        let data = Object.values(snapshot.val());
        data.sort(this._compareByScore);
        data = data.slice(0, 5);
        this.makeHighScoreRows(data);
      });
  }

  makeHighScoreRows(data) {
    const tableBody = $d("tbody");
    let newRow, nameCell, scoreCell, position;
    $d("div").removeClass("loader");
    $d(".loading-scores-msg").html("");
    data.forEach((datum, idx) => {
      const { name, score } = datum;
      newRow = $d.create("tr");
      position = $d.create("td").html(`${idx + 1}.`);
      nameCell = $d.create("td").html(`${name}`);
      scoreCell = $d.create("td").html(`${score}`);
      newRow
        .append(position)
        .append(nameCell)
        .append(scoreCell);
      tableBody.append(newRow);
    });
  }

  _compareByScore(elOne, elTwo) {
    const result = elOne.score < elTwo.score;
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

/* harmony default export */ exports["a"] = Game;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
const closeModal = (e, modal) => {
  modal[0].style.display = "none";
  $d("html").off("click");
***REMOVED***
/* harmony export (immutable) */ exports["a"] = closeModal;



/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
class Audio {
  constructor() {
    this.element = $d("audio").HTMLels[0];
    this.container = $d(".audio-controls");
    this.isPlaying = false;
    this.container.on("click", () => {
      this.handleClick();
    });
  }

  handleClick() {
    this.isPlaying ? this.pause() : this.play();
  }

  play() {
    this.isPlaying = true;
    this.updateContent("pause");
    this.element.play();
  }

  pause() {
    this.isPlaying = false;
    this.updateContent("play");
    this.element.pause();
  }

  updateContent(type) {
    this.container.empty();
    const content = this.createContent(`${type}`);
    this.container.append(content);
  }

  createContent(type) {
    const content = $d.create("i");
    content
      .addClass("fa")
      .addClass("fa-2x")
      .addClass(`fa-${type}`)
      .attr("aria-hidden", "true");
    return content;
  }
}

/* harmony default export */ exports["a"] = Audio;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_piece_util__ = __webpack_require__(0);


class Board {
  constructor() {
    this.board = $d("section");
    this.colors = __WEBPACK_IMPORTED_MODULE_0__util_piece_util__["l" /* makeColorsArray */]();
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
    const square = $d.create("div").addClass("square");
    square.attr("x-pos", x);
    square.attr("y-pos", y);
    square.attr("isPiece", false);
    const position = "pos" + String(x) + String(y);
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
    const row = $d.create("div").addClass("row");
    row.attr("y-pos", y);
    const position = "row-pos" + String(y);
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
    $d(".scoreCounter").html(`Rows\n cleared:\n ${this.score}`);
  }

  clearRow(row) {
    let pieceColor;
    row.children().HTMLels.forEach(el => {
      pieceColor = this.colors.filter(color =>
        Array.from(el.classList).includes(color)
      )[0];

      el.classList.remove(pieceColor);
      el.setAttribute("shape-id", -1);
      el.setAttribute("isPiece", false);
    });
  }

  isRowFull(row) {
    return row.children().HTMLels.reduce((acc, el) => {
      return acc && el.getAttribute("isPiece") === "true";
    }, true);
  }

  movePiecesDown(allPieces) {
    let oldYpos, newYpos, xPos, newPos, pieceColor, newSq;
    allPieces.HTMLels.forEach(pieceSquare => {
      oldYpos = parseInt(pieceSquare.getAttribute("y-pos"));
      newYpos = oldYpos - 1;
      xPos = parseInt(pieceSquare.getAttribute("x-pos"));
      newPos = String(xPos) + String(newYpos);
      pieceColor = this.colors.filter(color =>
        Array.from(pieceSquare.classList).includes(color)
      )[0];
      pieceSquare.classList.remove(pieceColor);
      pieceSquare.setAttribute("shape-id", -1);
      pieceSquare.setAttribute("isPiece", false);
      newSq = $d(`.pos${newPos}`);
      newSq.addClass(pieceColor);
      newSq.attr("isPiece", true);
    });
  }

  getAbovePieces(yPos) {
    let abovePieces = $d();
    let pieces;
    this.colors.forEach(color => {
      if (Array.from(document.querySelectorAll(`.${color}`)).length !== 0) {
        pieces = $d(`.${color}`);
        pieces.HTMLels = pieces.HTMLels.filter(el => {
          return (
            !Array.from(el.classList).includes("moving") &&
            parseInt(el.getAttribute("y-pos")) > yPos
          );
        });
        abovePieces.concat(pieces);
      }
    });
    abovePieces.HTMLels.sort(this._compareByYpos);
    return abovePieces;
  }

  _compareByYpos(elOne, elTwo) {
    const result =
      parseInt(elOne.getAttribute("y-pos")) >
      parseInt(elTwo.getAttribute("y-pos"));
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__piece__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__game__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_main_util__ = __webpack_require__(4);




document.addEventListener("DOMContentLoaded", () => {
  const modal = document.querySelectorAll("#welcomeModal");
  $d("html").on("keydown", e => {
    __WEBPACK_IMPORTED_MODULE_2__util_main_util__["a" /* closeModal */](e, modal);
    const game = new __WEBPACK_IMPORTED_MODULE_1__game__["a" /* default */]();
    game.play();
  });
});


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map