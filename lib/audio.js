class Audio {
  constructor() {
    this.element = $d("audio").HTMLels[0];
    this.container = $d(".audio-controls");
    this.isPlaying = false;
    this.container.on("click", () => {
      this.handleClick();
    });
  }

  handleClick() {
    this.isPlaying ? this.pause() : this.play();
  }

  play() {
    this.isPlaying = true;
    this.updateContent("pause");
    this.element.play();
  }

  pause() {
    this.isPlaying = false;
    this.updateContent("play");
    this.element.pause();
  }

  updateContent(type) {
    this.container.empty();
    const content = this.createContent(`${type}`);
    this.container.append(content);
  }

  createContent(type) {
    const content = $d.create("i");
    content
      .addClass("fa")
      .addClass("fa-2x")
      .addClass(`fa-${type}`)
      .attr("aria-hidden", "true");
    return content;
  }
}

export default Audio;
