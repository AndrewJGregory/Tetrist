import Piece from './piece';
import Game from './game';
import * as util from './util';

const closeModal = (e, modal) => {
    modal[0].style.display = 'none';
    $d('html').off('click');
***REMOVED***

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.querySelectorAll('#welcomeModal');
  $d('html').on('keydown', (e) => {
    closeModal(e, modal);
    const game = new Game();
    game.play();
  });
});
