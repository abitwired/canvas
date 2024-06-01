import { InfiniteCanvas, Serializer } from "../dist/index.mjs";
import { Node } from "../dist/index.mjs";

const element = document.getElementById("canvas");
const canvas = new InfiniteCanvas({ canvas: element });

fetch("./demo.json")
  .then((response) => response.json())
  .then((data) => {
    try {
      const json = JSON.stringify(data);
      canvas.setGraph(Serializer.deserialize(json));
    } catch (error) {
      console.error(error);
    }
  });
