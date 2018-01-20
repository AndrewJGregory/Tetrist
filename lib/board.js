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
    for (let x = 0; x < 10; x++) {
      square = this.createSquare(x, y);
      row.append(square);
    }
  }

  createSquare(x, y) {
    const square = $d.create('div').addClass('square');
    square.attr('x-pos', x);
    square.attr('y-pos', y);
    square.attr('isPiece', false);
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

  handleClearingOfRows() {
    this.bottomRow = $d('.row-pos0');
    const shapeIds = ['0', '1', '2', '3', '4', '5', '6'];
    const colors = ['red', 'orange', 'yellow', 'blue', 'purple', 'white', 'black'];
    let oldYpos;
    let newYpos;
    let xPos;
    let newPos;
    let allPieces = $d();
    let pieces;
    let newSq;
    let isBottomRowFull = this.bottomRow.children().HTMLels.reduce((acc, el) => {
      return acc &&
      (el.getAttribute('isPiece') === 'true');
    }, true);
    let pieceColor;
    if (isBottomRowFull) {
      this.bottomRow.children().HTMLels.forEach(el => {
        pieceColor = colors.filter(color => Array.from(el.classList).includes(color))[0];

        el.classList.remove(pieceColor);
        el.setAttribute('shape-id', -1);
        el.setAttribute('isPiece', false);
        el.classList.add('green');
      });

      colors.forEach(color => {
        if (Array.from(document.querySelectorAll(`.${color}`)).length !== 0) {
          pieces = $d(`.${color}`);
          pieces.HTMLels = pieces.HTMLels.filter(el => {
            return !Array.from(el.classList).includes('moving');
          });
          allPieces.concat(pieces);
        }
      });

      allPieces.HTMLels.forEach(pieceSquare => {
        oldYpos = parseInt(pieceSquare.getAttribute('y-pos'));
        newYpos = oldYpos - 1;
        xPos = parseInt(pieceSquare.getAttribute('x-pos'));
        newPos = String(xPos) + String(newYpos);
        pieceColor = colors.filter(color => Array.from(pieceSquare.classList).includes(color))[0];
        pieceSquare.classList.remove(pieceColor);
        newSq = $d(`.pos${newPos}`);
        newSq.addClass(pieceColor);
        newSq.attr('isPiece', (pieceSquare.getAttribute('isPiece')));
      });
    }
  }

  getAllPieces() {

  }

  generateRows() {
    let row;
    for (var y = 19; y >= 0; y--) {
      row = this.createRow(y);
      this.generateSquares(row, y);
      this.board.append(row);
    }
  }
}

export default Board;
