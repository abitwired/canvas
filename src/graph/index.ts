import { INode } from "./node";
import { Edge } from "./edge";

/**
 * Graph class represents a graph of nodes and edges.
 * @class
 * @property {INode[]} nodes - The nodes in the graph.
 * @property {Edge[]} edges - The edges in the graph.
 */
export class Graph {
  nodes: INode[] = [];
  edges: Edge[] = [];

  addNode(node: INode) {
    this.nodes.push(node);
  }

  addEdge({ from, to }: { from: INode; to: INode }) {
    const edge = new Edge(from, to);
    this.edges.push(edge);
  }

  removeNode(node: INode) {
    this.nodes = this.nodes.filter((n) => n !== node);
    this.edges = this.edges.filter(
      (edge) => edge.from !== node && edge.to !== node
    );
  }

  removeEdge(edge: Edge) {
    this.edges = this.edges.filter((e) => e !== edge);
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.edges.forEach((edge) => {
      edge.draw(ctx);
    });
    this.nodes.forEach((node) => {
      node.draw(ctx);
    });
  }
}
