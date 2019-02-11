import { SVG_NS } from "../settings";

export default class Winner {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
  }

  render(svg, winner) {
    let points = document.createElementNS(SVG_NS, "text");
    points.setAttributeNS(null, "x", this.x);
    points.setAttributeNS(null, "y", this.y);
    points.setAttributeNS(null, "font-family", "Silkscreen Web", "monotype");
    points.setAttributeNS(null, "fonts-size", this.size);
    points.setAttributeNS(null, "fill", "white");

    points.textContent = winner;

    svg.appendChild(points);
  }
}
