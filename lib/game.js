import Board from './board';
import Piece from './piece';
import * as util from './util';

class Game {
  constructor() {
    this.board = new Board();
    this.board.generate();
    this.intervalId = -1;
    this.piece = null;
  }

  play() {
    this.intervalId = window.setInterval(() => {
      if (!this.isAnyPieceMoving()) {
        this.piece = new Piece(this.intervalId);
        this.piece.move();
        this.board.handleClearingOfRows();
        $d('html').on('keydown', keyPress => {
          this.piece.handleInput(keyPress);
        });
      }
    }, 500);
  }

  isAnyPieceMoving() {
    return $d('.square').hasOneClass('moving');
  }
}

export default Game;
