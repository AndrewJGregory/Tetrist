import * as util from './util';

class Piece {
  constructor() {
    const className = this._generateClassName();
    this.piece = $d(`.${className}`);
    this.toggleIsPiece();
  }

  _generateClassName() {
    let className = 'pos';
    const stringifiedDigits = this._generateDigits();
    className += stringifiedDigits + '20';
    return className;
  }

  _generateDigits() {
    const digit = Math.floor(Math.random()*11);
    return String(digit);
  }

  move(board) {
    let newYpos;
    let digits;
    let className;
    let nextSquare;
    let isNextSquarePiece;
    let intervalId = window.setInterval(() => {
      if (parseInt(this.piece.attr('y-pos')) <= 0) {
        window.clearInterval(intervalId);
      } else {
        newYpos = parseInt(this.piece.attr('y-pos')) - 1;
        digits = this.piece.attr('x-pos') + String(newYpos);
        className = 'pos' + digits;
        nextSquare = $d(`.${className}`);
        isNextSquarePiece = util.isPiece(nextSquare);

        if (isNextSquarePiece) {
          window.clearInterval(intervalId);
        } else {
          this.toggleIsPiece();
          this.piece = nextSquare;
          this.toggleIsPiece();
        }
      }
    }, 100);
  }

  toggleIsPiece() {
    if (util.isPiece(this.piece)) {
      this.piece.attr('isPiece', 0);
      this.piece.removeClass('isPiece');
    } else {
      this.piece.attr('isPiece', 1);
      this.piece.addClass('isPiece');
    }
  }
}

export default Piece;
