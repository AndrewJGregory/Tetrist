import * as util from './util';

class Piece {
  constructor() {
    this.piece = util.generateStartPiece();
  }

  move() {
    let intervalId = window.setInterval(() => {
      if (util.shouldPieceMoveAgain(this.piece)) {
        this.removeCurrentPiece();
        this.generateNextPiece();
      } else {
        window.clearInterval(intervalId);
        this.piece.removeClass('moving');
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
    const shapeId = this.piece.attr('shape-id');
    const color = util.generateColor(`${shapeId}`);
    if (this.piece.hasAllClass(`${color}`)) {
      this.piece.removeClass(`${color}`);
      this.piece.removeClass('moving');
    } else {
      this.piece.addClass(`${color}`);
      this.piece.addClass('moving');
    }
  }
}

export default Piece;
