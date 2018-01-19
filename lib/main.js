import Piece from './piece';
import Game from './game';
import * as util from './util';

document.addEventListener('DOMContentLoaded', () => {
  const game = new Game();
  let isAnyPieceMoving;
  let piece;
  let intervalId = window.setInterval(() => {
    isAnyPieceMoving = $d('.square').hasOneClass('moving');
    if (!isAnyPieceMoving) {
      piece = new Piece();
      piece.move();
      $d('html').on('keydown', e => {
        piece.handleInput(e);
      });
    }
  }, 500);
});
