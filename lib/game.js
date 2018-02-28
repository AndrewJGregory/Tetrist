import Board from "./board";
import Piece from "./piece";
import * as pieceUtil from "./util/piece_util";
import Audio from "./audio";

class Game {
  constructor() {
    this.board = new Board();
    this.board.generate();
    this.intervalId = -1;
    this.piece = null;
    this.gameOverModal = $d("#gameOverModal").HTMLels[0];
    this.colors = pieceUtil.makeColorsArray();
    this.audio = new Audio();
    this._initializeFirebase();
    this.database = firebase.database();
    this.readFromDatabase();
  }

  play() {
    $d("html").off("keydown");
    this.intervalId = window.setInterval(() => {
      if (!this.isAnyPieceMoving()) {
        this.piece = new Piece();
        if (this.piece.collection) {
          this.piece.move();
          this.board.handleClearingOfRows();
          $d("html").on("keydown", keyPress => {
            this.piece.handleInput(keyPress);
          });
        } else {
          this.endGame();
        }
      }
    }, 500);
  }

  isAnyPieceMoving() {
    return $d(".square").hasOneClass("moving");
  }

  endGame() {
    window.clearInterval(this.intervalId);
    this.gameOverModal.style.display = "block";
    $d("html").off("keydown");
    $d("html").on("keydown", keyPress => {
      this.handleInput(keyPress);
    });
    let name = null;
    const score = this.board.score;
    this.database.ref("scores/").push({
      name,
      score
    });
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
  }

  handleInput(keyPress) {
    if (keyPress.keyCode === 32) {
      this.reset();
      this.play();
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
      .then(function(snapshot) {
        const data = snapshot.val();
      });
  }
}

export default Game;
