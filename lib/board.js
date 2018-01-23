import * as util from './util';

class Board {
  constructor() {
    this.board = $d('section');
    this.colors = ['red', 'orange',
    'yellow', 'blue',
    'purple', 'white',
    'pink'];
    this.score = 0;
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
    let abovePieces, isRowFull, row;
    for (let i = 0; i < 10; i++) {
      row = $d(`.row-pos${i}`);
      isRowFull = this.isRowFull(row);
      if (isRowFull) {
        this.clearRow(row);
        this.updateScore();
        abovePieces = this.getAbovePieces(i);
        this.movePiecesDown(abovePieces);
        i--;
      }
    }
  }

  updateScore() {
    this.score++;
    $d('.scoreCounter').html(`Rows\n cleared:\n ${this.score}`);
  }

  clearRow(row) {
    let pieceColor;
    row.children().HTMLels.forEach(el => {
      pieceColor = this.colors.filter(color => Array.from(el.classList).includes(color))[0];

      el.classList.remove(pieceColor);
      el.setAttribute('shape-id', -1);
      el.setAttribute('isPiece', false);
      el.classList.add('green');
      debugger;
    });
  }

  isRowFull(row) {
    return row.children().HTMLels.reduce((acc, el) => {
      return acc &&
      (el.getAttribute('isPiece') === 'true');
    }, true);
  }

  movePiecesDown(allPieces) {
    let oldYpos, newYpos, xPos, newPos, pieceColor, newSq;
    debugger;
    allPieces.HTMLels.forEach(pieceSquare => {
      oldYpos = parseInt(pieceSquare.getAttribute('y-pos'));
      newYpos = oldYpos - 1;
      xPos = parseInt(pieceSquare.getAttribute('x-pos'));
      newPos = String(xPos) + String(newYpos);
      pieceColor = this.colors.filter(color => Array.from(pieceSquare.classList).includes(color))[0];
      pieceSquare.classList.remove(pieceColor);
      pieceSquare.setAttribute('shape-id', -1);
      pieceSquare.setAttribute('isPiece', false);
      newSq = $d(`.pos${newPos}`);
      newSq.addClass(pieceColor);
      newSq.attr('isPiece', true);
      debugger;
    });
  }

  getAbovePieces(yPos) {
    let abovePieces = $d();
    let pieces;
    this.colors.forEach(color => {
      if (Array.from(document.querySelectorAll(`.${color}`)).length !== 0) {
        pieces = $d(`.${color}`);
        pieces.HTMLels = pieces.HTMLels.filter(el => {
          return !Array.from(el.classList).includes('moving') &&
          (parseInt(el.getAttribute('y-pos')) > yPos);
        });
        abovePieces.concat(pieces);
      }
    });
    abovePieces.HTMLels.sort(this._compareByYpos);
    return abovePieces;
  }

  generateRows() {
    let row;
    for (var y = 19; y >= 0; y--) {
      row = this.createRow(y);
      this.generateSquares(row, y);
      this.board.append(row);
    }
  }

  _compareByYpos(elOne, elTwo) {
    const result = parseInt(elOne.getAttribute('y-pos')) >
    parseInt(elTwo.getAttribute('y-pos'));
    switch (result) {
      case true:
      return 1;
      case false:
      return -1;
      default:
      return 0;
    }
  }
}

export default Board;
