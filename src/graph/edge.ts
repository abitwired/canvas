import { Node } from "./node";

/**
 * Edge class represents an edge in a graph.
 * @class
 * @property {Node} from - The node the edge is coming from.
 * @property {Node} to - The node the edge is going to.
 */
export class Edge {
  to: Node;
  from: Node;

  constructor(from: Node, to: Node) {
    this.from = from;
    this.to = to;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.moveTo(this.from.x, this.from.y);
    ctx.lineTo(this.to.x, this.to.y);
    ctx.stroke();
  }
}
