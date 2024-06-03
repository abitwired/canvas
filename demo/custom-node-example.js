import { Node } from "../dist/index.mjs";

export class CustomNode extends Node {
  constructor({ x, y, width, height, color }) {
    super({
      id: "custom-node",
      x: x,
      y: y,
      width: width,
      height: height,
      color: color,
    });
  }
}
