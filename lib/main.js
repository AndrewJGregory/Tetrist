import * as mainUtil from "./util/main_util";

import Game from "./game";

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.querySelectorAll("#welcomeModal");
  $d("html").on("keydown", e => {
    mainUtil.closeModal(e, modal);
    const game = new Game();
    game.start();
  });
});
