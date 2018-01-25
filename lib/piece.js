import * as util from './util';

class Piece {
  constructor() {
    this.collection = util.generateStartPiece();
    this.intervalId = -1;
    this.orientation = 0;
    this.playPauseModal = $d('#playPauseModal').HTMLels[0];
  }

  move() {
    this.intervalId = window.setInterval(() => {
      if (util.shouldPieceMoveAgain(this.collection)) {
        this.removeCurrentPiece();
        this.generateNextPiece();
      } else {
        window.clearInterval(this.intervalId);
        this.intervalId = -1;
        $d('html').off('keydown');
        this.collection.removeClass('moving');
      }
    }, 200);
  }

  generateNextPiece() {
    const collection = util.generateNextPiece(this.collection);
    this.collection = collection;
  }

  removeCurrentPiece() {
    const shapeId = this.collection.attr('shape-id');
    const color = util.generateColor(`${shapeId}`);
    this.collection.removeClass(`${color}`);
    this.collection.removeClass('moving');
    this.collection.attr('isPiece', false);
  }

  rotatePiece(direction) {
    if (this.isMoving() && util.shouldPieceRotate(this.collection, this._returnNewOrientation(direction))) {
      this._setOrientation(direction);
      this.removeCurrentPiece();
      const rotatedPiece = util.generateRotatedPiece(
        this.collection, this.orientation
      );
      this.collection = rotatedPiece;
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
    if (this.isMoving()) {
      if (util.shouldPieceBeMovedByUser(decision, this.collection)) {
        this.removeCurrentPiece();
        const collection = util.movePieceByUser(decision, this.collection);
        this.collection = collection;
      }
    }
  }

  playOrPause() {
    if (this.isMoving()) {
      window.clearInterval(this.intervalId);
      this.intervalId = -1;
      this.playPauseModal.style.display = 'block';
    } else {
      this.playPauseModal.style.display = 'none';
      this.move();
    }
  }

  isMoving() {
    return this.intervalId > 0;
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
      case 37:
      return 'rotateLeft';
      case 39:
      return 'rotateRight';
      default:
      return null;
    }
  }
}

export default Piece;
