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
    this.saveScore();
  }

  saveScore() {
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
        this.makeHighScoreRows(data);
      });
  }

  makeHighScoreRows(data) {
    const tableBody = $d("tbody");
    let newRow, nameCell, scoreCell;
    let position = 1;
    $d("div").removeClass("loader");
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

export default Game;
