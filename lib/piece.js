import * as util from './util';

class Piece {
  constructor() {
    this.piece = util.generateStartPiece();
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
    const piece = util.generateNextPiece(this.piece);
    this.piece = piece;
  }

  removeCurrentPiece() {
    this.toggleIsPiece();
  }


  toggleIsPiece() {
    const generateColor = {
      0: 'red',
      1: 'orange',
      2: 'yellow',
      3: 'blue',
      4: 'purple',
      5: 'green',
      6: 'black'
    ***REMOVED***
    const shapeId = this.piece.attr('shape-id');
    const color = generateColor[`${shapeId}`];
    if (this.piece.hasClass(`${color}`)) {
      this.piece.removeClass(`${color}`);
    } else {
      this.piece.addClass(`${color}`);
    }

  }


}

export default Piece;
