import { Graph } from "./graph";
import { Node } from "./graph/node";
import { Edge } from "./graph/edge";

/**
 * InfiniteCanvas class represents a canvas that can be infinitely scrolled.
 * @class
 * @property {HTMLCanvasElement}
 * @property {CanvasRenderingContext2D | null}
 * @property {Graph}
 */
export class InfiniteCanvas {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  graph: Graph;
  background: string;

  constructor({
    canvas,
    background = "#333",
  }: {
    canvas: HTMLCanvasElement;
    background?: string;
  }) {
    this.canvas = canvas;
    this.background = background;

    this.ctx = canvas.getContext("2d");
    this.graph = new Graph();

    this.draw();
  }

  /**
   * Add a node to the canvas.
   * @param {Node} node - The node to add.
   */
  public addNode({ node }: { node: Node }) {
    this.graph.addNode(node);
    this.draw();
  }

  /**
   * Remove a node from the canvas.
   * @param {Node} node - The node to remove.
   */
  public removeNode({ node }: { node: Node }) {
    this.graph.removeNode(node);
    this.draw();
  }

  /**
   * Add an edge to the canvas.
   * @param {Edge} edge - The edge to add.
   */
  public addEdge({ edge }: { edge: Edge }) {
    this.graph.addEdge(edge);
    this.draw();
  }

  /**
   * Remove an edge from the canvas.
   * @param {Edge} edge - The edge to remove.
   */
  public removeEdge({ edge }: { edge: Edge }) {
    this.graph.removeEdge(edge);
    this.draw();
  }

  /**
   * Add a background to the canvas.
   */
  private addBackground() {
    if (!this.ctx) {
      return;
    }

    this.ctx.fillStyle = this.background;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Draw the canvas.
   */
  private draw() {
    if (!this.ctx) {
      return;
    }

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Add a background
    this.addBackground();

    this.graph.draw(this.ctx);
  }
}

export { Graph, Node, Edge };
