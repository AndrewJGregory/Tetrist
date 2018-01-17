import * as util from './util';

class Board {
  constructor() {
    this.board = $d('section');
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
    }
  }

  _isBottomRowFull() {
    const reducer = (acc, el) => {
      return acc && util.isPiece(el.isPiece);
    ***REMOVED***
    const bottomRow = $('.pos0');
    return bottomRow.children().HTMLels.reduce(reducer, true);
  }
}

export default Board;
