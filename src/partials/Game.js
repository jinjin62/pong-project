import { SVG_NS } from "../settings";
import { KEYS } from "../settings";
import { GAP } from "../settings";
import Board from "./Board";
import Paddle from "./Paddle";
import Ball from "./Ball";
import Score from "./Score";
import Winner from "./Winner";

export default class Game {
  constructor(element, width, height) {
    this.width = width;
    this.height = height;

    this.gameElement = document.getElementById(element);

    this.board = new Board(this.width, this.height);

    this.paddleWidth = 8;
    this.paddleHeight = 68;
    this.boadGap = GAP;

    this.radius = 8;
    this.ball = new Ball(this.radius, this.width, this.height);
    this.ball2 = new Ball(20, this.width, this.height);

    this.paddle1 = new Paddle(
      this.height,
      this.paddleWidth,
      this.paddleHeight,
      this.boadGap,
      (this.height - this.paddleHeight) / 2,
      KEYS.a,
      KEYS.z,
      "paddle1"
    );
    this.paddle2 = new Paddle(
      this.height,
      this.paddleWidth,
      this.paddleHeight,
      this.width - this.paddleWidth - this.boadGap,
      (this.height - this.paddleHeight) / 2,
      KEYS.up,
      KEYS.down,
      "paddle2"
    );

    document.addEventListener("keydown", event => {
      if (event.key === KEYS.spaceBar) {
        this.pause = !this.pause;
      }
    });
    this.score1 = new Score(this.width / 2 - 50, 30, 30);
    this.score2 = new Score(this.width / 2 + 25, 30, 30);

    this.winner = new Winner(this.width / 2 - 110, 10, 70);
  }

  winningPlayer(svg, paddle) {
    this.winner.render(svg, `${paddle} is the winner!`);
    this.pause = true;
  }

  render() {
    // pause
    if (this.pause) {
      return;
    }

    this.gameElement.innerHTML = "";

    let svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttributeNS(null, "width", this.width);
    svg.setAttributeNS(null, "height", this.height);
    svg.setAttributeNS(null, "viewBox", `0 0 ${this.width} ${this.height}`);
    svg.setAttributeNS(null, "version", "1.1");

    this.gameElement.appendChild(svg);

    this.board.render(svg);
    this.paddle1.render(svg);
    this.paddle2.render(svg);

    this.ball.render(svg, this.paddle1, this.paddle2);
    this.ball2.render(svg, this.paddle1, this.paddle2);

    this.score1.render(svg, this.paddle1.score);
    this.score2.render(svg, this.paddle2.score);

    this.winner.render(svg);

    if (this.paddle1.score === 10) {
      this.winningPlayer(svg, "Paddle 1");
    } else if (this.paddle2.score === 10) {
      this.winningPlayer(svg, "Paddle 2");
    }
  }
}
