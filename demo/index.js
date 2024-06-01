import { InfiniteCanvas} from '../dist/index.mjs';
import { Node } from '../dist/index.mjs';

const element = document.getElementById('canvas');
const canvas = new InfiniteCanvas({canvas: element});
const node = new Node({x: 0, y: 0});
canvas.addNode({node});