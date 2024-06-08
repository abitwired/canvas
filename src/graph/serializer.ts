import { INode, Node } from "./node";
import { Edge } from "./edge";
import { Graph } from "./index";

/**
 * The Serializer class provides methods to serialize and deserialize a graph.
 */
export class Serializer {
  /**
   * Serialize the graph to a JSON string.
   * @param graph - The graph to serialize.
   * @returns A JSON string representing the graph.
   */
  public static serialize(graph: Graph): string {
    const nodes = graph.nodes.map((node: INode) => ({
      id: node.id,
      x: node.x,
      y: node.y,
      width: node.width,
      height: node.height,
      color: node.color,
    }));

    const edges = graph.edges.map((edge: Edge) => ({
      to: edge.to.id,
      from: edge.from.id,
    }));

    return JSON.stringify({ nodes, edges });
  }

  /**
   * Deserialize a JSON string to a graph.
   * @param data - The JSON string representing the graph.
   * @returns The deserialized graph.
   */
  static deserialize(data: string): Graph {
    type EdgeJson = {
      to: string;
      from: string;
    };

    const { nodes, edges } = JSON.parse(data) as {
      nodes: INode[];
      edges: EdgeJson[];
    };

    const graph = new Graph();

    // Add nodes to the graph
    nodes.forEach((node: INode) => graph.addNode(new Node(node)));

    // Add edges to the graph
    edges.forEach((edge: EdgeJson) => {
      const from = graph.nodes.find((node: INode) => node.id === edge.from);
      const to = graph.nodes.find((node: INode) => node.id === edge.to);

      if (from && to) {
        graph.addEdge({ from, to });
      } else {
        throw new Error(`Invalid edge: ${edge.from} -> ${edge.to}`);
      }
    });

    return graph;
  }
}
