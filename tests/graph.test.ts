import { Graph, Node, Serializer } from "../src/index";

test("add node", () => {
  const graph = new Graph();
  graph.addNode(new Node({ id: "0", x: 0, y: 0 }));
  expect(graph.nodes.length).toBe(1);
});

test("add edge", () => {
  const graph = new Graph();
  const node1 = new Node({ id: "0", x: 0, y: 0 });
  const node2 = new Node({ id: "1", x: 0, y: 0 });
  graph.addNode(node1);
  graph.addNode(node2);
  graph.addEdge({ from: node1, to: node2 });
  expect(graph.edges.length).toBe(1);
});

test("remove node", () => {
  const graph = new Graph();
  const node1 = new Node({ id: "0", x: 0, y: 0 });
  const node2 = new Node({ id: "1", x: 0, y: 0 });
  graph.addNode(node1);
  graph.addNode(node2);
  graph.removeNode(node1);
  expect(graph.nodes.length).toBe(1);
  expect(graph.edges.length).toBe(0);
});

test("remove edge", () => {
  const graph = new Graph();
  const node1 = new Node({ id: "0", x: 0, y: 0 });
  const node2 = new Node({ id: "1", x: 0, y: 0 });
  graph.addNode(node1);
  graph.addNode(node2);
  graph.addEdge({ from: node1, to: node2 });
  graph.removeEdge(graph.edges[0]);
  expect(graph.edges.length).toBe(0);
  expect(graph.nodes.length).toBe(2);
});

test("serialize graph", () => {
  const graph = new Graph();
  const node1 = new Node({ id: "0", x: 0, y: 0 });
  const node2 = new Node({ id: "1", x: 0, y: 0 });
  graph.addNode(node1);
  graph.addNode(node2);
  graph.addEdge({ from: node1, to: node2 });
  const serialized = Serializer.serialize(graph);
  expect(serialized).toBe(
    '{"nodes":[{"id":"0","x":0,"y":0,"width":200,"height":50,"color":"#444"},{"id":"1","x":0,"y":0,"width":200,"height":50,"color":"#444"}],"edges":[{"to":"1","from":"0"}]}'
  );
});

test("deserialize graph", () => {
  const serialized =
    '{"nodes":[{"id":"0","x":0,"y":0,"width":200,"height":50,"color":"#444"},{"id":"1","x":0,"y":0,"width":200,"height":50,"color":"#444"}],"edges":[{"to":"1","from":"0"}]}';
  const graph = Serializer.deserialize(serialized);
  expect(graph.nodes.length).toBe(2);
  expect(graph.edges.length).toBe(1);
});

test("throws error when deserializing invalid data", () => {
  const serialized = "invalid";
  expect(() => Serializer.deserialize(serialized)).toThrow();
});

test("create node id", () => {
  const id = Node.createId();
  expect(id).toBeDefined();
});
