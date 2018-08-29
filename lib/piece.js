import * as collisionUtil from "./util/collision_detection_util";
import * as pieceUtil from "./util/piece_util";

class Piece {
  constructor() {
    this.shapeId = Math.floor(Math.random() * 7);
    this.intervalId = -1;
    this.orientation = 0;
    this.preview = $d();
    this.dropped = false;
    this.color = pieceUtil.COLORS[this.shapeId];
    this.collection = pieceUtil.generateFirstCollection(this.shapeId);
  }

  draw() {
    pieceUtil.finalizePiece(this.collection, this.color);
  }

  move() {
    this.intervalId = window.setInterval(() => {
      if (collisionUtil.shouldPieceMoveAgain(this)) {
        this.removePreview();
        this.removeCurrentPiece();
        this.collection = pieceUtil.generateNextPiece(this);
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
    let possibleNextCollection = this.collection.dup();
    let doesCollide, shouldMoveAgain, duped;
    while (true) {
      duped = this.dup(possibleNextCollection);
      shouldMoveAgain = collisionUtil.shouldPieceMoveAgain(duped);
      if (shouldMoveAgain) {
        this.preview = possibleNextCollection;
        possibleNextCollection = pieceUtil.generateUserMoveCollection(duped, [
          0,
          -1
        ]);
      } else {
        this.preview = possibleNextCollection;
        break;
      }
    }
  }

  dup(collection) {
    const copy = new Piece();
    for (let variable in this)
      copy[variable] = variable === "collection" ? collection : this[variable];
    return copy;
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
    this.collection.removeClass(`${this.color}`);
    this.collection.removeClass("moving");
    this.collection.attr("isPiece", false);
  }

  rotatePiece() {
    const newOrientation = this._returnNewOrientation();
    const shouldPieceRotate = collisionUtil.shouldPieceRotate(
      this,
      newOrientation
    );
    if (shouldPieceRotate) {
      this._setOrientation();
      this.removePreview();
      this.removeCurrentPiece();
      this.collection = pieceUtil.generateRotatedPiece(this);
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
    if (collisionUtil.shouldPieceBeMovedByUser(decision, this)) {
      this.removeCurrentPiece();
      this.collection = pieceUtil.movePieceByUser(decision, this);
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
