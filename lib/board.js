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
    square.attr('isPiece', 0);
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
      const currentPieces = $d('.isPiece');
      this.resetBottomRow();
    }
  }

  resetBottomRow() {
    const bottomRowPieces = this.bottomRow.children();
    bottomRowPieces.attr('isPiece', 0);
    bottomRowPieces.removeClass('isPiece');
  }

  _isBottomRowFull() {
    const reducer = (acc, el) => {
      return acc && util.isPiece(el);
    };
    this.bottomRow = $d('.row-pos0');
    return this.bottomRow.children().HTMLels.reduce(reducer, true);
  }
}

export default Board;
