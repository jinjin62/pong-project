import { SVG_NS } from "../settings";
import { SPEED } from "../settings";

export default class Paddle {
  constructor(boardHeight, width, height, x, y, upKey, downKey, paddle) {
    this.boardHeight = boardHeight;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speed = SPEED;
    this.score = 0;
    this.paddle = paddle;
    this.keyState = {};

    document.addEventListener(
      "keydown",
      event => {
        this.keyState[event.key || event.which] = true;
      },
      true
    );
    document.addEventListener(
      "keyup",
      event => {
        this.keyState[event.key || event.which] = false;
      },
      true
    );
  }

  up() {
    this.y -= this.speed;
    this.y = Math.max(0, this.y);
  }

  down() {
    this.y += this.speed;
    this.y = Math.min(this.boardHeight - this.height, this.y);
  }

  coordinates(x, y, width, height) {
    let leftX = x;
    let rightX = x + width;
    let topY = y;
    let bottomY = y + height;
    return { leftX, rightX, topY, bottomY };
  }

  render(svg) {
    if (this.keyState["a"] && this.paddle === "paddle1") {
      this.up();
    }
    if (this.keyState["z"] && this.paddle === "paddle1") {
      this.down();
    }
    if (this.keyState["ArrowUp"] && this.paddle === "paddle2") {
      this.up();
    }
    if (this.keyState["ArrowDown"] && this.paddle === "paddle2") {
      this.down();
    }

    let paddle = document.createElementNS(SVG_NS, "rect");

    paddle.setAttributeNS(null, "width", this.width);
    paddle.setAttributeNS(null, "height", this.height);
    paddle.setAttributeNS(null, "x", this.x);
    paddle.setAttributeNS(null, "y", this.y);
    paddle.setAttributeNS(null, "fill", "white");

    svg.appendChild(paddle);
  }
}
