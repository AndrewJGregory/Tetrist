import Board from './board';
import Piece from './piece';

document.addEventListener('DOMContentLoaded', () => {
  let board = new Board();
  board.generate();
  // window.setInterval(() => {
    let piece = new Piece();
    piece.move();
  // }, 500);
});
