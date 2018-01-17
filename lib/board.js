import * as util from './util';

class Board {
  constructor() {
    this.board = $d('section');
    this.bottomRow = null;
  }

  generate() {
    this.generateRows();
  }

  generateSquares(row, y) {
    let square;
    for (let x = 0; x <= 10; x++) {
      square = this.createSquare(x, y);
      row.append(square);
    }
  }

  createSquare(x, y) {
    const square = $d.create('div').addClass('square');
    square.attr('x-pos', x);
    square.attr('y-pos', y);
    const position = 'pos' + String(x) + String(y);
    square.addClass(position);
    return square;
  }

  createRow(y) {
    const row = $d.create('div').addClass('row');
    row.attr('y-pos', y);
    const position = 'row-pos' + String(y);
    row.addClass(position);
    return row;
  }

  generateRows() {
    let row;
    for (var y = 20; y >= 0; y--) {
      row = this.createRow(y);
      this.generateSquares(row, y);
      this.board.append(row);
    }
  }

  clearRow() {
    if (this._isBottomRowFull()) {
      this.resetBottomRow();
      // this.movePiecesDown();
    }
  }

  resetBottomRow() {
    const bottomRowPieces = this.bottomRow.children();
    bottomRowPieces.attr('isPiece', 0);
    bottomRowPieces.removeClass('isPiece');
  }

  movePiecesDown() {
    const currentPieces = $d('.isPiece');
    let posClass;
    let nextDigits;
    let nextClassName;
    let nextSquare;
    currentPieces.HTMLels.forEach(el => {
      posClass = Array.from(el.classList).filter(className => {
        return className.slice(0,3) === 'pos';
      })[0];
      el.classList.remove('isPiece');
      el.setAttribute('isPiece', 0);
      nextDigits = parseInt(posClass.slice(3)) - 1;
      nextClassName = 'pos' + String(nextDigits);
      nextSquare = $d(`.${nextClassName}`);
      nextSquare.addClass('isPiece');
    });
  }

  _isBottomRowFull() {
    const reducer = (acc, el) => {
      return acc && el.hasClass('isPiece');
    };
    this.bottomRow = $d('.row-pos0');
    return this.bottomRow.children().HTMLels.reduce(reducer, true);
  }
}

export default Board;
