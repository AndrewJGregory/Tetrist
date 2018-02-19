import Piece from "./piece";
import Game from "./game";
import * as mainUtil from "./util/main_util";

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.querySelectorAll("#welcomeModal");
  $d("html").on("keydown", e => {
    mainUtil.closeModal(e, modal);
    const game = new Game();
    game.play();
  });
});
