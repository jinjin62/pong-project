import { SVG_NS } from "../settings";

export default class Ball {
  constructor(radius, boardWidth, boardHeight) {
    this.radius = radius;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.direction = 1;
    this.ping = new Audio("public/sounds/wowc.mp3");

    this.reset();
  }

  reset() {
    this.x = this.boardWidth / 2;
    this.y = this.boardHeight / 2;

    this.vy = 0;

    while (this.vy === 0) {
      this.vy = Math.floor(Math.random() * 10 - 5);
    }

    this.vx = this.direction * (6 - Math.abs(this.vy));
  }

  wallCollision() {
    const hitLeft = this.x - this.radius <= 0;
    const hitRight = this.x + this.radius >= this.boardWidth;
    const hitTop = this.y + this.radius >= this.boardHeight;
    const hitBottom = this.y - this.radius <= 0;

    if (hitLeft || hitRight) {
      this.vx = -this.vx;
    } else if (hitTop || hitBottom) {
      this.vy = -this.vy;
    }
  }

  paddleCollision(paddle1, paddle2) {
    if (this.vx > 0) {
      let paddle = paddle2.coordinates(
        paddle2.x,
        paddle2.y,
        paddle2.width,
        paddle2.height
      );

      let { leftX, topY, bottomY } = paddle;

      if (
        this.x + this.radius >= leftX &&
        this.y >= topY &&
        this.y <= bottomY
      ) {
        this.vx = -this.vx;
        this.ping.play();
      }

      if (this.x >= leftX && this.y <= topY && this.y >= bottomY) {
        this.vx = -this.vx;
        this.ping.play();
      }
    } else {
      let paddle = paddle1.coordinates(
        paddle1.x,
        paddle1.y,
        paddle1.width,
        paddle1.height
      );
      let { rightX, topY, bottomY } = paddle;

      if (
        this.x - this.radius <= rightX &&
        this.y >= topY &&
        this.y <= bottomY
      ) {
        this.vx = -this.vx;
        this.ping.play();
      }
      if (this.x <= rightX && this.y >= topY && this.y <= bottomY) {
        this.vx = -this.vx;
        this.ping.play();
      }
    }
  }

  goal(player) {
    player.score++;
    this.reset();
  }

  render(svg, paddle1, paddle2) {
    this.x += this.vx;
    this.y += this.vy;
    this.wallCollision();
    this.paddleCollision(paddle1, paddle2);
    let circle = document.createElementNS(SVG_NS, "circle");
    circle.setAttributeNS(null, "r", this.radius);
    circle.setAttributeNS(null, "cx", this.x);
    circle.setAttributeNS(null, "cy", this.y);
    circle.setAttributeNS(null, "fill", "white");
    svg.appendChild(circle);

    const rightGoal = this.x + this.radius >= this.boardWidth;
    const leftGoal = this.x - this.radius <= 0;

    if (rightGoal) {
      this.goal(paddle1);
      this.direction = 1;
    } else if (leftGoal) {
      this.goal(paddle2);
      this.direction = -1;
    }
  }
}
