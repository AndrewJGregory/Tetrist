import Piece from './piece';
import Game from './game';
import * as util from './util';

const closeModal = (e, modal) => {
  if (e.target !== modal) {
    modal[0].style.display = 'none';
    $d('html').off('click');
  }
***REMOVED***

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.querySelectorAll('#welcomeModal');
  $d('html').on('click', (e) => {
    closeModal(e, modal);
    const game = new Game();
    let isAnyPieceMoving;
    let piece;
    let intervalId = window.setInterval(() => {
      isAnyPieceMoving = $d('.square').hasOneClass('moving');
      if (!isAnyPieceMoving) {
        piece = new Piece();
        piece.move();
        game.board.handleClearingOfRows();
        $d('html').on('keydown', keyPress => {
          piece.handleInput(keyPress);
        });
      }
    }, 500);
  });
});
