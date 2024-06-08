import { INode } from "./node";

/**
 * Edge class represents an edge in a graph.
 * @class
 * @property {Node} from - The node the edge is coming from.
 * @property {Node} to - The node the edge is going to.
 * @property {string} color - The color of the edge.
 * @property {number} width - The width of the edge.
 */
export class Edge {
  to: INode;
  from: INode;
  color: string = "#fff";
  width: number = 2;

  constructor(from: INode, to: INode) {
    this.from = from;
    this.to = to;
  }

  draw(ctx: CanvasRenderingContext2D) {
    // ctx.beginPath();

    const startX = this.from.x + this.from.width;
    const startY = this.from.y + this.from.height / 2;

    const endX = this.to.x;
    const endY = this.to.y + this.to.height / 2;

    // Create s-shape curve between the two points
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.width;
    ctx.moveTo(startX, startY);
    const dx = endX - startX;
    // if dy is negative, the curve will be an s-shape
    // if dy is positive, we should flip the s-shape curve
    const dy = endY - startY;

    const controlPointFactor = Math.abs(dy) * 0.5;
    const x1 = startX + dx * 0.5;
    const y1 =
      startY + dy * 0.5 + (dy > 0 ? -controlPointFactor : controlPointFactor);
    const x2 = startX + dx * 0.5;
    const y2 =
      startY + dy * 0.5 + (dy > 0 ? controlPointFactor : -controlPointFactor);

    ctx.bezierCurveTo(x1, y1, x2, y2, endX, endY);
    ctx.stroke();
  }
}
