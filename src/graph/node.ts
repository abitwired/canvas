export interface INode {
  /**
   * The unique identifier of the node.
   */
  id: string;

  /**
   * The x coordinate of the node.
   */
  x: number;

  /**
   * The y coordinate of the node.
   */
  y: number;

  /**
   * The width of the node.
   */
  width: number;

  /**
   * The height of the node.
   */
  height: number;

  /**
   * The color of the node.
   */
  color: string;

  /**
   * The label of the node.
   */
  label: string;

  /**
   * True if the node is being hovered over, false otherwise.
   */
  isHovered: boolean;

  /**
   * True if the node is being dragged, false otherwise.
   */
  isDragging: boolean;

  /**
   * Draw the node on the canvas.
   * @param ctx - The 2D rendering context of the canvas.
   */
  draw(ctx: CanvasRenderingContext2D): void;

  /**
   * Handle the hover event on the node.
   */
  hoverOn(): void;

  /**
   * Handle the mouse off hover event on the node.
   */
  hoverOff(): void;

  /**
   * Handle the drag start event on the node.
   * @param x - The x coordinate of the mouse.
   * @param y - The y coordinate of the mouse.
   */
  onDragStart(x: number, y: number): void;

  /**
   * Handle the drag event on the node.
   * @param x - The x coordinate of the mouse.
   * @param y - The y coordinate of the mouse.
   */
  onDrag(x: number, y: number): void;

  /**
   * Handle the drop event on the node.
   */
  onDragEnd(): void;

  /**
   * Check if the node contains a point.
   * @param x - The x coordinate of the point.
   * @param y - The y coordinate of the point.
   * @returns True if the node contains the point, false otherwise.
   */
  containsPoint(x: number, y: number): boolean;
}

/**
 * Node class represents a node in a graph.
 * @class
 * @property {number} x - The x coordinate of the node.
 * @property {number} y - The y coordinate of the node.
 * @property {number} width - The width of the node.
 * @property {number} height - The height of the node.
 */
export class Node implements INode {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  label: string;
  isHovered = false;
  isDragging = false;
  dragOffsetX = 0;
  dragOffsetY = 0;

  constructor({
    id,
    x,
    y,
    width = 200,
    height = 50,
    label = "",
    color = "#444",
  }: {
    id: string;
    x: number;
    y: number;
    width?: number;
    height?: number;
    label?: string;
    color?: string;
  }) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.label = label;
    this.color = color;
  }

  /**
   * Sets the drag start position for the node.
   * @param x - The x-coordinate of the drag start position.
   * @param y - The y-coordinate of the drag start position.
   */
  public onDragStart(x: number, y: number) {
    this.isDragging = true;
    this.dragOffsetX = x - this.x;
    this.dragOffsetY = y - this.y;
  }

  /**
   * Resets the drag offset after dragging ends.
   */
  public onDragEnd() {
    this.isDragging = false;
    this.dragOffsetX = 0;
    this.dragOffsetY = 0;
  }

  /**
   * Updates the node position while dragging.
   * @param x - The x-coordinate of the drag position.
   * @param y - The y-coordinate of the drag position.
   */
  public onDrag(x: number, y: number): void {
    this.x = x - this.dragOffsetX;
    this.y = y - this.dragOffsetY;
  }

  public hoverOn(): void {
    this.isHovered = true;
  }

  public hoverOff(): void {
    this.isHovered = false;
  }

  public static createId() {
    return Math.random().toString(36).substring(2);
  }

  public containsPoint(x: number, y: number) {
    return (
      x >= this.x &&
      x <= this.x + this.width &&
      y >= this.y &&
      y <= this.y + this.height
    );
  }

  public draw(ctx: CanvasRenderingContext2D) {
    this.drawRectangle(ctx);
    this.drawLabel(ctx);
  }

  private drawRectangle(ctx: CanvasRenderingContext2D) {
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
    ctx.lineWidth = this.isHovered ? 2 : 1;
    ctx.stroke();
  }

  private drawLabel(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "white";
    ctx.font = "bold 20px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillText(this.label, this.x + this.width / 2, this.y + this.height / 2);

    // Add a shadow to the text
    ctx.shadowColor = "rgba(0, 0, 0, 0.2)";
    ctx.shadowBlur = 5;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
  }
}
