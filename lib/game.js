import Board from './board';
import Piece from './piece';
import * as pieceUtil from './util/piece_util';

class Game {
  constructor() {
    this.board = new Board();
    this.board.generate();
    this.intervalId = -1;
    this.piece = null;
    this.gameOverModal = $d('#gameOverModal').HTMLels[0];
    this.colors = pieceUtil.makeColorsArray();
  }

  play() {
    $d('html').off('keydown');
    this.intervalId = window.setInterval(() => {
      if (!this.isAnyPieceMoving()) {
        this.piece = new Piece();
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

export default Game;
