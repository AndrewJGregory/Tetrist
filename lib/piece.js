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
    const decision = this._convertKeycodeToWord(e.keyCode);
    switch (decision) {
      case 'playOrPause':
      this.playOrPause();
      break;
      case 'rotateLeft':
      case 'rotateRight':
      this.rotatePiece();
      break;
      case 'left':
      case 'right':
      case 'down':
      this.userMovePiece(decision);
      break;
      default:
      return null;
    }
  }

  _convertKeycodeToWord(keyCode) {
    switch (keyCode) {
      case 32:
      return 'playOrPause';
      case 65:
      return 'left';
      case 83:
      return 'down';
      case 68:
      return 'right';
      case 81:
      return 'rotateLeft';
      case 69:
      return 'rotateRight';
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

  userMovePiece(decision) {
    if (this.isPaused()) {
      if (util.shouldPieceBeMovedByUser(decision, this.piece, this.orientation)) {
        this.removeCurrentPiece();
        const piece = util.movePieceByUser(decision, this.piece);
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
