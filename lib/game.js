import Board from "./board";
import Piece from "./piece";
import * as pieceUtil from "./util/piece_util";
import * as collisionUtil from "./util/collision_detection_util";
import Audio from "./audio";

class Game {
  constructor() {
    this.board = new Board();
    this.board.generate();
    this.makePreviewSquare();
    this.intervalId = -1;
    this.pieces = [new Piece(), new Piece()];
    this.currentPiece = this.pieces[1];
    this.nextPiece = this.pieces[0];
    this.gameOverModal = $d("#gameOverModal").HTMLels[0];
    this.playPauseModal = $d("#playPauseModal").HTMLels[0];
    this.submitBtn = $d(".score-submit-btn");
    this.nameInput = $d(".name-input");
    this.colors = pieceUtil.COLORS;
    this.audio = new Audio();
    this.paused = false;
    this._initializeFirebase();
    this.database = firebase.database();
    window.firebase = null;
    this.nameInput.on("keydown", e => {
      this.nameInput.removeClass("error");
      $d(".name-input-error-msg").html("");
    });
  }

  start() {
    this.readFromDatabase();
    $d(".extra-game-over-text").html("Submit your high score to play again.");
    $d("html").off("keydown");
    $d("html").on("keydown", keyPress => this.handleInput(keyPress));
    this.intervalId = window.setInterval(() => {
      if (!this.isAnyPieceMoving()) {
        this.currentPiece = this.pieces.pop();
        this.drawNextPiecePreview();
        this.nextPiece = new Piece();
        this.pieces.unshift(this.nextPiece);
        if (this.isOver()) {
          this.endGame();
        } else {
          this.currentPiece.draw();
          this.currentPiece.setPreview();
          this.currentPiece.drawPreview();
          this.currentPiece.move();
          this.board.handleClearingOfRows();
        }
      }
    }, 500);
  }

  isOver() {
    const isAtTop = this.currentPiece.collection.HTMLels.some(
      HTMLel => HTMLel.getAttribute("y-pos") == 19
    );
    let isColliding;
    const colors = pieceUtil.COLORS;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < colors.length; j++) {
        const color = colors[j];
        if (this.currentPiece.collection.hasOneClass(color)) {
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
    $d("html").on("keydown", keyPress => {
      this.reset();
      this.start();
    });
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
    this.currentPiece = null;
  }

  play() {
    this.paused = false;
    this.playPauseModal.style.display = "none";
    this.currentPiece.move();
  }

  pause() {
    this.paused = true;
    this.playPauseModal.style.display = "block";
    clearInterval(this.currentPiece.intervalId);
    this.currentPiece.intervalId = -1;
  }

  handleInput(keyPress) {
    const pieceKeycodes = [87, 65, 83, 68, 32];
    const keycode = keyPress.keyCode;
    if (keycode === 32 && this.paused) {
      this.play();
    } else {
      if (keycode === 16) {
        this.paused ? this.play() : this.pause();
      } else {
        if (pieceKeycodes.includes(keycode) && !this.paused)
          this.currentPiece.handleInput(keyPress);
      }
    }
  }

  _initializeFirebase() {
    const config = {
      apiKey: "AIzaSyCri3MSVxR5am0LcSauaI_VS4IB3g0fz2w",
      authDomain: "tetrist-66fe1.firebaseapp.com",
      databaseURL: "https://tetrist-66fe1.firebaseio.com",
      projectId: "tetrist-66fe1",
      storageBucket: "tetrist-66fe1.appspot.com",
      messagingSenderId: "213202119525"
    };
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

  makePreviewSquare() {
    const container = $d(".preview-piece");
    const nextPieceHTMLel = $d.create("p").html("Next piece: ");
    container.append(nextPieceHTMLel);
    let row;
    for (let i = 0; i < 4; i++) {
      row = $d
        .create("div")
        .addClass("preview-row")
        .addClass("no-border");
      for (let j = 0; j < 4; j++) {
        row.append(
          $d
            .create("div")
            .addClass("square")
            .addClass("no-border")
            .attr("previewXpos", i)
            .attr("previewYpos", j)
        );
      }
      container.append(row);
    }
  }

  drawNextPiecePreview() {
    $d(".preview-row").removeClass(this.currentPiece.color);
    $d(".preview-row").addClass(this.nextPiece.color);
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

export default Game;
