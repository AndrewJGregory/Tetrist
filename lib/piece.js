import * as util from './util';

class Piece {
  constructor() {
    this.piece = util.generatePiece();
    this.toggleIsPiece();
  }

  move() {
    let intervalId = window.setInterval(() => {
      if (parseInt(this.piece.attr('y-pos')) <= 0) {
        window.clearInterval(intervalId);
      } else {
        this.removeCurrentPiece();
        this.generateNextPiece();
      }
    }, 100);
  }


  generateNextPiece() {
    let digits;
    let collection = $d();
    let xPos = parseInt(this.piece.attr('x-pos'));
    let counter = 0;
    let nextSq;
    let newYpos = String(parseInt(this.piece.attr('y-pos')) - 1);
    for (let pos = xPos; counter < 4; pos++) {
      digits = pos + newYpos;
      nextSq = $d(`.pos${digits}`);
      collection.concat(nextSq);
      counter++;
    }
    collection.addClass('isPiece');
    this.piece = collection;
  }

  removeCurrentPiece() {
    this.toggleIsPiece();
  }

  toggleIsPiece() {
    if (this.piece.hasClass('isPiece')) {
      this.piece.removeClass('isPiece');
    } else {
      this.piece.addClass('isPiece');
    }
  }


}

export default Piece;
