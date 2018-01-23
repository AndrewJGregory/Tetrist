import * as util from './util';

class Piece {
  constructor(gameIntervalId) {
    this.piece = util.generateStartPiece();
    this.intervalId = -1;
    this.orientation = 0;
    this.playPauseModal = $d('#playPauseModal').HTMLels[0];
    this.gameOverModal = $d('#gameOverModal').HTMLels[0];
    this.gameIntervalId = gameIntervalId;
  }

  move() {
    this.intervalId = window.setInterval(() => {
      if (this.piece) {
        if (util.shouldPieceMoveAgain(this.piece, this.orientation)) {
          this.removeCurrentPiece();
          this.generateNextPiece();
        } else {
          window.clearInterval(this.intervalId);
          this.intervalId = -1;
          $d('html').off('keydown');
          this.piece.removeClass('moving');
        }
      } else {
        window.clearInterval(this.intervalId);
        this.intervalId = -1;
        $d('html').off('keydown');
        this.endGame();
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

  rotatePiece(direction) {
    if (this.isGamePlaying() && util.shouldPieceMoveAgain(this.piece, this._returnNewOrientation(direction))) {
      this._setOrientation(direction);
      this.removeCurrentPiece();
      const rotatedPiece = util.generateRotatedPiece(
        this.piece, this.orientation
      );
      this.piece = rotatedPiece;
    }
  }

  _returnNewOrientation(direction) {
    let orientation = this.orientation;
    if (direction === 'left') {
      orientation++;
    } else {
      orientation += 3;
    }

    orientation %= 4;
    return orientation;
  }

  _setOrientation(direction) {
    if (direction === 'left') {
      this.orientation++;
    } else {
      this.orientation += 3;
    }
    this.orientation = this.orientation % 4;
  }

  userMovePiece(decision) {
    if (this.isGamePlaying()) {
      if (util.shouldPieceBeMovedByUser(decision, this.piece, this.orientation)) {
        this.removeCurrentPiece();
        const piece = util.movePieceByUser(decision, this.piece);
        this.piece = piece;
      }
    }
  }

  playOrPause() {
    if (this.isGamePlaying()) {
      window.clearInterval(this.intervalId);
      this.intervalId = -1;
      this.playPauseModal.style.display = 'block';
    } else {
      this.playPauseModal.style.display = 'none';
      this.move();
    }
  }

  isGamePlaying() {
    return this.intervalId > 0;
  }

  endGame() {
    window.clearInterval(this.gameIntervalId);
    this.gameOverModal.style.display = 'block';
  }

  handleInput(e) {
    const decision = this._convertKeycodeToWord(e.keyCode);
    switch (decision) {
      case 'playOrPause':
      this.playOrPause();
      break;
      case 'rotateLeft':
      this.rotatePiece('left');
      break;
      case 'rotateRight':
      this.rotatePiece('right');
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
}

export default Piece;
