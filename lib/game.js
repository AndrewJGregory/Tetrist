import Board from './board';
import Piece from './piece';

class Game {
  constructor() {
    this.board = new Board();
    this.board.generate();
  }
}

export default Game;
