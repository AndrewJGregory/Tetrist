import * as collisionUtil from "./util/collision_detection_util";
import * as pieceUtil from "./util/piece_util";

class Piece {
  constructor() {
    this.collection = pieceUtil.generateFirstCollection();
    this.intervalId = -1;
    this.orientation = 0;
    this.preview = $d();
    this.dropped = false;
  }

  draw() {
    pieceUtil.finalizePiece(this.collection);
  }

  move() {
    this.intervalId = window.setInterval(() => {
      if (collisionUtil.shouldPieceMoveAgain(this.collection)) {
        this.removePreview();
        this.removeCurrentPiece();
        this.collection = pieceUtil.generateNextPiece(this.collection);
        this.draw();
        this.setPreview();
        this.drawPreview();
      } else {
        this.removePieceObject();
      }
    }, 200);
  }

  setPreview() {
    this.preview = this.collection.dup();
    let possibleNextPiece = this.collection.dup();
    let doesCollide, shouldMoveAgain;
    while (true) {
      shouldMoveAgain = collisionUtil.shouldPieceMoveAgain(possibleNextPiece);
      if (shouldMoveAgain) {
        this.preview = possibleNextPiece;
        possibleNextPiece = pieceUtil.generateUserMoveCollection(
          possibleNextPiece,
          [0, -1]
        );
      } else {
        this.preview = possibleNextPiece;
        break;
      }
    }
  }

  drawPreview() {
    this.preview.addClass("preview");
  }

  removePreview() {
    this.preview.removeClass("preview");
  }

  removePieceObject() {
    window.clearInterval(this.intervalId);
    this.intervalId = -1;
    this.collection.removeClass("moving");
    this.preview.removeClass("preview");
  }

  removeCurrentPiece() {
    const shapeId = this.collection.attr("shape-id");
    const color = pieceUtil.generateColor(`${shapeId}`);
    this.collection.removeClass(`${color}`);
    this.collection.removeClass("moving");
    this.collection.attr("isPiece", false);
  }

  rotatePiece() {
    const newOrientation = this._returnNewOrientation();
    const shouldPieceRotate = collisionUtil.shouldPieceRotate(
      this.collection,
      newOrientation
    );
    if (shouldPieceRotate) {
      this._setOrientation();
      this.removePreview();
      this.removeCurrentPiece();
      this.collection = pieceUtil.generateRotatedPiece(
        this.collection,
        this.orientation
      );
      this.draw();
      this.setPreview();
      this.drawPreview();
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
    if (collisionUtil.shouldPieceBeMovedByUser(decision, this.collection)) {
      this.removeCurrentPiece();
      this.collection = pieceUtil.movePieceByUser(decision, this.collection);
      this.draw();
      this.removePreview();
      this.setPreview();
      this.drawPreview();
    }
  }

  handleInput(keyPress) {
    const decision = this._convertKeycodeToWord(keyPress.keyCode);
    switch (decision) {
      case "rotate":
        if (!this.dropped) this.rotatePiece();
        break;
      case "left":
      case "right":
      case "down":
        if (!this.dropped) this.userMovePiece(decision);
        break;
      case "drop":
        const shapeId = this.collection.attr("shape-id");
        this.removeCurrentPiece();
        this.collection = this.preview;
        this.collection.attr("shape-id", shapeId);
        this.draw();
        this.removePieceObject();
        this.dropped = true;
        break;
      default:
        return null;
    }
  }

  _convertKeycodeToWord(keyCode) {
    const keyCodesToWords = {
      32: "drop", // spacebar
      65: "left", // "A"
      83: "down", // "S"
      68: "right", // "D"
      87: "rotate" // "W",
    };
    return keyCodesToWords[keyCode];
  }
}

export default Piece;
