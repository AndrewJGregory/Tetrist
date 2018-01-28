import * as collisionUtil from './util/collision_detection_util';
import * as pieceUtil from './util/piece_util';

class Piece {
  constructor() {
    this.collection = pieceUtil.generateStartPiece();
    this.intervalId = -1;
    this.orientation = 0;
    this.playPauseModal = $d('#playPauseModal').HTMLels[0];
  }

  move() {
    this.intervalId = window.setInterval(() => {
      if (collisionUtil.shouldPieceMoveAgain(this.collection)) {
        this.removeCurrentPiece();
        this.generateNextPiece();
      } else {
        this.removePieceObject();
      }
    }, 200);
  }

  generateNextPiece() {
    const collection = pieceUtil.generateNextPiece(this.collection);
    this.collection = collection;
  }

  removePieceObject() {
    window.clearInterval(this.intervalId);
    this.intervalId = -1;
    $d('html').off('keydown');
    this.collection.removeClass('moving');
  }

  removeCurrentPiece() {
    const shapeId = this.collection.attr('shape-id');
    const color = pieceUtil.generateColor(`${shapeId}`);
    this.collection.removeClass(`${color}`);
    this.collection.removeClass('moving');
    this.collection.attr('isPiece', false);
  }

  rotatePiece() {
    const newOrientation = this._returnNewOrientation();
    const shouldPieceRotate = collisionUtil.shouldPieceRotate(
      this.collection,
      newOrientation
    );
    if (this.isMoving() && shouldPieceRotate) {
      this._setOrientation();
      this.removeCurrentPiece();
      const rotatedPiece = pieceUtil.generateRotatedPiece(
        this.collection, this.orientation
      );
      this.collection = rotatedPiece;
    }
  }

  _returnNewOrientation() {
    const newOrientation = (this.orientation + 1) % 4;
    return newOrientation;
  }

  _setOrientation() {
    this.orientation++;
    this.orientation %= 4;
  }

  userMovePiece(decision) {
    if (this.isMoving()) {
      if (collisionUtil.shouldPieceBeMovedByUser(decision, this.collection)) {
        this.removeCurrentPiece();
        const collection = pieceUtil.movePieceByUser(decision, this.collection);
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
      case 'rotate':
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
    const keyCodesToWords = {
      32: 'playOrPause', // spacebar
      65: 'left', // "A"
      83: 'down', // "S"
      68: 'right', // "D"
      87: 'rotate' // "W"
    ***REMOVED***
    return keyCodesToWords[keyCode];
  }
}

export default Piece;
