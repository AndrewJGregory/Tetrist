import Board from './board';
import Piece from './piece';

document.addEventListener('DOMContentLoaded', () => {
  let board = new Board();
  board.generate();
  let piece = new Piece();
  piece.move(board);
});
