import { SVG_NS } from "../settings";
import Board from "./Board";
import Paddle from "./Paddle";
import { KEYS } from "../settings";

export default class Game {
  constructor(element, width, height) {
    this.width = width;
    this.height = height;

    this.gameElement = document.getElementById(element);

    this.board = new Board(this.width, this.height);

    this.paddleWidth = 8;
    this.paddleHeight = 68;
    this.boadGap = 10;

    this.paddle1 = new Paddle(
      this.height,
      this.paddleWidth,
      this.paddleHeight,
      this.boadGap,
      (this.height - this.paddleHeight) / 2
    );
    this.paddle2 = new Paddle(
      this.height,
      this.paddleWidth,
      this.paddleHeight,
      this.width - this.paddleWidth - this.boadGap,
      (this.height - this.paddleHeight) / 2
    );
  }

  render() {
    // empty out game element before rendering
    this.gameElement.innerHTML = "";

    let svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttributeNS(null, "width", this.width);
    svg.setAttributeNS(null, "height", this.height);
    svg.setAttributeNS(null, "viewBox", `0 0 ${this.width} ${this.height}`);
    svg.setAttributeNS(null, "version", "1.1");

    this.gameElement.appendChild(svg);

    // rendering all game elements inside the SVG
    this.board.render(svg);
    this.paddle1.render(svg);
    this.paddle2.render(svg);
  }
}
