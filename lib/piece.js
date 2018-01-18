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
        $d('html').off('keydown');
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

  userMove(e) {
    if ([37, 39, 40].includes(e.keyCode)) {
      if (util.shouldPieceBeMovedByUser(e, this.piece)) {
        this.removeCurrentPiece();
        const piece = util.movePieceByUser(e, this.piece);
        this.piece = piece;
      }
    }
  }
}

export default Piece;
