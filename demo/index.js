import { InfiniteCanvas, Serializer } from "../dist/index.mjs";
import { CustomNode } from "./custom-node-example.js";

const element = document.getElementById("canvas");
const canvas = new InfiniteCanvas({ canvas: element });

fetch("./demo.json")
  .then((response) => response.json())
  .then((data) => {
    try {
      const json = JSON.stringify(data);
      canvas.setGraph(Serializer.deserialize(json));
      const node = new CustomNode({
        x: 600,
        y: 600,
        width: 40,
        height: 40,
        color: "green",
      });
      canvas.addNode({ node });
      const from = canvas.getNode("1");
      const to = canvas.getNode("custom-node");
      const edge = { from: from, to: to };
      canvas.addEdge({ edge });
    } catch (error) {
      console.error(error);
    }
  });
