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
        x: 0,
        y: 0,
        width: 40,
        height: 40,
        color: "green",
      });
      canvas.addNode({ node });
    } catch (error) {
      console.error(error);
    }
  });
