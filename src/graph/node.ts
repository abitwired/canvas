/**
 * Node class represents a node in a graph.
 * @class
 * @property {number} x - The x coordinate of the node.
 * @property {number} y - The y coordinate of the node.
 * @property {number} width - The width of the node.
 * @property {number} height - The height of the node.
 */
export class Node {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;

  constructor({
    x,
    y,
    width = 200,
    height = 50,
    color = "#444",
  }: {
    x: number;
    y: number;
    width?: number;
    height?: number;
    color?: string;
  }) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
