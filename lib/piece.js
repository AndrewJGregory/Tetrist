import * as util from './util';

class Piece {
  constructor() {
    this.piece = util.generateStartPiece();
    this.intervalId = -1;
  }

  move() {
    this.intervalId = window.setInterval(() => {
      if (util.shouldPieceMoveAgain(this.piece)) {
        this.removeCurrentPiece();
        this.generateNextPiece();
      } else {
        window.clearInterval(this.intervalId);
        this.intervalId = -1;
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
    switch (e.keyCode) {
      case 32:
      this.playOrPause();
      break;
      case 37:
      case 39:
      case 40:
      if (this.intervalId > 0) {
        if (util.shouldPieceBeMovedByUser(e, this.piece)) {
          this.removeCurrentPiece();
          const piece = util.movePieceByUser(e, this.piece);
          this.piece = piece;
        }
      }
      break;
      default:
      return null;
    }
  }

  playOrPause() {
    if (this.intervalId > 0) {
      window.clearInterval(this.intervalId);
      this.intervalId = -1;
    } else {
      this.move();
    }

  }
}

export default Piece;
