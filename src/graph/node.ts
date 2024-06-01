/**
 * Node class represents a node in a graph.
 * @class
 * @property {number} x - The x coordinate of the node.
 * @property {number} y - The y coordinate of the node.
 * @property {number} width - The width of the node.
 * @property {number} height - The height of the node.
 */
export class Node {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;

  constructor({
    id,
    x,
    y,
    width = 200,
    height = 50,
    color = "#444",
  }: {
    id: string;
    x: number;
    y: number;
    width?: number;
    height?: number;
    color?: string;
  }) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  public static createId() {
    return Math.random().toString(36).substring(2);
  }

  public draw(ctx: CanvasRenderingContext2D) {
    // Add a shadow to the node
    ctx.shadowColor = "rgba(0, 0, 0, 0.2)";
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;

    const radius = 5;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(this.x + radius, this.y);
    ctx.lineTo(this.x + this.width - radius, this.y);
    ctx.quadraticCurveTo(
      this.x + this.width,
      this.y,
      this.x + this.width,
      this.y + radius
    );
    ctx.lineTo(this.x + this.width, this.y + this.height - radius);
    ctx.quadraticCurveTo(
      this.x + this.width,
      this.y + this.height,
      this.x + this.width - radius,
      this.y + this.height
    );
    ctx.lineTo(this.x + radius, this.y + this.height);
    ctx.quadraticCurveTo(
      this.x,
      this.y + this.height,
      this.x,
      this.y + this.height - radius
    );
    ctx.lineTo(this.x, this.y + radius);
    ctx.quadraticCurveTo(this.x, this.y, this.x + radius, this.y);
    ctx.closePath();

    ctx.fill();

    // Add a white border around the node
    ctx.strokeStyle = "white";
    ctx.lineWidth = 1;
    ctx.stroke();
  }
}
