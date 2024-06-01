import { Graph } from "./graph";
import { Node } from "./graph/node";
import { Edge } from "./graph/edge";
import { Serializer } from "./graph/serializer";

/**
 * InfiniteCanvas class represents a canvas that can be infinitely scrolled.
 * @class
 * @property {HTMLCanvasElement}
 * @property {CanvasRenderingContext2D}
 * @property {Graph}
 */
export class InfiniteCanvas {
  /**
   * The HTML canvas element.
   */
  private canvas: HTMLCanvasElement;

  /**
   * The 2D rendering context of the canvas.
   */
  private ctx: CanvasRenderingContext2D;

  /**
   * The graph to be drawn on the canvas.
   */
  private graph: Graph;

  /**
   * The background color of the canvas.
   */
  private background: string;

  /**
   * The scale factor for zooming.
   */
  private scale = 1;

  /**
   * The X offset for panning.
   */
  private offsetX = 0;

  /**
   * The Y offset for panning.
   */
  private offsetY = 0;

  /**
   * Flag indicating whether panning is in progress.
   */
  private isPanning = false;

  /**
   * The starting X coordinate for panning.
   */
  private startX = 0;

  /**
   * The starting Y coordinate for panning.
   */
  private startY = 0;

  /**
   * Creates a new instance of InfiniteCanvas.
   * @param options - The options for creating the canvas.
   */
  constructor({
    canvas,
    background = "#333",
  }: {
    canvas: HTMLCanvasElement;
    background?: string;
  }) {
    this.canvas = canvas;
    this.background = background;

    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.graph = new Graph();

    this.canvas.addEventListener("wheel", this.zoom.bind(this), {
      passive: false,
    });
    this.canvas.addEventListener("mousedown", this.startPan.bind(this));
    this.canvas.addEventListener("mousemove", this.pan.bind(this));
    this.canvas.addEventListener("mouseup", this.endPan.bind(this));
    this.canvas.addEventListener("mouseleave", this.endPan.bind(this));

    this.resizeCanvas();
  }

  /**
   * Sets the graph to be drawn on the canvas.
   * @param graph - The graph to be set.
   */
  public setGraph(graph: Graph) {
    this.graph = graph;
    this.draw();
  }

  /**
   * Adds a node to the canvas.
   * @param options - The options for adding a node.
   */
  public addNode({ node }: { node: Node }) {
    this.graph.addNode(node);
    this.draw();
  }

  /**
   * Removes a node from the canvas.
   * @param options - The options for removing a node.
   */
  public removeNode({ node }: { node: Node }) {
    this.graph.removeNode(node);
    this.draw();
  }

  /**
   * Adds an edge to the canvas.
   * @param options - The options for adding an edge.
   */
  public addEdge({ edge }: { edge: Edge }) {
    this.graph.addEdge(edge);
    this.draw();
  }

  /**
   * Removes an edge from the canvas.
   * @param options - The options for removing an edge.
   */
  public removeEdge({ edge }: { edge: Edge }) {
    this.graph.removeEdge(edge);
    this.draw();
  }

  /**
   * Resizes the canvas to fit the window size.
   */
  private resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.draw();
  }

  /**
   * Handles the start of panning.
   * @param event - The mouse event.
   */
  private startPan(event: MouseEvent) {
    this.isPanning = true;
    this.startX = event.clientX - this.offsetX;
    this.startY = event.clientY - this.offsetY;
  }

  /**
   * Handles panning.
   * @param event - The mouse event.
   */
  private pan(event: MouseEvent) {
    if (!this.isPanning) return;
    this.offsetX = event.clientX - this.startX;
    this.offsetY = event.clientY - this.startY;
    this.draw();
  }

  /**
   * Handles the end of panning.
   */
  private endPan() {
    this.isPanning = false;
  }

  /**
   * Handles zooming.
   * @param event - The wheel event.
   */
  private zoom(event: WheelEvent) {
    event.preventDefault();

    const scaleFactor = 1.1;
    const rect = this.canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const zoomIn = event.deltaY < 0;

    const worldX = (mouseX - this.offsetX) / this.scale;
    const worldY = (mouseY - this.offsetY) / this.scale;

    this.scale *= zoomIn ? scaleFactor : 1 / scaleFactor;

    this.offsetX = mouseX - worldX * this.scale;
    this.offsetY = mouseY - worldY * this.scale;

    this.draw();
  }

  /**
   * Draws the background grid on the canvas.
   */
  private drawBackground() {
    const gridSize = 25;
    this.ctx.fillStyle = this.background;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Add dots
    this.ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
    for (
      let x = -this.offsetX % gridSize;
      x < this.canvas.width;
      x += gridSize
    ) {
      for (
        let y = -this.offsetY % gridSize;
        y < this.canvas.height;
        y += gridSize
      ) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, 1, 0, 2 * Math.PI);
        this.ctx.fill();
      }
    }
  }

  /**
   * Draws the canvas.
   */
  private draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawBackground();

    this.ctx.save();
    this.ctx.translate(this.offsetX, this.offsetY);
    this.ctx.scale(this.scale, this.scale);
    this.graph.draw(this.ctx);
    this.ctx.restore();
  }
}

export { Graph, Node, Edge, Serializer };
