class Piece {
  constructor() {
    this.piece = $d('.pos120');
    this.toggleIsPiece();
  }

  move(board) {
    let newYpos;
    let digits;
    let className;
    window.setInterval(() => {
      newYpos = parseInt(this.piece.attr('y-pos')) - 1;
      digits = this.piece.attr('x-pos') + String(newYpos);
      className = 'pos' + digits;
      this.toggleIsPiece();
      this.piece = $d(`.${className}`);
      this.toggleIsPiece();
    }, 1000);
  }

  toggleIsPiece() {
    if (this._isPiece()) {
      this.piece.attr('isPiece', 0);
      this.piece.removeClass('isPiece');
    } else {
      this.piece.attr('isPiece', 1);
      this.piece.addClass('isPiece');
    }
  }

  _isPiece() {
    return Boolean(parseInt(this.piece.attr('isPiece')));
  }
}

export default Piece;
