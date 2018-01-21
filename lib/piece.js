import * as util from './util';

class Piece {
  constructor() {
    this.piece = util.generateStartPiece();
    this.intervalId = -1;
    this.orientation = 0;
  }

  move() {
    this.intervalId = window.setInterval(() => {
      if (util.shouldPieceMoveAgain(this.piece, this.orientation)) {
        this.removeCurrentPiece();
        this.generateNextPiece();
      } else {
        window.clearInterval(this.intervalId);
        this.intervalId = -1;
        $d('html').off('keydown');
        this.piece.removeClass('moving');
      }
    }, 250);
  }

  generateNextPiece() {
    const piece = util.generateNextPiece(this.piece, this.orientation);
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
      this.piece.attr('isPiece', false);
    } else {
      this.piece.addClass(`${color}`);
      this.piece.addClass('moving');
      this.piece.attr('isPiece', true);
    }
  }

  handleInput(e) {
    const key = e.keyCode;
    switch (key) {
      case 32:
      this.playOrPause();
      break;
      case 38:
      this.rotatePiece();
      break;
      case 37:
      case 39:
      case 40:
      this.userMovePiece(key);
      break;
      default:
      return null;
    }
  }

  rotatePiece() {
    if (this.isPaused()) {
      this.removeCurrentPiece();
      const rotatedPiece = util.rotatePiece(this.piece, this.orientation);
      this.piece = rotatedPiece;
      this.orientation++;
    }
  }

  userMovePiece(key) {
    if (this.isPaused()) {
      if (util.shouldPieceBeMovedByUser(key, this.piece, this.orientation)) {
        this.removeCurrentPiece();
        const piece = util.movePieceByUser(key, this.piece);
        this.piece = piece;
      }
    }
  }

  playOrPause() {
    if (this.isPaused()){
      window.clearInterval(this.intervalId);
      this.intervalId = -1;
    } else {
      this.move();
    }
  }

  isPaused() {
    return this.intervalId > 0;
  }
}

export default Piece;
