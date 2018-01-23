import Board from './board';
import Piece from './piece';
import * as util from './util';

class Game {
  constructor() {
    this.board = new Board();
    this.board.generate();
    this.intervalId = -1;
    this.piece = null;
    this.gameOverModal = $d('#gameOverModal').HTMLels[0];
  }

  play() {
    this.intervalId = window.setInterval(() => {
      if (!this.isAnyPieceMoving()) {
        this.piece = new Piece();
        if (this.piece.piece) {
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
  }
}

export default Game;
