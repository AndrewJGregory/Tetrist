import Board from './board';
import Piece from './piece';

class Game {
  constructor() {
    let board = new Board();
    board.generate();
  }
}

export default Game;
