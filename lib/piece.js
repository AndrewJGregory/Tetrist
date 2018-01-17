import * as util from './util';

class Piece {
  constructor() {
    this.piece = util.generateStartPiece();
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
    const piece = util.generateNextPiece(this.piece);
    this.piece = piece;
  }

  removeCurrentPiece() {
    this.toggleIsPiece();
  }

  toggleIsPiece() {
    if (this.piece.hasClass('isPiece')) {
      this.piece.removeClass('isPiece');
    } else {
      this.piece.addClass('isPiece');
    }
  }


}

export default Piece;
