import Board from './board';
import Piece from './piece';

document.addEventListener('DOMContentLoaded', () => {
  let board = new Board();
  board.generate();
  let intervalId = window.setInterval(() => {
      let piece = new Piece();
      piece.move();
  }, 500);
});
