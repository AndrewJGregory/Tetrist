import Piece from './piece';
import Game from './game';

document.addEventListener('DOMContentLoaded', () => {
  const game = new Game();
  let isAnyPieceMoving;
  let intervalId = window.setInterval(() => {
    isAnyPieceMoving = $d('.square').hasOneClass('moving');
    if (!isAnyPieceMoving) {
      let piece = new Piece();
      piece.move();
    }
  }, 500);
});
