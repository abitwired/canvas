import { Graph } from "../src/graph";
import { Node } from "../src/graph/node";

test("add node", () => {
  const graph = new Graph();
  graph.addNode(new Node({ x: 0, y: 0 }));
  expect(graph.nodes.length).toBe(1);
});

test("add edge", () => {
  const graph = new Graph();
  const node1 = new Node({ x: 0, y: 0 });
  const node2 = new Node({ x: 1, y: 1 });
  graph.addNode(node1);
  graph.addNode(node2);
  graph.addEdge({ from: node1, to: node2 });
  expect(graph.edges.length).toBe(1);
});

test("remove node", () => {
  const graph = new Graph();
  const node1 = new Node({ x: 0, y: 0 });
  const node2 = new Node({ x: 1, y: 1 });
  graph.addNode(node1);
  graph.addNode(node2);
  graph.removeNode(node1);
  expect(graph.nodes.length).toBe(1);
  expect(graph.edges.length).toBe(0);
});

test("remove edge", () => {
  const graph = new Graph();
  const node1 = new Node({ x: 0, y: 0 });
  const node2 = new Node({ x: 1, y: 1 });
  graph.addNode(node1);
  graph.addNode(node2);
  graph.addEdge({ from: node1, to: node2 });
  graph.removeEdge(graph.edges[0]);
  expect(graph.edges.length).toBe(0);
  expect(graph.nodes.length).toBe(2);
});
